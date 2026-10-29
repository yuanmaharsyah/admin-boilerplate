import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \Yuan\AdminCore\Account\ProfileController::edit
* @see vendor/yuanmaharsyah/admin-core/src/Account/ProfileController.php:25
* @route '/account/profile'
*/
export const edit = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/account/profile',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Yuan\AdminCore\Account\ProfileController::edit
* @see vendor/yuanmaharsyah/admin-core/src/Account/ProfileController.php:25
* @route '/account/profile'
*/
edit.url = (options?: RouteQueryOptions) => {
    return edit.definition.url + queryParams(options)
}

/**
* @see \Yuan\AdminCore\Account\ProfileController::edit
* @see vendor/yuanmaharsyah/admin-core/src/Account/ProfileController.php:25
* @route '/account/profile'
*/
edit.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(options),
    method: 'get',
})

/**
* @see \Yuan\AdminCore\Account\ProfileController::edit
* @see vendor/yuanmaharsyah/admin-core/src/Account/ProfileController.php:25
* @route '/account/profile'
*/
edit.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(options),
    method: 'head',
})

/**
* @see \Yuan\AdminCore\Account\ProfileController::edit
* @see vendor/yuanmaharsyah/admin-core/src/Account/ProfileController.php:25
* @route '/account/profile'
*/
const editForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(options),
    method: 'get',
})

/**
* @see \Yuan\AdminCore\Account\ProfileController::edit
* @see vendor/yuanmaharsyah/admin-core/src/Account/ProfileController.php:25
* @route '/account/profile'
*/
editForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(options),
    method: 'get',
})

/**
* @see \Yuan\AdminCore\Account\ProfileController::edit
* @see vendor/yuanmaharsyah/admin-core/src/Account/ProfileController.php:25
* @route '/account/profile'
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
* @see \Yuan\AdminCore\Account\ProfileController::update
* @see vendor/yuanmaharsyah/admin-core/src/Account/ProfileController.php:43
* @route '/account/profile'
*/
export const update = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/account/profile',
} satisfies RouteDefinition<["put"]>

/**
* @see \Yuan\AdminCore\Account\ProfileController::update
* @see vendor/yuanmaharsyah/admin-core/src/Account/ProfileController.php:43
* @route '/account/profile'
*/
update.url = (options?: RouteQueryOptions) => {
    return update.definition.url + queryParams(options)
}

/**
* @see \Yuan\AdminCore\Account\ProfileController::update
* @see vendor/yuanmaharsyah/admin-core/src/Account/ProfileController.php:43
* @route '/account/profile'
*/
update.put = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(options),
    method: 'put',
})

/**
* @see \Yuan\AdminCore\Account\ProfileController::update
* @see vendor/yuanmaharsyah/admin-core/src/Account/ProfileController.php:43
* @route '/account/profile'
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
* @see \Yuan\AdminCore\Account\ProfileController::update
* @see vendor/yuanmaharsyah/admin-core/src/Account/ProfileController.php:43
* @route '/account/profile'
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

const ProfileController = { edit, update }

export default ProfileController