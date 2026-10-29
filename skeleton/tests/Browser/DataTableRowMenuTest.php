<?php

declare(strict_types=1);

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Modules\Invoice\Models\Invoice;
use Yuan\AdminCore\Permissions\Level;

use function Pest\Laravel\actingAs;

// The row menu's destructive item is red text on the popover in both themes
// (it once used the on-red foreground colour and was invisible).

uses(RefreshDatabase::class)->group('browser');

it('shows Hapus in the destructive colour in light and dark mode', function (bool $dark): void {
    $this->withVite();
    $user = User::factory()->create();
    $user->assignLevel(Level::superAdmin());
    actingAs($user);
    $number = Invoice::factory()->create()->number;

    $page = $dark ? visit('/admin/invoices')->inDarkMode() : visit('/admin/invoices');

    $page->assertScript("document.documentElement.classList.contains('dark')", $dark)
        ->click("[aria-label=\"Aksi untuk {$number}\"]")
        ->assertScript(<<<'JS'
            (() => {
                const item = [...document.querySelectorAll('[role="menuitem"]')].find((el) => el.textContent.includes('Hapus'));
                const probe = document.createElement('span');
                probe.style.color = 'var(--destructive)';
                document.body.append(probe);
                const expected = getComputedStyle(probe).color;
                probe.remove();

                return getComputedStyle(item).color === expected;
            })()
            JS, true)
        ->assertNoJavaScriptErrors();
})->with(['light' => false, 'dark' => true]);
