<?php

declare(strict_types=1);

namespace Tests\Fixtures;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Validation\Rule;
use Yuan\AdminCore\Data\OptionData;
use Yuan\AdminCore\Data\Users\ExtraFieldData;
use Yuan\AdminCore\Users\UserFormExtension;

/** A user form extension like a real project's: NIP (text) and the work unit (select). */
final class EmployeeFields implements UserFormExtension
{
    public function fields(): array
    {
        return [
            new ExtraFieldData(name: 'nip', label: 'NIP', type: 'text', required: true, help: '18 digit'),
            new ExtraFieldData(name: 'unit', label: 'Unit kerja', type: 'select', options: [new OptionData('keu', 'Keuangan'), new OptionData('umum', 'Umum')]),
        ];
    }

    public function rules(?Model $user): array
    {
        return [
            'nip' => ['required', 'digits:18', Rule::unique('users', 'nip')->ignore($user?->getKey())],
            'unit' => ['nullable', 'in:keu,umum'],
        ];
    }
}
