# Phase 02 — Type Bridge & Shared Props

- **Date:** 2026-10-19
- **Roadmap:** [Master Roadmap → Phase 02](./2026-10-16-admin-boilerplate-master-roadmap.md#phase-02--type-bridge--shared-props)
- **Spec sections:** design §1.1, §4, §9 (gate 3); frontend-behavior §2 (shared props, flash), §3 (menu data, `admin_panel` cookie)
- **Status:** ☑ done 2026-10-19 (see Execution notes)
- **Design gate:** none (no screen in this phase)

## Goal

PHP Data classes become the only source of the frontend's prop types. laravel-data + typescript-transformer 3 write one `generated.d.ts` per project; Wayfinder covers module routes; the package's `HandleInertiaRequests` shares only Data objects (`auth`, `menu`, `app`), flash goes through Inertia 3's native flash typed by `FlashData`; a thin skeleton subclass is where projects add props; `composer check` regenerates both and fails on a diff. The starter kit's hand-written `User` / `Auth` / shared-prop types are removed and the kit UI reads the generated types.

Out of scope (later phases): RBAC data inside `auth` (03, see Q2), `downloads.ready_count` (06/07), `app.maintenance_banner` (07, Settings), the arch test "Data classes extend `Data` and are `#[TypeScript]`" (04), `HasDataTable` / the first real `PaginatedData` consumer (06), the new shell that renders `menu` (05).

## Verified before planning (scratch install, nothing changed in the repo)

- `spatie/laravel-data` 4.23.0 + `spatie/laravel-typescript-transformer` 3.3.0 (→ `spatie/typescript-transformer` 3.3.1) install together on `laravel/framework` 13.37.
- laravel-data's own `Support/TypeScriptTransformer/*` targets transformer **v2** and is not used. Transformer **v3** ships the laravel-data integration itself (`LaravelDataTypeScriptTransformerExtension` → `DataClassTransformer`, which transforms every `BaseData` class).
- Transformer v3 reads `@template` on classes (`ClassTransformer` → TS generics), so `PaginatedData<T>` can be generated, not hand-written. Step 2 confirms it on the real output before anything depends on it.
- Configuration is an app service provider (`typescript:install` publishes `App\Providers\TypeScriptTransformerServiceProvider`); the command is `typescript:transform`.

## Files to create or modify

### Package `packages/admin-core/`

| Path | Action | Purpose |
|---|---|---|
| `composer.json` | modify | `require` `spatie/laravel-data` and `spatie/laravel-typescript-transformer` (see Dependencies) |
| `src/Data/UserData.php` | create | `id, name, email` from the authenticated user (no model passed to Inertia) |
| `src/Data/AuthData.php` | create | `user: ?UserData`, `is_super_admin: bool` (via the Phase 01 `admin-core.superadmin` ability); `level` + `permissions` per Q2 |
| `src/Data/MenuGroupData.php`, `src/Data/MenuItemData.php` | create | Same properties as Phase 01's `MenuGroup` / `MenuItem` (`key, label, icon, items` / `slug, label, icon, href`) |
| `src/Registry/MenuGroup.php`, `src/Registry/MenuItem.php` | delete | Replaced by the Data classes (Phase 01 D4) |
| `src/Registry/MenuBuilder.php` | modify | Returns `list<MenuGroupData>` |
| `src/Data/FlashData.php` | create | `success, error, info`, each `string\|Optional` (omitted when unset, so several `Inertia::flash()` calls merge); sent with `Inertia::flash($flash->toArray())`, typed on the client via `InertiaConfig.flashDataType` (A3) |
| `src/Data/AppData.php` | create | `name, locale, timezone, panel_open` (cookie `admin_panel`, frontend-behavior §3) |
| `src/Data/PaginatedData.php` | create | `@template T of Data`; `items: list<T>`, `meta: PaginationMetaData`, `links: PaginationLinksData`; `PaginatedData::fromPaginator(LengthAwarePaginator $page, class-string<T> $item)`, which calls `withQueryString()` so links keep the filters (A5) |
| `src/Data/PaginationMetaData.php`, `src/Data/PaginationLinksData.php` | create | `current_page, per_page, total, last_page` / `first, last, prev, next` (`?string`) |
| `src/Http/Middleware/HandleInertiaRequests.php` | create | Extends `Inertia\Middleware`; `rootView = 'app'`; shares `auth`, `menu` (`[]` for guests), `app`, each as a lazy closure so partial reloads skip what they don't ask for |
| `UPGRADE.md` | create | Standard steps for every upgrade, including "regenerate types" (A1) |
| `tests/Feature/*Test.php` | create/modify | See Tests |
| `CHANGELOG.md` | modify | Unreleased → Added (Data classes, middleware), Changed (`MenuBuilder` returns Data), Removed (`MenuGroup`, `MenuItem`) |

Every Data class is `final`, `#[TypeScript]`, `declare(strict_types=1)`.

### Skeleton `skeleton/`

| Path | Action | Purpose |
|---|---|---|
| `app/Providers/TypeScriptTransformerServiceProvider.php` | create | From the package stub: `LaravelDataTypeScriptTransformerExtension`, `EnumTransformer`, `GlobalNamespaceWriter('generated.d.ts')` into `resources/js/types`, `PrettierFormatter`; directories = `app/`, the core `src/`, and every **existing** path in `admin-core.modules.roots` (neither module dir exists yet) |
| `bootstrap/providers.php` | modify | Register it |
| `resources/js/types/generated.d.ts` | generate | Committed; never hand-edited |
| `app/Http/Middleware/HandleInertiaRequests.php` | replace | Thin subclass of the package's: `share()` returns `[...parent::share($request)]`, the place where a project adds props (A4) |
| `bootstrap/app.php` | modify | `encryptCookies(except:)` swaps `sidebar_state` for `admin_panel` |
| `composer.json` | modify | `setup` and `post-update-cmd` run `typescript:transform` and `wayfinder:generate --with-form` (A1) |
| `.prettierignore` | modify | Ignore `resources/js/types/generated.d.ts` (generated; no formatter, so generation needs no `node_modules`) |
| `resources/js/types/global.d.ts` | modify | `sharedPageProps` = `auth: Yuan.AdminCore.Data.AuthData`, `menu: Yuan.AdminCore.Data.MenuGroupData[]`, `app: …AppData`; `flashDataType` = `…FlashData`; the `[key: string]: unknown` escape hatch is removed |
| `resources/js/types/auth.ts`, `types/index.ts` | delete / modify | Hand-written `User` / `Auth` removed (AGENTS §6) |
| `components/app-logo.tsx`, `layouts/auth/auth-split-layout.tsx` | modify | `name` → `app.name` |
| `components/app-shell.tsx`, `components/ui/sidebar.tsx` | modify | `sidebarOpen` → `app.panel_open`; cookie name `sidebar_state` → `admin_panel` (one constant) so the kit sidebar keeps persisting until Phase 05 replaces it |
| `components/user-info.tsx`, `components/app-header.tsx` | modify | Type `UserData`; drop the `avatar` image (no such field; initials fallback stays) |
| `hooks/use-flash-toast.ts` + kit `ProfileController`, `SecurityController` | modify | Hook reads `success` / `error` / `info` (4s / persistent / 6s, frontend-behavior §2); the two `Inertia::flash('toast', …)` calls send `FlashData` (A3) |
| `tests/Feature/*` (kit tests touching shared props / flash) | modify | Only where the prop names changed |

### Repo root & docs

| Path | Action |
|---|---|
| `composer.json` | `check`: `@php skeleton/artisan typescript:transform --ansi` before the Wayfinder step; `check:generated` also covers `skeleton/resources/js/types/generated.d.ts`; `setup` regenerates both (A1) |
| `AGENTS.md` §5 | Remove the `HandleInertiaRequests.php` line from the temporary-exception list (its file is replaced by a Data-only subclass) |
| `DEVELOPER.md` | §5 key files (`Data/*`, middleware, generated file path per Q1), §3 picture (`PaginatedData::fromPaginator`), R2 step 4, §7 `typescript:transform`, §8 row for an empty/missing type after adding a Data class outside the scanned dirs |
| `docs/specs/2026-10-16-admin-boilerplate-design.md` | Approved changes, diffs in the report: §1.1 status → Installed + `spatie/typescript-transformer` row; §2 tree; §2.2 shared-props row (A4); §4 one file per project + regeneration + native flash (A1, A3) |
| `docs/specs/2026-10-16-frontend-behavior.md` | §2 shared props without `flash` (and `level` / `permissions` / `downloads` / `maintenance_banner` noted with their phase); Flash row = native flash (A2, A3) |
| Roadmap | Tick Phase 02; move items per Q2 |

## Dependencies (approval of this plan = approval of this list)

| Where | Package | Why |
|---|---|---|
| package `require` | `spatie/laravel-data: ^4.23` | Every prop and input (D4); version from spec §1.1 |
| package `require` | `spatie/laravel-typescript-transformer: ^3.3` | `#[TypeScript]` attribute + `typescript:transform`; spec §1.1. Pulls `spatie/typescript-transformer` 3.3.x |

Required by the package, so the skeleton (and every project) gets them transitively; the skeleton's `composer.json` doesn't list them. No npm dependency (the formatter uses the installed Prettier).

## Steps

1. Dependencies in the package; `composer update yuan/admin-core` in the skeleton.
2. Skeleton `TypeScriptTransformerServiceProvider`; generate once with a throwaway Data class to confirm the namespace output, nullable fields, `list<X>` → `X[]` and `@template` → `PaginatedData<T>`. Throwaway removed.
3. Data classes in `src/Data`, test-first; `MenuBuilder` switched to `MenuGroupData`, old value objects deleted.
4. Package `HandleInertiaRequests` + tests; the skeleton's becomes a thin subclass; cookie renamed.
5. Kit TS: `global.d.ts` from generated types, hand-written types deleted, usages fixed until `tsc` is clean; flash hook + the two kit controllers on `FlashData`.
6. `composer check` gains `typescript:transform` + the generated-file diff; `setup` / `post-update-cmd` regenerate; UPGRADE.md.
7. Wayfinder: manual check that module routes generate typed helpers — copy the `Demo` fixture into `skeleton/modules` with an invokable controller instead of the closure, run `wayfinder:generate`, import `@/actions/Modules/Demo/...` and `@/routes/demo` in a scratch TSX, `tsc`; then remove everything and regenerate. Recorded in this plan.
8. Acceptance rule-breaks (below), recorded in this plan.
9. `composer check` green; DEVELOPER.md, CHANGELOG, AGENTS.md exception list, roadmap, this plan.

## Tests to add

**Package (Testbench):**

| Test | Proves |
|---|---|
| `SharedPropsTest` | Guest: `auth.user` null, `is_super_admin` false, `menu` `[]`, `app` filled; logged in: `auth.user` = `{id, name, email}` only (no password, token or timestamps), `menu` = `MenuBuilder` output for that user; `app.panel_open` true without the cookie, false with `admin_panel=false`; every shared value is a `Data` instance; a subclass adding a prop keeps every core prop (A4) |
| `FlashTest` | `FlashData` sent through `Inertia::flash()` before a redirect arrives once in the page's `flash` (only the keys that were set), and the next request has none (A3) |
| `PaginatedDataTest` | `fromPaginator()` maps items through the given Data class and fills `meta` and `links` (first/last/prev/next, null at the edges); page 2 of `?filter[status]=paid` keeps the filter in every link (A5) |
| `MenuBuilderTest` (existing) | Same assertions, now against `MenuGroupData` / `MenuItemData` |
| `ModuleRoutesTest` (existing) | Unchanged; `HandleInertiaRequests` registered in the Testbench web group so module pages get the shared props |

**Skeleton:** `SharedPropsTest`: the web group runs `App\Http\Middleware\HandleInertiaRequests`, which is a subclass of the package's, and a page gets `auth`, `menu`, `app` (A4). Existing kit feature tests stay green; the profile update flashes `success`.

## Acceptance (from roadmap)

- [x] Renaming a property on a Data class without regenerating fails `composer check` (rule-break: rename `AppData::$name`, run `composer check` → stops at `check:generated`).
- [x] After regenerating, a TS usage of the old name fails `tsc` (same rename + `typescript:transform` → `app-logo.tsx` fails `npm run typecheck`). Reverted.

## Checklist

- [x] Dependencies installed
- [x] Transformer provider + generated file (generics verified)
- [x] Data classes; `MenuBuilder` on Data
- [x] Package `HandleInertiaRequests`; skeleton subclass
- [x] Kit TS on generated types; hand-written types removed
- [x] Native flash typed by `FlashData` (A3)
- [x] Skeleton subclass + extension-point test (A4)
- [x] `setup` / `post-update-cmd` regenerate; UPGRADE.md (A1)
- [x] `withQueryString` + filter test (A5)
- [x] Spec diffs (§1.1, §2, §2.2, §4, frontend-behavior §2)
- [x] `composer check` regenerates + diffs `generated.d.ts`
- [x] Wayfinder module-route check recorded
- [x] Acceptance rule-breaks recorded
- [x] `composer check` green
- [x] DEVELOPER.md, CHANGELOG, AGENTS.md, roadmap updated

## Decisions where the spec is silent (say if you disagree)

1. **Writer:** `GlobalNamespaceWriter` (the transformer's default stub). Types are referenced as `Yuan.AdminCore.Data.AuthData`, `Modules.Invoice.Data.InvoiceData`, `App.Data.X`: no imports, and no name clash between two modules' `UserData`.
2. **`PaginatedData` links:** `first, last, prev, next` URLs from the paginator (server-built, so no hardcoded URLs in TS). No page-number button list; DataTable (Phase 06) builds its pager from `meta`.
3. **`PaginatedData` factory:** `PaginatedData::fromPaginator($page, InvoiceListItemData::class)`. DEVELOPER §3 currently shows laravel-data's `collect($page, PaginatedData::class)`, which only works for laravel-data's own collection classes and produces laravel-data's shape (`data` + Laravel's full meta), not spec §4's. DEVELOPER §3 is updated to match.
4. **Middleware location:** the package class is wired explicitly in the skeleton's `bootstrap/app.php` (visible, and a project can point at a subclass to add props). The package doesn't push it into the web group itself.
5. **`UserData`** = `id, name, email`. `username`, `is_active`, `last_login_at` arrive with the users-table migration in Phase 03.
6. **Kit cookie:** the kit sidebar's cookie becomes `admin_panel` now, so `app.panel_open` is the spec's prop from day one and the kit keeps working until Phase 05.

## Approval (2026-10-19)

Plan and both dependencies approved, with these changes:

- **A1 (Q1):** one `generated.d.ts` per project. `composer setup` and `post-update-cmd` run `typescript:transform` and `wayfinder:generate`; UPGRADE.md lists "regenerate types" as a standard step; spec §4 updated (diff in report).
- **A2 (Q2):** `auth.level` / `auth.permissions` in Phase 03, `maintenance_banner` in Phase 07, `downloads.ready_count` in Phase 06/07. No placeholder values.
- **A3 (Q3):** verify native flash first; if it is (a) not replayed on back navigation and (b) typeable via `FlashData`, use it everywhere instead of a shared prop and update spec §4 / frontend-behavior §2. **Result: both true, native flash used.**
  - (a) `@inertiajs/core` 3.9 writes history entries as `{ ...page, flash: {} }` (`pageForHistory`, and `replaceState` strips `flash`), so back/forward restores a page with empty flash; the server side `pullFlashed()` removes it from the session after one response.
  - (b) `InertiaConfig.flashDataType` types `page.flash` and the `flash` event; the server side `Inertia::flash(array)` takes `FlashData::toArray()`.
- **A4:** thin skeleton `App\Http\Middleware\HandleInertiaRequests` extending the package's and merging `parent::share()`; spec §2.2 extension point + test.
- **A5:** `fromPaginator()` keeps the query string (`withQueryString`); test that page 2 of a filtered list keeps the filter.

Decision 4 above ("package class wired directly") is replaced by A4. The formatter is dropped (`PrettierFormatter` would need `node_modules` during `composer update`); the generated file is in `.prettierignore` instead.

## Open questions (as asked; answered in Approval)

1. **One `generated.d.ts` per project, or one per root?** Spec §4 says "(one per root)" and DEVELOPER §5 lists `packages/admin-core/resources/js/types/generated.d.ts`. But:
   - Core routes are registered under a configurable prefix, so the core's Wayfinder helpers can only be generated **in the project** anyway; core TS will import them from `@/actions/...` / `@/routes/...`.
   - Shipping a package-owned file means a second transformer config that runs inside Testbench, plus an exclusion in the project config so `Yuan.AdminCore.*` isn't declared twice.
   - The package's TS is only type-checked inside a project (Phase 01), so a project-generated file covers it.

   **Recommended:** one file per project, `resources/js/types/generated.d.ts`, generated from the project's `app/`, both module roots and the core `src/`. After `composer update yuan/admin-core`, `composer check` shows the core type diff and forces regeneration. Spec §4 and DEVELOPER §5 updated to say so. **Alternative:** a package-owned file generated through Testbench, as the spec reads today.

2. **`auth.level` and `auth.permissions` before RBAC exists.** The roadmap puts them in Phase 02's `AuthData`, but roles and permissions only exist from Phase 03; filling them now means hardcoded `null` / `[]` (placeholders, AGENTS §2). **Recommended:** Phase 02 ships `user` + `is_super_admin` (real, through the existing ability); Phase 03 adds `level: ?LevelData` and `permissions: list<string>` when spatie lands (roadmap items moved accordingly). The same rule for `app.maintenance_banner` (Phase 07, Settings) and `downloads.ready_count` (Phase 06/07, exports). **Alternative:** declare every field now with fixed empty values.

3. **Flash: shared prop or Inertia 3's native flash?** Frontend-behavior §2 lists `flash` as a shared prop with `success` / `error` / `info`. The kit instead uses Inertia 3's native flash (`Inertia::flash('toast', …)` + `router.on('flash')`), which is not a prop and can't be typed from a Data class without a Data object that is never instantiated. **Recommended:** follow the spec — `flash: FlashData` shared from the session (`->with('success', …)`), the kit's two calls and its toast hook switched to it now, so there's one mechanism. **Alternative:** keep native flash, type it via `InertiaConfig.flashDataType`, and change frontend-behavior §2.

## Execution notes (2026-10-19)

Where execution added to or differed from the plan:

- **CLI PHP:** the shell's `php` was 8.3; every command ran with `/opt/homebrew/opt/php@8.4/bin` first in `PATH` for that command only. No global setting changed.
- **No formatter, no manifest:** `GlobalNamespaceWriter` output is unformatted and listed in `.prettierignore` and the ESLint ignores; `withoutManifest()` stops the transformer writing `typescript-transformer-manifest.json`.
- **Extra types in `generated.d.ts`:** the laravel-data extension also emits `Illuminate.LengthAwarePaginator` / `Spatie.LaravelData.PaginatedDataCollection` aliases. Harmless; not used (`PaginatedData<T>` is ours).
- **`global.d.ts` needs `export {}`:** without its old import it became a script, and its `declare module 'react'` replaced React's types.
- **Kit UI:** `avatar` dropped (no such field; initials stay); `settings/profile.tsx` reads `auth.user` from the shared props instead of a hand-written page type; `FlashToast` type removed with the old hook.
- **`UserData::fromUser()`** reads `name` / `email` with `data_get`, so it works for any `Authenticatable` (Phase 07 makes the User model swappable).
- **Skeleton flash test** asserts the session key Inertia uses (`inertia.flash_data`) after the profile update; the package `FlashTest` covers delivery once and absence on the next request.
- **`composer check` needs generated files tracked:** they are staged (`git add`), not committed.
- **`migrate:fresh --seed` / `migrate:rollback`** run on the test database (no migration changed in this phase; the dev database was left as is).
- **`admin:docs`** doesn't exist yet (Phase 10); the AUTO sections were not regenerated.

### Wayfinder module-route check (skeleton)

`Demo` fixture copied to `skeleton/modules/Demo` with an invokable `Modules\Demo\Http\Controllers\DemoController`:

| Check | Result |
|---|---|
| `route:list --path=admin` | 1 route (`demo.index`) |
| `wayfinder:generate --with-form` | `actions/Modules/Demo/Http/Controllers/DemoController.ts` and `routes/demo/index.ts` generated |
| Scratch TS importing `DemoController().url` and `index().url` from `@/routes/demo` | `tsc` exit 0 |
| Module removed + regenerate | generated output back to the committed state |

### Acceptance rule-breaks

| Break | Result |
|---|---|
| Rename `AppData::$name` → `$app_name` (PHP callers updated, so Pint/Larastan/Pest pass) | `composer check` stops at `check:generated`: `-name: string, +app_name: string` / "Generated files are stale or untracked" |
| Same rename, types regenerated | `npm run typecheck`: `app-logo.tsx(6,13)` and `auth-split-layout.tsx(11,13)`: `Property 'name' does not exist on type 'AppData'` |
| Reverted | no `app_name` left; `generated.d.ts` equals the staged version |
