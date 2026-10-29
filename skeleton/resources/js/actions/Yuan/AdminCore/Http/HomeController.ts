import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \Yuan\AdminCore\Http\HomeController::__invoke
* @see vendor/yuanmaharsyah/admin-core/src/Http/HomeController.php:22
* @route '/home'
*/
const HomeController = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: HomeController.url(options),
    method: 'get',
})

HomeController.definition = {
    methods: ["get","head"],
    url: '/home',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Yuan\AdminCore\Http\HomeController::__invoke
* @see vendor/yuanmaharsyah/admin-core/src/Http/HomeController.php:22
* @route '/home'
*/
HomeController.url = (options?: RouteQueryOptions) => {
    return HomeController.definition.url + queryParams(options)
}

/**
* @see \Yuan\AdminCore\Http\HomeController::__invoke
* @see vendor/yuanmaharsyah/admin-core/src/Http/HomeController.php:22
* @route '/home'
*/
HomeController.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: HomeController.url(options),
    method: 'get',
})

/**
* @see \Yuan\AdminCore\Http\HomeController::__invoke
* @see vendor/yuanmaharsyah/admin-core/src/Http/HomeController.php:22
* @route '/home'
*/
HomeController.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: HomeController.url(options),
    method: 'head',
})

/**
* @see \Yuan\AdminCore\Http\HomeController::__invoke
* @see vendor/yuanmaharsyah/admin-core/src/Http/HomeController.php:22
* @route '/home'
*/
const HomeControllerForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: HomeController.url(options),
    method: 'get',
})

/**
* @see \Yuan\AdminCore\Http\HomeController::__invoke
* @see vendor/yuanmaharsyah/admin-core/src/Http/HomeController.php:22
* @route '/home'
*/
HomeControllerForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: HomeController.url(options),
    method: 'get',
})

/**
* @see \Yuan\AdminCore\Http\HomeController::__invoke
* @see vendor/yuanmaharsyah/admin-core/src/Http/HomeController.php:22
* @route '/home'
*/
HomeControllerForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: HomeController.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

HomeController.form = HomeControllerForm

export default HomeController