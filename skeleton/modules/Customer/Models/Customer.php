<?php

declare(strict_types=1);

namespace Modules\Customer\Models;

use Illuminate\Database\Eloquent\Attributes\UseFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Modules\Customer\Database\Factories\CustomerFactory;
use Yuan\AdminCore\Audit\LogsModuleActivity;
use Yuan\AdminCore\DataTable\DataTableModel;
use Yuan\AdminCore\DataTable\HasDataTable;
use Yuan\AdminCore\DataTable\HasVisibilityScope;

/**
 * @property int $id
 * @property string $name
 * @property string|null $city
 * @property string|null $no_hp
 */
#[UseFactory(CustomerFactory::class)]
final class Customer extends Model implements DataTableModel
{
    /** @use HasFactory<CustomerFactory> */
    use HasDataTable, HasFactory, HasVisibilityScope, LogsModuleActivity, SoftDeletes;

    protected $fillable = ['name', 'city', 'no_hp'];

    public function dataTableSearch(): array
    {
        return ['name', 'city'];
    }

    public function dataTableSorts(): array
    {
        return ['name', 'city'];
    }
}
