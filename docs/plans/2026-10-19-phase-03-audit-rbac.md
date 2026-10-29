# Phase 03 — Audit Core & RBAC Core (split: 03a + 03b)

- **Date:** 2026-10-19
- **Roadmap:** [Master Roadmap → Phase 03](./2026-10-16-admin-boilerplate-master-roadmap.md#phase-03--audit-core--rbac-core)
- **Spec sections:** design §1.1, §2, §2.2, §5, §6 (6.1–6.3), §7.1, §8, §9.1 (audit rows, as tests here; the arch/contract versions are Phase 04); frontend-behavior §2 (`auth.level`, `auth.permissions`)
- **Status:** approved 2026-10-19 (see Approval); 03a ☑ done 2026-10-19; 03b ☑ accepted 2026-10-19
- **Design gate:** none (no screen in this phase)

## Why split

The whole phase is about **70 files** (≈ 30 for audit, ≈ 40 for RBAC) and **about 17 test files**, which is over the ~25 / ~15 limit. Proposed split, each part with its own acceptance criteria, `composer check` run and commit:

| Part | Scope | Commit |
|---|---|---|
| **03a: Audit core** | Taxonomy, `Audit::record()` / `batch()` / `actingAs()`, `LogsModuleActivity`, `AuditContext`, `Masker`, `ImmutableActivity`, the `activity_log` migration, auth listeners | `feat(audit): phase 03a audit core` |
| **03b: RBAC core** | spatie permission tables + `users` columns, `Level`, `HasLevel`, sync, matrix, middleware, `Gate::before`, session kill, seeder, `admin:create-superadmin`, `AuthData` level/permissions, **plus** `Activity::visibleTo()` and `HasActivityHistory` | `feat(rbac): phase 03b rbac core` |

`visibleTo()` and `HasActivityHistory` move from audit to 03b because the SA visibility rule needs to know who is Super Admin, and that only exists once levels exist. If approved, the roadmap row 03 becomes 03a / 03b and the items move accordingly.

## Verified before planning (scratch install, nothing changed in the repo)

`spatie/laravel-activitylog` 5.1.2 and `spatie/laravel-permission` 8.3.0 install together on `laravel/framework` 13.37 (PHP 8.4). What matters for this plan:

- **activitylog v5 differs from v4.** The stub table has a separate **`attribute_changes`** JSON column (old/attributes) next to `properties`, and there is **no batch support** (`LogBatch` and `batch_uuid` are gone). So `batch_uuid` and `Audit::batch()` are ours (Q4).
- The write path goes through an **overridable action class** (`activitylog.actions.log_activity` → `LogActivityAction`, with `transformChanges()` / `beforeActivityLogged()` hooks). One subclass is the single point where masking, context, `batch_uuid`, `subject_label` and the `force_deleted` rename happen, for model events and `Audit::record()` alike.
- `activitylog.buffer.enabled` (bulk insert after the response) exists. The provider forces it to `false`, because audit writes must stay synchronous and inside the transaction (D15).
- `CauserResolver::withCauser($user, $callback)` exists, so a queued job can set its causer explicitly.
- `LogsActivity` logs `deleted` for both soft and force deletes. The rename to `force_deleted` happens in our action (`$subject->isForceDeleting()`).
- permission v8: the stub has `permissions` / `roles` / pivots with `cascadeOnDelete`, events are off by default, and `HasRoles::syncRoles()` calls `assignRole()` internally. So `assignLevel()` writes the pivot through the relation, letting `assignRole()` throw (AGENTS §4).

---

## Part 03a — Audit Core

### Files

**Package `packages/admin-core/`**

| Path | Action | Purpose |
|---|---|---|
| `composer.json` | modify | `require` `spatie/laravel-activitylog: ^5.1` (Q2) |
| `database/migrations/2026_10_19_000001_create_activity_log_table.php` | create | Core-owned (projects don't publish spatie's stub): spatie v5 columns + `batch_uuid` (nullable uuid) + the spec §5 indexes `created_at`, (`log_name`, `created_at`), (`causer_id`, `created_at`), (`event`, `created_at`), (`subject_type`, `subject_id`), `batch_uuid`; working `down()` |
| `config/admin-core.php` | modify | `audit.masked_fields` (spec defaults: omit / partial / full) and `audit.retention_days => null` |
| `src/Audit/AuditEvent.php` | create | Backed enum, one case per taxonomy row; `label()` (id strings from spec §7.1), `badge()` (`success`/`info`/`destructive`/`warning`/`neutral`), `logName(): ?string` (`auth` for login/logout/login_failed/login_locked, `system` for `audit_pruned`) |
| `src/Audit/Audit.php` | create | Static API: `record(AuditEvent\|string $event, ?Model $subject = null, array $meta = [], ?string $module = null)`, `batch(Closure)` (nested calls reuse the outer uuid), `actingAs(Model $causer, Closure)` (wraps `CauserResolver::withCauser`, for jobs). Unknown event → `InvalidArgumentException` "Unknown audit event [x]"; a custom action is valid only if the module (given, or resolved from the subject's class) declares it |
| `src/Audit/WriteActivity.php` | create | Extends spatie `LogActivityAction`; registered in `activitylog.actions.log_activity`. Applies `Masker` to `attribute_changes` + `properties.meta`, adds `properties.context` (`AuditContext`), `properties.meta.subject_label`, `batch_uuid`, and renames `deleted` → `force_deleted` |
| `src/Audit/AuditContext.php` | create | Scoped singleton: `ip, user_agent, route, request_id` (`X-Request-Id` header, else a uuid per request), `channel` = `queue` (job class, set on `JobProcessing`, cleared on `JobProcessed`/`JobFailed`), `cli` (command name from `CommandStarting`) or `web` |
| `src/Audit/Masker.php` | create | `mask(array): array`, recursive; keys matched with `Str::is` (so `*_token` works). `omit` removes the key, `partial` keeps the first 4 and last 4 characters, `full` → `••••` |
| `src/Audit/LogsModuleActivity.php` | create | Uses spatie `LogsActivity`. `getActivitylogOptions()`: fillable only, dirty only, empty changes skipped, `logExcept` = `$hidden` + `omit` fields (Q3), `useLogName` = the module slug from the registry. Default `auditLabel()`: `name` → `title` → `number` → `#id` |
| `src/Audit/ImmutableActivity.php` | create | Extends spatie `Activity`. `updating` / `deleting` throw; its Eloquent builder's `update()` / `delete()` / `forceDelete()` throw too, so mass queries are blocked as well. Set as `activitylog.activity_model` |
| `src/Audit/ImmutableAuditException.php` | create | Thrown above |
| `src/Audit/AuthAuditSubscriber.php` | create | `Login` → `login` + `last_login_at` (`saveQuietly`, guarded by column existence until 03b adds it); `Logout` → `logout`; `Failed` → `login_failed`, meta = the attempted identifier only, subject = the matched user if any (so 03b's SA rule can hide it); `Lockout` → `login_locked`; `PasswordReset` → `password_reset` |
| `src/Registry/ModuleRegistry.php` | modify | `forClass(string $class): ?ModuleDefinition` (namespace prefix of root + name), used for `log_name` and custom-action validation |
| `src/AdminCoreServiceProvider.php` | modify | Sets the activitylog config (model, action, `buffer.enabled=false`), binds `AuditContext`, registers the subscriber and the queue/console listeners |
| `tests/TestCase.php` | modify | Adds the activitylog provider and the Laravel `users` migration (Testbench) |
| `tests/Fixtures/Models/User.php` | create | Test user (auth provider model in Testbench) |
| `tests/Fixtures/Modules/Demo/Models/DemoItem.php` | create | `SoftDeletes` + `LogsModuleActivity`; fillable `name, nik, no_hp, secret`; `password` hidden |
| `tests/Fixtures/Modules/Demo/Database/Migrations/…_create_demo_items_table.php` | modify | Adds those columns + `deleted_at` (fixture, never shipped) |
| `tests/Fixtures/Jobs/AuditedJob.php` | create | Takes a user and writes one `Audit::record()` inside `Audit::actingAs()` |
| `CHANGELOG.md` | modify | Unreleased → Added |

**Skeleton:** `composer.lock` (from `composer update yuan/admin-core`).

### Tests (package, Testbench + `RefreshDatabase`)

| Test | Proves |
|---|---|
| `AuditEventTest` | Every case has a label and a badge; an unknown name throws; `approve` passes for Demo (declares it) and throws for a module that doesn't |
| `AuditRecordTest` | `record()` writes event, log_name, causer, subject, `subject_label`, context; `batch()` gives every row one uuid, and nesting reuses it; **a rolled-back transaction leaves no row**; a job on the `database` queue, run by `queue:work --once` with nobody logged in, has the requesting user as causer and `channel=queue` |
| `LogsModuleActivityTest` | created / updated (dirty only) / deleted / restored / force_deleted, each with log_name `demo`; an update with no fillable change writes nothing; hidden fields are absent |
| `AuditMaskingTest` | `omit` absent, `partial` = `1234••••5678`, `full` = `••••`, in `attribute_changes.old`, `attribute_changes.attributes` and `meta`; a short partial value is fully masked |
| `AuditImmutabilityTest` | `update()`, `save()` on an existing row, `delete()`, and mass `update()`/`delete()` through the model all throw; the row is unchanged |
| `AuthAuditTest` | Each of the five auth events writes its row with `log_name=auth`; `login_failed` meta holds the identifier only, and no `password` key exists anywhere in the row |

**Skeleton:** `tests/Feature/Auth/AuthAuditTest.php`. A real Fortify login writes `login`, a wrong password writes `login_failed` with no password in the row, logout writes `logout`.

### Acceptance 03a

- [x] A rolled-back transaction leaves no activity row.
- [x] Updating or deleting an activity row throws.
- [x] Masking holds for `omit` / `partial` / `full`.
- [x] A queued job's activity has the requesting user as causer.
- [x] `composer check` green; `migrate:fresh --seed` and `migrate:rollback` succeed.

---

## Part 03b — RBAC Core

### Files

**Package `packages/admin-core/`**

| Path | Action | Purpose |
|---|---|---|
| `composer.json` | modify | `require` `spatie/laravel-permission: ^8.3` (Q2); autoload `Yuan\AdminCore\Database\Seeders\` → `database/seeders/` |
| `database/migrations/2026_10_19_000002_create_permission_tables.php` | create | Core-owned copy of the spatie stub (no teams) + `roles.label`, `roles.description`, `roles.is_protected` (indexed), `permissions.module`, `permissions.action` (indexed) |
| `database/migrations/2026_10_19_000003_add_admin_columns_to_users_table.php` | create | `username` (unique), `is_active` (default true, indexed), `last_login_at`, `deleted_at` (spec §5; Q5) |
| `database/seeders/AdminCoreSeeder.php` | create | `permissions:sync` → `super-admin` (protected) and `operator` levels via `firstOrCreate`; Operator gets every `*.view` **only when first created**, so re-seeding never undoes the SA's matrix edits; 2 SA users (Q6) |
| `config/admin-core.php` | modify | `routes.middleware` → `['web', 'auth', 'active']`; `seed.password` (`env('ADMIN_SEED_PASSWORD')`) |
| `src/Permissions/Level.php` | create | Extends spatie `Role`; fillable `name, label, description`; casts; guard rails: a protected level can't be updated or deleted, a level with users can't be deleted |
| `src/Permissions/HasLevel.php` | create | User trait (uses `HasRoles`): `level()`, `assignLevel(Level)` (pivot sync in `Audit::batch` → `level_changed` with old/new level names, module `users`; kills other sessions), `isSuperAdmin()`; `assignRole` / `givePermissionTo` / `syncPermissions` / `syncRoles` throw. Model events: deactivating kills sessions; the last active SA can't be deactivated, deleted or moved off SA |
| `src/Permissions/GuardRailViolation.php` | create | One exception for every model-level guard rail (Phase 07 controllers turn it into a friendly error) |
| `src/Permissions/PermissionSynchronizer.php` | create | Derives `{slug}.{action}` from enabled, non-superadmin_only modules; creates missing ones, deletes orphans, resets the cache; returns created/removed counts |
| `src/Permissions/PermissionMatrix.php` | create | `build(Level): PermissionMatrixData`; `save(Level, array<string, list<string>>)`: refuses the protected level and undeclared actions, applies the dependency rule (non-view ⇒ view; no view ⇒ empty row), then one `DB::transaction` + `Audit::batch`: `syncPermissions`, one `permissions_updated` row (meta `added` / `removed`, module `levels`), dispatches `LevelPermissionsUpdated` (after commit), resets the cache |
| `src/Events/LevelPermissionsUpdated.php` | create | `level`, `added`, `removed` |
| `src/Data/LevelData.php` | create | `id, name, label` |
| `src/Data/PermissionMatrixData.php`, `src/Data/PermissionMatrixRowData.php` | create | `level, columns` / `slug, label, actions (declared), granted` (for the Phase 07 screen) |
| `src/Data/AuthData.php` | modify | `level: ?LevelData`, `permissions: list<string>` (Q8) |
| `src/Http/Middleware/HandleInertiaRequests.php` | modify | Fills them |
| `src/Http/Middleware/EnsureUserIsActive.php` | create | Alias `active`. Inactive user → logout, invalidate the session, redirect to login with `FlashData(error: …)` |
| `src/Http/Middleware/EnsureSuperAdmin.php` | create | Alias `superadmin`; 403 unless `isSuperAdmin()` |
| `src/Audit/ImmutableActivity.php` | modify | `scopeVisibleTo(Authenticatable $viewer)`: no-op for SA; otherwise excludes rows whose causer **or** subject is a user holding the protected level (one subquery) |
| `src/Audit/HasActivityHistory.php` | create | `activityHistory(Authenticatable $viewer): LengthAwarePaginator`: subject = this record, `visibleTo`, newest first, 20 per page (backend only; the tab's permission check is Phase 07) |
| `src/Console/PermissionsSyncCommand.php` | create | `permissions:sync`, prints the counts |
| `src/Console/CreateSuperAdminCommand.php` | create | `admin:create-superadmin` (prompts, or `--name --username --email`, with the password always prompted as a secret); ensures the SA level exists |
| `src/AdminCoreServiceProvider.php` | modify | `Gate::before` (SA → true, else null), `admin-core.superadmin` ability → `isSuperAdmin()`, middleware aliases `active` / `superadmin` / `permission` (spatie), the permission config (`models.role` = `Level`), superadmin_only routes use `superadmin` instead of `can:admin-core.superadmin`, commands |
| `tests/TestCase.php`, `tests/Fixtures/Models/User.php` | modify | Permission provider; the fixture user uses `HasLevel` + `SoftDeletes` |
| `CHANGELOG.md` | modify | Unreleased → Added / Changed (route middleware) |

**Skeleton `skeleton/`**

| Path | Action |
|---|---|
| `app/Models/User.php` | `HasLevel`, `SoftDeletes`; fillable `username`, `is_active`; casts |
| `database/factories/UserFactory.php` | `username`, `is_active` + `inactive()` state |
| `database/seeders/DatabaseSeeder.php` | Calls `AdminCoreSeeder` (the kit's "Test User" goes; no fixed credentials) |
| `routes/web.php`, `routes/settings.php` | `active` next to `auth` on the kit routes |
| `.env.example` | `ADMIN_SEED_PASSWORD=` |
| `resources/js/types/generated.d.ts` | Regenerated |
| `composer.lock` | Updated |
| `tests/Feature/SharedPropsTest.php` | `auth.level` / `auth.permissions` |

**Repo root & docs (03a + 03b):** `DEVELOPER.md` (§5 key files: `Audit/*`, `Permissions/*`, middleware, seeder; R3 / R14 / R15 marked delivered; §7 `permissions:sync`, `admin:create-superadmin`; §8 rows); spec diffs proposed in the report (§1.1 status → Installed; §5 `activity_log` shape per Q4; §7.1 exclusion wording per Q3); the roadmap.

### Tests (package)

| Test | Proves (spec ref) |
|---|---|
| `PermissionSyncTest` | Creates exactly the derived set; idempotent; removes orphans; skips superadmin_only and disabled modules; resets the cache (§6.2) |
| `PermissionMatrixTest` | `build()` shows `—` for undeclared actions and no superadmin_only rows; the dependency rule both ways; protected level refused; one `permissions_updated` row in a batch with the right added/removed; event dispatched; a failure inside save rolls back both the permissions and the audit row (§6.1) |
| `HasLevelTest` | `assignLevel()` replaces the old level and writes one batched `level_changed`; `assignRole` / `givePermissionTo` / `syncPermissions` / `syncRoles` throw; `isSuperAdmin()`; `model_has_permissions` stays empty (§6.2) |
| `GuardRailTest` | The last active SA can't be deactivated, deleted or moved off SA; the protected level can't be edited or deleted; a level with users can't be deleted; deactivation and level change delete the user's other sessions but keep the current one (§6.3) |
| `RbacMiddlewareTest` | `Gate::before` passes SA on any ability; `permission:demo.view` gives 403 without and 200 with; `active` logs an inactive user out; `superadmin` gives 403 to non-SA (the AdminOnly fixture stands in for Levels / Settings / Trash / Health) (§6.2, §6.3 first rail) |
| `ActivityVisibilityTest` | A non-SA viewer gets no rows caused by or about SA users (including a `login_failed` for an SA username); SA sees all; `activityHistory()` applies the same rule and pages by 20 (§7.1) |
| `CreateSuperAdminCommandTest` | Creates an active SA user; a duplicate username fails cleanly |
| `AdminCoreSeederTest` | Running it twice gives the same row counts; 2 active SAs; Operator has only `*.view`; a matrix change survives a re-seed; `model_has_permissions` is empty |
| `SharedPropsTest`, `ModuleRoutesTest`, `MenuBuilderTest` (existing) | `level` / `permissions` filled (SA: every synced permission); base middleware now includes `active` and superadmin_only routes use `superadmin`; the menu filters on real permissions |

### Acceptance 03b

- [x] Pest proves every item in spec §6.2 and the §6.3 rails that exist at this phase: SA-only routes, ≥1 active SA, the protected level is immutable, a level with users can't be deleted, and session kill. The Users-screen rails (assigning the SA level, hiding SA accounts, no self-delete/deactivate) are Phase 07.
- [x] Seeders are idempotent: `composer setup` runs twice on the same database without errors or duplicate rows (run manually, recorded here). _See "Review of 03b"._
- [x] Matrix saves and level changes write one batched, correctly named event each.
- [x] `composer check` green; `migrate:fresh --seed` and `migrate:rollback` succeed.

---

## Steps

**03a**
1. Add activitylog; `composer update yuan/admin-core` in the skeleton.
2. Migration + `ImmutableActivity` + immutability test (test-first, likewise for every step below).
3. `AuditEvent`, `Masker`, `AuditContext`, `WriteActivity`, `Audit`.
4. `LogsModuleActivity` + `ModuleRegistry::forClass()` + Demo fixture model.
5. `AuthAuditSubscriber`; skeleton auth test.
6. Queue causer test (`queue:work --once`).
7. `composer check` green → DEVELOPER, CHANGELOG, roadmap, this plan → commit 03a.

**03b**
1. Add permission; migrations (permission tables, users columns); skeleton `User` + factory.
2. `Level` + `HasLevel` + `GuardRailViolation` + guard-rail tests.
3. `PermissionSynchronizer` + command; `PermissionMatrix` + event + Data.
4. Provider: `Gate::before`, aliases, route middleware; middleware classes.
5. `visibleTo()` + `HasActivityHistory`.
6. `AuthData` + shared props; regenerate types.
7. Seeder, `admin:create-superadmin`, `.env.example`; `composer setup` twice on one DB.
8. `composer check` green → DEVELOPER, CHANGELOG, roadmap, this plan → commit 03b.

## Checklist

- [x] 03a: dependency, migration, immutable model
- [x] 03a: taxonomy, masker, context, write action, `Audit`
- [x] 03a: `LogsModuleActivity`, auth listeners
- [x] 03a: acceptance verified, `composer check` green, committed
- [x] 03b: dependency, migrations, `Level`, `HasLevel`, guard rails
- [x] 03b: sync + command, matrix + event
- [x] 03b: `Gate::before`, middleware, session kill
- [x] 03b: `visibleTo()`, `HasActivityHistory`
- [x] 03b: `AuthData`, seeder, `admin:create-superadmin`
- [x] 03b: acceptance verified, `composer check` green, committed

## Decisions where the spec is silent (say if you disagree)

1. **`Audit` is a static class**, not a Laravel facade over a service. It has one implementation and nothing to swap, and `Audit::record()` reads the same.
2. **`Audit::actingAs($user, fn)`** is how jobs set the causer (spec: "jobs pass the original user explicitly"). Jobs still take the user as a constructor argument.
3. **`log_name` resolution:** the `$module` argument → the subject's module (registry) → the event's fixed log name (`auth` / `system`) → `system`. Core events written before their module exists use its future slug: `permissions_updated` → `levels`, `level_changed` → `users`.
4. **Matrix diff** is stored as meta `added` / `removed` permission names (the "before/after diff" of §6.1).
5. **Enum labels are Indonesian literals**, as listed in spec §7.1. They move to translation files when the translation helper arrives (Phase 05).
6. **Partial masking of a value of 8 characters or fewer** gives `••••` (keeping 4 + 4 would reveal all of it).
7. **Immutability ceiling:** model and Eloquent-builder writes throw. `DB::table('activity_log')` can't be blocked from PHP; Phase 04's arch test is the guard. A DB trigger is the upgrade if that's not enough. The `admin:audit-prune` exception is added with the command in Phase 07.
8. **Levels:** name = slug (`super-admin`, `operator`), `label` is shown, and Super Admin is identified only by `is_protected`.
9. **Inactive users** can still pass the Fortify login and are then logged out by `active` on the next request, with an error flash. Rejecting them at login belongs to the auth work in Phase 05/09.
10. **Deferred to Phase 07 (Users):** the `UserLevelChanged` event, `user_activated` / `user_deactivated` audit, and the kit's "delete account" (the ≥1-SA rail already stops the last SA deleting themselves).

## Approval (2026-10-19)

- **A1 (Q1, Q2):** split approved: 03a, then 03b, each with its own `composer check` and commit. Stop after 03a for review. Both dependencies approved.
- **A2 (Q3):** exclude `$hidden` + `omit`; log `partial` / `full` masked. Masking applies to **both** `attribute_changes` and `properties`; `AuditMaskingTest` checks both columns.
- **A3 (Q4):** `attribute_changes` + `properties` + our own `batch_uuid`; the core ships the migrations; spec §5 updated. The immutability tests cover both columns. A nested `Audit::batch()` reuses the outer `batch_uuid` (tested).
- **A4 (Q5):** approved, with `username` **nullable** unique for now.
- **A5 (Q6):** approved. The random password goes to the console only, never to a log. In production the seeder requires `ADMIN_SEED_PASSWORD`, or tells the user to run `admin:create-superadmin`.
- **A6 (Q7), changed:** session revocation is independent of the session driver. `users.sessions_invalidated_at` is set on deactivate, level change and password change; the `active` middleware logs out any session whose login time is before it. Deleting `sessions` rows stays as extra cleanup when the driver is `database`. Tested with the `file` driver.
- **A7 (Q8):** approved. `is_super_admin` is still shared, for superadmin_only areas.
- The 10 silent decisions are listed again in the 03a report for review.

### Review of 03a (2026-10-19)

03a accepted. Before 03b, a separate commit `fix(test): psr-4 fixture paths` (done: `e828edd`). The 10 decisions are approved except:

- **A8 (#9), changed:** inactive users are rejected **at login** through `Fortify::authenticateUsing` (core `Auth\AuthenticateUser`, wired in the skeleton), which writes `login_failed` with meta `reason=inactive`. The `active` middleware still guards existing sessions.
- **A9 (#10), changed:** the kit's delete-account route, controller action and UI are removed in 03b (spec §6.3: no self-delete). The other deferrals stand.
- **A10 (#7):** Phase 09 roadmap gains "MySQL BEFORE UPDATE/DELETE triggers on `activity_log` that refuse writes unless a session flag set only by `admin:audit-prune` is present; MySQL test."
- Stop after 03b for review.

## Execution notes 03a (2026-10-19)

Where execution added to or differed from the plan:

- **CLI PHP:** commands ran with `/opt/homebrew/opt/php@8.4/bin` first in `PATH`, per command only (as in Phase 02).
- **`ImmutableActivityBuilder`** (one extra file): the blocking builder is a named class attached with `#[UseEloquentBuilder]`, because Larastan can't type an anonymous generic builder. It blocks `update`, `delete`, `forceDelete`, `increment`, `decrement` and `upsert` (the test caught that `increment` skipped the first version). The model itself throws from `performUpdate()` / `performDeleteOnModel()`, so `saveQuietly()` / `deleteQuietly()` are blocked too.
- **`$guarded = ['*']`** on `ImmutableActivity` (spatie's parent has `[]`); spatie fills rows by property assignment, so nothing needs mass assignment and `update([...])` is refused.
- **Not added:** `audit.retention_days` (no reader until `admin:audit-prune` in Phase 07; no dead config) and `last_login_at` on login (moves to 03b with the column).
- **Failed / locked login identifier:** read from the field named by `config('fortify.username', 'email')`, so it follows Fortify without a second setting.
- **`password_reset` log name** is `system` for now: the skeleton `User` is not in a module. It becomes `users` when the core User model moves into the Users module (Phase 07).
- **`generated.d.ts`** now also has `Yuan.AdminCore.Audit.AuditEvent` (the transformer emits every enum in the scanned dirs); the Phase 07 audit UI can use it.
- **Testbench:** `#[WithMigration]` loads the Laravel `users` / `jobs` tables; the `activitylog` provider is registered; the fixture `User` is the auth model.
- **Found, not fixed (pre-existing):** the fixture folder `tests/Fixtures/modules` maps to the namespace `…\Fixtures\Modules\` only on a case-insensitive file system (macOS). It would fail on Linux. Proposed fix: rename the folder to `Modules` in Phase 04 (it touches every fixture path). **Fixed before 03b** in `fix(test): psr-4 fixture paths`: `modules` → `Modules`, `core` → `Core`, and `composer check` now runs `dump-autoload --optimize --strict-psr` for the package and the skeleton (proved: the old lowercase folder exits 1 with 3 violations; a skeleton class moved to `app/models_x` exits 1).
- **`migrate:fresh --seed` / `migrate:rollback`** run on the test database (the dev database was left as is).
- **`admin:docs`** doesn't exist yet (Phase 10); AUTO sections not regenerated.

## Execution notes 03b (2026-10-19)

Where execution added to or differed from the plan (A6, A8, A9 already applied):

- **Separate commits before 03b:** `e828edd fix(test): psr-4 fixture paths` (your request) and `8514334 fix(audit): never log encrypted attributes`. The second came from a background security review of the 03a commit: an attribute with an `encrypted` cast was read decrypted by the trait and stored in plain text in `attribute_changes`. Reproduced, fixed (encrypted casts are excluded like `omit`), tested.
- **Guard rails run before spatie's listeners.** spatie's own `deleting` listeners detach a role's users and permissions (and a user's roles on force delete) **before** a `deleting` listener of ours could throw, so a refused delete would still have emptied the Super Admin level. The checks are in `Level::delete()` and `HasLevel::delete()` instead, and the tests assert the pivots are intact after a refusal.
- **Session revocation (A6), superseded by A11 below:** login stamps `admin_core.login_time` in the session (and `last_login_at`). `active` logs out when `is_active` is false or `sessions_invalidated_at` is later than that stamp; a session without the stamp counts as 0, so it is revoked too. Revocation also rotates the remember token, otherwise a remember-me cookie would sign straight back in. When the user revoked their own sessions (own password change), the current session's stamp is moved to the revocation time and it stays signed in. Tested on the `file` driver; the `database` driver also deletes the stored rows. Ceiling: one-second resolution, so a session that signs in within the same second as a revocation survives it.
- **Inactive at login (A8):** core `Auth\AuthenticateUser`, wired in the skeleton's `FortifyServiceProvider`. Wrong credentials return null, so Fortify still fires `Failed`, counts the attempt for the rate limiter and shows its normal message. Only the right password on an inactive account gets "Akun Anda tidak aktif. Hubungi administrator." plus one `login_failed` with `reason=inactive`.
- **Failed / locked logins find the account** by the identifier when the event has no user (Fortify's custom-callback path fires `Failed` with `user = null`), so the SA visibility rule also hides attempts on Super Admin usernames.
- **Self-delete removed (A9):** route `profile.destroy`, `ProfileController::destroy`, `ProfileDeleteRequest` (and its AGENTS.md exception line), `delete-user.tsx` and its use on the profile page. The two kit tests became one: `DELETE /settings/profile` → 405 and no `profile.destroy` route.
- **Skeleton:** kit routes now have `active`; `DatabaseSeeder` only calls `AdminCoreSeeder` (the kit's fixed "Test User" and `WithoutModelEvents` are gone, so seeding is audited like everything else); `.env.example` has `ADMIN_SEED_PASSWORD=`; `UserFactory` has `username`, `is_active` and an `inactive()` state.
- **Package tests use real users:** spatie's gate hook requires `Authorizable`, so `GenericUser` in the old menu / route / shared-props tests became the fixture `User`. `is_active` that isn't loaded counts as inactive (fails closed); test helpers create users with it set.
- **No config dead weight:** permission table names and the teams feature stay at spatie's defaults (the core migration hardcodes them).
- **`composer setup` twice:** not run. `key:generate` in it rewrites `APP_KEY` in `skeleton/.env`, and it re-seeds the dev database. Instead, on the test database: `migrate:fresh --seed`, then `migrate --seed` and `db:seed` twice more → identical counts (`users=2 roles=2 model_has_roles=2 model_has_permissions=0 activity_log=2`; `permissions=0` because the skeleton has no modules yet); passwords printed only on the first run. Then `migrate:rollback` (all 6 migrations down) and a clean `migrate`. The test database was reset afterwards.
- **`admin:docs`** doesn't exist yet (Phase 10).

### Follow-up: version-based session revocation (2026-10-19)

A background security review of `549cf54` flagged the timestamp check, and a probe confirmed it: a session that signed in during the same second as a revocation stayed signed in (`200`). Approved replacement (**A11**), committed as `fix(rbac): version-based session revocation`:

- New core migration `2026_10_19_000004_replace_sessions_invalidated_at_with_session_version`: adds `users.session_version` (unsigned int, default 0) and drops `sessions_invalidated_at` (pre-1.0, no project uses it). `000003` is left as shipped.
- Login stores the user's version in the session (`admin_core.session_version`). Deactivate, level change and password change call `revokeSessions()`: an atomic `increment()` (a stale in-memory user can't write an old number back; tested) plus a new remember token. `EnsureUserIsActive` logs out a session whose stored version differs. A session with no stored version (signed in without a Login event, e.g. `actingAs()`) counts as 0, so it is valid only until the first revocation.
- Self-revocation moves the current session to the new version, so it stays signed in.
- **A12:** `EnsureUserIsActive` is appended to the skeleton's `web` group, so Fortify and kit routes are covered too. Guests and the route named `logout` pass through, so a revoked session can still sign out normally.
- Tests (package, `file` driver): same-second revocation logs out; each of level change / deactivate / password change logs out; self-revocation keeps the session; atomic bump from a stale copy; stampless session only valid until the first revocation; revoked session reaches `logout`; guests pass. Skeleton (`file` driver, real Fortify sign-in): a revoked session is rejected on Fortify's password-confirm routes and on kit pages; own password change keeps the session; a revoked session reaches `logout`.
- **Found, not fixed (pre-existing kit gap):** `GET user/confirm-password` returns 500, because the kit never registers `Fortify::confirmPasswordView()`. The test uses Fortify's `password.confirmation` / `password.confirm.store` routes instead. The confirm-password screen belongs to the auth screens (Phase 05, `auth.html`).
- Spec §5 (`users` row) and §6.3 (session rail) reworded; frontend-behavior §2 gains a "Revoked session" row.

### Review of 03b (2026-10-19)

03b accepted, including the §7.1 encrypted-cast wording (applied). Two fixes, one commit `fix(rbac): remember-me versioning and idempotent setup`:

- **Remember-me + `session_version` (A13):** no code change was needed. A session restored from a remember cookie goes through `SessionGuard::user()`, which fires `Login`, and the core listener stores the user's current version. Skeleton tests: (a) a user at `session_version = 1` restored from a remember cookie stays signed in, with version 1 in the session (proved to fail with `302` when the stamp is disabled); (b) a remember cookie issued before a revocation can't sign in (the token was rotated).
- **Idempotent `composer setup` (A14):** `key:generate` runs only when `APP_KEY` in `skeleton/.env` is empty, and setup fails if it is still empty afterwards. An existing key is never rotated.
- **Rehearsal:** a scratch copy (no `vendor`, `node_modules`, `.env`, build output; new git repo) with its own database `admin_boilerplate_rehearsal` (created and granted to the dev DB user by the owner), `.env` from `.env.example` plus the DB credentials. `composer setup` twice:

  | Run | Exit | `key:generate` | Passwords printed | `APP_KEY` (sha1) | Rows |
  |---|---|---|---|---|---|
  | 1 | 0 | ran | 2 | `150d35a1f070` | users 2, roles 2, permissions 0, role_has_permissions 0, model_has_roles 2, model_has_permissions 0, activity_log 2, migrations 7 |
  | 2 | 0 | skipped | 0 | `150d35a1f070` | identical |

  `permissions = 0` because the skeleton has no modules yet. The seed passwords appear only in the console output, not in `storage/logs`. Setup's test-database step migrates `admin_boilerplate_test` (as every setup does); the dev `.env` and dev database were not touched.

## Open questions (as asked; answered in Approval)

1. **Split.** Approve 03a / 03b as above, with two commits and the roadmap row split? **Recommended: yes.**
2. **Dependencies:** `spatie/laravel-activitylog: ^5.1` (03a) and `spatie/laravel-permission: ^8.3` (03b) in the package `require`, at the versions in spec §1.1. Approval of this plan = approval of both?
3. **Spec conflict: masked fields in model logging.** §7.1 says `LogsModuleActivity` "excludes … every field in `audit.masked_fields`". But the same section says `partial` keeps the first and last 4 characters, and §9.1's `AuditMaskingTest` checks that `partial` / `full` fields are masked across **all** event types. Both can't hold. **Recommended:** exclude `$hidden` + `omit` fields; `partial` / `full` fields are logged masked (e.g. a NIK change shows `3201••••0001` → `3201••••0002`). §7.1 is reworded to match. **Alternative:** exclude every masked field from model logs, so masking only applies to `Audit::record()` meta.
4. **`activity_log` shape under activitylog v5.** Spec §5 puts `{old, attributes, context, meta}` in `properties`. v5 stores changes in its own `attribute_changes` column. **Recommended:** keep v5's split, `attribute_changes = {old, attributes}` and `properties = {context, meta}`, plus our own `batch_uuid` column. The core ships the `activity_log` and permission-table migrations itself (projects don't publish spatie's stubs). Spec §5 updated. **Alternative:** force everything into `properties` and leave `attribute_changes` empty (fights the package).
5. **`users` columns now.** Spec §5's `username`, `is_active`, `last_login_at` and soft deletes are needed in this phase (`active` middleware, `last_login_at` on login, `login_failed` identifier), but the Users module is Phase 07. **Recommended:** an additive core migration now. Login stays **by email** (the kit's Fortify setting) until the auth screen (Phase 05, `auth.html`) decides between username and email, and `login_failed` stores whichever identifier was typed. **Alternative:** switch Fortify to `username` now.
6. **Seeded Super Admin credentials** ("no secrets in seeders"). **Recommended:** usernames `superadmin` and `superadmin2`, emails `superadmin@example.test` / `superadmin2@example.test`, password from `ADMIN_SEED_PASSWORD`. If that's empty, each user gets a random password **printed once** by the seeder. An existing user is never touched again (idempotent, and passwords are never reset by a re-seed). **Alternative:** a fixed dev password that only works when `APP_ENV=local`.
7. **Killing sessions** on deactivate or level change. **Recommended:** delete that user's rows from the `sessions` table (the skeleton uses the `database` driver), keeping the current request's session, and have `admin:doctor` warn when `session.driver` isn't `database`. **Alternative:** a per-user session version checked by `active` (works on any driver, but adds a column and a check on every request).
8. **`auth.permissions` for Super Admin.** **Recommended:** every synced permission name, so the frontend `can()` needs no SA special case (spec §6.2.5 keeps `Gate::before` as the only one). **Alternative:** `[]`, with `usePermission()` short-circuiting on `is_super_admin`.
