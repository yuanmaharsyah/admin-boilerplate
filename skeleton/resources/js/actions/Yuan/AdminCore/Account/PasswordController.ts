import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \Yuan\AdminCore\Account\PasswordController::edit
* @see vendor/yuanmaharsyah/admin-core/src/Account/PasswordController.php:29
* @route '/account/password'
*/
export const edit = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/account/password',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Yuan\AdminCore\Account\PasswordController::edit
* @see vendor/yuanmaharsyah/admin-core/src/Account/PasswordController.php:29
* @route '/account/password'
*/
edit.url = (options?: RouteQueryOptions) => {
    return edit.definition.url + queryParams(options)
}

/**
* @see \Yuan\AdminCore\Account\PasswordController::edit
* @see vendor/yuanmaharsyah/admin-core/src/Account/PasswordController.php:29
* @route '/account/password'
*/
edit.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(options),
    method: 'get',
})

/**
* @see \Yuan\AdminCore\Account\PasswordController::edit
* @see vendor/yuanmaharsyah/admin-core/src/Account/PasswordController.php:29
* @route '/account/password'
*/
edit.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(options),
    method: 'head',
})

/**
* @see \Yuan\AdminCore\Account\PasswordController::edit
* @see vendor/yuanmaharsyah/admin-core/src/Account/PasswordController.php:29
* @route '/account/password'
*/
const editForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(options),
    method: 'get',
})

/**
* @see \Yuan\AdminCore\Account\PasswordController::edit
* @see vendor/yuanmaharsyah/admin-core/src/Account/PasswordController.php:29
* @route '/account/password'
*/
editForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(options),
    method: 'get',
})

/**
* @see \Yuan\AdminCore\Account\PasswordController::edit
* @see vendor/yuanmaharsyah/admin-core/src/Account/PasswordController.php:29
* @route '/account/password'
*/
editForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

edit.form = editForm

/**
* @see \Yuan\AdminCore\Account\PasswordController::update
* @see vendor/yuanmaharsyah/admin-core/src/Account/PasswordController.php:44
* @route '/account/password'
*/
export const update = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/account/password',
} satisfies RouteDefinition<["put"]>

/**
* @see \Yuan\AdminCore\Account\PasswordController::update
* @see vendor/yuanmaharsyah/admin-core/src/Account/PasswordController.php:44
* @route '/account/password'
*/
update.url = (options?: RouteQueryOptions) => {
    return update.definition.url + queryParams(options)
}

/**
* @see \Yuan\AdminCore\Account\PasswordController::update
* @see vendor/yuanmaharsyah/admin-core/src/Account/PasswordController.php:44
* @route '/account/password'
*/
update.put = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(options),
    method: 'put',
})

/**
* @see \Yuan\AdminCore\Account\PasswordController::update
* @see vendor/yuanmaharsyah/admin-core/src/Account/PasswordController.php:44
* @route '/account/password'
*/
const updateForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \Yuan\AdminCore\Account\PasswordController::update
* @see vendor/yuanmaharsyah/admin-core/src/Account/PasswordController.php:44
* @route '/account/password'
*/
updateForm.put = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

update.form = updateForm

const PasswordController = { edit, update }

export default PasswordController