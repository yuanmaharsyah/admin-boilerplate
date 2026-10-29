<?php

declare(strict_types=1);

use Illuminate\Foundation\Testing\RefreshDatabase;
use Yuan\AdminCore\Testing\ContractAssertions;

use function Pest\Laravel\seed;

uses(RefreshDatabase::class);

// The contract of spec §9.1, run over every module of this project (core and project roots).

it('checks every module on disk, so a broken discovery cannot pass on an empty set', function (): void {
    $onDisk = count([...glob(base_path('modules/*/module.php')) ?: [], ...glob(base_path('vendor/yuanmaharsyah/admin-core/modules/*/module.php')) ?: []]);

    expect(ContractAssertions::assertModuleShape())->toBe($onDisk);
});

it('has valid module definitions with unique slugs', function (): void {
    ContractAssertions::assertModuleDefinitionsValid();
});

it('protects every admin route with auth and a permission', function (): void {
    ContractAssertions::assertAdminRoutesProtected();
});

it('has a policy method for every declared action', function (): void {
    ContractAssertions::assertPolicyCoverage();
});

it('seeds exactly the derived permissions and none directly on users', function (): void {
    seed();

    ContractAssertions::assertPermissionsInSync();
    ContractAssertions::assertNoDirectPermissions();
});

it('lists only slug-prefixed widgets whose permission exists', function (): void {
    seed();

    ContractAssertions::assertWidgetContract();
});

it('audits every module model with business columns', function (): void {
    ContractAssertions::assertAuditCoverage();
});

it('records only taxonomy events or declared custom actions', function (): void {
    ContractAssertions::assertAuditCallSites([app_path()]);
});

it('masks every field in audit.masked_fields for every event type', function (): void {
    ContractAssertions::assertMaskingHolds();
});

it('gives every module model the visibleTo() hook', function (): void {
    ContractAssertions::assertVisibilityScope();
});
