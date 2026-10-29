# Phase 05 — Layout Shell

- **Date:** 2026-10-19
- **Roadmap:** [Master Roadmap → Phase 05](./2026-10-16-admin-boilerplate-master-roadmap.md#phase-05--layout-shell)
- **Spec sections:** ui-design §1 (reconciled tokens, `d015451`), §2 (shell), §4.7 (auth); frontend-behavior §1–4, §9; design spec §2.2 (page overrides), §3.2 (page names), §8 (password rules, logout of other sessions)
- **Status:** approved 2026-10-19 (see Approval); 05a ☑ committed (`d708654`); 05b ☑ committed (`b8b523a`), shell review OK (2026-10-20); 05c ☑ done; auth and error pages approved in the browser review (2026-10-20)
- **Design gate:** replaced by the source order in `docs/design-implementation/README.md` (approved mockup → `reference/` → ui-design.md). No mockup is approved yet, so every screen comes from `reference/` or is derived (table below).

## Screen sources

| Screen / part | Source | Browser review needed |
|---|---|---|
| **Tokens** (colours light/dark, fonts, type steps, control heights, radius, shadows, overlay) | `reference/style-reference-01/index.html` token block, as reconciled in ui-design §1 | Yes, with the shell (no screen of its own) |
| **Shell:** `AdminLayout`, `AppRail`, `AppRail.Panel`, `AppRail.Sheet` (< 1024px), `Topbar`, `Breadcrumbs`, `UserMenu`, `ThemeToggle`, `PageHeader`, `Toast`, `MaintenanceBanner` | `reference/…/index.html` and `users-index.dc.html` (`data-component` of the same names) | Yes (owner's review of the built result) |
| Shell: rail overflow (more than 8 groups scroll, logo and bottom controls fixed) | **Derived, needs browser review** (behaviour in frontend-behavior §3; the reference shows ≤ 5 groups) | Yes |
| **Command palette:** `CommandPalette`, `CommandPalette.Trigger` (sections Navigasi / Aksi / Terakhir dibuka, empty state) | `reference/…/index.html`, `users-index.dc.html` | Yes |
| **Error pages** 403 / 404 / 419 / 500 / 503 | **Derived, needs browser review**: auth-layout card (`auth.dc.html`) + page-title step and 2px ink rule (ui-design §2: "large code number in ink and the 2px rule") | Yes |
| **Auth:** Login (default, validation, wrong credentials, inactive account, too many attempts, session expired 419, processing), Forgot password (default, sent), Reset password (default, invalid link, success), Change password (default, validation, success) | `reference/…/auth.dc.html` (`AuthLayout`, `AuthCard`, `FormField`, `Input`, `Button`, `Alert`) | Yes |

Everything follows the README rules: colours only through tokens, no hex or raw `oklch()` in components, no demo JS or libraries from `reference/`, no sample data in code.

## Why split

About **60 files** and **~12 test files**, mostly frontend. Proposed parts, each with its own `composer check` and commit, and one browser review at the end of 05c:

| Part | Scope | Commit |
|---|---|---|
| **05a: Foundations** | Tokens + fonts in a package stylesheet, named type/size steps, shadcn primitives the core needs moved into the package, `Core::` page namespace, `usePermission` / `<Can>`, `lib/format.ts`, translation helper (Q1), lucide icon list + `ModuleDefinition` check | `feat(core): phase 05a ui foundations` |
| **05b: Shell + palette** | `AdminLayout` and its parts, panel cookie, breadcrumbs prop, flash toasts, `CommandPalette`; kit layouts and sidebar removed | `feat(core): phase 05b layout shell` |
| **05c: Auth + error pages** | Fortify views on Data objects in core pages, change password (replaces the kit's security page), error pages; starter-kit exceptions shrink | `feat(core): phase 05c auth and error pages` |

---

## Part 05a — Foundations

| Path | Action | Purpose |
|---|---|---|
| `packages/admin-core/resources/css/admin-core.css` | create | `:root` / `.dark` tokens from ui-design §1.2 (incl. `--radius`, `--overlay`, `--shadow-*`), Tailwind v4 `@theme inline` mapping (`bg-card`, `bg-highlight`, `shadow-popover`, …), named steps: `text-title`, `text-section`, `text-kpi`, `text-card-title`, `text-brand`, `text-label` (with line-height, weight, letter-spacing), `h-control`, `h-control-sm`, `h-control-compact`, `h-control-auth`, `h-row`, `h-topbar`; fonts `--font-sans` Geist Variable / `--font-mono` Geist Mono Variable via `@fontsource-variable/*` imports |
| `skeleton/resources/css/app.css` | modify | Imports the package stylesheet; keeps only project overrides (`--highlight` for branding); kit tokens and Instrument Sans removed |
| `skeleton/vite.config.ts` | modify | Drops the `bunny('Instrument Sans')` font config |
| `skeleton/package.json`, `package-lock.json` | modify | `@fontsource-variable/geist`, `@fontsource-variable/geist-mono` (approved); `cmdk` only if Q2 = yes |
| `packages/admin-core/admin-core.npm.json` | modify | Lists the fonts, the Radix packages, `sonner`, `lucide-react` (and `cmdk`) the package frontend now imports |
| `packages/admin-core/resources/js/components/ui/*` | create (moved) | The shadcn primitives core components use: `button`, `input`, `label`, `alert`, `dialog`, `sheet`, `dropdown-menu`, `tooltip`, `separator`, `avatar`, `sonner`, `spinner` (+ `command` if Q2), restyled to the named steps. The skeleton keeps a primitive only if a remaining kit page still uses it |
| `packages/admin-core/resources/js/lib/utils.ts` | create (moved) | `cn()` |
| `packages/admin-core/resources/js/hooks/usePermission.ts`, `components/admin/Can.tsx` | create | `can`, `canAny`, `isSuperAdmin` from `auth`; `<Can permission | any>` hides |
| `packages/admin-core/resources/js/lib/format.ts` | create | `formatDate`, `formatDateTime`, `formatNumber`, `formatCurrency` (id-ID, timezone from `app`) |
| `packages/admin-core/resources/js/lib/i18n.ts` + `lang/id.ts`, `lang/en.ts` | create | Q1 |
| `packages/admin-core/resources/js/components/admin/Icon.tsx` | create | Lucide icon by name for menu data (`lucide-react/dynamic`, no new dependency) |
| `packages/admin-core/resources/icons/lucide.json` + `bin/lucide-icons.mjs` | create | Icon names generated from the installed `lucide-react`; root `composer check` regenerates and `check:generated` covers it |
| `src/Registry/ModuleDefinition.php` | modify | `icon` must be in the generated list (replaces the format-only check) |
| `src/Registry/PageResolver.php`, `resources/js/lib/resolve-page.ts`, `skeleton/resources/js/app.tsx` | modify | `Core::Page` → the package's `resources/js/pages/Page.tsx` (server finder namespace + client glob); overridable through `admin-core.pages.overrides` like any page |
| `src/Data/AppData.php`, `HandleInertiaRequests` | modify | `locale`, `timezone` (for format/i18n), `panel_collapsed` (cookie `admin_panel`, read server-side), `maintenance_banner: ?string` (always null until Settings in Phase 07; Q3) |

**As built 05a:**
- Primitives moved **only when a core or remaining kit file uses them**: `button`, `input`, `label`, `alert`, `sheet`, `dropdown-menu`, `tooltip`, `separator`, `avatar`, `spinner`. `dialog` and `sonner` move in 05b with their first core users (palette, toasts); `command` comes with `cmdk` in 05b. Restyle: flat (no `shadow-xs`), `rounded` = `--radius`, named heights (button sizes `default`/`sm`/`compact`/`auth`/`icon`; `lg` renamed `auth`), `shadow-popover` / `shadow-sheet`, `bg-overlay`, 2px ink focus outline from the base layer instead of shadcn's 3px translucent ring, `text-destructive-foreground` instead of `text-white`.
- Fonts are imported in the skeleton's `app.css` (`@fontsource-variable/*`), the package stylesheet names them; `@fonts` / `bunny('Instrument Sans')` removed; the pre-paint background in `app.blade.php` now equals `--background`.
- `t()` is `useT()` (needs `app.locale`); first key `common.loading` (spinner label). Missing and extra `en` keys were each shown to fail `tsc` (TS2741 / TS2353).
- `AppData` already had `locale`, `timezone`, `panel_open` (Phase 02); only `maintenance_banner` was added.
- `Core::` path is config `admin-core.pages.core_path` (`base_path('vendor/yuan/admin-core/resources/js/pages')`), not `__DIR__`, because PHP resolves symlinks in `__DIR__` and Vite entries must be relative to the project.
- Icon list: lucide-react ships no CommonJS build of `dynamic`, so the generator imports it with ESM resolution from the project directory; 1760 names.
- `vite.config.ts` `resolve.preserveSymlinks: true`: without it, files under the symlinked package resolved their imports from `packages/admin-core` (no `node_modules`) and the build failed on `react/compiler-runtime`.
- `DoctorCommandTest` derives its healthy versions from `admin-core.npm.json` instead of a hard-coded list.
- Until 05b replaces it, the kit sidebar loses its `sidebar-primary` / `sidebar-accent` colours (tokens not in the theme); visual only.

**Tests 05a:** `PageResolverTest` (`Core::` server + override), `ModuleDefinitionTest` (unknown lucide icon fails, known passes), `SharedPropsTest` (`app.panel_collapsed` from the cookie, `locale`, `timezone`, `maintenance_banner` null), `ModulePagesViteTest` extended to `Core::` pages, generated-file check for the icon list. `typecheck` / `lint` cover the TS.

## Part 05b — Shell + palette

| Path | Action | Purpose |
|---|---|---|
| `packages/admin-core/resources/js/layouts/AdminLayout.tsx` | create | Rail + panel + topbar + content; reads `menu`, `auth`, `app`, `breadcrumbs`; maintenance banner under the topbar |
| `components/admin/AppRail.tsx`, `ItemPanel.tsx`, `ShellSheet.tsx`, `Topbar.tsx`, `Breadcrumbs.tsx`, `UserMenu.tsx`, `ThemeToggle.tsx`, `PageHeader.tsx`, `MaintenanceBanner.tsx` | create | Per frontend-behavior §3: active group/item from the route name, viewed vs active group, overlay panel when collapsed, `Ctrl+B`, sheet below 1024px, rail overflow scroll, `aria-current` |
| `hooks/useFlashToasts.ts`, `components/admin/Toaster.tsx` | create (replaces kit `use-flash-toast`) | Native flash → toast (success 4s, error persistent, info 6s); never replayed on Back |
| `components/admin/CommandPalette.tsx` (+ trigger) | create | Per frontend-behavior §4: Navigasi / Aksi (`can('{slug}.create')`) / Terakhir dibuka (`admin_recent`, try/catch, pruned against `menu`), fuzzy search, keyboard |
| `hooks/useAppearance.ts` | create (moved) | Light/dark/system cookie, applied before first paint (kit logic kept) |
| `src/Data/BreadcrumbData.php`, `BreadcrumbsData.php` | create | `label`, `href?`; wrapped list, because the Inertia props rule forbids a raw array prop |
| `skeleton/resources/js/app.tsx` | modify | Default layout = `AdminLayout`, auth pages = core `AuthLayout` |
| Kit shell files (`app-sidebar*`, `app-header`, `app-shell`, `app-content`, `nav-*`, `breadcrumbs`, `user-*`, `layouts/app/*`, `appearance-tabs`, `settings/appearance` page + route) | delete | Replaced; theme moves to the topbar toggle |
| `skeleton/resources/js/pages/dashboard.tsx` | modify | Renders in `AdminLayout` with `PageHeader`; its body stays until Beranda (Phase 07) |

**As built 05b:**
- Active group/item from the route name as the spec says: `AppData.route` added. The palette's Aksi section needs each module's create URL, which only the server can build: `MenuItemData.create_href` (set only when `{slug}.create` exists and the user may create).
- The core layout gets `links` (profile, logout) from the skeleton wrapper `resources/js/layouts/admin-layout.tsx` (Wayfinder routes); the core never builds project URLs.
- Open states are stored with the URL they were opened on (`{ url, key }`), so navigation closes the overlay panel, sheet and palette and resets the viewed group without effects.
- `useT()` reads the locale from `<html lang>` instead of `usePage()`: the toaster is mounted in `withApp`, outside Inertia's page context, and the first browser check showed a blank page ("usePage must be used within the Inertia component"). No test caught it because no test runs the frontend; the browser check did.
- Theme toggle switches light ↔ dark (explicit choice): topbar button on desktop (as in the reference) and, after the shell review, an item in the user menu on every screen size. Toasts are flat cards with a 1px border (no shadow), per ui-design §2.
- Downloads badge not built: `downloads.ready_count` arrives in Phase 06.
- Removed kit files: shell components, `ui/{sidebar,navigation-menu,collapsible,breadcrumb,toggle-group,toggle,placeholder-pattern,skeleton,icon,sonner}`, `layouts/app*`, `hooks/use-{flash-toast,mobile-navigation,mobile,initials}`, the appearance page + route. `components/app-logo-icon.tsx` stays until 05c (kit auth layouts). Radix packages no longer imported (`navigation-menu`, `collapsible`, `toggle`, `toggle-group`) stay in `package.json`: removing a dependency needs approval.
- The kit progress bar colour `#4B5563` became `var(--primary)`.

**Tests 05b:** `SharedPropsTest` (breadcrumbs prop type), panel cookie round trip. Browser checks (below) for the interactive behaviour.

## Part 05c — Auth + error pages

| Path | Action | Purpose |
|---|---|---|
| `packages/admin-core/resources/js/layouts/AuthLayout.tsx`, `pages/Auth/{Login,ForgotPassword,ResetPassword,ChangePassword}.tsx` | create | From `auth.dc.html`; every listed state reachable from real props/errors/flash |
| `src/Data/Auth/{LoginPageData,ForgotPasswordPageData,ResetPasswordPageData}.php` | create | Props for the Fortify views (replaces raw arrays) |
| `skeleton/app/Providers/FortifyServiceProvider.php` | modify | Views render `Core::Auth/*` with the Data objects |
| `src/Data/Auth/UpdatePasswordData.php`, `skeleton/app/Http/Controllers/Account/PasswordController.php`, routes (`/account/password`) | create | Change password (current + new, spec §8 rules) in the auth card; writes `password_changed` (audit); the `HasLevel` session rule keeps the current session and revokes others |
| `skeleton/app/Actions/Fortify/ResetUserPassword.php`, `app/Concerns/PasswordValidationRules.php` | modify / delete | Reset uses a Data-based rule set from core (`Yuan\AdminCore\Auth\PasswordRules`); exception lines removed |
| Kit `SecurityController`, `PasswordUpdateRequest`, `pages/settings/security.tsx` | delete | Replaced by change password; exception lines removed. **Profile** (`ProfileController`, `ProfileUpdateRequest`, `ProfileValidationRules`) stays until Phase 07 |
| `src/Http/ErrorPages.php` + one line in `skeleton/bootstrap/app.php` | create / modify | 403/404/419/500/503 render `Core::Errors/Show` with `ErrorPageData(status)` through `AdminLayout` (signed in) or `AuthLayout` (guest); 500 keeps Laravel's debug page while `APP_DEBUG`; 419 offers reload |
| `packages/admin-core/resources/js/pages/Errors/Show.tsx` | create | Derived design (see Screen sources) |
| `skeleton/tests/arch-exceptions.php` | modify | Lines removed for every replaced kit file |

**As built 05c:**
- **Links in Data:** core pages can't import a project's Wayfinder routes, so each `*PageData` / `ErrorPageData` carries the URLs it needs (Fortify route names, `route()` on the server). The shell's project links (profile, change password, logout) still come from the skeleton wrapper.
- **Login takes a username or an email** in one field, as the reference's "Username atau email" shows (the specs are silent): `fortify.username` = `username`; `AuthenticateUser::credentials()` looks the value up in `email` when it contains `@`, else `username`; the failed-login audit uses the same rule.
- **Password rules (spec §8)** now actually apply: `Auth\PasswordRules` (min 10, mixed case, number; `uncompromised()` off; `admin-core.passwords`) set as `Password::defaults()` in the core provider. The kit's own `Password::defaults()` (Laravel default in dev, min 12 + symbols + uncompromised in production) is removed. The hint under new-password fields is generated from the same config.
- **No account enumeration:** "Lupa kata sandi" answers "sent" for unknown emails too (the reference requires it): the skeleton binds Fortify's failed-reset-link response so `INVALID_USER` becomes the success response; throttling still shows its error.
- **Reset link checked on open:** `token_valid` comes from `Password::broker()->tokenExists()` in the reset view, so a used or expired link shows the "Tautan tidak valid" state before the user types anything (a bad token at submit shows it too). After a successful reset Fortify redirects to the login page, which shows the reference's success text as a success alert.
- **Change password** is voluntary, at `/account/password` (`account.password.edit` / `.update`, throttle 6/min), in the auth card with the user card; it writes `password_changed` (log `users`), keeps the current session and ends the others (existing `HasLevel` rule), and flashes "Kata sandi berhasil diubah." The reference describes a **forced** change (after an admin creates or resets the account, no other page until done, only Keluar); no spec or roadmap item covers it, so it isn't built (open question below). The kit's security page, controller, FormRequest and `PasswordValidationRules` are removed; `ResetUserPassword` validates through `ResetPasswordData`. The starter-kit exception list is down to the three Profile files (Phase 07).
- **Sign-in failures** (wrong credentials, inactive account, too many attempts) show as an alert above the form, as in the reference; required-field errors stay inline. The password field is cleared after each attempt. Two reference details are not built: the warning tone and live countdown for "too many attempts" (Fortify only gives the message, with the seconds in it), and a session-expired alert on the login page (frontend-behavior §2 says a revoked session gets the persistent toast, and a 419 gets the error page; behaviour wins).
- **Indonesian server messages:** `skeleton/lang/id/{auth,passwords,validation}.php` (every key of Laravel's English files, plus attribute names and the "different" message for a reused password).
- **Error pages (derived):** the auth layout with the status code in ink over the 2px rule, title, text, and one action: reload for 419 / 503, home (signed in) or login (guest) otherwise. `ErrorPages` shares the core props itself when the request never reached the shared-props middleware (a 419 from CSRF), and `Route::fallback(fn () => abort(404))` sends unknown URLs through the web middleware so the 404 page knows who is signed in (the HTTP tests can't see this: `actingAs()` skips the session; the browser smoke test covers it).
- Kit files removed: auth pages and layouts, `app-logo-icon`, `text-link`, `password-input`, `alert-error`, `ui/{badge,select}`, `use-clipboard`; `ui/checkbox` moved into the package. `ui/alert` now has the soft status tones (`destructive`, `warning`, `info`, `success`).
- Browser smoke test 3: a signed-in 404 shows "Halaman tidak ditemukan" and "Kembali ke Beranda". The login smoke test clicks `button[type=submit]`: `press('Masuk')` matched the card title first.

**Tests 05c:** Fortify views render the core pages with typed props; reset with an invalid token; change password (success + `password_changed` audit, wrong current password, rules, throttle, other sessions revoked and current kept); each error status renders `Core::Errors/Show` with its code for guest and signed-in users, 500 debug page under `APP_DEBUG`; existing auth tests stay green.

---

## Browser verification (end of 05c, recorded here)

With Claude in Chrome against `composer dev`, light and dark, 1440px and 375px, keyboard only:
- Shell: group switch without navigation, collapsed overlay panel (Esc / outside click / navigation), `Ctrl+B` + cookie survives reload with correct first paint, sheet below 1024px, `aria-current`, no horizontal scroll at 375px, rail overflow with 9+ groups (fixture menu).
- Palette: `Ctrl/Cmd+K`, permitted items only, recent pages, empty state, Enter navigates.
- Toast: trigger a success toast, navigate away, press Back; it must not reappear (roadmap acceptance).
- Every auth state and every error code rendered.
- Screenshots of each screen for the owner's review; derived screens are listed for approval, then their README status becomes `✅ approved (browser review)`.

## Acceptance (roadmap)

- [ ] Matches `reference/` for tokens, shell, palette and auth; error pages approved by the owner in the browser.
- [ ] Behaviour per frontend-behavior §2–4; rail state persists; palette shows only permitted items.
- [ ] No horizontal scroll at 375px; fully keyboard-operable.
- [ ] The Back-button toast check passes in a real browser.
- [ ] `composer check` green (incl. `test:built`: `Core::` pages against the real manifest, and the browser smoke tests); `migrate:fresh --seed` and `migrate:rollback` succeed.

## Open questions

**Q1. Translation helper.** AGENTS §6 says user strings go through "the translation helper", but none exists. **Recommended:** a tiny core `t(key, replacements)` over typed dictionaries (`lang/id.ts` default, `lang/en.ts` fallback), locale from `app.locale`; no new dependency. Alternative: Laravel's `lang/*.json` shared as a prop (bigger payload on every visit).

**Q2. Command palette engine.** shadcn's `command` component needs the `cmdk` package (new dependency). **Recommended: add `cmdk`**; it gives the keyboard model, ARIA listbox and fuzzy scoring the behaviour spec asks for. Alternative: hand-rolled list + simple substring match (no fuzzy).

**Q3. Maintenance banner before Settings.** Recommended: add `AppData.maintenance_banner: ?string` now (always null until Phase 07 fills it from Settings), so the banner is wired, not dead code. Alternative: build the banner in Phase 07 with Settings.

**Q4. Spec conflicts to resolve (I'll edit the specs as you decide):**
- frontend-behavior §1 step 1 still says "if the mockup is not approved, stop and ask"; it should follow the new source order. Propose: replace step 1 with the README's order.
- Palette empty text: frontend-behavior §4 says "Tidak ditemukan", the reference shows "Tidak ada hasil". Behaviour spec wins on behaviour, but this is copy; which one?
- ui-design §4.7 puts Change Password in the auth card (as the reference does) while the kit has it under Settings → Security. Plan: auth-card screen at `akun/kata-sandi`, linked from the user menu; the kit's security page goes. OK?

**Q5. Profile page.** The panel's user link and the user menu point to Profil. The kit's profile page (in the exception list) stays as is, inside `AdminLayout`, until Phase 07 replaces it. No profile design exists; restyling it now would be a derived screen. Leave it for Phase 07?

---

## Approval (2026-10-19)

Approved with the split 05a / 05b / 05c, plus a **quick browser review of the shell after 05b**, before 05c starts; the full review stays at the end.

1. Own `t()` helper. The `id` dictionary defines the key type; `en` must have exactly the same keys, checked by `tsc` (a missing key fails the build). Interpolation supported.
2. `cmdk` approved.
3. `AppData.maintenance_banner` is real now: it reads `admin-core.maintenance_banner` (env `ADMIN_MAINTENANCE_BANNER`, default null); Settings overrides it in Phase 07. Both states tested.
4. frontend-behavior §1 now follows the source order; palette empty text is "Tidak ada hasil" (reference wins); change password is an auth-card screen at `/account/password` (English URL paths, Indonesian UI text), replacing the kit's security page. Specs updated.
5. The kit profile page stays, inside the new layout, until Phase 07.

## Shell review (2026-10-20)

Shell OK. Follow-ups, done before 05c:
- Removed the unused `@radix-ui/react-{navigation-menu,collapsible,toggle,toggle-group}` (approved).
- Theme switch in the user menu (all screen sizes).
- Browser smoke tests (`pestphp/pest-plugin-browser` + Playwright, approved): `skeleton/tests/Browser/ShellSmokeTest.php`, group `browser`, run by `composer check` after the build (`test:built`, with the `vite` group): login form → Beranda; shell in dark mode with no JavaScript errors or console logs. Proven: with `useT()` reading `usePage()` again (the 05b blank-page bug) both fail ("Timeout 5000ms exceeded" / "Expected to see text [Beranda]"); reverted. Playwright's Chromium is downloaded once per machine (`npx playwright install chromium`).
- Review copies removed; their two tables rolled back (`migrate:rollback --step=1`, batch 3 held only those); `permissions:sync` removed their permissions. Rule noted: ask before running migrations or seeders on the dev database.

## Full browser review (end of Phase 05)

Screens and states for the owner's review (dev server, light and dark, 1440px and 375px, keyboard only):

| Screen | Source | States to check |
|---|---|---|
| Tokens / shell | reference | rail overflow with 9+ groups (derived), collapse + reload, sheet below 1024px, theme from the user menu |
| Login | reference | default, validation, wrong credentials, inactive account, too many attempts, processing, success after a reset |
| Lupa kata sandi | reference | default, validation, processing, sent (+ resend countdown) |
| Atur ulang kata sandi | reference | default, validation, invalid link |
| Ganti kata sandi | reference (voluntary version) | default, validation (wrong current, reused, mismatch), success toast |
| Error pages | **derived, needs approval** | 403, 404 (guest and signed in), 419, 500, 503 |

## Open questions (05c)

**Q6. Forced password change.** _Answered 2026-10-20: added to Phase 07 (flag, middleware, redirect test, no `@` in usernames); the login countdown went to Phase 09._ The reference's change-password screen is mandatory after an admin creates or resets an account (no other page until done, only Keluar). Not in the specs or roadmap. Add it to Phase 07 (Users: "reset password by admin" sets a flag; a middleware sends the user to `/account/password` until changed)?
