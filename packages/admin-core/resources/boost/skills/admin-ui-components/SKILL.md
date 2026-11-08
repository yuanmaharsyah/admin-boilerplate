---
name: admin-ui-components
description: "Use before building or changing any admin screen or UI component: the catalogue of house-style components (shadcnspace-inspired), what each is for, and how to use it."
---

# House-style UI components

The admin panel has one look (shadcn/ui neutral, 8px controls, 12px cards, 1px borders, no card shadows). It is inspired by the public shadcnspace dashboard demo, but none of its code, markup or assets is used: match the look with the components below and the theme tokens. Signed in as Super Admin, **Komponen** (`/admin/components`) shows every entry live with code to copy.

Rules:

- Reuse a component from this list before writing markup. Compose pages from it; don't restyle it per page.
- Colours only through theme tokens (`bg-card`, `text-muted-foreground`, `fill-chart-2`…). No hex values, no inline styles, no arbitrary `var(--…)` classes.
- Motion only through what is already built: colour transitions (150 ms), the sidebar width (200 ms), the dialogs and menus of `tw-animate-css`, chart animations, and the list rows' fade-up. Everything respects reduced motion.
- A new generic component goes into the core package (`@admin-core/components/admin`, or `@admin-core/components/ui` for a shadcn primitive), gets a section on the Komponen page and an entry here, in the same change.

## Primitives (`@admin-core/components/ui/*`)

- `Button`: variants `default`, `outline`, `secondary`, `ghost`, `destructive`, `link`; sizes `default`, `sm`, `compact`, `icon`. A button that calls the server takes `loading` from `useAction` (or `useAdminForm` in forms).
- `Badge`: a round pill, variants `default`, `secondary`, `outline`, `success`, `warning`, `info`, `destructive`. Short labels only (the menu's "Baru").
- `Skeleton`, `Tooltip`, `DropdownMenu`, `Dialog`, `Sheet`, `Popover`: the shadcn primitives, already restyled.

## Status and figures

- `<StatusBadge tone="success" label="Lunas" />`: a soft pill with a dot. Tones `neutral`, `success`, `warning`, `info`, `destructive`; never yellow.
- `<ChangePill change={18} />`: "+18%" in green, "−5%" in red. `ChangeLine` adds the caption after it.

## Page structure

- `<PageHeader title description actions backHref />`: breadcrumbs (from the page prop) above the title; no rule under it.
- Cards: `rounded-xl border border-border bg-card p-6`. A card title is `<CardHeading title subtitle action />` (18px/500, muted subtitle, action on the right).
- `<EmptyState icon title description action />` for an empty list, tab or Beranda.
- `<Tabs label tabs value onChange />` for the sections of a Show page.

## Lists: `DataTable`

`<DataTable data state columns slug label itemLabel rowLabel empty />` with `rowHref`, `rowActions`, `bulkDelete`, `download` as needed (DEVELOPER.md R17). It brings the card, the toolbar (search, filter chips, Kolom, Download), the bordered table box, the header, 56px rows, selection, pagination and every loading / empty / error state.

Rows fade up one after another when they mount (a new page, a new search): 20px, 500 ms ease-out, 250 ms apart. That is the `data-rows-in` attribute on the `tbody`, styled in `admin-core.css`. To get it in another table, put `data-rows-in` on its `tbody`; never add your own row animation.

## Forms

Every control sits in `FormField` (label, help, error, required): `TextField`, `TextareaField`, `SelectField`, `ComboboxField`, `RelationSelect`, `DateField`, `NumberField`, `CurrencyField`, `SwitchField`, `FileField`. Pages use `useAdminForm`, `<FormFooter />`, `<UnsavedChangesGuard />` and `<StaleUpdateDialog />` (R19).

## Dashboard and summaries

- `<StatTile icon label value format change caption badge action />`: title with a round outline icon, the big number, the change pill, an action button.
- `<BarChartCard title data xFormat tickFormat tooltip valueLabel aside legend />`: rounded bars; a point's `n` draws below zero, `c` draws a second bar beside it (name both in `legend`); `aside` is the side panel of totals.
- `<AreaChartCard title value format change caption data xFormat action />`: a headline figure over a soft gradient area.
- `<DonutCard title value format change caption segments onSelect action />`: a ring with a legend.
- `<ListCard title rows empty action />`: rows of icon, title, subtitle, value (`tone`), an optional change pill and a share bar (`progress`, 0 to 1).
- `StatStack`, `SegmentBar`, `WidgetTable` for the older summary types.

On Beranda these come from widgets (skill `admin-dashboard-widget`); pages outside Beranda use the components directly.

## Menu

The menu is never written in TSX: it comes from `module.php`. `'badge' => 'Baru'` puts a pill on the module's item; `'submenu' => [['label' => 'Daftar', 'route' => 'index'], ['label' => 'Tambah', 'route' => 'create', 'action' => 'create', 'badge' => 'Baru']]` makes the item a parent with children (each a parameterless GET route of the module, shown only with `{slug}.{action}`).
