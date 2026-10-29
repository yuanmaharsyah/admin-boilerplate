<?php

declare(strict_types=1);

/*
 * The one list of files allowed to break the arch and PHPStan contract rules
 * (AGENTS.md §5, temporary starter-kit exception). Read by tests/ArchTest.php
 * and tests/arch-exceptions.phpstan.php. Remove a line in the same change that
 * replaces its file; ArchTest fails while a listed file is missing.
 *
 * path (relative to the project root) => reason
 */
return [];
