<?php

declare(strict_types=1);

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Modules\Invoice\Models\Invoice;
use Yuan\AdminCore\Permissions\Level;

use function Pest\Laravel\actingAs;

// List rows fade up one after another (ui-design §1 "Motion"); reduced motion turns it off.

uses(RefreshDatabase::class)->group('browser');

beforeEach(function (): void {
    $this->withVite();
    Invoice::factory()->count(3)->create();
    $user = User::factory()->create();
    $user->assignLevel(Level::superAdmin());
    actingAs($user);
});

it('fades each list row up, 250 ms after the one above', function (): void {
    visit('/admin/invoices')
        ->assertScript("getComputedStyle(document.querySelector('tbody tr:nth-child(1)')).animationName", 'rows-in')
        ->assertScript("getComputedStyle(document.querySelector('tbody tr:nth-child(3)')).animationDelay", '0.5s')
        ->assertNoJavaScriptErrors();
});
