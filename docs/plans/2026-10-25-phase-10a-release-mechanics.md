# Phase 10a — Release Mechanics (v1.0.0)

- **Date:** 2026-10-25
- **Roadmap:** [Master Roadmap → Phase 10a](./2026-10-16-admin-boilerplate-master-roadmap.md#phase-10a--release-mechanics-v100) (fast track: 08 → **10a** → first project → 09)
- **Spec sections:** design spec §1.1 (versions), §2 (package + skeleton), §9 (quality gates); AGENTS §1, §2, §7; DEVELOPER R1–R20, §7
- **Status:** approved 2026-10-25 (incl. `laravel/boost ^2.10` and the 10a-1/2/3 split); 10a-1, 10a-2 and 10a-3 done; `v1.0.0` ready for the owner's release

## Scope

Everything needed to cut `yuan/admin-core` v1.0.0 from this monorepo and start a client project from it with one script:

1. `composer release {version}`: subtree split of `packages/admin-core` into its private repository, tagged.
2. `CHANGELOG.md` `[Unreleased]` → `[1.0.0]`, `UPGRADE.md` gains the 1.0.0 section.
3. `admin:remove-demo`: drops the demo and golden modules from a new project.
4. `bin/new-project`: copy the skeleton, require the package from the private VCS repo, remove the demo, set up.
5. AI docs shipped in the package through Laravel Boost: one guideline (condensed AGENTS.md for projects) and one skill per recipe, with a drift test.
6. Release rehearsal from the tagged VCS release.

**Added to the roadmap scope by this request (owner, 2026-10-25):** item 5 (Boost) and two rehearsal steps (perf group, Claude Code uses a skill). The roadmap's 10a list gets these lines when the plan is approved.

**Out of scope:** `admin:docs`, README, `admin:eject` (Post-v1); Phase 09 (health, Sentry, headers). The skill for R8 (health check) is added in Phase 09 (on the 09 roadmap), since the drift test would fail on a check that doesn't exist yet.

## Split

| Part | Scope | Commit |
|---|---|---|
| **10a-1: Release and new project** | `composer release` (+ `--dry-run`), skeleton `composer check` / `setup`, `admin:remove-demo`, `bin/new-project`, CHANGELOG / UPGRADE | `feat(release): composer release, new-project script, admin:remove-demo` |
| **10a-2: AI docs** | Boost dependency, guideline, skills, drift test, DEVELOPER.md recipes pointing to the skills | `feat(core): ship AI guidelines and skills through Laravel Boost` |
| **10a-3: Rehearsal and tag** | `v1.0.0-rc.1` → rehearsal → fixes → `v1.0.0` (Q5) | `docs(plan): phase 10a rehearsal` (+ any `fix(...)`) |

One review stop after 10a-2 (read the guideline and two skills), then the rehearsal with the owner.

---

## Part 10a-1 — Release and new project

### Files

| Path | Action | Purpose |
|---|---|---|
| `bin/release` | create | Bash. `composer release 1.0.0` (root script passes the argument). Refuses, in this order: no argument or not SemVer (`X.Y.Z` or `X.Y.Z-rc.N`); `git status --porcelain` not empty; tag `v{version}` exists locally or on the `admin-core` remote; `packages/admin-core/CHANGELOG.md` has no `## [{version}]` heading (rc tags check `[Unreleased]` is non-empty instead); `composer check` red. Then: `git subtree split --prefix=packages/admin-core -b release/admin-core`, push it to the `admin-core` remote's `main`, tag the split commit `v{version}` and push the tag; tag the monorepo `v{version}` too (the skeleton copied by `bin/new-project` comes from the same tag). Prints the two tags. `--dry-run`: every check runs (the `composer check` step too, unless `--skip-check`, which only the test uses), then it prints the split / push / tag commands instead of running them. The remote URL defaults to `git@github.com:yuanmaharsyah/yuan-admin-core.git`; the script adds the `admin-core` remote when it's missing. |
| `composer.json` (root) | modify | `release` script → `bin/release`; `check` becomes: package lint / psr / analyse / test, `npm run icons` + the `lucide.json` part of `check:generated`, then `@composer --working-dir=skeleton check` (no gate dropped: the same steps, the skeleton half moved into the skeleton) |
| `skeleton/composer.json` | modify | New `check` (lint, strict psr, analyse, `typescript:transform`, `wayfinder:generate`, `check:generated` over the skeleton's generated paths, `npm run typecheck`, `npm run lint`, test, build, `test:built`), so a project has `composer check` of its own. `setup` aligned with the root's: `.env` copy, `APP_KEY` only when empty, `migrate --seed`, the test database (`DB_DATABASE` from `phpunit.xml`), types, routes, `npm ci`, build |
| `skeleton/app/Console/Commands/RemoveDemoCommand.php` | create | `admin:remove-demo` (Q1: in the skeleton, not the package). Fixed list: `modules/{Invoice,Customer,Sample,SampleReadonly,SampleAdmin}`, the skeleton tests that use them (below), `tests/Fixtures/{GoldenModules,regenerate-sample,FailingExport}.php`, the `sample:regenerate` composer script. Steps: if the database is reachable and a demo migration ran, `migrate:rollback --path=` each demo module's migrations (drops `invoices`, `customers`, `samples`, `sample_admins`, `sample_readonlies`; attachments rows of those types are deleted with their files); delete the folders and files; `permissions:sync` (removes the demo permissions and their level grants); `modules:clear`. No database (before `setup`): the file part only, and it says so. Audit rows about demo records stay (append-only). `--dry-run` lists what it would do. Last, it deletes itself and its own test. Confirms first unless `--force` |
| `skeleton/tests/Feature/RemoveDemoTest.php` | create | `--dry-run` lists exactly the folders, files, tables and permissions above and changes nothing; every listed path exists (the list can't drift from the repo). The real run is proven by the rehearsal (deleting the repo's own modules in a test is not safe) |
| `bin/new-project` | create | Bash. `bin/new-project ../client-x --db=client_x [--ref=v1.0.0] [--repo=<vcs url>] [--dry-run]`; `--repo` defaults to `git@github.com:yuanmaharsyah/yuan-admin-core.git`. Steps: refuse an existing non-empty target; `git archive {ref}:skeleton` into the target (only committed files, no `.env`, `vendor`, `node_modules`); `composer config` swaps the path repository for the VCS one and `composer require yuan/admin-core:^{major}.{minor}` (rc: `@RC`); writes `.env` from `.env.example` with `DB_DATABASE={db}`, `APP_NAME`, and `phpunit.xml` `DB_DATABASE={db}_test`; `php artisan admin:remove-demo --force`; `composer setup` (creates both databases, seeds, builds); `php artisan boost:install` (confirmed: the script runs it; added in part 2); `git init` + first commit. Prints the elapsed time and the seeded Super Admin usernames. `--dry-run`: validates the arguments and the ref, prints every step, writes nothing |
| `skeleton/.env.example` | modify | `ADMIN_CORE_REPO` comment only if Q2 picks an env var; otherwise unchanged |
| `packages/admin-core/CHANGELOG.md` | modify | `[Unreleased]` → `[1.0.0] - {date}` at the final tag, empty `[Unreleased]` above it; entries for this phase (Boost docs, `composer check` in the skeleton) |
| `packages/admin-core/README.md` | create | The split repo's front page: what the package is, new project with `bin/new-project`, **access**: developers use their own SSH key with read access to the private repo; production servers use a read-only deploy key on it (`~/.ssh/config` host alias if a server needs more than one); `auth.json` is never committed (already in the skeleton's `.gitignore`) |
| `packages/admin-core/UPGRADE.md` | modify | The access paragraph (pointing to README), standard steps gain `php artisan boost:update` (run by `post-update-cmd`) and committing the regenerated AI files; `## 1.0.0`: first release, nothing to do |

**Skeleton tests deleted by `admin:remove-demo`** (they exercise core behaviour through the demo modules; the boilerplate repo keeps running them, so coverage of the core is unchanged): `tests/Feature/{GoldenModulesTest,HomeRedirectTest,DatabaseQueueTest}.php`, `tests/Feature/Account/DownloadsTest.php`, `tests/Browser/{DataTableRowMenuTest,FilesTest,DataTableSelectionTest,ShellSmokeTest,FormsTest,DataTableColumnsTest}.php`. `tests/Performance/AuditSummaryPerformanceTest.php` only mentions "Invoice" in a label string and stays (the rehearsal runs it). Core-module tests under `vendor/yuan/admin-core/modules/*/Tests` keep running in the project.

### Steps

1. Skeleton `check` + `setup`; root `check` delegates; `composer check` green from the root (same gates, same order of failure).
2. `admin:remove-demo` + its test.
3. `bin/release` + `ReleaseScriptsTest` (temporary repo + bare remote).
4. `bin/new-project` + its cases in the same test.
5. CHANGELOG / UPGRADE.

### Tests

- `RemoveDemoTest` (above).
- `skeleton/tests/Feature/ReleaseScriptsTest.php` (as built: one file for both scripts; the skeleton suite has Pest; it runs `../bin/release` with `Process`): builds a temporary git repo (a minimal `packages/admin-core` with a CHANGELOG, plus a bare repo as the `admin-core` remote) and asserts each refusal with its message and a non-zero exit: bad SemVer, dirty tree, existing tag (local and on the remote), missing CHANGELOG heading, red check (a `composer.json` whose `check` script exits 1); and a clean `--dry-run` that exits 0, prints the split / push / tag commands and pushes nothing.
- Same file, `bin/new-project --dry-run`: refuses a non-empty target, a missing `--db` and an unknown `--ref`; a good run prints every step (archive, repository swap, require, `.env`, `admin:remove-demo`, `composer setup`, `boost:install`, `git init`) and creates nothing.
- Both tests are removed by `admin:remove-demo` in a project (the scripts aren't copied).

**10a-1 as built:**

- [x] Skeleton `composer check` and `setup` (setup: `APP_KEY` only when empty, `migrate --seed`, the test database named in `phpunit.xml`); the root `check` runs the package gates, `npm run icons` + `check:icons`, then the skeleton's `check`; the root `setup` installs the package and calls the skeleton's.
- [x] `admin:remove-demo` (`skeleton/app/Console/Commands/RemoveDemoCommand.php`): `--dry-run`, `--force`; rolls back only the demo migrations that ran (each file's `down()`, then its `migrations` row), deletes the attachment rows of the demo models (files go with `admin:attachments-sweep`), runs `modules:clear` and `permissions:sync` in a fresh process. `RemoveDemoTest`.
- [x] `bin/release`: added `--yes`; without it the script asks before pushing (refuses when stdin isn't a terminal). Found while testing: `composer release 1.0.0 --dry-run` swallows `--dry-run` and would release for real, so the documented form is `composer release -- 1.0.0 --dry-run` and the question is the safety net. The split is pushed as `main` + tag on the remote without a local tag (the monorepo's own `v{version}` tag would clash).
- [x] `bin/new-project`: the VCS repository uses `"no-api": true` (plain git over SSH, so a deploy key works; no GitHub token); `--name` sets `APP_NAME`; an rc tag is required exactly, a release as `^X.Y`. `boost:install` joins in 10a-2.
- [x] One test file for both scripts, `ReleaseScriptsTest` (21 cases, ~5 s): every refusal, the question, a dry run that pushes nothing, a real run against the bare remote (split tree, `main` = tag, local tag), and the `new-project` dry runs.
- [x] Package `README.md` (access: developer SSH keys; servers: read-only deploy key, `~/.ssh/config` alias + `git config url.….insteadOf`, so `composer.json` is the same everywhere; never `auth.json`), `UPGRADE.md` access section + `## 1.0.0`, CHANGELOG line. `[Unreleased]` → `[1.0.0]` waits for the final tag (10a-3).
- [x] DEVELOPER.md §7 (`composer check`, `composer release`, `bin/new-project`, `admin:remove-demo`) and R10 step 4.

## Part 10a-2 — AI docs through Laravel Boost

Boost loads third-party package guidelines from `vendor/{package}/resources/boost/guidelines/core.blade.php` and skills from `resources/boost/skills/{name}/SKILL.md` into the project's agent files (`CLAUDE.md` / `AGENTS.md`, `.claude/skills/`) on `boost:install` / `boost:update`. Step 1 verifies this against the installed version before anything is written.

### Files

| Path | Action | Purpose |
|---|---|---|
| `skeleton/composer.json` | modify | **New dependency (needs approval):** `laravel/boost ^2.10` in `require-dev` (latest v2.10.3; requires `illuminate/* ^13.0`, `laravel/mcp`, `laravel/roster`). `post-update-cmd` gains `boost:update`, guarded by `file_exists('boost.json')` so the monorepo skeleton (no `boost.json`) never writes agent files under `skeleton/` |
| `docs/specs/2026-10-16-admin-boilerplate-design.md` §1.1 | modify (proposed) | Row for `laravel/boost` with the verified version |
| `packages/admin-core/resources/boost/guidelines/core.blade.php` | create | Condensed AGENTS.md for a client project (about 120 lines): the workflow (plan in chat, `composer check` green, report), module contract, RBAC, backend, frontend and testing rules, forbidden list; with project paths (`modules/`, `vendor/yuan/admin-core` read-only, customize through R9) and without the monorepo-only parts (phase plans, roadmap, design-implementation sources, CHANGELOG / release rules, `packages/` paths). Ends with "use the `admin-*` skills for recipes" |
| `packages/admin-core/resources/boost/skills/*/SKILL.md` | create | One skill per project recipe, converted from DEVELOPER.md (frontmatter `name`, `description` saying when to use it; body = the recipe steps + the commands + the example module path in the package). List below |
| `skeleton/tests/Feature/BoostDocsTest.php` | create | Drift test (in the skeleton, which has the whole app: every command and config key exists there; it reads `vendor/yuan/admin-core/resources/boost`). Checks every backticked name in the guideline and each skill: `php artisan x` / `artisan x` → `Artisan::all()` has `x`; `admin-core.*` / `audit.*` config keys → `config()->has()`; `Yuan\…` FQCNs → `class_exists` / `interface_exists` / `trait_exists`; short class names (`ExportManager`, `Trash::delete()`) → exactly one class with that basename under the package's `src/` or `modules/` (via `ArchRules`), and a named static method exists on it; `composer x` → a script in the project's `composer.json`. Each SKILL.md has `name` = folder name and a non-empty `description`. Plus a break test: a fixture skill naming a missing command, a missing config key and a missing class fails with all three listed |
| `skeleton/tests/Fixtures/boost/broken/SKILL.md` | create | The break test's fixture |
| `DEVELOPER.md` §6 | modify | Q3: each project recipe's body is replaced by a one-line pointer to its SKILL.md (single source); R10, R12 and R13 (monorepo-only) stay here |
| `bin/new-project` | modify | Writes `boost.json` (agents: Claude Code; guidelines, skills, MCP on) then `php artisan boost:install` non-interactively (exact flags from step 1) |
| `skeleton/.gitignore` | modify | `/.claude` → `/.claude/*` + `!/.claude/skills`, so a project commits its generated skills (Q4) |

**Skills** (prefix `admin-`, so they never collide with Boost's own):

| Skill | From |
|---|---|
| `admin-make-module` | R1 (+ R17–R20 as "what the generator wrote and what to adjust") |
| `admin-add-field` | R2 |
| `admin-custom-action` | R3 |
| `admin-relation-field` | R4 |
| `admin-downloadable-list` | R5 |
| `admin-attachments` | R6 |
| `admin-add-setting` | R7 |
| `admin-customize-core` | R9 |
| `admin-test-module` | R11 |
| `admin-audit` | R14 + R15 |
| `admin-dashboard-widget` | R16 |
| `admin-translate` | R20 |
| `admin-upgrade-core` | UPGRADE.md standard steps (the project side of R10) |
| `admin-deploy` | R12 |

### Steps

1. Install `laravel/boost` in the skeleton; verify the package guideline / skill paths and the non-interactive `boost:install` flags on a scratch copy; record the version in spec §1.1 (proposed).
2. Guideline, then skills.
3. Drift test + break test.
4. DEVELOPER.md pointers; `bin/new-project` Boost step; `.gitignore`.
5. `composer check` green.

### Tests

- `BoostDocsTest` (drift + frontmatter) and its break test.

**10a-2 as built:**

- [x] `laravel/boost` v2.10.3 (`^2.10`, skeleton dev); spec §1.1 row. Verified on the installed version: Boost reads `resources/boost/{guidelines,skills}` of *direct* dependencies only (fine: projects require `yuan/admin-core` directly); `boost:install --guidelines --skills --mcp --no-interaction` takes the agents and packages from a pre-written `boost.json`; Claude Code gets the guidelines in `CLAUDE.md` only when that file exists (else `AGENTS.md`), so `bin/new-project` creates an empty `CLAUDE.md` first; `"cloud": false` keeps the Laravel Cloud skill out. A trial install in the skeleton (then removed) rendered the guideline byte-identical to the source and installed all 14 `admin-*` skills next to Boost's own.
- [x] `post-update-cmd`: `boost:update --no-discover`, only when `boost.json` exists (never in this repo's skeleton).
- [x] Guideline `core.blade.php` (~75 lines) and 14 skills; the skill for R1 is named `admin-make-module`. Skills use `{Name}` placeholders, never a demo model, since projects have none.
- [x] `BoostDocsTest`: commands (Boost's own read from its sources, as Boost registers none under tests), composer scripts, `admin-core.*` config keys, FQCNs and namespaces, `Class::method()`, `Class::CASE`, `use Trait;`, JSX components and `use*` hooks (exported from the package JS), `vendor/` and `tests/` paths; skill frontmatter (`name` = folder); the guideline has no Blade syntax. Break test on `tests/Fixtures/boost/broken/SKILL.md` lists all 12 kinds, plus a no-frontmatter case. It found real drift on its first run: the skills told projects to edit `config/admin-core.php`, which a project doesn't have until `php artisan vendor:publish --tag=admin-core-config` (now in the skills). `admin:eject` (Post-v1) was left out of `admin-customize-core` on purpose: the test would reject it.
- [x] `skeleton/.gitignore`: `/.claude/*` + `!/.claude/skills`; `CLAUDE.md`, `.mcp.json` and `boost.json` no longer ignored (committed in projects).
- [x] `bin/new-project` writes `boost.json` + `CLAUDE.md` and runs `boost:install` after `composer setup`; its dry-run test checks the step.
- [x] DEVELOPER.md §6: the 14 project recipes point to their skills (R1 and R11 keep their notes for this repo); R8, R10, R13 and R17–R19 stay. Key-files row for `resources/boost`, command row for `boost:update`. UPGRADE.md and CHANGELOG.
- [x] Wayfinder now also writes `resources/js/routes/boost` (Boost's local browser-logs route), committed like the other generated routes.

**Before 10a-3 (owner, 2026-10-25):**

- [x] Deep config merge: `AdminCoreServiceProvider::mergeConfig()` replaces `mergeConfigFrom`, so a published `config/admin-core.php` without a nested key added later still gets its default (`ConfigMergeTest`). Decision: not a plain `array_replace_recursive`, which merges lists by index (a project's `attachments.mimes => ['pdf']` would keep `jpg`, `png`… and silently widen uploads); associative arrays merge, lists are replaced whole. Consequence (CHANGELOG): a project can't drop a default settings tab, field or menu group by leaving it out.

## Part 10a-3 — Rehearsal and tag

1. `composer release 1.0.0-rc.1` (needs the private repo, Q2).
2. Timer starts. `bin/new-project ../admin-rehearsal --db=admin_rehearsal --ref=v1.0.0-rc.1`: package from the VCS tag, not the path repo (checked: `composer show yuan/admin-core` says `source: git`). Creating the two `admin_rehearsal*` databases is a database change: asked before step 2 runs.
3. In the new project: `php artisan make:module Pegawai --fields=… --actions=view,create,edit,delete,download --group=… --icon=…`, migrate, `composer check` green, `composer test:perf` (times recorded here).
4. Claude Code in the new project (`claude -p` with a plain request, e.g. "add a Kendaraan module with plat nomor, merk, tahun and a scan STNK file"): the transcript shows the `admin-make-module` skill loaded; the result is a `make:module` run, migrated, `composer check` green with no hand fix.
5. Timer stops. **Accept:** steps 2–3 under 15 minutes using only the script and the shipped docs (guideline, skills, UPGRADE.md); step 4 passes.
6. Fixes go into the monorepo (rc.2 if needed); then the CHANGELOG `[1.0.0]` heading and `composer release 1.0.0`.
7. Tick the roadmap and this plan; times and findings recorded below.

**Rehearsal 1 (`v1.0.0-rc.1`, 2026-10-25), findings and fixes:**

- [x] `bin/new-project` wrote `.env` without database credentials (`.env.example`: `root`, no password), so `composer setup` failed at `migrate`. Now `DB_HOST/PORT/USERNAME/PASSWORD` come from the environment, else from this repo's `skeleton/.env`, written verbatim (perl, so any character in a password survives) and never printed. Test: dry run with a tricky password.
- [x] The new project was created in 28 s (package from the VCS tag over SSH, demo removed, Boost installed and committed). `make:module Pegawai` with every field type worked.
- [x] `make:module` / `make:widget` messages pointed to DEVELOPER.md recipes, which projects don't have; they name the skills now.
- [x] `composer check` in the project crashed in `ArchTest`: Pest's arch scanner can't read files under `vendor/`, so in a project (package as a real folder) the core-module classes have no path; rules reading it crash, the `not->toUse` rules passed without checking anything. The skeleton's ArchTest now checks the core modules only where the package is symlinked (this repo) and the project's own modules in a project; the isolation rule still forbids project modules the core modules' internals. Verified in the rehearsal project: green, and a Pegawai controller using `Yuan\AdminCore\Modules\Users\Services\UserAccounts` fails it ("Expecting 'Modules\Pegawai' not to use …").
- [x] Rehearsal 2 from `v1.0.0-rc.2` (2026-10-26, after the owner's author-email history rewrite and re-release; package `ed8d244`, skeleton `6d16c31`), from scratch: `../admin-rehearsal` deleted, `admin_rehearsal` / `admin_rehearsal_test` emptied. All green:

| # | Step | Result | Time |
|---|---|---|---|
| 1 | `bin/new-project ../admin-rehearsal --db=admin_rehearsal --ref=v1.0.0-rc.2` | package from the VCS tag over SSH, demo removed, 14 `admin-*` skills, first commit with the owner's identity | 32 s |
| 2 | `make:module Pegawai` (string, text, integer, decimal, currency, boolean, date, datetime, enum, file), config published, `nip` / `tanggal_lahir` masked, migrate | 23 files; warnings name the `admin-audit` skill | 2 s |
| 3 | `foreign()`: `make:module Unit`, then `Ruangan` with `unit_id:foreign(units)`, migrate | FK `restrictOnDelete`, `VisibleRecord` on store / update, `unit_name` in list and detail, `RelationSelect` on `units.lookup`, the generated "links only a unit the user may see" test | 3 s |
| 3a | Throwaway server probe | lookup needs `units.view` and filters by search; a visible unit stores; an unknown or trashed one is rejected; `unit_name` in list, detail and edit (38 assertions) | 2 s |
| 3b | Throwaway browser probe (Chromium) | the select lists both units, search hides the other, the pick saves and shows on Show and in the list, no JS errors (7 assertions) | 3 s |
| 4 | `composer check` (3 modules) | Pint, PHPStan 0, generated files (incl. the absolute-path guard), typecheck, lint, 220 tests, build, 11 built tests | 44 s |
| 5 | Isolation break (a Ruangan controller uses `Yuan\AdminCore\Modules\Users\Services\UserAccounts`) | fails ("Expecting 'Modules\Ruangan' not to use …"); 13/13 after restoring | 2 s |
| 6 | `composer test:perf` | 30 days: 161.9 ms non-SA (78,320 rows), 26.3 ms SA; 366 days: 379.6 ms non-SA (973,115 rows), 261.8 ms SA (1,000,407 rows); all under 500 ms | 76 s |
| 7 | Claude Code (headless, plain request for a Kendaraan module with a required STNK scan, all five actions, Master Data, "don't commit"; narrow tool allowlist) | loaded `admin-make-module`, then `admin-attachments`, generated with `make:module`, migrated, tightened validation and tests, reported `composer check` green (18 turns) | 3 min 5 s |
| 7b | `composer check` rerun by me after step 7 | PHPStan 0, 237 tests, 11 built tests | 40 s |

**Accept met:** steps 1–6 in about 2 min 44 s; with the Claude Code step and its verification about 6 min 30 s (< 15 min), using only the script and the shipped docs. Noted for Post-v1: the unexplained Pest "1 warning" (boilerplate and projects), and the generator's random 1–1000 factory value for an integer like `tahun` (Claude fixed it by hand).

**Open-source safety cleanup (owner decisions, 2026-10-25):** removed the third-party inspiration image and the design tool's `support.js` / `.thumbnail` from `docs/design-implementation/reference/`; the sample IP replaced with `203.0.113.10` (documentation range); generic PHP-version wording in DEVELOPER.md; Wayfinder's absolute paths fixed at the cause (`WayfinderPaths`, above in the CHANGELOG). Verified that the rewrite also runs when the Vite plugin regenerates (it runs `php artisan wayfinder:generate` as a child process on `buildStart` and on file changes): a deleted generated file came back normalized from `npm run build` and from `vite` serve. `check:generated` now also fails on an absolute path in any generated file (`/Users/`, `/home/`, `/private/`, `/var/folders/`, `/tmp/`, `C:\` or `C:/`, and Wayfinder's slash-less `@see Users/…`), anchored so `modules/Users/` doesn't match; break-tested with five planted paths. History is not rewritten: the public repo starts from one squashed commit of the cleaned tree (step 6).

## Decisions where the spec is silent

- Monorepo and split repo share the tag `v{version}`, so a skeleton copy and a package version always match.
- `admin:remove-demo` deletes the demo-coupled skeleton tests in the project; the boilerplate keeps them.
- The skeleton gets its own `composer check`; the root's calls it (no gate removed or weakened).
- The drift test lives in the skeleton (the package's Testbench app lacks Wayfinder and the skeleton commands the skills name).

## Answers (owner, 2026-10-25)

1. `admin:remove-demo` lives in the skeleton and deletes itself.
2. Package repo `git@github.com:yuanmaharsyah/yuan-admin-core.git` (private). Developers authenticate with SSH; production servers with a read-only deploy key. Both documented in the package README and UPGRADE.md; `auth.json` is never committed.
3. Skills are the single source; DEVELOPER.md recipes point to them.
4. Boost's generated files are committed in each project.
5. Rehearse from `v1.0.0-rc.1`, then tag `v1.0.0`.
6. `bin/release --dry-run` with a Pest test over every refusal in a temporary git repo; a dry-run test for `bin/new-project` too.

Confirmed: (a) `bin/new-project` runs `boost:install`; (b) the rehearsal has Claude Code in the new project create a module through the `admin-make-module` skill, `composer check` green afterwards; (c) the R8 health skill is a Phase 09 item. The rehearsal databases are created only after asking.

## Proposed spec / roadmap changes

- Spec §1.1: `laravel/boost` row.
- Roadmap 09: the `admin-health-check` skill (R8).
- Roadmap 10a: add the Boost item and the two rehearsal steps (perf group, Claude Code skill); accept line gains "and Claude Code creates a module through a skill".

## Progress

- [x] 10a-1 Release and new project
- [x] 10a-2 AI docs
- [x] Review stop (guideline + two skills; approved 2026-10-25)
- [x] 10a-3 Rehearsal: rc.1 found five issues (fixed), rc.2 passed every step, times recorded
- [ ] `v1.0.0` tagged (owner runs `composer release -- 1.0.0`)
