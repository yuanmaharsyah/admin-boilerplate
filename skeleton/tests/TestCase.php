<?php

declare(strict_types=1);

namespace Tests;

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Testing\TestCase as BaseTestCase;
use Illuminate\Support\Facades\Cache;
use Laravel\Fortify\Features;

abstract class TestCase extends BaseTestCase
{
    /**
     * Pages render without the Vite manifest: `composer check` runs the tests
     * before `npm run build`, so a new module page isn't in the manifest yet.
     */
    protected function setUp(): void
    {
        parent::setUp();

        $this->withoutVite();
        // Like the database / redis stores: cached values are serialized, and
        // cache.serializable_classes lets no object come back.
        config(['cache.stores.array.serialize' => true]);
        Cache::forgetDriver('array');
    }

    /**
     * The test database also gets the fixture migrations (the `nip` and
     * `unit` columns of the user form extension test), registered before
     * RefreshDatabase migrates.
     */
    public function createApplication(): Application
    {
        $app = parent::createApplication();
        $app->make('migrator')->path(__DIR__.'/Fixtures/database');

        return $app;
    }

    protected function skipUnlessFortifyHas(string $feature, ?string $message = null): void
    {
        if (! Features::enabled($feature)) {
            $this->markTestSkipped($message ?? "Fortify feature [{$feature}] is not enabled.");
        }
    }
}
