# Admin Boilerplate — Master Roadmap

- **Date:** 2026-10-16
- **Specs:** [System Design](../specs/2026-10-16-admin-boilerplate-design.md) · [Frontend Behavior](../specs/2026-10-16-frontend-behavior.md) · [Mockups](../design-implementation/README.md)
- **Not for coding agents:** `docs/specs/2026-10-16-ui-design.md` (input for the UI/UX model)
- **Target:** `yuan/admin-core` v1.0.0 + a working `skeleton/` app

## How this roadmap is used

1. Phases run strictly in order. A phase is done only when its **Accept** criteria pass and `composer check` is green.
   **Fast track (2026-10-23):** the goal is to start a real client project as soon as possible. Order from here: **06c → 07 → 08 → 10a → start the first project → 09** (09 must be done before that project's production deploy). Items deferred by the fast track are listed under **Post-v1** at the end.
2. **Before starting a phase**, the agent writes a detailed phase plan in `docs/plans/YYYY-MM-DD-phase-NN-<name>.md`:
   - The files it will touch.
   - Its steps.
   - The tests it will add.
   - Any open questions.

   **Wait for approval of that plan before coding.**
3. During the phase, tick boxes here and in the phase plan.
4. At the end of the phase, update `DEVELOPER.md` (recipes, key-files index). `php artisan admin:docs` joins this step once it exists (Post-v1).
5. Anything discovered that changes a spec becomes a proposal in the phase report. Never edit a spec silently.
6. **Design gate:** a UI phase (05, 06, 07) may start only when every mockup listed for it in `docs/design-implementation/README.md` is `✅ approved`. The UI/UX model can produce them in parallel with Phases 00–04.
7. **Review rhythm:** one owner browser review per phase, at its end. A split phase may add a review between parts when the phase plan says so.

## Progress

| Phase | Name | Status |
|---|---|---|
| 00 | Toolchain & version verification | ☑ |
| 01 | Package skeleton & module registry | ☑ |
| 02 | Type bridge & shared props | ☑ |
| 03a | Audit core | ☑ |
| 03b | RBAC core | ☑ |
| 04 | Contract & architecture test suite (04a ☑, 04b ☑) | ☑ |
| 05 | Layout shell (needs mockups: tokens, shell, command-palette, error-pages, auth) | ☑ |
| 06 | Shared components & core services (06a ☑, 06b ☑, 06c ☑) | ☑ |
| 07 | Core modules + Beranda (07a, 07b, 07c built and reviewed; [plan](./2026-10-23-phase-07-core-modules.md)) | ☑ |
| 08 | Module generator (08a, 08b built and reviewed; [plan](./2026-10-24-phase-08-module-generator.md)) | ☑ |
| 10a | Release mechanics (v1.0.0) ([plan](./2026-10-25-phase-10a-release-mechanics.md); rehearsal from rc.2 passed 2026-10-26) | ☑ |
| — | Start the first client project | ☐ |
| 09 | Ops & security (before the first project's production deploy) | ☐ |
| Post-v1 | Deferred by the fast track | ☐ |

---

## Phase 00 — Toolchain & Version Verification
- [x] Monorepo layout: `packages/admin-core`, `skeleton/` (Laravel 13 + React starter kit), `docs/`.
- [x] `skeleton` requires `yuan/admin-core` through a Composer **path** repository (symlink).
- [x] Verify that each package in spec §1 has a stable release supporting L13. Fill spec §1.1 with exact versions. Report any package that fails, and follow the Wayfinder fallback rule if it applies. _(Wayfinder fallback not applied: D18. Inertia 3: D17. PHP 8.4: D19.)_
- [x] Pint, Larastan (level 8), Pest + arch plugin, Testbench (package), ESLint, Prettier, TS strict.
- [x] `composer check` script running every gate from spec §9 across the package and the skeleton. _(`typescript:transform` joins gate 3 in Phase 02.)_
- [x] `.env.example`: `APP_TIMEZONE=Asia/Jakarta`, `APP_LOCALE=id`, `QUEUE_CONNECTION=database`, `SENTRY_LARAVEL_DSN=`, `HEALTH_TOKEN=`.

**Accept:**
- A fresh clone, followed by `composer setup` and then `composer check`, passes.
- Login works in the skeleton.
- Spec §1.1 is filled in.

## Phase 01 — Package Skeleton & Module Registry
- [x] `AdminCoreServiceProvider`, `config/admin-core.php`, package auto-discovery.
- [x] `ModuleDefinition` (typed, validated) and `ModuleRegistry`:
  - Scans both roots and fails boot on duplicate slugs.
  - Registers providers, migrations and routes (prefix, name, middleware).
- [x] `modules:cache` / `modules:clear`, hooked into `optimize` / `optimize:clear`.
- [x] `PageResolver` (both roots + override map) + Vite alias `@admin-core` + Tailwind `@source`.
- [x] `MenuBuilder` (grouped, ordered, permission-filtered; superadmin_only shown to SA only).
- [x] `modules:list`, `admin:doctor` (npm deps, cache state, env sanity).
- [x] A dummy test module in the package's test fixtures.

**Accept:**
- A module dropped into `skeleton/modules` appears in routes and menu with zero other edits.
- Disabling or removing it leaves boot clean.
- An invalid `module.php` gives a clear error message.

## Phase 02 — Type Bridge & Shared Props
- [x] laravel-data + typescript-transformer configured for both roots → one `generated.d.ts` per project (spec §4).
- [x] Wayfinder configured; the frontend imports typed routes and actions.
- [x] Shared Data objects: `AuthData` (user, is_super_admin; level + permissions in Phase 03), `MenuGroupData`, `FlashData` (native Inertia flash), `AppData`, `PaginatedData<T>`.
- [x] `HandleInertiaRequests` shares only Data objects; projects extend it in the skeleton (spec §2.2).
- [x] `composer check` regenerates the types and fails on a diff; `composer setup` and `post-update-cmd` regenerate.

**Accept:**
- Renaming a property on a Data class without regenerating fails `composer check`.
- After regenerating, a TS usage of the old name fails `tsc`.

## Phase 03 — Audit Core & RBAC Core
Split into 03a and 03b (approved 2026-10-19, [phase plan](./2026-10-19-phase-03-audit-rbac.md)), each with its own `composer check` and commit. Audit comes first because the RBAC pieces (matrix saves, level changes) must already log.

### Phase 03a — Audit Core
- [x] **Audit core (spec §7.1):**
  - `AuditEvent` enum with id labels and badge mapping.
  - `Audit::record()`, `Audit::batch()` (nested batches join the outer one) and `Audit::actingAs()` (causer for jobs).
  - `LogsModuleActivity` trait with the `auditLabel()` default.
  - `AuditContext` (web / cli / queue).
  - `Masker` with the `audit.masked_fields` config, applied to `attribute_changes` and `properties`.
  - `ImmutableActivity` model.
  - `activity_log` migration (core-owned, spatie v5 columns + `batch_uuid` + spec §5 indexes).
- [x] Auth listeners: `login`, `logout`, `login_failed` (username only), `login_locked`, `password_reset`.

**Accept:**
- [x] A rolled-back transaction leaves no activity row.
- [x] Updating or deleting an activity row throws.
- [x] Masking holds for `omit` / `partial` / `full`.
- [x] A queued job's activity has the requesting user as causer.

### Phase 03b — RBAC Core
- [x] `Activity::visibleTo()` (SA rule) and `HasActivityHistory` trait (backend only); moved from 03a because the SA rule needs levels.
- [x] Migrations extending spatie tables (spec §5) and the `users` columns (`username` nullable unique, `is_active`, `last_login_at`, `session_version`, soft deletes).
- [x] `PermissionSynchronizer` + `permissions:sync` (idempotent, orphan removal, cache reset, skips superadmin_only).
- [x] `PermissionMatrix` (build, save with the dependency rule, transaction, audit diff, event).
- [x] User: `assignLevel()`, `isSuperAdmin()`, and `givePermissionTo` / `syncPermissions` that throw.
- [x] `Gate::before`, `EnsureUserIsActive`, `EnsureSuperAdmin`; session revocation on deactivate, level change or password change through `users.session_version` (any session driver; `EnsureUserIsActive` also in the skeleton's `web` group), plus `sessions` row cleanup on the database driver.
- [x] Seeder: Super Admin level, 2 SA users, Operator level (view-only); production requires `ADMIN_SEED_PASSWORD`.
- [x] `admin:create-superadmin`.
- [x] `AuthData` gains `level: ?LevelData` and `permissions: list<string>` (frontend-behavior §2).

- [x] Inactive accounts refused at login (`Fortify::authenticateUsing` → `login_failed`, reason `inactive`); the kit's self-delete (route, action, UI) removed.

**Accept:**
- [x] Pest proves every item in spec §6.2 and §6.3 that exists at this phase.
- [x] Seeders are idempotent: `composer setup` runs twice on the same database without errors or duplicate rows. _(Scratch rehearsal with its own database; `APP_KEY` unchanged.)_
- [x] Matrix saves and level changes write one batched, correctly named event each.
- [x] Session revocation works with the `file` session driver.

## Phase 04 — Contract & Architecture Test Suite
- [x] `Yuan\AdminCore\Testing\ContractAssertions` + every test in spec §9.1 (including the audit contract tests; the widget contract test is Phase 07). Split into 04a (contract assertions) and 04b (arch rules), [phase plan](./2026-10-19-phase-04-contract-tests.md).
- [x] Test helpers: `assertAudited($model, 'updated', masked: [...])`, `assertNotVisibleToNonSuperAdmin(...)`, plus the R11 module helpers. _(Widget helpers and `WidgetContractTest` moved to Phase 07, approved 2026-10-19.)_
- [x] Tests run against the package's fixture modules and the skeleton's modules.
- [x] Arch tests read their exclusions (the temporary starter-kit exceptions in AGENTS.md §5) from one list, and a test fails if a listed file no longer exists.
- [x] Deliberately break each rule once in a scratch branch to confirm the matching test fails, then revert. Record this in the phase plan.

**Accept:** each rule in spec §9.1 has a test that is proven to fail when the rule is broken.

## Phase 05 — Layout Shell
- [x] Theme tokens (package `resources/css/admin-core.css`, from the design source; light + dark).
- [x] `AdminLayout`, `AppRail`, `Topbar`, `Breadcrumbs`, `UserMenu`, `ThemeToggle`, toasts, maintenance banner.
- [x] `CommandPalette` (navigation, actions, recent pages).
- [x] `usePermission()`, `<Can>`, `lib/format.ts` (id-ID).
- [x] Error pages 403/404/419/500/503; auth pages (login, forgot, reset, change password).
- [x] Lucide icon name list generated from the installed `lucide-react`, committed and covered by `check:generated`; `ModuleDefinition` checks `icon` against it (replaces the Phase 01 format-only check).

**Accept:**
- Matches `shell.html`, `command-palette.html`, `error-pages.html` and `auth.html`; behaviour per frontend-behavior §2–4.
- Rail state persists.
- The palette shows only permitted items.
- No horizontal scroll at 375px.
- Fully keyboard-operable.
- In a real browser: trigger a success toast, navigate away, press Back; the toast must not reappear.

## Phase 06 — Shared Components & Core Services
Split into 06a (lists + trash), 06b (forms + show) and 06c (exports + attachments), approved 2026-10-20, [phase plan](./2026-10-20-phase-06-shared-components.md). Browser review after 06a and after 06b, full review after 06c.

- [x] DataTable family (`pattern-index.html`, frontend-behavior §5) + backend `HasDataTable` (query-builder, URL state, per_page cap 100). _(06a)_
- [x] Form fields (`pattern-form.html`, frontend-behavior §6), `FormFooter`, `UnsavedChangesGuard`, `StaleUpdateDialog`. _(06b)_
- [x] `PreventsStaleUpdates` (409 + dialog). _(06b)_
- [x] `ExportManager` + `ExportJob` + the `exports` table + scheduler cleanup. _(06c)_
- [x] Attachments (trait, upload, signed download, `FileUpload`, `AttachmentList`). _(06c)_
- [x] Trash pattern (SA): list, restore, force delete; Undo toast. _(06a)_
- [x] Shared prop `downloads.ready_count` (Data object) once the `exports` table exists. _(06c)_
- [x] `visibleTo()` scope macro/trait, no-op by default. _(06a)_
- [x] Once `maatwebsite/excel` is installed, add the class-based `Excel::download` arch rule, keep the source scan (catches aliases), and re-run its break test. _(06c)_

**Accept:**
- A demo module in the skeleton uses every component.
- A concurrent edit triggers the stale dialog.
- An export above the threshold is queued and shows in Downloads.
- An expired or unauthorized attachment URL fails.

## Phase 07 — Core Modules
- [x] Users (`users-*.html`, frontend-behavior §8.1 + SA protections). _(07a)_
- [x] Levels + Hak Akses matrix (`levels-*.html`, frontend-behavior §8.2). _(07a)_
- [x] AuditLog (`audit-log.html`, frontend-behavior §8.3):
  - `AuditSummary` service with indexes, cache and the SA visibility rule.
  - Summary components `StatTile`, `StatStack`, `SegmentBar`, `BarChartCard`, `FilterBar` in core.
  - Performance test: summary < 500ms on 1M seeded rows.
  - Optional retention pruning.
- [x] Loading state on action buttons (owner, 2026-10-23; its own commit `feat(ui): loading state on action buttons`, before 07b): the core `Button` gets `loading` (spinner, disabled, `aria-busy`), wired on every action that hits the server (form submit, confirm dialogs, bulk delete, export, upload, matrix save, reset password, auth forms); double submit impossible; browser test with a slow request; rule in frontend-behavior §2 and §9.
- [x] Settings (07c, scope extended 2026-10-23, design spec §7.3): tabs Umum (app name, favicon, logo 1:1, logo landscape), Kontak (phone, WhatsApp, address, postal code), Sosial Media (Instagram, X, TikTok, Facebook, YouTube, LinkedIn), Akses Situs (open / maintenance / coming_soon + message, replaces `maintenance_banner`), Keamanan (session lifetime), Ekspor (queue threshold). Every field through the settings registry (typed, cached, `settings_updated` with a diff, `settings('kontak.telepon')`), so projects add fields the same way. Branding uploads are the one public-disk exception (AGENTS §5). `php artisan admin:access open` as the CLI escape hatch; maintenance and coming_soon never lock out a Super Admin. The Health tab UI is Post-v1.
- [x] Downloads (`downloads.html`, frontend-behavior §8.4): the list, file route and badge link ship in Phase 06c (`Core::Downloads/Index` at `/account/downloads`, moved forward after the 06c review, 2026-10-23); Phase 07 adds the Settings override of the export threshold and anything the full design adds.
- [x] Activity logging wired on every core module using the taxonomy (Users: `level_changed`, `user_activated` / `user_deactivated`, `password_reset`; Settings: `settings_updated`). ExportManager (`exported`) and Attachments (`attachment_*`) log since Phase 06c.
- [x] `ActivityHistory` Riwayat tab on core Show pages (`activity-history.html`, frontend-behavior §8.3a).
- [x] **Beranda (spec §7.2):**
  - Dashboard module, `Widget` base class, `WidgetRegistry` and the widget Data objects.
  - Deferred loading per widget, failure isolation and caching.
  - `WidgetGrid` and `WidgetTable`.
  - 2 core widgets: activity by day, failed logins (fast track; the other core widgets are Post-v1).
  - The post-login redirect rule and the no-access page.
  - Mockup `dashboard.html`, behaviour per frontend-behavior §8.6.
  - `ModuleDefinition` widget rules (extends `Widget`, key prefixed with the module slug), `WidgetContractTest` and the test helpers `assertWidgetHiddenWithout(...)`, `assertWidgetUsesScope(...)`, `assertWidgetWithinBudget(...)` (moved from Phase 04).
- [x] `admin:audit-prune` + scheduler entry (only when `retention_days` is set). _(07b)_
- [x] **Forced password change** (from the Phase 05 auth review, 2026-10-20): a `must_change_password` flag is set when an admin creates a user or resets a password; a middleware allows only `/account/password` and logout until the password is changed (the `Core::Auth/ChangePassword` screen then shows the reference's mandatory state: info alert, Keluar as the only exit). A test checks that every other route redirects there. User validation forbids `@` in usernames (the login field reads `@` as an email).
- [x] Extension points: swappable User model with a minimal user form extension (`admin-core.users.form_extension`: extra fields in the Users forms, validation, `UserData` and detail page), page overrides, events (`admin:eject` is Post-v1).
- [x] `admin-core.branding.logo`: a static file in the project's `public/`, the fallback when Settings → Umum has no uploaded logo.

**Accept:**
- Every guard rail in spec §6.3 has a test.
- A non-SA viewer's audit list and summary contain zero SA-related events (test).
- Matrix changes apply on the next request.
- One failing widget doesn't affect the others (test with a widget that throws).
- A user with only `invoices.view` lands on Beranda and sees only widgets they are allowed to see; a user with no permissions lands on the no-access page.
- An overridden page and a swapped User model work in the skeleton.
- Install admin-core as a copy (path repo with `symlink: false`), run `npm run build`, and verify a core-module page resolves and its Vite manifest entry preloads (`viteEntry()`).

## Phase 08 — Module Generator
- [x] `make:module Name --fields="..." --actions=... --superadmin-only --group= --icon=`.
- [x] Generated models use `LogsModuleActivity` and `auditLabel()`. A field named like a masked field gets a printed reminder; generated tests include `assertAudited` for create, update and delete.
- [x] `make:widget {Module} {Name} --type= --size=` creates the widget class, registers it in `module.php` and generates its tests (permission, scope, budget).
- [x] Field types: `string, text, integer, decimal, currency, boolean, date, datetime, enum(a,b), foreign(table), file`.
- [x] Stub pages follow `pattern-index/form/show.html` exactly.
- [x] Stubs generate the full contract (Data in/out, policy, export, pages, form, factory, seeder, tests). A module that declares `edit` gets the `lock_version` column (unsigned int, default 0), `PreventsStaleUpdates` on the model and `lock_version` in `Update{Name}Data` (added 2026-10-20).
- [x] Post-run steps: `permissions:sync`, `typescript:transform`, Wayfinder generation, and the next steps printed.

**Accept:**
- A module generated with every field type passes `composer check` with no manual edits.
- It shows up in the menu, the palette and the matrix.

## Phase 09 — Ops & Security
_Fast track: complete, scheduled after 10a and before the first client project's production deploy._

- [ ] spatie/laravel-health with the checks in spec §7, a token-protected `/health`, and mail on failure (the SA Health tab UI is Post-v1).
- [ ] Sentry SDK config: PII scrubbing, user + level tags, release tag, off when DSN is empty.
- [ ] Security headers, login rate limit, password rules (the session timeout from Settings moved to Phase 07c).
- [ ] `BACKUP_VERIFIED_AT` health warning (server-level backups are documented in the README).
- [ ] Login "too many attempts" state as in the reference: remaining seconds from `RateLimiter` on the server (in `LoginPageData`), the warning alert style, and a live countdown on the disabled submit button (deferred from Phase 05c).
- [ ] The `admin-health-check` Boost skill (R8), added with the health checks (moved from 10a, 2026-10-25).
- [ ] MySQL BEFORE UPDATE/DELETE triggers on `activity_log` that refuse writes unless a session flag set only by `admin:audit-prune` is present; MySQL test (03a decision #7).

**Accept:**
- A forced exception reaches GlitchTip or Sentry with no request body or password in it.
- `/health` returns 401 without the token and JSON with it.
- Stopping the queue worker makes the queue check fail.

## Phase 10a — Release Mechanics (v1.0.0)
_Fast track: release mechanics only; docs polish moved to Post-v1._

- [x] `composer release {version}` (repo root): subtree-splits `packages/admin-core` into its private repository and tags `v{version}` there; refuses to run with a dirty tree or a red `composer check`.
- [x] `CHANGELOG.md` (the `[Unreleased]` section becomes `v1.0.0`) and `UPGRADE.md`; first tag `v1.0.0`.
- [x] `admin:remove-demo` removes the demo modules `Invoice` and `Customer` and the generator's golden modules `Sample`, `SampleReadonly` and `SampleAdmin` (folders, permissions, tables) from a new project; the boilerplate repo keeps all five (added 2026-10-20, Phase 06 plan Q4; golden modules added 2026-10-24, Phase 08 plan Q8 and the 08b review).
- [x] New-project script: copies `skeleton/` to a new folder, requires `yuan/admin-core` from the private VCS repository (not the path repository), runs `admin:remove-demo` and `composer setup`.
- [x] AI docs shipped in the package through Laravel Boost (added 2026-10-25): `resources/boost/guidelines/core.blade.php` (condensed AGENTS.md for projects), `resources/boost/skills/*/SKILL.md` from the DEVELOPER.md recipes, `laravel/boost` in the skeleton (`boost:install` in the new-project script, `boost:update` in `post-update-cmd`), and a drift test that every class, command and config key they name exists.
- [x] **Release rehearsal:** create a brand-new project with the script from the tagged VCS release, generate one module, run `composer check` and the perf group; Claude Code in the new project creates a module through the `admin-make-module` skill, `composer check` green afterwards.

**Accept:** the release rehearsal is completed in under 15 minutes using only the new-project script and the shipped docs. Met 2026-10-26 from `v1.0.0-rc.2`: about 2 min 44 s for the scripted steps, about 6 min 30 s with the Claude Code step ([times](./2026-10-25-phase-10a-release-mechanics.md)).

## Start the First Client Project
- [ ] Create the project with the new-project script from a tagged release; client-specific work happens in that project's own repository and roadmap.
- [ ] Phase 09 is done and the project is updated to the release that contains it before its production deploy.

## Post-v1 (deferred by the fast track, 2026-10-23)
- [ ] `admin:eject` (Phase 07 extension points).
- [ ] The SA Health tab UI (Phase 09 health checks and `/health` stay in Phase 09).
- [ ] The remaining Beranda core widgets (Phase 07 ships 2).
- [ ] `admin:docs` generates the AUTO sections of `DEVELOPER.md`; `composer check` fails if they are stale.
- [ ] README: install, new project from the skeleton, VPS deploy (Nginx, PHP-FPM, supervisor queue, scheduler, server backups), upgrading.
- [ ] Find the cause of Pest's unexplained "1 warning" (no detail in its output; shows in both the boilerplate's and projects' runs; found in the 10a rehearsal).
