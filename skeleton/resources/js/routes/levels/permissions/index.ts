import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \Yuan\AdminCore\Modules\Levels\Http\Controllers\LevelsController::update
* @see vendor/yuanmaharsyah/admin-core/modules/Levels/Http/Controllers/LevelsController.php:123
* @route '/admin/levels/{level}/permissions'
*/
export const update = (args: { level: number | { id: number } } | [level: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/admin/levels/{level}/permissions',
} satisfies RouteDefinition<["put"]>

/**
* @see \Yuan\AdminCore\Modules\Levels\Http\Controllers\LevelsController::update
* @see vendor/yuanmaharsyah/admin-core/modules/Levels/Http/Controllers/LevelsController.php:123
* @route '/admin/levels/{level}/permissions'
*/
update.url = (args: { level: number | { id: number } } | [level: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { level: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { level: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            level: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        level: typeof args.level === 'object'
        ? args.level.id
        : args.level,
    }

    return update.definition.url
            .replace('{level}', parsedArgs.level.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Yuan\AdminCore\Modules\Levels\Http\Controllers\LevelsController::update
* @see vendor/yuanmaharsyah/admin-core/modules/Levels/Http/Controllers/LevelsController.php:123
* @route '/admin/levels/{level}/permissions'
*/
update.put = (args: { level: number | { id: number } } | [level: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \Yuan\AdminCore\Modules\Levels\Http\Controllers\LevelsController::update
* @see vendor/yuanmaharsyah/admin-core/modules/Levels/Http/Controllers/LevelsController.php:123
* @route '/admin/levels/{level}/permissions'
*/
const updateForm = (args: { level: number | { id: number } } | [level: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \Yuan\AdminCore\Modules\Levels\Http\Controllers\LevelsController::update
* @see vendor/yuanmaharsyah/admin-core/modules/Levels/Http/Controllers/LevelsController.php:123
* @route '/admin/levels/{level}/permissions'
*/
updateForm.put = (args: { level: number | { id: number } } | [level: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

update.form = updateForm

const permissions = {
    update: Object.assign(update, update),
}

export default permissions