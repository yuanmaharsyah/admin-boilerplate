import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
/**
* @see \Yuan\AdminCore\Modules\AuditLog\Http\Controllers\AuditLogController::index
* @see vendor/yuanmaharsyah/admin-core/modules/AuditLog/Http/Controllers/AuditLogController.php:41
* @route '/admin/audit-log'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/audit-log',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Yuan\AdminCore\Modules\AuditLog\Http\Controllers\AuditLogController::index
* @see vendor/yuanmaharsyah/admin-core/modules/AuditLog/Http/Controllers/AuditLogController.php:41
* @route '/admin/audit-log'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Yuan\AdminCore\Modules\AuditLog\Http\Controllers\AuditLogController::index
* @see vendor/yuanmaharsyah/admin-core/modules/AuditLog/Http/Controllers/AuditLogController.php:41
* @route '/admin/audit-log'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \Yuan\AdminCore\Modules\AuditLog\Http\Controllers\AuditLogController::index
* @see vendor/yuanmaharsyah/admin-core/modules/AuditLog/Http/Controllers/AuditLogController.php:41
* @route '/admin/audit-log'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \Yuan\AdminCore\Modules\AuditLog\Http\Controllers\AuditLogController::index
* @see vendor/yuanmaharsyah/admin-core/modules/AuditLog/Http/Controllers/AuditLogController.php:41
* @route '/admin/audit-log'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \Yuan\AdminCore\Modules\AuditLog\Http\Controllers\AuditLogController::index
* @see vendor/yuanmaharsyah/admin-core/modules/AuditLog/Http/Controllers/AuditLogController.php:41
* @route '/admin/audit-log'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \Yuan\AdminCore\Modules\AuditLog\Http\Controllers\AuditLogController::index
* @see vendor/yuanmaharsyah/admin-core/modules/AuditLog/Http/Controllers/AuditLogController.php:41
* @route '/admin/audit-log'
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
* @see \Yuan\AdminCore\Modules\AuditLog\Http\Controllers\AuditLogController::download
* @see vendor/yuanmaharsyah/admin-core/modules/AuditLog/Http/Controllers/AuditLogController.php:79
* @route '/admin/audit-log/download'
*/
export const download = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: download.url(options),
    method: 'get',
})

download.definition = {
    methods: ["get","head"],
    url: '/admin/audit-log/download',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Yuan\AdminCore\Modules\AuditLog\Http\Controllers\AuditLogController::download
* @see vendor/yuanmaharsyah/admin-core/modules/AuditLog/Http/Controllers/AuditLogController.php:79
* @route '/admin/audit-log/download'
*/
download.url = (options?: RouteQueryOptions) => {
    return download.definition.url + queryParams(options)
}

/**
* @see \Yuan\AdminCore\Modules\AuditLog\Http\Controllers\AuditLogController::download
* @see vendor/yuanmaharsyah/admin-core/modules/AuditLog/Http/Controllers/AuditLogController.php:79
* @route '/admin/audit-log/download'
*/
download.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: download.url(options),
    method: 'get',
})

/**
* @see \Yuan\AdminCore\Modules\AuditLog\Http\Controllers\AuditLogController::download
* @see vendor/yuanmaharsyah/admin-core/modules/AuditLog/Http/Controllers/AuditLogController.php:79
* @route '/admin/audit-log/download'
*/
download.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: download.url(options),
    method: 'head',
})

/**
* @see \Yuan\AdminCore\Modules\AuditLog\Http\Controllers\AuditLogController::download
* @see vendor/yuanmaharsyah/admin-core/modules/AuditLog/Http/Controllers/AuditLogController.php:79
* @route '/admin/audit-log/download'
*/
const downloadForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: download.url(options),
    method: 'get',
})

/**
* @see \Yuan\AdminCore\Modules\AuditLog\Http\Controllers\AuditLogController::download
* @see vendor/yuanmaharsyah/admin-core/modules/AuditLog/Http/Controllers/AuditLogController.php:79
* @route '/admin/audit-log/download'
*/
downloadForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: download.url(options),
    method: 'get',
})

/**
* @see \Yuan\AdminCore\Modules\AuditLog\Http\Controllers\AuditLogController::download
* @see vendor/yuanmaharsyah/admin-core/modules/AuditLog/Http/Controllers/AuditLogController.php:79
* @route '/admin/audit-log/download'
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

const auditLog = {
    index: Object.assign(index, index),
    download: Object.assign(download, download),
}

export default auditLog