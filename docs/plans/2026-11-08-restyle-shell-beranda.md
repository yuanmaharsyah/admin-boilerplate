# Restyle 01 — Shell and Beranda in the shadcnspace dashboard style

**Status:** ✅ plan approved 2026-11-08 (defaults of §6 accepted); implemented; ✅ approved in the owner's browser review 2026-11-08
**Scope:** the admin shell (`AdminLayout` and its parts) and Beranda (`Dashboard::Index` + the widget components). Lists, forms, dialogs, auth and error pages follow in a later restyle phase.
**Visual target:** the public demo at `https://dashboard.shadcnspace.com/` (WrapPixel / shadcnspace), measured in the browser on 2026-11-08. Option A from chat: we rebuild its look with our own tokens and `@admin-core` components.

## 0. What "replicate" means here (licence line)

The demo is a WrapPixel template, and its premium tiers forbid redistribution. This repository is public, so:

- **Taken:** measured visual values (colours, radius, spacing, type sizes and weights, control heights, transition timings) and the layout arrangement. Its colour tokens are the stock shadcn/ui "neutral" theme, which is MIT and already uses our token names.
- **Not taken:** its source (markup, CSS files, JS, components), illustrations, logo, promo card ("Grab Pro Now"), the customizer button, flags, cart / mail / notification icons, sample data and copy.
- The result is our own code, built from shadcn primitives we already ship. It will look very close to the demo, not byte-identical. Wherever the demo conflicts with our behaviour spec, the behaviour spec still wins (AGENTS.md).

## 1. Measured reference (2026-11-08)

| Thing | Demo value |
|---|---|
| Font | Geist (already ours) |
| Light tokens | shadcn neutral: background `#fff`, foreground `#0a0a0a`, primary `#171717`, muted/accent/secondary `#f5f5f5`, muted-foreground `#737373`, border/input `#e5e5e5`, ring `#a1a1a1`, sidebar `#fafafa`, destructive `#e40014` |
| Dark tokens | shadcn neutral dark: background `#0a0a0a`, card `#171717`, primary `#e5e5e5`, secondary/muted `#262626` |
| Radius | `--radius: 8px`: controls 8px, nav items 6px, cards and the inset main 12px, badges fully round |
| Shadows | none on cards (matches our rule) |
| Sidebar | 240px, `--sidebar` background, 8px side padding; group label 12px/600 muted, uppercase; item 36px, 8px 12px padding, 14px/500, 16px icon; active item = solid `primary` with `primary-foreground` text, radius 6px; width transition 200ms |
| Collapse | the sidebar shrinks to an icon strip (~56px): icons only, group labels become separators, tooltips on hover |
| Main | an inset panel: `--background` on the `--sidebar` page, 1px border, radius 12px, 8px margin |
| Topbar | 56px inside the inset panel: sidebar toggle, vertical separator, search field (320×36, icon left, 8px radius), right-side icon buttons, avatar |
| Card | 1px border, radius 12px, padding 24px; title 18px/500, subtitle 14px muted; header action as an outline icon button (40px round) or a select |
| KPI | value 24px/500, tabular; change pill 12px, 2px 8px, round, soft success / destructive fill with a 1px border |
| Card button | outline, 36px, 8px radius, 14px/500, trailing arrow ("See Report" style) |
| Charts | monochrome bars with round ends (ink + light grey), soft grey gradient area charts, no grid clutter |
| Motion | buttons and inputs: colour transition 150ms; sidebar width 200ms linear; menus and dialogs: shadcn `tw-animate-css` fade/zoom (already installed) |

## 2. Files

**Theme**
- `packages/admin-core/resources/css/admin-core.css`: tokens → shadcn neutral light/dark values (in oklch); `--radius` 0.5rem; radius steps `sm` = radius − 2px, `md` = radius, `lg` = radius, `xl` = radius + 4px; `--sidebar-primary` / `--sidebar-accent` tokens added; `--rail*` and `--sidebar-active*` removed; `--rule` kept only if Q2 says so; `text-kpi` → 24px/500, `text-card-title` → 18px/500, `text-title` → 24px/600; topbar height 56px.

**Shell**
- New `components/admin/AppSidebar.tsx`: one sidebar, logo + app name at the top, each `MenuGroupData` as a labelled section with its items, user block at the bottom, icon-only collapsed mode with tooltips.
- Delete `components/admin/AppRail.tsx` and `components/admin/ItemPanel.tsx`.
- `layouts/AdminLayout.tsx`: sidebar + inset main panel, topbar (toggle, search trigger styled as the 320px field opening the existing `CommandPalette`, downloads badge, theme toggle, user menu); sheet below 1024px keeps working; `admin_panel` cookie and `Ctrl+B` now mean "sidebar collapsed to icons".
- `UserMenu.tsx`, `ThemeToggle.tsx`, `DownloadsLink.tsx`: round 36px icon buttons, avatar trigger.
- `Breadcrumbs.tsx`: moves from the topbar to the top of `PageHeader` (the topbar's left side holds the search field, as in the demo).
- `PageHeader.tsx`: title 24px/600, description 14px muted, no 2px rule.
- `MaintenanceBanner.tsx`: same behaviour, inside the inset panel under the topbar.
- `lang/id.ts`, `lang/en.ts`: drop rail-only strings, add the collapse tooltip.
- `src/Data/AppData.php` / `HandleInertiaRequests.php`: unchanged (`app.panel_open` keeps its name and now means "sidebar expanded").

**Beranda**
- `StatTile.tsx`: card anatomy as in the demo: label (14px/500) + round outline icon at the top right, value 24px/500, optional badge, optional "Lihat laporan →" outline button when the widget has `href`.
- `StatStack.tsx`, `SegmentBar.tsx`, `WidgetTable.tsx`: the new card frame (title + muted subtitle, header action), rows and dividers in the demo style.
- `BarChartCard.tsx`: rounded bars, ink + grey series, light grid, tooltip on `shadow-popover`; reduced-motion behaviour kept.
- `WidgetGrid.tsx`: 24px gap, the new card frame for skeleton and rescue states.
- `modules/Dashboard/resources/js/pages/Index.tsx`: header as a welcome card (title, greeting, range control); **no illustration**.
- `components/ui/button.tsx`: `outline` variant and focus ring per the shadcn defaults (ring `--ring`, 3px ring at 50% alpha).

**Docs**
- `docs/specs/2026-10-16-ui-design.md` §1, §1.1, §1.2, §2, §4.8; `docs/specs/2026-10-16-frontend-behavior.md` §3 (proposed changes in §5 below, edited only after approval).
- `docs/design-implementation/README.md`: `tokens`, `shell`, `command-palette`, `dashboard` back to `🟡 review` with a changelog line; new source noted.
- `DEVELOPER.md` §5 rows for the shell components; `CHANGELOG.md` + `UPGRADE.md` (see Q4).

## 3. Steps

1. Approve this plan and the spec changes in §5.
2. Tokens and radius in `admin-core.css`; check every existing screen still renders (the token names stay, so the other screens restyle themselves).
3. `AppSidebar` + `AdminLayout` + topbar; delete the rail and panel.
4. `PageHeader` + breadcrumbs.
5. Widget components and the Beranda page.
6. Light, dark, 375px, keyboard-only and reduced-motion pass in the browser, side by side with the demo.
7. Specs, README manifest, DEVELOPER.md, CHANGELOG / UPGRADE.
8. `composer check` green; `migrate:fresh --seed` and `migrate:rollback`.
9. Owner's browser review (shell + Beranda), then statuses → `✅ approved (browser review)`.

## 4. Tests

- Browser smoke (`skeleton/tests/Browser`): sidebar shows every permitted group and item; the active item has `aria-current="page"`; `Ctrl+B` collapses to icons and the cookie keeps it after reload; tooltips on collapsed items; below 1024px the hamburger opens the sheet and navigation closes it; the search field opens the command palette.
- `SharedPropsTest` (package + skeleton): updated for any renamed `AppData` field.
- Beranda browser test: each widget type renders in the new frame; skeleton and "Gagal memuat" states still reachable; the range control reloads only `uses_range` widgets.
- Existing `test:built` (`--group=vite`) must stay green: every page still resolves.

## 5. Proposed spec changes (need your approval)

1. **frontend-behavior §3 Shell:** replace "rail of groups + item panel" with "one sidebar: groups are labelled sections, all items visible; collapse = icon-only strip with tooltips (never hidden); `Ctrl+B` / toggle; cookie `admin_panel`". The rules about clicking group icons, viewed vs active group and rail overflow are removed. The sidebar scrolls when long; logo and user block stay fixed.
2. **ui-design §1:** the visual language changes from "editorial monochrome, almost square, 2px ink rules, yellow highlight" to "shadcn neutral, 8px radius, 12px cards, no title rules". Tokens §1.2 replaced by the measured values in §1 above.
3. **ui-design §2:** new shell diagram (sidebar 240px / 56px collapsed, inset main, topbar 56px with the search field on the left, breadcrumbs above the page title).
4. **ui-design §4.8:** Beranda header becomes a welcome card; the grid arrangement stays.

## 6. Open questions

- **Q1. Branding colour.** The demo has no accent colour (the active item is solid ink). Per-client branding today changes `--highlight` only. Keep `--highlight` for the brand (used for the active item marker and chart series 1), or drop it and let clients override `--primary`? *Default: keep `--highlight` as the projects' only brand knob, use it for chart series 1 only; the active item is ink as in the demo.*
- **Q2. 2px ink title rule.** The demo has none. *Default: remove it everywhere (it comes from `PageHeader`, so all screens change at once).*
- **Q3. KPI change pill ("+18%").** `StatWidgetData` has no change value, so the pill can't show real data. Adding `?float $change` to `StatWidgetData` is a widget API change. *Default: skip it in this phase; the existing `badge` keeps the pill style.*
- **Q4. Versioning.** Projects that styled around the rail, the `--rail*` tokens or the 2px rule will look different after updating. *Default: treat it as breaking: `UPGRADE.md` entry and a major version (2.0.0).*
- **Q5. Chart colours.** The demo's `--chart-1..5` are orange / teal / navy / yellow / amber, but its visible charts are ink and grey. *Default: ink and grey series, `--chart-1` = `--highlight`.*

## 7. Acceptance

- Shell and Beranda match the demo's measured values in §1 in light and dark, at 1440px and 375px.
- No hex values in components, no third-party code or assets, no new dependency.
- Every behaviour in the updated frontend-behavior §3 and §8.6 works, keyboard-only included.
- `composer check` green.

## Progress
- [x] Plan approved
- [x] Tokens
- [x] Sidebar + layout
- [x] Page header
- [x] Beranda widgets
- [x] Browser pass
- [x] Docs
- [x] `composer check` green (`test:built` rerun after a pre-existing flaky `FormsTest` focus race, see report)
- [x] Owner's browser review

## Decisions made during implementation
- `--rule` stays as a token (plain divider colour) so the screens outside this phase keep a line, not an ink rule, until their restyle.
- `--chart-1` is `var(--highlight)` (Q1/Q5): the hovered bar uses the brand colour, the bars are ink.
- `StatTile` takes an `action` (the widget's "Lihat semua →" button) instead of the whole card being a link; nested links are gone.
- `StatusBadge` becomes the demo's round pill everywhere (also in tables).
- A global `prefers-reduced-motion` rule turns off transitions and animations.
- Mobile keeps the menu-button + sheet pattern; the search field is an icon button below 1024px.
