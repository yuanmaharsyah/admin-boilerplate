# Restyle 02 — Dashboard widgets, nested menu with badges, component showcase

**Status:** ✅ done; approved in the owner's browser review 2026-11-08
**Follows:** `2026-11-08-restyle-shell-beranda.md` (restyle 01, waiting for the owner's browser review)
**Visual target:** the shadcnspace dashboard demo, as in restyle 01: measured values and layout only, no code, illustrations or content.

The owner asked for four things (2026-11-08):
1. Beranda like the demo's Analytics dashboard.
2. An example menu parent with children, and the "New" badge.
3. A rule in AGENTS.md and DEVELOPER.md: every new component follows the shadcnspace-inspired style.
4. A menu that shows every component, so future work copies ours.

Items 1 and 2 change the widget API (spec §7.2) and the module contract (spec §3.1). Both need approval (AGENTS.md §2) and are proposed here.

---

## Part A — Nested menu items and badges (module contract change)

### Proposed `module.php` keys (both optional, spec §3.1)

```php
'badge'   => 'Baru',                 // short text pill next to the menu item; null = none
'submenu' => [                       // children under the module's menu item
    ['label' => 'Daftar', 'route' => 'index'],                        // route name relative to the module ({slug}.index)
    ['label' => 'Tambah', 'route' => 'create', 'action' => 'create', 'badge' => 'Baru'],
],
```

- `route` must be a route of this module. `action` (default `view`) must be one of the module's actions; the child is shown only with `{slug}.{action}`.
- `badge` is static text up to 12 characters (translation key allowed). Live counts (e.g. "3 belum dibayar") are out of scope; see Q3.
- `ModuleDefinition` validates both keys at boot with the same descriptive errors as today. A contract test and its break test go against `tests/Fixtures/Broken`.

### Data and rendering
- `MenuItemData` gains `badge: ?string` and `children: list<MenuChildData>` (`label`, `href`, `route`, `badge`), already filtered by permission in `MenuBuilder`. Regenerate `generated.d.ts`.
- `AppSidebar`:
  - **Item with children:** a disclosure button with the icon, label, badge and a rotating chevron. Its children are indented under a 1px left guide line, in the demo style. The height animates open and closed (200ms).
  - **Open state:** the parent of the current route starts open, and its active child is highlighted. Other parents open and close on click.
  - **Collapsed sidebar:** the parent icon opens a dropdown to its right listing the children.
- New `components/ui/badge.tsx` (shadcn Badge, round, variants `default`, `secondary`, `outline`, `success`, `destructive`). It is used by the sidebar, `StatusBadge` and the change pills in Part B.
- The command palette lists the children too (e.g. "Invoice › Tambah").

### Example
The demo `Invoice` module gets `submenu` with Daftar, Tambah (`create`) and Sampah (Super Admin only), and the badge "Baru" on Tambah. `admin:remove-demo` already removes the module.

---

## Part B — Beranda in the demo layout (widget API change)

### Widget API changes (spec §7.2)
| Change | Data | Renders as |
|---|---|---|
| `stat` gains `change: ?float` (percent vs the previous period of the same length) and `caption: ?string` | `StatWidgetData` | KPI tile with a green or red change pill ("+18%"), like Weekly Sales |
| `bar_chart` gains an optional second series `negative` and up to three `summary` figures | `BarChartWidgetData` | Revenue Updates: ink bars above zero, grey below, with a side panel of figures |
| new `area_chart`: headline figure, change, points | `AreaChartWidgetData` | Monthly earnings: soft gradient area with no axes |
| new `donut`: up to 5 segments, headline figure, change | `DonutWidgetData` | Yearly Backup: ring and legend dots, chart colours |
| new `list`: up to 6 rows of icon, title, subtitle and right-hand value | `ListWidgetData` | Recent Transactions |

- **Welcome card:** keeps the greeting and the range control. A widget may set `highlight()` to show up to two figures inside the card (Earnings and Expense in the demo) instead of being its own card.
- **No illustration** (Q2): the demo's character art belongs to WrapPixel.
- **New core components:** `AreaChartCard`, `DonutCard` and `ListCard`, plus the changes to `StatTile` and `BarChartCard`. They are built on the existing `components/ui/chart.tsx` (recharts, already installed). No new dependency.
- Each new type gets a skeleton, a "Gagal memuat" retry and its empty text, like the existing ones (frontend-behavior §8.6).

### Real data, not mock data
The demo `Invoice` module gets widgets over its own table (removed with it by `admin:remove-demo`):

| Widget | Type | Size |
|---|---|---|
| Pendapatan (paid) / Piutang (unpaid), shown in the welcome card | `stat` + `highlight()` | — |
| Invoice baru | `stat` with change and "Lihat semua →" | `sm` |
| Rata-rata nilai invoice | `stat` with change | `sm` |
| Pendapatan per hari: paid up, overdue down, total / paid / overdue side panel | `bar_chart` | `lg` |
| Tren pendapatan | `area_chart` | `sm` |
| Invoice per status | `donut` | `sm` |
| Invoice terbaru | `list` | `md` |

`DemoSeeder` (local only, never production) creates about 60 invoices across 90 days, so Beranda isn't empty after `migrate:fresh --seed`. All data comes from factories; nothing is real.

Grid: the 12-column grid stays. A tall `stat` row then `lg` + `sm` stacks reproduce the demo's arrangement (the `tall` flag already exists).

---

## Part C — Component showcase + the "always follow ours" rule

### Showcase module
- Core module `Components` (`packages/admin-core/modules/Components`), slug `components`, label "Komponen", group `sistem`, `superadmin_only` (no permissions, hidden from the matrix). A project hides it with `admin-core.modules.disabled`.
- One page, `Components::Index`, with a sticky section index on the left and live examples on the right:
  - Tokens (colours, radius, type steps)
  - Buttons
  - Badges and `StatusBadge`
  - Form fields (every `FormField` control)
  - Cards and KPI (`StatTile`, `StatStack`, `SegmentBar`)
  - Charts (bar, area, donut)
  - `ListCard`
  - DataTable (small static set)
  - Dialogs (`ConfirmDialog`, `ForceDeleteDialog`, `StaleUpdateDialog`)
  - Empty and error states
  - Toasts
  - Tabs
  - Sidebar menu item with children and badge
- Each example shows the import line and a short usage snippet (copy button) and links to its row in DEVELOPER.md §5.
- The examples use fixed illustrative values defined in the page component. These are documentation fixtures, not app data; the AGENTS.md "sample data" rule is clarified to allow them in the showcase only.
- Tests: Super Admin sees it; a non-SA gets 403; the page renders with no JS errors (browser group, light and dark).

### Docs rules (AGENTS.md §6, DEVELOPER.md, Boost guideline)
- **AGENTS.md §6, new bullet:** "New UI follows the house style (shadcnspace-inspired, shadcn/ui primitives in `components/ui` + theme tokens). Before building a component, check `/admin/components` (Komponen) and reuse what is there; a new generic component goes into the core package **and** onto the showcase in the same change. Never copy shadcnspace / WrapPixel source, markup or assets: match the look with our tokens."
- **DEVELOPER.md:** new recipe **R21. Build or change a UI component** (check the showcase, shadcn primitive first, tokens only, add a showcase section, browser check light / dark / 375px); key-files rows for the new components and the showcase module; R13 points to the showcase.
- **`resources/boost/guidelines/core.blade.php`:** the same rule in condensed form, so client projects' AI agents follow it too (`BoostDocsTest` checks every name it mentions).

---

## Files (summary)
- **Backend:** `Registry/ModuleDefinition.php`, `Registry/MenuBuilder.php`, `Data/MenuItemData.php`, new `Data/MenuChildData.php`; `Dashboard/WidgetType.php`, `Dashboard/Widget.php` (`highlight()`), `Data/Widgets/{StatWidgetData,BarChartWidgetData}` + new `{AreaChart,Donut,List,ListRow}WidgetData`; `Testing/ContractAssertions.php` (new keys); `modules/Components/*`; `Commands/MakeWidgetCommand` stubs for the new types; skeleton `modules/Invoice/{module.php,Widgets/*}`, `database/seeders/DemoSeeder.php`.
- **Frontend:** `AppSidebar.tsx`, new `ui/badge.tsx`, `StatusBadge.tsx`, `StatTile.tsx`, `BarChartCard.tsx`, new `AreaChartCard.tsx`, `DonutCard.tsx`, `ListCard.tsx`, `WidgetGrid.tsx`, `CommandPalette.tsx`, Beranda `Index.tsx`, showcase page; `lang/{id,en}.ts`.
- **Docs:** spec §3.1, §7.2, frontend-behavior §3 / §8.6 / §9, ui-design §2 / §4.8 / §5; AGENTS.md §6; DEVELOPER.md (R21, key files); Boost guideline + the `admin-dashboard-widget` skill (new types); design README; CHANGELOG (part of 2.0.0).

## Tests
- **Contract:** `badge` and `submenu` validation (bad route, unknown action, too-long badge), each with a break fixture; `MenuBuilder` hides children without permission; a contract test that every widget type has a Data class and a renderer.
- **Feature:** each new widget type resolves its Data object; the Invoice widgets respect `visibleTo()`, are absent without `invoices.view` and stay within the time budget (AGENTS.md §8); the change % is computed against the previous range.
- **Browser:** a parent opens and closes, the active child is marked and its parent opens on load, the collapsed flyout works, the badge is visible; Beranda renders every new type with skeleton and rescue states; the showcase renders in light and dark with no console errors.
- `composer check` green; `migrate:fresh --seed` and `migrate:rollback` succeed.

## Order
A (menu) → B (widgets + Beranda) → C (showcase + docs). Each part ends with `composer check` and screenshots for you; the browser review comes at the end.

## Open questions (default in *italics*, used if you just say "approved")
- **Q1. Beranda data:** *Real widgets from the demo Invoice module + `DemoSeeder`* (removed by `admin:remove-demo`), or a separate fake "Analytics" demo module?
- **Q2. Illustration in the welcome card:** *none*, or a simple original SVG drawn for this project (no WrapPixel art either way)?
- **Q3. Badge:** *static text only* (`'Baru'`), or also live counts through a class (e.g. unpaid invoices, cached per user)?
- **Q4. Showcase visibility:** *Super Admin only, every environment* (projects can disable it), or only when `APP_ENV=local`?
- **Q5. Version:** *all of this ships in 2.0.0 together with restyle 01* (it's already breaking).

## Progress
- [x] Plan approved
- [x] A: menu children + badge
- [x] B: widget types + Beranda
- [x] C: showcase + docs rules
- [x] `composer check` green
- [x] Owner's browser review (2026-11-08)

## Added during implementation (owner's requests, 2026-11-08)
- **D. DataTable in the demo's product-list look** with the rows' staggered fade-up (measured on the demo: 20px, ~500 ms ease-out, 250 ms apart). Pure CSS (`data-rows-in`), capped after row 8.
- **More Beranda sections from `DemoSeeder`:** "Pendapatan per kota" (list + change pills), "Pelanggan teratas" (list + share bars), "Invoice per bulan" (grouped bars + legend).
- **Component documentation for AI:** the Boost skill `admin-ui-components` (one catalogue, checked by `BoostDocsTest`) next to the Komponen page; AGENTS.md §6, DEVELOPER.md R21 / R22 and the Boost guideline point to it.

## Decisions made during implementation
- `DemoSeeder` already existed (240 invoices over a year); reused, not rewritten.
- `Widget::highlight()` only for `stat`; the cap (`max_widgets`, now 16) counts cards only, highlights have their own cap of two.
- The progress bar and segment fills are SVG rects (no inline styles, AGENTS.md §6).
- Narrow (`sm`) area, donut and list cards show "Lihat semua" as a round icon button so the title doesn't wrap.
- Komponen's texts are documentation, not translated through `useT()`; its examples are documentation fixtures (AGENTS.md §6 note).
- No illustration in the welcome card (Q2).
