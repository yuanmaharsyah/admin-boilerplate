<a id="top"></a>

# Admin Boilerplate

[English](README.md) · **Bahasa Indonesia**

[![tests](https://github.com/yuanmaharsyah/admin-boilerplate/actions/workflows/tests.yml/badge.svg)](https://github.com/yuanmaharsyah/admin-boilerplate/actions/workflows/tests.yml)
![PHP 8.4](https://img.shields.io/badge/PHP-8.4-777BB4)
![Laravel 13](https://img.shields.io/badge/Laravel-13-FF2D20)
![Inertia 3](https://img.shields.io/badge/Inertia-3-9553E9)
![React 19](https://img.shields.io/badge/React-19-61DAFB)
[![License: MIT](https://img.shields.io/badge/license-MIT-green)](LICENSE)

Panel admin Laravel 13 + Inertia 3 + React 19 yang menjadi titik awal proyek baru. Setiap fitur adalah sebuah **modul** yang dibuat dengan satu perintah: halaman, hak akses, entri menu, jejak audit, dan pengujiannya langsung jadi. Akses diatur per **level** lewat matriks hak akses, dan setiap perubahan tercatat di log aktivitas yang tidak bisa diubah. Antarmukanya berbahasa Indonesia, dengan bahasa Inggris sebagai pilihan kedua.

**Yang Anda dapatkan**

- Generator modul (`make:module`) yang sekaligus membuat daftar, formulir, halaman detail, ekspor, unggah berkas, dan pengujian.
- Kontrol akses berbasis level dengan matriks hak akses, plus pembatasan data per pengguna (misalnya "hanya unit saya").
- Log aktivitas atas setiap perubahan dan proses masuk yang tidak bisa diedit, dengan data pribadi disamarkan.
- Beranda berisi widget, Pengaturan (identitas aplikasi, kontak, akses situs), unduhan lewat antrean, sampah dengan pemulihan, mode gelap.
- Gerbang kualitas yang ketat (`composer check`) dan instruksi AI untuk Claude Code (skill Laravel Boost).

> [!IMPORTANT]
> **Untuk membangun aplikasi, gunakan `composer create-project`. Fork repositori ini hanya jika ingin berkontribusi.** Proyek dari `create-project` tetap menerima pembaruan lewat `composer update`; fork tidak.

## Daftar isi

1. [Lima konsep](#lima-konsep)
2. [Memulai](#memulai)
3. [Langkah berikutnya: "Saya ingin…"](#langkah-berikutnya-saya-ingin)
4. [Menggunakannya bersama AI](#menggunakannya-bersama-ai)
5. [Contekan perintah](#contekan-perintah)
6. [Pemecahan masalah](#pemecahan-masalah)
7. [Kontribusi, keamanan, lisensi](#kontribusi-keamanan-lisensi)

## Lima konsep

Baca sekali; langkah-langkah di bawah memakainya.

- **Paket dan proyek Anda.** Inti bersama ada di paket Composer `yuanmaharsyah/admin-core` (di `vendor/`, tidak pernah diedit). Proyek Anda adalah aplikasi Laravel biasa yang dibuat dari skeleton `yuanmaharsyah/admin-skeleton`. Kode Anda ditulis di proyek; perbaikan inti datang lewat `composer update`.
- **Modul.** Satu fitur dalam satu folder: `modules/Kendaraan` dengan `module.php` yang menyatakan nama, grup menu, ikon, dan aksinya. Menu, rute, palet perintah, dan hak akses semuanya dibaca dari file itu.
- **Aksi → hak akses.** Setiap aksi yang dinyatakan modul (`view`, `create`, `edit`, `delete`, `download`, atau aksi Anda sendiri seperti `approve`) menjadi hak akses bernama `{slug}.{action}`, misalnya `kendaraans.edit`.
- **Level.** Sebuah peran. Setiap pengguna punya tepat satu level, dan setiap level memegang sekumpulan hak akses. Hak akses diberikan ke level lewat matriks **Hak Akses**, tidak pernah langsung ke pengguna.
- **Super Admin.** Level terlindungi yang boleh melakukan apa saja, dan satu-satunya yang mengelola Levels, matriks, Pengaturan, dan Sampah. Selalu ada minimal satu Super Admin yang aktif.

[↑ Kembali ke atas](#top)

## Memulai

Satu jalur, dari atas ke bawah. Setiap langkah menyebutkan apa yang seharusnya Anda lihat; kalau tidak, baris "Jika tidak" berisi perbaikan yang paling mungkin.

### a. Periksa kebutuhan

Anda memerlukan PHP 8.4+, Composer 2, Node 22+ dengan npm, MySQL 8 (atau MariaDB 10.11+), dan git.

```bash
php -v && composer -V && node -v && mysql --version
```

Yang seharusnya terlihat: `PHP 8.4…` (atau lebih baru), `Composer version 2…`, `v22…` (atau lebih baru), dan versi MySQL 8 / MariaDB 10.11+.

Jika tidak: pasang alat yang belum ada (di macOS: `brew install php composer node mysql`); jika `php -v` menunjukkan PHP lama, taruh PHP 8.4 di urutan pertama `PATH`.

### b. Buat proyek

Perintah ini mengunduh skeleton dan paket inti, menghapus modul demo, dan memasang instruksi AI.

```bash
composer create-project yuanmaharsyah/admin-skeleton my-app
cd my-app
```

Yang seharusnya terlihat, di bagian akhir: `Next: set DB_DATABASE, DB_USERNAME and DB_PASSWORD in .env and the test database in phpunit.xml, create both databases, then run: composer setup && composer dev`.

Jika tidak: `Your requirements could not be resolved` biasanya berarti PHP lebih lama dari 8.4 (`php -v`), atau ekstensi PHP yang disebut di pesan belum terpasang (pasang, misalnya `pdo_mysql`, `intl`, `zip`, `gd`).

### c. Buat database dan arahkan proyek ke sana

Aplikasi memakai satu database, dan pengujian memakai database kedua yang dikosongkan setiap kali dijalankan.

```bash
mysql -u root -p -e "CREATE DATABASE my_app; CREATE DATABASE my_app_test;"
```

Lalu ubah dua file:

- Di `.env`, isi `DB_DATABASE=my_app`, serta `DB_USERNAME` dan `DB_PASSWORD` dengan pengguna MySQL Anda.
- Di `phpunit.xml`, ubah baris `DB_DATABASE` menjadi `my_app_test`.

Yang seharusnya terlihat: tidak ada keluaran dari `mysql` (database sudah dibuat).

Jika tidak: `Access denied` berarti nama pengguna atau kata sandi salah. Jika pengguna Anda tidak boleh membuat database, minta admin database membuatkan `my_app` dan `my_app_test` dan memberi pengguna itu semua hak atas keduanya.

### d. Pasang, lalu jalankan

`composer setup` memasang paket npm, membuat tabel, mengisi akun pertama, menautkan storage publik (untuk logo yang diunggah di langkah f), dan membangun frontend. `composer dev` menjalankan web server, worker antrean, penampil log, dan Vite sekaligus.

```bash
composer setup
```

Yang seharusnya terlihat, menjelang akhir: dua baris `Password for [superadmin]: …` dan `Password for [superadmin2]: …`. **Salin salah satunya sekarang: hanya ditampilkan sekali.**

```bash
composer dev
```

Yang seharusnya terlihat: server di `http://127.0.0.1:8000`. Biarkan terminal ini berjalan.

Jika tidak: `SQLSTATE[HY000] [1045]` berarti pengguna atau kata sandi database di `.env` salah; `Unknown database` berarti database dari langkah c belum ada; `Address already in use` berarti port 8000 sedang dipakai (hentikan server lain, atau jalankan `php artisan serve --port=8001` sebagai ganti `composer dev`).

### e. Masuk dan ganti kata sandi

Buka `http://127.0.0.1:8000/login` (alamat tanpa `/login` adalah halaman sambutan publik), isi `superadmin` dan kata sandi yang Anda salin, lalu pilih **Masuk**.

Yang seharusnya terlihat: **Beranda**, dengan menu di sebelah kiri.

Ganti kata sandi bawaan sekarang: buka menu akun (inisial Anda, kanan atas) → **Ganti kata sandi**, isi kata sandi saat ini dan kata sandi baru dua kali, lalu pilih **Simpan kata sandi**. Kata sandi minimal 10 karakter, dengan huruf besar, huruf kecil, dan angka. Yang seharusnya terlihat: "Kata sandi berhasil diubah."

Jika tidak: "Username atau kata sandi salah." berarti salah salin (kata sandinya sering memuat simbol: salin seluruhnya); jalankan `php artisan admin:create-superadmin` untuk membuat Super Admin baru dengan kata sandi yang Anda ketik sendiri.

### f. Beri nama dan logo aplikasi

Buka **Pengaturan**: ikon roda gigi di rel kiri membuka grup **Sistem**. Di tab **Umum**, isi **Nama aplikasi**, unggah **Logo 1:1** (PNG, JPG, atau WebP persegi, minimal 128 px), lalu pilih **Simpan**.

Yang seharusnya terlihat: "Pengaturan disimpan.", serta nama dan logo Anda di atas menu dan di halaman masuk.

Jika tidak: logo yang tidak muncul setelah disimpan berarti tautan storage publik belum ada; jalankan `php artisan storage:link`.

### g. Buat modul pertama Anda

Buat modul kendaraan dengan empat field: dua teks, satu tahun, dan unggah berkas yang wajib. Biarkan `composer dev` berjalan dan pakai terminal kedua di folder yang sama.

```bash
php artisan make:module Kendaraan --fields="plat_nomor:string,merk:string,tahun:year,scan_stnk:file(single,required,pdf|jpg,2048)" --actions=view,create,edit,delete,download --group=master --icon=car
php artisan migrate
```

Yang seharusnya terlihat: `Module Kendaraan written to modules/Kendaraan`, lalu migrasi `create_kendaraans_table … DONE`. Muat ulang browser: **Kendaraan** muncul di grup **Master Data** (ikon database di rel). Buka, pilih **Tambah**, isi formulir, lampirkan PDF atau JPG, lalu pilih **Simpan**: Anda tiba di data baru, dengan berkasnya di tab **Lampiran**.

Jika tidak: menu baru menampilkan modul setelah browser dimuat ulang; "Page not found Kendaraan::Index" berarti Vite tidak berjalan (jalankan `composer dev`, atau `npm run build` sekali).

<details>
<summary>Semua tipe field</summary>

| Tipe | Contoh | Disimpan / ditampilkan sebagai |
|---|---|---|
| `string` | `nama:string` | teks hingga 255 karakter; field `string` pertama menjadi judul data |
| `text` | `catatan:text` | teks panjang, textarea |
| `integer` | `jumlah:integer` | bilangan bulat |
| `year` | `tahun:year` | tahun, 1900–2100, tampil sebagai `2024` (tanpa pemisah ribuan) |
| `decimal` | `berat:decimal` | bilangan desimal, format id-ID |
| `currency` | `harga:currency` | Rupiah |
| `boolean` | `aktif:boolean` | sakelar |
| `date` | `tanggal:date` | pemilih tanggal, tampil sebagai "20 Okt 2026" |
| `datetime` | `mulai:datetime` | tanggal dan jam |
| `enum(a,b)` | `status:enum(draf,terbit)` | pilihan dengan nilai-nilai itu |
| `foreign(table)` | `unit_id:foreign(units)` | pilihan yang bisa dicari, dari data modul lain |
| `file(...)` | `scan:file(single,required,pdf\|jpg,2048)` | slot unggahan: `single` atau `multiple`, `required`, tipe yang diizinkan, ukuran maks dalam KB |

Tambahkan `?` agar field boleh kosong: `catatan:text?`. Beri nama field dalam `snake_case` bahasa Indonesia; labelnya dibuat dari nama itu (`tanggal_mulai` → "Tanggal mulai").

</details>

### h. Beri sebuah level akses dan uji sebagai pengguna itu

Modul baru hanya terlihat oleh Super Admin sampai aksesnya diberikan.

1. Buka **Levels** (di **Sistem**) → pada baris **Operator**, **Hak akses**. Centang **View** dan **Create** pada baris **Kendaraan**, lalu pilih **Simpan** di bilah bawah.
2. Buka **Users** (di **Master Data**) → **Tambah**. Isi nama, username, email, dan kata sandi (dua kali), pilih level **Operator**, lalu pilih **Simpan**.
3. Keluar (menu akun → **Keluar**), buka `http://127.0.0.1:8000/login`, dan masuk sebagai pengguna baru.

Yang seharusnya terlihat: pengguna baru diminta membuat kata sandinya sendiri dulu (setiap akun yang dibuat admin wajib menggantinya). Setelah itu, menu hanya menampilkan **Beranda** dan **Kendaraan** (level Operator baru dimulai dengan Beranda dan View pada modul proyek yang dibuat sebelum `composer setup`; tidak pernah Users, Levels, atau Log Aktivitas). Daftar Kendaraan punya **Tambah**, tanpa unduhan, dan menu **⋯** di setiap baris hanya berisi **Lihat**.

Jika tidak: modul yang tidak muncul di menu berarti **View**-nya belum dicentang; halaman yang menjawab 403 berarti aksi itu belum dicentang. Perubahan berlaku pada halaman berikutnya yang dibuka pengguna.

### i. Simpan proyek di repositori git Anda sendiri

Proyek ini sekarang milik Anda; tidak lagi menunjuk ke repositori ini.

```bash
git init
git add --all
git commit -m "chore: new project from admin-skeleton"
```

Yang seharusnya terlihat: sebuah commit berisi file Anda. `.env` dan `vendor/` tidak ikut (diabaikan). `CLAUDE.md` dan `.claude/skills` ikut: itu instruksi AI proyek Anda.

Jika tidak: `Author identity unknown` berarti git belum mengenal Anda; atur `git config --global user.name` dan `user.email`, lalu commit lagi.

### j. Tetap perbarui

Perbaikan dan fitur inti datang sebagai versi baru paket.

```bash
composer update yuanmaharsyah/admin-core
php artisan migrate
php artisan permissions:sync
```

Yang seharusnya terlihat: `Upgrading yuanmaharsyah/admin-core (…)` jika ada versi baru (`Nothing to install, update or remove` jika sudah terbaru), lalu migrasi baru jika ada. Composer juga membuat ulang tipe TypeScript, rute, dan instruksi AI (`CLAUDE.md`, `.claude/skills`); commit file-file itu.

Jika tidak: baca [`UPGRADE.md`](https://github.com/yuanmaharsyah/admin-boilerplate/blob/master/packages/admin-core/UPGRADE.md) untuk langkah yang dibutuhkan sebuah versi, lalu jalankan `composer check` untuk menemukan yang perlu disesuaikan.

[↑ Kembali ke atas](#top)

## Langkah berikutnya: "Saya ingin…"

Setiap panduan mengandaikan modul Kendaraan dari langkah g. Setelah setiap perubahan, jalankan `composer check` sampai hijau.

<details>
<summary><b>…menambah field ke sebuah modul</b></summary>

1. Buat migrasi di dalam modul, tambahkan kolomnya (dan indeks jika daftar menyaring atau mengurutkan berdasarkan kolom itu), serta `down()` yang menghapusnya:
   ```bash
   php artisan make:migration add_warna_to_kendaraans_table --path=modules/Kendaraan/Database/Migrations
   ```
2. Di `modules/Kendaraan/Models/Kendaraan.php`, tambahkan ke `$fillable` dan `casts()`.
3. Tambahkan beserta aturannya ke `Data/StoreKendaraanData.php`, `Data/UpdateKendaraanData.php`, juga ke `Data/KendaraanData.php` (detail) dan `Data/KendaraanListItemData.php` (daftar).
4. Buat ulang tipe TypeScript; kompiler lalu menunjukkan di mana field itu belum ada:
   ```bash
   php artisan typescript:transform
   ```
5. Tambahkan input di `resources/js/components/KendaraanForm.tsx`, kolom di `resources/js/pages/Index.tsx`, dan labelnya di `resources/js/lang/id.ts` serta `en.ts`.
6. Jalankan `php artisan migrate`.

Data pribadi (NIK, NPWP, telepon, alamat, nomor rekening) juga dimasukkan ke `admin-core.audit.masked_fields`, agar log aktivitas menyamarkannya.

</details>

<details>
<summary><b>…menghubungkan dua modul (sebuah data milik data lain)</b></summary>

1. Modul tujuan harus ada lebih dulu; setiap modul hasil generator sudah punya endpoint pencarian yang dibutuhkan.
   ```bash
   php artisan make:module Unit --fields="nama:string,kode:string" --actions=view,create,edit,delete --group=master --icon=building
   ```
2. Pakai field `foreign(table)` di modul yang menautkannya:
   ```bash
   php artisan make:module Ruangan --fields="nama:string,lantai:integer,unit_id:foreign(units)" --actions=view,create,edit,delete --group=master --icon=door-open
   php artisan migrate
   ```

Hasilnya: pilihan yang bisa dicari di formulir, nama unit di daftar dan halaman detail, foreign key yang menolak penghapusan unit yang masih dipakai, dan validasi yang hanya menerima unit yang boleh dilihat pengguna. Level yang mengubah ruangan juga perlu **View** pada Unit, agar pilihannya bisa mencari.

</details>

<details>
<summary><b>…menambah unggah berkas</b></summary>

Lewat generator, field `file(...)` mengerjakan semuanya: `scan_ktp:file(single,required,pdf|jpg,2048)` atau `lampiran:file(multiple)`.

Di modul yang sudah ada, nyatakan slotnya di model dan ikuti skill `admin-attachments` (di `.claude/skills/admin-attachments/SKILL.md`):

```php
use HasAttachments;

public function attachmentSlots(): array
{
    return [
        'scan_ktp' => AttachmentSlot::single(__('Scan KTP'))->required()->mimes(['pdf', 'jpg', 'png'])->maxKb(2048),
    ];
}
```

Berkas disimpan secara privat dengan nama acak; unduhan memakai tautan bertanda tangan yang berlaku 5 menit; setiap unggah, unduh, dan hapus tercatat di log aktivitas.

</details>

<details>
<summary><b>…menambah tombol setujui (approve)</b></summary>

1. Di `modules/Kendaraan/module.php`, tambahkan `'approve'` ke `actions`, lalu buat hak aksesnya:
   ```bash
   php artisan permissions:sync
   ```
2. Policy: tambahkan `public function approve(User $user, Kendaraan $kendaraan): bool`.
3. Rute di `modules/Kendaraan/Routes/web.php`: `Route::post('{kendaraan}/approve', [KendaraanController::class, 'approve'])->middleware('permission:kendaraans.approve')->name('approve');`
4. Controller: `Gate::authorize('approve', $kendaraan)`, kerjakan prosesnya, lalu `Audit::record('approve', $kendaraan)` dan arahkan kembali dengan pesan.
5. Halaman: bungkus tombolnya dengan `<Can permission="kendaraans.approve">`.

Matriks kini menampilkan kolom **Approve** untuk Kendaraan. Rinciannya: skill `admin-custom-action`.

</details>

<details>
<summary><b>…membatasi data ke unit milik pengguna</b></summary>

Setiap daftar, halaman detail, ekspor, dan pilihan melewati `visibleTo($user)`, yang tidak berbuat apa-apa sampai model mendefinisikan `applyVisibility()`:

```php
protected function applyVisibility(Builder $query, ?Authenticatable $user): void
{
    if ($user instanceof User && ! $user->isSuperAdmin()) {
        $query->where('unit_id', $user->unit_id);
    }
}
```

Pengguna perlu kolom `unit_id` lebih dulu: tambahkan lewat migrasi dan tampilkan di formulir Users dengan form extension (skill `admin-customize-core`, "Extra user fields"). Uji dengan `ModuleAssertions::assertScopedToUser()`.

</details>

<details>
<summary><b>…menambah widget di Beranda</b></summary>

```bash
php artisan make:widget Kendaraan TotalKendaraan --type=stat --size=sm
```

Tipe: `stat`, `stat_stack`, `segment`, `bar_chart`, `table`. Perintah ini menulis kelas widget dengan kueri yang sudah berjalan lewat `visibleTo()`, pengujiannya, dan barisnya di `module.php`. Setiap pengguna hanya melihat widget jika punya hak **View** pada modul itu. Sesuaikan `data()` dengan yang ingin ditampilkan.

</details>

<details>
<summary><b>…mengubah atau menambah pengaturan</b></summary>

Super Admin mengubah pengaturan bawaan di **Pengaturan**. Untuk menambah pengaturan sendiri, terbitkan konfigurasinya sekali, lalu tambahkan field ke sebuah tab:

```bash
php artisan vendor:publish --tag=admin-core-config
```

Di `config/admin-core.php` → `settings`, misalnya `'kontak' => ['fields' => ['fax' => ['type' => 'phone', 'label' => 'Fax']]]`. Baca nilainya di mana saja dengan `settings('kontak.fax')`. File Anda cukup berisi yang Anda tambah atau ubah; bawaan tetap ada.

<details>
<summary>Pengaturan bawaan</summary>

| Tab | Field |
|---|---|
| Umum | Nama aplikasi, Favicon, Logo 1:1, Logo lanskap |
| Kontak | Telepon, WhatsApp, Alamat, Kode pos |
| Sosial Media | Instagram, X, TikTok, Facebook, YouTube, LinkedIn |
| Akses Situs | Mode (`open`, `maintenance`, `coming_soon`), Pesan |
| Keamanan | Lama sesi (menit) |
| Ekspor | Batas unduhan langsung (baris) |

Tipe field: `string`, `text`, `integer`, `boolean`, `enum` (dengan `options`), `phone`, `whatsapp`, `postal_code`, `social`.

</details>

</details>

<details>
<summary><b>…memasang di server</b></summary>

Di server dengan PHP 8.4, MySQL, Node, Nginx (atau Apache), worker antrean yang diawasi, dan cron:

```bash
git pull && composer install --no-dev -o && npm ci && npm run build
php artisan migrate --force && php artisan permissions:sync && php artisan optimize
php artisan storage:link
php artisan admin:doctor
```

`storage:link` hanya perlu saat pemasangan pertama. Di produksi, atur `APP_ENV=production` dan `APP_DEBUG=false`, pakai driver antrean sungguhan dengan worker di bawah supervisor, jalankan scheduler setiap menit (`php artisan schedule:run`), dan isi `ADMIN_SEED_PASSWORD` sebelum seed pertama (atau lewati seeder dan jalankan `php artisan admin:create-superadmin`). `admin:doctor` melaporkan apa yang masih kurang.

</details>

[↑ Kembali ke atas](#top)

## Menggunakannya bersama AI

Proyek Anda membawa instruksi untuk Claude Code: `CLAUDE.md` berisi aturan proyek, dan `.claude/skills/` berisi satu skill per tugas (`admin-make-module`, `admin-attachments`, `admin-custom-action`, `admin-dashboard-widget`, …). Claude Code memilih skill yang tepat sendiri; Anda cukup meminta dengan kalimat biasa.

```bash
claude
```

Lalu, misalnya:

> Tambahkan modul Kendaraan: plat nomor (wajib), merk (wajib), tahun (angka tahun, wajib), dan scan STNK yang wajib (PDF atau JPG, maks 2 MB). Pengguna bisa melihat, menambah, mengubah, menghapus, dan mengunduh daftarnya. Taruh di Master Data, jalankan migrasinya, dan pastikan composer check lolos.

Claude Code menjalankan `make:module`, menyesuaikan validasi dan pengujian, lalu menjalankan `composer check`. Instruksinya berasal dari paket dan ikut diperbarui (`php artisan boost:update`, yang dijalankan `composer update` untuk Anda).

[↑ Kembali ke atas](#top)

## Contekan perintah

| Perintah | Fungsinya |
|---|---|
| `composer dev` | Menjalankan aplikasi: web server, worker antrean, penampil log, dan Vite |
| `composer setup` | Pemasangan pertama: paket npm, tabel, akun pertama, build frontend |
| `composer check` | Semua gerbang kualitas: gaya kode, analisis statis, tipe, lint, pengujian, build |
| `php artisan make:module Name --fields=… --actions=…` | Membuat satu modul utuh |
| `php artisan make:widget Module Name --type=…` | Membuat widget Beranda |
| `php artisan migrate` | Membuat tabel modul baru |
| `php artisan permissions:sync` | Menyamakan hak akses dengan aksi modul |
| `php artisan admin:create-superadmin` | Membuat Super Admin (pemulihan) |
| `php artisan admin:access open` | Membuka kembali halaman publik setelah mode pemeliharaan |
| `php artisan admin:doctor` | Memeriksa pemasangan (aset, tautan storage, lingkungan) |
| `composer update yuanmaharsyah/admin-core` | Memperbarui inti |

[↑ Kembali ke atas](#top)

## Pemecahan masalah

| Gejala | Penyebab yang mungkin | Perbaikan |
|---|---|---|
| Modul baru tidak ada di menu | Halaman belum dimuat ulang, atau level Anda belum punya **View** | Muat ulang; Levels → Hak akses |
| 403 padahal kotaknya sudah dicentang | Hak akses belum sinkron | `php artisan permissions:sync` |
| "Page not found Kendaraan::Index" | Vite tidak berjalan, atau huruf besar-kecil nama folder berbeda | Jalankan `composer dev`; pertahankan `resources/js/pages` persis |
| Setiap halaman mengarah ke "Ganti kata sandi" | Akun wajib mengganti kata sandi (akun baru, atau admin meresetnya) | Buat kata sandi baru |
| Keluar sendiri dengan "Sesi Anda telah berakhir" | Akun Anda dinonaktifkan, atau level atau kata sandinya berubah | Masuk lagi |
| Logo atau favicon menjawab 404 | Tautan storage publik belum ada | `php artisan storage:link` |
| Halaman publik menjawab 503 atau "Segera hadir" | Akses situs dalam mode pemeliharaan atau segera hadir | Pengaturan → Akses Situs, atau `php artisan admin:access open` |
| Unduhan tidak pernah datang | Worker antrean tidak berjalan | Jalankan `composer dev` (lokal) atau supervisor (server) |
| "Data ini telah diubah oleh pengguna lain" | Ada yang menyimpan data itu setelah Anda membukanya | **Salin perubahan saya**, lalu **Muat ulang**, dan terapkan lagi perubahan Anda |
| Galat TypeScript setelah perubahan PHP | Tipe belum dibuat ulang | `php artisan typescript:transform` |

Selengkapnya: tabel "Troubleshooting" di [`DEVELOPER.md`](DEVELOPER.md).

[↑ Kembali ke atas](#top)

## Kontribusi, keamanan, lisensi

**Kontribusi.** Fork repositori ini, buat branch, kerjakan perubahan beserta pengujiannya, jalankan `composer check` dari root repositori sampai hijau, lalu buka pull request. Aturannya ada di [`AGENTS.md`](AGENTS.md), peta dan resepnya di [`DEVELOPER.md`](DEVELOPER.md), alur kerjanya di [`CONTRIBUTING.md`](CONTRIBUTING.md).

**Keamanan.** Laporkan celah keamanan secara privat, jangan di issue publik: lihat [`SECURITY.md`](SECURITY.md).

**Lisensi.** MIT, © 2026 Yuan Maharsyah. Lihat [`LICENSE`](LICENSE).

[↑ Kembali ke atas](#top)
