# Admin Boilerplate — Frontend Behavior Spec

- **Status:** Approved v1
- **Date:** 2026-10-16
- **Audience:** coding agents.
- **Visuals:** come from `docs/design-implementation/*.html` (see its README). This file defines **behaviour and logic only**. If a mockup and this file disagree on behaviour, this file wins; report the conflict.

---

## 1. Converting Mockups to Code

1. Find the screen's source in `docs/design-implementation/README.md`, in priority order: an `✅ approved` mockup, else the owner's design source in `reference/`, else `docs/specs/*-ui-design.md`. A screen with no design file is **derived** from the closest existing design plus ui-design.md, listed as derived in the phase plan, and approved by the owner in a browser review at the end of the phase. This spec still wins on behaviour.
2. Map each `data-component="X"` to the existing `@admin-core` component X. Create a new component only if X doesn't exist, and add it to the core package (§9).
3. Map colors to the theme tokens in `resources/css/app.css`. Never copy a hex value or a `bg-[var(--…)]` arbitrary value into a component; use `bg-card`, `text-muted-foreground`, etc.
4. Tailwind layout and spacing classes from the mockup may be reused as they are.
5. `data-can="x.y"` becomes `<Can permission="x.y">` or `can('x.y')`.
6. Every state shown in the mockup must be reachable in code (loading, empty, error, dialogs). The mockup's demo JS is ignored.
7. Sample data never goes into code; props come from Data objects.

## 2. Global

| Item | Behaviour |
|---|---|
| Shared props | `auth` (user, level, is_super_admin, permissions), `menu`, `app`, `downloads.ready_count`, all typed from `generated.d.ts`. `auth.level` / `auth.permissions` arrive in Phase 03, `downloads` in Phase 06/07, `app.maintenance_banner` in Phase 07 |
| Permissions | `usePermission()` → `can(p)`, `canAny(ps)`, `isSuperAdmin`. Permission-gated UI is **hidden**, not disabled. The backend always re-checks |
| Theme | Light/dark/system from a cookie, applied before first paint |
| Formatting | Only `lib/format.ts`: `formatDate`, `formatDateTime`, `formatNumber`, `formatCurrency` (IDR), locale `id-ID`, timezone from `app` props |
| i18n | All user strings through the translation helper; default `id`, fallback `en` |
| Flash | Inertia native flash (`router.on('flash')`, typed `FlashData`), not a prop, never replayed on back navigation: `success` → toast 4s; `error` → persistent toast; `info` → toast 6s |
| Revoked session | If the account was deactivated, or its level or password changed, after this session signed in, the next request signs the user out and lands on login with the persistent error toast "Sesi Anda telah berakhir. Silakan masuk kembali." The UI does nothing special; the server decides |
| Action buttons | Every button that sends a request to the server (form submit, confirm dialogs, bulk delete, download, matrix save, reset password, activate, restore, auth forms, signed-URL fetches) shows `loading` while the request runs: a spinner before the label, disabled, `aria-busy`. A second click or Enter while it runs is ignored (`useAction`, `useAdminForm`), so an action is never sent twice. A confirm dialog stays open and can't be dismissed until its request ends. File uploads are the exception: each file shows its own progress and can be cancelled (§8.5) (2026-10-23) |
| Navigation | Inertia links via Wayfinder helpers only; no hardcoded URLs |
| Errors | 403/404/419/500/503 render the error pages; 419 offers a reload; network errors on Inertia visits show an error toast with retry |

## 3. Shell

- **Structure:** a rail of **groups** (56px, always visible on ≥1024px) and an item panel (220px) showing the active group's items.
- **Menu data:** rendered only from the `menu` prop (`MenuGroupData[]`: key, label, icon, items). Groups and items arrive already filtered by permission and ordered server-side, and a group with no permitted items is never sent.
- **Active group & item:**
  - Derived from the current route: the item whose slug matches the route name prefix `{slug}.`, and that item's group.
  - Active item gets `aria-current="page"`; active group gets `aria-current="true"` plus the highlight style.
- **Clicking a group icon:**
  - **Panel open:** the panel switches to that group's items without navigating.
  - **Panel collapsed:** the panel opens as an overlay over the content, and closes on navigation, `Esc` or an outside click.
  - **Group with one item (and Beranda):** clicking it navigates directly.
- **Viewed group vs active group:** the viewed group (the panel's contents) may differ from the active route's group until navigation. On navigation, the panel resets to the active route's group.
- **Collapse:** `Ctrl+B` or the `»` button collapses or expands the panel (never the rail). The state is kept in the cookie `admin_panel` and read server-side so the first paint is correct.
- **Below 1024px:** rail and panel are hidden. The topbar hamburger opens both together in a sheet, which closes on navigation.
- **Rail overflow:** more than 8 groups make the group list scroll vertically, while the logo and the bottom controls stay fixed.
- **Breadcrumbs:** come from the `breadcrumbs` page prop (a Data array); there is no client-side derivation.
- **Downloads badge:** shows `downloads.ready_count`. It refreshes on each Inertia visit and every 30s with a partial reload of `downloads` only while the tab is visible.
- **Site access banner:** shown when `app.site_access` is non-null (Akses Situs mode isn't `open`): the mode and its message, with a link to Settings → Akses Situs for Super Admin.

## 4. Command Palette

- **Open:** `Ctrl/Cmd+K` or the trigger. Close with `Esc`, on navigation, or on an outside click.
- **Sources:**
  1. Navigasi: flattened `menu`.
  2. Aksi: modules where `can('{slug}.create')` → `{slug}.create` route.
  3. Terakhir dibuka: the last 5 visited admin pages (title + URL).
     - Stored in localStorage key `admin_recent`, wrapped in try/catch.
     - Entries are removed if no longer in `menu`.
- **Search:** fuzzy on label + group; arrow keys and Enter.
- **Empty:** "Tidak ada hasil".

## 5. DataTable

- **State lives in the URL query:** `search`, `filter[key]`, `sort` (`col` or `-col`), `page`, `per_page` (10/25/50/100, default 25).
  - Each change triggers an Inertia `router.get` with `preserveState`, `preserveScroll` and `replace`.
- **Search:** debounced 300ms; changing the search or a filter resets `page` to 1.
- **Sorting:** a click cycles asc → desc → none. Only columns the backend marks sortable can be sorted.
- **Column visibility:** stored per table in localStorage `dt_cols:{slug}`, wrapped in try/catch.
- **Row actions:**
  - Lihat, Edit and Hapus appear only when permitted.
  - Clicking a row opens Show if `view` is allowed, but not when the click was on a checkbox, a link or the action menu.
- **Bulk:** the checkbox column appears only if `can(delete)`. Selection is page-scoped and cleared on page change. The bulk delete confirm lists the count.
- **Download:**
  - Only shown if `can(download)`. It sends the current query params.
  - The backend answers either with a file (the browser downloads it) or with a flash `info` saying "Ekspor diproses, cek Unduhan".
- **States:**
  - Loading: skeleton rows during the visit.
  - Empty (no filters): `EmptyState` with a create action if permitted.
  - Empty (with filters): "Tidak ada hasil" + "Reset filter".
  - Error: inline alert + retry.

## 6. Forms

- Inertia `useForm`, initialised from the edit Data object; errors are mapped to `FormField` by key.
- **Submit:**
  - The button is disabled while `processing`.
  - On a validation error, focus and scroll to the first invalid field. Forms with 6+ fields also show an error summary at the top.
  - Enter submits, except inside a textarea or an open combobox.
- **Unsaved changes:** `UnsavedChangesGuard` is active when `isDirty`. It intercepts Inertia navigation and `beforeunload`, and is disabled after a successful submit.
- **Stale update:** the update Data includes the `lock_version` the form loaded (spec §7).
  - On a 409, open `StaleUpdateDialog` with two choices:
    - **Muat ulang:** reload the page props and discard changes.
    - **Salin perubahan saya:** copy the dirty fields as JSON text to the clipboard, then reload.
- **RelationSelect:** async search against the target module's lookup route (Wayfinder), debounced 300ms, 20 results. The selected value shows its label from the edit Data.
- **Number and currency fields:** display uses id-ID formatting, while the stored value is a plain number. Paste is tolerant of `.` and `,`.
- **Dates:** the stored value is ISO `YYYY-MM-DD`; display uses id-ID.

## 7. Destructive Actions & Trash

- Every delete goes through `ConfirmDialog` naming the item (or "N item"). The default focus is Cancel.
- A successful soft delete shows the toast "Dipindahkan ke Sampah". The `Urungkan` action (8s) appears only for Super Admin and calls the restore route.
- The Trash view is SA only: restore, plus permanent delete with a second confirm that requires typing the item name.

## 8. Specific Screens

### 8.1 Users
- The level select options come from the server, already excluding the protected level for non-SA users.
- Reset Password, Nonaktifkan and Hapus are hidden on your own row and on your own Show page.

### 8.2 Permission Matrix
- Built from the `matrix` prop: modules grouped, each with `actions` (declared) and `granted` (current).
- A cell is a checkbox only for declared actions; otherwise it shows `—`.
- **Dependency rule (UI side):**
  - Ticking any non-view action ticks View, and a tooltip explains why.
  - Unticking View unticks the whole row.
  - The server enforces the same rule.
- **Toggles:**
  - Row toggle: all declared actions in the row.
  - Column toggle: that action across every module that declares it, applying the dependency rule.
  - A toggle shows the indeterminate state when partly ticked.
- **Dirty tracking:** compared with the initial `granted`; changed cells are highlighted and the sticky bar shows "N perubahan belum disimpan" with Batalkan (reset) and Simpan.
- **Simpan:** one PUT with the full granted set. On success, show a toast and reset the dirty state. `UnsavedChangesGuard` is active while dirty.
- **Search:** filters rows client-side by module label.

### 8.3 Audit Log
- **One filter state for the whole page.**
  - URL params: `range` (`7d`, `30d` default, `90d`, `custom` + `from`/`to`), `filter[user]`, `filter[module]`, `filter[event]`, `search`, `page`.
  - The `FilterBar` (range, user, module) drives both the summary and the list. `event` and `search` filter only the list.
- **Props and loading:**
  - Props: `summary: AuditSummaryData` (flat: the KPI and stat-stack figures `total`, `active_users`, `failed_logins`, `downloads`, `rows_downloaded`, `permission_changes`, `logins`; then `by_type[]`, `by_day[]` with `bucket` = `day`|`week`, and the resolved `from` / `to`) and `events: PaginatedData<ActivityListItemData>`.
  - Changing page or list-only filters partial-reloads `events` only. Changing the range, user or module reloads both.
  - `summary` is a **deferred prop**: the list renders first and the summary shows skeletons until it arrives.
- **Range limit:**
  - A custom range is capped at **366 days**. The date picker blocks longer ranges, and the server rejects them with a validation error.
  - Ranges over 60 days are bucketed by week, server-side.
- **Charts:**
  - Clicking a segment in "Aktivitas per Jenis" sets `filter[event]` for the list.
  - Clicking a day bar sets a custom range for that single day.
  - Both actions scroll to the list.
- **Drawer:** a row click opens the `DiffTable` drawer with long JSON values collapsible. Its URL state `?event_id=` makes the open drawer shareable, and `Esc` closes it.
- **Download** exports the list using the current filters, through `ExportManager` as usual.
- **Visibility rule:** non-Super Admin users never see events caused by or about Super Admin accounts, in both the list and the summary counts. The server applies this; the UI does nothing special.

### 8.3a Riwayat tab (per-record history)
- Shown on Show pages only when `can('{slug}.view') && can('audit-log.view')`.
- Lazy: the tab's data is an optional prop (`Inertia::optional()`), never sent on the first page load. Opening the tab for the first time calls `router.reload({ only: [...] })` for that prop and shows a skeleton until it arrives.
- Each row: event badge, user, time, and a one-line summary ("Mengubah 3 field"). Clicking it expands an inline `DiffTable`.
- Rows from the same `batch_uuid` show "bagian dari N perubahan" and link to the Audit Log filtered by that batch.

### 8.4 Downloads
- Statuses: `processing`, `ready`, `failed` (with the error message), `expired`.
- While any item is processing, poll with a partial reload every 5s, and stop when none remain.

### 8.5 Files (named attachment slots)
- A record's files live in named slots declared by its model (single or multiple, optionally required, own types and size limit).
- Forms show one `FileField` per slot: type and size are checked on the client before the form is sent; picked files can be removed; the slot's current files are listed with download and delete. The files go with the form (one request, the form's progress); a new file in a single slot replaces the current one. Server errors show under the slot.
- The Show page's Lampiran tab lists the files grouped by slot.
- Downloads open the signed URL from `AttachmentData.download_url` (it expires, so it is fetched fresh on click via a lookup route).

### 8.6 Beranda (Dashboard)
- **Props:**
  - `dashboard: DashboardPageData`: `widgets: WidgetMetaData[]` (key, prop, label, type, size, tall, uses_range, href, empty), already permission-filtered and ordered, and the `range`.
  - One deferred prop per widget, `widget_{key}` with `.` and `-` as `_` (`WidgetMetaData.prop`), holding the type's Data object. Each is its own deferred group with `rescue: true` (spec §7.2).
- **Grid:** 12 columns on ≥1280px; `sm` → 6 columns and `md`/`lg` → 12 between 768 and 1279px; everything full width below 768px. `tall` spans 2 rows only on ≥1280px.
- **Range:**
  - The URL param `range` (`7d`, `30d` default, `90d`) is set from the page header.
  - Changing it reloads only the widgets with `uses_range = true`.
  - Widgets that ignore the range show no range label.
- **States per card:**
  - Skeleton (the `<Deferred>` `fallback`) until its deferred prop arrives.
  - Failed (the `<Deferred>` `rescue` slot, shown when the server rescued that prop) → "Gagal memuat" + "Coba lagi" (`router.reload({ only: ['widget_{key}'] })`).
  - An empty dataset → the widget's own empty text.
- **Links:** a card title with `href` links to the module ("Lihat semua ›"). Chart segments and bars link to the module index with the matching filter when the widget provides one.
- **Empty page** (no widgets): an `EmptyState` listing the user's first 6 permitted menu items as links.
- **Rendering:** `WidgetGrid` maps `type` → `StatTile` / `StatStack` / `SegmentBar` / `BarChartCard` / `WidgetTable`. No module ships its own widget component in v1.

## 9. Component Contract

| Component | Key props |
|---|---|
| `Button` | shadcn props + `loading?` (spinner, disabled, `aria-busy`; §2 Action buttons) |
| `useAction()` | `{ pending, run(start: (done) => void) }`: one server action at a time; `pending` drives `loading` |
| `AdminLayout` | `children`, uses shared props |
| `PageHeader` | `title`, `description?`, `actions?`, `backHref?` |
| `DataTable<T>` | `data: PaginatedData<T>`, `columns`, `filters?`, `slug`, `rowHref?`, `bulkDelete?(ids, onFinish)`, `download?` (both buttons show `loading`) |
| `FormField` | `name`, `label`, `required?`, `help?`, `error?`, `children` |
| `RelationSelect` | `name`, `lookupRoute`, `value`, `valueLabel?`, `onChange` |
| `ConfirmDialog` | `open`, `title`, `itemName`, `confirmLabel?`, `onConfirm`, `destructive?`, `confirmDisabled?`, `loading?` (confirm spins; the dialog can't be dismissed) |
| `StaleUpdateDialog` | `open`, `dirtyData`, `onReload(onFinish)` |
| `UnsavedChangesGuard` | `when: boolean` |
| `FileField` | `name`, `slot: AttachmentSlotData`, `value: File[]`, `onChange`, `error?`; `AttachmentFields` renders every slot of a form (`slots`, `value`, `onChange`, `errors`) |
| `AttachmentSlots` | `slots: AttachmentSlotData[]` (the Show page's Lampiran tab) |
| `PermissionMatrix` | `matrix: MatrixData`, `processing` (Simpan shows `loading`), `onSave` |
| `Can` | `permission` or `any` |
| `EmptyState` | `title`, `description?`, `action?` |
| `StatTile` | `icon` (component or lucide name), `label`, `value: number`, `format?: 'number'\|'currency'`, `badge?` |
| `StatStack` | `items: {label, value, format?}[]`, `children?` (footer chart) |
| `SegmentBar` | `segments: {key, label, value}[]`, `onSelect?(key)`, `action?` (beside the title) (colors from `--chart-1…5` in order) |
| `BarChartCard` | `title`, `data: {x, y}[]`, `xFormat`, `tooltip(x, y)`, `onSelect?(x)` |
| `FilterBar` | `fields`, `value`, `onChange` (writes URL state) |
| `WidgetGrid` | `widgets: WidgetMetaData[]`; each card is wrapped in `<Deferred data={widget.prop}>` (`widget_{key}`, `.` and `-` as `_`) with `fallback` and `rescue`, and reads its data from the page props |
| `WidgetTable` | `columns`, `rows` (≤ 5), `href?` |
| `ImageField` | `name`, `label`, `value: File \| null`, `onChange`, `current` (stored image URL), `accept` (extensions) |
| `ActivityHistory` | `subjectType`, `subjectId` (lazy loads the Riwayat tab) |

Charts are built with shadcn `chart` (Recharts), read colors only from `--chart-*` tokens, respect `prefers-reduced-motion` (no animation), and include a visually hidden data table for screen readers.

A new generic component goes into `@admin-core/components/admin`, with an entry here and a line in DEVELOPER.md §5.
