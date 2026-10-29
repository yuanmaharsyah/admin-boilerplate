<a id="top"></a>

# Admin Boilerplate

**English** · [Bahasa Indonesia](README.id.md)

[![tests](https://github.com/yuanmaharsyah/admin-boilerplate/actions/workflows/tests.yml/badge.svg)](https://github.com/yuanmaharsyah/admin-boilerplate/actions/workflows/tests.yml)
![PHP 8.4](https://img.shields.io/badge/PHP-8.4-777BB4)
![Laravel 13](https://img.shields.io/badge/Laravel-13-FF2D20)
![Inertia 3](https://img.shields.io/badge/Inertia-3-9553E9)
![React 19](https://img.shields.io/badge/React-19-61DAFB)
[![License: MIT](https://img.shields.io/badge/license-MIT-green)](LICENSE)

A Laravel 13 + Inertia 3 + React 19 admin panel you start new projects from. Each feature is a **module** that one command generates: its pages, permissions, menu entry, audit trail and tests come out ready. Access is managed per **level** in a permission matrix, and every change is written to a tamper-resistant activity log. The interface is in Bahasa Indonesia first, with English included.

**What you get**

- A module generator (`make:module`) that writes the list, form, detail page, export, file uploads and tests in one go.
- Level-based access control with a permission matrix, and data scoping per user (for example "only my unit").
- An activity log of every change and sign-in that can't be edited, with personal data masked.
- A dashboard of widgets, Settings (branding, contact, site access), queued downloads, trash with restore, dark mode.
- Strict quality gates (`composer check`) and AI instructions for Claude Code (Laravel Boost skills).

> [!IMPORTANT]
> **To build an app, use `composer create-project`. Fork this repository only to contribute.** A project made with `create-project` keeps receiving updates through `composer update`; a fork doesn't.

## Contents

1. [Five concepts](#five-concepts)
2. [Getting Started](#getting-started)
3. [Next steps: "I want to…"](#next-steps-i-want-to)
4. [Using it with AI](#using-it-with-ai)
5. [Cheat sheet](#cheat-sheet)
6. [Troubleshooting](#troubleshooting)
7. [Contributing, security, license](#contributing-security-license)

## Five concepts

Read these once; the steps below use them.

- **Package vs your project.** The shared core lives in a Composer package, `yuanmaharsyah/admin-core` (in `vendor/`, never edited). Your project is a normal Laravel app made from the skeleton, `yuanmaharsyah/admin-skeleton`. Your code goes in your project; core improvements arrive with `composer update`.
- **Module.** One feature, in one folder: `modules/Kendaraan` with a `module.php` that declares its name, menu group, icon and actions. The menu, routes, command palette and permissions are all read from that file.
- **Action → permission.** Each action a module declares (`view`, `create`, `edit`, `delete`, `download`, or your own like `approve`) becomes a permission named `{slug}.{action}`, for example `kendaraans.edit`.
- **Level.** A role. Every user has exactly one level, and a level holds a set of permissions. You grant permissions to levels in the **Hak Akses** matrix, never to users directly.
- **Super Admin.** A protected level that can do everything, and the only one that manages Levels, the matrix, Settings and Trash. There is always at least one active Super Admin.

[↑ Back to top](#top)

## Getting Started

One path, top to bottom. Every step says what you should see; if you don't, the "If not" line has the likely fix.

### a. Check the requirements

You need PHP 8.4+, Composer 2, Node 22+ with npm, MySQL 8 (or MariaDB 10.11+) and git.

```bash
php -v && composer -V && node -v && mysql --version
```

You should see: `PHP 8.4…` (or newer), `Composer version 2…`, `v22…` (or newer) and a MySQL 8 / MariaDB 10.11+ version.

If not: install the missing tool (on macOS, `brew install php composer node mysql`); if `php -v` shows an older PHP, put PHP 8.4 first on your `PATH`.

### b. Create the project

This downloads the skeleton and the core package, removes the demo modules and installs the AI instructions.

```bash
composer create-project yuanmaharsyah/admin-skeleton my-app
cd my-app
```

You should see, at the end: `Next: set DB_DATABASE, DB_USERNAME and DB_PASSWORD in .env and the test database in phpunit.xml, create both databases, then run: composer setup && composer dev`.

If not: `Your requirements could not be resolved` usually means an older PHP than 8.4 (`php -v`), or a missing PHP extension that the message names (install it, for example `pdo_mysql`, `intl`, `zip`, `gd`).

### c. Create the databases and point the project at them

The app uses one database, and the tests use a second one that they empty on every run.

```bash
mysql -u root -p -e "CREATE DATABASE my_app; CREATE DATABASE my_app_test;"
```

Then edit two files:

- In `.env`, set `DB_DATABASE=my_app`, `DB_USERNAME` and `DB_PASSWORD` to your MySQL user.
- In `phpunit.xml`, set the `DB_DATABASE` line to `my_app_test`.

You should see: no output from `mysql` (the databases are created).

If not: `Access denied` means a wrong user or password. If your user can't create databases, ask your database admin for `my_app` and `my_app_test` and grant that user all rights on both.

### d. Install, then run it

`composer setup` installs the npm packages, creates the tables, seeds the first accounts, links the public storage (for the logo you upload in step f) and builds the frontend. `composer dev` starts the web server, the queue worker, the log viewer and Vite together.

```bash
composer setup
```

You should see, near the end: two lines `Password for [superadmin]: …` and `Password for [superadmin2]: …`. **Copy one now: it's shown only once.**

```bash
composer dev
```

You should see: the server at `http://127.0.0.1:8000`. Keep this terminal running and open that address.

If not: `SQLSTATE[HY000] [1045]` means the `.env` database user or password is wrong; `Unknown database` means the database from step c doesn't exist; `Address already in use` means port 8000 is taken (stop the other server, or run `php artisan serve --port=8001` in place of `composer dev`).

### e. Sign in and change the password

Open `http://127.0.0.1:8000/login` (the address without `/login` is the public welcome page), enter `superadmin` and the password you copied, then choose **Masuk**.

You should see: **Beranda**, the dashboard, with the menu on the left.

Change the generated password now: open the account menu (your initials, top right) → **Ganti kata sandi**, fill the current password and the new one twice, then choose **Simpan kata sandi**. A password needs at least 10 characters, with upper and lower case letters and a number. You should see: "Kata sandi berhasil diubah."

If not: "Username atau kata sandi salah." means a copy mistake (the password often has symbols: copy it whole); run `php artisan admin:create-superadmin` to create a new Super Admin with a password you type.

### f. Give the app its name and logo

Open **Pengaturan**: the gear icon on the left rail opens the **Sistem** group. On the **Umum** tab, fill **Nama aplikasi**, upload **Logo 1:1** (a square PNG, JPG or WebP, at least 128 px), then choose **Simpan**.

You should see: "Pengaturan disimpan.", and your name and logo at the top of the menu and on the sign-in page.

If not: a logo that doesn't appear after saving means the public storage link is missing; run `php artisan storage:link`.

### g. Create your first module

Generate a vehicle module with four fields: two texts, a year and a required file upload. Keep `composer dev` running and use a second terminal in the same folder.

```bash
php artisan make:module Kendaraan --fields="plat_nomor:string,merk:string,tahun:year,scan_stnk:file(single,required,pdf|jpg,2048)" --actions=view,create,edit,delete,download --group=master --icon=car
php artisan migrate
```

You should see: `Module Kendaraan written to modules/Kendaraan`, then the migration `create_kendaraans_table … DONE`. Reload the browser: **Kendaraan** appears in the **Master Data** group (the database icon on the rail). Open it, choose **Tambah**, fill the form, attach a PDF or JPG and choose **Simpan**: you land on the new record, with the file under **Lampiran**.

If not: the menu doesn't show the new module until the browser reloads; a "Page not found Kendaraan::Index" means Vite wasn't running (start `composer dev`, or run `npm run build` once).

<details>
<summary>All field types</summary>

| Type | Example | Stored as / shown as |
|---|---|---|
| `string` | `nama:string` | text up to 255; the first `string` field is the record's title |
| `text` | `catatan:text` | long text, a textarea |
| `integer` | `jumlah:integer` | whole number |
| `year` | `tahun:year` | a year, 1900–2100, shown as `2024` (no thousands mark) |
| `decimal` | `berat:decimal` | number with decimals, id-ID format |
| `currency` | `harga:currency` | Rupiah |
| `boolean` | `aktif:boolean` | switch |
| `date` | `tanggal:date` | date picker, shown as "20 Okt 2026" |
| `datetime` | `mulai:datetime` | date and time |
| `enum(a,b)` | `status:enum(draf,terbit)` | a select with those values |
| `foreign(table)` | `unit_id:foreign(units)` | a searchable select of another module's records |
| `file(...)` | `scan:file(single,required,pdf\|jpg,2048)` | an upload slot: `single` or `multiple`, `required`, allowed types, max KB |

Add `?` to make a field optional: `catatan:text?`. Name fields in Indonesian `snake_case`; the labels come from the names (`tanggal_mulai` → "Tanggal mulai").

</details>

### h. Give a level access and test it as that user

New modules are visible only to Super Admin until you grant them.

1. Open **Levels** (in **Sistem**) → on the **Operator** row, **Hak akses**. Tick **View** and **Create** on the **Kendaraan** row, then choose **Simpan** in the bar at the bottom.
2. Open **Users** (in **Master Data**) → **Tambah**. Fill the name, username, email and a password (twice), choose the level **Operator**, then choose **Simpan**.
3. Sign out (account menu → **Keluar**), open `http://127.0.0.1:8000/login` and sign in as the new user.

You should see: the new user is first asked to set their own password (every account an admin creates must change it). After that, the menu shows **Beranda** and **Kendaraan** only (a new Operator level starts with Beranda and View on the project's own modules created before `composer setup`; never Users, Levels or Log Aktivitas). The Kendaraan list has **Tambah**, no download, and each row's **⋯** menu offers only **Lihat**.

If not: a module missing from the menu means its **View** isn't ticked; a page that answers 403 means that action isn't ticked. Changes apply on the user's next page load.

### i. Put the project in your own git repository

The project is yours now; it doesn't point back to this repository.

```bash
git init
git add --all
git commit -m "chore: new project from admin-skeleton"
```

You should see: a commit with your files. `.env` and `vendor/` aren't in it (they are ignored). `CLAUDE.md` and `.claude/skills` are: they are your project's AI instructions.

If not: `Author identity unknown` means git doesn't know you yet; set `git config --global user.name` and `user.email`, then commit again.

### j. Keep it updated

Core fixes and features arrive as new versions of the package.

```bash
composer update yuanmaharsyah/admin-core
php artisan migrate
php artisan permissions:sync
```

You should see: `Upgrading yuanmaharsyah/admin-core (…)` when there is a new version (`Nothing to install, update or remove` when you're up to date), then any new migrations. Composer also regenerates the TypeScript types, the routes and the AI instructions (`CLAUDE.md`, `.claude/skills`); commit those files.

If not: read [`UPGRADE.md`](https://github.com/yuanmaharsyah/admin-boilerplate/blob/master/packages/admin-core/UPGRADE.md) for steps a version needs, then run `composer check` to find what to adjust.

[↑ Back to top](#top)

## Next steps: "I want to…"

Each guide assumes the Kendaraan module from step g. After any change, run `composer check` until it's green.

<details>
<summary><b>…add a field to a module</b></summary>

1. Create a migration in the module, add the column (and an index if lists filter or sort on it), and a `down()` that drops it:
   ```bash
   php artisan make:migration add_warna_to_kendaraans_table --path=modules/Kendaraan/Database/Migrations
   ```
2. In `modules/Kendaraan/Models/Kendaraan.php`, add it to `$fillable` and `casts()`.
3. Add it with its rules to `Data/StoreKendaraanData.php`, `Data/UpdateKendaraanData.php`, and to `Data/KendaraanData.php` (detail) and `Data/KendaraanListItemData.php` (list).
4. Regenerate the TypeScript types; the compiler then shows where the field is missing:
   ```bash
   php artisan typescript:transform
   ```
5. Add the input to `resources/js/components/KendaraanForm.tsx`, the column to `resources/js/pages/Index.tsx`, and the labels to `resources/js/lang/id.ts` and `en.ts`.
6. Run `php artisan migrate`.

Personal data (NIK, NPWP, phone, address, account number) also goes into `admin-core.audit.masked_fields`, so the activity log masks it.

</details>

<details>
<summary><b>…link two modules (a record belongs to another)</b></summary>

1. The target module must exist first; every generated module has the search endpoint the link needs.
   ```bash
   php artisan make:module Unit --fields="nama:string,kode:string" --actions=view,create,edit,delete --group=master --icon=building
   ```
2. Use a `foreign(table)` field in the module that links to it:
   ```bash
   php artisan make:module Ruangan --fields="nama:string,lantai:integer,unit_id:foreign(units)" --actions=view,create,edit,delete --group=master --icon=door-open
   php artisan migrate
   ```

You get a searchable select in the form, the unit's name in the list and the detail page, a foreign key that refuses to delete a unit still in use, and validation that only accepts units the user is allowed to see. A level that edits rooms also needs **View** on Unit, so the select can search it.

</details>

<details>
<summary><b>…add a file upload</b></summary>

With the generator, a `file(...)` field does everything: `scan_ktp:file(single,required,pdf|jpg,2048)` or `lampiran:file(multiple)`.

In an existing module, declare the slot on the model and follow the `admin-attachments` skill (in `.claude/skills/admin-attachments/SKILL.md`):

```php
use HasAttachments;

public function attachmentSlots(): array
{
    return [
        'scan_ktp' => AttachmentSlot::single(__('Scan KTP'))->required()->mimes(['pdf', 'jpg', 'png'])->maxKb(2048),
    ];
}
```

Files are stored privately under random names; downloads are signed links valid for 5 minutes; every upload, download and delete is in the activity log.

</details>

<details>
<summary><b>…add an approve button</b></summary>

1. In `modules/Kendaraan/module.php`, add `'approve'` to `actions`, then create its permission:
   ```bash
   php artisan permissions:sync
   ```
2. Policy: add `public function approve(User $user, Kendaraan $kendaraan): bool`.
3. Route in `modules/Kendaraan/Routes/web.php`: `Route::post('{kendaraan}/approve', [KendaraanController::class, 'approve'])->middleware('permission:kendaraans.approve')->name('approve');`
4. Controller: `Gate::authorize('approve', $kendaraan)`, do the work, then `Audit::record('approve', $kendaraan)` and redirect with a message.
5. Page: wrap the button in `<Can permission="kendaraans.approve">`.

The matrix now shows an **Approve** column for Kendaraan. Details: the `admin-custom-action` skill.

</details>

<details>
<summary><b>…limit records to the user's own unit</b></summary>

Every list, detail page, export and select goes through `visibleTo($user)`, which does nothing until a model defines `applyVisibility()`:

```php
protected function applyVisibility(Builder $query, ?Authenticatable $user): void
{
    if ($user instanceof User && ! $user->isSuperAdmin()) {
        $query->where('unit_id', $user->unit_id);
    }
}
```

The users need a `unit_id` column first: add it with a migration and show it in the Users form with a form extension (the `admin-customize-core` skill, "Extra user fields"). Test it with `ModuleAssertions::assertScopedToUser()`.

</details>

<details>
<summary><b>…add a dashboard widget</b></summary>

```bash
php artisan make:widget Kendaraan TotalKendaraan --type=stat --size=sm
```

Types: `stat`, `stat_stack`, `segment`, `bar_chart`, `table`. It writes the widget class with a working query through `visibleTo()`, its test, and its line in `module.php`. Each user sees a widget only with that module's **View** permission. Adjust `data()` to show what you need.

</details>

<details>
<summary><b>…change or add settings</b></summary>

Super Admin edits the built-in settings in **Pengaturan**. To add your own, publish the config once, then add a field to a tab:

```bash
php artisan vendor:publish --tag=admin-core-config
```

In `config/admin-core.php` → `settings`, for example `'kontak' => ['fields' => ['fax' => ['type' => 'phone', 'label' => 'Fax']]]`. Read it anywhere with `settings('kontak.fax')`. Your file only needs what you add or change; the defaults stay.

<details>
<summary>Built-in settings</summary>

| Tab | Fields |
|---|---|
| Umum | Nama aplikasi, Favicon, Logo 1:1, Logo lanskap |
| Kontak | Telepon, WhatsApp, Alamat, Kode pos |
| Sosial Media | Instagram, X, TikTok, Facebook, YouTube, LinkedIn |
| Akses Situs | Mode (`open`, `maintenance`, `coming_soon`), Pesan |
| Keamanan | Lama sesi (menit) |
| Ekspor | Batas unduhan langsung (baris) |

Field types: `string`, `text`, `integer`, `boolean`, `enum` (with `options`), `phone`, `whatsapp`, `postal_code`, `social`.

</details>

</details>

<details>
<summary><b>…deploy to a server</b></summary>

On a server with PHP 8.4, MySQL, Node, Nginx (or Apache), a supervised queue worker and cron:

```bash
git pull && composer install --no-dev -o && npm ci && npm run build
php artisan migrate --force && php artisan permissions:sync && php artisan optimize
php artisan storage:link
php artisan admin:doctor
```

`storage:link` is needed on the first deploy only. In production set `APP_ENV=production` and `APP_DEBUG=false`, use a real queue driver with a worker under supervisor, run the scheduler every minute (`php artisan schedule:run`), and set `ADMIN_SEED_PASSWORD` before the first seed (or skip the seeder and run `php artisan admin:create-superadmin`). `admin:doctor` reports what's missing.

</details>

[↑ Back to top](#top)

## Using it with AI

Your project ships instructions for Claude Code: `CLAUDE.md` holds the project rules, and `.claude/skills/` holds one skill per task (`admin-make-module`, `admin-attachments`, `admin-custom-action`, `admin-dashboard-widget`, …). Claude Code loads the right skill by itself; you ask in plain words.

```bash
claude
```

Then, for example:

> Add a Kendaraan module: plat nomor (required), merk (required), tahun (a year, required) and a required scan of the STNK (PDF or JPG, max 2 MB). Users can view, create, edit, delete and download the list. Put it in Master Data, migrate it, and make sure composer check passes.

It runs `make:module`, adjusts the validation and tests, and runs `composer check`. The instructions come from the package and update with it (`php artisan boost:update`, run for you by `composer update`).

[↑ Back to top](#top)

## Cheat sheet

| Command | What it does |
|---|---|
| `composer dev` | Runs the app: web server, queue worker, log viewer and Vite |
| `composer setup` | First install: npm packages, tables, first accounts, frontend build |
| `composer check` | Every quality gate: code style, static analysis, types, lint, tests, build |
| `php artisan make:module Name --fields=… --actions=…` | Generates a whole module |
| `php artisan make:widget Module Name --type=…` | Generates a dashboard widget |
| `php artisan migrate` | Creates the tables of new modules |
| `php artisan permissions:sync` | Makes the permissions match the modules' actions |
| `php artisan admin:create-superadmin` | Creates a Super Admin (recovery) |
| `php artisan admin:access open` | Reopens the public pages after maintenance mode |
| `php artisan admin:doctor` | Checks the setup (assets, storage link, environment) |
| `composer update yuanmaharsyah/admin-core` | Updates the core |

[↑ Back to top](#top)

## Troubleshooting

| Symptom | Likely cause | Fix |
|---|---|---|
| A new module isn't in the menu | The page wasn't reloaded, or your level lacks its **View** | Reload; Levels → Hak akses |
| 403 although the box is ticked | Permissions out of date | `php artisan permissions:sync` |
| "Page not found Kendaraan::Index" | Vite isn't running, or the folder's letter case differs | Start `composer dev`; keep `resources/js/pages` exactly |
| Every page sends you to "Ganti kata sandi" | The account must change its password (new account, or an admin reset it) | Set a new password |
| Logged out with "Sesi Anda telah berakhir" | Your account was deactivated, or its level or password changed | Sign in again |
| Logo or favicon answers 404 | The public storage link is missing | `php artisan storage:link` |
| Public pages answer 503 or "Segera hadir" | Site access is in maintenance or coming-soon mode | Pengaturan → Akses Situs, or `php artisan admin:access open` |
| A download never arrives | The queue worker isn't running | Run `composer dev` (locally) or supervisor (server) |
| "Data ini telah diubah oleh pengguna lain" | Someone saved the record after you opened it | **Salin perubahan saya**, then **Muat ulang**, and apply your changes again |
| TypeScript error after a PHP change | Types not regenerated | `php artisan typescript:transform` |

More: the "Troubleshooting" table in [`DEVELOPER.md`](DEVELOPER.md).

[↑ Back to top](#top)

## Contributing, security, license

**Contributing.** Fork this repository, create a branch, make the change with tests, run `composer check` from the repo root until it's green, and open a pull request. The rules are in [`AGENTS.md`](AGENTS.md), the map and recipes in [`DEVELOPER.md`](DEVELOPER.md), the workflow in [`CONTRIBUTING.md`](CONTRIBUTING.md).

**Security.** Report vulnerabilities privately, never in a public issue: see [`SECURITY.md`](SECURITY.md).

**License.** MIT, © 2026 Yuan Maharsyah. See [`LICENSE`](LICENSE).

[↑ Back to top](#top)
