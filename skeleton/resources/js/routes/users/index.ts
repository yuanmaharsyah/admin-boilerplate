import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
import trash067cdb from './trash'
/**
* @see \Yuan\AdminCore\Trash\TrashController::trash
* @see vendor/yuanmaharsyah/admin-core/src/Trash/TrashController.php:60
* @route '/admin/users/trash'
*/
export const trash = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: trash.url(options),
    method: 'get',
})

trash.definition = {
    methods: ["get","head"],
    url: '/admin/users/trash',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Yuan\AdminCore\Trash\TrashController::trash
* @see vendor/yuanmaharsyah/admin-core/src/Trash/TrashController.php:60
* @route '/admin/users/trash'
*/
trash.url = (options?: RouteQueryOptions) => {
    return trash.definition.url + queryParams(options)
}

/**
* @see \Yuan\AdminCore\Trash\TrashController::trash
* @see vendor/yuanmaharsyah/admin-core/src/Trash/TrashController.php:60
* @route '/admin/users/trash'
*/
trash.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: trash.url(options),
    method: 'get',
})

/**
* @see \Yuan\AdminCore\Trash\TrashController::trash
* @see vendor/yuanmaharsyah/admin-core/src/Trash/TrashController.php:60
* @route '/admin/users/trash'
*/
trash.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: trash.url(options),
    method: 'head',
})

/**
* @see \Yuan\AdminCore\Trash\TrashController::trash
* @see vendor/yuanmaharsyah/admin-core/src/Trash/TrashController.php:60
* @route '/admin/users/trash'
*/
const trashForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: trash.url(options),
    method: 'get',
})

/**
* @see \Yuan\AdminCore\Trash\TrashController::trash
* @see vendor/yuanmaharsyah/admin-core/src/Trash/TrashController.php:60
* @route '/admin/users/trash'
*/
trashForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: trash.url(options),
    method: 'get',
})

/**
* @see \Yuan\AdminCore\Trash\TrashController::trash
* @see vendor/yuanmaharsyah/admin-core/src/Trash/TrashController.php:60
* @route '/admin/users/trash'
*/
trashForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: trash.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

trash.form = trashForm

/**
* @see \Yuan\AdminCore\Modules\Users\Http\Controllers\UsersController::index
* @see vendor/yuanmaharsyah/admin-core/modules/Users/Http/Controllers/UsersController.php:40
* @route '/admin/users'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/users',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Yuan\AdminCore\Modules\Users\Http\Controllers\UsersController::index
* @see vendor/yuanmaharsyah/admin-core/modules/Users/Http/Controllers/UsersController.php:40
* @route '/admin/users'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Yuan\AdminCore\Modules\Users\Http\Controllers\UsersController::index
* @see vendor/yuanmaharsyah/admin-core/modules/Users/Http/Controllers/UsersController.php:40
* @route '/admin/users'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \Yuan\AdminCore\Modules\Users\Http\Controllers\UsersController::index
* @see vendor/yuanmaharsyah/admin-core/modules/Users/Http/Controllers/UsersController.php:40
* @route '/admin/users'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \Yuan\AdminCore\Modules\Users\Http\Controllers\UsersController::index
* @see vendor/yuanmaharsyah/admin-core/modules/Users/Http/Controllers/UsersController.php:40
* @route '/admin/users'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \Yuan\AdminCore\Modules\Users\Http\Controllers\UsersController::index
* @see vendor/yuanmaharsyah/admin-core/modules/Users/Http/Controllers/UsersController.php:40
* @route '/admin/users'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \Yuan\AdminCore\Modules\Users\Http\Controllers\UsersController::index
* @see vendor/yuanmaharsyah/admin-core/modules/Users/Http/Controllers/UsersController.php:40
* @route '/admin/users'
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
* @see \Yuan\AdminCore\Modules\Users\Http\Controllers\UsersController::download
* @see vendor/yuanmaharsyah/admin-core/modules/Users/Http/Controllers/UsersController.php:160
* @route '/admin/users/download'
*/
export const download = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: download.url(options),
    method: 'get',
})

download.definition = {
    methods: ["get","head"],
    url: '/admin/users/download',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Yuan\AdminCore\Modules\Users\Http\Controllers\UsersController::download
* @see vendor/yuanmaharsyah/admin-core/modules/Users/Http/Controllers/UsersController.php:160
* @route '/admin/users/download'
*/
download.url = (options?: RouteQueryOptions) => {
    return download.definition.url + queryParams(options)
}

/**
* @see \Yuan\AdminCore\Modules\Users\Http\Controllers\UsersController::download
* @see vendor/yuanmaharsyah/admin-core/modules/Users/Http/Controllers/UsersController.php:160
* @route '/admin/users/download'
*/
download.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: download.url(options),
    method: 'get',
})

/**
* @see \Yuan\AdminCore\Modules\Users\Http\Controllers\UsersController::download
* @see vendor/yuanmaharsyah/admin-core/modules/Users/Http/Controllers/UsersController.php:160
* @route '/admin/users/download'
*/
download.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: download.url(options),
    method: 'head',
})

/**
* @see \Yuan\AdminCore\Modules\Users\Http\Controllers\UsersController::download
* @see vendor/yuanmaharsyah/admin-core/modules/Users/Http/Controllers/UsersController.php:160
* @route '/admin/users/download'
*/
const downloadForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: download.url(options),
    method: 'get',
})

/**
* @see \Yuan\AdminCore\Modules\Users\Http\Controllers\UsersController::download
* @see vendor/yuanmaharsyah/admin-core/modules/Users/Http/Controllers/UsersController.php:160
* @route '/admin/users/download'
*/
downloadForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: download.url(options),
    method: 'get',
})

/**
* @see \Yuan\AdminCore\Modules\Users\Http\Controllers\UsersController::download
* @see vendor/yuanmaharsyah/admin-core/modules/Users/Http/Controllers/UsersController.php:160
* @route '/admin/users/download'
*/
downloadForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: download.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

download.form = downloadForm

/**
* @see \Yuan\AdminCore\Modules\Users\Http\Controllers\UsersController::create
* @see vendor/yuanmaharsyah/admin-core/modules/Users/Http/Controllers/UsersController.php:51
* @route '/admin/users/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/admin/users/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Yuan\AdminCore\Modules\Users\Http\Controllers\UsersController::create
* @see vendor/yuanmaharsyah/admin-core/modules/Users/Http/Controllers/UsersController.php:51
* @route '/admin/users/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \Yuan\AdminCore\Modules\Users\Http\Controllers\UsersController::create
* @see vendor/yuanmaharsyah/admin-core/modules/Users/Http/Controllers/UsersController.php:51
* @route '/admin/users/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \Yuan\AdminCore\Modules\Users\Http\Controllers\UsersController::create
* @see vendor/yuanmaharsyah/admin-core/modules/Users/Http/Controllers/UsersController.php:51
* @route '/admin/users/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \Yuan\AdminCore\Modules\Users\Http\Controllers\UsersController::create
* @see vendor/yuanmaharsyah/admin-core/modules/Users/Http/Controllers/UsersController.php:51
* @route '/admin/users/create'
*/
const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \Yuan\AdminCore\Modules\Users\Http\Controllers\UsersController::create
* @see vendor/yuanmaharsyah/admin-core/modules/Users/Http/Controllers/UsersController.php:51
* @route '/admin/users/create'
*/
createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \Yuan\AdminCore\Modules\Users\Http\Controllers\UsersController::create
* @see vendor/yuanmaharsyah/admin-core/modules/Users/Http/Controllers/UsersController.php:51
* @route '/admin/users/create'
*/
createForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

create.form = createForm

/**
* @see \Yuan\AdminCore\Modules\Users\Http\Controllers\UsersController::store
* @see vendor/yuanmaharsyah/admin-core/modules/Users/Http/Controllers/UsersController.php:61
* @route '/admin/users'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/users',
} satisfies RouteDefinition<["post"]>

/**
* @see \Yuan\AdminCore\Modules\Users\Http\Controllers\UsersController::store
* @see vendor/yuanmaharsyah/admin-core/modules/Users/Http/Controllers/UsersController.php:61
* @route '/admin/users'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Yuan\AdminCore\Modules\Users\Http\Controllers\UsersController::store
* @see vendor/yuanmaharsyah/admin-core/modules/Users/Http/Controllers/UsersController.php:61
* @route '/admin/users'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \Yuan\AdminCore\Modules\Users\Http\Controllers\UsersController::store
* @see vendor/yuanmaharsyah/admin-core/modules/Users/Http/Controllers/UsersController.php:61
* @route '/admin/users'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \Yuan\AdminCore\Modules\Users\Http\Controllers\UsersController::store
* @see vendor/yuanmaharsyah/admin-core/modules/Users/Http/Controllers/UsersController.php:61
* @route '/admin/users'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \Yuan\AdminCore\Modules\Users\Http\Controllers\UsersController::bulkDestroy
* @see vendor/yuanmaharsyah/admin-core/modules/Users/Http/Controllers/UsersController.php:147
* @route '/admin/users'
*/
export const bulkDestroy = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: bulkDestroy.url(options),
    method: 'delete',
})

bulkDestroy.definition = {
    methods: ["delete"],
    url: '/admin/users',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Yuan\AdminCore\Modules\Users\Http\Controllers\UsersController::bulkDestroy
* @see vendor/yuanmaharsyah/admin-core/modules/Users/Http/Controllers/UsersController.php:147
* @route '/admin/users'
*/
bulkDestroy.url = (options?: RouteQueryOptions) => {
    return bulkDestroy.definition.url + queryParams(options)
}

/**
* @see \Yuan\AdminCore\Modules\Users\Http\Controllers\UsersController::bulkDestroy
* @see vendor/yuanmaharsyah/admin-core/modules/Users/Http/Controllers/UsersController.php:147
* @route '/admin/users'
*/
bulkDestroy.delete = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: bulkDestroy.url(options),
    method: 'delete',
})

/**
* @see \Yuan\AdminCore\Modules\Users\Http\Controllers\UsersController::bulkDestroy
* @see vendor/yuanmaharsyah/admin-core/modules/Users/Http/Controllers/UsersController.php:147
* @route '/admin/users'
*/
const bulkDestroyForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: bulkDestroy.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \Yuan\AdminCore\Modules\Users\Http\Controllers\UsersController::bulkDestroy
* @see vendor/yuanmaharsyah/admin-core/modules/Users/Http/Controllers/UsersController.php:147
* @route '/admin/users'
*/
bulkDestroyForm.delete = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: bulkDestroy.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

bulkDestroy.form = bulkDestroyForm

/**
* @see \Yuan\AdminCore\Modules\Users\Http\Controllers\UsersController::show
* @see vendor/yuanmaharsyah/admin-core/modules/Users/Http/Controllers/UsersController.php:71
* @route '/admin/users/{user}'
*/
export const show = (args: { user: string | number } | [user: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/admin/users/{user}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Yuan\AdminCore\Modules\Users\Http\Controllers\UsersController::show
* @see vendor/yuanmaharsyah/admin-core/modules/Users/Http/Controllers/UsersController.php:71
* @route '/admin/users/{user}'
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
* @see \Yuan\AdminCore\Modules\Users\Http\Controllers\UsersController::show
* @see vendor/yuanmaharsyah/admin-core/modules/Users/Http/Controllers/UsersController.php:71
* @route '/admin/users/{user}'
*/
show.get = (args: { user: string | number } | [user: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \Yuan\AdminCore\Modules\Users\Http\Controllers\UsersController::show
* @see vendor/yuanmaharsyah/admin-core/modules/Users/Http/Controllers/UsersController.php:71
* @route '/admin/users/{user}'
*/
show.head = (args: { user: string | number } | [user: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \Yuan\AdminCore\Modules\Users\Http\Controllers\UsersController::show
* @see vendor/yuanmaharsyah/admin-core/modules/Users/Http/Controllers/UsersController.php:71
* @route '/admin/users/{user}'
*/
const showForm = (args: { user: string | number } | [user: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \Yuan\AdminCore\Modules\Users\Http\Controllers\UsersController::show
* @see vendor/yuanmaharsyah/admin-core/modules/Users/Http/Controllers/UsersController.php:71
* @route '/admin/users/{user}'
*/
showForm.get = (args: { user: string | number } | [user: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \Yuan\AdminCore\Modules\Users\Http\Controllers\UsersController::show
* @see vendor/yuanmaharsyah/admin-core/modules/Users/Http/Controllers/UsersController.php:71
* @route '/admin/users/{user}'
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

/**
* @see \Yuan\AdminCore\Modules\Users\Http\Controllers\UsersController::edit
* @see vendor/yuanmaharsyah/admin-core/modules/Users/Http/Controllers/UsersController.php:84
* @route '/admin/users/{user}/edit'
*/
export const edit = (args: { user: string | number } | [user: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/users/{user}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Yuan\AdminCore\Modules\Users\Http\Controllers\UsersController::edit
* @see vendor/yuanmaharsyah/admin-core/modules/Users/Http/Controllers/UsersController.php:84
* @route '/admin/users/{user}/edit'
*/
edit.url = (args: { user: string | number } | [user: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return edit.definition.url
            .replace('{user}', parsedArgs.user.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Yuan\AdminCore\Modules\Users\Http\Controllers\UsersController::edit
* @see vendor/yuanmaharsyah/admin-core/modules/Users/Http/Controllers/UsersController.php:84
* @route '/admin/users/{user}/edit'
*/
edit.get = (args: { user: string | number } | [user: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \Yuan\AdminCore\Modules\Users\Http\Controllers\UsersController::edit
* @see vendor/yuanmaharsyah/admin-core/modules/Users/Http/Controllers/UsersController.php:84
* @route '/admin/users/{user}/edit'
*/
edit.head = (args: { user: string | number } | [user: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \Yuan\AdminCore\Modules\Users\Http\Controllers\UsersController::edit
* @see vendor/yuanmaharsyah/admin-core/modules/Users/Http/Controllers/UsersController.php:84
* @route '/admin/users/{user}/edit'
*/
const editForm = (args: { user: string | number } | [user: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \Yuan\AdminCore\Modules\Users\Http\Controllers\UsersController::edit
* @see vendor/yuanmaharsyah/admin-core/modules/Users/Http/Controllers/UsersController.php:84
* @route '/admin/users/{user}/edit'
*/
editForm.get = (args: { user: string | number } | [user: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \Yuan\AdminCore\Modules\Users\Http\Controllers\UsersController::edit
* @see vendor/yuanmaharsyah/admin-core/modules/Users/Http/Controllers/UsersController.php:84
* @route '/admin/users/{user}/edit'
*/
editForm.head = (args: { user: string | number } | [user: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

edit.form = editForm

/**
* @see \Yuan\AdminCore\Modules\Users\Http\Controllers\UsersController::update
* @see vendor/yuanmaharsyah/admin-core/modules/Users/Http/Controllers/UsersController.php:99
* @route '/admin/users/{user}'
*/
export const update = (args: { user: string | number } | [user: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/admin/users/{user}',
} satisfies RouteDefinition<["put"]>

/**
* @see \Yuan\AdminCore\Modules\Users\Http\Controllers\UsersController::update
* @see vendor/yuanmaharsyah/admin-core/modules/Users/Http/Controllers/UsersController.php:99
* @route '/admin/users/{user}'
*/
update.url = (args: { user: string | number } | [user: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return update.definition.url
            .replace('{user}', parsedArgs.user.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Yuan\AdminCore\Modules\Users\Http\Controllers\UsersController::update
* @see vendor/yuanmaharsyah/admin-core/modules/Users/Http/Controllers/UsersController.php:99
* @route '/admin/users/{user}'
*/
update.put = (args: { user: string | number } | [user: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \Yuan\AdminCore\Modules\Users\Http\Controllers\UsersController::update
* @see vendor/yuanmaharsyah/admin-core/modules/Users/Http/Controllers/UsersController.php:99
* @route '/admin/users/{user}'
*/
const updateForm = (args: { user: string | number } | [user: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \Yuan\AdminCore\Modules\Users\Http\Controllers\UsersController::update
* @see vendor/yuanmaharsyah/admin-core/modules/Users/Http/Controllers/UsersController.php:99
* @route '/admin/users/{user}'
*/
updateForm.put = (args: { user: string | number } | [user: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

update.form = updateForm

/**
* @see \Yuan\AdminCore\Modules\Users\Http\Controllers\UsersController::activate
* @see vendor/yuanmaharsyah/admin-core/modules/Users/Http/Controllers/UsersController.php:110
* @route '/admin/users/{user}/activate'
*/
export const activate = (args: { user: string | number } | [user: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: activate.url(args, options),
    method: 'post',
})

activate.definition = {
    methods: ["post"],
    url: '/admin/users/{user}/activate',
} satisfies RouteDefinition<["post"]>

/**
* @see \Yuan\AdminCore\Modules\Users\Http\Controllers\UsersController::activate
* @see vendor/yuanmaharsyah/admin-core/modules/Users/Http/Controllers/UsersController.php:110
* @route '/admin/users/{user}/activate'
*/
activate.url = (args: { user: string | number } | [user: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return activate.definition.url
            .replace('{user}', parsedArgs.user.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Yuan\AdminCore\Modules\Users\Http\Controllers\UsersController::activate
* @see vendor/yuanmaharsyah/admin-core/modules/Users/Http/Controllers/UsersController.php:110
* @route '/admin/users/{user}/activate'
*/
activate.post = (args: { user: string | number } | [user: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: activate.url(args, options),
    method: 'post',
})

/**
* @see \Yuan\AdminCore\Modules\Users\Http\Controllers\UsersController::activate
* @see vendor/yuanmaharsyah/admin-core/modules/Users/Http/Controllers/UsersController.php:110
* @route '/admin/users/{user}/activate'
*/
const activateForm = (args: { user: string | number } | [user: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: activate.url(args, options),
    method: 'post',
})

/**
* @see \Yuan\AdminCore\Modules\Users\Http\Controllers\UsersController::activate
* @see vendor/yuanmaharsyah/admin-core/modules/Users/Http/Controllers/UsersController.php:110
* @route '/admin/users/{user}/activate'
*/
activateForm.post = (args: { user: string | number } | [user: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: activate.url(args, options),
    method: 'post',
})

activate.form = activateForm

/**
* @see \Yuan\AdminCore\Modules\Users\Http\Controllers\UsersController::deactivate
* @see vendor/yuanmaharsyah/admin-core/modules/Users/Http/Controllers/UsersController.php:115
* @route '/admin/users/{user}/deactivate'
*/
export const deactivate = (args: { user: string | number } | [user: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: deactivate.url(args, options),
    method: 'post',
})

deactivate.definition = {
    methods: ["post"],
    url: '/admin/users/{user}/deactivate',
} satisfies RouteDefinition<["post"]>

/**
* @see \Yuan\AdminCore\Modules\Users\Http\Controllers\UsersController::deactivate
* @see vendor/yuanmaharsyah/admin-core/modules/Users/Http/Controllers/UsersController.php:115
* @route '/admin/users/{user}/deactivate'
*/
deactivate.url = (args: { user: string | number } | [user: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return deactivate.definition.url
            .replace('{user}', parsedArgs.user.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Yuan\AdminCore\Modules\Users\Http\Controllers\UsersController::deactivate
* @see vendor/yuanmaharsyah/admin-core/modules/Users/Http/Controllers/UsersController.php:115
* @route '/admin/users/{user}/deactivate'
*/
deactivate.post = (args: { user: string | number } | [user: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: deactivate.url(args, options),
    method: 'post',
})

/**
* @see \Yuan\AdminCore\Modules\Users\Http\Controllers\UsersController::deactivate
* @see vendor/yuanmaharsyah/admin-core/modules/Users/Http/Controllers/UsersController.php:115
* @route '/admin/users/{user}/deactivate'
*/
const deactivateForm = (args: { user: string | number } | [user: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: deactivate.url(args, options),
    method: 'post',
})

/**
* @see \Yuan\AdminCore\Modules\Users\Http\Controllers\UsersController::deactivate
* @see vendor/yuanmaharsyah/admin-core/modules/Users/Http/Controllers/UsersController.php:115
* @route '/admin/users/{user}/deactivate'
*/
deactivateForm.post = (args: { user: string | number } | [user: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: deactivate.url(args, options),
    method: 'post',
})

deactivate.form = deactivateForm

/**
* @see \Yuan\AdminCore\Modules\Users\Http\Controllers\UsersController::resetPassword
* @see vendor/yuanmaharsyah/admin-core/modules/Users/Http/Controllers/UsersController.php:120
* @route '/admin/users/{user}/reset-password'
*/
export const resetPassword = (args: { user: string | number } | [user: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: resetPassword.url(args, options),
    method: 'post',
})

resetPassword.definition = {
    methods: ["post"],
    url: '/admin/users/{user}/reset-password',
} satisfies RouteDefinition<["post"]>

/**
* @see \Yuan\AdminCore\Modules\Users\Http\Controllers\UsersController::resetPassword
* @see vendor/yuanmaharsyah/admin-core/modules/Users/Http/Controllers/UsersController.php:120
* @route '/admin/users/{user}/reset-password'
*/
resetPassword.url = (args: { user: string | number } | [user: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return resetPassword.definition.url
            .replace('{user}', parsedArgs.user.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Yuan\AdminCore\Modules\Users\Http\Controllers\UsersController::resetPassword
* @see vendor/yuanmaharsyah/admin-core/modules/Users/Http/Controllers/UsersController.php:120
* @route '/admin/users/{user}/reset-password'
*/
resetPassword.post = (args: { user: string | number } | [user: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: resetPassword.url(args, options),
    method: 'post',
})

/**
* @see \Yuan\AdminCore\Modules\Users\Http\Controllers\UsersController::resetPassword
* @see vendor/yuanmaharsyah/admin-core/modules/Users/Http/Controllers/UsersController.php:120
* @route '/admin/users/{user}/reset-password'
*/
const resetPasswordForm = (args: { user: string | number } | [user: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: resetPassword.url(args, options),
    method: 'post',
})

/**
* @see \Yuan\AdminCore\Modules\Users\Http\Controllers\UsersController::resetPassword
* @see vendor/yuanmaharsyah/admin-core/modules/Users/Http/Controllers/UsersController.php:120
* @route '/admin/users/{user}/reset-password'
*/
resetPasswordForm.post = (args: { user: string | number } | [user: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: resetPassword.url(args, options),
    method: 'post',
})

resetPassword.form = resetPasswordForm

/**
* @see \Yuan\AdminCore\Modules\Users\Http\Controllers\UsersController::destroy
* @see vendor/yuanmaharsyah/admin-core/modules/Users/Http/Controllers/UsersController.php:136
* @route '/admin/users/{user}'
*/
export const destroy = (args: { user: string | number } | [user: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/users/{user}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Yuan\AdminCore\Modules\Users\Http\Controllers\UsersController::destroy
* @see vendor/yuanmaharsyah/admin-core/modules/Users/Http/Controllers/UsersController.php:136
* @route '/admin/users/{user}'
*/
destroy.url = (args: { user: string | number } | [user: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return destroy.definition.url
            .replace('{user}', parsedArgs.user.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Yuan\AdminCore\Modules\Users\Http\Controllers\UsersController::destroy
* @see vendor/yuanmaharsyah/admin-core/modules/Users/Http/Controllers/UsersController.php:136
* @route '/admin/users/{user}'
*/
destroy.delete = (args: { user: string | number } | [user: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \Yuan\AdminCore\Modules\Users\Http\Controllers\UsersController::destroy
* @see vendor/yuanmaharsyah/admin-core/modules/Users/Http/Controllers/UsersController.php:136
* @route '/admin/users/{user}'
*/
const destroyForm = (args: { user: string | number } | [user: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \Yuan\AdminCore\Modules\Users\Http\Controllers\UsersController::destroy
* @see vendor/yuanmaharsyah/admin-core/modules/Users/Http/Controllers/UsersController.php:136
* @route '/admin/users/{user}'
*/
destroyForm.delete = (args: { user: string | number } | [user: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const users = {
    trash: Object.assign(trash, trash067cdb),
    index: Object.assign(index, index),
    download: Object.assign(download, download),
    create: Object.assign(create, create),
    store: Object.assign(store, store),
    bulkDestroy: Object.assign(bulkDestroy, bulkDestroy),
    show: Object.assign(show, show),
    edit: Object.assign(edit, edit),
    update: Object.assign(update, update),
    activate: Object.assign(activate, activate),
    deactivate: Object.assign(deactivate, deactivate),
    resetPassword: Object.assign(resetPassword, resetPassword),
    destroy: Object.assign(destroy, destroy),
}

export default users