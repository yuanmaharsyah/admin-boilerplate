import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
import trash067cdb from './trash'
import attachments from './attachments'
/**
* @see \Yuan\AdminCore\Trash\TrashController::trash
* @see vendor/yuanmaharsyah/admin-core/src/Trash/TrashController.php:60
* @route '/admin/samples/trash'
*/
export const trash = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: trash.url(options),
    method: 'get',
})

trash.definition = {
    methods: ["get","head"],
    url: '/admin/samples/trash',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Yuan\AdminCore\Trash\TrashController::trash
* @see vendor/yuanmaharsyah/admin-core/src/Trash/TrashController.php:60
* @route '/admin/samples/trash'
*/
trash.url = (options?: RouteQueryOptions) => {
    return trash.definition.url + queryParams(options)
}

/**
* @see \Yuan\AdminCore\Trash\TrashController::trash
* @see vendor/yuanmaharsyah/admin-core/src/Trash/TrashController.php:60
* @route '/admin/samples/trash'
*/
trash.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: trash.url(options),
    method: 'get',
})

/**
* @see \Yuan\AdminCore\Trash\TrashController::trash
* @see vendor/yuanmaharsyah/admin-core/src/Trash/TrashController.php:60
* @route '/admin/samples/trash'
*/
trash.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: trash.url(options),
    method: 'head',
})

/**
* @see \Yuan\AdminCore\Trash\TrashController::trash
* @see vendor/yuanmaharsyah/admin-core/src/Trash/TrashController.php:60
* @route '/admin/samples/trash'
*/
const trashForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: trash.url(options),
    method: 'get',
})

/**
* @see \Yuan\AdminCore\Trash\TrashController::trash
* @see vendor/yuanmaharsyah/admin-core/src/Trash/TrashController.php:60
* @route '/admin/samples/trash'
*/
trashForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: trash.url(options),
    method: 'get',
})

/**
* @see \Yuan\AdminCore\Trash\TrashController::trash
* @see vendor/yuanmaharsyah/admin-core/src/Trash/TrashController.php:60
* @route '/admin/samples/trash'
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
* @see \Modules\Sample\Http\Controllers\SampleController::index
* @see modules/Sample/Http/Controllers/SampleController.php:36
* @route '/admin/samples'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/samples',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Sample\Http\Controllers\SampleController::index
* @see modules/Sample/Http/Controllers/SampleController.php:36
* @route '/admin/samples'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Sample\Http\Controllers\SampleController::index
* @see modules/Sample/Http/Controllers/SampleController.php:36
* @route '/admin/samples'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \Modules\Sample\Http\Controllers\SampleController::index
* @see modules/Sample/Http/Controllers/SampleController.php:36
* @route '/admin/samples'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \Modules\Sample\Http\Controllers\SampleController::index
* @see modules/Sample/Http/Controllers/SampleController.php:36
* @route '/admin/samples'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \Modules\Sample\Http\Controllers\SampleController::index
* @see modules/Sample/Http/Controllers/SampleController.php:36
* @route '/admin/samples'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \Modules\Sample\Http\Controllers\SampleController::index
* @see modules/Sample/Http/Controllers/SampleController.php:36
* @route '/admin/samples'
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
* @see \Modules\Sample\Http\Controllers\SampleController::lookup
* @see modules/Sample/Http/Controllers/SampleController.php:47
* @route '/admin/samples/lookup'
*/
export const lookup = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: lookup.url(options),
    method: 'get',
})

lookup.definition = {
    methods: ["get","head"],
    url: '/admin/samples/lookup',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Sample\Http\Controllers\SampleController::lookup
* @see modules/Sample/Http/Controllers/SampleController.php:47
* @route '/admin/samples/lookup'
*/
lookup.url = (options?: RouteQueryOptions) => {
    return lookup.definition.url + queryParams(options)
}

/**
* @see \Modules\Sample\Http\Controllers\SampleController::lookup
* @see modules/Sample/Http/Controllers/SampleController.php:47
* @route '/admin/samples/lookup'
*/
lookup.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: lookup.url(options),
    method: 'get',
})

/**
* @see \Modules\Sample\Http\Controllers\SampleController::lookup
* @see modules/Sample/Http/Controllers/SampleController.php:47
* @route '/admin/samples/lookup'
*/
lookup.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: lookup.url(options),
    method: 'head',
})

/**
* @see \Modules\Sample\Http\Controllers\SampleController::lookup
* @see modules/Sample/Http/Controllers/SampleController.php:47
* @route '/admin/samples/lookup'
*/
const lookupForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: lookup.url(options),
    method: 'get',
})

/**
* @see \Modules\Sample\Http\Controllers\SampleController::lookup
* @see modules/Sample/Http/Controllers/SampleController.php:47
* @route '/admin/samples/lookup'
*/
lookupForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: lookup.url(options),
    method: 'get',
})

/**
* @see \Modules\Sample\Http\Controllers\SampleController::lookup
* @see modules/Sample/Http/Controllers/SampleController.php:47
* @route '/admin/samples/lookup'
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
* @see \Modules\Sample\Http\Controllers\SampleController::download
* @see modules/Sample/Http/Controllers/SampleController.php:74
* @route '/admin/samples/download'
*/
export const download = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: download.url(options),
    method: 'get',
})

download.definition = {
    methods: ["get","head"],
    url: '/admin/samples/download',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Sample\Http\Controllers\SampleController::download
* @see modules/Sample/Http/Controllers/SampleController.php:74
* @route '/admin/samples/download'
*/
download.url = (options?: RouteQueryOptions) => {
    return download.definition.url + queryParams(options)
}

/**
* @see \Modules\Sample\Http\Controllers\SampleController::download
* @see modules/Sample/Http/Controllers/SampleController.php:74
* @route '/admin/samples/download'
*/
download.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: download.url(options),
    method: 'get',
})

/**
* @see \Modules\Sample\Http\Controllers\SampleController::download
* @see modules/Sample/Http/Controllers/SampleController.php:74
* @route '/admin/samples/download'
*/
download.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: download.url(options),
    method: 'head',
})

/**
* @see \Modules\Sample\Http\Controllers\SampleController::download
* @see modules/Sample/Http/Controllers/SampleController.php:74
* @route '/admin/samples/download'
*/
const downloadForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: download.url(options),
    method: 'get',
})

/**
* @see \Modules\Sample\Http\Controllers\SampleController::download
* @see modules/Sample/Http/Controllers/SampleController.php:74
* @route '/admin/samples/download'
*/
downloadForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: download.url(options),
    method: 'get',
})

/**
* @see \Modules\Sample\Http\Controllers\SampleController::download
* @see modules/Sample/Http/Controllers/SampleController.php:74
* @route '/admin/samples/download'
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
* @see \Modules\Sample\Http\Controllers\SampleController::create
* @see modules/Sample/Http/Controllers/SampleController.php:81
* @route '/admin/samples/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/admin/samples/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Sample\Http\Controllers\SampleController::create
* @see modules/Sample/Http/Controllers/SampleController.php:81
* @route '/admin/samples/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \Modules\Sample\Http\Controllers\SampleController::create
* @see modules/Sample/Http/Controllers/SampleController.php:81
* @route '/admin/samples/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \Modules\Sample\Http\Controllers\SampleController::create
* @see modules/Sample/Http/Controllers/SampleController.php:81
* @route '/admin/samples/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \Modules\Sample\Http\Controllers\SampleController::create
* @see modules/Sample/Http/Controllers/SampleController.php:81
* @route '/admin/samples/create'
*/
const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \Modules\Sample\Http\Controllers\SampleController::create
* @see modules/Sample/Http/Controllers/SampleController.php:81
* @route '/admin/samples/create'
*/
createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \Modules\Sample\Http\Controllers\SampleController::create
* @see modules/Sample/Http/Controllers/SampleController.php:81
* @route '/admin/samples/create'
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
* @see \Modules\Sample\Http\Controllers\SampleController::store
* @see modules/Sample/Http/Controllers/SampleController.php:92
* @route '/admin/samples'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/samples',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Sample\Http\Controllers\SampleController::store
* @see modules/Sample/Http/Controllers/SampleController.php:92
* @route '/admin/samples'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\Sample\Http\Controllers\SampleController::store
* @see modules/Sample/Http/Controllers/SampleController.php:92
* @route '/admin/samples'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \Modules\Sample\Http\Controllers\SampleController::store
* @see modules/Sample/Http/Controllers/SampleController.php:92
* @route '/admin/samples'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \Modules\Sample\Http\Controllers\SampleController::store
* @see modules/Sample/Http/Controllers/SampleController.php:92
* @route '/admin/samples'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \Modules\Sample\Http\Controllers\SampleController::bulkDestroy
* @see modules/Sample/Http/Controllers/SampleController.php:143
* @route '/admin/samples'
*/
export const bulkDestroy = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: bulkDestroy.url(options),
    method: 'delete',
})

bulkDestroy.definition = {
    methods: ["delete"],
    url: '/admin/samples',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Sample\Http\Controllers\SampleController::bulkDestroy
* @see modules/Sample/Http/Controllers/SampleController.php:143
* @route '/admin/samples'
*/
bulkDestroy.url = (options?: RouteQueryOptions) => {
    return bulkDestroy.definition.url + queryParams(options)
}

/**
* @see \Modules\Sample\Http\Controllers\SampleController::bulkDestroy
* @see modules/Sample/Http/Controllers/SampleController.php:143
* @route '/admin/samples'
*/
bulkDestroy.delete = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: bulkDestroy.url(options),
    method: 'delete',
})

/**
* @see \Modules\Sample\Http\Controllers\SampleController::bulkDestroy
* @see modules/Sample/Http/Controllers/SampleController.php:143
* @route '/admin/samples'
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
* @see \Modules\Sample\Http\Controllers\SampleController::bulkDestroy
* @see modules/Sample/Http/Controllers/SampleController.php:143
* @route '/admin/samples'
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
* @see \Modules\Sample\Http\Controllers\SampleController::show
* @see modules/Sample/Http/Controllers/SampleController.php:61
* @route '/admin/samples/{sample}'
*/
export const show = (args: { sample: string | number } | [sample: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/admin/samples/{sample}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Sample\Http\Controllers\SampleController::show
* @see modules/Sample/Http/Controllers/SampleController.php:61
* @route '/admin/samples/{sample}'
*/
show.url = (args: { sample: string | number } | [sample: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { sample: args }
    }

    if (Array.isArray(args)) {
        args = {
            sample: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        sample: args.sample,
    }

    return show.definition.url
            .replace('{sample}', parsedArgs.sample.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Sample\Http\Controllers\SampleController::show
* @see modules/Sample/Http/Controllers/SampleController.php:61
* @route '/admin/samples/{sample}'
*/
show.get = (args: { sample: string | number } | [sample: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Sample\Http\Controllers\SampleController::show
* @see modules/Sample/Http/Controllers/SampleController.php:61
* @route '/admin/samples/{sample}'
*/
show.head = (args: { sample: string | number } | [sample: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \Modules\Sample\Http\Controllers\SampleController::show
* @see modules/Sample/Http/Controllers/SampleController.php:61
* @route '/admin/samples/{sample}'
*/
const showForm = (args: { sample: string | number } | [sample: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Sample\Http\Controllers\SampleController::show
* @see modules/Sample/Http/Controllers/SampleController.php:61
* @route '/admin/samples/{sample}'
*/
showForm.get = (args: { sample: string | number } | [sample: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Sample\Http\Controllers\SampleController::show
* @see modules/Sample/Http/Controllers/SampleController.php:61
* @route '/admin/samples/{sample}'
*/
showForm.head = (args: { sample: string | number } | [sample: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \Modules\Sample\Http\Controllers\SampleController::edit
* @see modules/Sample/Http/Controllers/SampleController.php:102
* @route '/admin/samples/{sample}/edit'
*/
export const edit = (args: { sample: string | number } | [sample: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/samples/{sample}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Sample\Http\Controllers\SampleController::edit
* @see modules/Sample/Http/Controllers/SampleController.php:102
* @route '/admin/samples/{sample}/edit'
*/
edit.url = (args: { sample: string | number } | [sample: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { sample: args }
    }

    if (Array.isArray(args)) {
        args = {
            sample: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        sample: args.sample,
    }

    return edit.definition.url
            .replace('{sample}', parsedArgs.sample.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Sample\Http\Controllers\SampleController::edit
* @see modules/Sample/Http/Controllers/SampleController.php:102
* @route '/admin/samples/{sample}/edit'
*/
edit.get = (args: { sample: string | number } | [sample: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Sample\Http\Controllers\SampleController::edit
* @see modules/Sample/Http/Controllers/SampleController.php:102
* @route '/admin/samples/{sample}/edit'
*/
edit.head = (args: { sample: string | number } | [sample: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \Modules\Sample\Http\Controllers\SampleController::edit
* @see modules/Sample/Http/Controllers/SampleController.php:102
* @route '/admin/samples/{sample}/edit'
*/
const editForm = (args: { sample: string | number } | [sample: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Sample\Http\Controllers\SampleController::edit
* @see modules/Sample/Http/Controllers/SampleController.php:102
* @route '/admin/samples/{sample}/edit'
*/
editForm.get = (args: { sample: string | number } | [sample: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Sample\Http\Controllers\SampleController::edit
* @see modules/Sample/Http/Controllers/SampleController.php:102
* @route '/admin/samples/{sample}/edit'
*/
editForm.head = (args: { sample: string | number } | [sample: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \Modules\Sample\Http\Controllers\SampleController::update
* @see modules/Sample/Http/Controllers/SampleController.php:118
* @route '/admin/samples/{sample}'
*/
export const update = (args: { sample: string | number } | [sample: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/admin/samples/{sample}',
} satisfies RouteDefinition<["put"]>

/**
* @see \Modules\Sample\Http\Controllers\SampleController::update
* @see modules/Sample/Http/Controllers/SampleController.php:118
* @route '/admin/samples/{sample}'
*/
update.url = (args: { sample: string | number } | [sample: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { sample: args }
    }

    if (Array.isArray(args)) {
        args = {
            sample: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        sample: args.sample,
    }

    return update.definition.url
            .replace('{sample}', parsedArgs.sample.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Sample\Http\Controllers\SampleController::update
* @see modules/Sample/Http/Controllers/SampleController.php:118
* @route '/admin/samples/{sample}'
*/
update.put = (args: { sample: string | number } | [sample: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \Modules\Sample\Http\Controllers\SampleController::update
* @see modules/Sample/Http/Controllers/SampleController.php:118
* @route '/admin/samples/{sample}'
*/
const updateForm = (args: { sample: string | number } | [sample: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \Modules\Sample\Http\Controllers\SampleController::update
* @see modules/Sample/Http/Controllers/SampleController.php:118
* @route '/admin/samples/{sample}'
*/
updateForm.put = (args: { sample: string | number } | [sample: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \Modules\Sample\Http\Controllers\SampleController::destroy
* @see modules/Sample/Http/Controllers/SampleController.php:133
* @route '/admin/samples/{sample}'
*/
export const destroy = (args: { sample: string | number } | [sample: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/samples/{sample}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Sample\Http\Controllers\SampleController::destroy
* @see modules/Sample/Http/Controllers/SampleController.php:133
* @route '/admin/samples/{sample}'
*/
destroy.url = (args: { sample: string | number } | [sample: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { sample: args }
    }

    if (Array.isArray(args)) {
        args = {
            sample: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        sample: args.sample,
    }

    return destroy.definition.url
            .replace('{sample}', parsedArgs.sample.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Sample\Http\Controllers\SampleController::destroy
* @see modules/Sample/Http/Controllers/SampleController.php:133
* @route '/admin/samples/{sample}'
*/
destroy.delete = (args: { sample: string | number } | [sample: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \Modules\Sample\Http\Controllers\SampleController::destroy
* @see modules/Sample/Http/Controllers/SampleController.php:133
* @route '/admin/samples/{sample}'
*/
const destroyForm = (args: { sample: string | number } | [sample: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \Modules\Sample\Http\Controllers\SampleController::destroy
* @see modules/Sample/Http/Controllers/SampleController.php:133
* @route '/admin/samples/{sample}'
*/
destroyForm.delete = (args: { sample: string | number } | [sample: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const samples = {
    trash: Object.assign(trash, trash067cdb),
    attachments: Object.assign(attachments, attachments),
    index: Object.assign(index, index),
    lookup: Object.assign(lookup, lookup),
    download: Object.assign(download, download),
    create: Object.assign(create, create),
    store: Object.assign(store, store),
    bulkDestroy: Object.assign(bulkDestroy, bulkDestroy),
    show: Object.assign(show, show),
    edit: Object.assign(edit, edit),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
}

export default samples