import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
/**
* @see \Yuan\AdminCore\Http\HomeController::__invoke
* @see vendor/yuanmaharsyah/admin-core/src/Http/HomeController.php:22
* @route '/home'
*/
export const home = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: home.url(options),
    method: 'get',
})

home.definition = {
    methods: ["get","head"],
    url: '/home',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Yuan\AdminCore\Http\HomeController::__invoke
* @see vendor/yuanmaharsyah/admin-core/src/Http/HomeController.php:22
* @route '/home'
*/
home.url = (options?: RouteQueryOptions) => {
    return home.definition.url + queryParams(options)
}

/**
* @see \Yuan\AdminCore\Http\HomeController::__invoke
* @see vendor/yuanmaharsyah/admin-core/src/Http/HomeController.php:22
* @route '/home'
*/
home.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: home.url(options),
    method: 'get',
})

/**
* @see \Yuan\AdminCore\Http\HomeController::__invoke
* @see vendor/yuanmaharsyah/admin-core/src/Http/HomeController.php:22
* @route '/home'
*/
home.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: home.url(options),
    method: 'head',
})

/**
* @see \Yuan\AdminCore\Http\HomeController::__invoke
* @see vendor/yuanmaharsyah/admin-core/src/Http/HomeController.php:22
* @route '/home'
*/
const homeForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: home.url(options),
    method: 'get',
})

/**
* @see \Yuan\AdminCore\Http\HomeController::__invoke
* @see vendor/yuanmaharsyah/admin-core/src/Http/HomeController.php:22
* @route '/home'
*/
homeForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: home.url(options),
    method: 'get',
})

/**
* @see \Yuan\AdminCore\Http\HomeController::__invoke
* @see vendor/yuanmaharsyah/admin-core/src/Http/HomeController.php:22
* @route '/home'
*/
homeForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: home.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

home.form = homeForm

const adminCore = {
    home: Object.assign(home, home),
}

export default adminCore