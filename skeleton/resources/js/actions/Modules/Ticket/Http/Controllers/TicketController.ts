import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \Modules\Ticket\Http\Controllers\TicketController::index
* @see modules/Ticket/Http/Controllers/TicketController.php:33
* @route '/admin/tickets'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/tickets',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::index
* @see modules/Ticket/Http/Controllers/TicketController.php:33
* @route '/admin/tickets'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::index
* @see modules/Ticket/Http/Controllers/TicketController.php:33
* @route '/admin/tickets'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::index
* @see modules/Ticket/Http/Controllers/TicketController.php:33
* @route '/admin/tickets'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::index
* @see modules/Ticket/Http/Controllers/TicketController.php:33
* @route '/admin/tickets'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::index
* @see modules/Ticket/Http/Controllers/TicketController.php:33
* @route '/admin/tickets'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::index
* @see modules/Ticket/Http/Controllers/TicketController.php:33
* @route '/admin/tickets'
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
* @see \Modules\Ticket\Http\Controllers\TicketController::lookup
* @see modules/Ticket/Http/Controllers/TicketController.php:64
* @route '/admin/tickets/lookup'
*/
export const lookup = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: lookup.url(options),
    method: 'get',
})

lookup.definition = {
    methods: ["get","head"],
    url: '/admin/tickets/lookup',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::lookup
* @see modules/Ticket/Http/Controllers/TicketController.php:64
* @route '/admin/tickets/lookup'
*/
lookup.url = (options?: RouteQueryOptions) => {
    return lookup.definition.url + queryParams(options)
}

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::lookup
* @see modules/Ticket/Http/Controllers/TicketController.php:64
* @route '/admin/tickets/lookup'
*/
lookup.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: lookup.url(options),
    method: 'get',
})

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::lookup
* @see modules/Ticket/Http/Controllers/TicketController.php:64
* @route '/admin/tickets/lookup'
*/
lookup.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: lookup.url(options),
    method: 'head',
})

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::lookup
* @see modules/Ticket/Http/Controllers/TicketController.php:64
* @route '/admin/tickets/lookup'
*/
const lookupForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: lookup.url(options),
    method: 'get',
})

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::lookup
* @see modules/Ticket/Http/Controllers/TicketController.php:64
* @route '/admin/tickets/lookup'
*/
lookupForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: lookup.url(options),
    method: 'get',
})

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::lookup
* @see modules/Ticket/Http/Controllers/TicketController.php:64
* @route '/admin/tickets/lookup'
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
* @see \Modules\Ticket\Http\Controllers\TicketController::create
* @see modules/Ticket/Http/Controllers/TicketController.php:90
* @route '/admin/tickets/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/admin/tickets/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::create
* @see modules/Ticket/Http/Controllers/TicketController.php:90
* @route '/admin/tickets/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::create
* @see modules/Ticket/Http/Controllers/TicketController.php:90
* @route '/admin/tickets/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::create
* @see modules/Ticket/Http/Controllers/TicketController.php:90
* @route '/admin/tickets/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::create
* @see modules/Ticket/Http/Controllers/TicketController.php:90
* @route '/admin/tickets/create'
*/
const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::create
* @see modules/Ticket/Http/Controllers/TicketController.php:90
* @route '/admin/tickets/create'
*/
createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::create
* @see modules/Ticket/Http/Controllers/TicketController.php:90
* @route '/admin/tickets/create'
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
* @see \Modules\Ticket\Http\Controllers\TicketController::store
* @see modules/Ticket/Http/Controllers/TicketController.php:100
* @route '/admin/tickets'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/tickets',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::store
* @see modules/Ticket/Http/Controllers/TicketController.php:100
* @route '/admin/tickets'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::store
* @see modules/Ticket/Http/Controllers/TicketController.php:100
* @route '/admin/tickets'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::store
* @see modules/Ticket/Http/Controllers/TicketController.php:100
* @route '/admin/tickets'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::store
* @see modules/Ticket/Http/Controllers/TicketController.php:100
* @route '/admin/tickets'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::bulkDestroy
* @see modules/Ticket/Http/Controllers/TicketController.php:146
* @route '/admin/tickets'
*/
export const bulkDestroy = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: bulkDestroy.url(options),
    method: 'delete',
})

bulkDestroy.definition = {
    methods: ["delete"],
    url: '/admin/tickets',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::bulkDestroy
* @see modules/Ticket/Http/Controllers/TicketController.php:146
* @route '/admin/tickets'
*/
bulkDestroy.url = (options?: RouteQueryOptions) => {
    return bulkDestroy.definition.url + queryParams(options)
}

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::bulkDestroy
* @see modules/Ticket/Http/Controllers/TicketController.php:146
* @route '/admin/tickets'
*/
bulkDestroy.delete = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: bulkDestroy.url(options),
    method: 'delete',
})

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::bulkDestroy
* @see modules/Ticket/Http/Controllers/TicketController.php:146
* @route '/admin/tickets'
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
* @see \Modules\Ticket\Http\Controllers\TicketController::bulkDestroy
* @see modules/Ticket/Http/Controllers/TicketController.php:146
* @route '/admin/tickets'
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
* @see \Modules\Ticket\Http\Controllers\TicketController::show
* @see modules/Ticket/Http/Controllers/TicketController.php:78
* @route '/admin/tickets/{ticket}'
*/
export const show = (args: { ticket: string | number } | [ticket: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/admin/tickets/{ticket}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::show
* @see modules/Ticket/Http/Controllers/TicketController.php:78
* @route '/admin/tickets/{ticket}'
*/
show.url = (args: { ticket: string | number } | [ticket: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { ticket: args }
    }

    if (Array.isArray(args)) {
        args = {
            ticket: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        ticket: args.ticket,
    }

    return show.definition.url
            .replace('{ticket}', parsedArgs.ticket.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::show
* @see modules/Ticket/Http/Controllers/TicketController.php:78
* @route '/admin/tickets/{ticket}'
*/
show.get = (args: { ticket: string | number } | [ticket: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::show
* @see modules/Ticket/Http/Controllers/TicketController.php:78
* @route '/admin/tickets/{ticket}'
*/
show.head = (args: { ticket: string | number } | [ticket: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::show
* @see modules/Ticket/Http/Controllers/TicketController.php:78
* @route '/admin/tickets/{ticket}'
*/
const showForm = (args: { ticket: string | number } | [ticket: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::show
* @see modules/Ticket/Http/Controllers/TicketController.php:78
* @route '/admin/tickets/{ticket}'
*/
showForm.get = (args: { ticket: string | number } | [ticket: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::show
* @see modules/Ticket/Http/Controllers/TicketController.php:78
* @route '/admin/tickets/{ticket}'
*/
showForm.head = (args: { ticket: string | number } | [ticket: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \Modules\Ticket\Http\Controllers\TicketController::edit
* @see modules/Ticket/Http/Controllers/TicketController.php:110
* @route '/admin/tickets/{ticket}/edit'
*/
export const edit = (args: { ticket: string | number } | [ticket: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/tickets/{ticket}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::edit
* @see modules/Ticket/Http/Controllers/TicketController.php:110
* @route '/admin/tickets/{ticket}/edit'
*/
edit.url = (args: { ticket: string | number } | [ticket: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { ticket: args }
    }

    if (Array.isArray(args)) {
        args = {
            ticket: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        ticket: args.ticket,
    }

    return edit.definition.url
            .replace('{ticket}', parsedArgs.ticket.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::edit
* @see modules/Ticket/Http/Controllers/TicketController.php:110
* @route '/admin/tickets/{ticket}/edit'
*/
edit.get = (args: { ticket: string | number } | [ticket: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::edit
* @see modules/Ticket/Http/Controllers/TicketController.php:110
* @route '/admin/tickets/{ticket}/edit'
*/
edit.head = (args: { ticket: string | number } | [ticket: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::edit
* @see modules/Ticket/Http/Controllers/TicketController.php:110
* @route '/admin/tickets/{ticket}/edit'
*/
const editForm = (args: { ticket: string | number } | [ticket: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::edit
* @see modules/Ticket/Http/Controllers/TicketController.php:110
* @route '/admin/tickets/{ticket}/edit'
*/
editForm.get = (args: { ticket: string | number } | [ticket: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::edit
* @see modules/Ticket/Http/Controllers/TicketController.php:110
* @route '/admin/tickets/{ticket}/edit'
*/
editForm.head = (args: { ticket: string | number } | [ticket: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \Modules\Ticket\Http\Controllers\TicketController::update
* @see modules/Ticket/Http/Controllers/TicketController.php:125
* @route '/admin/tickets/{ticket}'
*/
export const update = (args: { ticket: string | number } | [ticket: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/admin/tickets/{ticket}',
} satisfies RouteDefinition<["put"]>

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::update
* @see modules/Ticket/Http/Controllers/TicketController.php:125
* @route '/admin/tickets/{ticket}'
*/
update.url = (args: { ticket: string | number } | [ticket: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { ticket: args }
    }

    if (Array.isArray(args)) {
        args = {
            ticket: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        ticket: args.ticket,
    }

    return update.definition.url
            .replace('{ticket}', parsedArgs.ticket.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::update
* @see modules/Ticket/Http/Controllers/TicketController.php:125
* @route '/admin/tickets/{ticket}'
*/
update.put = (args: { ticket: string | number } | [ticket: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::update
* @see modules/Ticket/Http/Controllers/TicketController.php:125
* @route '/admin/tickets/{ticket}'
*/
const updateForm = (args: { ticket: string | number } | [ticket: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::update
* @see modules/Ticket/Http/Controllers/TicketController.php:125
* @route '/admin/tickets/{ticket}'
*/
updateForm.put = (args: { ticket: string | number } | [ticket: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \Modules\Ticket\Http\Controllers\TicketController::destroy
* @see modules/Ticket/Http/Controllers/TicketController.php:136
* @route '/admin/tickets/{ticket}'
*/
export const destroy = (args: { ticket: string | number } | [ticket: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/tickets/{ticket}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::destroy
* @see modules/Ticket/Http/Controllers/TicketController.php:136
* @route '/admin/tickets/{ticket}'
*/
destroy.url = (args: { ticket: string | number } | [ticket: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { ticket: args }
    }

    if (Array.isArray(args)) {
        args = {
            ticket: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        ticket: args.ticket,
    }

    return destroy.definition.url
            .replace('{ticket}', parsedArgs.ticket.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::destroy
* @see modules/Ticket/Http/Controllers/TicketController.php:136
* @route '/admin/tickets/{ticket}'
*/
destroy.delete = (args: { ticket: string | number } | [ticket: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::destroy
* @see modules/Ticket/Http/Controllers/TicketController.php:136
* @route '/admin/tickets/{ticket}'
*/
const destroyForm = (args: { ticket: string | number } | [ticket: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::destroy
* @see modules/Ticket/Http/Controllers/TicketController.php:136
* @route '/admin/tickets/{ticket}'
*/
destroyForm.delete = (args: { ticket: string | number } | [ticket: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const TicketController = { index, lookup, create, store, bulkDestroy, show, edit, update, destroy }

export default TicketController