import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \Yuan\AdminCore\Account\ProfileController::edit
* @see vendor/yuanmaharsyah/admin-core/src/Account/ProfileController.php:47
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
* @see vendor/yuanmaharsyah/admin-core/src/Account/ProfileController.php:47
* @route '/account/profile'
*/
edit.url = (options?: RouteQueryOptions) => {
    return edit.definition.url + queryParams(options)
}

/**
* @see \Yuan\AdminCore\Account\ProfileController::edit
* @see vendor/yuanmaharsyah/admin-core/src/Account/ProfileController.php:47
* @route '/account/profile'
*/
edit.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(options),
    method: 'get',
})

/**
* @see \Yuan\AdminCore\Account\ProfileController::edit
* @see vendor/yuanmaharsyah/admin-core/src/Account/ProfileController.php:47
* @route '/account/profile'
*/
edit.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(options),
    method: 'head',
})

/**
* @see \Yuan\AdminCore\Account\ProfileController::edit
* @see vendor/yuanmaharsyah/admin-core/src/Account/ProfileController.php:47
* @route '/account/profile'
*/
const editForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(options),
    method: 'get',
})

/**
* @see \Yuan\AdminCore\Account\ProfileController::edit
* @see vendor/yuanmaharsyah/admin-core/src/Account/ProfileController.php:47
* @route '/account/profile'
*/
editForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(options),
    method: 'get',
})

/**
* @see \Yuan\AdminCore\Account\ProfileController::edit
* @see vendor/yuanmaharsyah/admin-core/src/Account/ProfileController.php:47
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
* @see vendor/yuanmaharsyah/admin-core/src/Account/ProfileController.php:77
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
* @see vendor/yuanmaharsyah/admin-core/src/Account/ProfileController.php:77
* @route '/account/profile'
*/
update.url = (options?: RouteQueryOptions) => {
    return update.definition.url + queryParams(options)
}

/**
* @see \Yuan\AdminCore\Account\ProfileController::update
* @see vendor/yuanmaharsyah/admin-core/src/Account/ProfileController.php:77
* @route '/account/profile'
*/
update.put = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(options),
    method: 'put',
})

/**
* @see \Yuan\AdminCore\Account\ProfileController::update
* @see vendor/yuanmaharsyah/admin-core/src/Account/ProfileController.php:77
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
* @see vendor/yuanmaharsyah/admin-core/src/Account/ProfileController.php:77
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

/**
* @see \Yuan\AdminCore\Account\ProfileController::updateAvatar
* @see vendor/yuanmaharsyah/admin-core/src/Account/ProfileController.php:88
* @route '/account/avatar'
*/
export const updateAvatar = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: updateAvatar.url(options),
    method: 'post',
})

updateAvatar.definition = {
    methods: ["post"],
    url: '/account/avatar',
} satisfies RouteDefinition<["post"]>

/**
* @see \Yuan\AdminCore\Account\ProfileController::updateAvatar
* @see vendor/yuanmaharsyah/admin-core/src/Account/ProfileController.php:88
* @route '/account/avatar'
*/
updateAvatar.url = (options?: RouteQueryOptions) => {
    return updateAvatar.definition.url + queryParams(options)
}

/**
* @see \Yuan\AdminCore\Account\ProfileController::updateAvatar
* @see vendor/yuanmaharsyah/admin-core/src/Account/ProfileController.php:88
* @route '/account/avatar'
*/
updateAvatar.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: updateAvatar.url(options),
    method: 'post',
})

/**
* @see \Yuan\AdminCore\Account\ProfileController::updateAvatar
* @see vendor/yuanmaharsyah/admin-core/src/Account/ProfileController.php:88
* @route '/account/avatar'
*/
const updateAvatarForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updateAvatar.url(options),
    method: 'post',
})

/**
* @see \Yuan\AdminCore\Account\ProfileController::updateAvatar
* @see vendor/yuanmaharsyah/admin-core/src/Account/ProfileController.php:88
* @route '/account/avatar'
*/
updateAvatarForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updateAvatar.url(options),
    method: 'post',
})

updateAvatar.form = updateAvatarForm

/**
* @see \Yuan\AdminCore\Account\ProfileController::destroyAvatar
* @see vendor/yuanmaharsyah/admin-core/src/Account/ProfileController.php:98
* @route '/account/avatar'
*/
export const destroyAvatar = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroyAvatar.url(options),
    method: 'delete',
})

destroyAvatar.definition = {
    methods: ["delete"],
    url: '/account/avatar',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Yuan\AdminCore\Account\ProfileController::destroyAvatar
* @see vendor/yuanmaharsyah/admin-core/src/Account/ProfileController.php:98
* @route '/account/avatar'
*/
destroyAvatar.url = (options?: RouteQueryOptions) => {
    return destroyAvatar.definition.url + queryParams(options)
}

/**
* @see \Yuan\AdminCore\Account\ProfileController::destroyAvatar
* @see vendor/yuanmaharsyah/admin-core/src/Account/ProfileController.php:98
* @route '/account/avatar'
*/
destroyAvatar.delete = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroyAvatar.url(options),
    method: 'delete',
})

/**
* @see \Yuan\AdminCore\Account\ProfileController::destroyAvatar
* @see vendor/yuanmaharsyah/admin-core/src/Account/ProfileController.php:98
* @route '/account/avatar'
*/
const destroyAvatarForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroyAvatar.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \Yuan\AdminCore\Account\ProfileController::destroyAvatar
* @see vendor/yuanmaharsyah/admin-core/src/Account/ProfileController.php:98
* @route '/account/avatar'
*/
destroyAvatarForm.delete = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroyAvatar.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroyAvatar.form = destroyAvatarForm

/**
* @see \Yuan\AdminCore\Account\ProfileController::showAvatar
* @see vendor/yuanmaharsyah/admin-core/src/Account/ProfileController.php:113
* @route '/account/avatar/{user}'
*/
export const showAvatar = (args: { user: string | number } | [user: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showAvatar.url(args, options),
    method: 'get',
})

showAvatar.definition = {
    methods: ["get","head"],
    url: '/account/avatar/{user}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Yuan\AdminCore\Account\ProfileController::showAvatar
* @see vendor/yuanmaharsyah/admin-core/src/Account/ProfileController.php:113
* @route '/account/avatar/{user}'
*/
showAvatar.url = (args: { user: string | number } | [user: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { user: args }
    }

    if (Array.isArray(args)) {
        args = {
            user: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        user: args.user,
    }

    return showAvatar.definition.url
            .replace('{user}', parsedArgs.user.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Yuan\AdminCore\Account\ProfileController::showAvatar
* @see vendor/yuanmaharsyah/admin-core/src/Account/ProfileController.php:113
* @route '/account/avatar/{user}'
*/
showAvatar.get = (args: { user: string | number } | [user: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showAvatar.url(args, options),
    method: 'get',
})

/**
* @see \Yuan\AdminCore\Account\ProfileController::showAvatar
* @see vendor/yuanmaharsyah/admin-core/src/Account/ProfileController.php:113
* @route '/account/avatar/{user}'
*/
showAvatar.head = (args: { user: string | number } | [user: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: showAvatar.url(args, options),
    method: 'head',
})

/**
* @see \Yuan\AdminCore\Account\ProfileController::showAvatar
* @see vendor/yuanmaharsyah/admin-core/src/Account/ProfileController.php:113
* @route '/account/avatar/{user}'
*/
const showAvatarForm = (args: { user: string | number } | [user: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: showAvatar.url(args, options),
    method: 'get',
})

/**
* @see \Yuan\AdminCore\Account\ProfileController::showAvatar
* @see vendor/yuanmaharsyah/admin-core/src/Account/ProfileController.php:113
* @route '/account/avatar/{user}'
*/
showAvatarForm.get = (args: { user: string | number } | [user: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: showAvatar.url(args, options),
    method: 'get',
})

/**
* @see \Yuan\AdminCore\Account\ProfileController::showAvatar
* @see vendor/yuanmaharsyah/admin-core/src/Account/ProfileController.php:113
* @route '/account/avatar/{user}'
*/
showAvatarForm.head = (args: { user: string | number } | [user: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: showAvatar.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

showAvatar.form = showAvatarForm

/**
* @see \Yuan\AdminCore\Account\ProfileController::signOutOthers
* @see vendor/yuanmaharsyah/admin-core/src/Account/ProfileController.php:129
* @route '/account/sessions'
*/
export const signOutOthers = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: signOutOthers.url(options),
    method: 'delete',
})

signOutOthers.definition = {
    methods: ["delete"],
    url: '/account/sessions',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Yuan\AdminCore\Account\ProfileController::signOutOthers
* @see vendor/yuanmaharsyah/admin-core/src/Account/ProfileController.php:129
* @route '/account/sessions'
*/
signOutOthers.url = (options?: RouteQueryOptions) => {
    return signOutOthers.definition.url + queryParams(options)
}

/**
* @see \Yuan\AdminCore\Account\ProfileController::signOutOthers
* @see vendor/yuanmaharsyah/admin-core/src/Account/ProfileController.php:129
* @route '/account/sessions'
*/
signOutOthers.delete = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: signOutOthers.url(options),
    method: 'delete',
})

/**
* @see \Yuan\AdminCore\Account\ProfileController::signOutOthers
* @see vendor/yuanmaharsyah/admin-core/src/Account/ProfileController.php:129
* @route '/account/sessions'
*/
const signOutOthersForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: signOutOthers.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \Yuan\AdminCore\Account\ProfileController::signOutOthers
* @see vendor/yuanmaharsyah/admin-core/src/Account/ProfileController.php:129
* @route '/account/sessions'
*/
signOutOthersForm.delete = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: signOutOthers.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

signOutOthers.form = signOutOthersForm

const ProfileController = { edit, update, updateAvatar, destroyAvatar, showAvatar, signOutOthers }

export default ProfileController