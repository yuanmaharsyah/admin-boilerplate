# Phase 00 — Toolchain & Version Verification

- **Date:** 2026-10-19
- **Roadmap:** [Master Roadmap → Phase 00](./2026-10-16-admin-boilerplate-master-roadmap.md#phase-00--toolchain--version-verification)
- **Spec sections:** design §1, §1.1, §2, §2.1, §8 (`.env.example`), §9
- **Status:** ☑ done 2026-10-19 (step 1 blocked on Inertia 3 → resolved by D17–D19, see Findings and Execution notes)

## Goal

An empty but fully gated monorepo: `packages/admin-core` (Testbench) + `skeleton/` (Laravel 13 React starter kit) wired by a Composer path repository, one root `composer check` running every gate from spec §9, and spec §1.1 filled with verified versions. No feature code (that starts in Phase 01).

## Local toolchain (checked 2026-10-19)

| Tool | Found | Required |
|---|---|---|
| PHP | 8.3.35 (pdo_mysql, pdo_sqlite, intl, zip, gd) | 8.3+ ✅ |
| Composer | 2.8.9 | 2.x ✅ |
| Node / npm | 22.16.0 / 10.9.2 | Node 22 LTS ✅ |
| MySQL | 8.4 client (Homebrew) | MySQL 8 ✅ |
| git | 2.49.0, repo initialised | needed by gate 3 (`git diff --exit-code`) ✅ |
| Laravel installer | 5.15.0 (old) | not used; skeleton created with `composer create-project` so nothing global is upgraded |

## Files to create or modify

| Path | Action | Purpose |
|---|---|---|
| `composer.json` (root) | create | Scripts only, no dependencies: `setup`, `check`. Root is not an app |
| `.gitignore` (root) | create | `vendor/`, `node_modules/`, `.env`, `.DS_Store`, build output, caches |
| `.editorconfig` (root) | create | Shared indentation rules for PHP/TS/MD |
| `packages/admin-core/composer.json` | create | `yuan/admin-core`, PSR-4 `Yuan\AdminCore\` → `src/`, tests namespace, dev deps (below) |
| `packages/admin-core/phpunit.xml` | create | Testbench suite |
| `packages/admin-core/phpstan.neon` | create | Larastan level 8, paths `src`, `tests`; **no baseline** |
| `packages/admin-core/pint.json` | create | Laravel preset + `declare_strict_types` |
| `packages/admin-core/tests/Pest.php`, `tests/TestCase.php` | create | Pest bound to Testbench `TestCase` |
| `packages/admin-core/tests/Feature/TestbenchBootsTest.php` | create | Smoke test (see Tests) |
| `packages/admin-core/tests/ArchTest.php` | create | Hygiene arch preset (strict types, no `dd`/`dump`/`ray`/`var_dump`, no `env()` outside config) |
| `packages/admin-core/CHANGELOG.md` | create | `## [Unreleased]` header only |
| `skeleton/` | create | `composer create-project laravel/react-starter-kit` (Laravel 13, Inertia, React, TS, Tailwind 4, shadcn, Pest) |
| `skeleton/composer.json` | modify | Path repository `../packages/admin-core` (`symlink: true`), `require yuan/admin-core:@dev`, dev deps (below), scripts `setup`/`check:*` |
| `skeleton/phpstan.neon` | create | Larastan level 8 (baseline allowed here only if starter-kit code needs it; generated, not hand-written) |
| `skeleton/pint.json` | create | Same rules as the package |
| `skeleton/tests/ArchTest.php` | create | Same hygiene arch rules as the package |
| `skeleton/package.json` | modify | Scripts `typecheck` (`tsc --noEmit`), `lint` (`eslint . && prettier --check resources/`), `format` (`prettier --write resources/`), `build` |
| `skeleton/tsconfig.json` | modify | Confirm `strict: true`, add `@admin-core` path alias only if trivial (otherwise Phase 01) |
| `skeleton/config/app.php` | modify | `timezone` → `env('APP_TIMEZONE', 'UTC')` (L11+ hardcodes UTC, so the env key would be ignored otherwise) |
| `skeleton/phpunit.xml` | modify | `DB_CONNECTION=mysql`, `DB_DATABASE=admin_boilerplate_test` (decision 1) |
| `skeleton/.env.example` | modify | MySQL connection keys, `APP_TIMEZONE=Asia/Jakarta`, `APP_LOCALE=id`, `QUEUE_CONNECTION=database`, `SENTRY_LARAVEL_DSN=`, `HEALTH_TOKEN=` |
| `docs/specs/2026-10-16-admin-boilerplate-design.md` | **proposed** edit to §1.1 only | Fill verified versions table (spec explicitly reserves §1.1 for Phase 0). Shown in the report before saving |
| `docs/plans/2026-10-16-admin-boilerplate-master-roadmap.md` | modify | Tick Phase 00 boxes |
| `DEVELOPER.md` | modify | §7 Commands: `composer setup`; §8 troubleshooting row if any setup gotcha appears |

## Dependencies to add (approval of this plan = approval of this list)

**Package `packages/admin-core` (require-dev only in Phase 00):**
`orchestra/testbench`, `pestphp/pest`, `pestphp/pest-plugin-arch`, `pestphp/pest-plugin-laravel`, `larastan/larastan`, `laravel/pint`.
Runtime `require`: `php: ^8.3`, `illuminate/support: ^13.0` only.

**Skeleton (on top of what the starter kit ships):**
- require: `yuan/admin-core:@dev` (path repo).
- require-dev: `larastan/larastan`, `pestphp/pest-plugin-arch` (Pest, Pint, ESLint, Prettier, TS already come with the starter kit).

**Not installed in Phase 00** — only version-verified for §1.1: laravel-data, typescript-transformer, laravel-permission, laravel-activitylog, laravel-query-builder, maatwebsite/excel, laravel-health, sentry-laravel, TanStack Table, cmdk, sonner, recharts, lucide-react (if not already in the kit). Each is installed by the phase that first uses it.

## Steps

1. **Version verification** (read-only, before any install):
   - For each Composer package in spec §1: `composer show -a <pkg>` → latest stable, and its `illuminate/*` / `laravel/framework` constraint includes `^13`.
   - For each npm package: `npm view <pkg> version peerDependencies` → React 19 compatible.
   - Inertia: confirm the L13 React starter kit ships **Inertia 2** (spec D2). If it ships anything else, stop and report the version plus support for deferred props, `router.reload({ only })` and `preserveState` (decision 3).
   - Wayfinder: stable (non-`0.x`/beta) release supporting L13? If not → fallback rule (Ziggy + generated route-name types) and propose a new decision-log row.
   - Any other package without L13 support → **stop and report**, do not continue.
2. Add root `.gitignore` (repo is already a git repository).
3. Create `skeleton/` via `composer create-project laravel/react-starter-kit skeleton` (pin the resolved version in the report). Confirm Pest is the test runner; convert if the kit ships PHPUnit-only.
4. Create `packages/admin-core` files listed above; `composer install` inside it.
5. Wire the path repository in `skeleton/composer.json`; `composer require yuan/admin-core:@dev`; confirm `vendor/yuan/admin-core` is a symlink.
6. Add Larastan + arch plugin to the skeleton; configure phpstan level 8. If starter-kit code fails level 8, fix the code where it's small; generate a skeleton baseline only for what remains (allowed by spec §9) and list it in the report.
7. `.env.example` + `config/app.php` timezone change.
8. npm scripts `typecheck` / `lint` / `build`; `npm install`.
9. Root `composer.json` scripts:
   - `setup`: `composer install` in package + skeleton, `npm install` in skeleton, copy `.env`, `key:generate`, `migrate --seed` (MySQL from `.env`), create `admin_boilerplate_test` DB if missing.
   - `check` (fail fast, spec §9 order):
     1. `pint --test` (package, skeleton)
     2. `phpstan analyse` (package, skeleton)
     3. `wayfinder:generate` → `git diff --exit-code` on generated paths (`typescript:transform` joins in Phase 02)
     4. `npm run typecheck`
     5. `npm run lint`
     6. `pest` (package Testbench) then `php artisan test` (skeleton)
     7. `npm run build`
10. Fresh-clone rehearsal: copy the repo to the scratch dir (excluding `vendor`, `node_modules`, `.env`), run `composer setup && composer check` there.
11. Manual login check: `composer dev`, register/login with the starter-kit flow; the starter kit's auth feature tests also cover it in `check`.
12. Fill spec §1.1 (shown as a proposed diff in the report), update DEVELOPER.md, tick roadmap + this plan.

## Tests to add

| Test | Where | Proves |
|---|---|---|
| `TestbenchBootsTest` | package | Testbench boots an L13 app; `app()->version()` starts with `13.` |
| `ArchTest` (hygiene) | package + skeleton | `declare(strict_types=1)`, no `dd`/`dump`/`ray`/`var_dump`, no `env()` outside `config/` (spec §9.1 "Arch: hygiene"; the full §9.1 suite is Phase 04) |
| Starter-kit auth tests | skeleton (shipped) | Login / logout / registration work — covers "Login works in the skeleton" |
| Gate self-check | manual, recorded in report | Break each gate once (unformatted file, phpstan error, TS error, lint error, failing test, generated-file diff) → `composer check` fails at that step; revert |

## Acceptance (from roadmap)

- [x] Fresh clone → `composer setup` → `composer check` passes.
- [x] Login works in the skeleton.
- [x] Spec §1.1 filled in.

## Checklist

- [x] Versions verified (Composer + npm), Inertia version confirmed, Wayfinder decision made
- [x] Root `.gitignore`
- [x] `skeleton/` created from the L13 React starter kit
- [x] `packages/admin-core` with Testbench, Pest (+arch), Larastan 8 (no baseline), Pint
- [x] Path repository symlink working
- [x] Skeleton: Larastan 8, Pest arch, ESLint, Prettier, TS strict
- [x] `.env.example` keys + timezone config
- [x] Root `composer setup` / `composer check`
- [x] Each gate proven to fail when broken
- [x] Fresh-clone rehearsal green
- [x] Spec §1.1 filled (approved)
- [x] DEVELOPER.md updated; roadmap ticked

## Decisions (answered 2026-10-19)

1. **Database:** package tests (Testbench) use SQLite in-memory. Skeleton tests use MySQL 8 with a dedicated `admin_boilerplate_test` database, and `composer check` runs them. `.env.example` uses MySQL.
2. **Gate 3:** Wayfinder only for now; `typescript:transform` is added in Phase 02. No placeholder steps.
3. **Inertia:** if the starter kit ships anything other than Inertia 2, stop and report the version shipped and whether deferred props, partial reloads (`router.reload({ only })`) and `preserveState` exist in it.
4. **Spec §1.1:** fill it and show the diff. Every other spec change stays a proposal.
5. **Prettier:** `npm run lint` = `eslint . && prettier --check`; `npm run format` writes.

## Findings — step 1 (2026-10-19, stopped here per decision 3)

Checked against Packagist / npm / the starter kit's `main` branch. Nothing installed.

| Package | Latest stable | L13 | PHP | Note |
|---|---|---|---|---|
| laravel/framework | v13.37.0 | ✅ | ^8.3 | |
| laravel/react-starter-kit (`main`) | — | ^13.17 | ^8.3 | **Inertia 3**, PHPUnit (no Pest), `vite-plus` (`vp check`) instead of ESLint/Prettier, Fortify + passkeys |
| inertiajs/inertia-laravel | v3.5.1 | ✅ | ^8.2 | v2 line: v2.0.28 (2026-09-25) still supports L13 |
| @inertiajs/react | 3.9.1 | — | — | v2 line: 2.3.29 |
| laravel/wayfinder | **v0.1.23** | ✅ | ^8.2 | **No stable 1.x** → spec §1 fallback rule triggers |
| spatie/laravel-data | 4.23.0 | ✅ | ^8.1 | |
| spatie/laravel-typescript-transformer | 3.3.0 | ✅ | ^8.2 | |
| spatie/laravel-permission | 8.3.0 | ✅ | ^8.3 | |
| spatie/laravel-activitylog | 5.1.2 | ✅ | **^8.4** | 4.12.3 supports L13 on PHP 8.3 |
| spatie/laravel-query-builder | 7.3.6 | ✅ | **^8.4** | 7.3.5 supports PHP 8.3 |
| maatwebsite/excel | 4.0.4 | ✅ | ^8.3 | |
| spatie/laravel-health | 1.40.2 | ✅ | ^8.2 | |
| sentry/sentry-laravel | 4.29.0 | ✅ | any 8 | |
| pestphp/pest (+arch, +laravel) | v5.3.3 / v5.0.0 / v5.0.1 | ✅ | **^8.4** | 4.7.8 / 4.0.2 / 4.1.0 support PHP 8.3 |
| larastan/larastan | v3.13.0 | ✅ | ^8.2 | |
| laravel/pint | v1.32.1 | — | ^8.3 | |
| orchestra/testbench | v11.3.0 | ^13.32 | ^8.3 | |
| @tanstack/react-table, cmdk, recharts, sonner, lucide-react | 9.3.1, 1.1.1, 3.10.1, 2.0.8, 1.59.0 | — | — | all React 19 compatible |

**Inertia 3 feature check** (from `@inertiajs/core@3.9.1` / `@inertiajs/react@3.9.1` type definitions and `inertia-laravel` v3.5.1 source):
- Deferred props: ✅ `Inertia::defer(callable, group)` server side; `<Deferred>` component in React; `deferredProps` in page object.
- Partial reloads: ✅ `router.reload(options)` with `only` / `except` (`ReloadOptions = Omit<VisitOptions, 'preserveScroll' | 'preserveState'>`; reload always preserves state).
- `preserveState`: ✅ on visits, `<Link>` and `<Form>` options.

## Execution notes (2026-10-19)

Approved after the findings: Inertia 3 (D17), keep Wayfinder `^0.1.23` (D18), PHP 8.4 minimum (D19), Pest + ESLint + Prettier as in spec §1. Where execution differed from the plan above:

- **PHP:** local CLI switched to 8.4.26 through the existing `phpv` switcher (`~/.phpv` 8.3 → 8.4). Web PHP-FPM 8.3 untouched. Package and skeleton require `php: ^8.4`.
- **Skeleton source:** Packagist's tagged `laravel/react-starter-kit` is stale (v1.0.1, Laravel 12), so `composer create-project laravel/react-starter-kit:dev-main` was used. Starter-kit feature selection (`install:features`): none of registration, email verification, 2FA, passkeys, password confirmation — the auth mockup lists only login, forgot, reset and change password, and 2FA is out of scope (spec §10). `laravel/chisel` removed afterwards.
- **Starter-kit cleanup:** vite-plus → plain `vite` + ESLint 10 + Prettier (`eslint.config.js`, `.prettierrc`, `.prettierignore`); PHPUnit → Pest 5 (class-based kit tests kept, they run under Pest); kit `.github/` CI (D10), `pnpm-workspace.yaml`, example tests and `post-create-project-cmd` (SQLite) removed; Wayfinder output un-ignored so gate 3 can diff it. `pestphp/pest-plugin-arch` comes in through Pest 5, so it is not a direct dependency.
- **Larastan level 8, no baseline in either root.** Fixed kit code instead: chisel left an empty `withTwoFactor(): static {}` in `UserFactory`; nullable `$request->user()` replaced by `#[CurrentUser] User` in `ProfileController`, `SecurityController`, `ProfileUpdateRequest`; `ProfileValidationRules` docblocks corrected to the real `Unique|string` type. 2FA leftovers removed: `TwoFactorAuthenticationRequest`, the `two_factor_*` model properties and hidden attributes, and the 2FA-only tests (the security-page test now asserts the page without 2FA).
- **Generated-files gate:** `git diff --exit-code` alone ignores untracked files, so `check:generated` also fails on untracked files in the Wayfinder output dirs. The generated files are staged (`git add`), not committed.
- **Setup:** `composer setup` creates both MySQL databases via `migrate --force` (app DB + `@putenv DB_DATABASE=admin_boilerplate_test`). The DB user needs rights on both. Setup is first-run only: re-running it fails at the seeder (duplicate `test@example.com`).
- **Package Testbench DB:** Testbench's default `testing` connection is already SQLite `:memory:`; the smoke test asserts it, so `phpunit.xml` sets no DB env.

### Gate self-check (each break applied alone, `composer check` run, then reverted)

| Break | Failed at |
|---|---|
| Unformatted PHP in package tests | gate 1 `pint --test` (package) |
| `return 'x'` from an `int` function (package) | gate 2 `phpstan analyse` |
| New route not committed | gate 3 `check:generated` |
| `const n: number = 'x'` | gate 4 `npm run typecheck` |
| `export const v: any` | gate 5 `npm run lint` (ESLint) |
| Missing semicolon | gate 5 `npm run lint` (Prettier) |
| `expect(true)->toBeFalse()` in package | gate 6 `pest` (package) |
| Same in skeleton | gate 6 `php artisan test` (skeleton) |
| Vite input pointing at a missing entry | gate 7 `npm run build` |

### Acceptance evidence

- Fresh-clone rehearsal (copy without `vendor`, `node_modules`, `.env`, build output, committed into a new git repo, `.env` from `.env.example` plus DB credentials): `composer setup` exit 0, `composer check` exit 0, git clean afterwards; 25 s with warm caches.
- Login over HTTP against `php artisan serve`: `GET /login` 200 → `POST /login` 302 → `/dashboard` 200 as the seeded user. Skeleton auth tests (login, logout, password reset) pass on MySQL.
- `migrate:fresh --seed`, `migrate:rollback`, `migrate --seed` succeed.
