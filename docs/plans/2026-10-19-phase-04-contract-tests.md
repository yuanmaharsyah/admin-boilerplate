# Phase 04 — Contract & Architecture Test Suite (split: 04a + 04b)

- **Date:** 2026-10-19
- **Roadmap:** [Master Roadmap → Phase 04](./2026-10-16-admin-boilerplate-master-roadmap.md#phase-04--contract--architecture-test-suite)
- **Spec sections:** design §3 (module shape), §3.1 (definition rules), §3.2 (route middleware), §6.2, §7.1 (audit rules), §7.2 (widgets, see Q1), §8 (route protection), §9.1 (every row); AGENTS.md §3, §4, §5, §8, §10; DEVELOPER R11
- **Status:** approved 2026-10-19 (see Approval); 04a ☑ committed 2026-10-19 (`fc2c903`); 04b ☑ done 2026-10-19, waiting for review
- **Design gate:** none (no screen in this phase)

## Where things stand

- The package has no real modules yet (`packages/admin-core/modules/` doesn't exist), and the skeleton has none (`skeleton/modules/` doesn't exist). The fixture modules (`Demo`, `Hidden`, `AdminOnly`, `Off`, core `Notes`) are deliberately partial: they test the registry, and most have only `module.php` + routes.
- Already covered by Phase 03 tests (behaviour, not contract): permission sync, `model_has_permissions` empty after the seeder, immutability of a row, masking of the fixture fields, unknown event names throwing.
- `Widget`, `WidgetRegistry`, `visibleTo()` on models, `ExportManager` and the `Dashboard` module don't exist yet (Phases 06–07). See Q1.
- The skeleton doesn't run or analyse module code: `phpunit.xml` / `tests/Pest.php` don't include `modules/*/Tests`, and `phpstan.neon` doesn't list `modules/`. See Q5.
- Current arch tests (package + skeleton): strict types, no debugging helpers, no `env()`. Nothing else.

## Why split

About **40 files** (≈ 20 of them small fixtures) and **about 16 test files**. Same split rule as Phase 03:

| Part | Scope | Commit |
|---|---|---|
| **04a: Contract assertions** | `ContractAssertions`, module test helpers, `NotAudited`, the compliant fixture root, negative tests for each assertion, package + skeleton contract test files | `test(core): phase 04a contract assertions` |
| **04b: Architecture rules** | Arch tests (isolation, controllers, data, hygiene, exports, audit), the exceptions list, the PHPStan rule (Q2), skeleton wiring (Q5), the break-each-rule rehearsal | `test(core): phase 04b architecture rules` |

---

## Part 04a — Contract Assertions

### Design

`Yuan\AdminCore\Testing\ContractAssertions` is a trait. Each method takes no module list: it reads the **current app's** `ModuleRegistry`, so the same call checks the package fixtures (in Testbench) and a project's modules (in the skeleton). Each method collects every violation and fails once with a list (`Invoice: missing Policies/InvoicePolicy.php`, …), not on the first one.

**Module shape (spec §3, Q3).** Required for every enabled module:

| Always | `module.php`, `Routes/web.php`, `Http/Controllers/{Name}Controller.php`, `resources/js/pages/Index.tsx`, `Tests/Feature/{Name}Test.php` |
|---|---|
| Model-backed (`Models/{Name}.php` exists) | `Policies/{Name}Policy.php`, `Data/{Name}Data.php`, `Data/{Name}ListItemData.php` |
| `create` declared (model-backed) | `Data/Store{Name}Data.php`, `resources/js/pages/Create.tsx`, `resources/js/components/{Name}Form.tsx` |
| `edit` declared (model-backed) | `Data/Update{Name}Data.php`, `resources/js/pages/Edit.tsx` |
| `download` declared | `Exports/{Name}Export.php` |

Modules without a model (Dashboard, Settings, Health, Trash in Phase 07) get only the "Always" row.

**Policy coverage.** Action → policy method: `view` → `viewAny` + `view`, `create` → `create`, `edit` → `update`, `delete` → `delete`, `download` → `download`, a custom action → the same name. Checked on the policy Laravel resolves for `Models/{Name}` (`Gate::getPolicyFor`), so a policy that isn't registered fails too. superadmin_only modules are skipped (no permissions; routes use `superadmin`).

**Audit coverage.** For every class in each module's `Models/` that extends `Model`: if its table has a column other than `id`, `created_at`, `updated_at`, `deleted_at`, it must use `LogsModuleActivity`, or carry `#[NotAudited(reason: '...')]` with a non-empty reason. Needs a migrated DB, so it runs in a `RefreshDatabase` test.

**Audit call sites (spec §9.1 AuditEventTest).** Token scan (`token_get_all`, stdlib) of every PHP file in the module roots and in `src/`: the first argument of each `Audit::record(` is `AuditEvent::Case`, or a string literal declared as a custom action by the module the file belongs to. A variable first argument fails unless the call is inside `Yuan\AdminCore\Audit` (the subscriber passes `$event`).

### Files

**Package `packages/admin-core/`**

| Path | Action | Purpose |
|---|---|---|
| `src/Testing/ContractAssertions.php` | create | `assertModuleShape()`, `assertModuleDefinitionsValid()` (re-reads every `module.php` through `ModuleDefinition`; unique slugs), `assertAdminRoutesProtected()` (every route under the configured prefix has `auth` and `permission:*` or `superadmin`), `assertPolicyCoverage()`, `assertPermissionsInSync()` (DB set = derived set), `assertNoDirectPermissions()`, `assertAuditCoverage()`, `assertAuditCallSites()`, `assertMaskingHolds()` (every configured `masked_fields` key, through `Audit::record()` meta for every `AuditEvent` case; wildcard keys tested with a sample name) |
| `src/Testing/InteractsWithAdmin.php` | create | Module test helpers (R11): `actingAsLevelWith(list<string>)`, `actingAsSuperAdmin()`, `assertGuestRedirected(string $method, string $uri)`, `assertForbiddenWithout(string $permission, string $method, string $uri, array $data = [])`, `assertAudited(Model $subject, string $event, array $masked = [])` (latest matching row exists; each masked key is absent or masked per its config mode, never the raw value), `assertNotVisibleToNonSuperAdmin(ImmutableActivity $row)` (hidden from a non-SA viewer through `visibleTo()`, visible to SA) |
| `src/Audit/NotAudited.php` | create | `#[Attribute(TARGET_CLASS)]`, `reason: string` (non-empty) |
| `tests/Fixtures/Contract/Invoice/…` | create | Compliant fixture module, smallest valid version of every file in the shape table: `module.php` (`view, create, edit, delete, download, approve`), routes with `permission:` middleware, controller, policy, model (`LogsModuleActivity`, `SoftDeletes`), 4 Data classes, export, migration, 3 pages + form, test file (one real assertion on the index route, so it isn't a placeholder; fixtures aren't in the package test suite, so it only has to exist) |
| `tests/Fixtures/Contract/Customer/…` | create | Second compliant module: view-only, model-backed, `#[NotAudited(reason: …)]` on a lookup model. Invoice uses `Customer\Models\Customer` (the allowed cross-module use) |
| `tests/Fixtures/Broken/Leaky/…` | create | One module that breaks each class-level rule once: policy without `approve`, an unaudited model with business columns, a route without `permission:`, `Audit::record('publish', …)` with `publish` undeclared, a controller using `Customer\Http\…` (for 04b) |
| `tests/Pest.php` | modify | `useContractRoot()` / `useBrokenRoot()` helpers that point `admin-core.modules.roots` at the fixture root and re-boot the registry |
| `CHANGELOG.md` | modify | Unreleased → Added (`Testing\ContractAssertions`, `Testing\InteractsWithAdmin`, `Audit\NotAudited`) |

**Skeleton `skeleton/`**

| Path | Action | Purpose |
|---|---|---|
| `tests/TestCase.php` | modify | `use InteractsWithAdmin` |
| `tests/Feature/ContractTest.php` | create | One test per §9.1 runtime row (shape, definition, routes, policies, permissions, no direct permissions after `DatabaseSeeder`, audit coverage, call sites, masking with the project's `masked_fields`). Runs over the skeleton's registry; with no modules yet, the module-based checks pass on an empty set and become meaningful when the Phase 06 demo module lands |

### Tests (package)

| Test | Proves |
|---|---|
| `Contract/ModuleShapeTest` | Contract root passes; Broken root fails, and the message names the missing file. Each shape rule (always / model / create / edit / download) has a temp-dir copy of `Invoice` with that one file removed, and fails |
| `Contract/ModuleDefinitionTest` | Contract root passes; a temp root with a duplicate slug or an invalid key fails |
| `Contract/RouteProtectionTest` | Contract root passes; `Leaky`'s unprotected route fails; a route under the prefix with `auth` removed fails |
| `Contract/PolicyCoverageTest` | Contract root passes; `Leaky` fails naming `approve`; superadmin_only `AdminOnly` is skipped |
| `Contract/PermissionSyncTest` | After sync: passes. After deleting one permission or adding an orphan: fails |
| `Contract/NoDirectPermissionsTest` | After the seeder: passes. One row in `model_has_permissions` (inserted through the pivot table directly, since `givePermissionTo` throws): fails |
| `Contract/AuditCoverageTest` | `Invoice` passes; `Customer`'s `NotAudited` lookup passes; `Leaky`'s model fails; `NotAudited(reason: '')` fails |
| `Contract/AuditCallSiteTest` | `src/` + Contract root pass; `Leaky`'s `publish` fails; the subscriber's variable call is allowed |
| `Contract/AuditMaskingTest` | Every configured field, every event type: `omit` absent, `partial`/`full` masked; an extra configured field is covered with no test edit |
| `Testing/InteractsWithAdminTest` | Each helper passes on the right case and fails (`expect(fn)->toThrow(AssertionFailedError::class)`) on the wrong one; `assertAudited` fails when a masked key holds the raw value |

The 03a `AuditImmutabilityTest` already covers row updates and deletes. Its "no route writes to `activity_log`" half is the 04b audit arch rule (Q6).

### As built (differences from the files table above)

- **Static classes, not traits.** Pest's `it()` declares `@param-closure-this TestCall`, so PHPStan types `$this` in every test closure as `TestCall` and rejects `$this->assertAudited()`. Projects will analyse module tests (04b wires `modules/` into PHPStan), so the helpers must be typed there: `ContractAssertions` and `ModuleAssertions` (was `InteractsWithAdmin`) are final classes with static methods, HTTP and auth go through `Pest\Laravel\call()` / `actingAs()`. No base-class or trait change in either `TestCase`. Same intent as approval item 7 (no `ModuleTestCase`); R11 documents it.
- **Fixture runner.** `tests/ContractTestCase.php` boots only the `Contract` root (and a `login` route); `tests/Pest.php` binds it to `tests/Contract` and `tests/Fixtures/Contract`, so the fixture modules' own tests (`InvoiceTest`, `CustomerTest`) run for real and double as usage examples of the helpers. `withBrokenModules()` adds the `Broken` root by swapping the registry instance and registering `Leaky`'s routes; `copyOfContractModule()` makes the temp copies for the shape tests.
- **Shape rule detail:** `components/{Name}Form.tsx` is required when `create` **or** `edit` is declared (the table only said `create`); `Exports/{Name}Export.php` is required for `download` with or without a model.
- **Audit call sites:** a variable first argument is allowed anywhere in core `src/` (the masking check itself loops over `AuditEvent::cases()`), not only `src/Audit`.
- **Masking:** the expected mode comes from the configured pattern, not from the masker, so a pattern shadowed by an earlier one with a different mode fails instead of passing silently.
- **Skeleton:** `tests/Feature/ContractTest.php` only; `tests/TestCase.php` is unchanged. Its permission checks run after the full `DatabaseSeeder`.
- **Not run:** `migrate:fresh --seed` / `migrate:rollback`, because 04a adds no shipped migration (the two fixture migrations run on every Testbench test).

### Acceptance 04a

- [x] Every runtime row of spec §9.1 has an assertion, run by a package test against the Contract root and by the skeleton's `ContractTest`.
- [x] Every assertion has a permanent negative test (broken fixture or temp copy) proving it fails.
- [x] `composer check` green.
- [x] The skeleton `ContractTest` compares the modules checked with the `module.php` files on disk (approval item 8). Proven once on a scratch copy: a `modules/Probe` with discovery pointed at no root failed with "Failed asserting that 0 is identical to 1"; scratch removed.

---

## Part 04b — Architecture Rules

### Files

| Path | Action | Purpose |
|---|---|---|
| `skeleton/tests/arch-exceptions.php` | create | **The one list** (roadmap item 4): `path => reason` for the AGENTS.md §5 starter-kit files. Read by the arch tests and the PHPStan rule (Q2) |
| `skeleton/tests/ArchTest.php` | modify | Adds the rules below for `App` and `Modules`; `arch-exceptions.php` entries are `->ignoring()`; one test fails if a listed file no longer exists (so the list shrinks as Phase 05/07 replace the files) |
| `packages/admin-core/tests/ArchTest.php` | modify | Same rules for `Yuan\AdminCore` and the Contract fixture root; the package has no exceptions |
| `src/PHPStan/InertiaPropsRule.php`, `src/PHPStan/RequestAllRule.php`, `phpstan/rules.neon` | create | Q2. Inertia props: every value passed to `Inertia::render()` / `inertia()` must be a `Data`, `PaginatedData`, `Closure`, a deferred/optional prop or a scalar; never an array, a `Model` or a `Collection`. Request: no `->all()` / `->input()` without a key / `->validated()` in controllers. Both honour `arch-exceptions.php` through a neon parameter |
| `packages/admin-core/phpstan.neon`, `skeleton/phpstan.neon` | modify | Include `phpstan/rules.neon`; skeleton: add `modules/` to `paths` (Q5) |
| `skeleton/phpunit.xml`, `skeleton/tests/Pest.php` | modify | Q5: a `Modules` test suite for `modules/*/Tests`, extended with the skeleton `TestCase` |
| `tests/Feature/PHPStan/*RuleTest.php` (package) | create | PHPStan `RuleTestCase` for each rule, with a passing and a failing fixture file |

### Rules

| Rule (spec §9.1) | How |
|---|---|
| **Isolation** | Per module A and each other module B in both roots: `expect(A)->not->toUse(B\{every top-level folder except Models})`, folders read from disk, so a new folder in B is covered automatically |
| **Controllers** | `*\Http\Controllers` don't use `Illuminate\Support\Facades\DB` or `Illuminate\Foundation\Http\FormRequest`; props and `Request::all()` via the PHPStan rules (Q2) |
| **Data** | Classes in `*\Data` extend `Spatie\LaravelData\Data` and have `#[TypeScript]`; no class anywhere extends `FormRequest` (AGENTS §5, Q4) |
| **Hygiene** | Strict types (exists, now also `Modules`), no `dd`/`dump`/`ray`/`var_dump` (exists), no `env()` outside `config/` (exists), no `$guarded = []` (token scan of every model) |
| **Exports** | Nothing outside `Yuan\AdminCore\Exports\ExportManager` uses `Maatwebsite\Excel\Facades\Excel` (rule by name; the package isn't installed until Phase 06, and the rule already holds) |
| **Audit** | Nothing outside `Yuan\AdminCore\Audit` uses the `activity` function, `Spatie\Activitylog\Models\Activity`, or references the string `activity_log` (token scan; package migrations excluded) |

### Break-each-rule rehearsal (roadmap item 5)

The 04a assertions have permanent negative tests, so the rehearsal covers the 04b rules. Run 2026-10-19 by a script that backs up each file, applies one break, runs the matching gate, and restores it (no scratch branch was needed: all 04b work was uncommitted, so a checksum of `git diff` + status + untracked files before and after proved the tree unchanged). Skeleton breaks ran against temporary copies of the `Invoice` / `Customer` fixture modules as `Modules\Invoice` / `Modules\Customer`, removed afterwards; with the copies in place, arch, the `Modules` test suite (10 tests) and PHPStan all passed before any break.

| Where | Rule | Break | Gate | Failing output |
|---|---|---|---|---|
| package | Isolation | `Invoice` controller uses `Customer\Policies\CustomerPolicy` | arch | Expecting '…\Invoice' not to use '…\Customer\Policies'. |
| package | Controllers: DB | `DB::table()` in a controller | arch | Expecting '…\Http\Controllers' not to use 'Illuminate\Support\Facades\DB'. |
| package | Controllers: props | `'invoices' => Invoice::query()->get()` | PHPStan | Inertia prop 'invoices' is Illuminate\Database\Eloquent\Collection<…>; pass a laravel-data object instead (spec §9.1). |
| package | Controllers: request | `$request->all()` in a controller | PHPStan | Request all() reads raw input; take a laravel-data object as the action's parameter instead (spec §9.1). |
| package | Data: attribute | `#[TypeScript]` removed from `InvoiceData` | arch | Expecting '…/Data/InvoiceData.php' to have attribute […\TypeScript]. |
| package | Data: FormRequest | `StoreInvoiceRequest extends FormRequest` added | arch | Expecting '…/Http/Requests/StoreInvoiceRequest.php' not to extend […\FormRequest]. |
| package | Hygiene: strict types | `declare(strict_types=1)` removed from a model | arch | Expecting '…/Models/Invoice.php' to use strict types. |
| package | Hygiene: `dd()` | `dd($invoice)` in a controller | arch | Expecting '…\Invoice' not to use 'dd'. |
| package | Hygiene: `env()` | `env('APP_NAME')` in a controller | arch | Expecting '…\Invoice' not to use 'env'. |
| package | Hygiene: `$guarded = []` | on the model | arch (scan) | Failed asserting that two arrays are identical (lists the file). |
| package | Exports | `Excel::download()` call; separately a `use Maatwebsite\Excel\Facades\Excel` | arch (scan) | Failed asserting that two arrays are identical (lists the file). |
| package | Audit: helper | `activity()->log()` in a controller | arch | Expecting '…\Invoice' not to use 'activity'. |
| package | Audit: table | `->table('activity_log')->delete()` in a controller | arch (scan) | Failed asserting that two arrays are identical (lists the file). |
| skeleton | Isolation | as above, `Modules\Invoice` → `Modules\Customer\Policies` | arch | Expecting 'Modules\Invoice' not to use 'Modules\Customer\Policies'. |
| skeleton | Controllers: props | as above | PHPStan | Inertia prop 'invoices' is Illuminate\Database\Eloquent\Collection<int, Modules\Invoice\Models\Invoice>; … |
| skeleton | Data: FormRequest | as above | arch | Expecting 'modules/Invoice/Http/Requests/StoreInvoiceRequest.php' not to extend […\FormRequest]. |
| skeleton | Hygiene: strict types / `dd()` / `env()` | as above | arch | Expecting 'modules/Invoice/Models/Invoice.php' to use strict types. / … not to use 'dd'. / … not to use 'env'. |
| skeleton | Audit: helper | as above | arch | Expecting 'Modules\Invoice' not to use 'activity'. |
| skeleton | Data: attribute | as above | arch | Expecting 'modules/Invoice/Data/InvoiceData.php' to have attribute […\TypeScript]. |
| skeleton | Module tests run | wrong expected value in `InvoiceTest` | `Modules` suite | Property [invoices.items.0.customer_name] does not match the expected value. |
| skeleton | Exceptions list | a stale line for a file that no longer exists | arch | app/Http/Controllers/Settings/GoneController.php is gone: … (message since shortened to "remove its line from tests/arch-exceptions.php"). |
| skeleton | Exceptions reach PHPStan | `tests/arch-exceptions.phpstan.php` include removed | PHPStan | Inertia prop 'status' is mixed; … (the starter-kit `ProfileController`) |

**What the rehearsal caught (fixed before the final run):**
- Pest's whole-project checks (`expect('dd')->not->toBeUsed()`, a bare `expect('Yuan\AdminCore')`) only see the production autoload, so in the package they missed the fixture modules (autoload-dev): `dd()`, `env()`, `activity()`, strict types and FormRequest breaks all passed. Every rule now names each module namespace explicitly.
- Pest silently passes `expect([$a, $b])->not->toUse(...)` and `expect([...])->not->toBeUsedIn(...)` with a list. Every expectation now targets one namespace (comment in both ArchTests).
- Pest can't see a class that isn't installed, so the `Excel` rule couldn't fail before `maatwebsite/excel` exists (Phase 06). It is a source scan now.
- With real module pages, skeleton tests rendered through Vite failed with "Unable to locate file in Vite manifest", because `composer check` runs the tests before `npm run build`. The skeleton `TestCase` now calls `withoutVite()`.

### As built 04b (differences from the files table above)

- **PHPStan rules:** `src/PHPStan/InertiaPropsRule.php`, `src/PHPStan/RequestInputRule.php` and their shared scope `src/PHPStan/Controllers.php` (any class under `\Http\Controllers\`); registered by `extension.neon` at the package root (not `phpstan/rules.neon`). Identifiers `adminCore.inertiaProps`, `adminCore.requestInput`. Allowed Inertia values: Data objects (incl. `PaginatedData`), scalars, null, Inertia prop wrappers, and closures returning those; each wrapper's value (`Inertia::defer(fn () => …)`) is checked where it is built. Tests in `tests/PHPStan/` (`RuleTestCase`) with violating fixtures in `tests/PHPStan/Fixtures` (excluded from the package's own analysis).
- **Exceptions to PHPStan:** `skeleton/tests/arch-exceptions.phpstan.php` turns the list into `ignoreErrors` for the two identifiers (`reportUnmatched: false`), so the rules themselves take no parameter.
- **`Yuan\AdminCore\Testing\ArchRules`** (package): filesystem helpers for what Pest can't express (module namespaces, isolation map, source scans for `$guarded = []`, `activity_log`, `Excel`), shared by both ArchTests.
- **Scope of the Inertia rule:** controllers only, as spec §9.1 says. The starter-kit `FortifyServiceProvider` views (raw-array props) are outside it and are replaced in Phase 05.
- **Skeleton wiring:** `modules/.gitkeep` (PHPStan fails on a missing path), `phpstan.neon` (`modules/`, Pest extension, core extension, exceptions), `phpunit.xml` (`Modules` suite, `modules` in source), `tests/Pest.php` (`in('Feature', '../modules')`), `tests/TestCase.php` (`withoutVite()`, see the rehearsal).

### Added at review (2026-10-19)

- **AGENTS.md:** §5 now points to `skeleton/tests/arch-exceptions.php` as the single source of the starter-kit exceptions; §2 gains the arch-rule rule (one target per expectation, a break test for every new arch rule).
- **Real-manifest page check:** `skeleton/tests/Feature/ModulePagesViteTest.php` (`group('vite')`, excluded in `phpunit.xml`) signs in as SA and renders every module page through the root view with `withVite()`, and checks the count against the page files on disk. `composer check` runs it last, after `npm run build`, through the skeleton script `test:vite`. Proven with the fixture modules copied into `skeleton/modules`: all 5 pages render; after renaming `Invoice/resources/js/pages` to `Pages` and rebuilding, the normal `Modules` suite still passed (10/10) while `test:vite` failed with "Unable to locate file in Vite manifest: modules/Invoice/resources/js/pages/Create.tsx". Copies removed and assets rebuilt afterwards.
- **Roadmap Phase 06:** the class-based `Excel::download` arch rule once `maatwebsite/excel` is installed, keeping the source scan.

### Acceptance 04b

- [x] Every arch row of spec §9.1 has a rule in both the package and the skeleton.
- [x] The exceptions come from `arch-exceptions.php` only (arch `ignoring()` and PHPStan `ignoreErrors` through `tests/arch-exceptions.phpstan.php`), and a stale listed file fails a test.
- [x] The rehearsal table is filled, each break failed its rule, and the tree was restored (checksum).
- [x] `composer check` green. `migrate:fresh --seed` / `migrate:rollback` not run: 04b adds no migration.

---

## Steps

**04a**
1. `NotAudited`; Contract fixture root (`Invoice`, `Customer`) and `useContractRoot()`.
2. Per assertion, test-first: negative test (Broken root / temp copy) → assertion → positive test.
3. `InteractsWithAdmin` + its tests.
4. Skeleton `TestCase` + `ContractTest`.
5. `composer check` green → DEVELOPER (§5 `Testing/*`, R11 delivered and renamed from `ModuleTestCase` to the trait, R15 points to the contract masking test), CHANGELOG, roadmap, this plan → commit 04a.

**04b**
1. `arch-exceptions.php` + the missing-file test.
2. Arch rules in package and skeleton.
3. PHPStan rules + `RuleTestCase` tests + neon includes (after Q2).
4. Skeleton wiring for `modules/` (after Q5).
5. Rehearsal on a scratch branch; fill the table.
6. `composer check` green → DEVELOPER (§5, §8 rows for arch/PHPStan failures), CHANGELOG, roadmap, this plan → commit 04b.

## Checklist

- [x] 04a: `NotAudited`, fixture roots
- [x] 04a: assertions + negative tests
- [x] 04a: module helpers (`ModuleAssertions`, see as-built)
- [x] 04a: skeleton `ContractTest`
- [x] 04a: `composer check` green (commit after review)
- [x] 04b: exceptions list
- [x] 04b: arch rules (package + skeleton)
- [x] 04b: PHPStan rules
- [x] 04b: skeleton `modules/` wiring
- [x] 04b: rehearsal recorded
- [x] 04b: `composer check` green (commit after review)

---

## Open Questions

**Q1. Widgets conflict between Phase 04 and Phase 07 (stop-and-ask).** Phase 04 lists `assertWidgetHiddenWithout`, `assertWidgetUsesScope`, `assertWidgetWithinBudget` and `WidgetContractTest`, but `Widget`, `WidgetRegistry` and model `visibleTo()` arrive in Phases 06–07, and `ModuleDefinition` today checks only that a widget class exists.
- **(A, recommended)** Move the three widget helpers, `WidgetContractTest` and the two missing `ModuleDefinition` widget rules (extends `Widget`, slug-prefixed key) to Phase 07, next to the `Widget` class. Roadmap edit: move those items.
- (B) Pull an abstract `Widget` + `WidgetType` / `WidgetSize` / `DashboardRange` into Phase 04 now. `assertWidgetHiddenWithout` would still wait for `WidgetRegistry`, and `assertWidgetUsesScope` for `visibleTo()`, so B delivers only half.

**Q2. "Controllers don't return arrays/models to Inertia" and "no `Request::all()`" need types.** Pest arch can't see method calls or argument types; a regex scan would be easy to fool. **Recommended:** two small custom PHPStan rules shipped in the package (`src/PHPStan`, `phpstan/rules.neon`), with `RuleTestCase` tests. This adds to a quality gate (AGENTS §2), hence the question. Alternative: leave both to code review and skip them in this phase.

**Q3. Fixture strategy.** **Recommended:** a separate compliant root (`tests/Fixtures/Contract`) plus a `Broken` root, leaving the existing registry fixtures small. The alternative (bringing `Demo`, `Hidden`, `AdminOnly`, `Notes` into full shape) adds ≈ 30 files and renames `DemoItem` → `Demo` across the Phase 01–03 tests. Also please confirm the shape table above (especially: model-less modules need only the "Always" row).

**Q4. FormRequest ban as an arch rule.** AGENTS §5 forbids FormRequests, and the exceptions list exists mostly for them, but spec §9.1 doesn't list the rule. I'd add it under "Arch: data" and propose the one-line spec change in the report. OK?

**Q5. Skeleton wiring for `modules/`.** `ModuleShape` requires `Tests/Feature/{Name}Test.php`, but the skeleton doesn't run `modules/*/Tests` or analyse `modules/` with PHPStan, so a module's tests and types would go unchecked. Add both now (a `Modules` test suite + `modules/` in `phpstan.neon` paths), or leave it to Phase 08 (generator)? **Recommended: now**, since without it the shape rule checks a file that never runs.

**Q6. "No route writes to `activity_log`."** Static (the 04b audit arch rule) is precise; a runtime HTTP sweep over every route isn't reliable (routes need parameters and state). **Recommended:** prove it with the arch rule only and drop the HTTP part from `AuditImmutabilityTest`.

**Q7. DEVELOPER R11 says `ModuleTestCase`.** A base class can't serve both Testbench (package) and the app (skeleton), so I'd ship the trait `InteractsWithAdmin` and update R11's wording. The roadmap's helper list doesn't include R11's `assertGuestRedirected` / `assertForbiddenWithout` / `actingAsLevelWith`, but R11 marks them Phase 04 and Phase 07/08 need them, so they're in scope here. OK?

---

## Approval (2026-10-19)

Approved as a split: 04a, then 04b, each with its own `composer check` and commit; stop after 04a for review.

1. Widget helpers and `WidgetContractTest` move to Phase 07 (added there in the roadmap).
2. Custom PHPStan rules for Inertia props and `Request::all()`, in the package (projects inherit them), each with its own failing-fixture test; one line added to spec §9.
3. Separate compliant fixture root. Model-less modules need only the base files; `Tests/` is required for every module.
4. FormRequest ban as an arch rule plus the spec §9.1 line; the kit files stay in `arch-exceptions.php`.
5. Wire skeleton `modules/` into Pest and PHPStan now.
6. Static rule only; the Phase 09 DB triggers are the runtime guard.
7. Trait instead of `ModuleTestCase`; R11 updated.
8. **Extra:** the skeleton `ContractTest` asserts that the number of modules it checked equals the number of `module.php` files on disk, so it can't pass on an empty set because discovery broke.
