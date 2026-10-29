# Phase 01 — Package Skeleton & Module Registry

- **Date:** 2026-10-19
- **Roadmap:** [Master Roadmap → Phase 01](./2026-10-16-admin-boilerplate-master-roadmap.md#phase-01--package-skeleton--module-registry)
- **Spec sections:** design §2, §2.1, §2.2 (page overrides), §3, §3.1, §3.2; frontend-behavior §3 (menu data only)
- **Status:** ☑ done 2026-10-19 (see Execution notes)
- **Design gate:** none (no screen in this phase)

## Goal

`yuan/admin-core` boots in the skeleton through package auto-discovery. Both module roots (core `packages/admin-core/modules`, project `skeleton/modules`) are discovered, validated, cached, and wired: providers, migrations, routes (prefix, name, middleware), Inertia pages (`{Name}::{Page}` from lowercase `resources/js/pages`, + override map) and a permission-filtered menu. Registry classes live in `src/Registry` (`Yuan\AdminCore\Registry`); `Yuan\AdminCore\Modules\*` is for core modules only. A module dropped into `skeleton/modules` shows up in routes and menu with zero other edits.

Out of scope here (later phases): RBAC, permissions and the `active` / `superadmin` middleware (03), Data objects and shared props (02), the layout that renders the menu (05), widgets (07), the generator (08).

## Files to create or modify

### Package `packages/admin-core/`

| Path | Action | Purpose |
|---|---|---|
| `composer.json` | modify | `extra.laravel.providers` (auto-discovery); PSR-4 `Yuan\AdminCore\Modules\` → `modules/` (in addition to `src/`); runtime deps (see Dependencies); fixture namespace in `autoload-dev` |
| `config/admin-core.php` | create | `modules.roots` (name + path + namespace per root), `modules.disabled` (D10), `modules.cache_path`, `routes.prefix` (`admin`), `routes.middleware` (`web`, `auth`; Phase 03 adds `active`), `menu.groups` (the 4 groups from spec §3.1), `pages.overrides` |
| `admin-core.npm.json` | create | The npm packages + ranges the package's frontend relies on (`react`, `react-dom`, `@inertiajs/react`, `tailwindcss`), read by `admin:doctor` |
| `src/AdminCoreServiceProvider.php` | create | Merges config; builds the registry in `register()` and registers module providers; in `boot()` loads migrations (every present module, D11) and routes (enabled modules), registers commands, `optimizes()` hook, PageResolver, the `admin-core.superadmin` Gate ability (Q5) |
| `src/Registry/ModuleDefinition.php` | create | Readonly, typed value object built from `module.php`; `fromFile()` validates every rule in spec §3.1 |
| `src/Registry/InvalidModuleDefinition.php` | create | Exception: names the file, the key and the rule broken (also used for duplicate slugs/names and a `core` module listed in `modules.disabled`) |
| `src/Registry/ModuleRegistry.php` | create | Scans both roots (or reads the cache), rejects duplicate slugs, skips disabled modules; exposes `all()`, `enabled()`, `find($slug)`; registers routes/migrations/providers |
| `src/Registry/MenuBuilder.php` | create | `build(Authenticatable $user): list<MenuGroup>`: groups from config order, items ordered by `order` then label, filtered by `Gate::forUser($user)->allows('{slug}.view')`; `superadmin_only` items need `admin-core.superadmin`; `menu => false` excluded; empty groups dropped |
| `src/Registry/MenuGroup.php`, `src/Registry/MenuItem.php` | create | `final readonly` classes with the property names the Phase 02 Data classes keep: `key, label, icon, items` / `slug, label, icon, href` (D4) |
| `src/Registry/PageResolver.php` | create | Registers each enabled module's `resources/js/pages` as a namespace on Inertia's `inertia.view-finder` (so `assertInertia` and `ensure_pages_exist` resolve `Name::Page`), registers `App` → `resources/js/pages` (D7), and applies `pages.overrides` through `Inertia::transformComponentUsing()` |
| `src/Registry/CaseSensitiveViewFinder.php` | create | Inertia view finder that only matches when every path segment's case equals the file on disk, so a case mismatch fails on macOS too (D7) |
| `src/Console/ModulesCacheCommand.php` | create | `modules:cache`: writes validated definitions to `bootstrap/cache/admin-modules.php` |
| `src/Console/ModulesClearCommand.php` | create | `modules:clear` |
| `src/Console/ModulesListCommand.php` | create | `modules:list`: table of name, root, slug, group, actions, enabled, superadmin_only |
| `src/Console/DoctorCommand.php` | create | `admin:doctor`: npm deps vs `admin-core.npm.json`, module cache state (cached / stale against the module files), env sanity (Q9). Non-zero exit on any failure |
| `resources/js/lib/resolve-page.ts` | create | `resolvePage(name, pages)`: `Name::Page` → `modules/{Name}/resources/js/pages/{Page}.tsx` in either root, `App::X` → `resources/js/pages/X.tsx`, anything else → the starter-kit `pages/` (kept until Phase 05) |
| `tests/Fixtures/modules/{Demo,AdminOnly,Hidden,Off}/…` | create | Fixture modules: full valid module with route, provider, migration and page (`Demo`); `superadmin_only` (`AdminOnly`); `menu => false` (`Hidden`); `enabled => false` (`Off`). Invalid definitions are written to temp dirs per test |
| `tests/Feature/*Test.php` | create | See Tests |
| `CHANGELOG.md` | modify | Unreleased → Added |

### Skeleton `skeleton/`

| Path | Action | Purpose |
|---|---|---|
| `composer.json` | modify | PSR-4 `Modules\` → `modules/` (project modules autoload without `dump-autoload`) |
| `vite.config.ts` | modify | Alias `@admin-core` → `vendor/yuan/admin-core/resources/js`; `server.fs.allow` for the package's real path (the path repo is a symlink) |
| `tsconfig.json` | modify | `paths` `@admin-core/*`; `include` the module page globs |
| `resources/views/app.blade.php` | modify | `@vite` preloads `PageResolver::viteEntry($page['component'])` instead of the kit's `resources/js/pages/{component}.tsx` |
| `resources/js/app.tsx` | modify | `resolve` via `resolvePage` with `import.meta.glob` over the core modules, project modules and `pages/` |
| `resources/css/app.css` | modify | `@source` for the package's `resources/js`, core modules and project modules |
| `eslint.config.js`, `package.json` (`lint`, `format`) | modify | Lint and format `../packages/admin-core/resources/js` too, so gate 5 covers the package's TS |

### Docs

| Path | Action |
|---|---|
| `DEVELOPER.md` | Key files index (registry, commands), §7 commands (`modules:*`, `admin:doctor` scope), §8 rows (stale module cache, invalid `module.php` message), R9 page path (Q7) |
| `docs/plans/2026-10-16-admin-boilerplate-master-roadmap.md` | Tick Phase 01; Phase 05 item for the generated lucide list (D2) |
| `docs/specs/2026-10-16-admin-boilerplate-design.md` | §2 tree `Registry/`; §2.2 `modules.disabled` row; §3 lowercase `pages` (D7, D8, D10) |
| `packages/admin-core/stubs/` | none exist yet; Phase 08 stubs use lowercase `pages` (D7) |

## Dependencies (approval of this plan = approval of this list)

| Where | Package | Why |
|---|---|---|
| package `require` | `laravel/framework: ^13.0` (replaces `illuminate/support`) | The package uses routing, console, view, auth and Gate; one constraint instead of six `illuminate/*` |
| package `require` | `inertiajs/inertia-laravel: ^3.0` | `PageResolver` hooks Inertia's view finder and `transformComponentUsing()`. Already in the skeleton |
| package `require` | `composer/semver: ^3.4` | `admin:doctor` checks installed npm versions against the ranges in `admin-core.npm.json` (Q6) |

No npm dependency is added.

## Steps

1. `config/admin-core.php` + `AdminCoreServiceProvider` + auto-discovery; Testbench `getPackageProviders()` loads it and Inertia's provider.
2. `ModuleDefinition` + `InvalidModuleDefinition`, test-first, one test per rule:
   - every spec §3.1 key present, with the right type;
   - `name` = folder name, PascalCase; `slug` lowercase kebab;
   - `group` is a configured key;
   - `icon` is lowercase kebab (Q2);
   - `actions` contains `view`; custom actions are one lowercase word; no duplicates;
   - `core: true` with `enabled: false` is rejected;
   - `widgets` is a list of existing class names (Q3).
3. `ModuleRegistry`: discovery over `modules.roots`, duplicate-slug error naming both paths, `modules.disabled`, cache read.
4. Registration: providers of enabled modules (register phase); migrations from `Database/Migrations` of **every present** module (D11); routes of enabled modules from `Routes/web.php` in a group with prefix `admin/{slug}`, name `{slug}.`, middleware from `admin-core.routes.middleware` (+ `can:admin-core.superadmin` when `superadmin_only`, D1).
5. `modules:cache` / `modules:clear` + `optimizes(optimize: 'modules:cache', clear: 'modules:clear')`.
6. `PageResolver` (PHP) + `resolve-page.ts`; Vite alias, tsconfig paths, Tailwind `@source`, `app.tsx`.
7. `MenuBuilder` + value objects; `admin-core.superadmin` Gate ability (always false until Phase 03's `Gate::before`), used by both the menu and `superadmin_only` routes.
8. `modules:list`, `admin:doctor`, `admin-core.npm.json`.
9. Skeleton: `Modules\` autoload; manual drop-in check (copy the `Demo` fixture into `skeleton/modules`, `route:list`, menu via tinker, remove it, boot clean), recorded in this plan.
10. `composer check` green; DEVELOPER.md, CHANGELOG, roadmap and this plan ticked.

## Tests to add (package, Testbench, SQLite in-memory)

| Test | Proves |
|---|---|
| `ModuleDefinitionTest` | A valid `module.php` loads into typed properties; each rule in step 2 throws `InvalidModuleDefinition` whose message names the file and the key |
| `ModuleRegistryTest` | Both roots discovered; disabled (`enabled: false` and `modules.disabled`) skipped for routes/menu; a `core: true` module in `modules.disabled` is a boot error; duplicate slug or name across roots fails boot with both paths in the message; missing root dir is fine; an empty root boots clean |
| `ModuleRoutesTest` | Routes get `/admin/{slug}` prefix, `{slug}.` names, the configured middleware, plus `can:admin-core.superadmin` for `superadmin_only`; a request to the `superadmin_only` fixture route returns 403 for a logged-in user; every middleware on every route is a registered alias, group or existing class; a disabled or removed module's routes are gone |
| `ModuleRegistrationTest` | An enabled module's provider is registered and a disabled one's is not; the migration paths of every present module, disabled included, are in the migrator |
| `ModuleCacheTest` | `modules:cache` writes the file and the registry reads it without scanning; `modules:clear` removes it; `optimize` / `optimize:clear` run them; a cached invalid module is impossible (validation runs before writing) |
| `PageResolverTest` | `Demo::Index` resolves to the fixture's `pages/Index.tsx` through `inertia.view-finder`; `assertInertia(... ->component('Demo::Index'))` passes with `ensure_pages_exist`; `Demo::index` (wrong case) fails even on a case-insensitive disk; an override `Demo::Index => App::Demo/Index` changes the rendered component name |
| `MenuBuilderTest` | Groups ordered by config, items by `order` then label; item hidden without `{slug}.view`; `superadmin_only` item only when `admin-core.superadmin` passes (simulated with `Gate::before` in the test); `menu: false` excluded; group with no visible items dropped; disabled module absent |
| `ModulesListCommandTest` | Lists every enabled module with its root and actions |
| `DoctorCommandTest` | Passes on a healthy setup; fails with a named message for: npm package missing, npm version outside range, module cache stale, `APP_KEY` empty, `APP_DEBUG=true` in production |
| `ArchTest` (existing) | Now covers real `src/` code (strict types, no debug helpers, no `env()`) |

## Acceptance (from roadmap)

- [x] A module dropped into `skeleton/modules` appears in routes and menu with zero other edits (manual check in step 9 + `ModuleRegistryTest` / `MenuBuilderTest`).
- [x] Disabling or removing it leaves boot clean.
- [x] An invalid `module.php` gives a clear error message (file, key, rule).

## Checklist

- [x] Config + service provider + auto-discovery
- [x] `ModuleDefinition` validation (every spec §3.1 rule)
- [x] `ModuleRegistry` discovery, duplicate slugs, disabled modules, cache
- [x] Providers, migrations, routes registered
- [x] `modules:cache` / `modules:clear` + `optimize` hooks
- [x] `PageResolver` (PHP + TS), Vite alias, tsconfig, Tailwind `@source`
- [x] `MenuBuilder`
- [x] `modules:list`, `admin:doctor`, `admin-core.npm.json`
- [x] Fixture modules + tests
- [x] Manual drop-in check recorded
- [x] `composer check` green
- [x] DEVELOPER.md, CHANGELOG, roadmap updated

## Decisions (answered 2026-10-19)

Dependencies `laravel/framework ^13`, `inertiajs/inertia-laravel ^3`, `composer/semver ^3.4` approved.

1. **Middleware:** base route middleware comes from `admin-core.routes.middleware` = `['web', 'auth']` now; Phase 03 adds `active`. `superadmin_only` routes use `can:admin-core.superadmin` (the D5 always-false ability), so they deny everyone until Phase 03. Test: a request to a `superadmin_only` fixture route returns 403. No route may reference an unregistered middleware (test).
2. **Icons:** format check now. Phase 05 generates the lucide name list from the installed `lucide-react` and covers it with `check:generated` (added to the Phase 05 roadmap).
3. **Widgets:** check existing classes now; the rest in Phase 07.
4. **Menu types:** `final readonly` classes with the property names the Phase 02 Data classes keep.
5. **`admin-core.superadmin`** ability, always false until Phase 03's `Gate::before`.
6. **`composer/semver`** for `admin:doctor`.
7. **Lowercase `pages` everywhere:** module contract (spec §3), stubs and R9. A test fails when a page name's case doesn't match the file on disk.
8. **Namespace:** registry classes move to `src/Registry` (`Yuan\AdminCore\Registry`); `Yuan\AdminCore\Modules\*` is only for core modules (spec §2 updated). No name check.
9. **`admin:doctor` scope** as proposed.
10. **`admin-core.modules.disabled`** approved; listing a `core: true` module there is a boot error (spec §2.2 row added).
11. **Migrations:** always loaded for every present module; `enabled` only controls routes, menu and permissions.

## Open questions (as asked; superseded by Decisions)

1. **`active` / `superadmin` middleware don't exist until Phase 03.** Plan: routes get exactly the spec's middleware list now; Phase 01 tests inspect the route collection and register stub aliases only inside tests. Until Phase 03, requesting a module route outside tests fails with "Target class [active] does not exist". No real module exists before Phase 07, so nothing user-facing breaks. OK?
2. **"Unknown icon" (spec §3.1) needs a list of lucide names in PHP.** None exists today. Recommended: Phase 01 checks the format only (lowercase kebab), and Phase 05, which renders icons, adds a committed name list generated from the installed `lucide-react`, plus the full check. Alternative: generate and commit the list now.
3. **Widget checks (spec §3.1) need the `Widget` base class, which is Phase 07.** Recommended: Phase 01 checks that `widgets` is a list of existing classes; "extends `Widget`" and "key prefixed with the slug" are added in Phase 07 with the class.
4. **Menu output type.** laravel-data arrives in Phase 02. Recommended: `MenuBuilder` returns readonly `MenuGroup` / `MenuItem` value objects now, and Phase 02 turns them into `MenuGroupData` (the same fields, `#[TypeScript]`). Alternative: install laravel-data in this phase.
5. **`superadmin_only` items in the menu before RBAC exists.** Recommended: a Gate ability `admin-core.superadmin` that always returns false; Phase 03's `Gate::before` lets Super Admin pass every ability, so only Super Admin sees those items, with no change to `MenuBuilder`. OK?
6. **`composer/semver` for `admin:doctor`.** npm ranges (`^`, `~`, `||`) match Composer's syntax closely enough for the ranges we use. The alternative is hand-written range parsing, which I'd rather not maintain. Approve the dependency?
7. **`App::` override directory.** The starter kit's pages live in `resources/js/pages` (lowercase); DEVELOPER R9 says `resources/js/Pages/…`. Linux is case-sensitive and macOS is not, so two folders differing only in case would break. Recommended: `App::X` → `resources/js/pages/X.tsx`, and fix R9 in DEVELOPER.md to the lowercase path. Module pages keep `resources/js/Pages` (spec §3).
8. **Namespace overlap.** Spec §3 puts core modules at `Yuan\AdminCore\Modules\{Name}`, and spec §2 puts `ModuleRegistry` etc. at `Yuan\AdminCore\Modules\…` (`src/Modules`). Composer PSR-4 resolves both directories for the same prefix, so it works; the only rule is that no core module may be named like a `src/Modules` class (e.g. `MenuBuilder`). I'll add that to the validation. No spec change unless you prefer one.
9. **`admin:doctor` scope in Phase 01:** npm deps, module cache state, env sanity (`APP_KEY` set; in production `APP_DEBUG` off and `QUEUE_CONNECTION` not `sync`; `APP_TIMEZONE` set). The queue-worker and scheduler checks listed in DEVELOPER §7 come with Phase 09 (health). OK?
10. **Disabling a core module.** `enabled` lives in `module.php`, but projects never edit `vendor/`. The spec doesn't say how a project disables a non-core core module (for example Downloads). Recommended: config `admin-core.modules.disabled` (list of slugs), rejected for `core: true` modules. It's a new extension point, so it needs your OK (and a line in spec §2.2).
11. **Disabled modules' migrations aren't loaded** (simplest; their tables stay as they are). Re-enabling picks them up again. OK?

## Execution notes (2026-10-19)

Where execution added to or differed from the plan:

- **Module names are unique across roots** (not only slugs), because page names are `{Name}::{Page}`; a duplicate name fails boot like a duplicate slug.
- **`modules.disabled` applies only to the `core` root** (`ModuleRegistry::CORE_ROOT`). Matching every root by slug would also turn off a project module that takes over a core module's slug (the eject case). A turned-off core module doesn't count for duplicate checks, so the project module may reuse its slug.
- **Providers:** only enabled modules' providers are registered (migrations load for every present module, D11).
- **Root Blade view:** the kit's `@vite(... "resources/js/pages/{component}.tsx")` broke on `Demo::Index` (found in the manual check: 500 "Unable to locate file in Vite manifest"). Added `PageResolver::viteEntry()` (same case-exact finder) and used it in `skeleton/resources/views/app.blade.php`.
- **Lint coverage of the package's TS:** the skeleton's ESLint and Prettier both skip `vendor/` (Prettier 3 also reads `.gitignore`), so `npm run lint` adds `eslint --no-ignore vendor/yuan/admin-core/resources/js` and Prettier runs with `--ignore-path .prettierignore` over `resources/ modules/ vendor/yuan/admin-core/resources/js`. A deliberate `any` and an unformatted file in the package were both caught.
- **`admin:doctor` timezone:** shown as information (`APP_TIMEZONE .. OK Asia/Jakarta`), not pass/fail; any valid timezone is acceptable.
- **Testbench:** module config is set in `resolveApplicationConfiguration()` because Testbench registers package providers before `defineEnvironment()`; `phpunit.xml` gets a test-only `APP_KEY`. Command tests use `Artisan::call()` and `AssertableInertia::fromTestResponse()` so Larastan level 8 types them; `vendor/pestphp/pest/extension.neon` is included in `phpstan.neon`.
- **Not verifiable yet:** the Vite manifest key for a page under `vendor/yuan/admin-core/modules` (a symlink in the monorepo) — no core module exists until Phase 07. Phase 07 must check that `viteEntry()` matches the manifest for a core module page.

### Manual drop-in check (skeleton)

`Demo` fixture copied to `skeleton/modules/Demo` (namespace changed to `Modules\Demo`), no other edits:

| Check | Result |
|---|---|
| `route:list --path=admin` | `GET admin/demo … demo.index` |
| `modules:list` | `Demo · project · demo · master · view, create, approve · yes · no` |
| Provider | registered (`fixtures.demo.registered` bound) |
| Menu (with `demo.view` granted) | `[{"key":"master","label":"Master Data","icon":"database","items":[{"slug":"demo","label":"Demo","icon":"receipt","href":".../admin/demo"}]}]` |
| Migration | `create_demo_items_table … Pending` (loaded) |
| `npm run build` + logged-in `GET /admin/demo` | 200, component `Demo::Index`, page chunk preloaded; kit `/dashboard` and `/login` still 200 |
| `resolvePage()` in Node against the real glob key shapes | kit, `App::`, project and core names resolve; wrong case / unknown names throw |
| `'enabled' => false` | route gone, menu `[]`, `modules:list` shows `no`, boot clean |
| `'group' => 'gudang'` | boot fails: `Invalid module definition in [.../modules/Demo/module.php]: "group" must be one of the configured menu groups (beranda, master, keuangan, sistem).` |
| Module removed | no admin routes, empty `modules:list`, boot clean |

### Rule-break checks for the new tests

| Break | Result |
|---|---|
| Drop the case check from `CaseSensitiveViewFinder` | "rejects a page name whose case differs" fails (2 failed) on macOS |
| Add `active` to `admin-core.routes.middleware` | "uses only registered middleware" fails: `Route [admin/notes] uses unregistered middleware [active].` |
