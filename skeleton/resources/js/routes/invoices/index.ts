import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
import trash067cdb from './trash'
import attachments from './attachments'
/**
* @see \Yuan\AdminCore\Trash\TrashController::trash
* @see vendor/yuanmaharsyah/admin-core/src/Trash/TrashController.php:60
* @route '/admin/invoices/trash'
*/
export const trash = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: trash.url(options),
    method: 'get',
})

trash.definition = {
    methods: ["get","head"],
    url: '/admin/invoices/trash',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Yuan\AdminCore\Trash\TrashController::trash
* @see vendor/yuanmaharsyah/admin-core/src/Trash/TrashController.php:60
* @route '/admin/invoices/trash'
*/
trash.url = (options?: RouteQueryOptions) => {
    return trash.definition.url + queryParams(options)
}

/**
* @see \Yuan\AdminCore\Trash\TrashController::trash
* @see vendor/yuanmaharsyah/admin-core/src/Trash/TrashController.php:60
* @route '/admin/invoices/trash'
*/
trash.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: trash.url(options),
    method: 'get',
})

/**
* @see \Yuan\AdminCore\Trash\TrashController::trash
* @see vendor/yuanmaharsyah/admin-core/src/Trash/TrashController.php:60
* @route '/admin/invoices/trash'
*/
trash.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: trash.url(options),
    method: 'head',
})

/**
* @see \Yuan\AdminCore\Trash\TrashController::trash
* @see vendor/yuanmaharsyah/admin-core/src/Trash/TrashController.php:60
* @route '/admin/invoices/trash'
*/
const trashForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: trash.url(options),
    method: 'get',
})

/**
* @see \Yuan\AdminCore\Trash\TrashController::trash
* @see vendor/yuanmaharsyah/admin-core/src/Trash/TrashController.php:60
* @route '/admin/invoices/trash'
*/
trashForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: trash.url(options),
    method: 'get',
})

/**
* @see \Yuan\AdminCore\Trash\TrashController::trash
* @see vendor/yuanmaharsyah/admin-core/src/Trash/TrashController.php:60
* @route '/admin/invoices/trash'
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
* @see \Modules\Invoice\Http\Controllers\InvoiceController::index
* @see modules/Invoice/Http/Controllers/InvoiceController.php:33
* @route '/admin/invoices'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/invoices',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Invoice\Http\Controllers\InvoiceController::index
* @see modules/Invoice/Http/Controllers/InvoiceController.php:33
* @route '/admin/invoices'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Invoice\Http\Controllers\InvoiceController::index
* @see modules/Invoice/Http/Controllers/InvoiceController.php:33
* @route '/admin/invoices'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \Modules\Invoice\Http\Controllers\InvoiceController::index
* @see modules/Invoice/Http/Controllers/InvoiceController.php:33
* @route '/admin/invoices'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \Modules\Invoice\Http\Controllers\InvoiceController::index
* @see modules/Invoice/Http/Controllers/InvoiceController.php:33
* @route '/admin/invoices'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \Modules\Invoice\Http\Controllers\InvoiceController::index
* @see modules/Invoice/Http/Controllers/InvoiceController.php:33
* @route '/admin/invoices'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \Modules\Invoice\Http\Controllers\InvoiceController::index
* @see modules/Invoice/Http/Controllers/InvoiceController.php:33
* @route '/admin/invoices'
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
* @see \Modules\Invoice\Http\Controllers\InvoiceController::download
* @see modules/Invoice/Http/Controllers/InvoiceController.php:43
* @route '/admin/invoices/download'
*/
export const download = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: download.url(options),
    method: 'get',
})

download.definition = {
    methods: ["get","head"],
    url: '/admin/invoices/download',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Invoice\Http\Controllers\InvoiceController::download
* @see modules/Invoice/Http/Controllers/InvoiceController.php:43
* @route '/admin/invoices/download'
*/
download.url = (options?: RouteQueryOptions) => {
    return download.definition.url + queryParams(options)
}

/**
* @see \Modules\Invoice\Http\Controllers\InvoiceController::download
* @see modules/Invoice/Http/Controllers/InvoiceController.php:43
* @route '/admin/invoices/download'
*/
download.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: download.url(options),
    method: 'get',
})

/**
* @see \Modules\Invoice\Http\Controllers\InvoiceController::download
* @see modules/Invoice/Http/Controllers/InvoiceController.php:43
* @route '/admin/invoices/download'
*/
download.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: download.url(options),
    method: 'head',
})

/**
* @see \Modules\Invoice\Http\Controllers\InvoiceController::download
* @see modules/Invoice/Http/Controllers/InvoiceController.php:43
* @route '/admin/invoices/download'
*/
const downloadForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: download.url(options),
    method: 'get',
})

/**
* @see \Modules\Invoice\Http\Controllers\InvoiceController::download
* @see modules/Invoice/Http/Controllers/InvoiceController.php:43
* @route '/admin/invoices/download'
*/
downloadForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: download.url(options),
    method: 'get',
})

/**
* @see \Modules\Invoice\Http\Controllers\InvoiceController::download
* @see modules/Invoice/Http/Controllers/InvoiceController.php:43
* @route '/admin/invoices/download'
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
* @see \Modules\Invoice\Http\Controllers\InvoiceController::create
* @see modules/Invoice/Http/Controllers/InvoiceController.php:50
* @route '/admin/invoices/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/admin/invoices/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Invoice\Http\Controllers\InvoiceController::create
* @see modules/Invoice/Http/Controllers/InvoiceController.php:50
* @route '/admin/invoices/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \Modules\Invoice\Http\Controllers\InvoiceController::create
* @see modules/Invoice/Http/Controllers/InvoiceController.php:50
* @route '/admin/invoices/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \Modules\Invoice\Http\Controllers\InvoiceController::create
* @see modules/Invoice/Http/Controllers/InvoiceController.php:50
* @route '/admin/invoices/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \Modules\Invoice\Http\Controllers\InvoiceController::create
* @see modules/Invoice/Http/Controllers/InvoiceController.php:50
* @route '/admin/invoices/create'
*/
const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \Modules\Invoice\Http\Controllers\InvoiceController::create
* @see modules/Invoice/Http/Controllers/InvoiceController.php:50
* @route '/admin/invoices/create'
*/
createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \Modules\Invoice\Http\Controllers\InvoiceController::create
* @see modules/Invoice/Http/Controllers/InvoiceController.php:50
* @route '/admin/invoices/create'
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
* @see \Modules\Invoice\Http\Controllers\InvoiceController::store
* @see modules/Invoice/Http/Controllers/InvoiceController.php:61
* @route '/admin/invoices'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/invoices',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Invoice\Http\Controllers\InvoiceController::store
* @see modules/Invoice/Http/Controllers/InvoiceController.php:61
* @route '/admin/invoices'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\Invoice\Http\Controllers\InvoiceController::store
* @see modules/Invoice/Http/Controllers/InvoiceController.php:61
* @route '/admin/invoices'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \Modules\Invoice\Http\Controllers\InvoiceController::store
* @see modules/Invoice/Http/Controllers/InvoiceController.php:61
* @route '/admin/invoices'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \Modules\Invoice\Http\Controllers\InvoiceController::store
* @see modules/Invoice/Http/Controllers/InvoiceController.php:61
* @route '/admin/invoices'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \Modules\Invoice\Http\Controllers\InvoiceController::bulkDestroy
* @see modules/Invoice/Http/Controllers/InvoiceController.php:125
* @route '/admin/invoices'
*/
export const bulkDestroy = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: bulkDestroy.url(options),
    method: 'delete',
})

bulkDestroy.definition = {
    methods: ["delete"],
    url: '/admin/invoices',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Invoice\Http\Controllers\InvoiceController::bulkDestroy
* @see modules/Invoice/Http/Controllers/InvoiceController.php:125
* @route '/admin/invoices'
*/
bulkDestroy.url = (options?: RouteQueryOptions) => {
    return bulkDestroy.definition.url + queryParams(options)
}

/**
* @see \Modules\Invoice\Http\Controllers\InvoiceController::bulkDestroy
* @see modules/Invoice/Http/Controllers/InvoiceController.php:125
* @route '/admin/invoices'
*/
bulkDestroy.delete = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: bulkDestroy.url(options),
    method: 'delete',
})

/**
* @see \Modules\Invoice\Http\Controllers\InvoiceController::bulkDestroy
* @see modules/Invoice/Http/Controllers/InvoiceController.php:125
* @route '/admin/invoices'
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
* @see \Modules\Invoice\Http\Controllers\InvoiceController::bulkDestroy
* @see modules/Invoice/Http/Controllers/InvoiceController.php:125
* @route '/admin/invoices'
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
* @see \Modules\Invoice\Http\Controllers\InvoiceController::show
* @see modules/Invoice/Http/Controllers/InvoiceController.php:71
* @route '/admin/invoices/{invoice}'
*/
export const show = (args: { invoice: string | number } | [invoice: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/admin/invoices/{invoice}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Invoice\Http\Controllers\InvoiceController::show
* @see modules/Invoice/Http/Controllers/InvoiceController.php:71
* @route '/admin/invoices/{invoice}'
*/
show.url = (args: { invoice: string | number } | [invoice: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { invoice: args }
    }

    if (Array.isArray(args)) {
        args = {
            invoice: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        invoice: args.invoice,
    }

    return show.definition.url
            .replace('{invoice}', parsedArgs.invoice.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Invoice\Http\Controllers\InvoiceController::show
* @see modules/Invoice/Http/Controllers/InvoiceController.php:71
* @route '/admin/invoices/{invoice}'
*/
show.get = (args: { invoice: string | number } | [invoice: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Invoice\Http\Controllers\InvoiceController::show
* @see modules/Invoice/Http/Controllers/InvoiceController.php:71
* @route '/admin/invoices/{invoice}'
*/
show.head = (args: { invoice: string | number } | [invoice: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \Modules\Invoice\Http\Controllers\InvoiceController::show
* @see modules/Invoice/Http/Controllers/InvoiceController.php:71
* @route '/admin/invoices/{invoice}'
*/
const showForm = (args: { invoice: string | number } | [invoice: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Invoice\Http\Controllers\InvoiceController::show
* @see modules/Invoice/Http/Controllers/InvoiceController.php:71
* @route '/admin/invoices/{invoice}'
*/
showForm.get = (args: { invoice: string | number } | [invoice: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Invoice\Http\Controllers\InvoiceController::show
* @see modules/Invoice/Http/Controllers/InvoiceController.php:71
* @route '/admin/invoices/{invoice}'
*/
showForm.head = (args: { invoice: string | number } | [invoice: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \Modules\Invoice\Http\Controllers\InvoiceController::edit
* @see modules/Invoice/Http/Controllers/InvoiceController.php:84
* @route '/admin/invoices/{invoice}/edit'
*/
export const edit = (args: { invoice: string | number } | [invoice: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/invoices/{invoice}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Invoice\Http\Controllers\InvoiceController::edit
* @see modules/Invoice/Http/Controllers/InvoiceController.php:84
* @route '/admin/invoices/{invoice}/edit'
*/
edit.url = (args: { invoice: string | number } | [invoice: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { invoice: args }
    }

    if (Array.isArray(args)) {
        args = {
            invoice: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        invoice: args.invoice,
    }

    return edit.definition.url
            .replace('{invoice}', parsedArgs.invoice.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Invoice\Http\Controllers\InvoiceController::edit
* @see modules/Invoice/Http/Controllers/InvoiceController.php:84
* @route '/admin/invoices/{invoice}/edit'
*/
edit.get = (args: { invoice: string | number } | [invoice: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Invoice\Http\Controllers\InvoiceController::edit
* @see modules/Invoice/Http/Controllers/InvoiceController.php:84
* @route '/admin/invoices/{invoice}/edit'
*/
edit.head = (args: { invoice: string | number } | [invoice: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \Modules\Invoice\Http\Controllers\InvoiceController::edit
* @see modules/Invoice/Http/Controllers/InvoiceController.php:84
* @route '/admin/invoices/{invoice}/edit'
*/
const editForm = (args: { invoice: string | number } | [invoice: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Invoice\Http\Controllers\InvoiceController::edit
* @see modules/Invoice/Http/Controllers/InvoiceController.php:84
* @route '/admin/invoices/{invoice}/edit'
*/
editForm.get = (args: { invoice: string | number } | [invoice: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Invoice\Http\Controllers\InvoiceController::edit
* @see modules/Invoice/Http/Controllers/InvoiceController.php:84
* @route '/admin/invoices/{invoice}/edit'
*/
editForm.head = (args: { invoice: string | number } | [invoice: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \Modules\Invoice\Http\Controllers\InvoiceController::update
* @see modules/Invoice/Http/Controllers/InvoiceController.php:100
* @route '/admin/invoices/{invoice}'
*/
export const update = (args: { invoice: string | number } | [invoice: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/admin/invoices/{invoice}',
} satisfies RouteDefinition<["put"]>

/**
* @see \Modules\Invoice\Http\Controllers\InvoiceController::update
* @see modules/Invoice/Http/Controllers/InvoiceController.php:100
* @route '/admin/invoices/{invoice}'
*/
update.url = (args: { invoice: string | number } | [invoice: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { invoice: args }
    }

    if (Array.isArray(args)) {
        args = {
            invoice: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        invoice: args.invoice,
    }

    return update.definition.url
            .replace('{invoice}', parsedArgs.invoice.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Invoice\Http\Controllers\InvoiceController::update
* @see modules/Invoice/Http/Controllers/InvoiceController.php:100
* @route '/admin/invoices/{invoice}'
*/
update.put = (args: { invoice: string | number } | [invoice: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \Modules\Invoice\Http\Controllers\InvoiceController::update
* @see modules/Invoice/Http/Controllers/InvoiceController.php:100
* @route '/admin/invoices/{invoice}'
*/
const updateForm = (args: { invoice: string | number } | [invoice: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \Modules\Invoice\Http\Controllers\InvoiceController::update
* @see modules/Invoice/Http/Controllers/InvoiceController.php:100
* @route '/admin/invoices/{invoice}'
*/
updateForm.put = (args: { invoice: string | number } | [invoice: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \Modules\Invoice\Http\Controllers\InvoiceController::destroy
* @see modules/Invoice/Http/Controllers/InvoiceController.php:115
* @route '/admin/invoices/{invoice}'
*/
export const destroy = (args: { invoice: string | number } | [invoice: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/invoices/{invoice}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Invoice\Http\Controllers\InvoiceController::destroy
* @see modules/Invoice/Http/Controllers/InvoiceController.php:115
* @route '/admin/invoices/{invoice}'
*/
destroy.url = (args: { invoice: string | number } | [invoice: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { invoice: args }
    }

    if (Array.isArray(args)) {
        args = {
            invoice: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        invoice: args.invoice,
    }

    return destroy.definition.url
            .replace('{invoice}', parsedArgs.invoice.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Invoice\Http\Controllers\InvoiceController::destroy
* @see modules/Invoice/Http/Controllers/InvoiceController.php:115
* @route '/admin/invoices/{invoice}'
*/
destroy.delete = (args: { invoice: string | number } | [invoice: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \Modules\Invoice\Http\Controllers\InvoiceController::destroy
* @see modules/Invoice/Http/Controllers/InvoiceController.php:115
* @route '/admin/invoices/{invoice}'
*/
const destroyForm = (args: { invoice: string | number } | [invoice: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \Modules\Invoice\Http\Controllers\InvoiceController::destroy
* @see modules/Invoice/Http/Controllers/InvoiceController.php:115
* @route '/admin/invoices/{invoice}'
*/
destroyForm.delete = (args: { invoice: string | number } | [invoice: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const invoices = {
    trash: Object.assign(trash, trash067cdb),
    attachments: Object.assign(attachments, attachments),
    index: Object.assign(index, index),
    download: Object.assign(download, download),
    create: Object.assign(create, create),
    store: Object.assign(store, store),
    bulkDestroy: Object.assign(bulkDestroy, bulkDestroy),
    show: Object.assign(show, show),
    edit: Object.assign(edit, edit),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
}

export default invoices