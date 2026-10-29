import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \Modules\SampleReadonly\Http\Controllers\SampleReadonlyController::index
* @see modules/SampleReadonly/Http/Controllers/SampleReadonlyController.php:24
* @route '/admin/sample-readonly'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/sample-readonly',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\SampleReadonly\Http\Controllers\SampleReadonlyController::index
* @see modules/SampleReadonly/Http/Controllers/SampleReadonlyController.php:24
* @route '/admin/sample-readonly'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\SampleReadonly\Http\Controllers\SampleReadonlyController::index
* @see modules/SampleReadonly/Http/Controllers/SampleReadonlyController.php:24
* @route '/admin/sample-readonly'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \Modules\SampleReadonly\Http\Controllers\SampleReadonlyController::index
* @see modules/SampleReadonly/Http/Controllers/SampleReadonlyController.php:24
* @route '/admin/sample-readonly'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \Modules\SampleReadonly\Http\Controllers\SampleReadonlyController::index
* @see modules/SampleReadonly/Http/Controllers/SampleReadonlyController.php:24
* @route '/admin/sample-readonly'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \Modules\SampleReadonly\Http\Controllers\SampleReadonlyController::index
* @see modules/SampleReadonly/Http/Controllers/SampleReadonlyController.php:24
* @route '/admin/sample-readonly'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \Modules\SampleReadonly\Http\Controllers\SampleReadonlyController::index
* @see modules/SampleReadonly/Http/Controllers/SampleReadonlyController.php:24
* @route '/admin/sample-readonly'
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
* @see \Modules\SampleReadonly\Http\Controllers\SampleReadonlyController::lookup
* @see modules/SampleReadonly/Http/Controllers/SampleReadonlyController.php:35
* @route '/admin/sample-readonly/lookup'
*/
export const lookup = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: lookup.url(options),
    method: 'get',
})

lookup.definition = {
    methods: ["get","head"],
    url: '/admin/sample-readonly/lookup',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\SampleReadonly\Http\Controllers\SampleReadonlyController::lookup
* @see modules/SampleReadonly/Http/Controllers/SampleReadonlyController.php:35
* @route '/admin/sample-readonly/lookup'
*/
lookup.url = (options?: RouteQueryOptions) => {
    return lookup.definition.url + queryParams(options)
}

/**
* @see \Modules\SampleReadonly\Http\Controllers\SampleReadonlyController::lookup
* @see modules/SampleReadonly/Http/Controllers/SampleReadonlyController.php:35
* @route '/admin/sample-readonly/lookup'
*/
lookup.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: lookup.url(options),
    method: 'get',
})

/**
* @see \Modules\SampleReadonly\Http\Controllers\SampleReadonlyController::lookup
* @see modules/SampleReadonly/Http/Controllers/SampleReadonlyController.php:35
* @route '/admin/sample-readonly/lookup'
*/
lookup.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: lookup.url(options),
    method: 'head',
})

/**
* @see \Modules\SampleReadonly\Http\Controllers\SampleReadonlyController::lookup
* @see modules/SampleReadonly/Http/Controllers/SampleReadonlyController.php:35
* @route '/admin/sample-readonly/lookup'
*/
const lookupForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: lookup.url(options),
    method: 'get',
})

/**
* @see \Modules\SampleReadonly\Http\Controllers\SampleReadonlyController::lookup
* @see modules/SampleReadonly/Http/Controllers/SampleReadonlyController.php:35
* @route '/admin/sample-readonly/lookup'
*/
lookupForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: lookup.url(options),
    method: 'get',
})

/**
* @see \Modules\SampleReadonly\Http\Controllers\SampleReadonlyController::lookup
* @see modules/SampleReadonly/Http/Controllers/SampleReadonlyController.php:35
* @route '/admin/sample-readonly/lookup'
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
* @see \Modules\SampleReadonly\Http\Controllers\SampleReadonlyController::show
* @see modules/SampleReadonly/Http/Controllers/SampleReadonlyController.php:49
* @route '/admin/sample-readonly/{sampleReadonly}'
*/
export const show = (args: { sampleReadonly: string | number } | [sampleReadonly: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/admin/sample-readonly/{sampleReadonly}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\SampleReadonly\Http\Controllers\SampleReadonlyController::show
* @see modules/SampleReadonly/Http/Controllers/SampleReadonlyController.php:49
* @route '/admin/sample-readonly/{sampleReadonly}'
*/
show.url = (args: { sampleReadonly: string | number } | [sampleReadonly: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { sampleReadonly: args }
    }

    if (Array.isArray(args)) {
        args = {
            sampleReadonly: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        sampleReadonly: args.sampleReadonly,
    }

    return show.definition.url
            .replace('{sampleReadonly}', parsedArgs.sampleReadonly.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\SampleReadonly\Http\Controllers\SampleReadonlyController::show
* @see modules/SampleReadonly/Http/Controllers/SampleReadonlyController.php:49
* @route '/admin/sample-readonly/{sampleReadonly}'
*/
show.get = (args: { sampleReadonly: string | number } | [sampleReadonly: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \Modules\SampleReadonly\Http\Controllers\SampleReadonlyController::show
* @see modules/SampleReadonly/Http/Controllers/SampleReadonlyController.php:49
* @route '/admin/sample-readonly/{sampleReadonly}'
*/
show.head = (args: { sampleReadonly: string | number } | [sampleReadonly: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \Modules\SampleReadonly\Http\Controllers\SampleReadonlyController::show
* @see modules/SampleReadonly/Http/Controllers/SampleReadonlyController.php:49
* @route '/admin/sample-readonly/{sampleReadonly}'
*/
const showForm = (args: { sampleReadonly: string | number } | [sampleReadonly: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \Modules\SampleReadonly\Http\Controllers\SampleReadonlyController::show
* @see modules/SampleReadonly/Http/Controllers/SampleReadonlyController.php:49
* @route '/admin/sample-readonly/{sampleReadonly}'
*/
showForm.get = (args: { sampleReadonly: string | number } | [sampleReadonly: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \Modules\SampleReadonly\Http\Controllers\SampleReadonlyController::show
* @see modules/SampleReadonly/Http/Controllers/SampleReadonlyController.php:49
* @route '/admin/sample-readonly/{sampleReadonly}'
*/
showForm.head = (args: { sampleReadonly: string | number } | [sampleReadonly: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

show.form = showForm

const sampleReadonly = {
    index: Object.assign(index, index),
    lookup: Object.assign(lookup, lookup),
    show: Object.assign(show, show),
}

export default sampleReadonly