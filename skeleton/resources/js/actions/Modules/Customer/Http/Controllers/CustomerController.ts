import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \Modules\Customer\Http\Controllers\CustomerController::index
* @see modules/Customer/Http/Controllers/CustomerController.php:23
* @route '/admin/customers'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/customers',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Customer\Http\Controllers\CustomerController::index
* @see modules/Customer/Http/Controllers/CustomerController.php:23
* @route '/admin/customers'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Customer\Http\Controllers\CustomerController::index
* @see modules/Customer/Http/Controllers/CustomerController.php:23
* @route '/admin/customers'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \Modules\Customer\Http\Controllers\CustomerController::index
* @see modules/Customer/Http/Controllers/CustomerController.php:23
* @route '/admin/customers'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \Modules\Customer\Http\Controllers\CustomerController::index
* @see modules/Customer/Http/Controllers/CustomerController.php:23
* @route '/admin/customers'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \Modules\Customer\Http\Controllers\CustomerController::index
* @see modules/Customer/Http/Controllers/CustomerController.php:23
* @route '/admin/customers'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \Modules\Customer\Http\Controllers\CustomerController::index
* @see modules/Customer/Http/Controllers/CustomerController.php:23
* @route '/admin/customers'
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
* @see \Modules\Customer\Http\Controllers\CustomerController::lookup
* @see modules/Customer/Http/Controllers/CustomerController.php:34
* @route '/admin/customers/lookup'
*/
export const lookup = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: lookup.url(options),
    method: 'get',
})

lookup.definition = {
    methods: ["get","head"],
    url: '/admin/customers/lookup',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Customer\Http\Controllers\CustomerController::lookup
* @see modules/Customer/Http/Controllers/CustomerController.php:34
* @route '/admin/customers/lookup'
*/
lookup.url = (options?: RouteQueryOptions) => {
    return lookup.definition.url + queryParams(options)
}

/**
* @see \Modules\Customer\Http\Controllers\CustomerController::lookup
* @see modules/Customer/Http/Controllers/CustomerController.php:34
* @route '/admin/customers/lookup'
*/
lookup.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: lookup.url(options),
    method: 'get',
})

/**
* @see \Modules\Customer\Http\Controllers\CustomerController::lookup
* @see modules/Customer/Http/Controllers/CustomerController.php:34
* @route '/admin/customers/lookup'
*/
lookup.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: lookup.url(options),
    method: 'head',
})

/**
* @see \Modules\Customer\Http\Controllers\CustomerController::lookup
* @see modules/Customer/Http/Controllers/CustomerController.php:34
* @route '/admin/customers/lookup'
*/
const lookupForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: lookup.url(options),
    method: 'get',
})

/**
* @see \Modules\Customer\Http\Controllers\CustomerController::lookup
* @see modules/Customer/Http/Controllers/CustomerController.php:34
* @route '/admin/customers/lookup'
*/
lookupForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: lookup.url(options),
    method: 'get',
})

/**
* @see \Modules\Customer\Http\Controllers\CustomerController::lookup
* @see modules/Customer/Http/Controllers/CustomerController.php:34
* @route '/admin/customers/lookup'
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
* @see \Modules\Customer\Http\Controllers\CustomerController::bulkDestroy
* @see modules/Customer/Http/Controllers/CustomerController.php:58
* @route '/admin/customers'
*/
export const bulkDestroy = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: bulkDestroy.url(options),
    method: 'delete',
})

bulkDestroy.definition = {
    methods: ["delete"],
    url: '/admin/customers',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Customer\Http\Controllers\CustomerController::bulkDestroy
* @see modules/Customer/Http/Controllers/CustomerController.php:58
* @route '/admin/customers'
*/
bulkDestroy.url = (options?: RouteQueryOptions) => {
    return bulkDestroy.definition.url + queryParams(options)
}

/**
* @see \Modules\Customer\Http\Controllers\CustomerController::bulkDestroy
* @see modules/Customer/Http/Controllers/CustomerController.php:58
* @route '/admin/customers'
*/
bulkDestroy.delete = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: bulkDestroy.url(options),
    method: 'delete',
})

/**
* @see \Modules\Customer\Http\Controllers\CustomerController::bulkDestroy
* @see modules/Customer/Http/Controllers/CustomerController.php:58
* @route '/admin/customers'
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
* @see \Modules\Customer\Http\Controllers\CustomerController::bulkDestroy
* @see modules/Customer/Http/Controllers/CustomerController.php:58
* @route '/admin/customers'
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
* @see \Modules\Customer\Http\Controllers\CustomerController::destroy
* @see modules/Customer/Http/Controllers/CustomerController.php:48
* @route '/admin/customers/{customer}'
*/
export const destroy = (args: { customer: string | number } | [customer: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/customers/{customer}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Customer\Http\Controllers\CustomerController::destroy
* @see modules/Customer/Http/Controllers/CustomerController.php:48
* @route '/admin/customers/{customer}'
*/
destroy.url = (args: { customer: string | number } | [customer: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { customer: args }
    }

    if (Array.isArray(args)) {
        args = {
            customer: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        customer: args.customer,
    }

    return destroy.definition.url
            .replace('{customer}', parsedArgs.customer.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Customer\Http\Controllers\CustomerController::destroy
* @see modules/Customer/Http/Controllers/CustomerController.php:48
* @route '/admin/customers/{customer}'
*/
destroy.delete = (args: { customer: string | number } | [customer: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \Modules\Customer\Http\Controllers\CustomerController::destroy
* @see modules/Customer/Http/Controllers/CustomerController.php:48
* @route '/admin/customers/{customer}'
*/
const destroyForm = (args: { customer: string | number } | [customer: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \Modules\Customer\Http\Controllers\CustomerController::destroy
* @see modules/Customer/Http/Controllers/CustomerController.php:48
* @route '/admin/customers/{customer}'
*/
destroyForm.delete = (args: { customer: string | number } | [customer: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const CustomerController = { index, lookup, bulkDestroy, destroy }

export default CustomerController