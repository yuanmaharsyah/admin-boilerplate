import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \Yuan\AdminCore\Exports\DownloadsController::index
* @see vendor/yuanmaharsyah/admin-core/src/Exports/DownloadsController.php:39
* @route '/account/downloads'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/account/downloads',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Yuan\AdminCore\Exports\DownloadsController::index
* @see vendor/yuanmaharsyah/admin-core/src/Exports/DownloadsController.php:39
* @route '/account/downloads'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Yuan\AdminCore\Exports\DownloadsController::index
* @see vendor/yuanmaharsyah/admin-core/src/Exports/DownloadsController.php:39
* @route '/account/downloads'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \Yuan\AdminCore\Exports\DownloadsController::index
* @see vendor/yuanmaharsyah/admin-core/src/Exports/DownloadsController.php:39
* @route '/account/downloads'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \Yuan\AdminCore\Exports\DownloadsController::index
* @see vendor/yuanmaharsyah/admin-core/src/Exports/DownloadsController.php:39
* @route '/account/downloads'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \Yuan\AdminCore\Exports\DownloadsController::index
* @see vendor/yuanmaharsyah/admin-core/src/Exports/DownloadsController.php:39
* @route '/account/downloads'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \Yuan\AdminCore\Exports\DownloadsController::index
* @see vendor/yuanmaharsyah/admin-core/src/Exports/DownloadsController.php:39
* @route '/account/downloads'
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
* @see \Yuan\AdminCore\Exports\DownloadsController::url
* @see vendor/yuanmaharsyah/admin-core/src/Exports/DownloadsController.php:60
* @route '/account/downloads/{export}/url'
*/
export const url = (args: { export: string | number } | [exportParam: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: url.url(args, options),
    method: 'get',
})

url.definition = {
    methods: ["get","head"],
    url: '/account/downloads/{export}/url',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Yuan\AdminCore\Exports\DownloadsController::url
* @see vendor/yuanmaharsyah/admin-core/src/Exports/DownloadsController.php:60
* @route '/account/downloads/{export}/url'
*/
url.url = (args: { export: string | number } | [exportParam: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { export: args }
    }

    if (Array.isArray(args)) {
        args = {
            export: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        export: args.export,
    }

    return url.definition.url
            .replace('{export}', parsedArgs.export.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Yuan\AdminCore\Exports\DownloadsController::url
* @see vendor/yuanmaharsyah/admin-core/src/Exports/DownloadsController.php:60
* @route '/account/downloads/{export}/url'
*/
url.get = (args: { export: string | number } | [exportParam: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: url.url(args, options),
    method: 'get',
})

/**
* @see \Yuan\AdminCore\Exports\DownloadsController::url
* @see vendor/yuanmaharsyah/admin-core/src/Exports/DownloadsController.php:60
* @route '/account/downloads/{export}/url'
*/
url.head = (args: { export: string | number } | [exportParam: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: url.url(args, options),
    method: 'head',
})

/**
* @see \Yuan\AdminCore\Exports\DownloadsController::url
* @see vendor/yuanmaharsyah/admin-core/src/Exports/DownloadsController.php:60
* @route '/account/downloads/{export}/url'
*/
const urlForm = (args: { export: string | number } | [exportParam: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: url.url(args, options),
    method: 'get',
})

/**
* @see \Yuan\AdminCore\Exports\DownloadsController::url
* @see vendor/yuanmaharsyah/admin-core/src/Exports/DownloadsController.php:60
* @route '/account/downloads/{export}/url'
*/
urlForm.get = (args: { export: string | number } | [exportParam: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: url.url(args, options),
    method: 'get',
})

/**
* @see \Yuan\AdminCore\Exports\DownloadsController::url
* @see vendor/yuanmaharsyah/admin-core/src/Exports/DownloadsController.php:60
* @route '/account/downloads/{export}/url'
*/
urlForm.head = (args: { export: string | number } | [exportParam: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: url.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

url.form = urlForm

/**
* @see \Yuan\AdminCore\Exports\DownloadsController::file
* @see vendor/yuanmaharsyah/admin-core/src/Exports/DownloadsController.php:71
* @route '/account/downloads/{export}/file'
*/
export const file = (args: { export: string | number } | [exportParam: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: file.url(args, options),
    method: 'get',
})

file.definition = {
    methods: ["get","head"],
    url: '/account/downloads/{export}/file',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Yuan\AdminCore\Exports\DownloadsController::file
* @see vendor/yuanmaharsyah/admin-core/src/Exports/DownloadsController.php:71
* @route '/account/downloads/{export}/file'
*/
file.url = (args: { export: string | number } | [exportParam: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { export: args }
    }

    if (Array.isArray(args)) {
        args = {
            export: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        export: args.export,
    }

    return file.definition.url
            .replace('{export}', parsedArgs.export.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Yuan\AdminCore\Exports\DownloadsController::file
* @see vendor/yuanmaharsyah/admin-core/src/Exports/DownloadsController.php:71
* @route '/account/downloads/{export}/file'
*/
file.get = (args: { export: string | number } | [exportParam: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: file.url(args, options),
    method: 'get',
})

/**
* @see \Yuan\AdminCore\Exports\DownloadsController::file
* @see vendor/yuanmaharsyah/admin-core/src/Exports/DownloadsController.php:71
* @route '/account/downloads/{export}/file'
*/
file.head = (args: { export: string | number } | [exportParam: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: file.url(args, options),
    method: 'head',
})

/**
* @see \Yuan\AdminCore\Exports\DownloadsController::file
* @see vendor/yuanmaharsyah/admin-core/src/Exports/DownloadsController.php:71
* @route '/account/downloads/{export}/file'
*/
const fileForm = (args: { export: string | number } | [exportParam: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: file.url(args, options),
    method: 'get',
})

/**
* @see \Yuan\AdminCore\Exports\DownloadsController::file
* @see vendor/yuanmaharsyah/admin-core/src/Exports/DownloadsController.php:71
* @route '/account/downloads/{export}/file'
*/
fileForm.get = (args: { export: string | number } | [exportParam: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: file.url(args, options),
    method: 'get',
})

/**
* @see \Yuan\AdminCore\Exports\DownloadsController::file
* @see vendor/yuanmaharsyah/admin-core/src/Exports/DownloadsController.php:71
* @route '/account/downloads/{export}/file'
*/
fileForm.head = (args: { export: string | number } | [exportParam: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: file.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

file.form = fileForm

const DownloadsController = { index, url, file }

export default DownloadsController