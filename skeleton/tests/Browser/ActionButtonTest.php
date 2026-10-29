<?php

declare(strict_types=1);

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Yuan\AdminCore\Permissions\Level;

use function Pest\Laravel\actingAs;

// Action buttons (frontend-behavior §2): while a request runs the button spins,
// is disabled and aria-busy, and a second click is ignored. The page delays
// every request it sends by 1.5s and counts them. The patch is an IIFE:
// script() calls a script whose value is a function.

uses(RefreshDatabase::class)->group('browser');

const SLOW_REQUESTS = <<<'JS'
    (() => {
        window.__sent = 0;
        const send = XMLHttpRequest.prototype.send;
        XMLHttpRequest.prototype.send = function (body) {
            window.__sent++;
            setTimeout(() => send.call(this, body), 1500);
        };
    })();
    JS;

beforeEach(function (): void {
    $this->withVite();
    $user = User::factory()->create();
    $user->assignLevel(Level::superAdmin());
    actingAs($user);
});

it('spins and disables a form submit, and sends a click plus Enter once', function (): void {
    $page = visit('/admin/levels/create')->type('label', 'Bendahara');
    $page->script(SLOW_REQUESTS);
    // A click, then Enter (a form submit that skips the now-disabled button).
    $page->script("const save = document.querySelector('button[type=submit]'); save.click(); save.form.requestSubmit();");

    $page->assertAttribute('button[type=submit]', 'aria-busy', 'true')
        ->assertButtonDisabled('Menyimpan…')
        ->assertPresent('button[type=submit] svg.animate-spin')
        ->assertSee('Atur hak aksesnya sekarang.')
        ->assertScript('window.__sent', 1)
        ->assertNoJavaScriptErrors();

    expect(Level::query()->where('label', 'Bendahara')->count())->toBe(1);
});

it('keeps a confirm dialog open and spinning until the delete is done', function (): void {
    $level = Level::query()->create(['name' => 'kosong', 'label' => 'Kosong']);

    $page = visit('/admin/levels')->click('[aria-label="Hapus Kosong"]');
    $page->script(SLOW_REQUESTS);
    $page->script("const confirm = [...document.querySelectorAll('[role=alertdialog] button')].at(-1); confirm.click(); confirm.click();");

    $page->assertPresent('[role=alertdialog] button[aria-busy=true] svg.animate-spin')
        ->assertButtonDisabled('Batal')
        ->assertSee('Level dihapus.')
        ->assertNotPresent('[role=alertdialog]')
        ->assertScript('window.__sent', 1)
        ->assertNoJavaScriptErrors();

    expect(Level::query()->find($level->id))->toBeNull();
});
