import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
/**
* @see \Yuan\AdminCore\Modules\Components\Http\Controllers\ComponentsController::index
* @see vendor/yuanmaharsyah/admin-core/modules/Components/Http/Controllers/ComponentsController.php:24
* @route '/admin/components'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/components',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Yuan\AdminCore\Modules\Components\Http\Controllers\ComponentsController::index
* @see vendor/yuanmaharsyah/admin-core/modules/Components/Http/Controllers/ComponentsController.php:24
* @route '/admin/components'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Yuan\AdminCore\Modules\Components\Http\Controllers\ComponentsController::index
* @see vendor/yuanmaharsyah/admin-core/modules/Components/Http/Controllers/ComponentsController.php:24
* @route '/admin/components'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \Yuan\AdminCore\Modules\Components\Http\Controllers\ComponentsController::index
* @see vendor/yuanmaharsyah/admin-core/modules/Components/Http/Controllers/ComponentsController.php:24
* @route '/admin/components'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \Yuan\AdminCore\Modules\Components\Http\Controllers\ComponentsController::index
* @see vendor/yuanmaharsyah/admin-core/modules/Components/Http/Controllers/ComponentsController.php:24
* @route '/admin/components'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \Yuan\AdminCore\Modules\Components\Http\Controllers\ComponentsController::index
* @see vendor/yuanmaharsyah/admin-core/modules/Components/Http/Controllers/ComponentsController.php:24
* @route '/admin/components'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \Yuan\AdminCore\Modules\Components\Http\Controllers\ComponentsController::index
* @see vendor/yuanmaharsyah/admin-core/modules/Components/Http/Controllers/ComponentsController.php:24
* @route '/admin/components'
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

const components = {
    index: Object.assign(index, index),
}

export default components