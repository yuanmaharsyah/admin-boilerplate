# Restyle 03 — Tables, uploads, auth, account settings, error pages, 3-level menu, kanban, charts

**Status:** ✅ done; approved in the owner's browser review 2026-11-08
**Follows:** restyle 02 (`2026-11-08-restyle-02-dashboard-menu-showcase.md`)
**Visual target:** the shadcnspace demo again: measured values only. No code, illustrations, photos or logos (the login's right-hand artwork is theirs; ours will be built from our own components, see C).

Every new component also goes onto the Komponen page and into the skill `admin-ui-components` (AGENTS.md §6, R21).

## A. Uploads: dropzone and image previews
- Restyle `FileField` / `AttachmentFields` as the demo's dropzone: a dashed 12px box with an icon, "Tarik file ke sini atau pilih", the accepted types and size limit, and a hover / drag-over state.
- Images get thumbnails: picked files show a local preview (an object URL, revoked on remove), saved ones show a signed-URL thumbnail, in a grid with remove buttons and a lightbox on click.
- `ImageField` (Settings branding) and the new avatar upload (E) use the same look.

## B. DataTable features (the demo's TanStack table set)
| Feature | How |
|---|---|
| Column visibility | Exists (Kolom menu); restyle as the demo's dropdown with checkboxes |
| Sticky header + sticky first column | `stickyHeader` (default on in long lists) and `stickyFirstColumn` props; scroll inside the table box |
| Expanding rows | `expandable={(row) => ReactNode}`: chevron column, the panel below the row (muted card, demo "More Details"), the height animates, one or many open |
| Inline editing | `editable` columns: `{ key, edit: 'text' \| 'number' \| 'select', save: (row, value, done) => … }`. The cell becomes a field on click / Enter, Esc cancels, Enter / blur saves through the module's normal `update` route with `lock_version` (409 → the stale dialog). No new backend path |
| Column drag and drop | Reorder headers by drag or keyboard; the order is kept per user with the column visibility (`dt_cols:{slug}`) |
| Row drag and drop | `reorderable` lists only (a model with a `position` column): drag or keyboard, saved through a module route `PATCH {slug}/reorder` (audited, `edit` permission). Off for every other list |

Rows still fade up (`data-rows-in`). Each feature gets a Komponen example and a skill entry; the generator stubs stay as they are (opt-in features).

## C. Auth pages (login look, applied to every auth page)
- Split card: the form on the left, a visual panel on the right. Login, forgot password, reset password, change password, two-factor challenge, register (if Q2), all on the same card.
- **Right-hand visual (our own):** a tilted, non-interactive mini Beranda built from our real components (`StatTile`, a small `BarChartCard`, a `ListCard`) on `--sidebar` with a soft grid. Static fixture figures, `aria-hidden`, hidden below 1024px. No third-party art.
- Login: username/email, password with show/hide, "Ingat perangkat ini", "Lupa kata sandi?", a full-width submit button.
- **Social sign-in room (owner, 2026-11-08: "make it only clickable then href=\"#\" … spare room for them"):** "Google" and "GitHub" outline buttons above an "atau masuk dengan" divider on login and register. They link to `#` for now: an explicit owner exception to the AGENTS.md no-placeholder rule, recorded here. One config switch (`admin-core.auth.social`, a list of providers, default `['google', 'github']`) shows them, so a later Socialite setup only fills in the routes. Neutral icons, not the Google / GitHub trademarks.
- The rate-limit countdown from Phase 09's list moves here.

## D. Error and maintenance pages
- 403, 404, 419, 500 and 503 already exist (`Core::Errors/Show`), as do maintenance and coming soon (`Core::Errors/SiteAccess`). They get the demo's look: a large code, the title and text, an illustration made of our own icons and shapes, and buttons back to Beranda.
- **502** never reaches Laravel (the web server answers it while PHP is down), so it is a static `public/errors/502.html` in the same design, plus the Nginx `error_page 502 504` line in the deploy skill (R12). Decision: a hand-written file, not generated at build time (nothing to generate from while PHP is down); its colours copy the theme tokens as literal `oklch()` values, the one place outside the app where that is unavoidable.

## E. Account settings (the demo's tabbed "Account Setting")
- `/account` becomes one page with segmented tabs (the demo's tab bar): **Profil** (avatar upload with preview (A), name, email), **Notifikasi**, **Keamanan** (change password, two-factor (Q3), active sessions with "Keluar dari semua perangkat" on the existing `session_version`).
- **Notifikasi (owner exception, 2026-11-08):** the demo's layout (icon tile, title, description, switch per row) as reserved room. The switches toggle on the page only and save nothing until a notification system exists; the tab says so in one muted line.
- Super Admin **Pengaturan** gets the same tab bar and two-column card layout per tab (Umum, Kontak, Sosial Media, Akses Situs, Keamanan, Ekspor), with the same fields and behaviour.
- The demo's "Bills" tab and anything without a backend is left out: no placeholders (AGENTS.md §2).

## F. Three-level sidebar menu
`submenu` children may have their own `submenu` (one more level): `Menu → Menu Level 1 → Menu Level 1.1`. A child with children has no `route` (it is only a parent). Max depth 3, validated at boot; the contract checks every leaf route. The sidebar indents each level under its guide line; the collapsed flyout uses a submenu (`DropdownMenuSub`). Example in the demo Invoice module (Laporan → Bulanan / Tahunan, as real routes).

## G. Kanban and Tiket (two separate pages)
The owner, 2026-11-08: "kanban and ticket are different page".

- **Kanban** (demo module `Kanban`, the demo's "Kanban" app): a board of tasks. Columns (e.g. Rencana, Dikerjakan, Ditinjau, Selesai) and cards (title, label badges, assignee avatars, due date, progress). Cards move by drag or keyboard within and between columns: one audited `PATCH` per move, `edit` permission, `lock_version` checked. Built on a new generic core component `KanbanBoard` (on Komponen, in the skill).
- **Tiket** (demo module `Ticket`, the demo's "Tickets" app): a support-ticket list. KPI tiles at the top (Total, Open, Pending, Closed), then a DataTable (number, subject, requester, priority badge, status, assignee, date) with filters, expanding rows (B) for the message, and the Show page with the conversation and status changes in the Riwayat tab. No board.
- Both are removed from new projects by `admin:remove-demo`, and both are seeded by their `DemoSeeder`.

## H. Chart list
Komponen gets every chart the panel offers, built on recharts (already installed) and the `--chart-*` tokens: bar (vertical, horizontal, stacked, grouped, two-sided), line, area (stacked), pie / donut, radial, radar. Each is a core component with a Komponen example and a skill entry; the ones Beranda can use become widget types only if Q6 says so.

## Files (summary)
Core: `FileField`, `AttachmentFields`, `ImageField`, new `ImagePreviewGrid`; `DataTable` (+ `DataTableRowExpand`, editable cells, sticky, reorder); `AuthLayout`, `AuthCard`, new `AuthShowcase`, `Core::Auth/*` pages (+ `TwoFactorChallenge`, `Register` if approved); `Core::Errors/*`; `Core::Account/*` (tabbed); `Settings::Index`; `AppSidebar` + `ModuleDefinition` / `MenuBuilder` / `MenuChildData` (3 levels); new `KanbanBoard`; chart components; Komponen sections; skills `admin-ui-components`, `admin-deploy`. Skeleton: `modules/Kanban`, `modules/Ticket`, Invoice `Laporan` routes, `public/errors/502.html` build step.

## Tests
- **Contract:** the 3-level `submenu` validation and break fixtures; leaf routes protected.
- **Feature:** the reorder and kanban move routes, the ticket list and status changes (permission, `visibleTo()`, audit, 409); two-factor enable / confirm / challenge / recovery codes and the sessions sign-out; registration (if approved).
- **Browser:** dropzone drag and preview; expanding row; inline edit save, Esc and 409; sticky header while scrolling; column and row drag with the keyboard; kanban move; auth pages at 375px and in dark mode; the 3-level menu open on the current route; every error page.
- `composer check` green.

## Order
F (menu) → C + D (auth, errors) → A + B (uploads, tables) → E (account, settings) → G + H (kanban, charts). Screenshots and a browser review after each part.

## 9. Questions (default in *italics*)
- **Q1. Drag and drop library** (column / row reorder, kanban): *`@dnd-kit/core` + `@dnd-kit/sortable` (MIT, keyboard and screen-reader support)*, or native HTML5 drag (no new dependency, but mouse only, which fails the keyboard rule). A new dependency needs your approval (AGENTS.md §2).
- **Q2. Register:** the panel creates accounts through Users today, and each user needs a level. *Add a register page behind a Settings switch, off by default; new accounts get a configured default level and stay inactive until an admin activates them.* Or no register page at all.
- **Q3. Two-step verification:** *Fortify's two-factor (authenticator app + recovery codes), optional per user, with a Settings switch so Super Admin can require it for every level.* It adds columns to `users` (a new migration). Or skip.
- **Q4. Google / GitHub sign-in buttons:** answered: visible placeholder buttons linking to `#` (see C).
- **Q5. Account "Notifikasi" tab:** answered: the layout as reserved room, saving nothing yet (see E).
- **Q6. New chart types on Beranda:** *Komponen only for now*; widget types get added when a module needs one.
- **Q7. Version:** *ships with restyle 01–02 as 2.0.0* (not released yet), or as 2.1.0 after a 2.0.0 release of 01–02.

## Progress
- [x] Plan approved
- [x] F: three-level menu (Invoice → Laporan → Bulanan / Tahunan, demo report pages; contract, feature and browser tests)
- [x] C + D: auth pages (split card + our showcase, social room, register behind the switch, two-step challenge, confirm password), error pages (`ErrorPanel`, static 502)
- [x] A + B: uploads (drop zone, local image thumbnails, lightbox, `ImageField`), table features (expand, sticky, column and row reorder with dnd-kit, inline edit; Invoice list and Komponen examples)
- [x] E: Akun (Profil with photo and password, reserved Notifikasi, Keamanan with two-step and devices), `RequireTwoFactor`, Pengaturan in the segmented layout
- [x] G + H: Kanban (demo `Task`: Papan board + Daftar tugas, `KanbanBoard`), Tiket (demo `Ticket`: KPI tiles, expanding messages), the chart list (`ChartCards`) on Komponen
- [x] `composer check` green (package 438, skeleton 382, built + browser 52, PHPStan clean); `migrate:fresh --seed` / `migrate:rollback` still to run by the owner
- [x] Owner's browser review (2026-11-08)

## Decisions during C + D
- Fortify-specific code (two-step trait, migration, register action and response, event listeners) stays in the skeleton: the package doesn't depend on Fortify. The core gains only the page Data, pages, audit event names and settings. UPGRADE.md lists the files a project copies.
- After a self-registration Fortify signs the new user in (its controller); `RegisterResponse` signs them straight out again, so the log shows a `login` / `logout` pair for that inactive account next to `registered`.
- The challenge page switches between the authenticator code and a recovery code with local state (one field at a time).
- The login subtitle is neutral ("Masuk untuk melanjutkan ke panel.") now that accounts can also be self-registered.
- `wajib_2fa` is stored now; the redirect that enforces it comes with Account → Keamanan (part E), where users can turn two-step on.

## Decisions during A + B
- No server thumbnails for saved images: every stored-file fetch writes `attachment_downloaded`, so a thumbnail grid would log one row per image per page view. Saved images open in a lightbox on click (one audited fetch); picked images get local thumbnails.
- Drag positions are dnd-kit's inline `transform` (`dragStyle()`), the one inline style allowed (AGENTS.md §6 updated).
- Inline editing and row reorder are callbacks: the module sends its own request (update with `lock_version`, a `PATCH` reorder route), so no new backend path exists in the core. The live examples are Komponen (local state); the demo Invoice list shows expand, sticky header and column reorder (its update needs the whole form).
- Column order is stored apart from the column choice (`dt_order:{slug}` next to `dt_cols:{slug}`), so existing saved choices keep working.

## Decisions during E
- Profile photo: an `avatar` attachment slot on the core User (private disk, audited upload and removal). Showing it uses a signed URL (stable for the hour, so the browser caches it) to `account.avatar.show`, which is **not** an audited download: the photo appears on every page, and logging each view would flood the log. This is a deliberate exception to "every file fetch is audited" for this one slot; recorded in spec §8.
- Two-step set-up talks to Fortify's JSON endpoints (`sendJson`) because its routes need a fresh password confirmation, which Inertia redirects can't carry; the card asks for the password inline when Fortify says it's stale.
- The device list needs database sessions; with another driver the card shows only "Keluar dari perangkat lain". It uses the existing `session_version` revocation (the current session stays).
- `/account/profile` keeps its URL (bookmarks, the user menu); the old `Core::Account/Profile` page is gone.

## Decisions during G + H
- Both demo modules come from `make:module` (the house pattern), then customised; `admin:remove-demo` removes them with their tests.
- The assignee is a plain name: the Users module has no lookup route a relation field could use.
- Kanban: dragging moves cards within and between columns; the keyboard moves a card within its column (Space, arrows, Space) and a "Pindahkan ke" menu per card moves it to another column. dnd-kit's keyboard drag between separate lists cancelled itself when the card's element moved list; the menu is also the single-pointer alternative WCAG 2.2 (2.5.7) asks for. Pointer dragging on the board isn't covered by an automated test (Playwright's `dragTo` sends too few pointer moves for dnd-kit); the same dnd-kit set-up is keyboard-tested on the table.
- A board move saves status and position of every changed card in one transaction and audit batch; it doesn't check `lock_version` (a move is a reorder, not an edit of the card).
- A new menu group `aplikasi` in the core config (hidden while empty) holds the two apps.
- The chart list is one file of six small cards sharing a frame; new Beranda widget types come only when a module needs one (Q6).

## Added after the review (owner, 2026-11-08)
- Development-only modules: `admin-core.modules.dev_only` switches Komponen and the generator samples off in production (registry `enabled()`), on locally and on staging. Real projects keep Komponen (developers and AI need it) and lose the demo modules through `admin:remove-demo`. Documented in AGENTS.md §3, the Boost guideline, DEVELOPER.md R24, spec §3.
