# Phase 08 — Module Generator

- **Date:** 2026-10-24
- **Roadmap:** [Master Roadmap → Phase 08](./2026-10-16-admin-boilerplate-master-roadmap.md#phase-08--module-generator) (fast track: 07 → **08** → 10a → first project → 09)
- **Spec sections:** design spec §3 (module contract, §3.1 `module.php`), §6 (RBAC), §7.1 (audit, masked fields), §7.2 (widgets), §9.1 (contract tests); AGENTS §3–§8; DEVELOPER R1, R2, R4, R5, R6, R11, R16–R20
- **Status:** approved 2026-10-24, split into 08a / 08b; 08a and 08b built and reviewed (owner, 2026-10-25)

## Scope

`php artisan make:module` and `php artisan make:widget`, generating the whole module contract from stubs in `packages/admin-core/stubs/`. The stubs are the canonical code style (AGENTS §2): they are cut from the demo `Invoice` module (built on the approved `pattern-index`, `pattern-form`, `pattern-show` and `dialogs`), so a generated module looks and behaves like it with no hand edits.

**Out of scope:** `admin:eject` and `admin:docs` (Post-v1), `admin:remove-demo` (Phase 10), editing an existing module (the generator only creates).

## Split

About **90 files** with the named attachment slots (Q4 change), so two parts, each with its own `composer check` and commit, and a review stop after each:

| Part | Scope | Commit |
|---|---|---|
| **08a: Named attachment slots** | Core change (Q4): `collection` column, slots declared on the model, uploads with the form, per-slot lists; the Invoice demo moves to named slots. Browser review of the changed form and Show page | `feat(core): phase 08a named attachment slots` |
| **08b: Generator** | Stubs, builders, `make:module`, `make:widget`, boot-time widget check, golden `Sample` module | `feat(core): phase 08b module generator` |

## Part 08a — Named attachment slots

A model declares its slots; each slot is an upload field in the create / edit form and a group in the Show page's Lampiran tab. Files still live on the private disk under random names, downloads are still 5-minute signed URLs fetched on click, and every upload, download and delete is still audited on the record.

```php
public function attachmentSlots(): array
{
    return [
        'bukti_bayar' => AttachmentSlot::single(__('Bukti bayar'))->mimes(['pdf', 'jpg', 'png'])->maxKb(2048),
        'lampiran' => AttachmentSlot::multiple(__('Lampiran'))->mimes(['pdf', 'jpg', 'png', 'xlsx', 'docx'])->maxKb(10240),
        // ->required(): a create needs a file; an edit needs one unless the slot already has one.
    ];
}
```

| Path | Action | Purpose |
|---|---|---|
| `database/migrations/*_add_collection_to_attachments_table.php` | create | Additive: `collection` string(64), default `lampiran` (existing rows land in the slot of that name), index `(attachable_type, attachable_id, collection)` |
| `src/Attachments/AttachmentSlot.php` | create | Slot definition (label, single / multiple, required, mimes, max KB) and its validation rules for create / edit |
| `src/Attachments/HasAttachments.php` | modify | `attachmentSlots()` (default: one multiple `lampiran` slot from `admin-core.attachments`, so a model without slots keeps working), `attachments(?string $collection = null)`; `attachmentRules()` goes (CHANGELOG) |
| `src/Attachments/AttachmentUploads.php` | create | `AttachmentUploads::rules($model, creating)` for the input Data (`files.{slot}` / `files.{slot}.*`), `::save($model, $files, $user)` after the record is saved, in the same transaction: stores each file, replaces the file of a single slot (old row and file deleted), one audit batch |
| `src/Attachments/AttachmentController.php` | modify | Upload route goes (uploads travel with the form); signed URL, download and delete stay; `data()` groups by slot |
| `src/Data/{AttachmentsData,AttachmentSlotData}.php`, `UploadAttachmentData.php` | modify / create / delete | `AttachmentsData` = `slots: AttachmentSlotData[]` (key, label, multiple, required, accept, max_kb, items) + `can_delete` |
| `resources/js/components/admin/{FileField,AttachmentList}.tsx`, `FileUpload.tsx` | create / modify / delete | `FileField`: one slot in a form (drop zone, client type / size checks, picked files listed with remove, the slot's current files listed with delete on edit); `AttachmentList` per slot on Show |
| `skeleton/modules/Invoice/*` | modify | Slots `bukti_bayar` (single) and `lampiran` (multiple); Store / Update Data take `files`; controller saves them; `InvoiceForm`, `Show` |
| `docs/specs/2026-10-16-frontend-behavior.md` §8.5, §9 | modify (proposed) | Uploads go with the form (one request, the form's progress), so "max 3 in parallel, cancel each" no longer applies; `FileField` replaces `FileUpload` in §9 |

**Tests 08a:** slot rules (type, size, single vs multiple, required on create, required satisfied by an existing file on edit); create with files stores them per slot, audited in one batch with the create; a single slot replaces its file (old file gone, `attachment_deleted` + `attachment_uploaded`); delete and signed download per slot keep the `view` / `update` policy and `visibleTo()`; a model without `attachmentSlots()` gets the default slot; existing rows land in `lampiran`; browser: pick files in the Invoice form, see them grouped on Show, download one.

**08a as built** (all boxes done; browser review pending):

- [x] `collection` column (additive, default `lampiran`), `AttachmentSlot`, `HasAttachments::attachmentSlots()` / `attachments(?slot)`, `AttachmentUploads` (`rules`, `attributes`, `saveWith`, `save`), `AttachmentSlotData`; the upload route and `UploadAttachmentData` are gone.
- [x] `FileField` / `AttachmentFields` (form) and `AttachmentSlots` (Show) replace `FileUpload`; `AttachmentList` keeps an edit form's state when a file is deleted.
- [x] Invoice demo: `bukti_bayar` (single, PDF / JPG / PNG, 2 MB) and `lampiran` (multiple); files in the form's "Berkas" section; the edit form posts with `_method=PUT`.
- [x] Tests: `AttachmentSlotTest` (package), `InvoiceAttachmentsTest` (rewritten), `AttachmentRoutesTest`, browser `FilesTest`.

After the 08a review (owner, 2026-10-24): `admin:attachments-sweep` added (daily; row-less attachment files older than 24 h; one `attachments_swept` system row), covering the rollback case and crashes. Design spec §7.1 taxonomy gains `attachments_swept`.

Decisions where the plan was silent:
- Controllers can't use `DB`, so the transaction and the audit batch live in `AttachmentUploads::saveWith()`; the record's own audit row and the upload rows share the batch.
- A file stored before a failure inside `save()` is removed; one stored before a rollback of the outer transaction after `save()` returned has no row, and `admin:attachments-sweep` deletes it a day later.
- Downloading needs `{slug}.view`, deleting `{slug}.edit` (unchanged); the delete route exists only when the module declares `edit`, so `AttachmentController::routes()` no longer refuses a module without it.
- The browser test server of pest-plugin-browser keeps multipart names like `files[slot]` flat (documented in its source), so the browser test covers the form's client side and the grouped Show tab; sending files is covered by the feature tests, which go through Laravel's request parsing like PHP.

## Part 08b — Generator

## Screen sources

No new screens. Generated pages follow the approved patterns through the stubs (README rule: "generated modules have no mockups"). There's nothing new to review in a browser beyond one generated sample (Q8).

## Command surface

```bash
php artisan make:module Invoice \
  --fields="number:string,issued_on:date,due_at:datetime,total:currency,tax_rate:decimal,qty:integer,paid:boolean,notes:text?,status:enum(draft,paid),customer_id:foreign(customers),scan:file" \
  --actions=view,create,edit,delete,download \
  --group=keuangan --icon=receipt [--slug=invoices] [--label=Invoice] [--superadmin-only] [--force]

php artisan make:widget Invoice UnpaidTotal --type=stat --size=sm
```

- `--fields`: `name:type`, comma-separated; a trailing `?` makes it nullable (default: required). A file field takes its slot options in any order: `scan_ktp:file(single,required,pdf|jpg|png,2048)` (`single` / `multiple`, default `multiple`; `required`; extensions joined by `|`, default `admin-core.attachments.mimes`; size in KB, default `admin-core.attachments.max_kb`). The first `string` field is the record's label (`auditLabel()`, breadcrumbs, delete dialog, search).
- `--slug` defaults to the kebab plural of the name (`Invoice` → `invoices`), `--label` to the name. `--group` must be a key of `admin-core.menu.groups`; `--icon` must be in `lucide.json`. Bad input fails before anything is written, with the same messages `ModuleDefinition` gives.
- The command refuses an existing folder or slug (unless `--force`, which overwrites only a folder it created; see Q7).

## Field types → generated code

| Type | Column | Cast / PHP | Rules | Form control | List / Show |
|---|---|---|---|---|---|
| `string` | `string(255)` | `string` | `string`, `max:255` | `TextField` | text |
| `text` | `text` | `string` | `string`, `max:5000` | `TextareaField` | Show only |
| `integer` | `integer` | `integer` | `integer` | `NumberField` | `formatNumber` |
| `decimal` | `decimal(15,3)` | `decimal:3` / `string` | `numeric` | `NumberField` (3 digits) | `formatNumber` |
| `currency` | `unsignedBigInteger` (Rupiah) | `integer` | `integer`, `min:0` | `CurrencyField` | `formatCurrency` |
| `boolean` | `boolean` default false | `boolean` | `boolean` | `SwitchField` | Ya / Tidak |
| `date` | `date` | `immutable_date` | `date_format:Y-m-d` | `DateField` | `formatLocalDate` |
| `datetime` | `dateTime` | `immutable_datetime` | `date_format:Y-m-d H:i` | `DateField withTime` | `formatLocalDateTime` |
| `enum(a,b)` | `string(32)` + index | PHP enum `Enums/{Name}{Field}.php` (`label()`, `options()`, labels = headline) | `Rule::enum` | `SelectField` | `StatusBadge` (neutral tone) + list filter |
| `foreign(table)` | `foreignId()->constrained()->restrictOnDelete()` | `integer` + `belongsTo` (`withTrashed`) | `new VisibleRecord(Target::class)` | `RelationSelect` on the target's `lookup` route | `{relation}_name` column |
| `file(…)` | none (an attachment slot, 08a) | `HasAttachments` + one `AttachmentSlot` per field | the slot's rules (`files.{name}`) | `FileField` in the form | its group in the Lampiran tab |

Every filter / sort column gets an index; every foreign key states `onDelete` (AGENTS §5). A module declaring `edit` gets `lock_version` (unsigned int, default 0), `PreventsStaleUpdates` and `lock_version` in `Update{Name}Data`.

## Files

| Path | Action | Purpose |
|---|---|---|
| `packages/admin-core/stubs/module/**` | create | One stub per contract file (spec §3): `module.php`, `Providers/{Name}ServiceProvider.php` (policy registration), `Models/{Name}.php`, `Policies/{Name}Policy.php`, `Data/{Name}Data.php`, `Data/{Name}ListItemData.php`, `Data/Store{Name}Data.php`, `Data/Update{Name}Data.php`, `Data/{Name}FormOptionsData.php` (only with enum / foreign fields), `Enums/*`, `Exports/{Name}Export.php`, `Http/Controllers/{Name}Controller.php` (incl. `lookup`), `Routes/web.php`, `Database/{Migrations,Factories,Seeders}/*`, `resources/js/pages/{Index,Create,Edit,Show}.tsx`, `resources/js/components/{Name}Form.tsx`, `resources/js/lang/{id,en}.ts`, `Tests/Feature/{Name}Test.php` |
| `packages/admin-core/stubs/widget/*` | create | Widget class per type + its test |
| `src/Generator/{ModuleBlueprint,FieldDefinition,FieldType,StubRenderer,ModuleWriter}.php` | create | Parse and validate the options into a blueprint; `FieldType` maps each type to the fragments in the table above; render `{{ placeholders }}` (plain `str_replace`, no template engine); write files |
| `src/Console/{MakeModuleCommand,MakeWidgetCommand}.php` | create | The two commands; post-run steps (below) |
| `src/Registry/ModuleDefinition.php` | modify | Spec §3.1 says boot validation rejects a widget that doesn't extend `Widget` or whose key isn't slug-prefixed; 07c put this in the contract test only. Add it at boot (the contract test stays for the permission check) |
| `src/AdminCoreServiceProvider.php` | modify | Register the commands |
| `skeleton/modules/Sample` | create (generated) | The golden module (Q8), kept in the boilerplate repo permanently |
| `DEVELOPER.md` | modify | R1, R2, R4, R16 rewritten for the generator; key files |
| `CHANGELOG.md` | modify | — |

## Generated contract per declared action

| Declared | Routes | Controller | Pages / UI | Tests (AGENTS §8) |
|---|---|---|---|---|
| `view` (always) | `index`, `show`, `lookup`, Trash routes if `delete` | `index` (`visibleTo()->dataTable()`), `show` (+ `history`, + `attachments` with `file`), `lookup` | `Index` (DataTable: columns, search, enum filters, sorts), `Show` (DetailGrid, Riwayat tab, Lampiran tab) | guest redirect; 403 without; list + show OK; `assertScopedToUser` on list / show |
| `create` | `create`, `store` | `create`, `store` (flash) | `Create` + `{Name}Form` | 403; created + `assertAudited(created)`; required-field validation |
| `edit` | `edit`, `update` | `edit`, `update` (`updateUnlessStale`) | `Edit` + `UnsavedChangesGuard` + `StaleUpdateDialog` | 403; updated + `assertAudited(updated, masked: […])`; 409 on a stale `lock_version` |
| `delete` | `destroy`, `bulk-destroy`, Trash | `destroy`, `bulkDestroy` (`Trash::delete`) | row menu, bulk bar, `ConfirmDialog`, SA "Sampah" link | 403; soft delete + `assertAudited(deleted)`; only SA restores |
| `download` | `download` | `download` (`ExportManager`) | DataTable download button | 403; file returned + one `exported` row |

`--superadmin-only`: no permissions (none synced), routes under `superadmin`, controllers `Gate::authorize('admin-core.superadmin')`, no policy; tests check a non-SA level is refused (like Levels).

Masked fields: a field whose name matches `audit.masked_fields` (e.g. `npwp`, `nik`, `no_hp`) is listed in the generated `assertAudited(..., masked: [...])`; a field that *looks* personal but isn't configured (`nip`, `telepon`, `email`, `alamat_*`…) prints a reminder to add it (R15). The generator never edits config.

## Post-run steps

1. `permissions:sync` (skipped for `--superadmin-only`), `typescript:transform`, `wayfinder:generate --with-form`, `modules:clear`.
2. Print the next steps: review the migration, `php artisan migrate`, adjust validation / columns / `auditLabel()`, give a level access in Hak Akses (R1).

The generator doesn't run the migration (it changes the database; the developer runs it, AGENTS §2).

## Steps

1. `FieldType` + `FieldDefinition` + `ModuleBlueprint` (parsing, validation, naming: slug, table, relation, label field) with unit tests.
2. Cut the stubs from `Invoice` / `Customer`; `StubRenderer` + `ModuleWriter`.
3. `make:module`, then generate the golden module (Q8) and get it through `composer check` with no edits; fix stubs, never the output.
4. `make:widget` (all five types, working defaults: see Q5) + boot-time widget validation.
5. Tests, DEVELOPER.md, CHANGELOG, report.

## Tests

- **Unit (package):** option parsing for every type, nullable `?`, bad type / name / group / icon / duplicate slug / reserved field names (`id`, `lock_version`, timestamps) refused before writing; slug and table naming; masked-field detection and reminders.
- **Generation (package, Testbench, temp root):** every stub renders for every action subset and for `--superadmin-only`; the rendered PHP lints (`php -l`); `--force` and refuse-existing behaviour; `make:widget` registers the class in `module.php` and writes its test.
- **Golden module (skeleton):** the generated module's own tests (the AGENTS §8 cases) run in the normal suite; `ContractTest` covers it (shape, routes, policy, audit, widgets); the menu, palette and matrix include it (one feature test).
- **Drift guard:** `composer check` regenerates the golden module and fails on a diff, like the generated TS files (Q8).
- **ModuleDefinition:** a widget that doesn't extend `Widget` / has a foreign key prefix fails boot (negative fixture).

**08b as built** (all boxes done; reviewed 2026-10-25):

- [x] `src/Generator/{FieldType,FieldDefinition,ModuleBlueprint,ForeignTarget,StubRenderer,ModuleWriter}.php`; stubs in `stubs/module` (whole files), `stubs/module/fragments` (per-action controller methods and tests), `stubs/module/js` (pages, form, dictionaries), `stubs/widget` (one body per type + test).
- [x] `make:module` (+ `--path`, `--migration-date`, `--no-post`, `--allow-registered` for the golden check) and `make:widget`; Pint and Prettier on the output; post-run in fresh processes.
- [x] Boot-time widget check in `ModuleDefinition`; `assertWidgetContract()` keeps unique keys and permissions (its class / prefix checks were unreachable after the boot check, so they went; the Leaky fixtures now break those two rules).
- [x] Golden module `skeleton/modules/Sample` (every field type, every action, `customer_id:foreign(customers)`, two file slots, widget `JumlahBaru`) from `tests/Fixtures/GoldenSample.php`; `GoldenSampleTest` regenerates it and diffs every file; `composer sample:regenerate`.
- [x] Tests: `GeneratorTest` (package: parsing, every refusal, masked / personal fields, every action subset and superadmin_only render to valid PHP with no leftover placeholder, write / refuse / --force, make:widget), `ModuleDefinitionTest` (two new refusals), `WidgetContractTest`, the generated `SampleTest` (14) and `JumlahBaruWidgetTest` (3), `GoldenSampleTest` (drift; menu, palette and matrix).
- [x] Variants checked end to end once (not kept): a view-only module with a nullable label, a superadmin_only module with a required multiple slot and an enum, an edit + download module without create with a required single slot: typecheck, ESLint, Prettier, PHPStan and their 24 generated tests green. That run found three generator bugs, fixed in the stubs.

After the 08b build (owner, 2026-10-24): two more golden modules kept permanently and compared in `composer check` like `Sample`: `SampleReadonly` (view only) and `SampleAdmin` (superadmin_only, a required file slot), from `tests/Fixtures/GoldenModules.php` (`GoldenModulesTest`, `composer sample:regenerate`); their generated tests run with the rest. `make:module --no-sync` skips `permissions:sync`; the boilerplate repo always generates with it.

Decisions where the plan was silent:
- No `Providers/` stub: Laravel finds `Policies/{Name}Policy` for `Models/{Name}` by convention, like the demo modules.
- A superadmin_only module still gets a policy (the module shape requires it), whose methods return false: Super Admin passes `Gate::before`, so controllers stay the same as in other modules.
- Labels come from the field names (`tanggal_mulai` → "Tanggal mulai"); `en.ts` starts with the same text (its comment says to translate). Module texts are generic Indonesian ("Daftar contoh", "Belum ada contoh").
- The list shows every field except text, boolean and file; sorts on string, number, money and date fields; searches the string fields; filters on enums. The export has the list's columns (R5: nothing the list doesn't show).
- A generated test input gives every required attachment slot a fake file; the form state type leaves out `lock_version` (an edit-only module's form state comes from `Update…Data`).
- `make:widget` refuses a superadmin_only module (no permission to show the widget by) and a segment widget on a module without an enum column.
- The golden module uses Indonesian field names and the label "Contoh", as a project would.

## Approval (2026-10-24)

1. Plain stub files with placeholders plus small PHP builders for the per-field / per-action fragments. No Blade (its `{{ }}` clashes with TSX).
2. Pint + Prettier on the generated files (deterministic output, so the sample check is stable).
3. Stop with a clear message when a `foreign` target has no `lookup` route.
4. **Changed:** file fields become named attachment slots (Part 08a): an additive `collection` column, per-slot access (`attachments('scan_ktp')`), each slot single or multiple with an optional required rule, accepted types and a size limit; one upload field per slot in the form, files grouped by slot on Show; signed URLs and audit as before; the Invoice demo moves to a named slot as the pattern.
5–7. As recommended.
8. Approved; `skeleton/modules/Sample` stays in the boilerplate repo permanently as the generator's golden test. Only `admin:remove-demo` in a new project removes it (Phase 10a item updated).
9–10. As recommended; the Phase 05 roadmap fix goes in the first commit. The boot-time widget check is in.

## Open questions (answered above)

**Q1. Stub engine.** Plain `.stub` files with `{{ placeholder }}`s, and `FieldType` producing the per-field fragments (fillable, casts, rules, columns, form fields, factory values) as strings. **Recommended.** Alternative: Blade templates (loops in the stubs, but Blade escaping and whitespace make PHP/TSX output fragile).

**Q2. Formatting the output.** The stubs are written Pint- and Prettier-clean, and the command still runs `vendor/bin/pint` on the new folder and `npx prettier --write` on its TSX when they're installed (field lists change line lengths). **Recommended.** Alternative: rely on the stubs alone (a long field list can break the Prettier check).

**Q3. `foreign(table)`.** The target must be a module whose model uses that table and has a `lookup` route (like `Customer`); otherwise the generator stops and names the missing piece (it never edits another module: AGENTS §3). **Recommended.** Alternative: also generate `lookup` into the target module.

**Q4. `file` fields.** Attachments are one collection per record (no per-field slot), so any `file` field turns on `HasAttachments` and the Lampiran tab; two `file` fields give one tab, with a printed note. **Recommended.** Alternative: add per-field attachment collections to the core first (a core change, larger).

**Q5. `make:widget` defaults.** Each type gets working code on the module's model through `visibleTo()`, not a placeholder: `stat` = records in the range, `stat_stack` = total / in range / today, `segment` = per value of the module's first enum field (refused without one), `bar_chart` = records per day, `table` = latest 5 (label field + created). **Recommended.** Alternative: `stat` and `table` only.

**Q6. Custom actions in `--actions`.** A custom verb (e.g. `approve`) needs real behaviour, and a stub body would be a placeholder (AGENTS §2). **Recommended:** the generator accepts the five standard actions only and prints R3 for custom ones. Alternative: generate route, policy method, audited controller action and a Show-page button whose action only records the audit event.

**Q7. `--force`.** Overwrite only a module folder the generator wrote (a marker comment in `module.php`) and only when the working tree is clean for that folder. **Recommended.** Alternative: no `--force` (delete the folder by hand to regenerate).

**Q8. Proving "every field type passes `composer check` with no manual edits".** Commit a generated golden module `skeleton/modules/Sample` (every field type, every action, a `foreign(customers)` field and one widget); `composer check` regenerates it into a temp folder and diffs it against the committed copy, so stub drift fails the gate, and its tests, types and lint run with everything else. It shows in the skeleton menu (group `master`). **Recommended.** Alternative: a separate `composer test:generator` that generates, runs the gates and deletes (slower, outside `composer check`).

**Q9. Seeder.** `Database/Seeders/{Name}Seeder.php` creates 25 factory rows, run on demand (`db:seed --class=…`), never from `DatabaseSeeder` (no demo data in production; rehearsal only). **Recommended.**

**Q10. Phase 05 status.** The roadmap's progress table still shows Phase 05 as ☐ although its screens were approved on 2026-10-20. Tick it in this phase's first commit? **Recommended: yes.**
