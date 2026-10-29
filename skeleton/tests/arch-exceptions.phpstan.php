<?php

declare(strict_types=1);

use Yuan\AdminCore\PHPStan\InertiaPropsRule;
use Yuan\AdminCore\PHPStan\RequestInputRule;

// Feeds tests/arch-exceptions.php to PHPStan as ignores for the core contract rules.
$paths = array_map(fn (string $path): string => dirname(__DIR__).'/'.$path, array_keys(require __DIR__.'/arch-exceptions.php'));

return ['parameters' => ['ignoreErrors' => array_map(
    fn (string $identifier): array => ['identifier' => $identifier, 'paths' => $paths, 'reportUnmatched' => false],
    [InertiaPropsRule::IDENTIFIER, RequestInputRule::IDENTIFIER],
)]];
