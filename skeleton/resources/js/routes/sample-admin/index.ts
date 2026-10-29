import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
import trash067cdb from './trash'
import attachments from './attachments'
/**
* @see \Yuan\AdminCore\Trash\TrashController::trash
* @see vendor/yuanmaharsyah/admin-core/src/Trash/TrashController.php:60
* @route '/admin/sample-admin/trash'
*/
export const trash = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: trash.url(options),
    method: 'get',
})

trash.definition = {
    methods: ["get","head"],
    url: '/admin/sample-admin/trash',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Yuan\AdminCore\Trash\TrashController::trash
* @see vendor/yuanmaharsyah/admin-core/src/Trash/TrashController.php:60
* @route '/admin/sample-admin/trash'
*/
trash.url = (options?: RouteQueryOptions) => {
    return trash.definition.url + queryParams(options)
}

/**
* @see \Yuan\AdminCore\Trash\TrashController::trash
* @see vendor/yuanmaharsyah/admin-core/src/Trash/TrashController.php:60
* @route '/admin/sample-admin/trash'
*/
trash.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: trash.url(options),
    method: 'get',
})

/**
* @see \Yuan\AdminCore\Trash\TrashController::trash
* @see vendor/yuanmaharsyah/admin-core/src/Trash/TrashController.php:60
* @route '/admin/sample-admin/trash'
*/
trash.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: trash.url(options),
    method: 'head',
})

/**
* @see \Yuan\AdminCore\Trash\TrashController::trash
* @see vendor/yuanmaharsyah/admin-core/src/Trash/TrashController.php:60
* @route '/admin/sample-admin/trash'
*/
const trashForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: trash.url(options),
    method: 'get',
})

/**
* @see \Yuan\AdminCore\Trash\TrashController::trash
* @see vendor/yuanmaharsyah/admin-core/src/Trash/TrashController.php:60
* @route '/admin/sample-admin/trash'
*/
trashForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: trash.url(options),
    method: 'get',
})

/**
* @see \Yuan\AdminCore\Trash\TrashController::trash
* @see vendor/yuanmaharsyah/admin-core/src/Trash/TrashController.php:60
* @route '/admin/sample-admin/trash'
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
* @see \Modules\SampleAdmin\Http\Controllers\SampleAdminController::index
* @see modules/SampleAdmin/Http/Controllers/SampleAdminController.php:32
* @route '/admin/sample-admin'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/sample-admin',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\SampleAdmin\Http\Controllers\SampleAdminController::index
* @see modules/SampleAdmin/Http/Controllers/SampleAdminController.php:32
* @route '/admin/sample-admin'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\SampleAdmin\Http\Controllers\SampleAdminController::index
* @see modules/SampleAdmin/Http/Controllers/SampleAdminController.php:32
* @route '/admin/sample-admin'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \Modules\SampleAdmin\Http\Controllers\SampleAdminController::index
* @see modules/SampleAdmin/Http/Controllers/SampleAdminController.php:32
* @route '/admin/sample-admin'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \Modules\SampleAdmin\Http\Controllers\SampleAdminController::index
* @see modules/SampleAdmin/Http/Controllers/SampleAdminController.php:32
* @route '/admin/sample-admin'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \Modules\SampleAdmin\Http\Controllers\SampleAdminController::index
* @see modules/SampleAdmin/Http/Controllers/SampleAdminController.php:32
* @route '/admin/sample-admin'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \Modules\SampleAdmin\Http\Controllers\SampleAdminController::index
* @see modules/SampleAdmin/Http/Controllers/SampleAdminController.php:32
* @route '/admin/sample-admin'
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
* @see \Modules\SampleAdmin\Http\Controllers\SampleAdminController::lookup
* @see modules/SampleAdmin/Http/Controllers/SampleAdminController.php:43
* @route '/admin/sample-admin/lookup'
*/
export const lookup = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: lookup.url(options),
    method: 'get',
})

lookup.definition = {
    methods: ["get","head"],
    url: '/admin/sample-admin/lookup',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\SampleAdmin\Http\Controllers\SampleAdminController::lookup
* @see modules/SampleAdmin/Http/Controllers/SampleAdminController.php:43
* @route '/admin/sample-admin/lookup'
*/
lookup.url = (options?: RouteQueryOptions) => {
    return lookup.definition.url + queryParams(options)
}

/**
* @see \Modules\SampleAdmin\Http\Controllers\SampleAdminController::lookup
* @see modules/SampleAdmin/Http/Controllers/SampleAdminController.php:43
* @route '/admin/sample-admin/lookup'
*/
lookup.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: lookup.url(options),
    method: 'get',
})

/**
* @see \Modules\SampleAdmin\Http\Controllers\SampleAdminController::lookup
* @see modules/SampleAdmin/Http/Controllers/SampleAdminController.php:43
* @route '/admin/sample-admin/lookup'
*/
lookup.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: lookup.url(options),
    method: 'head',
})

/**
* @see \Modules\SampleAdmin\Http\Controllers\SampleAdminController::lookup
* @see modules/SampleAdmin/Http/Controllers/SampleAdminController.php:43
* @route '/admin/sample-admin/lookup'
*/
const lookupForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: lookup.url(options),
    method: 'get',
})

/**
* @see \Modules\SampleAdmin\Http\Controllers\SampleAdminController::lookup
* @see modules/SampleAdmin/Http/Controllers/SampleAdminController.php:43
* @route '/admin/sample-admin/lookup'
*/
lookupForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: lookup.url(options),
    method: 'get',
})

/**
* @see \Modules\SampleAdmin\Http\Controllers\SampleAdminController::lookup
* @see modules/SampleAdmin/Http/Controllers/SampleAdminController.php:43
* @route '/admin/sample-admin/lookup'
*/
lookupForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: lookup.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

lookup.form = lookupForm

/**
* @see \Modules\SampleAdmin\Http\Controllers\SampleAdminController::create
* @see modules/SampleAdmin/Http/Controllers/SampleAdminController.php:70
* @route '/admin/sample-admin/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/admin/sample-admin/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\SampleAdmin\Http\Controllers\SampleAdminController::create
* @see modules/SampleAdmin/Http/Controllers/SampleAdminController.php:70
* @route '/admin/sample-admin/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \Modules\SampleAdmin\Http\Controllers\SampleAdminController::create
* @see modules/SampleAdmin/Http/Controllers/SampleAdminController.php:70
* @route '/admin/sample-admin/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \Modules\SampleAdmin\Http\Controllers\SampleAdminController::create
* @see modules/SampleAdmin/Http/Controllers/SampleAdminController.php:70
* @route '/admin/sample-admin/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \Modules\SampleAdmin\Http\Controllers\SampleAdminController::create
* @see modules/SampleAdmin/Http/Controllers/SampleAdminController.php:70
* @route '/admin/sample-admin/create'
*/
const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \Modules\SampleAdmin\Http\Controllers\SampleAdminController::create
* @see modules/SampleAdmin/Http/Controllers/SampleAdminController.php:70
* @route '/admin/sample-admin/create'
*/
createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \Modules\SampleAdmin\Http\Controllers\SampleAdminController::create
* @see modules/SampleAdmin/Http/Controllers/SampleAdminController.php:70
* @route '/admin/sample-admin/create'
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
* @see \Modules\SampleAdmin\Http\Controllers\SampleAdminController::store
* @see modules/SampleAdmin/Http/Controllers/SampleAdminController.php:80
* @route '/admin/sample-admin'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/sample-admin',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\SampleAdmin\Http\Controllers\SampleAdminController::store
* @see modules/SampleAdmin/Http/Controllers/SampleAdminController.php:80
* @route '/admin/sample-admin'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\SampleAdmin\Http\Controllers\SampleAdminController::store
* @see modules/SampleAdmin/Http/Controllers/SampleAdminController.php:80
* @route '/admin/sample-admin'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \Modules\SampleAdmin\Http\Controllers\SampleAdminController::store
* @see modules/SampleAdmin/Http/Controllers/SampleAdminController.php:80
* @route '/admin/sample-admin'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \Modules\SampleAdmin\Http\Controllers\SampleAdminController::store
* @see modules/SampleAdmin/Http/Controllers/SampleAdminController.php:80
* @route '/admin/sample-admin'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \Modules\SampleAdmin\Http\Controllers\SampleAdminController::bulkDestroy
* @see modules/SampleAdmin/Http/Controllers/SampleAdminController.php:130
* @route '/admin/sample-admin'
*/
export const bulkDestroy = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: bulkDestroy.url(options),
    method: 'delete',
})

bulkDestroy.definition = {
    methods: ["delete"],
    url: '/admin/sample-admin',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\SampleAdmin\Http\Controllers\SampleAdminController::bulkDestroy
* @see modules/SampleAdmin/Http/Controllers/SampleAdminController.php:130
* @route '/admin/sample-admin'
*/
bulkDestroy.url = (options?: RouteQueryOptions) => {
    return bulkDestroy.definition.url + queryParams(options)
}

/**
* @see \Modules\SampleAdmin\Http\Controllers\SampleAdminController::bulkDestroy
* @see modules/SampleAdmin/Http/Controllers/SampleAdminController.php:130
* @route '/admin/sample-admin'
*/
bulkDestroy.delete = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: bulkDestroy.url(options),
    method: 'delete',
})

/**
* @see \Modules\SampleAdmin\Http\Controllers\SampleAdminController::bulkDestroy
* @see modules/SampleAdmin/Http/Controllers/SampleAdminController.php:130
* @route '/admin/sample-admin'
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
* @see \Modules\SampleAdmin\Http\Controllers\SampleAdminController::bulkDestroy
* @see modules/SampleAdmin/Http/Controllers/SampleAdminController.php:130
* @route '/admin/sample-admin'
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
* @see \Modules\SampleAdmin\Http\Controllers\SampleAdminController::show
* @see modules/SampleAdmin/Http/Controllers/SampleAdminController.php:57
* @route '/admin/sample-admin/{sampleAdmin}'
*/
export const show = (args: { sampleAdmin: string | number } | [sampleAdmin: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/admin/sample-admin/{sampleAdmin}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\SampleAdmin\Http\Controllers\SampleAdminController::show
* @see modules/SampleAdmin/Http/Controllers/SampleAdminController.php:57
* @route '/admin/sample-admin/{sampleAdmin}'
*/
show.url = (args: { sampleAdmin: string | number } | [sampleAdmin: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { sampleAdmin: args }
    }

    if (Array.isArray(args)) {
        args = {
            sampleAdmin: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        sampleAdmin: args.sampleAdmin,
    }

    return show.definition.url
            .replace('{sampleAdmin}', parsedArgs.sampleAdmin.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\SampleAdmin\Http\Controllers\SampleAdminController::show
* @see modules/SampleAdmin/Http/Controllers/SampleAdminController.php:57
* @route '/admin/sample-admin/{sampleAdmin}'
*/
show.get = (args: { sampleAdmin: string | number } | [sampleAdmin: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \Modules\SampleAdmin\Http\Controllers\SampleAdminController::show
* @see modules/SampleAdmin/Http/Controllers/SampleAdminController.php:57
* @route '/admin/sample-admin/{sampleAdmin}'
*/
show.head = (args: { sampleAdmin: string | number } | [sampleAdmin: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \Modules\SampleAdmin\Http\Controllers\SampleAdminController::show
* @see modules/SampleAdmin/Http/Controllers/SampleAdminController.php:57
* @route '/admin/sample-admin/{sampleAdmin}'
*/
const showForm = (args: { sampleAdmin: string | number } | [sampleAdmin: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \Modules\SampleAdmin\Http\Controllers\SampleAdminController::show
* @see modules/SampleAdmin/Http/Controllers/SampleAdminController.php:57
* @route '/admin/sample-admin/{sampleAdmin}'
*/
showForm.get = (args: { sampleAdmin: string | number } | [sampleAdmin: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \Modules\SampleAdmin\Http\Controllers\SampleAdminController::show
* @see modules/SampleAdmin/Http/Controllers/SampleAdminController.php:57
* @route '/admin/sample-admin/{sampleAdmin}'
*/
showForm.head = (args: { sampleAdmin: string | number } | [sampleAdmin: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \Modules\SampleAdmin\Http\Controllers\SampleAdminController::edit
* @see modules/SampleAdmin/Http/Controllers/SampleAdminController.php:90
* @route '/admin/sample-admin/{sampleAdmin}/edit'
*/
export const edit = (args: { sampleAdmin: string | number } | [sampleAdmin: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/sample-admin/{sampleAdmin}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\SampleAdmin\Http\Controllers\SampleAdminController::edit
* @see modules/SampleAdmin/Http/Controllers/SampleAdminController.php:90
* @route '/admin/sample-admin/{sampleAdmin}/edit'
*/
edit.url = (args: { sampleAdmin: string | number } | [sampleAdmin: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { sampleAdmin: args }
    }

    if (Array.isArray(args)) {
        args = {
            sampleAdmin: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        sampleAdmin: args.sampleAdmin,
    }

    return edit.definition.url
            .replace('{sampleAdmin}', parsedArgs.sampleAdmin.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\SampleAdmin\Http\Controllers\SampleAdminController::edit
* @see modules/SampleAdmin/Http/Controllers/SampleAdminController.php:90
* @route '/admin/sample-admin/{sampleAdmin}/edit'
*/
edit.get = (args: { sampleAdmin: string | number } | [sampleAdmin: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \Modules\SampleAdmin\Http\Controllers\SampleAdminController::edit
* @see modules/SampleAdmin/Http/Controllers/SampleAdminController.php:90
* @route '/admin/sample-admin/{sampleAdmin}/edit'
*/
edit.head = (args: { sampleAdmin: string | number } | [sampleAdmin: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \Modules\SampleAdmin\Http\Controllers\SampleAdminController::edit
* @see modules/SampleAdmin/Http/Controllers/SampleAdminController.php:90
* @route '/admin/sample-admin/{sampleAdmin}/edit'
*/
const editForm = (args: { sampleAdmin: string | number } | [sampleAdmin: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \Modules\SampleAdmin\Http\Controllers\SampleAdminController::edit
* @see modules/SampleAdmin/Http/Controllers/SampleAdminController.php:90
* @route '/admin/sample-admin/{sampleAdmin}/edit'
*/
editForm.get = (args: { sampleAdmin: string | number } | [sampleAdmin: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \Modules\SampleAdmin\Http\Controllers\SampleAdminController::edit
* @see modules/SampleAdmin/Http/Controllers/SampleAdminController.php:90
* @route '/admin/sample-admin/{sampleAdmin}/edit'
*/
editForm.head = (args: { sampleAdmin: string | number } | [sampleAdmin: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \Modules\SampleAdmin\Http\Controllers\SampleAdminController::update
* @see modules/SampleAdmin/Http/Controllers/SampleAdminController.php:105
* @route '/admin/sample-admin/{sampleAdmin}'
*/
export const update = (args: { sampleAdmin: string | number } | [sampleAdmin: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/admin/sample-admin/{sampleAdmin}',
} satisfies RouteDefinition<["put"]>

/**
* @see \Modules\SampleAdmin\Http\Controllers\SampleAdminController::update
* @see modules/SampleAdmin/Http/Controllers/SampleAdminController.php:105
* @route '/admin/sample-admin/{sampleAdmin}'
*/
update.url = (args: { sampleAdmin: string | number } | [sampleAdmin: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { sampleAdmin: args }
    }

    if (Array.isArray(args)) {
        args = {
            sampleAdmin: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        sampleAdmin: args.sampleAdmin,
    }

    return update.definition.url
            .replace('{sampleAdmin}', parsedArgs.sampleAdmin.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\SampleAdmin\Http\Controllers\SampleAdminController::update
* @see modules/SampleAdmin/Http/Controllers/SampleAdminController.php:105
* @route '/admin/sample-admin/{sampleAdmin}'
*/
update.put = (args: { sampleAdmin: string | number } | [sampleAdmin: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \Modules\SampleAdmin\Http\Controllers\SampleAdminController::update
* @see modules/SampleAdmin/Http/Controllers/SampleAdminController.php:105
* @route '/admin/sample-admin/{sampleAdmin}'
*/
const updateForm = (args: { sampleAdmin: string | number } | [sampleAdmin: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \Modules\SampleAdmin\Http\Controllers\SampleAdminController::update
* @see modules/SampleAdmin/Http/Controllers/SampleAdminController.php:105
* @route '/admin/sample-admin/{sampleAdmin}'
*/
updateForm.put = (args: { sampleAdmin: string | number } | [sampleAdmin: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \Modules\SampleAdmin\Http\Controllers\SampleAdminController::destroy
* @see modules/SampleAdmin/Http/Controllers/SampleAdminController.php:120
* @route '/admin/sample-admin/{sampleAdmin}'
*/
export const destroy = (args: { sampleAdmin: string | number } | [sampleAdmin: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/sample-admin/{sampleAdmin}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\SampleAdmin\Http\Controllers\SampleAdminController::destroy
* @see modules/SampleAdmin/Http/Controllers/SampleAdminController.php:120
* @route '/admin/sample-admin/{sampleAdmin}'
*/
destroy.url = (args: { sampleAdmin: string | number } | [sampleAdmin: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { sampleAdmin: args }
    }

    if (Array.isArray(args)) {
        args = {
            sampleAdmin: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        sampleAdmin: args.sampleAdmin,
    }

    return destroy.definition.url
            .replace('{sampleAdmin}', parsedArgs.sampleAdmin.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\SampleAdmin\Http\Controllers\SampleAdminController::destroy
* @see modules/SampleAdmin/Http/Controllers/SampleAdminController.php:120
* @route '/admin/sample-admin/{sampleAdmin}'
*/
destroy.delete = (args: { sampleAdmin: string | number } | [sampleAdmin: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \Modules\SampleAdmin\Http\Controllers\SampleAdminController::destroy
* @see modules/SampleAdmin/Http/Controllers/SampleAdminController.php:120
* @route '/admin/sample-admin/{sampleAdmin}'
*/
const destroyForm = (args: { sampleAdmin: string | number } | [sampleAdmin: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \Modules\SampleAdmin\Http\Controllers\SampleAdminController::destroy
* @see modules/SampleAdmin/Http/Controllers/SampleAdminController.php:120
* @route '/admin/sample-admin/{sampleAdmin}'
*/
destroyForm.delete = (args: { sampleAdmin: string | number } | [sampleAdmin: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const sampleAdmin = {
    trash: Object.assign(trash, trash067cdb),
    attachments: Object.assign(attachments, attachments),
    index: Object.assign(index, index),
    lookup: Object.assign(lookup, lookup),
    create: Object.assign(create, create),
    store: Object.assign(store, store),
    bulkDestroy: Object.assign(bulkDestroy, bulkDestroy),
    show: Object.assign(show, show),
    edit: Object.assign(edit, edit),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
}

export default sampleAdmin