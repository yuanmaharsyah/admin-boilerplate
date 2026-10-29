# Contributing

Thanks for helping. This repository is the **monorepo** of the boilerplate: the package (`packages/admin-core`) and the skeleton (`skeleton/`) live here together. To build an app, don't fork: use `composer create-project yuanmaharsyah/admin-skeleton my-app` (see the [README](README.md)). Fork only to contribute.

## Set up

Requirements: PHP 8.4+, Composer 2, Node 22, MySQL 8, git.

```bash
git clone git@github.com:<you>/admin-boilerplate.git && cd admin-boilerplate
cp skeleton/.env.example skeleton/.env     # then set DB_USERNAME / DB_PASSWORD
composer setup                             # installs both, creates admin_boilerplate and admin_boilerplate_test, seeds, builds
cd skeleton && npx playwright install chromium && cd ..   # once, for the browser tests
```

Run the app with `composer dev` inside `skeleton/`.

## Making a change

1. Open an issue first for anything bigger than a small fix, so we agree on the approach before you write it.
2. Branch from `master`: `git switch -c fix/short-name`.
3. Read [`AGENTS.md`](AGENTS.md) (the rules: module contract, RBAC, audit, frontend) and [`DEVELOPER.md`](DEVELOPER.md) (the map and the recipes). They apply to people and AI agents alike.
4. Make the change with tests. A change to the package that affects projects needs a `packages/admin-core/CHANGELOG.md` entry under `[Unreleased]`; a breaking one also an `UPGRADE.md` entry.
5. Run every gate from the repo root until it's green:
   ```bash
   composer check
   ```
   Never weaken or skip a test, a Larastan rule or a lint rule to get green.
6. Commit in the scoped format `type(scope): message`, for example `fix(users): keep the filter after a delete` or `feat(core): …`. Types: `feat`, `fix`, `test`, `docs`, `refactor`, `chore`.
7. Open a pull request against `master` and fill in the template.

## Larger work: phases and plans

The roadmap lives in [`docs/plans/`](docs/plans). Larger work follows the same steps the boilerplate was built with:

1. Write a plan (`docs/plans/YYYY-MM-DD-<name>.md`): the files to touch, the steps, the tests, open questions.
2. Get it agreed in the issue or a draft PR before coding.
3. Implement only that plan, keep `composer check` green, tick its boxes, and report decisions you made where the specs were silent.

The specs in `docs/specs/` say what and why. Don't change them silently: propose the change in your PR.

## Code of conduct

Be kind, assume good intent, keep discussions about the work. Maintainers may remove comments or contributions that don't follow this.
