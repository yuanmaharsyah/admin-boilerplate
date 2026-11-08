import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see \Yuan\AdminCore\Account\ProfileController::destroy
* @see vendor/yuanmaharsyah/admin-core/src/Account/ProfileController.php:129
* @route '/account/sessions'
*/
export const destroy = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/account/sessions',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Yuan\AdminCore\Account\ProfileController::destroy
* @see vendor/yuanmaharsyah/admin-core/src/Account/ProfileController.php:129
* @route '/account/sessions'
*/
destroy.url = (options?: RouteQueryOptions) => {
    return destroy.definition.url + queryParams(options)
}

/**
* @see \Yuan\AdminCore\Account\ProfileController::destroy
* @see vendor/yuanmaharsyah/admin-core/src/Account/ProfileController.php:129
* @route '/account/sessions'
*/
destroy.delete = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(options),
    method: 'delete',
})

/**
* @see \Yuan\AdminCore\Account\ProfileController::destroy
* @see vendor/yuanmaharsyah/admin-core/src/Account/ProfileController.php:129
* @route '/account/sessions'
*/
const destroyForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \Yuan\AdminCore\Account\ProfileController::destroy
* @see vendor/yuanmaharsyah/admin-core/src/Account/ProfileController.php:129
* @route '/account/sessions'
*/
destroyForm.delete = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const sessions = {
    destroy: Object.assign(destroy, destroy),
}

export default sessions