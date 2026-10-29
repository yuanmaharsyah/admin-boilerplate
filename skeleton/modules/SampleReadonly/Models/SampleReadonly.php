<?php

declare(strict_types=1);

namespace Modules\SampleReadonly\Models;

use Carbon\CarbonImmutable;
use Illuminate\Database\Eloquent\Attributes\UseFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Carbon;
use Modules\SampleReadonly\Database\Factories\SampleReadonlyFactory;
use Modules\SampleReadonly\Enums\SampleReadonlyStatus;
use Yuan\AdminCore\Audit\HasActivityHistory;
use Yuan\AdminCore\Audit\LogsModuleActivity;
use Yuan\AdminCore\Data\DataTableFilterData;
use Yuan\AdminCore\DataTable\DataTableModel;
use Yuan\AdminCore\DataTable\HasDataTable;
use Yuan\AdminCore\DataTable\HasVisibilityScope;

/**
 * @property int $id
 * @property string $nama
 * @property int $jumlah
 * @property SampleReadonlyStatus $status
 * @property CarbonImmutable|null $tanggal
 * @property Carbon $created_at
 * @property Carbon $updated_at
 */
#[UseFactory(SampleReadonlyFactory::class)]
final class SampleReadonly extends Model implements DataTableModel
{
    /** @use HasFactory<SampleReadonlyFactory> */
    use HasActivityHistory, HasDataTable, HasFactory, HasVisibilityScope, LogsModuleActivity, SoftDeletes;

    protected $fillable = ['nama', 'jumlah', 'status', 'tanggal'];

    public function auditLabel(): string
    {
        return $this->nama;
    }

    public function dataTableSearch(): array
    {
        return ['nama'];
    }

    public function dataTableSorts(): array
    {
        return ['nama', 'jumlah', 'tanggal'];
    }

    public function dataTableFilters(): array
    {
        return [new DataTableFilterData('status', __('Status'), SampleReadonlyStatus::options())];
    }

    protected function casts(): array
    {
        return [
            'jumlah' => 'integer',
            'status' => SampleReadonlyStatus::class,
            'tanggal' => 'immutable_date',
        ];
    }
}
