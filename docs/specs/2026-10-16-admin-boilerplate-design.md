# Admin Boilerplate — System Design Spec

- **Status:** Approved v1
- **Date:** 2026-10-16
- **Related:** [Frontend Behavior](./2026-10-16-frontend-behavior.md) · [Mockups](../design-implementation/README.md) · [Master Roadmap](../plans/2026-10-16-admin-boilerplate-master-roadmap.md) · UI Design (UI/UX model input only)

A reusable Laravel admin panel built for many projects over several years. Reliability comes from three things:

1. A versioned core package, so fixes reach old projects.
2. Types generated from PHP, so the frontend and backend cannot drift apart.
3. Automated contract tests, so the rules in AGENTS.md are enforced and not just suggested.

---

## 0. Decision Log

| # | Decision | Rationale | Rejected |
|---|---|---|---|
| D1 | Laravel **13** (PHP 8.3+) | Laravel 12 bug fixes ended 2026-08-13. L13 has bug fixes to Q3 2027 and security fixes to 2028-03-17 | Laravel 12 |
| D2 | Monolith: Inertia 2 + React 19 + TS strict + Tailwind 4 + shadcn/ui | One deploy, fits VPS hosting | API + SPA, Livewire |
| D3 | Core ships as Composer package `yuanmaharsyah/admin-core` | Fixes reach existing projects via `composer update` | Template copy, upstream git remote |
| D4 | laravel-data for **all** props and inputs + generated TS + Wayfinder routes | A rename on the PHP side breaks the TS build instead of production | Ziggy, hand-written types |
| D5 | Level = Role, one per user, no direct permissions, RBAC managed by Super Admin only | Auditable, simple | Per-user overrides |
| D6 | Matrix columns: View · Create · Edit · Delete · Download (+ custom) | Matches operational roles | 4-column variant |
| D7 | Quality gates: Pint, Larastan level 8 (no baseline in core), Pest + contract/arch tests, tsc, ESLint | Catch drift automatically | — |
| D8 | Ops: spatie/laravel-health + Sentry SDK (works with Sentry or self-hosted GlitchTip) | Know about failures before the client does | — |
| D9 | No in-app backups; no ULIDs | User choice | spatie/laravel-backup, ULID public IDs |
| D10 | No CI in v1; one `composer check` command runs every gate (reversed by D22) | User choice. Risk accepted: gates are manual | GitHub Actions |
| D11 | A separate UI/UX model turns `ui-design.md` into HTML mockups in `docs/design-implementation/`. Coding agents implement from the mockups + `frontend-behavior.md` and never read `ui-design.md` | A specialized model designs; the coding agent converts mechanically; behaviour is not lost in the hand-off | Coding agent designs from the text spec |
| D12 | Package name `yuanmaharsyah/admin-core`, namespace `Yuan\AdminCore` | Owner's choice | — |
| D13 | Visual style: editorial monochrome. Ink primary, yellow `--highlight` accent only, orange warning. Shell = group rail + collapsible item panel; groups declared in config with icons | Matches the chosen reference; yellow kept off status and buttons for contrast; groups map to module groups | Yellow primary; single sidebar; multi-workspace switcher |
| D14 | Charts via shadcn `chart` (Recharts). Audit Log has a summary dashboard in the reference style | One chart system for every summary; the audit summary is useful for supervisors | Chart.js, ApexCharts |
| D15 | Audit is a core subsystem (§7.1): fixed event taxonomy, one trait for models, one `Audit` facade for everything else, synchronous writes inside the same transaction, masking, immutable rows | An audit trail that can silently miss or lose events is worse than none, especially for government clients | Queued audit writes; per-module ad-hoc `activity()` calls |
| D16 | Beranda = widget dashboard (§7.2). Modules register widgets in `module.php`; each widget is permission-gated, scope-aware, cached and loads independently | Every project gets a useful home page without custom code; one slow widget can't block the page | Hand-built dashboard per project; drag-and-drop personalization |
| D17 | 2026-10-19: **Inertia 3** instead of Inertia 2 (supersedes the Inertia part of D2) | The official Laravel 13 React starter kit ships Inertia 3. Deferred props, partial reloads (`router.reload({ only })`) and `preserveState` all exist in v3 (verified in Phase 00) | Downgrading the starter kit to Inertia 2 |
| D18 | 2026-10-19: Keep **Wayfinder 0.1.x** (`^0.1.23`) although it has no 1.x release; the Ziggy fallback in §1 is not applied | The starter kit is built on Wayfinder; the typed-route guarantee of D4 stays. Risk accepted: 0.x minors may break, so it is pinned to `^0.1` | Ziggy + generated route-name types |
| D19 | 2026-10-19: Minimum **PHP 8.4** (supersedes "PHP 8.3+" in D1) | Current stable lines of spatie/laravel-activitylog (5.x), spatie/laravel-query-builder (7.3.6+) and Pest 5 require PHP 8.4 | Pinning older package lines that still allow PHP 8.3 |
| D21 | 2026-10-23: Settings is a typed **registry** with branding uploads, contact, social, site access (open / maintenance / coming_soon) and security / export tabs (§7.3). Branding images are the only public-disk upload | A client site needs its logo, favicon and contact details before sign-in, and projects need a standard way to add their own settings | Logo from config only (the 07 plan), signed URLs for branding (the login page and favicon can't sign) |
| D22 | 2026-10-29: **CI added for the public release** (reverses D10): GitHub Actions runs `composer check` on every push to `master` and every pull request (`.github/workflows/tests.yml`: MySQL 8.4, `composer setup`, Playwright Chromium) | Public contributors need the gates to run on their pull requests, and the README's tests badge needs a workflow; `composer check` stays the one command, so local and CI run the same gates | Manual gates only (D10) |
| D20 | 2026-10-20: **No TanStack Table**; date fields use shadcn Calendar (**react-day-picker + date-fns**, `id` locale) in a popover | Sorting, filtering and paging all run on the server, so TanStack would only render rows; `DataTable<T>` keeps typed column definitions of its own. A calendar picker shows id-ID dates ("20 Okt 2026") the same in every browser, stores ISO and accepts typed `dd/mm/yyyy` | `@tanstack/react-table`; native `date` / `datetime-local` inputs (display depends on the browser locale) |

Any change to this table requires a new row with the date and the reason. Never edit old rows.

---

## 1. Stack & Versions

| Layer | Choice |
|---|---|
| Runtime | PHP 8.4+ (D19), Node 22 LTS, MySQL 8 / MariaDB 10.11+ (PostgreSQL compatible) |
| Framework | Laravel `^13.0` |
| Frontend | Inertia 3 (D17), React 19, TypeScript strict, Tailwind 4, shadcn/ui, lucide-react, sonner, cmdk, react-day-picker + date-fns (D20) |
| Types | spatie/laravel-data, spatie/laravel-typescript-transformer, laravel/wayfinder |
| RBAC / audit | spatie/laravel-permission, spatie/laravel-activitylog |
| Lists / export | spatie/laravel-query-builder, maatwebsite/excel |
| Charts | recharts (through shadcn `chart`) |
| Ops | spatie/laravel-health, sentry/sentry-laravel |
| Quality | Pest (+ arch plugin), Larastan, Pint, ESLint, Prettier, Orchestra Testbench (package tests) |

Phase 0 must verify that every package has a stable release compatible with Laravel 13. Record the exact versions in §1.1.

- If Wayfinder is not stable on L13, fall back to Ziggy + generated route-name types, and log the change as a new decision row.
- If any other package is missing L13 support, stop and report.

### 1.1 Verified versions
Verified 2026-10-19 (Phase 00) against Packagist, npm and the starter kit's `main` branch. "Installed" = locked in `skeleton/composer.lock` / `package-lock.json` or the package's dev deps; the others are verified only and get installed by the phase that first uses them, at a constraint allowing the version listed.

| Package | Version | Constraint | Status |
|---|---|---|---|
| PHP | 8.4.26 (local) | `^8.4` (D19) | — |
| Node | 22.16.0 (local) | 22 LTS | — |
| MySQL | 8.4 (local) | MySQL 8 / MariaDB 10.11+ | — |
| laravel/framework | 13.37.0 | `^13.17` | Installed |
| laravel/react-starter-kit | `main` @ 2026-10-19 | — | Skeleton source |
| laravel/fortify | 1.41.0 | `^1.37.2` | Installed (from the starter kit) |
| inertiajs/inertia-laravel | 3.5.1 | `^3.0` (D17) | Installed |
| @inertiajs/react · @inertiajs/vite | 3.9.1 | `^3.0.0` (D17) | Installed |
| laravel/wayfinder · @laravel/vite-plugin-wayfinder | 0.1.23 · 0.1.11 | `^0.1.23` · `^0.1.3` (D18) | Installed |
| react · react-dom | 19.3.1 | `^19.2.0` | Installed |
| typescript | 5.9.3 | `^5.7.2` | Installed |
| tailwindcss · @tailwindcss/vite | 4.3.3 | `^4.0.0` | Installed |
| vite | 8.3.4 | `^8.0.0` | Installed |
| lucide-react | 0.475.0 | `^0.475.0` | Installed (kit pin; 1.59.0 exists) |
| sonner | 2.0.8 | `^2.0.0` | Installed |
| spatie/laravel-data | 4.23.0 | `^4.23` | Installed (package) |
| spatie/laravel-typescript-transformer · spatie/typescript-transformer | 3.3.0 · 3.3.1 | `^3.3` · via the former | Installed (package). Transformer 3 brings its own laravel-data support; laravel-data's built-in one targets transformer 2 and is unused |
| spatie/laravel-permission | 8.3.0 | `^8.3` | Installed (package, Phase 03b). The core ships the permission-table migration (no teams, default table names) |
| spatie/laravel-activitylog | 5.1.2 | `^5.1` | Installed (package, Phase 03a; needs PHP 8.4). v5 stores changes in its own `attribute_changes` column and has no batch support (§5, §7.1) |
| spatie/laravel-query-builder | 7.3.6 | `^7.3.6` | Installed (package, Phase 06a; needs PHP 8.4) |
| maatwebsite/excel | 4.0.4 | `^4.0.4` | Installed (package, Phase 06c) |
| spatie/laravel-health | 1.40.2 | — | Verified (Phase 09) |
| sentry/sentry-laravel | 4.29.0 | — | Verified (Phase 09) |
| cmdk | 1.1.1 | — | Verified (Phase 05) |
| recharts | 3.10.1 | — | Verified (Phase 07) |
| @radix-ui/react-popover | 1.3.1 | `^1.3.1` | Installed (Phase 06b; Combobox, RelationSelect, DateField) |
| react-day-picker · date-fns | 9.14.0 · 4.4.0 | `^9.14.0` · `^4.4.0` | Installed (Phase 06b, D20). 10.0 (2026-09-30) exists; shadcn's Calendar targets 9 |
| pestphp/pest (+ plugin-arch, plugin-laravel) | 5.3.3 (5.0.0, 5.0.1) | `^5.3` / `^5.0` | Installed (package + skeleton) |
| phpunit/phpunit | 13.4.3 | via Pest | Installed |
| larastan/larastan (phpstan/phpstan) | 3.13.0 (2.3.1) | `^3.13` | Installed |
| laravel/pint | 1.32.1 | `^1.32` (package) · `^1.27` (skeleton) | Installed |
| laravel/boost | 2.10.3 | `^2.10` (skeleton, dev) | Installed (Phase 10a, owner-approved 2026-10-25: ships the package's AI guideline and skills to projects) |
| orchestra/testbench | 11.3.0 | `^11.3` | Installed (package) |
| eslint · @eslint/js | 10.13.0 · 10.0.1 | `^10.13.0` · `^10.0.1` | Installed |
| typescript-eslint | 8.71.2 | `^8.71.2` | Installed |
| eslint-plugin-react-hooks | 7.1.1 | `^7.1.1` | Installed |
| eslint-config-prettier | 10.1.8 | `^10.1.8` | Installed |
| prettier · prettier-plugin-tailwindcss | 3.9.10 · 0.8.1 | `^3.9.10` · `^0.8.1` | Installed |

Not used: `eslint-plugin-react` 7.37.5 does not support ESLint 10; TypeScript and `react-hooks` cover what it checked.

---

## 2. Repository Layout (development monorepo)

```
admin-boilerplate/
├── AGENTS.md
├── composer check                   # see §9
├── docs/
│   ├── specs/                       # what & why (changes need approval)
│   └── plans/                       # how & progress (agent ticks boxes, writes phase plans)
├── packages/admin-core/             # Composer package: yuanmaharsyah/admin-core
│   ├── composer.json
│   ├── CHANGELOG.md · UPGRADE.md
│   ├── config/admin-core.php
│   ├── database/migrations/
│   ├── src/
│   │   ├── AdminCoreServiceProvider.php
│   │   ├── Registry/       ModuleRegistry, ModuleDefinition, MenuBuilder, PageResolver  (namespace Yuan\AdminCore\Registry)
│   │   ├── Permissions/    PermissionSynchronizer, PermissionMatrix
│   │   ├── Data/           Shared Data objects (AuthData, MenuGroupData, FlashData, PaginatedData…)
│   │   ├── Exports/        ExportManager, ExportJob
│   │   ├── Attachments/    Attachment, HasAttachments, AttachmentController
│   │   ├── Concurrency/    PreventsStaleUpdates
│   │   ├── Audit/          Audit facade, AuditEvent enum, LogsModuleActivity, AuditContext, Masker, ImmutableActivity
│   │   ├── Dashboard/      Widget base class, WidgetType/WidgetSize enums, WidgetRegistry, widget Data objects
│   │   ├── Health/         check registration
│   │   ├── Http/Middleware/ HandleInertiaRequests, EnsureUserIsActive, EnsureSuperAdmin
│   │   ├── Testing/        ContractAssertions, ModuleTestCase, factories helpers
│   │   └── Console/        make:module, modules:list, permissions:sync, admin:create-superadmin,
│   │                       admin:eject, admin:doctor
│   ├── modules/            Dashboard, Users, Levels, AuditLog, Settings, Downloads   (core modules)
│   ├── resources/js/       layouts, components/admin, components/ui (shadcn), hooks, lib
│   ├── stubs/module/
│   └── tests/              Testbench suite + contract tests
└── skeleton/                        # Laravel 13 app new projects start from
    ├── composer.json                # requires yuanmaharsyah/admin-core (path repo in dev, VCS in prod)
    ├── modules/                     # project modules live here
    ├── resources/js/app.tsx         # boots core layout + page resolver
    └── tests/
```

### 2.1 Package distribution
- **Hosting:** private GitHub repo, consumed as a Composer `vcs` repository. Versions are git tags.
- **Versioning:** SemVer.
  - **Patch:** fixes only.
  - **Minor:** additive changes and new optional config.
  - **Major:** breaking changes, documented in `UPGRADE.md`.
- **Releases:** every release updates `CHANGELOG.md`, and every migration is additive within a major.
- **Frontend from the package:**
  - Vite alias `@admin-core` → `vendor/yuanmaharsyah/admin-core/resources/js`.
  - Tailwind 4 adds `@source "../../vendor/yuanmaharsyah/admin-core/resources/js"`.
  - The package declares its npm deps in `admin-core.npm.json`, and `admin:doctor` checks the project's `package.json` satisfies them.
- **Projects never edit `vendor/`.** Customization goes through the extension points in §2.2.

### 2.2 Extension points (how projects customize core without forking)

| Need | Mechanism |
|---|---|
| Change defaults (threshold, session, branding) | Publish `config/admin-core.php`, or use Settings |
| Add a project setting | Declare it in `admin-core.settings` (§7.3); it gets a field on its Settings tab, validation, caching and audit, and `settings('group.key')` reads it |
| Extra fields on User | `admin-core.models.user` swappable class (extends `Yuan\AdminCore\Modules\Users\Models\User`) + project migration + `admin-core.users.form_extension` Data class |
| React to core events | Laravel events: `UserCreated`, `UserLevelChanged`, `LevelPermissionsUpdated`, `ExportCompleted`… |
| Override a core page | `admin-core.pages.overrides` map: `'Users::Index' => 'App::Users/Index'` |
| Add shared props | The project's `App\Http\Middleware\HandleInertiaRequests` extends `Yuan\AdminCore\Http\Middleware\HandleInertiaRequests` and merges `parent::share()`; each added prop is a Data object |
| Turn off a core module | `admin-core.modules.disabled` (list of slugs). Listing a module with `'core' => true` is a boot error |
| Change a core module fundamentally | `php artisan admin:eject Users` copies it into `modules/` and disables the core one. **Warning: that module stops receiving package updates.** |

---

## 3. Module Contract

Two module roots, same contract:

| Root | Namespace | Purpose |
|---|---|---|
| `vendor/yuanmaharsyah/admin-core/modules/*` | `Yuan\AdminCore\Modules\{Name}` | Core modules (this namespace holds core modules only; package infrastructure lives in `Yuan\AdminCore\Registry` etc.) |
| `modules/*` (project) | `Modules\{Name}` | Project modules |

The two roots are merged; a project module with the same slug as a core module is a boot error unless the core one has been ejected.

```
{Name}/
├── module.php
├── Providers/{Name}ServiceProvider.php
├── Http/Controllers/{Name}Controller.php
├── Data/{Name}Data.php             # output (show/edit)
├── Data/{Name}ListItemData.php     # output (index rows)
├── Data/Store{Name}Data.php        # input + validation rules
├── Data/Update{Name}Data.php       # input + validation rules + lock_version (stale check)
├── Models/{Name}.php
├── Policies/{Name}Policy.php
├── Exports/{Name}Export.php        # only if 'download' declared
├── Widgets/*Widget.php             # optional dashboard widgets, listed in module.php
├── Database/{Migrations,Factories,Seeders}/
├── Routes/web.php
├── resources/js/pages/{Index,Create,Edit,Show}.tsx   # folder lowercase; page names must match the file's case exactly
├── resources/js/components/{Name}Form.tsx
└── Tests/Feature/{Name}Test.php
```

### 3.1 `module.php`

```php
<?php

return [
    'name'            => 'Invoice',     // PascalCase, = folder name
    'slug'            => 'invoices',    // kebab/lower, URL + permission prefix, globally unique
    'label'           => 'Invoice',     // menu + matrix row text (translation key allowed)
    'icon'            => 'receipt',     // lucide icon name
    'group'           => 'keuangan',    // key from config admin-core.menu.groups
    'order'           => 20,
    'enabled'         => true,
    'core'            => false,         // true = cannot be disabled
    'superadmin_only' => false,         // true = no permissions, hidden from matrix
    'menu'            => true,
    'actions'         => ['view', 'create', 'edit', 'delete', 'download'],
    'widgets'         => [],            // Widget class names (§7.2); may be empty
];
```

Menu groups are declared once in `config/admin-core.php`. A module's `group` must be one of these keys:

```php
'menu' => ['groups' => [
    'beranda'  => ['label' => 'Beranda',     'icon' => 'house',    'order' => 0],    // Dashboard module only
    'master'   => ['label' => 'Master Data', 'icon' => 'database', 'order' => 10],
    'keuangan' => ['label' => 'Keuangan',    'icon' => 'wallet',   'order' => 20],
    'sistem'   => ['label' => 'Sistem',      'icon' => 'settings', 'order' => 90],   // core modules
]],
```

`ModuleRegistry` validates the definition at boot and throws a descriptive exception for:
- A `group` that isn't a configured key.
- Missing keys or an unknown `icon`.
- A duplicate slug.
- `actions` without `view`.
- A custom action that isn't a lowercase single word.
- A widget class that doesn't exist, doesn't extend `Widget`, or has a key not prefixed with the module slug.

Results are cached with `php artisan modules:cache`, and `optimize` includes it.

### 3.2 Registration
- **Routes:**

  | Setting | Value |
  |---|---|
  | URL prefix | `/admin/{slug}` |
  | Route name prefix | `{slug}.` |
  | Middleware | `web, auth, active` (+ `superadmin` if `superadmin_only`) |

- **Inertia page names:** `{Name}::{Page}`, resolved by `PageResolver` across both roots and the override map.
- Removing or disabling a module must not break boot, the menu, the palette, the matrix or the dashboard. Contract tests cover this.
- **After login** the user goes to `dashboard.index` if they have `dashboard.view`; otherwise to the first item of their menu; otherwise to a "Tidak ada akses" page (with Keluar). Never a 403 loop.

---

## 4. Type Bridge

- **Every** Inertia prop and **every** request payload is a laravel-data `Data` object marked `#[TypeScript]`. No raw arrays and no Eloquent models are passed to Inertia.
- Validation lives in the input Data class (`rules()`); there are no FormRequests.
- `php artisan typescript:transform` writes **one** `resources/js/types/generated.d.ts` per project, from the project's `app/`, both module roots and the core package's `src/`. The core ships no generated types: like the Wayfinder output (which depends on the project's route prefix), they are generated in the project. `composer setup` and `post-update-cmd` regenerate both, and "regenerate types" is a standard step in `UPGRADE.md`.
- Flash messages use Inertia's native flash (`Inertia::flash(new FlashData(...)->toArray())`), typed through `InertiaConfig.flashDataType`. They are not a shared prop and are never replayed from browser history.
- Wayfinder generates typed route/action helpers. The frontend never hardcodes URLs or route-name strings.
- Generated files are committed. `composer check` regenerates them and fails if git shows a diff.
- Pagination uses one shared `PaginatedData<T>` shape: items, meta (current_page, per_page, total, last_page) and links.

---

## 5. Data Model

| Table | Key columns | Notes |
|---|---|---|
| `users` | id, name, username (nullable, unique), email (unique), password, is_active, last_login_at, session_version (unsigned int, default 0), timestamps, soft deletes | Swappable model. Admin columns added by core migrations. A session is valid only while the `session_version` it stored at login equals the user's (§6.3) |
| `roles` (spatie) | + label, description, is_protected | "Level". `is_protected` = Super Admin |
| `permissions` (spatie) | + module, action | Generated only by sync |
| `role_has_permissions`, `model_has_roles` | spatie default | `model_has_permissions` must stay empty (contract test) |
| `activity_log` | spatie v5 columns + our own `batch_uuid` (created by a core migration; projects don't publish the spatie stub). `log_name` = module slug, `auth` or `system`; `event` from the taxonomy in §7.1; `attribute_changes` = `{old, attributes}`; `properties` = `{context: {ip, user_agent, route, request_id, channel, job \| command}, meta}` | Indexes: `created_at`, (`log_name`, `created_at`), (`causer_id`, `created_at`), (`event`, `created_at`), (`subject_type`, `subject_id`), `batch_uuid`. Immutable (§7.1) |
| `settings` | key (unique), value (json), group, is_public | Cached, busted on write |
| `attachments` | attachable_type, attachable_id, disk, path, original_name, mime, size, uploaded_by | Private disk |
| `exports` | user_id, module, filters (json), row_count, status, path, error, expires_at | Queued downloads |
| `failed_jobs`, `jobs`, `job_batches` | Laravel default | |

Rules:
- Core migrations are additive within a major version, and each has a working `down()`.
- Every foreign key states its `onDelete` behaviour.
- Every filter or sort column has an index.

---

## 6. RBAC

### 6.1 Matrix (Super Admin only)

```
Module          View  Create  Edit  Delete  Download  [Approve]
Users            ☑     ☐       ☐     ☐       ☑
Audit Log        ☑     —       —     —       ☐
Invoice          ☑     ☑       ☑     ☐       ☐         ☐
```

- `—` = the module doesn't declare that action.
- `superadmin_only` modules are not rows, and the protected level is not editable.
- **Dependency rule:** any non-view action implies View, and removing View clears the row. It is enforced in `PermissionMatrix::save()`.
- Save = one transaction + one audit entry (before/after diff) + `LevelPermissionsUpdated` event + permission cache reset.

### 6.2 Flow
1. Module declares `actions`.
2. `permissions:sync` creates `{slug}.{action}` for every enabled, non-superadmin_only module.
   - It removes orphans and resets the cache.
   - It is idempotent and runs after `make:module`, in the seeder, and on deploy.
3. A user has exactly one Level; `assignLevel()` replaces the previous one.
4. Enforcement on every admin route:
   - The `permission:{slug}.{action}` route middleware (or `superadmin`).
   - `Gate::authorize()` in the controller.
   - Frontend `can()`, which is UI only.
5. `Gate::before` passes the protected level. This is the only Super Admin special case outside the guard rails.

| Action | Policy method |
|---|---|
| view | `viewAny`, `view` |
| create | `create` |
| edit | `update` |
| delete | `delete` (soft) |
| download | `download` |
| custom | same-named |

### 6.3 Guard rails (each has a test)
- Only Super Admin can open Levels, the matrix, Settings, Trash and the health page.
- The site access modes (§7.3) never lock out a Super Admin: they apply to public routes only, login, password reset and `/admin` always work, and `php artisan admin:access open` restores access from the CLI.
- Only Super Admin can assign or remove the Super Admin level, and non-SA users never see it in selects.
- Non-SA users cannot list, view, edit, delete, deactivate or reset SA accounts (404 on direct access).
- Nobody deletes, deactivates or resets the password of their own account from Users, Super Admin included; nobody changes their own level or status. Because `Gate::before` passes Super Admin, this rule is enforced outside the policy (`UserAccounts::refuseSelf()`, 403) (2026-10-23, Phase 07a).
- There is always ≥1 active SA; 2 are seeded, and `admin:create-superadmin` is the recovery path. Outside `local` and `testing`, the seeded SA accounts must change their password at the first sign-in (`must_change_password`).
- A level with users cannot be deleted. The protected level is immutable.
- Deactivating a user, changing their level or changing their password kills their other sessions immediately, on any session driver: each raises `users.session_version` (atomically) and rotates the remember token, and `EnsureUserIsActive` (in the `web` group) logs out any session whose stored version differs. The user's own current session moves to the new version when they made the change themselves. A revoked session can still reach `logout`.

---

## 7. Core Services

| Service | Behaviour |
|---|---|
| **ExportManager** | Under the threshold (Settings, default 5,000) it streams the file. Above it, it queues `ExportJob` (`#[Tries(3)]`, `#[Backoff]`, `#[Timeout]`) and adds an `exports` row (24h expiry, scheduler cleanup). Every download writes an audit entry (user, module, filters, row count). A failed export is shown on the Downloads page with its error |
| **Attachments** | Mime/size validated against config, private disk, 5-minute signed URL authorized by the parent's `view` policy, filenames sanitized, original name kept only as metadata |
| **Stale-update protection** | Every editable table has an unsigned integer `lock_version` (default 0), raised by one in the same UPDATE on every update of the model (`PreventsStaleUpdates`). `Update{Name}Data` carries the `lock_version` the form loaded; the save compares it under a row lock and answers 409 ("data changed by someone else") when it moved on, so even two saves within the same second are told apart. This prevents silent lost updates (2026-10-20: replaces the `updated_at` comparison, which has one-second precision) |
| **Data scope hook** | Every list and show query calls `->visibleTo($user)`, which does nothing by default. It is reserved for "own unit only" rules |
| **Settings** | Typed registry (§7.3); cached; Super Admin only |
| **AuditSummary** | Computes the KPIs, per-type counts and per-day/week counts for a range (≤ 366 days) with grouped queries on the indexes above (per event and day, and the exported row total, in one grouped query on the virtual `created_on` and `export_rows` with their `(created_on, event, export_rows)` index). For a non-SA viewer the counts are all rows minus the rows caused by or about a current SA account (no write-time flag: rows are immutable and SA membership changes); active users are one `EXISTS` per user through `visibleTo()`. Results cached for 5 minutes per (range, user, module, viewer-is-SA) key; the cache key never includes other filters. Excludes SA-related events for non-SA viewers. Must stay under 500ms on 1 million rows (a seeded performance test checks this) |
| **Audit retention** | `admin-core.audit.retention_days` (default `null` = keep forever). When set, `admin:audit-prune` runs daily from the scheduler and logs one `system.audit_pruned` event with the row count. Government projects should check their records-retention rules before setting it |
| **Health** (spatie/laravel-health) | Checks: database, cache, queue (job processed recently), schedule heartbeat, used disk space, debug mode off in production, app optimized, failed jobs count. `GET /health` returns JSON protected by a token (for uptime monitors). Super Admin also gets a Health page. Failures send mail to the configured address |
| **Error tracking** (sentry-laravel) | DSN from env. Works with Sentry SaaS or self-hosted GlitchTip; prefer self-hosted for government data. `send_default_pii=false`; request bodies, passwords, tokens and NIK-like fields are scrubbed. Events are tagged with user id + level slug only, plus release = `admin-core@{version}+app@{git sha}`. Disabled when the DSN is empty |
| **Logging** | `daily` channel, 30-day retention, JSON format in production |

### 7.1 Activity Log (Audit)

**Goal:** every meaningful change and every security event leaves exactly one trustworthy record, without each module re-implementing logging.

**Event taxonomy** (`AuditEvent` enum; the UI label and badge come from the enum)

| Event | Written by | Label (id) | Badge |
|---|---|---|---|
| `created`, `updated`, `deleted`, `restored`, `force_deleted` | `LogsModuleActivity` (model events) | Dibuat, Diubah, Dihapus, Dipulihkan, Dihapus permanen | success, info, destructive, info, destructive |
| `exported` | `ExportManager` | Diunduh | neutral |
| `attachment_uploaded`, `attachment_downloaded`, `attachment_deleted` | Attachments | Lampiran diunggah / diunduh / dihapus | neutral |
| `login`, `logout`, `login_failed`, `login_locked` | Auth listeners (`log_name` = `auth`) | Masuk, Keluar, Login gagal, Akun terkunci | neutral, neutral, warning, warning |
| `password_changed`, `password_reset` | Auth / Users | Password diubah, Password direset | neutral |
| `level_changed`, `user_activated`, `user_deactivated` | Users | Level diubah, Diaktifkan, Dinonaktifkan | info, success, warning |
| `permissions_updated` | `PermissionMatrix` | Hak akses diubah | info |
| `settings_updated` | Settings | Pengaturan diubah | info |
| `audit_pruned` | Retention (`log_name` = `system`) | Log dibersihkan | neutral |
| `attachments_swept` | `admin:attachments-sweep` (`log_name` = `system`; meta `files`) | Berkas tanpa data dibersihkan | neutral |
| *custom action name* (e.g. `approve`) | The module's controller via `Audit::record()` | From the module's translation file | neutral |

Any other event name is rejected with an exception. A custom action event is only valid for a module that declares that action.

**How things get logged**
- **Models with business data** use `LogsModuleActivity` (wraps spatie `LogsActivity`) with these defaults:
  - Log fillable attributes only, and only the dirty ones; empty changes are skipped.
  - `log_name` = the module's slug, resolved from the registry.
  - Excludes the model's `$hidden`, every `omit` field and every encrypted-cast field (the model would read it decrypted); `partial` / `full` fields are logged masked.
  - Writes `force_deleted` separately from `deleted`.
- **Everything else** goes through `Audit::record(AuditEvent|string $event, ?Model $subject = null, array $meta = [], ?string $module = null)`. Calling `activity()` directly anywhere else is forbidden (arch test).
- **Multi-record operations** (bulk delete, matrix save, imports) run inside `Audit::batch(fn () => ...)`. All rows share one `batch_uuid`, and the drawer shows "bagian dari N perubahan".
- **Context:** `AuditContext` attaches `{ip, user_agent, route, request_id, channel}` to every row.
  - `channel` is `web`, `cli` (with the command name) or `queue` (with the job class).
  - Queued jobs pass the original user explicitly, so the causer is the requesting user and never null (e.g. `ExportJob`).
- **Subject label:** models implement `auditLabel(): string` (trait default: `name` → `title` → `number` → `#id`). The label is stored in `properties.meta.subject_label` at write time, so it stays readable after the record is deleted.

**Data protection** (UU PDP)
- `audit.masked_fields` maps field names to a rule:
  - `omit`: never stored. Defaults: `password`, `password_confirmation`, `remember_token`, `*_token`, `secret`.
  - `partial`: first 4 and last 4 characters kept. Defaults: `nik`, `no_kk`, `npwp`, `no_rekening`.
  - `full`: stored as `••••`. Defaults: `no_hp`, `alamat`.
  - Projects add their own fields in config.
- Masking runs on both columns (`attribute_changes`: `old`, `attributes`; `properties`: `meta`, `context`) before the write. A failed login stores the attempted username only, never the password.

**Integrity**
- Audit rows are written **synchronously in the same database transaction** as the change. A rolled-back change leaves no log, and a failed log write fails the change. Audit writes are never queued.
- The configured activity model is `ImmutableActivity`: `update()`, `save()` on an existing row and `delete()` throw `ImmutableAuditException`. The only exception is `admin:audit-prune`.
- No route can create, edit or delete activity rows. The AuditLog module is read-only (`view`, `download`).

**Reading**
- **AuditLog module:** list + summary (§7, AuditSummary) + detail drawer.
- **Per-record history:** Show pages get a "Riwayat" tab from the `HasActivityHistory` trait (events where `subject` = this record, paginated 20). It is visible only with `{slug}.view` **and** `audit-log.view`, and applies the same SA visibility rule.
- **SA visibility rule:** non-SA viewers never see events caused by or about SA accounts. It is applied in one query scope, `Activity::visibleTo($user)`, used by the list, the history tab, widgets and exports; the summary's counts subtract the same SA rows (`involvingUsers(superAdminIds())`), proven equal by a test.

### 7.2 Dashboard Widgets (Beranda)

- **Dashboard module:** a core module with slug `dashboard`, group `beranda`, `actions => ['view']`. The seeder grants `dashboard.view` to Operator.
- **A widget** is a class extending `Yuan\AdminCore\Dashboard\Widget`, listed in its module's `module.php` → `widgets`:

| Method | Default | Meaning |
|---|---|---|
| `key()` | — (required) | `{slug}.{name}`, globally unique |
| `label()` | — | Card title (translation key allowed) |
| `type()` | — | `WidgetType`: `stat`, `stat_stack`, `segment`, `bar_chart`, `table` (max 5 rows) |
| `size()` | `sm` | `WidgetSize`: `sm` = 3 of 12 columns, `md` = 6, `lg` = 9, `full` = 12. `tall()` spans 2 rows |
| `order()` | 100 | Sort order on the page |
| `permission()` | `{slug}.view` | The widget is omitted entirely (not just hidden) without it |
| `usesRange()` | true | Whether it reacts to the page range (7d / 30d / 90d) |
| `cacheSeconds()` | 300 | Cache TTL; 0 = no cache |
| `sharedCache()` | false | false = cache key includes the user id (safe default); true = keyed by level (only when data doesn't depend on the user) |
| `href()` | the module's index route | "Lihat semua" link |
| `data(User $user, DashboardRange $range)` | — | Returns the typed Data object for its type. **Must** use `->visibleTo($user)` |

- **Loading:** the page sends the widget list first (metadata only). Each widget's data is its own Inertia deferred prop in its own group, `Inertia::defer(fn, group: 'widget_{key}', rescue: true)`, so widgets load in parallel and independently.
- **Failure isolation:** `rescue: true` makes Inertia catch an exception inside `data()`, report it (Sentry), and leave only that prop out. That card alone renders the `<Deferred>` `rescue` slot: "Gagal memuat" with a retry (`router.reload({ only: ['widget_{key}'] })`). There is no custom failure shape.
- **Limits:** at most 12 widgets on a page (config). Each widget should resolve in under 300ms on realistic data, and a test helper measures this.
- **Core widgets:**

  | Key | Type | Size | Permission |
  |---|---|---|---|
  | `audit-log.activity_by_day` | bar_chart | `full` | `audit-log.view` |
  | `audit-log.failed_logins` | stat | `sm` | `audit-log.view` |
  | `users.active_total` | stat | `sm` | `users.view` |
  | `downloads.ready_mine` | stat | `sm` | `dashboard.view` |
  | `audit-log.recent` | table | `md` | `audit-log.view` |

- **No permitted widgets:** an empty state with links to the user's permitted modules.
- **Out of scope:** per-user layout, drag-and-drop and hiding widgets.

### 7.3 Settings (registry)

Every setting is declared in `admin-core.settings` (core keys, plus any the project adds the same way): key `{group}.{name}`, type, default, validation rules, label, and `is_public` (shared with the page through `AppData`). The group is the Settings tab. Values live in the `settings` table, are read with `settings('kontak.telepon')`, are cached and busted on save, and every save writes one `settings_updated` row with the old and new value of each changed key (masked fields stay masked). A key with no stored value falls back to its config / env default.

| Tab (group) | Keys | Notes |
|---|---|---|
| Umum (`umum`) | `nama_aplikasi`, `favicon`, `logo_persegi` (1:1), `logo_lanskap` | `admin-core.branding.logo` is the fallback logo |
| Kontak (`kontak`) | `telepon`, `whatsapp`, `alamat`, `kode_pos` | Telepon: a mobile (`08…`) or landline (`0[2-9]…`) number or `+62…`, stored in E.164 (`+62…`) and displayed formatted. WhatsApp: mobile only (`08…` / `+628…`), stored as digits (`628…`), exposed as a `https://wa.me/628…` link. Postal code: 5 digits |
| Sosial Media (`sosial`) | `instagram`, `x`, `tiktok`, `facebook`, `youtube`, `linkedin` | A URL on the platform's own domain, or a handle normalised to that URL; any other domain is refused. LinkedIn: a bare handle becomes `linkedin.com/company/{handle}`; a pasted `/in/…` URL is kept |
| Akses Situs (`akses`) | `mode` (`open` / `maintenance` / `coming_soon`), `pesan` | Replaces `maintenance_banner`. Applies to public (non-admin) routes only: maintenance answers 503 with `Retry-After`, coming_soon answers 200 with a `noindex` page. Auth routes and `/admin` are never affected, and a signed-in Super Admin passes public routes too. The admin shell shows a banner while the mode isn't `open`. `php artisan admin:access {mode} [--message=]` sets it from the CLI (audited) |
| Keamanan (`keamanan`) | `session_lifetime` (minutes) | Applied to the session config on boot |
| Ekspor (`ekspor`) | `queue_threshold` | Overrides `ADMIN_EXPORT_QUEUE_THRESHOLD` |

**Branding uploads** (favicon and both logos) are the only files on the public disk (AGENTS §5): never SVG (checked by content, not name). Favicon: PNG or ICO, ≤ 256 KB, square. Logo 1:1: PNG, JPG or WebP, ≤ 1 MB, square, ≥ 128 px. Logo landscape: PNG, JPG or WebP, ≤ 1 MB, width ≥ 1.5 × height, height ≥ 32 px. Files are stored under a random file name (cache busting), and the previous file is deleted when replaced.

---

## 8. Security Baseline

- Laravel 13 `PreventRequestForgery` (origin-aware CSRF) stays on.
- Login rate limit; password rules (min 10 chars, mixed case + number, `uncompromised()` off by default for offline servers); session lifetime from Settings; logout of other sessions on password change.
- Security headers middleware: CSP report-only by default, HSTS, X-Frame-Options DENY, Referrer-Policy.
- Every admin route requires auth plus a permission. A contract test fails if any route under `/admin` lacks either.
- No secrets in seeders; `.env.example` only.

---

## 9. Quality Gates

`composer check` runs, in order, and fails on the first error:

1. `pint --test`
2. `phpstan analyse` (Larastan level 8; no baseline for `packages/admin-core`, baseline allowed only in `skeleton`)
3. `typescript:transform` and the Wayfinder generator; `git diff --exit-code` on the generated files
4. `npm run typecheck` (tsc --noEmit)
5. `npm run lint`
6. `php artisan test` for the package (Testbench) and the skeleton
7. `npm run build`

Gate 2 includes the package's contract rules (`vendor/yuanmaharsyah/admin-core/extension.neon`): controllers pass only Data objects or scalars to Inertia, and never read raw request input (`all()`, `validated()`, key-less `input()`).

### 9.1 Contract & architecture tests
These turn the AGENTS.md rules into failing tests.

| Test | Asserts |
|---|---|
| ModuleShapeTest | Every module (both roots) has every required file for its declared actions |
| ModuleDefinitionTest | Every `module.php` is valid; slugs are unique |
| RouteProtectionTest | Every route under `/admin` has `auth` + (`permission:*` or `superadmin`) |
| PolicyCoverageTest | Every declared action has its policy method |
| PermissionSyncTest | DB permissions = exactly the set derived from module configs |
| NoDirectPermissionsTest | `model_has_permissions` is empty after the full seed |
| Arch: isolation | `Modules\A` never uses `Modules\B\*` except `Models` |
| Arch: controllers | Controllers don't use `DB`, `Request::all()`, or return arrays/models to Inertia |
| Arch: data | Classes in `*/Data` extend `Spatie\LaravelData\Data` and are `#[TypeScript]`; no class extends `FormRequest` (the only exceptions are listed in the project's `tests/arch-exceptions.php`) |
| Arch: hygiene | `declare(strict_types=1)`; no `dd`/`dump`/`ray`/`var_dump`; no `env()` outside config; no `$guarded = []` |
| Arch: exports | No `Excel::download` outside `ExportManager` |
| Arch: audit | No `activity()` helper or `Activity::create` outside `Yuan\AdminCore\Audit` |
| AuditCoverageTest | Every model in a module whose table has business columns uses `LogsModuleActivity` (opt-out only via `#[NotAudited(reason: '...')]`) |
| AuditImmutabilityTest | Updating or deleting an activity row throws; no route writes to `activity_log` |
| AuditMaskingTest | Every `omit` field is absent and every `partial`/`full` field is masked, across all event types |
| AuditEventTest | Every `Audit::record()` call site uses a taxonomy event or a declared custom action |
| WidgetContractTest | Every listed widget exists, extends `Widget`, has a unique slug-prefixed key, and its permission exists after sync |

---

## 10. Out of Scope (v1)

Multi-tenancy, per-user overrides, data-scope rules (hook only), 2FA, API tokens, notifications center, in-app backups, CI pipeline, i18n beyond `id` + `en`.

## 11. Risks

| Risk | Mitigation |
|---|---|
| LLM drifts from the contract | Contract/arch tests (§9.1) + generator stubs as canonical style |
| Gates skipped (no CI) | One command; the DoD requires its output pasted in the phase report |
| Package and project npm deps diverge | `admin:doctor` + `admin-core.npm.json` |
| Core change breaks old projects | SemVer, additive migrations, UPGRADE.md, a skeleton test suite run before tagging |
| Eject abuse kills upgradability | Eject warns and is recorded in the project's `docs/decisions` |
| Data loss (no in-app backups) | Server-level DB + storage backups are a documented deploy requirement in the README; the health check warns if `BACKUP_VERIFIED_AT` is older than 7 days |
| Super Admin lockout | ≥1 active SA enforced, 2 seeded, recovery command |
| Personal data leaks into the audit trail | Masking rules applied before write + AuditMaskingTest; Sentry scrubbing as a second layer |
| Audit table grows until summaries get slow | Indexes + range cap + cached summary + performance test; optional retention |
| A slow or broken widget blocks the home page | Independent deferred loading, per-widget error isolation, per-widget cache and time budget |
