# design-implementation — Mockup Manifest

> **Public repository:** `reference/` and `briefs/` are the owner's private design sources and aren't included here (they're gitignored). The screens built from them are done; a new screen follows the closest built screen plus `docs/specs/2026-10-16-ui-design.md`, as a **derived** screen.

Design sources for the coding agent, in priority order:
1. **Approved mockups** (`*.html` in this folder, status `✅ approved`).
2. **The owner's design source** in `reference/`.
3. **`docs/specs/2026-10-16-ui-design.md`.**

A higher source wins on looks. Behaviour always comes from `docs/specs/2026-10-16-frontend-behavior.md`, which wins over every design source.

`reference/` contains original design work created specifically for this project. No third-party license applies; agents may read and adapt it freely (still mapping colours to tokens and not copying its demo JS).

## Rules
- File names are fixed. The coding agent looks them up by name.
- A mockup is ready when its status is `✅ approved`.
- A screen with no approved mockup is built from its `reference/` file if one exists (column **Source**), otherwise it is **derived**: the closest existing design plus ui-design.md. The owner approves a derived screen by reviewing it rendered in a browser at the end of its phase, then its status becomes `✅ approved (browser review)`.
- In every case: colours map to theme tokens, no hex values in components, no demo JS or its libraries copied, and sample data never goes into code.
- To revise: replace the file, set the status back to `🟡 review`, and add a line to the changelog at the bottom.
- Generated project modules (`make:module`) have no mockups. They follow the stubs, which are built from the generic `pattern-*` mockups.

## Production order (for the UI model)
1. `tokens.html` → 2. `shell.html` → 3. `pattern-index.html` → 4. `pattern-form.html` → 5. `pattern-show.html` → 6. `dialogs.html` → then the rest.

The pattern files define every generated module, so review them hardest. A beautiful dashboard with a weak table fails the brief.

Owner's design source (own work): `reference/style-reference-01/` (design code + `screenshots/app.png`). The design tool's runtime (`support.js`) and a third-party inspiration image were removed on 2026-10-25 (not the owner's work), so the `.html` files render only in the design tool; read them as source, or use the screenshot. Coding agents and the UI model may both read and adapt it (see the rules above). Anything added here later must be the owner's own work or licensed for reuse in commercial client projects; if it isn't, keep only a screenshot.

Per-screen briefs (self-contained context for the UI model, with exact sample data): `briefs/*.brief.md`. When a brief exists, give the UI model the brief + reference image for that screen.

| Brief | Produces |
|---|---|
| `briefs/audit-log.brief.md` | `audit-log.html`, `activity-history.html` |

## Manifest

| File | Screen / component | Implemented in | Roadmap phase | Status |
|---|---|---|---|---|
| `tokens.html` | Color tokens (light/dark), type scale, spacing, radius, icons. **Source:** `reference/…/index.html` token block (ui-design §1) | `resources/css/admin-core.css` theme | 05 | ✅ approved (browser review, 2026-10-20) |
| `shell.html` | Group rail + item panel (open / collapsed / overlay), topbar, breadcrumbs, user menu, mobile sheet, maintenance banner. **Source:** `reference/…/index.html`, `users-index.dc.html`; rail overflow derived | `AdminLayout`, `AppRail`, `ItemPanel` | 05 | ✅ approved (browser review, 2026-10-20) |
| `command-palette.html` | Palette: sections, empty state. **Source:** `reference/…/index.html`, `users-index.dc.html` | `CommandPalette` | 05 | ✅ approved (browser review, 2026-10-20) |
| `error-pages.html` | 403 / 404 / 419 / 500 / 503. **Source:** derived (auth card + code in ink over the 2px rule) | `Core::Errors/Show` | 05 | ✅ approved (browser review, 2026-10-20) |
| `auth.html` | Login, forgot, reset, change password. **Source:** `reference/…/auth.dc.html` | `Core::Auth/*`, `AuthLayout` | 05 | ✅ approved (browser review, 2026-10-20) |
| `pattern-index.html` | Generic index: header, toolbar, table, all states, bulk bar. **Source:** `reference/…/users-index.dc.html` (`DataTable`, `DataTableToolbar`, `DataTablePagination`, `EmptyState`, `StatusBadge`); column menu contents derived | `DataTable` family, index stub | 06a | ✅ approved (browser review, 2026-10-20) |
| `pattern-form.html` | Generic create/edit: all field types, errors, sticky footer. **Source:** `FormField` / `Input` from `reference/…/auth.dc.html`, `FormFooter` from `reference/…/index.html`; field types and page layout derived | Form fields, `FormFooter`, form stub | 06b | ✅ approved (browser review, 2026-10-23) |
| `pattern-show.html` | Generic detail: detail grid, tabs (Lampiran, Riwayat). **Source:** `reference/…/index.html` (invoice detail: `DetailGrid`, tabs, `AttachmentList`) | `DetailGrid`, show stub | 06b | ✅ approved (browser review, 2026-10-23) |
| `dialogs.html` | Confirm delete, stale update, unsaved changes, undo toast. **Source:** `reference/…/users-index.dc.html` + `index.html` (`ConfirmDialog`, `Toast`, `UnsavedChangesGuard`); `StaleUpdateDialog` and the type-the-name permanent-delete confirm derived | `ConfirmDialog`, `ForceDeleteDialog`, `StaleUpdateDialog`, `UnsavedChangesGuard` | 06a / 06b | ✅ approved (browser review, 2026-10-23) |
| `file-upload.html` | Drop zone, progress, list, errors. **Source:** `AttachmentList` from `reference/…/index.html`; `FileUpload` derived | `FileUpload`, `AttachmentList` | 06c | ✅ approved (browser review, 2026-10-23) |
| _(no file)_ | Trash of a module (SA): list, restore, permanent delete. **Source:** derived (reference `DataTable`) | `Core::Trash/Index` | 06a | ✅ approved (browser review, 2026-10-20) |
| `users-index.html` / `users-form.html` / `users-show.html` | Users screens. **Source:** `reference/…/users-index.dc.html` + `index.html`; form and show on the approved patterns; reset-password dialog and temporary-password dialog derived | `Users::*`, `ResetPasswordDialog`, `TemporaryPasswordDialog` | 07a | ✅ approved (browser review, 2026-10-23) |
| `levels-index.html` | Levels list and the level create / edit form. **Source:** `reference/…/index.html` (`levels`); the form derived from `pattern-form` | `Levels::Index`, `Levels::Create`, `Levels::Edit` | 07a | ✅ approved (browser review, 2026-10-23) |
| `levels-permission-matrix.html` | Hak Akses matrix, dirty state, save bar. **Source:** `reference/…/index.html` (`level-perm`) | `PermissionMatrix`, `Levels::Permissions` | 07a | ✅ approved (browser review, 2026-10-23) |
| _(no file)_ | Profil (own name and email) and the mandatory change-password state. **Source:** profile derived from `pattern-form`; mandatory state from `reference/…/auth.dc.html` | `Core::Account/Profile`, `Core::Auth/ChangePassword` | 07a | ✅ approved (browser review, 2026-10-23) |
| `audit-log.html` | Dashboard-style summary (KPI tiles, stat stack, per-type segment bar, per-day bar chart) + event list + diff drawer; **closest screen to the reference image** | `AuditLog::Index`, `StatTile`, `StatStack`, `SegmentBar`, `BarChartCard`, `FilterBar`, `DiffTable` | 07 | ✅ approved (browser review, 2026-10-24) |
| `dashboard.html` | Beranda widget grid (all widget types, loading / failed / empty states, no-access page) in the reference layout. **Source:** `reference/…/index.html` (`beranda`); no-access page derived (error-page card) | `Dashboard::Index`, `WidgetGrid`, `WidgetTable`, `Core::Errors/NoAccess` | 07 | ✅ approved (browser review, 2026-10-24) |
| `activity-history.html` | Riwayat tab timeline with expanded diff and batch link (shown inside `pattern-show`) | `ActivityHistory` | 07 | ✅ approved (browser review, 2026-10-24) |
| `settings.html` | Pengaturan tabs (Umum, Kontak, Sosial Media, Akses Situs, Keamanan, Ekspor; Health is Post-v1). **Source:** derived (approved `pattern-form` inside the Show `Tabs`) | `Settings::Index`, `ImageField` | 07 | ✅ approved (browser review, 2026-10-24) |
| _(no file)_ | Public page in maintenance / coming soon. **Source:** derived (error-page card) | `Core::Errors/SiteAccess` | 07 | ✅ approved (browser review, 2026-10-24) |
| `downloads.html` | Export list with statuses. **Source:** derived (the reference `DataTable` rows in a card); a minimal version ships in 06c at `/account/downloads` | `Core::Downloads/Index` | 06c | ✅ approved (browser review, 2026-10-23) |

Status values: `☐ not started` · `🟡 review` · `✅ approved` · `✅ approved (browser review)` (derived or reference-built screen, approved rendered in a browser)

## Changelog
| Date | File | Change |
|---|---|---|
| 2026-10-24 | `audit-log.html`, `activity-history.html` | Approved in the owner's Phase 07 browser review (built from `reference/…/index.html`: `audit`, invoice detail) |
| 2026-10-24 | `settings.html`, `dashboard.html`, no-access, maintenance / coming-soon | Approved in the owner's 07b + 07c browser review (derived: Pengaturan, no-access page, public site-access page) |
| 2026-10-23 | Users, Levels, matrix, Profil | Approved in the owner's 07a browser review (derived: level form, reset-password and temporary-password dialogs, profile page). The no-access page is built in 07c |
| 2026-10-23 | `pattern-show.html`, `file-upload.html`, `downloads.html`, shell | Approved in the combined Phase 06 review (derived: upload area, Downloads page; also the Show tabs, the topbar Unduhan link and badge, and the page header wrapping on phones) |
| 2026-10-23 | `pattern-form.html`, `dialogs.html` | Approved in the owner's 06b browser review (derived: field types, form layout, stale-update dialog) |
| 2026-10-20 | `pattern-index.html`, Trash, 06a dialogs | Approved in the owner's browser review (derived: Trash page, type-the-name confirm, Kolom menu) |
| 2026-10-20 | Phase 06 rows | Source named per screen (Phase 06 plan); Trash row added |
| 2026-10-20 | `tokens.html` | Approved through the shell review |
| 2026-10-20 | `auth.html`, `error-pages.html` | Approved in the owner's browser review (error pages: derived design) |
| 2026-10-20 | Phase 05 rows | Source named per screen; shell and palette approved in the browser review |
| 2026-10-19 | README.md | Source priority (mockups → `reference/` → ui-design.md); `reference/` readable by coding agents; derived screens approved by browser review |
