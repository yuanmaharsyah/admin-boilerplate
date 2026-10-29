<?php

declare(strict_types=1);

namespace Tests\Fixtures;

/**
 * The generator's golden modules: `modules/Sample` (every field type, every
 * standard action, a relation, two file slots and a widget),
 * `modules/SampleReadonly` (view only) and `modules/SampleAdmin`
 * (superadmin_only, a required file slot). GoldenModulesTest regenerates
 * them from these options and fails on any difference with the committed
 * copies; `composer sample:regenerate` rewrites the copies after a stub
 * change. Only admin:remove-demo removes them, in a new project.
 */
final class GoldenModules
{
    /** make:module arguments, per module. */
    public const array MODULES = [
        'Sample' => [
            '--fields' => 'nama:string,kode:string?,catatan:text?,jumlah:integer,tahun:year,berat:decimal?,harga:currency,aktif:boolean,mulai_tanggal:date,selesai_pada:datetime?,status:enum(draf,aktif,arsip),customer_id:foreign(customers),foto:file(single,jpg|png,2048),dokumen:file',
            '--actions' => 'view,create,edit,delete,download',
            '--group' => 'master',
            '--icon' => 'flask-conical',
            '--label' => 'Contoh',
        ],
        'SampleReadonly' => [
            '--fields' => 'nama:string,jumlah:integer,status:enum(baru,lama),tanggal:date?',
            '--actions' => 'view',
            '--group' => 'master',
            '--icon' => 'eye',
            '--slug' => 'sample-readonly',
            '--label' => 'Contoh baca saja',
        ],
        'SampleAdmin' => [
            '--fields' => 'judul:string,catatan:text?,berkas:file(required,pdf)',
            '--actions' => 'view,create,edit,delete',
            '--group' => 'sistem',
            '--icon' => 'shield-check',
            '--slug' => 'sample-admin',
            '--label' => 'Contoh khusus Super Admin',
            '--superadmin-only' => true,
        ],
    ];

    /** make:widget arguments. */
    public const array WIDGETS = [
        ['module' => 'Sample', 'name' => 'JumlahBaru', '--type' => 'stat', '--size' => 'sm'],
    ];

    public const string MIGRATION_DATE = '2026_10_24_000000';

    /**
     * make:module arguments of one module.
     *
     * @return array<string, mixed>
     */
    public static function module(string $name): array
    {
        return ['name' => $name, ...self::MODULES[$name], '--migration-date' => self::MIGRATION_DATE, '--allow-registered' => true];
    }
}
