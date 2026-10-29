# Open-Source Preparation (B and C)

- **Date:** 2026-10-29
- **Requested:** owner, 2026-10-26 (B: open-source files and distribution; C, revised: the READMEs, proved by following them)
- **Status:** reviewed 2026-10-29; review changes made; merged into `master`. Repository visibility, the Packagist submissions, the `admin-skeleton` repository and the `v1.0.0` release are the owner's.

## Decisions (owner, 2026-10-26)

- The Packagist vendor `yuan` belongs to someone else: the package is renamed `yuanmaharsyah/admin-core` before `v1.0.0` (the PHP namespace `Yuan\AdminCore` stays).
- `composer create-project` runs before the user has database credentials, so `post-create-project-cmd` does everything except `composer setup` and prints the next steps.
- The main public repository will be `github.com/yuanmaharsyah/admin-boilerplate` (homepage and support URLs).

## B. Open-source files and distribution

- [x] `LICENSE` (MIT, © 2026 Yuan Maharsyah) in the root, the package and the skeleton; `SECURITY.md` (GitHub private vulnerability reporting); `CONTRIBUTING.md` (fork → branch → `composer check` → PR, commit format, the plan workflow); issue forms and a PR template; `.github/workflows/tests.yml` (MySQL 8.4 service, `composer setup`, Playwright Chromium, `composer check`; it runs for the first time when the repository is on GitHub).
- [x] Packagist metadata for `yuanmaharsyah/admin-core` (MIT, keywords, homepage, support, author) and `yuanmaharsyah/admin-skeleton`; the package README is a short pointer to the main repository, with private forks over SSH.
- [x] The public skeleton: `bin/release` also publishes `skeleton/` to the `admin-skeleton` remote (`git@github.com:yuanmaharsyah/admin-skeleton.git`, **to be created by the owner, empty**) as one snapshot commit per release on top of the previous one. The snapshot's `composer.json` comes from `bin/skeleton-composer.php`: the package from Packagist (`^X.Y`, an rc exactly), no path repository (Composer refuses a path repository whose folder is missing, even with a wildcard), and `post-create-project-cmd` (`.env`, `key:generate`, `admin:remove-demo`, `boost.json` + `CLAUDE.md`, `boost:install`, the next steps). Without `composer.lock`, which pins the path package.
- [x] `composer test:release` (skeleton `CreateProjectTest`, group `release`): a real `composer create-project` from local path repositories, in a clean environment (the test process's `phpunit.xml` and `.env` variables would hide Boost's commands and keep `key:generate` from writing a key); `bin/release` refuses to push when it's red. `ReleaseScriptsTest` covers the skeleton remote's tag refusal, the red `test:release` refusal, the published snapshot and a second release stacked on the first.
- [x] Install docs: public users get the package from Packagist over HTTPS; SSH/VCS for private forks (package README, UPGRADE.md, the `admin-upgrade-core` and `admin-deploy` skills). `bin/new-project` stays for the owner and private forks.

## C. READMEs

- [x] `README.md` and `README.id.md` (written in Indonesian, not translated line by line): what it is, five concepts, Getting Started a–j (each step: why, the command, "You should see", "If not"), task guides in `<details>`, AI, cheat sheet, troubleshooting, contributing / security / license; a table of contents and back-to-top links; badges and a language switch.
- [x] `BoostDocsTest` also checks both READMEs (every command, composer script, config key, class, method, constant, trait, component and path they name exists), and that the two stay in sync (identical code blocks in the same order, the same sections, steps and collapsibles, links to each other). Only in this repo.

## Proof: README.md followed literally

In an empty folder (`../readme-proof`), with local path repositories in place of Packagist and the two rehearsal databases in place of step c's `CREATE DATABASE` (agreed).

| Step | Worked as written? | Fix |
|---|---|---|
| a. Requirements | Yes | — |
| b. create-project | Yes (11 s, "Next: …" printed) | — |
| c. Database + `.env` | Yes (the file edits) | — |
| d. `composer setup`, `composer dev` | Setup yes. `composer dev` printed a red **SSR ERROR** (`document is not defined`): the Inertia Vite plugin tries server-side rendering in dev, which an admin behind a login doesn't use | `inertia({ ssr: false })` in the skeleton's `vite.config.ts` |
| e. Sign in, change the password | No: `http://127.0.0.1:8000` is Laravel's public welcome page, not the sign-in form | README: `http://127.0.0.1:8000/login`; the change-password fields and success message spelled out |
| f. Name and logo | Saved, but the logo was a broken image (no `public/storage` link in a fresh project); after the save the form still said "unsaved changes" | `composer setup` runs `storage:link`; Settings bug fixed (below) |
| g. make:module | Yes; but `tahun:integer` showed "2.022" (integers get a thousands separator) | README example uses `jumlah_kursi:integer`; the generator fix is on the Post-v1 list |
| h. Level access, test as the user | Mostly: the seeded Operator also has View on Beranda, Users and Log Aktivitas, so "Beranda and Kendaraan only" was wrong; the groups of Levels and Users weren't named | README: the real expected menu, the groups, the password confirmation, `/login` after signing out |
| i. git | Yes | — |
| j. Update | Yes; on the latest version Composer prints "Nothing to install, update or remove" | README names both outputs |

The README-made project's own `composer check` is green (PHPStan 0, 195 tests, 11 built tests).

**Bug found and fixed: Pengaturan.** A save redirects back to the same page, so the tab's form kept its old state: still "dirty" (a leave-page warning for saved changes) and still holding the old `lock_version`, so **a second save on the same tab without reloading failed as a stale update (409)**. The form is now keyed by the tab's `lock_version`. Browser test `skeleton/tests/Browser/SettingsTest.php` (two saves in a row) fails without the fix and passes with it.

## After the review (owner, 2026-10-29)

- [x] `make:module` field type `year`: `unsignedSmallInteger`, `between:1900,2100`, no thousands mark in list, detail and form (`NumberField` `grouping={false}`, `formatNumber(…, useGrouping)`), real years in the factory (`numberBetween(1990, now()->year)`). The README's first module (`tahun:year`), the field-type tables, the `admin-make-module` skill and the `Sample` golden module use it; the Post-v1 factory item is gone.
- [x] Seeded Operator level: `dashboard.view` plus the `view` permission of the project's own (non-core) modules; never Users, Levels or the activity log. Package `AdminCoreSeederTest` (a core fixture module is left out) and skeleton `SeederTest` (the exact list); README step h's expected menu is back to Beranda and Kendaraan only.
- [x] Decision D22 in the design spec: CI added for the public release (reverses D10).

## Deferred / for the owner

- Create `yuanmaharsyah/admin-skeleton` (empty) on GitHub; submit both packages to Packagist after the repositories are public.
- The CHANGELOG's `[1.0.0]` date (2026-10-26) predates these changes; set it to the release date before `composer release -- 1.0.0`.
- [x] Step 6, the public repository (2026-10-29): a history-free export of `v1.0.0` without `docs/design-implementation/reference/` and `briefs/` (gitignored here; AGENTS.md, DEVELOPER.md and the design manifest mark them private and optional), one commit "Initial public release v1.0.0", tag `v1.0.0`. Safety scan of the exported files: no secrets, real credentials, home paths, personal emails, client names or real IPs; the only binaries are the skeleton's Laravel favicons from the starter kit. `bin/release` now runs from this repository (it refuses another `origin`) and publishes the package like the skeleton, as one snapshot commit on top of the previous release (a `git subtree split` here would not share `yuan-admin-core`'s history).
