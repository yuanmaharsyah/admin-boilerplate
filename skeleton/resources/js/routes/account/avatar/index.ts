import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \Yuan\AdminCore\Account\ProfileController::update
* @see vendor/yuanmaharsyah/admin-core/src/Account/ProfileController.php:88
* @route '/account/avatar'
*/
export const update = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: update.url(options),
    method: 'post',
})

update.definition = {
    methods: ["post"],
    url: '/account/avatar',
} satisfies RouteDefinition<["post"]>

/**
* @see \Yuan\AdminCore\Account\ProfileController::update
* @see vendor/yuanmaharsyah/admin-core/src/Account/ProfileController.php:88
* @route '/account/avatar'
*/
update.url = (options?: RouteQueryOptions) => {
    return update.definition.url + queryParams(options)
}

/**
* @see \Yuan\AdminCore\Account\ProfileController::update
* @see vendor/yuanmaharsyah/admin-core/src/Account/ProfileController.php:88
* @route '/account/avatar'
*/
update.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: update.url(options),
    method: 'post',
})

/**
* @see \Yuan\AdminCore\Account\ProfileController::update
* @see vendor/yuanmaharsyah/admin-core/src/Account/ProfileController.php:88
* @route '/account/avatar'
*/
const updateForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(options),
    method: 'post',
})

/**
* @see \Yuan\AdminCore\Account\ProfileController::update
* @see vendor/yuanmaharsyah/admin-core/src/Account/ProfileController.php:88
* @route '/account/avatar'
*/
updateForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(options),
    method: 'post',
})

update.form = updateForm

/**
* @see \Yuan\AdminCore\Account\ProfileController::destroy
* @see vendor/yuanmaharsyah/admin-core/src/Account/ProfileController.php:98
* @route '/account/avatar'
*/
export const destroy = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/account/avatar',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Yuan\AdminCore\Account\ProfileController::destroy
* @see vendor/yuanmaharsyah/admin-core/src/Account/ProfileController.php:98
* @route '/account/avatar'
*/
destroy.url = (options?: RouteQueryOptions) => {
    return destroy.definition.url + queryParams(options)
}

/**
* @see \Yuan\AdminCore\Account\ProfileController::destroy
* @see vendor/yuanmaharsyah/admin-core/src/Account/ProfileController.php:98
* @route '/account/avatar'
*/
destroy.delete = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(options),
    method: 'delete',
})

/**
* @see \Yuan\AdminCore\Account\ProfileController::destroy
* @see vendor/yuanmaharsyah/admin-core/src/Account/ProfileController.php:98
* @route '/account/avatar'
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
* @see vendor/yuanmaharsyah/admin-core/src/Account/ProfileController.php:98
* @route '/account/avatar'
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

/**
* @see \Yuan\AdminCore\Account\ProfileController::show
* @see vendor/yuanmaharsyah/admin-core/src/Account/ProfileController.php:113
* @route '/account/avatar/{user}'
*/
export const show = (args: { user: string | number } | [user: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/account/avatar/{user}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Yuan\AdminCore\Account\ProfileController::show
* @see vendor/yuanmaharsyah/admin-core/src/Account/ProfileController.php:113
* @route '/account/avatar/{user}'
*/
show.url = (args: { user: string | number } | [user: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return show.definition.url
            .replace('{user}', parsedArgs.user.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Yuan\AdminCore\Account\ProfileController::show
* @see vendor/yuanmaharsyah/admin-core/src/Account/ProfileController.php:113
* @route '/account/avatar/{user}'
*/
show.get = (args: { user: string | number } | [user: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \Yuan\AdminCore\Account\ProfileController::show
* @see vendor/yuanmaharsyah/admin-core/src/Account/ProfileController.php:113
* @route '/account/avatar/{user}'
*/
show.head = (args: { user: string | number } | [user: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \Yuan\AdminCore\Account\ProfileController::show
* @see vendor/yuanmaharsyah/admin-core/src/Account/ProfileController.php:113
* @route '/account/avatar/{user}'
*/
const showForm = (args: { user: string | number } | [user: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \Yuan\AdminCore\Account\ProfileController::show
* @see vendor/yuanmaharsyah/admin-core/src/Account/ProfileController.php:113
* @route '/account/avatar/{user}'
*/
showForm.get = (args: { user: string | number } | [user: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \Yuan\AdminCore\Account\ProfileController::show
* @see vendor/yuanmaharsyah/admin-core/src/Account/ProfileController.php:113
* @route '/account/avatar/{user}'
*/
showForm.head = (args: { user: string | number } | [user: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

show.form = showForm

const avatar = {
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
    show: Object.assign(show, show),
}

export default avatar