import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \Yuan\AdminCore\Modules\Settings\Http\Controllers\SettingsController::index
* @see vendor/yuanmaharsyah/admin-core/modules/Settings/Http/Controllers/SettingsController.php:31
* @route '/admin/settings'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/settings',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Yuan\AdminCore\Modules\Settings\Http\Controllers\SettingsController::index
* @see vendor/yuanmaharsyah/admin-core/modules/Settings/Http/Controllers/SettingsController.php:31
* @route '/admin/settings'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Yuan\AdminCore\Modules\Settings\Http\Controllers\SettingsController::index
* @see vendor/yuanmaharsyah/admin-core/modules/Settings/Http/Controllers/SettingsController.php:31
* @route '/admin/settings'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \Yuan\AdminCore\Modules\Settings\Http\Controllers\SettingsController::index
* @see vendor/yuanmaharsyah/admin-core/modules/Settings/Http/Controllers/SettingsController.php:31
* @route '/admin/settings'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \Yuan\AdminCore\Modules\Settings\Http\Controllers\SettingsController::index
* @see vendor/yuanmaharsyah/admin-core/modules/Settings/Http/Controllers/SettingsController.php:31
* @route '/admin/settings'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \Yuan\AdminCore\Modules\Settings\Http\Controllers\SettingsController::index
* @see vendor/yuanmaharsyah/admin-core/modules/Settings/Http/Controllers/SettingsController.php:31
* @route '/admin/settings'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \Yuan\AdminCore\Modules\Settings\Http\Controllers\SettingsController::index
* @see vendor/yuanmaharsyah/admin-core/modules/Settings/Http/Controllers/SettingsController.php:31
* @route '/admin/settings'
*/
indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

index.form = indexForm

/**
* @see \Yuan\AdminCore\Modules\Settings\Http\Controllers\SettingsController::update
* @see vendor/yuanmaharsyah/admin-core/modules/Settings/Http/Controllers/SettingsController.php:49
* @route '/admin/settings/{group}'
*/
export const update = (args: { group: string | number } | [group: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/admin/settings/{group}',
} satisfies RouteDefinition<["put"]>

/**
* @see \Yuan\AdminCore\Modules\Settings\Http\Controllers\SettingsController::update
* @see vendor/yuanmaharsyah/admin-core/modules/Settings/Http/Controllers/SettingsController.php:49
* @route '/admin/settings/{group}'
*/
update.url = (args: { group: string | number } | [group: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { group: args }
    }

    if (Array.isArray(args)) {
        args = {
            group: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        group: args.group,
    }

    return update.definition.url
            .replace('{group}', parsedArgs.group.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Yuan\AdminCore\Modules\Settings\Http\Controllers\SettingsController::update
* @see vendor/yuanmaharsyah/admin-core/modules/Settings/Http/Controllers/SettingsController.php:49
* @route '/admin/settings/{group}'
*/
update.put = (args: { group: string | number } | [group: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \Yuan\AdminCore\Modules\Settings\Http\Controllers\SettingsController::update
* @see vendor/yuanmaharsyah/admin-core/modules/Settings/Http/Controllers/SettingsController.php:49
* @route '/admin/settings/{group}'
*/
const updateForm = (args: { group: string | number } | [group: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \Yuan\AdminCore\Modules\Settings\Http\Controllers\SettingsController::update
* @see vendor/yuanmaharsyah/admin-core/modules/Settings/Http/Controllers/SettingsController.php:49
* @route '/admin/settings/{group}'
*/
updateForm.put = (args: { group: string | number } | [group: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

update.form = updateForm

const settings = {
    index: Object.assign(index, index),
    update: Object.assign(update, update),
}

export default settings