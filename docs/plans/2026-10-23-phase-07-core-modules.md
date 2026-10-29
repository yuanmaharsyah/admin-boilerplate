# Phase 07 — Core Modules + Beranda

- **Date:** 2026-10-23
- **Roadmap:** [Master Roadmap → Phase 07](./2026-10-16-admin-boilerplate-master-roadmap.md#phase-07--core-modules) (fast track: 06c → **07** → 08 → 10a → first project → 09)
- **Spec sections:** design spec §2.2 (extension points), §5 (`users`, `settings`), §6 (RBAC, guard rails §6.3), §7 (Settings, AuditSummary, retention), §7.1 (audit taxonomy, reading, SA visibility), §7.2 (widgets); frontend-behavior §8.1–8.3a, §8.6, §9; ui-design §4.1–4.4, §4.7–4.9
- **Status:** approved 2026-10-23 (see Approval); 07a approved and browser-reviewed 2026-10-23; 07b built 2026-10-24, 07c built 2026-10-24; 07b + 07c browser review approved 2026-10-24

## Scope (fast track)

Users (incl. forced password change and the `@` rule), Levels + Hak Akses matrix, Log Aktivitas (summary + list + drawer + download), the Riwayat tab, Settings (no Health tab), Downloads (Settings override of the threshold), Beranda with **2 core widgets** (activity by day, failed logins), the swappable User model, page overrides and core events. **Post-v1** (roadmap): `admin:eject`, the Health tab UI, the other three core widgets.

## Screen sources

`ref/` = `docs/design-implementation/reference/style-reference-01/`. Approved patterns from Phase 06 (`pattern-index`, `pattern-form`, `pattern-show`, `dialogs`) count as approved mockups for list, form and show pages.

| Screen | Source | Browser review |
|---|---|---|
| Users list | `ref/users-index.dc.html` + `ref/index.html` (`users`) | Yes |
| User create / edit | Approved `pattern-form` (the reference has only a placeholder) | Yes |
| User show (detail, Riwayat tab, Reset password, Aktifkan / Nonaktifkan) | Approved `pattern-show`; Riwayat from `ref/index.html` (invoice detail `ActivityHistory`) | Yes |
| Reset password dialog (generate or set; temporary password shown once) | Derived, ✅ approved (07a review, 2026-10-23) | Done |
| Levels list | `ref/index.html` (`levels`) | Yes |
| Level create / edit | Derived from approved `pattern-form`, ✅ approved (07a review, 2026-10-23) | Done |
| Hak Akses matrix (sticky header, toggles, dirty cells, save bar) | `ref/index.html` (`level-perm`, `PermissionMatrix`, `FormFooter`) | Yes |
| Log Aktivitas (KPI tiles, stat stack, segment bar, bar chart, filter bar, list, diff drawer) | `ref/index.html` (`audit`, `ActivityDrawer`, `DiffTable`) | Yes |
| Riwayat tab | `ref/index.html` (invoice detail) | Yes |
| Settings (tabs Umum, Kontak, Sosial Media, Akses Situs, Keamanan, Ekspor) | **Derived, needs browser review** (approved `pattern-form` inside the approved Show `Tabs`) | Yes |
| Beranda (widget grid, stat and bar-chart cards, skeleton / failed / empty) | `ref/index.html` (`beranda`) | Yes |
| No-access page (signed in, nothing permitted) | **Derived, needs browser review** (approved error-page card) | Yes |
| Profil (own name and email; replaces the kit page) | Derived, ✅ approved (07a review, 2026-10-23) | Done |
| Forced password change (mandatory state) | `ref/auth.dc.html` (already built in 05c, mandatory state not yet) | Yes |

## Why split

About **110 files** and **~25 test files**. Three parts, each with its own `composer check` and commit; browser reviews after **07a** (accounts and RBAC set the security patterns) and at the end of **07c** (Log Aktivitas from 07b reviewed with it), per the review rhythm.

| Part | Scope | Commit |
|---|---|---|
| **07a: Accounts & access** | Core `Users` module + swappable User model, Levels + matrix, forced password change, `@` rule, Profil page (kit files and the arch exceptions go), core events | `feat(core): phase 07a users and levels` |
| **07b: Log Aktivitas** | `AuditLog` module (summary, list, drawer, download), summary components + charts, Riwayat tab on core and demo Show pages, `admin:audit-prune` | `feat(core): phase 07b activity log` |
| **07c: Settings & Beranda** | Settings (table, service, tabs, wired values), `Dashboard` module + widget system + 2 widgets, login redirect + no-access page, Downloads threshold from Settings, copy-install check | `feat(core): phase 07c settings and beranda` |

---

## Part 07a — Accounts & access

| Path | Action | Purpose |
|---|---|---|
| `packages/admin-core/modules/Users/module.php` | create | Core module `users`, group `master`, actions `view, create, edit, delete, download` |
| `…/Users/Models/User.php` | create | The core User model (extends Laravel's `Authenticatable`; `HasLevel`, `HasDataTable`, `HasVisibilityScope`, `PreventsStaleUpdates`, `LogsModuleActivity`, `HasActivityHistory`, `SoftDeletes`). `applyVisibility()` hides Super Admin accounts from non-SA viewers (guard rail §6.3: 404 on direct access, absent from lists, lookups, exports) |
| `…/Users/Database/Migrations/*_add_admin_account_columns.php` | create | `must_change_password` (bool, default false), `lock_version` (additive; the `users` table stays project-owned) |
| `…/Users/{Http/Controllers,Policies,Data,Exports,Routes}/*` | create | List (search name/username/email; filters Level, Status; sort name, last login), create (password + confirm, level select without SA for non-SA, status switch), show, edit (`updateUnlessStale`), soft delete + Trash, reset password (generate or set → `must_change_password`), activate / deactivate, download. Every write in `DB::transaction`; events `user_activated` / `user_deactivated` / `password_reset` (`level_changed` already from `HasLevel`) |
| `…/Users/resources/js/{pages,components,lang}/*` | create | `Users::Index`, `Create`, `Edit`, `Show` (Reset password dialog, Aktifkan / Nonaktifkan, both hidden on your own record), `UserForm`, `id` / `en` dictionaries |
| `…/Users/Tests/Feature/*` | create | AGENTS §8 cases + every §6.3 guard rail that lives here (see Tests) |
| `skeleton/app/Models/User.php` | modify | `extends Yuan\AdminCore\Modules\Users\Models\User` (the swappable model: `admin-core.models.user`, `auth.providers.users.model`) |
| `src/Events/{UserCreated,UserLevelChanged,UserDeactivated}.php` | create | Extension-point events (spec §2.2), dispatched after commit |
| `src/Http/Middleware/RequirePasswordChange.php` + `web` group | create / modify | While `must_change_password`: only `/account/password` and `logout`; everything else redirects there (JSON: 403). Cleared by the change-password action |
| `pages/Auth/ChangePassword.tsx`, `ChangePasswordPageData` | modify | Mandatory state from `auth.dc.html` (info alert, Keluar as the only exit) |
| `packages/admin-core/modules/Levels/*` | create | `superadmin_only` module `levels`, group `sistem`: list (Nama, Deskripsi, Jumlah User, protected lock), create / edit / delete (guard rails from `Level`), Hak Akses page on `PermissionMatrix` |
| `resources/js/components/admin/PermissionMatrix.tsx` | create | frontend-behavior §8.2: grouped rows, dependency rule with tooltip, row and column toggles (indeterminate), dirty cells, sticky `FormFooter`, client search, `UnsavedChangesGuard` |
| `src/Account/ProfileController.php`, `Data/Account/*`, `pages/Account/Profile.tsx` | create | `/account/profile` (own name and email); the kit's ProfileController, FormRequest, `ProfileValidationRules`, `settings/profile` page and route are removed, and `tests/arch-exceptions.php` becomes empty (the file stays, as the arch tests require it) |
| `database/seeders/AdminCoreSeeder.php` | modify | SA accounts through the core model; demo-free |

**Tests 07a:** Users module (AGENTS §8 cases 1–7, 409, `assertScopedToUser` on every route); guard rails §6.3 not yet covered: non-SA can't list / view / edit / delete / deactivate / reset an SA (404), non-SA never sees the SA level in the select and can't assign it (422), no self-delete or self-deactivate, Levels / matrix SA only, protected level immutable through the UI routes; forced password change (every route except the two redirects, the flag set on create and admin reset, cleared on change); `@` in a username rejected; events dispatched once, after commit; Levels module and matrix save (one batched `permissions_updated`, dependency rule enforced server-side); Profil; browser: matrix toggles + dirty bar + guard, forced-change flow.

**07a as built** (all boxes done; browser review pending):

- [x] Core `Users` module, swappable core User model, form extension (fixture `EmployeeFields` + fixture migration loaded only by the skeleton tests).
- [x] Levels module + `PermissionMatrix`; `lock_version` on `roles` as a **core** migration (a module migration broke the package's Testbench suite, which doesn't load core modules).
- [x] Forced password change, `@` rule, `/account/profile`; kit files gone, `tests/arch-exceptions.php` returns `[]`.
- [x] Events `UserCreated`, `UserLevelChanged`, `UserDeactivated`, `ExportCompleted`, after commit.
- [x] Tests: `UsersTest`, `UsersGuardRailsTest`, `LevelsTest` (core modules, run in the skeleton), `Account/{ProfileTest,PasswordChangeRequiredTest}`, `Users/UserFormExtensionTest`, browser `AccessTest` (matrix, forced change).

Decisions where the plan was silent:
- The own-account rule (no self-deactivate / reset / delete) lives in `UserAccounts::refuseSelf()`, not the policy: `Gate::before` passes Super Admin, so a policy check let a Super Admin delete or deactivate themselves (found by the guard-rail test; the last-SA model guard then threw a 500).
- A Super Admin may give the Super Admin level; changing your own level or status in the edit form is a validation error on `level_id`.
- Bulk delete silently skips ids the viewer can't see (the Phase 06 pattern), so an SA id in a non-SA bulk delete is ignored, not a 404.
- PUT validates the input before the scoped lookup (the Data object resolves first), as in every module; with valid input an SA account is a 404.
- Seeded Super Admin accounts get `must_change_password` outside `local` / `testing` (owner, 2026-10-23).
- Bulk delete toasts count the rows actually deleted; none deleted is an error toast (owner, 2026-10-23).
- Spec §6.3 updated: the own-account rule binds Super Admin and lives outside the policy (approved 2026-10-23).

## Part 07b — Log Aktivitas

| Path | Action | Purpose |
|---|---|---|
| `skeleton/package.json`, `admin-core.npm.json` | modify | `recharts` (Q2) |
| `resources/js/components/ui/chart.tsx` | create | shadcn `chart` on recharts, `--chart-*` tokens, reduced motion, hidden data table |
| `resources/js/components/admin/{StatTile,StatStack,SegmentBar,BarChartCard,FilterBar,DiffTable,ActivityDrawer,ActivityHistory}.tsx` | create | frontend-behavior §9 contracts |
| `packages/admin-core/modules/AuditLog/*` | create | Module `audit-log`, group `sistem`, actions `view, download` (read-only). Index with the one filter state (§8.3): `summary` deferred, `events` paginated, `?event_id=` drawer; filters range (7d / 30d / 90d / custom ≤ 366 days), user, module, event, search, batch. `AuditExport` overrides `ModuleExport::query()` (activity rows aren't a DataTable model) |
| `…/AuditLog/Services/AuditSummary.php` | create | KPIs, stack, per-type and per-day / per-week counts; one grouped query each; cached 5 min per (range, user, module, viewer-is-SA); SA rule through `visibleTo()` |
| `src/Audit/HasActivityHistory.php` + `src/Data/Activity*Data.php` | modify / create | The Riwayat tab's optional prop (`Inertia::optional`), 20 per page, batch link |
| Users and demo Invoice Show pages | modify | Riwayat tab when `{slug}.view` and `audit-log.view` |
| `src/Console/AuditPruneCommand.php` + skeleton schedule | create | `admin:audit-prune` (only when `audit.retention_days` is set; one `audit_pruned` row) |

**Tests 07b:** list / summary / drawer / download permissions; a non-SA viewer's list, summary, drawer and export contain zero SA-related events; range cap 366 days (422), week buckets above 60 days; summary cache key; Riwayat lazy load + permission; retention command; perf test (Q5); browser: filter bar drives both sections, segment click filters the list, drawer opens from the URL.

**07b as built** (all boxes done; browser review with 07c):

- [x] `AuditLog` module: summary (deferred), list, `?event_id=` drawer, download (`AuditLogExport` on the new `ListExport` base; `ModuleExport` now extends it).
- [x] Summary components + `ui/chart` (recharts 3.10.1) + `ui/skeleton`; `FilterBar`, `RangeFilter`.
- [x] Riwayat tab (`ActivityHistory::prop()`) on `Users::Show` and `Invoice::Show`.
- [x] `admin:audit-prune` (`AuditPruner`), scheduled daily in the skeleton.
- [x] Core migration `add_created_on_to_activity_log_table` (owner option A, 2026-10-24).
- [x] Tests: `AuditLogTest` (incl. subtraction = direct `visibleTo()` query for every figure, five filter sets), `UsersHistoryTest`, browser `AuditLogTest`, perf `AuditSummaryPerformanceTest` (`composer test:perf`).

Decisions where the plan was silent:
- `AuditSummaryData` is flat (the seven figures, `by_type`, `by_day`, `bucket`, `from`, `to`), not nested `kpis` / `stack` (frontend-behavior §8.3 updated).
- "Aktivitas per Jenis" has five groups (`AuditCategory`: Dibuat, Diubah, Dihapus, Autentikasi, Lainnya); downloads count under Lainnya and keep their own stat (ui-design §4.3 updated).
- Non-SA summary (owner, 2026-10-24): all rows minus the rows caused by or about a current SA (`involvingUsers(superAdminIds())`), no write-time flag. Active users can't be subtracted: one `EXISTS` per user through `visibleTo()`; a force-deleted user no longer counts. Design spec §7 updated.
- The range filter is on `created_on` (whole days, same rows as the old `created_at` range), so the per-event × day grouping reads only the `(created_on, event)` index.

**Perf runs (Q5, `composer test:perf`, 1 million rows, MySQL 8 local, cache cold, budget 500 ms):**

| Date | Change | 30 d non-SA | 30 d SA | 366 d non-SA | 366 d SA |
|---|---|---|---|---|---|
| 2026-10-24 | Subtraction for non-SA (all rows minus SA rows); active users still a `GROUP BY causer_id` | 2585 ms | 1268 ms | 3015 ms | 1675 ms |
| 2026-10-24 | Active users as one `EXISTS` per user (`causer_id, created_at` index) | 221 ms ✅ | 141 ms ✅ | 701 ms ❌ | 530 ms ❌ |
| 2026-10-24 | Virtual `created_on` + covering `(created_on, event)` index, range on `created_on` (owner option A) | 252 ms ✅ | 87 ms ✅ | 427 ms ✅ | 257 ms ✅ |
| 2026-10-24 | Rerun after 07c (no summary change) | 244 ms ✅ | 95 ms ✅ | 475 ms ✅ | 304 ms ✅ |
| 2026-10-24 | Virtual `export_rows` (meta.rows of `exported` rows) in a covering `(created_on, event, export_rows)` index; counts and the rows sum in one grouped query (owner, after the review) | 101 ms ✅ | 23 ms ✅ | 310 ms ✅ | 203 ms ✅ |
| 2026-10-24 | Rerun | 97 ms ✅ | 20 ms ✅ | 306 ms ✅ | 208 ms ✅ |

The event × day grouping went from ≈ 445 ms (covering scan of the whole `(event, created_at)` index + temporary table) to ≈ 171 ms (range on `(created_on, event)`, index order, no temporary table). Margin on 366 d non-SA was thin (427–475 ms between runs), so the rows sum moved into the grouped query (`export_rows`, last two rows; the `exports` table can't give it: inline downloads write no row and rows are pruned after `ttl_hours`). Before that, the remaining non-SA cost was the exported-rows sum (≈ 70 ms each for all rows and SA rows, `event` index ref) and the SA-row grouping (≈ 55 ms, index merge).

## Part 07c — Settings & Beranda

| Path | Action | Purpose |
|---|---|---|
| `database/migrations/*_create_settings_table.php`, `src/Settings/{Settings,SettingDefinition,SettingType}.php`, `settings()` helper | create | The settings registry (design spec §7.3): typed keys declared in `admin-core.settings` (key, type, default, group = tab, rules, is_public); cached, busted on save; one `settings_updated` row per save with the old / new diff |
| `src/Settings/Types/*` | create | Types beyond string / text / int / bool / enum: `phone` (mobile `08…`, landline `0[2-9]…` or `+62…`, stored E.164 `+62…`, displayed formatted), `whatsapp` (stored as digits `628…`, exposed as a `wa.me` link), `postal_code` (5 digits), `social` (URL on the platform's domain, or a handle normalised to that URL), `image` (branding upload) |
| `src/Settings/BrandingStorage.php` | create | The one public-disk exception: per-field types and limits (design spec §7.3), never SVG; the 1:1 logo square, the landscape logo ≥ 1.5:1; random file names; the old file is deleted on replace |
| `packages/admin-core/modules/Settings/*` | create | `superadmin_only` module `settings`: tabs Umum (app name, favicon, logo 1:1, logo landscape), Kontak (telepon, WhatsApp, alamat, kode pos), Sosial Media (Instagram, X, TikTok, Facebook, YouTube, LinkedIn), Akses Situs (mode + message), Keamanan (session lifetime), Ekspor (queue threshold); tabs and fields rendered from the registry, so a project's own settings appear without page code |
| `src/Http/Middleware/SiteAccess.php`, `Console/AccessCommand.php` | create | Mode `open` / `maintenance` / `coming_soon` applies to public (non-admin) routes only; auth routes and `/admin` are never affected, and a signed-in Super Admin passes public routes too; `php artisan admin:access {open\|maintenance\|coming_soon} [--message=]` (audited, `cli` channel) |
| Wiring | modify | `AppData.name`, logos, favicon, `site_access` (replaces `maintenance_banner`), `session.lifetime`, `exports.queue_threshold` read Settings first, config / env second; `admin-core.branding.logo` stays the logo fallback |
| `src/Dashboard/{Widget,WidgetRegistry,WidgetType,WidgetSize,DashboardRange}.php`, `src/Data/Widgets/*` | create | Spec §7.2 (all five widget types and their Data objects, so Phase 08's `make:widget` has them) |
| `packages/admin-core/modules/Dashboard/*` | create | Module `dashboard`, group `beranda`, `view`; Beranda page: widget metadata + one deferred, rescued prop per widget; range param; empty state with module links |
| `…/AuditLog/Widgets/{ActivityByDay,FailedLogins}.php` | create | The 2 core widgets (bar chart `full`, stat `sm`), through `visibleTo()` |
| `resources/js/components/admin/{WidgetGrid,WidgetTable}.tsx` | create | frontend-behavior §8.6 |
| `src/Registry/ModuleDefinition.php`, `ContractAssertions::assertWidgetContract()`, `ModuleAssertions::{assertWidgetHiddenWithout,assertWidgetUsesScope,assertWidgetWithinBudget}` | modify | Widget rules + contract test + helpers (moved from Phase 04) |
| Login redirect + `Core::Errors/NoAccess` | create | After login: Beranda with `dashboard.view`, else the first permitted menu item, else the no-access page; `routes.home` becomes `dashboard.index`; the kit `dashboard` page and route go |
| Copy-install check | — | Package installed as a copy (`symlink: false`) in a scratch copy of the skeleton, `npm run build`, a core page resolves and preloads (`viteEntry()`); recorded here |

**Tests 07c:** Settings SA only, typed validation (phone, WhatsApp, postal code, each social platform: right domain, wrong domain, handle normalised), uploads (each allowed type, SVG refused, too large, non-square 1:1 logo, random name, old file deleted on replace), cache busting, `settings_updated` diff, a project-declared setting appears and saves, each wired value takes effect (app name, logos, favicon, site access, session lifetime, threshold); access modes: public route gets the maintenance / coming-soon page, login, password reset and `/admin` still work, a Super Admin is never locked out, `admin:access open` restores access; widget contract (negative fixture), each core widget hidden without `audit-log.view`, scoped, within budget; a throwing widget leaves the others (rescue); Beranda empty state; redirect rule (Beranda / first module / no-access); page override and swapped User model in the skeleton; browser: widgets load, one fails with "Coba lagi", range reloads only range widgets.

**07c as built** (all boxes done; browser review of 07b + 07c pending):

- [x] Settings registry, `settings()` helper, `settings` table (core migration), `BrandingStorage`; the value types live in one `SettingType` enum (validate / store / show / expose), not a `Types/` folder.
- [x] `Settings` module (six tabs from the registry, `ImageField`), `SiteAccess` middleware + `Core::Errors/SiteAccess`, `admin:access`.
- [x] Wiring: `AppData` (`site_access`, `logo`, `logo_landscape`, `favicon`, public `settings`), `AppMark` on the rail and the auth card, favicon and `application-name` in the root view (page titles use it); app name, session lifetime and export threshold through `Settings::applyToConfig()` at boot.
- [x] Widget system (all five types), `Dashboard` module + `WidgetGrid` / `WidgetTable`, core widgets `audit-log.failed_logins`, `audit-log.activity_by_day`; widget contract + helpers.
- [x] `/home` landing redirect + `Core::Errors/NoAccess`; the kit `/dashboard` route, page and test removed.
- [x] Copy-install check (2026-10-24): skeleton cloned to a scratch folder with `vendor/yuan/admin-core` as a real copy (no symlink); `npm run build` passed; the manifest has `vendor/yuan/admin-core/modules/Dashboard/resources/js/pages/Index.tsx`, `…/Settings/…/Index.tsx`, `…/resources/js/pages/Auth/Login.tsx` and `…/Errors/NoAccess.tsx`; `PageResolver::viteEntry('Dashboard::Index')` points at the copied file and `@vite` emits its chunk.
- [x] Tests: `SettingsRegistryTest` (package: every type, each social platform, uploads, cache, audit diff, stale, project setting, config override, empty-database boot), `WidgetContractTest` (+ `Broken/Leaky` widgets), `Settings` / `Dashboard` / `AuditLogWidgets` module tests, skeleton `SiteAccessTest`, `HomeRedirectTest`, `ExtensionPointsTest`, browser `DashboardTest` (fixture module `tests/Fixtures/Modules/WidgetProbe` with a throwing widget).

Decisions where the plan was silent:
- The landing rule lives at `/home` (`admin-core.home`, outside `/admin`, so it needs no permission) instead of making `routes.home` = `dashboard.index`: a user without `dashboard.view` would get a 403 from every "back home" link. `admin-core.routes.home` is removed; Fortify `home` is `/home`. The no-access page renders there too.
- Each Settings tab saves on its own; its stale check is the sum of its rows' `lock_version` (per-row column, AGENTS §5), carried as the form's `lock_version`.
- `settings_updated` meta is `{old: {tab: {field: …}}, new: {…}}`, nested so `audit.masked_fields` patterns match the field name (`alamat` stays masked).
- Changing a Settings tab is a visit (`?tab=`), so `UnsavedChangesGuard` covers unsaved changes when switching.
- An image field left empty keeps its file; there is no "remove logo" action (add one when asked).
- `stored()` returns no values (and caches nothing) while the settings or cache table is missing, so `artisan migrate` boots on an empty database (found by the `migrate:rollback` DoD run).
- Beranda's widget metadata travels in one `dashboard` Data prop (the PHPStan props rule needs every prop to be a Data object or a prop type); a widget's prop name is `widget_{key}` with `.` / `-` → `_`, since Inertia reads dots in `only` as nesting.
- Bar and segment widgets with every figure at 0 show the widget's empty text; a stat of 0 is shown as 0.
- `ActivityByDay` reuses the Log Aktivitas summary (its own cache, per viewer kind), so its widget cache is off.

---

## Acceptance (roadmap)

- [x] Every guard rail in spec §6.3 has a test.
- [x] A non-SA viewer's audit list and summary contain zero SA-related events.
- [x] Matrix changes apply on the next request.
- [x] One failing widget doesn't affect the others.
- [x] A user with only `invoices.view` lands on Beranda (with `dashboard.view`) or on Invoice, and sees only permitted widgets; a user with no permissions lands on the no-access page.
- [x] An overridden page and a swapped User model work in the skeleton.
- [x] Copy install: a core-module page resolves and its manifest entry preloads.
- [x] `composer check` green; `migrate:fresh --seed` and `migrate:rollback` succeed; browser reviews after 07a and 07c (07b + 07c reviewed and approved 2026-10-24).

## Scope change (owner, 2026-10-23)

- Loading state on action buttons: its own commit before 07b (roadmap Phase 07).
- Settings scope extended for 07c (design spec §7.3, AGENTS §5 branding exception). Supersedes approval answer 6: logo upload is in 07c; `admin-core.branding.logo` stays as the fallback.

After the 07b + 07c build (owner, 2026-10-24): approved, with the rows sum moved off the JSON (indexed `export_rows`, chosen over the `exports` table), the AGENTS §5 exception for `AuditSummary`'s count queries while the equality test exists, and the frontend-behavior §8.6 / §9 alignments.

Answers for 07c (owner, 2026-10-23):

- **Q10.** Telepon also accepts landlines `0[2-9]…`, stored as `+62…` (E.164) and displayed formatted; WhatsApp stays mobile only.
- **Q11.** A bare LinkedIn handle becomes `linkedin.com/company/{handle}`; a pasted `/in/…` URL is kept.
- **Q12.** Favicon PNG / ICO ≤ 256 KB, square; logo 1:1 PNG / JPG / WebP ≤ 1 MB, square, ≥ 128 px; logo landscape PNG / JPG / WebP ≤ 1 MB, width ≥ 1.5 × height, height ≥ 32 px.
- **Q13.** Maintenance answers 503 with `Retry-After`; coming_soon answers 200 with a `noindex` page.

## Open questions

**Q1. Split and reviews.** 07a / 07b / 07c as above, three commits, reviews after 07a and after 07c? **Recommended: yes.**

**Q2. Dependency.** `recharts` 3.10.1 (verified in spec §1.1; the 3.11 line is still canary), for `BarChartCard`, `SegmentBar` and the Beranda chart through shadcn's `chart` component. No other new package.

**Q3. Unduhan in the menu.** The reference lists Unduhan under Sistem, but menu items come from modules with a `{slug}.view` permission, and every user may see their own downloads. **Recommended:** no module; Unduhan stays a topbar link (with the badge) and becomes an item in the user menu and the command palette. Alternative: a `downloads` module whose `view` every level gets by default (a permission nobody should ever untick).

**Q4. Extra user fields.** Spec §2.2 pairs the swapped model with an `admin-core.users.form_extension` Data class so extra fields appear in the core form. **Recommended:** Post-v1 (a project that needs extra fields overrides the Users pages for now); 07 delivers the swappable model itself. Alternative: build the form extension now.

**Q5. Audit summary performance test** (< 500 ms on 1 million rows). Seeding a million rows takes minutes. **Recommended:** a Pest group `perf`, excluded from `composer check`, run once before the 07c review and recorded here with its timing. Alternative: run it in `composer check` (slower every time).

**Q6. Logo in Settings → Umum.** The login page shows it before sign-in, so it would need a public file, which AGENTS §10 forbids for uploads. **Recommended:** app name only now; the logo Post-v1 (with a decision on how to serve it). Alternative: serve it through a public, cached route that streams only that one file from the private disk.

**Q7. Session lifetime.** Settings → Keamanan stores it; Phase 09 lists "session timeout from Settings". **Recommended:** apply it in 07c (one line in the provider), and drop it from Phase 09.

**Q8. Profil page.** Replace the kit profile with a core `/account/profile` page (own name and email; username shown read-only, changed only by an admin), removing the last arch exceptions? **Recommended: yes.**

**Q9. Riwayat on the demo Invoice.** Add the Riwayat tab to `Invoice::Show` too, so Phase 08's stubs copy a working example. **Recommended: yes.**

---

## Approval (2026-10-23)

1. Split 07a / 07b / 07c; browser reviews after 07a and after 07c.
2. `recharts` 3.10.1 approved.
3. Unduhan stays in the topbar, the user menu and the palette; no module.
4. **Not Post-v1:** a minimal user form extension in 07a: a config class (spec §2.2, `admin-core.users.form_extension`) adds extra fields to the Users create / edit forms, their validation, `UserData` and the detail page, backed by the swappable model plus a project migration (real projects need NIP / unit / jabatan, and `unit_id` for data scope). Tested in the skeleton with one extra field.
5. Perf group `perf`, outside `composer check`; run before the 07c review and in the 10a release rehearsal, results recorded.
6. Logo upload Post-v1; instead config `admin-core.branding.logo` (a path to a static file in the project's `public/`), shown on the login card and the rail when set. No upload. (Built in 07c with Settings → Umum.)
7. Session lifetime from Settings in 07c; removed from Phase 09.
8. Core `/account/profile` replaces the kit page.
9. Riwayat tab on the demo `Invoice::Show` too.
