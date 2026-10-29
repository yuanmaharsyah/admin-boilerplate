import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../../../wayfinder'
/**
* @see \Yuan\AdminCore\Modules\Dashboard\Http\Controllers\DashboardController::index
* @see vendor/yuanmaharsyah/admin-core/modules/Dashboard/Http/Controllers/DashboardController.php:25
* @route '/admin/dashboard'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Yuan\AdminCore\Modules\Dashboard\Http\Controllers\DashboardController::index
* @see vendor/yuanmaharsyah/admin-core/modules/Dashboard/Http/Controllers/DashboardController.php:25
* @route '/admin/dashboard'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Yuan\AdminCore\Modules\Dashboard\Http\Controllers\DashboardController::index
* @see vendor/yuanmaharsyah/admin-core/modules/Dashboard/Http/Controllers/DashboardController.php:25
* @route '/admin/dashboard'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \Yuan\AdminCore\Modules\Dashboard\Http\Controllers\DashboardController::index
* @see vendor/yuanmaharsyah/admin-core/modules/Dashboard/Http/Controllers/DashboardController.php:25
* @route '/admin/dashboard'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \Yuan\AdminCore\Modules\Dashboard\Http\Controllers\DashboardController::index
* @see vendor/yuanmaharsyah/admin-core/modules/Dashboard/Http/Controllers/DashboardController.php:25
* @route '/admin/dashboard'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \Yuan\AdminCore\Modules\Dashboard\Http\Controllers\DashboardController::index
* @see vendor/yuanmaharsyah/admin-core/modules/Dashboard/Http/Controllers/DashboardController.php:25
* @route '/admin/dashboard'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \Yuan\AdminCore\Modules\Dashboard\Http\Controllers\DashboardController::index
* @see vendor/yuanmaharsyah/admin-core/modules/Dashboard/Http/Controllers/DashboardController.php:25
* @route '/admin/dashboard'
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

const DashboardController = { index }

export default DashboardController