import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \Yuan\AdminCore\Attachments\AttachmentController::url
* @see vendor/yuanmaharsyah/admin-core/src/Attachments/AttachmentController.php:93
* @route '/admin/invoices/attachments/{attachment}/url'
*/
export const url = (args: { attachment: string | number } | [attachment: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: url.url(args, options),
    method: 'get',
})

url.definition = {
    methods: ["get","head"],
    url: '/admin/invoices/attachments/{attachment}/url',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Yuan\AdminCore\Attachments\AttachmentController::url
* @see vendor/yuanmaharsyah/admin-core/src/Attachments/AttachmentController.php:93
* @route '/admin/invoices/attachments/{attachment}/url'
*/
url.url = (args: { attachment: string | number } | [attachment: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { attachment: args }
    }

    if (Array.isArray(args)) {
        args = {
            attachment: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        attachment: args.attachment,
    }

    return url.definition.url
            .replace('{attachment}', parsedArgs.attachment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Yuan\AdminCore\Attachments\AttachmentController::url
* @see vendor/yuanmaharsyah/admin-core/src/Attachments/AttachmentController.php:93
* @route '/admin/invoices/attachments/{attachment}/url'
*/
url.get = (args: { attachment: string | number } | [attachment: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: url.url(args, options),
    method: 'get',
})

/**
* @see \Yuan\AdminCore\Attachments\AttachmentController::url
* @see vendor/yuanmaharsyah/admin-core/src/Attachments/AttachmentController.php:93
* @route '/admin/invoices/attachments/{attachment}/url'
*/
url.head = (args: { attachment: string | number } | [attachment: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: url.url(args, options),
    method: 'head',
})

/**
* @see \Yuan\AdminCore\Attachments\AttachmentController::url
* @see vendor/yuanmaharsyah/admin-core/src/Attachments/AttachmentController.php:93
* @route '/admin/invoices/attachments/{attachment}/url'
*/
const urlForm = (args: { attachment: string | number } | [attachment: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: url.url(args, options),
    method: 'get',
})

/**
* @see \Yuan\AdminCore\Attachments\AttachmentController::url
* @see vendor/yuanmaharsyah/admin-core/src/Attachments/AttachmentController.php:93
* @route '/admin/invoices/attachments/{attachment}/url'
*/
urlForm.get = (args: { attachment: string | number } | [attachment: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: url.url(args, options),
    method: 'get',
})

/**
* @see \Yuan\AdminCore\Attachments\AttachmentController::url
* @see vendor/yuanmaharsyah/admin-core/src/Attachments/AttachmentController.php:93
* @route '/admin/invoices/attachments/{attachment}/url'
*/
urlForm.head = (args: { attachment: string | number } | [attachment: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \Yuan\AdminCore\Attachments\AttachmentController::download
* @see vendor/yuanmaharsyah/admin-core/src/Attachments/AttachmentController.php:107
* @route '/admin/invoices/attachments/{attachment}/download'
*/
export const download = (args: { attachment: string | number } | [attachment: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: download.url(args, options),
    method: 'get',
})

download.definition = {
    methods: ["get","head"],
    url: '/admin/invoices/attachments/{attachment}/download',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Yuan\AdminCore\Attachments\AttachmentController::download
* @see vendor/yuanmaharsyah/admin-core/src/Attachments/AttachmentController.php:107
* @route '/admin/invoices/attachments/{attachment}/download'
*/
download.url = (args: { attachment: string | number } | [attachment: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { attachment: args }
    }

    if (Array.isArray(args)) {
        args = {
            attachment: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        attachment: args.attachment,
    }

    return download.definition.url
            .replace('{attachment}', parsedArgs.attachment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Yuan\AdminCore\Attachments\AttachmentController::download
* @see vendor/yuanmaharsyah/admin-core/src/Attachments/AttachmentController.php:107
* @route '/admin/invoices/attachments/{attachment}/download'
*/
download.get = (args: { attachment: string | number } | [attachment: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: download.url(args, options),
    method: 'get',
})

/**
* @see \Yuan\AdminCore\Attachments\AttachmentController::download
* @see vendor/yuanmaharsyah/admin-core/src/Attachments/AttachmentController.php:107
* @route '/admin/invoices/attachments/{attachment}/download'
*/
download.head = (args: { attachment: string | number } | [attachment: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: download.url(args, options),
    method: 'head',
})

/**
* @see \Yuan\AdminCore\Attachments\AttachmentController::download
* @see vendor/yuanmaharsyah/admin-core/src/Attachments/AttachmentController.php:107
* @route '/admin/invoices/attachments/{attachment}/download'
*/
const downloadForm = (args: { attachment: string | number } | [attachment: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: download.url(args, options),
    method: 'get',
})

/**
* @see \Yuan\AdminCore\Attachments\AttachmentController::download
* @see vendor/yuanmaharsyah/admin-core/src/Attachments/AttachmentController.php:107
* @route '/admin/invoices/attachments/{attachment}/download'
*/
downloadForm.get = (args: { attachment: string | number } | [attachment: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: download.url(args, options),
    method: 'get',
})

/**
* @see \Yuan\AdminCore\Attachments\AttachmentController::download
* @see vendor/yuanmaharsyah/admin-core/src/Attachments/AttachmentController.php:107
* @route '/admin/invoices/attachments/{attachment}/download'
*/
downloadForm.head = (args: { attachment: string | number } | [attachment: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: download.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

download.form = downloadForm

/**
* @see \Yuan\AdminCore\Attachments\AttachmentController::destroy
* @see vendor/yuanmaharsyah/admin-core/src/Attachments/AttachmentController.php:118
* @route '/admin/invoices/attachments/{attachment}'
*/
export const destroy = (args: { attachment: string | number } | [attachment: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/invoices/attachments/{attachment}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Yuan\AdminCore\Attachments\AttachmentController::destroy
* @see vendor/yuanmaharsyah/admin-core/src/Attachments/AttachmentController.php:118
* @route '/admin/invoices/attachments/{attachment}'
*/
destroy.url = (args: { attachment: string | number } | [attachment: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { attachment: args }
    }

    if (Array.isArray(args)) {
        args = {
            attachment: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        attachment: args.attachment,
    }

    return destroy.definition.url
            .replace('{attachment}', parsedArgs.attachment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Yuan\AdminCore\Attachments\AttachmentController::destroy
* @see vendor/yuanmaharsyah/admin-core/src/Attachments/AttachmentController.php:118
* @route '/admin/invoices/attachments/{attachment}'
*/
destroy.delete = (args: { attachment: string | number } | [attachment: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \Yuan\AdminCore\Attachments\AttachmentController::destroy
* @see vendor/yuanmaharsyah/admin-core/src/Attachments/AttachmentController.php:118
* @route '/admin/invoices/attachments/{attachment}'
*/
const destroyForm = (args: { attachment: string | number } | [attachment: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \Yuan\AdminCore\Attachments\AttachmentController::destroy
* @see vendor/yuanmaharsyah/admin-core/src/Attachments/AttachmentController.php:118
* @route '/admin/invoices/attachments/{attachment}'
*/
destroyForm.delete = (args: { attachment: string | number } | [attachment: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const attachments = {
    url: Object.assign(url, url),
    download: Object.assign(download, download),
    destroy: Object.assign(destroy, destroy),
}

export default attachments