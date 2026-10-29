<?php

declare(strict_types=1);

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;
use Yuan\AdminCore\Exports\QueuedExport;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

// Expired queued downloads: rows and files (spec §7, ExportManager).
Schedule::command('model:prune', ['--model' => [QueuedExport::class]])->daily();

// Audit retention (does nothing while admin-core.audit.retention_days is null).
Schedule::command('admin:audit-prune')->daily();

// Attachment files without a row (a rolled-back save, a crash), after a day.
Schedule::command('admin:attachments-sweep')->daily();
