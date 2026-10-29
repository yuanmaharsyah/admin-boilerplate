# Phase 06 — Shared Components & Core Services

- **Date:** 2026-10-20
- **Roadmap:** [Master Roadmap → Phase 06](./2026-10-16-admin-boilerplate-master-roadmap.md#phase-06--shared-components--core-services)
- **Spec sections:** frontend-behavior §5 (DataTable), §6 (forms), §7 (destructive + Trash), §8.5 (FileUpload), §3 (downloads badge), §9 (component contract); ui-design §3 (page anatomy), §5 (inventory); design spec §5 (`attachments`, `exports`), §7 (ExportManager, Attachments, stale updates, data scope), §9.1 (arch: exports)
- **Status:** approved 2026-10-20 (see Approval); 06a ☑ committed, approved in the browser review (2026-10-20); 06b ☑ committed (review fixes in `54ef8ea`); 06c ☑ built (with the minimal Downloads page, `b431d32`); Phase 06 approved in the combined review (2026-10-23)
- **Design gate:** none of this phase's mockups (`pattern-index`, `pattern-form`, `pattern-show`, `dialogs`, `file-upload`) exist. As in Phase 05, I propose the source order from `docs/design-implementation/README.md` replaces the gate (Q1): every part comes from `reference/` or is **derived** and reviewed in the browser.

## Component sources

`ref/` = `docs/design-implementation/reference/style-reference-01/`. "Derived" = closest reference part + ui-design.md, approved in the owner's browser review.

| Component / screen | Source | Browser review |
|---|---|---|
| `DataTable` (header row, rows, sort `aria-sort`, checkbox column, `⋯` row menu, skeleton rows) | `ref/users-index.dc.html` `DataTable` (+ `index.html` user / level / audit tables) | Yes |
| `DataTableToolbar` (search, filter chips, Reset, Kolom, Download) | `ref/users-index.dc.html` `DataTableToolbar` | Yes |
| Bulk bar ("N dipilih · Hapus · Batalkan pilihan") | `ref/users-index.dc.html` (inside `DataTable`) | Yes |
| `DataTablePagination` (range, per page, page buttons) | `ref/users-index.dc.html` `DataTablePagination` | Yes |
| Column visibility menu ("Kolom" dropdown contents) | **Derived, needs browser review** (the reference shows only the button) | Yes |
| `EmptyState` (no data + create CTA; no results + Reset filter) | `ref/users-index.dc.html` `EmptyState` ×2 | Yes |
| Table error state (inline alert + Coba lagi) | `ref/users-index.dc.html` (`s.isError`) | Yes |
| `StatusBadge` | `ref/users-index.dc.html`, `index.html` `StatusBadge` | Yes |
| `ConfirmDialog` (delete one / N items, focus on Batal) | `ref/users-index.dc.html`, `index.html` `ConfirmDialog` | Yes |
| Undo toast ("Dipindahkan ke Sampah", `Urungkan · 8`) | `ref/users-index.dc.html` / `index.html` `Toast` | Yes |
| **Trash page** (`Core::Trash/Index`: list, restore, permanent delete) | **Derived, needs browser review** (reference `DataTable` + row actions) | Yes |
| Permanent-delete confirm (type the item name) | **Derived, needs browser review** (`ConfirmDialog` + `FormField`) | Yes |
| `FormField` + text `Input` | Already built from `ref/auth.dc.html` (Phase 05) | Done |
| `TextareaField`, `SelectField`, `Combobox`, `RelationSelect`, `DateField` (date + datetime), `NumberField`, `CurrencyField`, `SwitchField` | **Derived, needs browser review** (`Input` / `FormField` from `ref/auth.dc.html`, per-page select and filter chips from `users-index.dc.html`, field list in ui-design §3.2) | Yes |
| Form page layout (form card, section headings, error summary for 6+ fields) | **Derived, needs browser review** (ui-design §3 Create/Edit anatomy, card style from the reference) | Yes |
| `FormFooter` (sticky Batal / Simpan) | `ref/index.html` `FormFooter` (the matrix save bar), adapted to Batal / Simpan | Yes |
| `UnsavedChangesGuard` dialog ("Tetap di sini" / "Tinggalkan") | `ref/index.html` `UnsavedChangesGuard` | Yes |
| `StaleUpdateDialog` ("Muat ulang" / "Salin perubahan saya") | **Derived, needs browser review** (`UnsavedChangesGuard` dialog + copy from ui-design §3.2) | Yes |
| `DetailGrid` + Show tabs (Detail, Lampiran; Riwayat arrives in Phase 07) | `ref/index.html` invoice detail (`DetailGrid`, `role="tablist"`) | Yes |
| `AttachmentList` | `ref/index.html` `AttachmentList` | Yes |
| `FileUpload` (drop zone, accepted types + max size, per-file progress, cancel, per-file errors) | **Derived, needs browser review** (ui-design §3.4, card + list style from `AttachmentList`) | Yes |
| Downloads badge on the topbar | `ref/index.html` (topbar link "Unduhan, N baru") | Yes |

I'll update the Phase 06 rows of the README manifest with these sources in the same change, as was done for Phase 05.

## Why split

About **80 files** (≈ 45 package, ≈ 20 demo module, the rest config/tests/docs) and **about 18 test files**, well over the ~25 / ~15 limit. Proposed split into **vertical slices**, each usable and reviewable on its own in the demo module, each with its own `composer check` and commit:

| Part | Scope | Commit |
|---|---|---|
| **06a: Lists** | `HasDataTable` (query-builder), `visibleTo()` scope, DataTable family, `EmptyState`, `StatusBadge`, `ConfirmDialog`, soft delete + undo toast, Trash (SA), demo module index + delete | `feat(core): phase 06a lists and trash` |
| **06b: Forms + Show** | Form fields, `FormFooter`, `UnsavedChangesGuard`, `PreventsStaleUpdates` + `StaleUpdateDialog`, `RelationSelect` + lookup, `DetailGrid` + tabs, demo create / edit / show | `feat(core): phase 06b forms and show` |
| **06c: Files** | `ExportManager` + `ExportJob` + `exports` table + pruning, `downloads.ready_count` + badge, attachments (trait, routes, signed download), `FileUpload`, `AttachmentList`, Excel arch rule, demo download + attachments | `feat(core): phase 06c exports and attachments` |

Proposed: a quick browser review after 06a (tables set the pattern for every generated module), the full review at the end of 06c.

---

## Part 06a — Lists

| Path | Action | Purpose |
|---|---|---|
| `packages/admin-core/composer.json` (+ skeleton lock) | modify | `spatie/laravel-query-builder` `^7.3.6` (verified in spec §1.1; approved) |
| `src/Testing/ContractAssertions.php` + `tests/Fixtures/Broken` | modify | New contract rule (A3): every model in a module uses `HasVisibilityScope`; negative test against a broken fixture |
| `src/DataTable/HasDataTable.php` | create | Model trait: `scopeDataTable($query, Request)` → `LengthAwarePaginator`. Model declares `dataTableFilters()`, `dataTableSorts()`, `dataTableSearch()` (columns); `search` is a LIKE across them; `per_page` ∈ {10, 25, 50, 100}, default 25, anything else falls back to 25 (cap 100) |
| `src/DataTable/HasVisibilityScope.php` | create | Model trait: `scopeVisibleTo($query, ?Authenticatable)`, no-op by default; models override it for "own unit only" rules (Q3) |
| `src/Data/DataTableStateData.php`, `DataTableFilterData.php`, `OptionData.php` | create | Page prop next to `PaginatedData`: current `search` / `sort` / `filter` / `per_page`, the sortable columns and the filter definitions (key, label, options). The frontend never guesses what the backend allows |
| `src/Trash/TrashController.php`, `src/Trash/TrashRoutes.php`, `src/Data/TrashItemData.php` | create | `Route::trash(Model::class)` macro used in a module's `routes.php`: `trash` (GET), `{id}/restore` (POST), `{id}/force-delete` (DELETE), all with `superadmin`. Restore and force delete write `restored` / `force_deleted` through the existing trait. Item label = `auditLabel()` |
| `src/Data/FlashData.php` | modify | `undo: ?string` (restore URL), set only when the user is SA |
| `src/Testing/ContractAssertions.php` | modify | Trash routes count as protected (`superadmin`); no rule change |
| `resources/js/components/admin/{DataTable,DataTableToolbar,DataTablePagination,EmptyState,StatusBadge,ConfirmDialog}.tsx` | create | Per frontend-behavior §5, §7 and §9 contract |
| `resources/js/hooks/useTableQuery.ts` | create | URL state → `router.get` (`preserveState`, `preserveScroll`, `replace`), 300ms search debounce, page reset on search/filter change, sort cycle, `dt_cols:{slug}` in localStorage (try/catch) |
| `resources/js/components/ui/select.tsx` | create (moved) | shadcn select (the kit's `@radix-ui/react-select` is already installed) for per page and filters |
| `resources/js/components/admin/Toaster.tsx` | modify | `Urungkan · N` action (8s countdown) when `flash.undo` is set |
| `resources/js/pages/Trash/Index.tsx` + `components/admin/ForceDeleteDialog.tsx` | create | `Core::Trash/Index`; permanent delete asks to type the item name |
| `resources/js/lang/{id,en}.ts`, `admin-core.npm.json` | modify | Strings; `@radix-ui/react-select` |
| `skeleton/modules/Invoices/*` | create | Demo module (Q4): `module.php`, model (`HasDataTable`, `HasVisibilityScope`, `SoftDeletes`, `LogsModuleActivity`), migration (indexed filter/sort columns), factory, policy, controller (`index`, `destroy`, bulk destroy), `InvoiceListItemData`, routes (incl. `Route::trash`), `pages/Index.tsx`, tests |

**As built 06a:**
- **Typed lists:** Larastan types a local scope as returning the builder, so `->dataTable()` couldn't return a paginator from a scope. `HasDataTable` instead gives the model its own builder (`DataTableBuilder`, through `newEloquentBuilder()`), whose `dataTable(Request)` returns `LengthAwarePaginator<int, TModel>`; the model `implements DataTableModel` (the four `dataTable*()` methods, defaults from the trait). The call site stays `Model::query()->visibleTo($user)->dataTable($request)` as AGENTS.md §5 says. `Model::dataTableState($request)` builds the `table` prop. `search` / `per_page` parsing lives in `DataTableQuery` (PHP 8.4 deprecates calling static trait members directly).
- **Search** is a LIKE over the declared columns; `%` and `_` typed by the user act as wildcards (harmless: the query is already scoped; escaping needs raw SQL that differs per driver). An undeclared `sort` or `filter[…]` is a 400 (query-builder's exception).
- **Trash routes** are `TrashController::routes(Model::class)`, a plain static call, not a `Route::trash()` macro (a macro isn't typed for Larastan). Restore and permanent delete take `SelectionData` (`ids`, 1–100), so the undo of a bulk delete is one request. Restore / force delete query the trashed rows without the `onlyTrashed()` macro (`Trash::trashedQuery()`), for the same typing reason.
- **Undo toast:** `FlashData` gains `description` (second line: "Invoice INV-001" or "3 item") and `undo` (`UndoData`: href + ids), set only for Super Admin and only when `{slug}.trash.restore` exists.
- **No `ui/select.tsx`:** per page and the filter chips use the existing dropdown menu (radio items), so no new primitive; `@radix-ui/react-select` stays unused by the package.
- **Selection** is stored with the `data` prop it was made on, so any new data (paging, filter, delete) clears it without an effect. Column choice: `dt_cols:{slug}` (try/catch; a column can't hide the last visible one).
- **Demo modules** are `skeleton/modules/Invoice` and `skeleton/modules/Customer` (singular: the contract names files after the module, `Models/{Name}.php`). Customer moved into 06a (index, delete, Trash) because `invoices.customer_id` references it; its lookup route comes in 06b. The `invoices` table already has every column the 06b form needs (date, datetime, enum, currency, decimal, boolean, text, relation, NPWP), so 06b adds no migration. `Modules\Invoice\Database\Seeders\DemoSeeder` (30 customers, 240 invoices) is for the rehearsal database only.
- **Module UI strings** (titles, column labels) are written in Indonesian in the module pages: the translation helper only has core keys, and the specs don't say how a module adds its own (proposal in the 06a report).
- `Checkbox` shows the indeterminate state; `DialogContent` takes `hideClose` (the confirm dialogs have no ×, as in the reference).
- `npm run build` needs PHP 8.4 on the CLI (the Wayfinder Vite plugin runs `php artisan`); troubleshooting row added.

**Tests 06a:** `DataTable<T>` columns are typed (`column.key` must be a key of `T`, checked by `tsc`; shown to fail: `TS2322: Type '"kota"' is not assignable to type 'keyof CustomerListItemData'`); row selection and column visibility each in their own browser test file (A2; `tests/Browser/DataTableSelectionTest.php`, `DataTableColumnsTest.php`, Pest browser plugin, no JS test runner added; both shown to fail with selection kept across pages and with the column choice not stored, then reverted); `HasDataTableTest` (search, filter, sort asc/desc, unknown sort/filter rejected, per_page cap and fallback, query string kept), `HasVisibilityScopeTest` (no-op default, override applied to list), `VisibilityScopeTest` (contract, with its broken fixture), `TrashTest` (non-SA 403 on every trash route, SA list/restore/force delete, audit events, force delete only on trashed rows), `SharedPropsTest` (`flash.undo` only for SA), demo `InvoiceTest` (AGENTS §8 cases 1–4, 6, 7 for index/delete; bulk delete in one `Audit::batch`), browser smoke: index with search + sort in the URL.

## Part 06b — Forms + Show

| Path | Action | Purpose |
|---|---|---|
| `src/Concurrency/PreventsStaleUpdates.php`, `StaleUpdateException.php` | create | Model/controller helper: compares the update Data's `updated_at` with the row (locked in the transaction); mismatch → 409 that Inertia receives as an HTTP exception (no flash, no redirect) |
| `resources/js/components/admin/{TextareaField,SelectField,Combobox,RelationSelect,DateField,NumberField,CurrencyField,SwitchField}.tsx` | create | Controls inside `FormField`; behaviour per frontend-behavior §6. `DateField` = shadcn Calendar (react-day-picker + date-fns `id` locale) in a popover, shows "20 Okt 2026", stores ISO, accepts typed `dd/mm/yyyy` (A5) |
| `resources/js/components/admin/{FormFooter,FormErrorSummary,UnsavedChangesGuard,StaleUpdateDialog,DetailGrid,Tabs}.tsx` | create | Footer, summary for 6+ fields + focus/scroll to first error, guard on Inertia `before` + `beforeunload`, 409 dialog (clipboard JSON of dirty fields), detail grid, small `role="tablist"` tabs (no new dependency) |
| `resources/js/hooks/useAdminForm.ts` | create | Thin wrapper over `useForm`: first-error focus, guard wiring, 409 → dialog. One place, so every generated form behaves the same |
| `resources/js/components/ui/{popover,textarea}.tsx` | create | Combobox / RelationSelect popover (`cmdk` already installed); `@radix-ui/react-popover` needs approval (Q2) |
| `src/Data/LookupItemData.php` | create | `{value, label}` for RelationSelect lookups (20 results) |
| `skeleton/modules/Customers/*` | create | Second, tiny demo module (index + `lookup` route) so `RelationSelect` has a real target (Q4) |
| `skeleton/modules/Invoices/*` | modify | `StoreInvoiceData`, `UpdateInvoiceData` (+ `updated_at`), `InvoiceData`; `create` / `store` / `edit` / `update` / `show`; `components/InvoiceForm.tsx` with every field type; `pages/{Create,Edit,Show}.tsx` |

**As built 06b:**
- **Dependencies:** `@radix-ui/react-popover` 1.3.1 (same line as the installed Radix dialog), `react-day-picker` 9.14.0 and `date-fns` 4.4.0. react-day-picker 10.0 (2026-09-30) exists; shadcn's Calendar targets 9. Spec §1.1 rows added.
- **Field components** each wrap `FormField` and share `FieldProps<V>` + `controlProps()` (id = name, `aria-invalid`, `aria-describedby`, `aria-required`). Added `TextField` (the text input every form needs). `SelectField` is the native select (a short fixed list; keyboard and mobile pickers for free, and the reference uses one for rows per page); `ComboboxField` is the searchable one. `CurrencyField` is `NumberField` with `Rp` and no decimals, in the same file.
- **Dates:** form values carry no timezone (`YYYY-MM-DD`, `YYYY-MM-DD HH:mm`, in the app timezone); `formatLocalDate()` / `formatLocalDateTime()` format them without a browser offset. `DateField` accepts typed `dd/mm/yyyy` (also `-` / `.`, two-digit years); an impossible date reverts to the previous value on blur. `withTime` adds a native time input.
- **Numbers:** `parseNumber()` reads either notation (with both separators the last is the decimal mark; a repeated separator is thousands; a single `,` is decimal; a single `.` followed by exactly three digits is thousands). Checked once with a scratch Node script and permanently by the browser test that pastes `1,250,000`.
- **Stale updates:** `PreventsStaleUpdates` is a model trait, `updateUnlessStale($attributes, $loadedVersion)`: row lock + compare + save in one transaction. _First built on `updated_at` (one-second precision); replaced after the 06b review by `lock_version`, see below._ The 409 reaches the page as an Inertia HTTP exception; `useAdminForm` turns it into `stale` and suppresses Inertia's error page.
- **Guard:** blocks Inertia GET visits to another path and the browser's unload; submits, partial reloads and same-page reloads pass, so "Muat ulang" (a fresh visit to the same URL) needs no bypass. Browser Back (history) isn't intercepted: Inertia restores from history without a `before` event.
- **`ConfirmDialog`** gained an optional item name, a cancel label (or none) and a secondary action, so the guard and the stale dialog reuse it.
- **Tabs not built yet:** the Show page has one panel until 06c adds Lampiran; `Tabs` comes with its second tab.
- **`visibleTo()` helper (answer 3):** `scopeVisibleTo()` is now final in the trait and records the call while `VisibilityScope::record()` runs; models override `applyVisibility()` instead. `ModuleAssertions::assertScopedToUser($model, $method, $uri)` fails when the route never calls `visibleTo()` with the signed-in user (tested both ways). Both demo modules assert it on every route that loads their records.
- **Module dictionaries (answer 1):** `lib/i18n.ts` has a `Dictionaries` interface (core entry built in); each module augments it from `resources/js/lang/id.ts` (`ModuleDictionary<'slug'>` forces the `{slug}.` prefix) and types `en.ts` as `Record<keyof typeof id, string>`. `app.tsx` loads every module's `lang/*.ts` eagerly into `registerMessages()`. Proven by `tsc`: an unknown key (`TS2345 … not assignable to parameter of type 'MessageKey'`), a missing `en` key (`TS2739`) and a key without the prefix (`TS2353`) each fail. Both demo modules' pages now use only dictionary strings.
- **Invoice:** `payment_method` is a PHP enum (`PaymentMethod`) like `status`; `InvoiceFormOptionsData` carries both option lists. `InvoiceData.due_at` is `Y-m-d H:i` (the form's format). Validation field names come from `attributes()` in the Data classes. Customer `lookup`: `permission:customers.view`, name or city, 20 results, live customers only.
- **Relation ids are scoped** (from an automated security review after the 06b commit): `exists:customers,id` let a user link any customer, even one a project's `visibleTo()` rule hides. Core rule `Validation\VisibleRecord(Customer::class)` checks the id through `Customer::query()->visibleTo($user)` (live rows only); the Invoice Data classes use it, a module test proves store and update call it, and recipes R4 / R19 require it.
- **Self-review fixes** (screenshots at 1440 and 375, light and dark): calendar buttons are named per field ("Buka kalender: Tanggal"); the footer's status text no longer pushes the buttons onto a second row on phones.

**Tests 06b** (as built: `PreventsStaleUpdatesTest`, `ModuleAssertionsTest` scope helper, Invoice create / validation / unique number / show / edit / update / 409 / scoped routes, Customer lookup + scoped routes, browser `FormsTest`: create from typed date + pasted number + lookup, error summary + focus, guard stay / leave, stale dialog + reload; guard and stale tests shown to fail with the behaviour removed). Planned: `PreventsStaleUpdatesTest` (fresh `updated_at` saves, stale → 409 and nothing written, missing `updated_at` → validation error), demo `InvoiceTest` additions (create/update validation per required field, 409, create/update audit with masked fields, show 403/200), `CustomerLookupTest` (permission, search, 20 cap, `visibleTo()`), browser smoke: dirty form + navigate → guard dialog.

## Part 06c — Files

| Path | Action | Purpose |
|---|---|---|
| `packages/admin-core/composer.json` (+ skeleton lock) | modify | `maatwebsite/excel` `^4.0.4` (Q2) |
| `database/migrations/*_create_exports_table.php`, `*_create_attachments_table.php` | create | Columns per spec §5; FKs with `onDelete`; indexes (`user_id, status`, `expires_at`, `attachable_type, attachable_id`) |
| `src/Exports/ExportManager.php`, `ExportJob.php`, `Export.php` (model, `Prunable`), `ModuleExport.php` (base class a module export extends) | create | `ExportManager::for($query, Export::class, $request)`: count ≤ threshold → `Excel::download` (xlsx / csv) + `exported` audit; above → `exports` row + `ExportJob` (`#[Tries(3)]`, `#[Backoff]`, `#[Timeout]`, user passed explicitly, `Audit::actingAs`) + flash info "Ekspor diproses, cek Unduhan". Failed job stores the error on the row. 24h expiry; `model:prune` deletes the row and the file |
| `config/admin-core.php` | modify | `exports.threshold` (5000), `exports.disk`, `exports.ttl_hours`; `attachments.disk` (private), `attachments.max_kb`, `attachments.mimes`, `attachments.url_ttl_minutes` (5). Settings overrides the threshold in Phase 07 (Q6) |
| `src/Data/DownloadsData.php`, `Http/Middleware/HandleInertiaRequests.php` | create / modify | Shared `downloads.ready_count` = the user's `ready`, unexpired exports |
| `resources/js/components/admin/{AppRail or Topbar}` + `hooks/useDownloadsPoll.ts` | modify / create | Badge; partial reload of `downloads` every 30s while the tab is visible |
| `src/Attachments/HasAttachments.php`, `Attachment.php`, `AttachmentController.php`, `AttachmentRoutes.php`, `src/Data/AttachmentData.php` | create | `Route::attachments(Model::class)` macro in a module's routes (Q7): upload (`permission:{slug}.edit`), url lookup + download (`permission:{slug}.view`, signed, 5 min), delete (`edit`); policy re-checked on the parent; private disk, sanitized stored name, original name as metadata; `attachment_uploaded` / `_downloaded` / `_deleted` audit |
| `resources/js/components/admin/{FileUpload,AttachmentList}.tsx` | create | Per frontend-behavior §8.5: client mime/size check, 3 parallel uploads with progress and cancel (`XMLHttpRequest`, no dependency), fresh signed URL on click |
| `skeleton/routes/console.php` | modify | `Schedule::command('model:prune', ['--model' => Export::class])->daily()` |
| `tests/ArchTest.php` (package + skeleton) | modify | Class-based rule: `Maatwebsite\Excel\Facades\Excel` used only in `Yuan\AdminCore\Exports`; source scan kept (aliases); break test re-run and recorded here |
| `skeleton/modules/Invoices/*` | modify | `download` action, `Exports/InvoiceExport.php`, `HasAttachments` (`scan` field), Lampiran tab |

**As built 06c:**
- **ExportManager API** is `ExportManager::for({Name}Export::class, $request)`, not `for($query, …)`: only the URL parameters (`search`, `filter`, `sort`, plus `format` xlsx/csv) travel to the queue, so the export class rebuilds the query for the requesting user (`ModuleExport::baseQuery()` + `DataTableBuilder::dataTableQuery()`, the list query without paging). Recipe R5 updated.
- **Download UX without a page reload:** the DataTable's Download button is an Inertia visit with the current search, filters and sort. At or below the threshold the server answers `Inertia::location()` to the same URL, so the browser then fetches the file itself and the page stays; above it, a `QueuedExport` row (`processing`), an `ExportJob` and the flash "Ekspor diproses, cek Unduhan" + "N baris sesuai filter". (A full-page link would have lost the flash: Inertia fires the first page's flash before the toaster subscribes.) One `exported` audit row per file (rows, filters, format; `queued: true` from the job, whose causer is the requesting user).
- **ExportJob:** `#[Tries(3)]`, `#[Backoff([10, 60])]`, `#[Timeout(600)]`; writes to `admin-core.exports.disk` under `exports/{id}/`, sets `ready` + `expires_at` (`ttl_hours`, 24). After the last try the row is `failed` with a plain message; the exception stays in `failed_jobs` and the logs (it may hold SQL or paths, so it is never shown to the user).
- **Expiry:** `QueuedExport` is `Prunable`; the skeleton schedules `model:prune --model=QueuedExport` daily, which deletes the file and the row. There is no `expired` status yet: the Downloads page (Phase 07) decides whether expired rows stay visible.
- **Badge:** `DownloadsData::ready_count` (the user's `ready`, unexpired exports) as the shared `downloads` prop; `DownloadsLink` in the topbar polls `only: ['downloads']` every 30s, paused while the tab is hidden (`usePoll`). Until Phase 07 adds the Downloads page (`ShellLinks.downloads`), it shows only when something is ready and isn't a link.
- **Attachments:** `AttachmentController::routes(Model::class)` (store `{record}/attachments`, `attachments/{id}/url` (JSON, signed 5-minute URL), `attachments/{id}/download` (`signed`), delete); permissions from the module (`view` / `edit`, both required at boot), the record always through `visibleTo()`, then its `view` / `update` policy; an attachment of another model is a 404. Stored as `attachments/{slug}/{Y}/{m}/{uuid}.{ext}` on the private disk; the client's name is kept as metadata only (path and control characters removed, 200 characters). Upload / download / delete write `attachment_uploaded` / `_downloaded` / `_deleted` on the record. `UploadAttachmentData` validates against the model's `attachmentRules()` (`mimes` checks the content).
- **FileUpload:** client checks (extension, size), at most 3 uploads at once over `XMLHttpRequest` (progress, abort, `X-XSRF-TOKEN`), the server's 422 message per file, a partial reload of `attachments` after each upload. The list is kept in a ref as well, so uploads never start inside a state updater (StrictMode runs those twice). Progress uses the native `<progress>` element (no inline styles).
- **Tabs** arrive with their second tab: Show = Detail | Lampiran (n).
- **Arch rule:** class-based `expect('Maatwebsite\\Excel\\Facades\\Excel')->toOnlyBeUsedIn('Yuan\\AdminCore\\Exports')` in the package and the skeleton; the source scan stays and now also matches `Excel::store|queue|raw` (exceptions: `ExportManager.php`, `ExportJob.php`; in the skeleton, module `Tests/` folders, which use `Excel::fake()`). Break test recorded below.
- **Formula injection** (automated security review after the 06c commit): a customer name like `=HYPERLINK(…)` would run as a formula in Excel. `ModuleExport::map()` is now final and prefixes every text cell starting with `=`, `+`, `-`, `@`, tab or carriage return with `'`; modules implement `row()`. Module test with a hostile customer name and number.
- **Self-review fix:** `PageHeader`'s title is `flex-auto`, so at 375px the actions wrap under a long title instead of breaking it mid-word.

**Break tests 06c:** a core class (`src/Trash/BreakExcel.php`) and a module controller importing `Maatwebsite\Excel\Facades\Excel as Sheets` → both the class rule and the scan fail in both suites; a module controller calling the `\Excel::download()` alias → both fail in the skeleton; reverted, 11 / 13 arch tests green. The Inertia-location test fails with the location branch removed. The browser download test checks the page stays and no toast appears; headless Chromium re-requests a download it does not accept, so the exact-once audit is pinned by the HTTP test instead.

**Tests 06c** (as built: package `QueuedExportTest` (badge count, prune with files, plain failure message), `AttachmentRoutesTest`, arch; module `InvoiceDownloadTest` (guest / 403, filtered stream + audit, Inertia location, queue + flash, job writes the file with the user as causer and the badge counts it, scoped), `InvoiceAttachmentsTest` (guest / 403, private random path + cleaned name + audit, wrong type / too big, signed download + audit, unsigned / tampered / expired 403, signed URL refused without `view`, other model 404, delete + audit, Show prop with and without `edit`, scoped); browser `FilesTest` (upload, client-side type check, delete; small download stays on the page; queued download shows the toast and badge)). Planned: `ExportManagerTest` (under threshold returns a file + `exported` audit with filters and row count; above queues the job and the row; job writes the file with the requesting user as causer; failure stores the error; the filtered query is respected), `ExportPruneTest` (expired rows and files removed), `AttachmentTest` (mime/size rejected, stored on the private disk, expired signed URL → 403, user without parent `view` → 403, delete needs `edit`, three audit events), `SharedPropsTest` (`downloads.ready_count`), demo `InvoiceTest` (AGENTS §8 case 5), arch break test, browser smoke: upload a file and download it.

---

## Acceptance (roadmap)

- [ ] The demo module uses every component listed above.
- [ ] A concurrent edit triggers the stale dialog (test + browser).
- [ ] An export above the threshold is queued and shows in Downloads (Q8).
- [ ] An expired or unauthorized attachment URL fails.
- [ ] Every derived screen approved in the owner's browser review (light, dark, 1440px, 375px, keyboard only).
- [ ] `composer check` green; `migrate:fresh --seed` and `migrate:rollback` succeed (rehearsal database).

## Open questions

**Q1. Design gate.** No Phase 06 mockup exists. **Recommended:** same as Phase 05: source order replaces the gate; the table above lists every part; derived parts are approved in the browser review. Alternative: wait for the UI model's `pattern-*` mockups.

**Q2. Dependencies.** Need approval:
- Composer (package): `spatie/laravel-query-builder ^7.3.6`, `maatwebsite/excel ^4.0.4` (both verified in spec §1.1).
- npm: `@radix-ui/react-popover` (Combobox / RelationSelect).
- **Not adding `@tanstack/react-table`** (listed in spec §1): sorting, filtering and paging are all server-side, so it would only render rows. **Recommended:** drop it from spec §1 and §1.1. Alternative: add it anyway.

**Q3. `visibleTo()` shape.** Roadmap says "scope macro/trait". **Recommended:** a trait with a no-op local scope (typed, visible to Larastan, overridable per model). A global Builder macro can't be overridden per model.

**Q4. Demo modules in the skeleton.** Acceptance needs a demo module; `RelationSelect` needs a second one. **Recommended:** `Invoices` + `Customers` in `skeleton/modules`, kept until Phase 08, where the generator's output must match them and they are replaced by a generated example (or removed at Phase 10). Their migrations run on the dev DB only with your OK; review data goes into the rehearsal DB. Alternative: put them under `packages/admin-core/tests/Fixtures` (no browser review possible).

**Q5. Date fields.** **Recommended:** native `<input type="date">` / `datetime-local` (locale display comes from the browser; stored value ISO). Alternative: a calendar popover (`react-day-picker`, new dependency) to show id-ID format exactly as frontend-behavior §6 says ("display uses id-ID").

**Q6. Export threshold before Settings.** **Recommended:** `admin-core.exports.threshold` (default 5000) now; Settings overrides it in Phase 07, like the maintenance banner.

**Q7. Attachment and trash routes vs the route contract.** Every `/admin` route needs `permission:*` or `superadmin`. **Recommended:** both are registered per module by route macros (`Route::trash()`, `Route::attachments()`), so they get `superadmin` / `permission:{slug}.{view|edit}` and the contract stays unchanged. Alternative: one global `/admin/trash` page across all modules (needs a contract exception and a new SA module).

**Q8. "Shows in Downloads".** The Downloads page is Phase 07. **Recommended:** in 06 the acceptance is the `exports` row (status `ready`, file on disk) and the topbar badge count; the Downloads page and its file route come in Phase 07. Alternative: pull a minimal Downloads page into 06c.

**Q9. Audit of exports and attachments.** Roadmap Phase 07 lists "ExportManager: `exported`; Attachments: `attachment_*`", but AGENTS §8 case 5 requires the download audit as soon as downloads exist. **Recommended:** write these events in 06c (the services are built here); Phase 07 keeps only the Users / Settings wiring. Roadmap line updated accordingly.

**Q10. Split.** Approve 06a / 06b / 06c, three commits, roadmap row split, a quick browser review after 06a?

---

## Approval (2026-10-20)

Approved with the split 06a / 06b / 06c. **Stop for a browser review after 06a and after 06b** (forms are mostly derived); full review after 06c.

1. Source order replaces the missing mockups; derived parts need the owner's browser review.
2. Approved: `spatie/laravel-query-builder`, `maatwebsite/excel`, `@radix-ui/react-popover`. `@tanstack/react-table` dropped; spec §1 updated (D20). `DataTable<T>` has typed column definitions; row selection and column visibility each get their own tests.
3. Trait approved, plus a contract test that every module model uses it.
4. `Invoices` + `Customers` demo modules approved. **Ask before running their migrations on the dev DB.** Phase 10 roadmap gains `admin:remove-demo` (or a setup step), covered by the release rehearsal (done).
5. Calendar picker, not native inputs: shadcn Calendar with `react-day-picker` + `date-fns` (`id` locale) approved; shows "20 Okt 2026", stores ISO, accepts typed `dd/mm/yyyy`.
6. Q6–Q9 approved as proposed (roadmap Phase 07 audit line updated for Q9).

## 06a report answers (2026-10-20)

1. Module UI strings: each module ships `id` / `en` dictionaries under a `{slug}.` namespace, merged into `t()`, with the same tsc key check (`en` must match `id`). Built in 06b; the demo modules' hard-coded strings move into it (the pattern for the Phase 08 generator).
2. Toasts are 400px wide, as in the reference (done before the 06a review).
3. The `visibleTo()` assertion helper is built in 06b.

## 06a browser review (2026-10-20)

Approved, including the derived screens (Trash page, type-the-name confirm, Kolom menu). Fixed during the review:
- Red dropdown items (row menu "Hapus") used `text-destructive-foreground` (the colour for text on a red background) since the Phase 05 restyle, so they were invisible in both themes; now `text-destructive`. Guarded by `tests/Browser/DataTableRowMenuTest.php` (light + dark, shown to fail with the old class).
- Toasts are 400px wide (answer 2).
- `skeleton/.gitignore` ignores `.env.rehearsal` (review database credentials).

## 06b review fixes (2026-10-20)

Commit `fix(forms): version-based conflict check and visible number parsing`:
1. **`lock_version`** replaces the `updated_at` comparison. Unsigned int, default 0 (demo `invoices` table and the package's demo fixture; Customer has no edit, so no column). The trait's `updating` hook raises it by one in the same UPDATE on every update of the model, whatever the code path; `updateUnlessStale($attributes, $loadedVersion)` compares it under a row lock and writes `loaded + 1` with the save. `Update{Name}Data` and `InvoiceData` carry `lock_version` instead of `updated_at`; the model sets `$attributes = ['lock_version' => 0]` so a fresh instance knows its version. Tests: package (every path raises it; same-second second save → `StaleUpdateException`, nothing written) and module (two PUTs in the same frozen second → the second is 409, the first kept). Spec §7 (+ the module tree), frontend-behavior §6, AGENTS §5, DEVELOPER R19 and the Phase 08 stub line updated.
2. **Visible number parsing:** on blur NumberField re-parses its text and shows the result in id-ID. `parseNumber(text, decimalDot)`: in a decimal field a lone `.` is the decimal mark (`0.125` → 0,125, `12.5` → 12,5); in a Rupiah field it stays a thousands mark (`1.250` → 1.250); decimals beyond the field's precision are rounded and shown (`1.250.000,75` in Rupiah → 1.250.001). The demo's PPN field allows 3 decimals (`tax_rate` decimal(6,3)) so `0.125` keeps its value. Browser tests: one row per case, plus the create test stores `tax_rate` 0.125; with the old single-`.` rule both fail (`0.125` became 125).

Changing the two demo migrations (not released) needs a fresh rehearsal database before the review.

## 06b browser review (2026-10-23)

Approved, including the derived form screens (field types, form layout and error summary, stale-update dialog). Both review fixes are in `54ef8ea` (lock_version: same-second saves → 409; number fields re-display on blur, `0.125` stays 0,125 in decimal fields). The export formula-injection fix (`c8ea395`) was accepted.

## Full-review preparation (2026-10-23)

- The export threshold is `admin-core.exports.queue_threshold`, read from `ADMIN_EXPORT_QUEUE_THRESHOLD` (default 5000, in `.env.example`); Settings overrides it in Phase 07. The rehearsal env sets 100 so the queued path can be reviewed with the demo data.
- One `exported` audit row per real export: `ExportManager` answers a HEAD request or a browser prefetch (`Sec-Purpose: prefetch`, also `prefetch;prerender`, or `Purpose: prefetch`) with an empty 204 before counting, queueing or auditing anything. Module tests: HEAD and three prefetch variants, each at a streaming and a queueing threshold, leave no audit row, no `exports` row and no job (shown to fail with the early return removed); a plain GET writes exactly one row.

## Downloads page moved into 06c (2026-10-23)

The review showed a dead end: a queued export finished, the badge counted it, and nothing let the user collect it (Q8 had left the page for Phase 07). Owner chose option 1: a minimal Downloads page now.

- **Routes** outside `/admin` (per-user, no permission, like `/account/password`), registered by the skeleton with `DownloadsController::routes()` inside its signed-in group: `account.downloads.index` (`/account/downloads`), `.url` (JSON, signed 5-minute URL) and `.file` (`signed`). Every lookup is scoped to the user's own exports, so another user's export is a 404 on the page, the URL and a validly signed file link. Not ready, expired, or file gone: 410.
- **Statuses:** processing, ready, failed (with its plain message), expired (display only: a ready export past `expires_at`, until `model:prune` removes it and its file). Rows without a file show no file name.
- **No second audit row:** the export was audited as `exported` when it was written; fetching the file adds nothing.
- **Badge:** `ShellLinks.downloads` from the skeleton's layout wrapper makes the topbar icon a link; it still counts only the user's ready, unexpired exports.
- **Page** (derived: the DataTable rows in a card): file (module + name), rows, status badge, created, available until, download button for ready files; reloads `downloads_list` and `downloads` every 5 seconds only while one is processing and the tab is visible. On phones the table scrolls inside its card, like the DataTable.
- **Tests** (`skeleton/tests/Feature/Account/DownloadsTest.php`): guest redirect; own exports only with each status and the failure message; ready file downloads with no `exported` row; another user's export 404 on the URL and on a validly signed link (shown to fail with the ownership scope removed); expired export 410 even through a link signed before expiry; expired / tampered / unsigned link 403; `model:prune` deletes expired rows and files and is scheduled; badge counts only ready, unexpired exports of the user. Browser `FilesTest`: the badge after a queued export links to the page, which lists the ready file.

## Combined Phase 06 review (2026-10-23)

Approved, including the derived upload area and Downloads page, the Show tabs, the topbar Unduhan link and badge, and the page header wrapping on phones. A real Chrome download writes exactly one `exported` row, and the Downloads page refreshes while an export is processing. AGENTS.md now runs `admin:docs` "once it exists" (Post-v1).
