<?php

declare(strict_types=1);

namespace Modules\SampleAdmin\Models;

use Illuminate\Database\Eloquent\Attributes\UseFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Carbon;
use Modules\SampleAdmin\Database\Factories\SampleAdminFactory;
use Yuan\AdminCore\Attachments\AttachmentSlot;
use Yuan\AdminCore\Attachments\HasAttachments;
use Yuan\AdminCore\Audit\HasActivityHistory;
use Yuan\AdminCore\Audit\LogsModuleActivity;
use Yuan\AdminCore\Concurrency\PreventsStaleUpdates;
use Yuan\AdminCore\DataTable\DataTableModel;
use Yuan\AdminCore\DataTable\HasDataTable;
use Yuan\AdminCore\DataTable\HasVisibilityScope;

/**
 * @property int $id
 * @property string $judul
 * @property string|null $catatan
 * @property Carbon $created_at
 * @property Carbon $updated_at
 * @property int $lock_version
 */
#[UseFactory(SampleAdminFactory::class)]
final class SampleAdmin extends Model implements DataTableModel
{
    /** @use HasFactory<SampleAdminFactory> */
    use HasActivityHistory, HasAttachments, HasDataTable, HasFactory, HasVisibilityScope, LogsModuleActivity, PreventsStaleUpdates, SoftDeletes;

    /** @var array<string, mixed> */
    protected $attributes = ['lock_version' => 0];

    protected $fillable = ['judul', 'catatan'];

    /**
     * @return array<string, AttachmentSlot>
     */
    public function attachmentSlots(): array
    {
        return [
            'berkas' => AttachmentSlot::multiple(__('Berkas'))->required()->mimes(['pdf']),
        ];
    }

    public function auditLabel(): string
    {
        return $this->judul;
    }

    public function dataTableSearch(): array
    {
        return ['judul'];
    }

    public function dataTableSorts(): array
    {
        return ['judul'];
    }

    public function dataTableFilters(): array
    {
        return [];
    }

    protected function casts(): array
    {
        return [
            'lock_version' => 'integer',
        ];
    }
}
