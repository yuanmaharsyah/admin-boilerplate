# Upgrade Guide

## Access

A project from `composer create-project yuanmaharsyah/admin-skeleton` gets the package from Packagist over HTTPS: nothing to set up. A project that uses a private fork over SSH: [README.md → Private forks over SSH](README.md#private-forks-over-ssh) (developer keys, server deploy keys). Never commit `auth.json`.

## Standard steps (every upgrade)

Run in the project root:

1. `composer update yuanmaharsyah/admin-core`
2. Regenerate types and routes: `php artisan typescript:transform && php artisan wayfinder:generate --with-form` (the skeleton's `post-update-cmd` already runs both, plus `php artisan boost:update --no-discover` for the AI guideline and skills), then commit the regenerated `resources/js/types/generated.d.ts`, `resources/js/actions`, `resources/js/routes`, `resources/js/wayfinder`, `CLAUDE.md` and `.claude/skills`.
3. `npm run typecheck`: fix any TS error caused by a changed core Data class.
4. `php artisan migrate && php artisan permissions:sync && php artisan optimize`
5. `composer check`

Version-specific steps are listed below, newest first.

## 2.0.0

The admin shell and theme change (restyle 01, see CHANGELOG). No PHP or Data changes.

1. A project that imported `AppRail` or `ItemPanel`, or used the `bg-rail`, `text-rail-foreground`, `bg-sidebar-active`, `text-sidebar-active-foreground`, `w-rail` or `w-panel` utilities: use `AppSidebar` and `bg-sidebar-primary` / `bg-sidebar-accent` instead (`npm run typecheck` and `npm run build` name every place).
2. A project page that showed breadcrumbs itself: `PageHeader` now renders them.
3. Branding still overrides `--highlight` only; it now colours chart series 1, not the active menu item.

## 1.0.0

First release. Nothing to do.
