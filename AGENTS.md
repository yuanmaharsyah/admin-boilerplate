# AGENTS.md — Rules for AI Agents

You are building and maintaining a reusable Laravel 13 admin boilerplate (`yuanmaharsyah/admin-core` + `skeleton/`).

| File | Role |
|---|---|
| `DEVELOPER.md` | **Read first.** The map, key files and recipes. Use it to avoid reading the whole repo |
| `AGENTS.md` (this file) | Rules: must / never. Wins over everything except an explicit instruction from the user |
| `docs/specs/*` | What and why. Never edit them silently; propose changes |
| `docs/specs/*-frontend-behavior.md` | **How the UI behaves** (logic, states, interactions). Read the relevant section when building a screen |
| `docs/design-implementation/*.html` | **How the UI looks, source 1.** Approved HTML mockups. Check `README.md` there for status |
| `docs/design-implementation/reference/` | **How the UI looks, source 2.** The owner's own design source, created for this project; read and adapt it freely. Private: not in the public repository; when it's absent, go to source 3 |
| `docs/specs/*-ui-design.md` | **How the UI looks, source 3.** Design rules and tokens where sources 1–2 are silent |
| `docs/plans/*` | What to do next and the progress so far |

**UI sources, in priority order:** (1) approved mockups in `docs/design-implementation/*.html`; (2) the owner's design source in `docs/design-implementation/reference/` (private, absent from the public repository: then skip it); (3) `docs/specs/*-ui-design.md`. A higher source wins on looks. Never read `docs/design-implementation/briefs/` (input for the UI/UX model; private, absent from the public repository).
A screen with no design file follows the closest existing design plus ui-design.md. Mark it **derived** in the phase plan; the owner approves it by reviewing it rendered in a browser at the end of the phase.

If any of these files conflict with each other or with the code, **stop and ask**, except where the priority order above settles it. For behaviour, the frontend-behavior spec wins over every design source.

---

## 1. Workflow

1. Find the current phase in `docs/plans/*-master-roadmap.md`.
2. **Write the phase plan** at `docs/plans/YYYY-MM-DD-phase-NN-<name>.md`, covering:
   - The files to create or modify.
   - The steps.
   - The tests to add.
   - Any open questions.

   **Stop and wait for approval.**
3. Implement only that phase. Follow the matching recipe in DEVELOPER.md when one exists.
4. Run `composer check` until it is green.
5. Update `DEVELOPER.md`: recipes and the key-files index; run `php artisan admin:docs` once it exists (Post-v1 in the roadmap).
6. Tick the boxes in the roadmap and the phase plan.
7. **Report** with:
   - The files changed.
   - The `composer check` summary output.
   - Decisions made where the spec was silent.
   - Proposed spec changes.
   - Anything deferred.

Tasks outside the roadmap (bug fixes, small features) follow the same steps, except a one-paragraph plan in chat replaces the plan file.

## 2. General Rules

- Never add, remove or upgrade a dependency without approval. Versions are recorded in spec §1.1.
- Never change machine-level config (PHP version, global packages, shell profile), drop databases, or remove dependencies without asking first.
- Never change the module contract, RBAC rules, type bridge or quality gates without approval.
- If something is unspecified, choose the simplest option and state it in the report. Never invent requirements.
- No placeholders, `TODO`s, commented-out code or dead code in finished work.
- Never weaken or skip a test, a Larastan rule or a lint rule to get green. Fix the cause. Larastan baselines are forbidden in `packages/admin-core`.
- Prefer the generator stub's pattern. If you improve a pattern, update the stub in the same change.
- Arch rules: one target per expectation (never an array; Pest passes arrays silently), and every new arch rule needs a break test.
- Commits: scoped, `type(scope): message` (`feat(core)`, `fix(users)`, `test(rbac)`, `docs(dev)`).

## 3. Module Contract (hard)

- Every feature is a module with the exact shape in spec §3, in `modules/` (project) or `packages/admin-core/modules/` (core).
- `module.php` has every key from spec §3.1. `view` is always among `actions`. Slugs are globally unique.
- Routes in a module are relative. The registry adds the prefix, the name prefix and the base middleware; don't repeat them.
- A module may use another module's **Models** only. Shared logic goes into the core package.
- Inertia page names are `{Name}::{Page}`.
- Projects never edit `vendor/`. They customize through the extension points (spec §2.2) or by ejecting, with the reason recorded.

## 4. RBAC (hard)

- One Level per user via `assignLevel()`. **Never** `assignRole`, `givePermissionTo` or `syncPermissions` on a user.
- Permissions are created **only** by `permissions:sync`. They are never created in migrations, seeders, controllers or tests (tests use the helpers).
- Every admin route has the `permission:{slug}.{action}` middleware (or `superadmin`), **and** the controller calls `Gate::authorize()`. The frontend `can()` is cosmetic.
- Levels, the matrix, Settings, Trash and Health are Super Admin only and never grantable.
- Super Admin is special-cased only in `Gate::before`, the `superadmin` middleware and the guard rails in spec §6.3.
- Every guard rail in spec §6.3 has a test. Never remove one.

## 5. Backend Rules

- `declare(strict_types=1);`, typed params and returns, Larastan level 8 clean.
- **All Inertia props and all request inputs are laravel-data objects with `#[TypeScript]`.** No FormRequests, no raw arrays, no models passed to Inertia.
  - **Temporary exception (starter-kit auth code):** the files listed in `skeleton/tests/arch-exceptions.php` (the single source; the arch tests and PHPStan read it) may keep FormRequests, raw-array props and array validation until Phase 05/07 replaces them. Never add new code in this style, and remove a file's line from that list in the same change that replaces the file.
- Validation in input Data `rules()`; authorization in policies.
- Controllers are thin: authorize → call model/service → render/redirect. No `DB` facade in controllers.
- Lists: `->visibleTo($user)->dataTable($request)`, returning `PaginatedData`.
- Updates use `PreventsStaleUpdates` (`lock_version` column on the table, carried by the update Data).
- Multi-step writes go in `DB::transaction`.
- Downloads only through `ExportManager`. Files only through `HasAttachments` (private disk, signed URLs).
  - **The one exception:** branding uploads in Settings (favicon, logo 1:1, logo landscape) go to the public disk through `BrandingStorage`: PNG, JPG, WebP or ICO only (never SVG), size-limited, random file names, the old file deleted on replace. Nothing else may use the public disk.
- Models:
  - `$fillable` (never `$guarded = []`).
  - Casts declared.
  - `SoftDeletes`.
  - `LogsModuleActivity` when the model holds business data (opt-out only with `#[NotAudited(reason: '...')]`), plus a meaningful `auditLabel()`.
- Migrations:
  - Never edit a shipped migration.
  - Every foreign key states its `onDelete`.
  - Every filter or sort column has an index.
  - Every migration has a working `down()`.
- Jobs: `#[Tries]`, `#[Backoff]` and `#[Timeout]` attributes are required. A job acting for a user passes that user explicitly so audit rows have a causer.
- **Audit (spec §7.1):**
  - Model changes are logged by the trait.
  - Every other event (custom actions, auth, exports, files, settings) uses `Audit::record()` with a taxonomy event or the declared custom action name.
  - Multi-record operations go in `Audit::batch()`.
  - Never call `activity()` directly, never queue audit writes, and never write to, update or delete `activity_log` rows.
  - A new personal-data field (NIK, NPWP, phone, address, account number…) must be added to `audit.masked_fields` in the same change.
  - Audit queries always go through `Activity::visibleTo($user)`. **The one exception:** only `AuditSummary`'s count queries may subtract SA rows instead of calling `visibleTo()`, and only while the equality test exists (`AuditLogTest`: the subtracted summary equals the direct `visibleTo()` query for every figure).
- **Widgets (spec §7.2):** extend `Widget`, register in `module.php` → `widgets`, use `->visibleTo($user)`, return the type's Data object, keep `sharedCache()` false unless the data is identical for every user of a level, and stay inside the time budget.
- No `env()` outside config, no `dd`/`dump`/`ray`, no raw SQL with interpolated input.

## 6. Frontend Rules

- TS strict, no `any`, no `@ts-ignore`. Types come from `generated.d.ts`. **Never hand-write prop types that a Data class can generate.**
- URLs and route names only through Wayfinder helpers. Never hardcode a URL string.
- Use `@admin-core` components and shadcn primitives. A new generic component goes into the core package.
- Forms:
  - Inertia `useForm` + `FormField`.
  - `UnsavedChangesGuard` on edit forms.
  - `StaleUpdateDialog` handles 409.
- Formatting only through `lib/format.ts` (id-ID). User strings through the translation helper, Bahasa Indonesia default.
- Theme tokens only (no hex colors, no inline styles). Works in light and dark mode, at 375px, and keyboard-only.
- **Screens are built from the UI sources** (priority order above), following the conversion rules in frontend-behavior spec §1:
  - Approved mockup → map `data-component` to `@admin-core` components and colors to theme tokens.
  - Reference design → adapt its layout, spacing and type into `@admin-core` components; map every colour to a theme token.
  - No design file → derived from the closest design plus ui-design.md; owner's browser review at the end of the phase.
  - Behaviour comes from the frontend-behavior spec.
- Generated modules have no mockup; they follow the stubs, which are built from the `pattern-*` designs.
- Never copy hex colors, arbitrary `var(--…)` classes, sample data, or mockup/reference demo JS and its libraries into code. No hex values in components.

## 7. Packages & Generated Files

- Never edit `generated.d.ts`, Wayfinder output, or the `AUTO` sections of DEVELOPER.md. Regenerate them, and commit the generated files.
- A core package change that affects projects needs a `CHANGELOG.md` entry; a breaking change also needs `UPGRADE.md` and a major version.
- Core migrations are additive within a major version.

## 8. Testing (required per module)

1. Guest is redirected to login.
2. 403 without the permission, for every declared action.
3. Success with the permission, for every declared action.
4. Validation failures for required fields.
5. Download returns a file and writes an audit entry (if declared).
6. Delete is soft; only Super Admin can restore.

7. Create, update and delete each write the right audit event with masked fields masked (`assertAudited`). Each custom action writes its own event.
8. Each widget is absent without its permission, respects `visibleTo()`, and stays within the time budget.

Plus: a stale update returns 409 (if `edit` is declared), and `visibleTo()` is applied (an assertion helper exists). Use factories and `RefreshDatabase`; never hardcode IDs.

## 9. Definition of Done

- [ ] Phase plan approved and every box ticked; acceptance criteria verified.
- [ ] `composer check` green, with its summary pasted in the report.
- [ ] `php artisan migrate:fresh --seed` and `php artisan migrate:rollback` succeed.
- [ ] DEVELOPER.md updated, and `admin:docs` regenerated once it exists (Post-v1).
- [ ] CHANGELOG updated (for package changes).

## 10. Forbidden

- Hardcoded menus, permissions, level names or URLs.
- Granting permissions on Levels, the matrix, Settings, Trash or Health.
- Business logic in TSX, routes files or Blade.
- Disabling CSRF/request-forgery protection, policies or mass-assignment protection to "make it work".
- Public-disk uploads (except branding through `BrandingStorage`, §5), unsigned file URLs, or downloads that bypass `ExportManager`.
- Logging passwords, tokens or unmasked personal data; editing or deleting audit rows; disabling audit to make a test pass.
- Editing `vendor/`, `node_modules/` or generated files.
- Committing `.env`, credentials, real client data or real NIK/personal data in seeders and fixtures.
