import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \Yuan\AdminCore\Attachments\AttachmentController::url
* @see vendor/yuanmaharsyah/admin-core/src/Attachments/AttachmentController.php:93
* @route '/admin/invoices/attachments/{attachment}/url'
*/
const url9a5d8ac86ab05bef1b19fe42c3fcc8de = (args: { attachment: string | number } | [attachment: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: url9a5d8ac86ab05bef1b19fe42c3fcc8de.url(args, options),
    method: 'get',
})

url9a5d8ac86ab05bef1b19fe42c3fcc8de.definition = {
    methods: ["get","head"],
    url: '/admin/invoices/attachments/{attachment}/url',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Yuan\AdminCore\Attachments\AttachmentController::url
* @see vendor/yuanmaharsyah/admin-core/src/Attachments/AttachmentController.php:93
* @route '/admin/invoices/attachments/{attachment}/url'
*/
url9a5d8ac86ab05bef1b19fe42c3fcc8de.url = (args: { attachment: string | number } | [attachment: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return url9a5d8ac86ab05bef1b19fe42c3fcc8de.definition.url
            .replace('{attachment}', parsedArgs.attachment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Yuan\AdminCore\Attachments\AttachmentController::url
* @see vendor/yuanmaharsyah/admin-core/src/Attachments/AttachmentController.php:93
* @route '/admin/invoices/attachments/{attachment}/url'
*/
url9a5d8ac86ab05bef1b19fe42c3fcc8de.get = (args: { attachment: string | number } | [attachment: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: url9a5d8ac86ab05bef1b19fe42c3fcc8de.url(args, options),
    method: 'get',
})

/**
* @see \Yuan\AdminCore\Attachments\AttachmentController::url
* @see vendor/yuanmaharsyah/admin-core/src/Attachments/AttachmentController.php:93
* @route '/admin/invoices/attachments/{attachment}/url'
*/
url9a5d8ac86ab05bef1b19fe42c3fcc8de.head = (args: { attachment: string | number } | [attachment: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: url9a5d8ac86ab05bef1b19fe42c3fcc8de.url(args, options),
    method: 'head',
})

/**
* @see \Yuan\AdminCore\Attachments\AttachmentController::url
* @see vendor/yuanmaharsyah/admin-core/src/Attachments/AttachmentController.php:93
* @route '/admin/invoices/attachments/{attachment}/url'
*/
const url9a5d8ac86ab05bef1b19fe42c3fcc8deForm = (args: { attachment: string | number } | [attachment: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: url9a5d8ac86ab05bef1b19fe42c3fcc8de.url(args, options),
    method: 'get',
})

/**
* @see \Yuan\AdminCore\Attachments\AttachmentController::url
* @see vendor/yuanmaharsyah/admin-core/src/Attachments/AttachmentController.php:93
* @route '/admin/invoices/attachments/{attachment}/url'
*/
url9a5d8ac86ab05bef1b19fe42c3fcc8deForm.get = (args: { attachment: string | number } | [attachment: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: url9a5d8ac86ab05bef1b19fe42c3fcc8de.url(args, options),
    method: 'get',
})

/**
* @see \Yuan\AdminCore\Attachments\AttachmentController::url
* @see vendor/yuanmaharsyah/admin-core/src/Attachments/AttachmentController.php:93
* @route '/admin/invoices/attachments/{attachment}/url'
*/
url9a5d8ac86ab05bef1b19fe42c3fcc8deForm.head = (args: { attachment: string | number } | [attachment: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: url9a5d8ac86ab05bef1b19fe42c3fcc8de.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

url9a5d8ac86ab05bef1b19fe42c3fcc8de.form = url9a5d8ac86ab05bef1b19fe42c3fcc8deForm
/**
* @see \Yuan\AdminCore\Attachments\AttachmentController::url
* @see vendor/yuanmaharsyah/admin-core/src/Attachments/AttachmentController.php:93
* @route '/admin/samples/attachments/{attachment}/url'
*/
const url4e2d915bf2faac30246aba7f9b85c524 = (args: { attachment: string | number } | [attachment: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: url4e2d915bf2faac30246aba7f9b85c524.url(args, options),
    method: 'get',
})

url4e2d915bf2faac30246aba7f9b85c524.definition = {
    methods: ["get","head"],
    url: '/admin/samples/attachments/{attachment}/url',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Yuan\AdminCore\Attachments\AttachmentController::url
* @see vendor/yuanmaharsyah/admin-core/src/Attachments/AttachmentController.php:93
* @route '/admin/samples/attachments/{attachment}/url'
*/
url4e2d915bf2faac30246aba7f9b85c524.url = (args: { attachment: string | number } | [attachment: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return url4e2d915bf2faac30246aba7f9b85c524.definition.url
            .replace('{attachment}', parsedArgs.attachment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Yuan\AdminCore\Attachments\AttachmentController::url
* @see vendor/yuanmaharsyah/admin-core/src/Attachments/AttachmentController.php:93
* @route '/admin/samples/attachments/{attachment}/url'
*/
url4e2d915bf2faac30246aba7f9b85c524.get = (args: { attachment: string | number } | [attachment: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: url4e2d915bf2faac30246aba7f9b85c524.url(args, options),
    method: 'get',
})

/**
* @see \Yuan\AdminCore\Attachments\AttachmentController::url
* @see vendor/yuanmaharsyah/admin-core/src/Attachments/AttachmentController.php:93
* @route '/admin/samples/attachments/{attachment}/url'
*/
url4e2d915bf2faac30246aba7f9b85c524.head = (args: { attachment: string | number } | [attachment: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: url4e2d915bf2faac30246aba7f9b85c524.url(args, options),
    method: 'head',
})

/**
* @see \Yuan\AdminCore\Attachments\AttachmentController::url
* @see vendor/yuanmaharsyah/admin-core/src/Attachments/AttachmentController.php:93
* @route '/admin/samples/attachments/{attachment}/url'
*/
const url4e2d915bf2faac30246aba7f9b85c524Form = (args: { attachment: string | number } | [attachment: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: url4e2d915bf2faac30246aba7f9b85c524.url(args, options),
    method: 'get',
})

/**
* @see \Yuan\AdminCore\Attachments\AttachmentController::url
* @see vendor/yuanmaharsyah/admin-core/src/Attachments/AttachmentController.php:93
* @route '/admin/samples/attachments/{attachment}/url'
*/
url4e2d915bf2faac30246aba7f9b85c524Form.get = (args: { attachment: string | number } | [attachment: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: url4e2d915bf2faac30246aba7f9b85c524.url(args, options),
    method: 'get',
})

/**
* @see \Yuan\AdminCore\Attachments\AttachmentController::url
* @see vendor/yuanmaharsyah/admin-core/src/Attachments/AttachmentController.php:93
* @route '/admin/samples/attachments/{attachment}/url'
*/
url4e2d915bf2faac30246aba7f9b85c524Form.head = (args: { attachment: string | number } | [attachment: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: url4e2d915bf2faac30246aba7f9b85c524.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

url4e2d915bf2faac30246aba7f9b85c524.form = url4e2d915bf2faac30246aba7f9b85c524Form
/**
* @see \Yuan\AdminCore\Attachments\AttachmentController::url
* @see vendor/yuanmaharsyah/admin-core/src/Attachments/AttachmentController.php:93
* @route '/admin/sample-admin/attachments/{attachment}/url'
*/
const url318d4813359cbc057ca0938687e19f7c = (args: { attachment: string | number } | [attachment: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: url318d4813359cbc057ca0938687e19f7c.url(args, options),
    method: 'get',
})

url318d4813359cbc057ca0938687e19f7c.definition = {
    methods: ["get","head"],
    url: '/admin/sample-admin/attachments/{attachment}/url',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Yuan\AdminCore\Attachments\AttachmentController::url
* @see vendor/yuanmaharsyah/admin-core/src/Attachments/AttachmentController.php:93
* @route '/admin/sample-admin/attachments/{attachment}/url'
*/
url318d4813359cbc057ca0938687e19f7c.url = (args: { attachment: string | number } | [attachment: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return url318d4813359cbc057ca0938687e19f7c.definition.url
            .replace('{attachment}', parsedArgs.attachment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Yuan\AdminCore\Attachments\AttachmentController::url
* @see vendor/yuanmaharsyah/admin-core/src/Attachments/AttachmentController.php:93
* @route '/admin/sample-admin/attachments/{attachment}/url'
*/
url318d4813359cbc057ca0938687e19f7c.get = (args: { attachment: string | number } | [attachment: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: url318d4813359cbc057ca0938687e19f7c.url(args, options),
    method: 'get',
})

/**
* @see \Yuan\AdminCore\Attachments\AttachmentController::url
* @see vendor/yuanmaharsyah/admin-core/src/Attachments/AttachmentController.php:93
* @route '/admin/sample-admin/attachments/{attachment}/url'
*/
url318d4813359cbc057ca0938687e19f7c.head = (args: { attachment: string | number } | [attachment: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: url318d4813359cbc057ca0938687e19f7c.url(args, options),
    method: 'head',
})

/**
* @see \Yuan\AdminCore\Attachments\AttachmentController::url
* @see vendor/yuanmaharsyah/admin-core/src/Attachments/AttachmentController.php:93
* @route '/admin/sample-admin/attachments/{attachment}/url'
*/
const url318d4813359cbc057ca0938687e19f7cForm = (args: { attachment: string | number } | [attachment: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: url318d4813359cbc057ca0938687e19f7c.url(args, options),
    method: 'get',
})

/**
* @see \Yuan\AdminCore\Attachments\AttachmentController::url
* @see vendor/yuanmaharsyah/admin-core/src/Attachments/AttachmentController.php:93
* @route '/admin/sample-admin/attachments/{attachment}/url'
*/
url318d4813359cbc057ca0938687e19f7cForm.get = (args: { attachment: string | number } | [attachment: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: url318d4813359cbc057ca0938687e19f7c.url(args, options),
    method: 'get',
})

/**
* @see \Yuan\AdminCore\Attachments\AttachmentController::url
* @see vendor/yuanmaharsyah/admin-core/src/Attachments/AttachmentController.php:93
* @route '/admin/sample-admin/attachments/{attachment}/url'
*/
url318d4813359cbc057ca0938687e19f7cForm.head = (args: { attachment: string | number } | [attachment: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: url318d4813359cbc057ca0938687e19f7c.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

url318d4813359cbc057ca0938687e19f7c.form = url318d4813359cbc057ca0938687e19f7cForm

/**
* Multiple routes resolve to \Yuan\AdminCore\Attachments\AttachmentController::url, so this export is a
* dictionary keyed by URI rather than a callable, with the verbs prefixed where two routes share a URI.
* Call a specific route with `url['<key>'](...)`, or import the route by name from your
* generated `routes/` directory.
*/
export const url = {
    '/admin/invoices/attachments/{attachment}/url': url9a5d8ac86ab05bef1b19fe42c3fcc8de,
    '/admin/samples/attachments/{attachment}/url': url4e2d915bf2faac30246aba7f9b85c524,
    '/admin/sample-admin/attachments/{attachment}/url': url318d4813359cbc057ca0938687e19f7c,
}

/**
* @see \Yuan\AdminCore\Attachments\AttachmentController::download
* @see vendor/yuanmaharsyah/admin-core/src/Attachments/AttachmentController.php:107
* @route '/admin/invoices/attachments/{attachment}/download'
*/
const downloada1b3b669d6af5ab1f75cc037b2297577 = (args: { attachment: string | number } | [attachment: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: downloada1b3b669d6af5ab1f75cc037b2297577.url(args, options),
    method: 'get',
})

downloada1b3b669d6af5ab1f75cc037b2297577.definition = {
    methods: ["get","head"],
    url: '/admin/invoices/attachments/{attachment}/download',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Yuan\AdminCore\Attachments\AttachmentController::download
* @see vendor/yuanmaharsyah/admin-core/src/Attachments/AttachmentController.php:107
* @route '/admin/invoices/attachments/{attachment}/download'
*/
downloada1b3b669d6af5ab1f75cc037b2297577.url = (args: { attachment: string | number } | [attachment: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return downloada1b3b669d6af5ab1f75cc037b2297577.definition.url
            .replace('{attachment}', parsedArgs.attachment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Yuan\AdminCore\Attachments\AttachmentController::download
* @see vendor/yuanmaharsyah/admin-core/src/Attachments/AttachmentController.php:107
* @route '/admin/invoices/attachments/{attachment}/download'
*/
downloada1b3b669d6af5ab1f75cc037b2297577.get = (args: { attachment: string | number } | [attachment: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: downloada1b3b669d6af5ab1f75cc037b2297577.url(args, options),
    method: 'get',
})

/**
* @see \Yuan\AdminCore\Attachments\AttachmentController::download
* @see vendor/yuanmaharsyah/admin-core/src/Attachments/AttachmentController.php:107
* @route '/admin/invoices/attachments/{attachment}/download'
*/
downloada1b3b669d6af5ab1f75cc037b2297577.head = (args: { attachment: string | number } | [attachment: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: downloada1b3b669d6af5ab1f75cc037b2297577.url(args, options),
    method: 'head',
})

/**
* @see \Yuan\AdminCore\Attachments\AttachmentController::download
* @see vendor/yuanmaharsyah/admin-core/src/Attachments/AttachmentController.php:107
* @route '/admin/invoices/attachments/{attachment}/download'
*/
const downloada1b3b669d6af5ab1f75cc037b2297577Form = (args: { attachment: string | number } | [attachment: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: downloada1b3b669d6af5ab1f75cc037b2297577.url(args, options),
    method: 'get',
})

/**
* @see \Yuan\AdminCore\Attachments\AttachmentController::download
* @see vendor/yuanmaharsyah/admin-core/src/Attachments/AttachmentController.php:107
* @route '/admin/invoices/attachments/{attachment}/download'
*/
downloada1b3b669d6af5ab1f75cc037b2297577Form.get = (args: { attachment: string | number } | [attachment: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: downloada1b3b669d6af5ab1f75cc037b2297577.url(args, options),
    method: 'get',
})

/**
* @see \Yuan\AdminCore\Attachments\AttachmentController::download
* @see vendor/yuanmaharsyah/admin-core/src/Attachments/AttachmentController.php:107
* @route '/admin/invoices/attachments/{attachment}/download'
*/
downloada1b3b669d6af5ab1f75cc037b2297577Form.head = (args: { attachment: string | number } | [attachment: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: downloada1b3b669d6af5ab1f75cc037b2297577.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

downloada1b3b669d6af5ab1f75cc037b2297577.form = downloada1b3b669d6af5ab1f75cc037b2297577Form
/**
* @see \Yuan\AdminCore\Attachments\AttachmentController::download
* @see vendor/yuanmaharsyah/admin-core/src/Attachments/AttachmentController.php:107
* @route '/admin/samples/attachments/{attachment}/download'
*/
const downloadd59f5b879a0e2a1b9944133c0244f099 = (args: { attachment: string | number } | [attachment: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: downloadd59f5b879a0e2a1b9944133c0244f099.url(args, options),
    method: 'get',
})

downloadd59f5b879a0e2a1b9944133c0244f099.definition = {
    methods: ["get","head"],
    url: '/admin/samples/attachments/{attachment}/download',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Yuan\AdminCore\Attachments\AttachmentController::download
* @see vendor/yuanmaharsyah/admin-core/src/Attachments/AttachmentController.php:107
* @route '/admin/samples/attachments/{attachment}/download'
*/
downloadd59f5b879a0e2a1b9944133c0244f099.url = (args: { attachment: string | number } | [attachment: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return downloadd59f5b879a0e2a1b9944133c0244f099.definition.url
            .replace('{attachment}', parsedArgs.attachment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Yuan\AdminCore\Attachments\AttachmentController::download
* @see vendor/yuanmaharsyah/admin-core/src/Attachments/AttachmentController.php:107
* @route '/admin/samples/attachments/{attachment}/download'
*/
downloadd59f5b879a0e2a1b9944133c0244f099.get = (args: { attachment: string | number } | [attachment: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: downloadd59f5b879a0e2a1b9944133c0244f099.url(args, options),
    method: 'get',
})

/**
* @see \Yuan\AdminCore\Attachments\AttachmentController::download
* @see vendor/yuanmaharsyah/admin-core/src/Attachments/AttachmentController.php:107
* @route '/admin/samples/attachments/{attachment}/download'
*/
downloadd59f5b879a0e2a1b9944133c0244f099.head = (args: { attachment: string | number } | [attachment: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: downloadd59f5b879a0e2a1b9944133c0244f099.url(args, options),
    method: 'head',
})

/**
* @see \Yuan\AdminCore\Attachments\AttachmentController::download
* @see vendor/yuanmaharsyah/admin-core/src/Attachments/AttachmentController.php:107
* @route '/admin/samples/attachments/{attachment}/download'
*/
const downloadd59f5b879a0e2a1b9944133c0244f099Form = (args: { attachment: string | number } | [attachment: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: downloadd59f5b879a0e2a1b9944133c0244f099.url(args, options),
    method: 'get',
})

/**
* @see \Yuan\AdminCore\Attachments\AttachmentController::download
* @see vendor/yuanmaharsyah/admin-core/src/Attachments/AttachmentController.php:107
* @route '/admin/samples/attachments/{attachment}/download'
*/
downloadd59f5b879a0e2a1b9944133c0244f099Form.get = (args: { attachment: string | number } | [attachment: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: downloadd59f5b879a0e2a1b9944133c0244f099.url(args, options),
    method: 'get',
})

/**
* @see \Yuan\AdminCore\Attachments\AttachmentController::download
* @see vendor/yuanmaharsyah/admin-core/src/Attachments/AttachmentController.php:107
* @route '/admin/samples/attachments/{attachment}/download'
*/
downloadd59f5b879a0e2a1b9944133c0244f099Form.head = (args: { attachment: string | number } | [attachment: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: downloadd59f5b879a0e2a1b9944133c0244f099.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

downloadd59f5b879a0e2a1b9944133c0244f099.form = downloadd59f5b879a0e2a1b9944133c0244f099Form
/**
* @see \Yuan\AdminCore\Attachments\AttachmentController::download
* @see vendor/yuanmaharsyah/admin-core/src/Attachments/AttachmentController.php:107
* @route '/admin/sample-admin/attachments/{attachment}/download'
*/
const download71208015d64ecb346a4c85207076104a = (args: { attachment: string | number } | [attachment: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: download71208015d64ecb346a4c85207076104a.url(args, options),
    method: 'get',
})

download71208015d64ecb346a4c85207076104a.definition = {
    methods: ["get","head"],
    url: '/admin/sample-admin/attachments/{attachment}/download',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Yuan\AdminCore\Attachments\AttachmentController::download
* @see vendor/yuanmaharsyah/admin-core/src/Attachments/AttachmentController.php:107
* @route '/admin/sample-admin/attachments/{attachment}/download'
*/
download71208015d64ecb346a4c85207076104a.url = (args: { attachment: string | number } | [attachment: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return download71208015d64ecb346a4c85207076104a.definition.url
            .replace('{attachment}', parsedArgs.attachment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Yuan\AdminCore\Attachments\AttachmentController::download
* @see vendor/yuanmaharsyah/admin-core/src/Attachments/AttachmentController.php:107
* @route '/admin/sample-admin/attachments/{attachment}/download'
*/
download71208015d64ecb346a4c85207076104a.get = (args: { attachment: string | number } | [attachment: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: download71208015d64ecb346a4c85207076104a.url(args, options),
    method: 'get',
})

/**
* @see \Yuan\AdminCore\Attachments\AttachmentController::download
* @see vendor/yuanmaharsyah/admin-core/src/Attachments/AttachmentController.php:107
* @route '/admin/sample-admin/attachments/{attachment}/download'
*/
download71208015d64ecb346a4c85207076104a.head = (args: { attachment: string | number } | [attachment: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: download71208015d64ecb346a4c85207076104a.url(args, options),
    method: 'head',
})

/**
* @see \Yuan\AdminCore\Attachments\AttachmentController::download
* @see vendor/yuanmaharsyah/admin-core/src/Attachments/AttachmentController.php:107
* @route '/admin/sample-admin/attachments/{attachment}/download'
*/
const download71208015d64ecb346a4c85207076104aForm = (args: { attachment: string | number } | [attachment: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: download71208015d64ecb346a4c85207076104a.url(args, options),
    method: 'get',
})

/**
* @see \Yuan\AdminCore\Attachments\AttachmentController::download
* @see vendor/yuanmaharsyah/admin-core/src/Attachments/AttachmentController.php:107
* @route '/admin/sample-admin/attachments/{attachment}/download'
*/
download71208015d64ecb346a4c85207076104aForm.get = (args: { attachment: string | number } | [attachment: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: download71208015d64ecb346a4c85207076104a.url(args, options),
    method: 'get',
})

/**
* @see \Yuan\AdminCore\Attachments\AttachmentController::download
* @see vendor/yuanmaharsyah/admin-core/src/Attachments/AttachmentController.php:107
* @route '/admin/sample-admin/attachments/{attachment}/download'
*/
download71208015d64ecb346a4c85207076104aForm.head = (args: { attachment: string | number } | [attachment: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: download71208015d64ecb346a4c85207076104a.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

download71208015d64ecb346a4c85207076104a.form = download71208015d64ecb346a4c85207076104aForm

/**
* Multiple routes resolve to \Yuan\AdminCore\Attachments\AttachmentController::download, so this export is a
* dictionary keyed by URI rather than a callable, with the verbs prefixed where two routes share a URI.
* Call a specific route with `download['<key>'](...)`, or import the route by name from your
* generated `routes/` directory.
*/
export const download = {
    '/admin/invoices/attachments/{attachment}/download': downloada1b3b669d6af5ab1f75cc037b2297577,
    '/admin/samples/attachments/{attachment}/download': downloadd59f5b879a0e2a1b9944133c0244f099,
    '/admin/sample-admin/attachments/{attachment}/download': download71208015d64ecb346a4c85207076104a,
}

/**
* @see \Yuan\AdminCore\Attachments\AttachmentController::destroy
* @see vendor/yuanmaharsyah/admin-core/src/Attachments/AttachmentController.php:118
* @route '/admin/invoices/attachments/{attachment}'
*/
const destroy7a6481a71136536dc68856074999c961 = (args: { attachment: string | number } | [attachment: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy7a6481a71136536dc68856074999c961.url(args, options),
    method: 'delete',
})

destroy7a6481a71136536dc68856074999c961.definition = {
    methods: ["delete"],
    url: '/admin/invoices/attachments/{attachment}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Yuan\AdminCore\Attachments\AttachmentController::destroy
* @see vendor/yuanmaharsyah/admin-core/src/Attachments/AttachmentController.php:118
* @route '/admin/invoices/attachments/{attachment}'
*/
destroy7a6481a71136536dc68856074999c961.url = (args: { attachment: string | number } | [attachment: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return destroy7a6481a71136536dc68856074999c961.definition.url
            .replace('{attachment}', parsedArgs.attachment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Yuan\AdminCore\Attachments\AttachmentController::destroy
* @see vendor/yuanmaharsyah/admin-core/src/Attachments/AttachmentController.php:118
* @route '/admin/invoices/attachments/{attachment}'
*/
destroy7a6481a71136536dc68856074999c961.delete = (args: { attachment: string | number } | [attachment: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy7a6481a71136536dc68856074999c961.url(args, options),
    method: 'delete',
})

/**
* @see \Yuan\AdminCore\Attachments\AttachmentController::destroy
* @see vendor/yuanmaharsyah/admin-core/src/Attachments/AttachmentController.php:118
* @route '/admin/invoices/attachments/{attachment}'
*/
const destroy7a6481a71136536dc68856074999c961Form = (args: { attachment: string | number } | [attachment: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy7a6481a71136536dc68856074999c961.url(args, {
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
destroy7a6481a71136536dc68856074999c961Form.delete = (args: { attachment: string | number } | [attachment: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy7a6481a71136536dc68856074999c961.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy7a6481a71136536dc68856074999c961.form = destroy7a6481a71136536dc68856074999c961Form
/**
* @see \Yuan\AdminCore\Attachments\AttachmentController::destroy
* @see vendor/yuanmaharsyah/admin-core/src/Attachments/AttachmentController.php:118
* @route '/admin/samples/attachments/{attachment}'
*/
const destroye49c170aaf547aac4b6b6b29f5ef0a37 = (args: { attachment: string | number } | [attachment: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroye49c170aaf547aac4b6b6b29f5ef0a37.url(args, options),
    method: 'delete',
})

destroye49c170aaf547aac4b6b6b29f5ef0a37.definition = {
    methods: ["delete"],
    url: '/admin/samples/attachments/{attachment}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Yuan\AdminCore\Attachments\AttachmentController::destroy
* @see vendor/yuanmaharsyah/admin-core/src/Attachments/AttachmentController.php:118
* @route '/admin/samples/attachments/{attachment}'
*/
destroye49c170aaf547aac4b6b6b29f5ef0a37.url = (args: { attachment: string | number } | [attachment: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return destroye49c170aaf547aac4b6b6b29f5ef0a37.definition.url
            .replace('{attachment}', parsedArgs.attachment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Yuan\AdminCore\Attachments\AttachmentController::destroy
* @see vendor/yuanmaharsyah/admin-core/src/Attachments/AttachmentController.php:118
* @route '/admin/samples/attachments/{attachment}'
*/
destroye49c170aaf547aac4b6b6b29f5ef0a37.delete = (args: { attachment: string | number } | [attachment: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroye49c170aaf547aac4b6b6b29f5ef0a37.url(args, options),
    method: 'delete',
})

/**
* @see \Yuan\AdminCore\Attachments\AttachmentController::destroy
* @see vendor/yuanmaharsyah/admin-core/src/Attachments/AttachmentController.php:118
* @route '/admin/samples/attachments/{attachment}'
*/
const destroye49c170aaf547aac4b6b6b29f5ef0a37Form = (args: { attachment: string | number } | [attachment: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroye49c170aaf547aac4b6b6b29f5ef0a37.url(args, {
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
* @route '/admin/samples/attachments/{attachment}'
*/
destroye49c170aaf547aac4b6b6b29f5ef0a37Form.delete = (args: { attachment: string | number } | [attachment: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroye49c170aaf547aac4b6b6b29f5ef0a37.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroye49c170aaf547aac4b6b6b29f5ef0a37.form = destroye49c170aaf547aac4b6b6b29f5ef0a37Form
/**
* @see \Yuan\AdminCore\Attachments\AttachmentController::destroy
* @see vendor/yuanmaharsyah/admin-core/src/Attachments/AttachmentController.php:118
* @route '/admin/sample-admin/attachments/{attachment}'
*/
const destroy669b4f61d0e57fe7160ddc2965f14bea = (args: { attachment: string | number } | [attachment: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy669b4f61d0e57fe7160ddc2965f14bea.url(args, options),
    method: 'delete',
})

destroy669b4f61d0e57fe7160ddc2965f14bea.definition = {
    methods: ["delete"],
    url: '/admin/sample-admin/attachments/{attachment}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Yuan\AdminCore\Attachments\AttachmentController::destroy
* @see vendor/yuanmaharsyah/admin-core/src/Attachments/AttachmentController.php:118
* @route '/admin/sample-admin/attachments/{attachment}'
*/
destroy669b4f61d0e57fe7160ddc2965f14bea.url = (args: { attachment: string | number } | [attachment: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return destroy669b4f61d0e57fe7160ddc2965f14bea.definition.url
            .replace('{attachment}', parsedArgs.attachment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Yuan\AdminCore\Attachments\AttachmentController::destroy
* @see vendor/yuanmaharsyah/admin-core/src/Attachments/AttachmentController.php:118
* @route '/admin/sample-admin/attachments/{attachment}'
*/
destroy669b4f61d0e57fe7160ddc2965f14bea.delete = (args: { attachment: string | number } | [attachment: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy669b4f61d0e57fe7160ddc2965f14bea.url(args, options),
    method: 'delete',
})

/**
* @see \Yuan\AdminCore\Attachments\AttachmentController::destroy
* @see vendor/yuanmaharsyah/admin-core/src/Attachments/AttachmentController.php:118
* @route '/admin/sample-admin/attachments/{attachment}'
*/
const destroy669b4f61d0e57fe7160ddc2965f14beaForm = (args: { attachment: string | number } | [attachment: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy669b4f61d0e57fe7160ddc2965f14bea.url(args, {
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
* @route '/admin/sample-admin/attachments/{attachment}'
*/
destroy669b4f61d0e57fe7160ddc2965f14beaForm.delete = (args: { attachment: string | number } | [attachment: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy669b4f61d0e57fe7160ddc2965f14bea.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy669b4f61d0e57fe7160ddc2965f14bea.form = destroy669b4f61d0e57fe7160ddc2965f14beaForm

/**
* Multiple routes resolve to \Yuan\AdminCore\Attachments\AttachmentController::destroy, so this export is a
* dictionary keyed by URI rather than a callable, with the verbs prefixed where two routes share a URI.
* Call a specific route with `destroy['<key>'](...)`, or import the route by name from your
* generated `routes/` directory.
*/
export const destroy = {
    '/admin/invoices/attachments/{attachment}': destroy7a6481a71136536dc68856074999c961,
    '/admin/samples/attachments/{attachment}': destroye49c170aaf547aac4b6b6b29f5ef0a37,
    '/admin/sample-admin/attachments/{attachment}': destroy669b4f61d0e57fe7160ddc2965f14bea,
}

const AttachmentController = { url, download, destroy }

export default AttachmentController