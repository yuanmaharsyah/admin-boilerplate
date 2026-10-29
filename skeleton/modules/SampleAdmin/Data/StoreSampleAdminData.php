<?php

declare(strict_types=1);

namespace Modules\SampleAdmin\Data;

use Modules\SampleAdmin\Models\SampleAdmin;
use Spatie\LaravelData\Data;
use Spatie\TypeScriptTransformer\Attributes\LiteralTypeScriptType;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;
use Yuan\AdminCore\Attachments\AttachmentUploads;

/** The create form of a contoh khusus super admin record. */
#[TypeScript]
final class StoreSampleAdminData extends Data
{
    /**
     * @param  array<string, mixed>  $files  Attachment slot => an upload, or a list of uploads (`attachmentSlots()`).
     */
    public function __construct(
        public string $judul,
        public ?string $catatan,
        #[LiteralTypeScriptType('Record<string, File | File[] | null>')]
        public array $files = [],
    ) {}

    /**
     * @return array<string, list<mixed>>
     */
    public static function rules(): array
    {
        return [
            'judul' => ['required', 'string', 'max:255'],
            'catatan' => ['nullable', 'string', 'max:5000'],
            ...AttachmentUploads::rules(SampleAdmin::class),
        ];
    }

    /**
     * Field names in validation messages.
     *
     * @return array<string, string>
     */
    public static function attributes(): array
    {
        return [
            'judul' => __('judul'),
            'catatan' => __('catatan'),
            ...AttachmentUploads::attributes(SampleAdmin::class),
        ];
    }
}
