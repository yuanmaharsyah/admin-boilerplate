import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \Yuan\AdminCore\Trash\TrashController::index
* @see vendor/yuanmaharsyah/admin-core/src/Trash/TrashController.php:60
* @route '/admin/users/trash'
*/
const indexad0b74ed5c212ab67e0ab1508dc276b7 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: indexad0b74ed5c212ab67e0ab1508dc276b7.url(options),
    method: 'get',
})

indexad0b74ed5c212ab67e0ab1508dc276b7.definition = {
    methods: ["get","head"],
    url: '/admin/users/trash',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Yuan\AdminCore\Trash\TrashController::index
* @see vendor/yuanmaharsyah/admin-core/src/Trash/TrashController.php:60
* @route '/admin/users/trash'
*/
indexad0b74ed5c212ab67e0ab1508dc276b7.url = (options?: RouteQueryOptions) => {
    return indexad0b74ed5c212ab67e0ab1508dc276b7.definition.url + queryParams(options)
}

/**
* @see \Yuan\AdminCore\Trash\TrashController::index
* @see vendor/yuanmaharsyah/admin-core/src/Trash/TrashController.php:60
* @route '/admin/users/trash'
*/
indexad0b74ed5c212ab67e0ab1508dc276b7.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: indexad0b74ed5c212ab67e0ab1508dc276b7.url(options),
    method: 'get',
})

/**
* @see \Yuan\AdminCore\Trash\TrashController::index
* @see vendor/yuanmaharsyah/admin-core/src/Trash/TrashController.php:60
* @route '/admin/users/trash'
*/
indexad0b74ed5c212ab67e0ab1508dc276b7.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: indexad0b74ed5c212ab67e0ab1508dc276b7.url(options),
    method: 'head',
})

/**
* @see \Yuan\AdminCore\Trash\TrashController::index
* @see vendor/yuanmaharsyah/admin-core/src/Trash/TrashController.php:60
* @route '/admin/users/trash'
*/
const indexad0b74ed5c212ab67e0ab1508dc276b7Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: indexad0b74ed5c212ab67e0ab1508dc276b7.url(options),
    method: 'get',
})

/**
* @see \Yuan\AdminCore\Trash\TrashController::index
* @see vendor/yuanmaharsyah/admin-core/src/Trash/TrashController.php:60
* @route '/admin/users/trash'
*/
indexad0b74ed5c212ab67e0ab1508dc276b7Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: indexad0b74ed5c212ab67e0ab1508dc276b7.url(options),
    method: 'get',
})

/**
* @see \Yuan\AdminCore\Trash\TrashController::index
* @see vendor/yuanmaharsyah/admin-core/src/Trash/TrashController.php:60
* @route '/admin/users/trash'
*/
indexad0b74ed5c212ab67e0ab1508dc276b7Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: indexad0b74ed5c212ab67e0ab1508dc276b7.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

indexad0b74ed5c212ab67e0ab1508dc276b7.form = indexad0b74ed5c212ab67e0ab1508dc276b7Form
/**
* @see \Yuan\AdminCore\Trash\TrashController::index
* @see vendor/yuanmaharsyah/admin-core/src/Trash/TrashController.php:60
* @route '/admin/customers/trash'
*/
const indexb727d97dbbaebdede00c7cb3d43702c7 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: indexb727d97dbbaebdede00c7cb3d43702c7.url(options),
    method: 'get',
})

indexb727d97dbbaebdede00c7cb3d43702c7.definition = {
    methods: ["get","head"],
    url: '/admin/customers/trash',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Yuan\AdminCore\Trash\TrashController::index
* @see vendor/yuanmaharsyah/admin-core/src/Trash/TrashController.php:60
* @route '/admin/customers/trash'
*/
indexb727d97dbbaebdede00c7cb3d43702c7.url = (options?: RouteQueryOptions) => {
    return indexb727d97dbbaebdede00c7cb3d43702c7.definition.url + queryParams(options)
}

/**
* @see \Yuan\AdminCore\Trash\TrashController::index
* @see vendor/yuanmaharsyah/admin-core/src/Trash/TrashController.php:60
* @route '/admin/customers/trash'
*/
indexb727d97dbbaebdede00c7cb3d43702c7.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: indexb727d97dbbaebdede00c7cb3d43702c7.url(options),
    method: 'get',
})

/**
* @see \Yuan\AdminCore\Trash\TrashController::index
* @see vendor/yuanmaharsyah/admin-core/src/Trash/TrashController.php:60
* @route '/admin/customers/trash'
*/
indexb727d97dbbaebdede00c7cb3d43702c7.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: indexb727d97dbbaebdede00c7cb3d43702c7.url(options),
    method: 'head',
})

/**
* @see \Yuan\AdminCore\Trash\TrashController::index
* @see vendor/yuanmaharsyah/admin-core/src/Trash/TrashController.php:60
* @route '/admin/customers/trash'
*/
const indexb727d97dbbaebdede00c7cb3d43702c7Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: indexb727d97dbbaebdede00c7cb3d43702c7.url(options),
    method: 'get',
})

/**
* @see \Yuan\AdminCore\Trash\TrashController::index
* @see vendor/yuanmaharsyah/admin-core/src/Trash/TrashController.php:60
* @route '/admin/customers/trash'
*/
indexb727d97dbbaebdede00c7cb3d43702c7Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: indexb727d97dbbaebdede00c7cb3d43702c7.url(options),
    method: 'get',
})

/**
* @see \Yuan\AdminCore\Trash\TrashController::index
* @see vendor/yuanmaharsyah/admin-core/src/Trash/TrashController.php:60
* @route '/admin/customers/trash'
*/
indexb727d97dbbaebdede00c7cb3d43702c7Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: indexb727d97dbbaebdede00c7cb3d43702c7.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

indexb727d97dbbaebdede00c7cb3d43702c7.form = indexb727d97dbbaebdede00c7cb3d43702c7Form
/**
* @see \Yuan\AdminCore\Trash\TrashController::index
* @see vendor/yuanmaharsyah/admin-core/src/Trash/TrashController.php:60
* @route '/admin/invoices/trash'
*/
const index64daec36d73148742d93855a9e3b98c3 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index64daec36d73148742d93855a9e3b98c3.url(options),
    method: 'get',
})

index64daec36d73148742d93855a9e3b98c3.definition = {
    methods: ["get","head"],
    url: '/admin/invoices/trash',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Yuan\AdminCore\Trash\TrashController::index
* @see vendor/yuanmaharsyah/admin-core/src/Trash/TrashController.php:60
* @route '/admin/invoices/trash'
*/
index64daec36d73148742d93855a9e3b98c3.url = (options?: RouteQueryOptions) => {
    return index64daec36d73148742d93855a9e3b98c3.definition.url + queryParams(options)
}

/**
* @see \Yuan\AdminCore\Trash\TrashController::index
* @see vendor/yuanmaharsyah/admin-core/src/Trash/TrashController.php:60
* @route '/admin/invoices/trash'
*/
index64daec36d73148742d93855a9e3b98c3.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index64daec36d73148742d93855a9e3b98c3.url(options),
    method: 'get',
})

/**
* @see \Yuan\AdminCore\Trash\TrashController::index
* @see vendor/yuanmaharsyah/admin-core/src/Trash/TrashController.php:60
* @route '/admin/invoices/trash'
*/
index64daec36d73148742d93855a9e3b98c3.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index64daec36d73148742d93855a9e3b98c3.url(options),
    method: 'head',
})

/**
* @see \Yuan\AdminCore\Trash\TrashController::index
* @see vendor/yuanmaharsyah/admin-core/src/Trash/TrashController.php:60
* @route '/admin/invoices/trash'
*/
const index64daec36d73148742d93855a9e3b98c3Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index64daec36d73148742d93855a9e3b98c3.url(options),
    method: 'get',
})

/**
* @see \Yuan\AdminCore\Trash\TrashController::index
* @see vendor/yuanmaharsyah/admin-core/src/Trash/TrashController.php:60
* @route '/admin/invoices/trash'
*/
index64daec36d73148742d93855a9e3b98c3Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index64daec36d73148742d93855a9e3b98c3.url(options),
    method: 'get',
})

/**
* @see \Yuan\AdminCore\Trash\TrashController::index
* @see vendor/yuanmaharsyah/admin-core/src/Trash/TrashController.php:60
* @route '/admin/invoices/trash'
*/
index64daec36d73148742d93855a9e3b98c3Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index64daec36d73148742d93855a9e3b98c3.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

index64daec36d73148742d93855a9e3b98c3.form = index64daec36d73148742d93855a9e3b98c3Form
/**
* @see \Yuan\AdminCore\Trash\TrashController::index
* @see vendor/yuanmaharsyah/admin-core/src/Trash/TrashController.php:60
* @route '/admin/samples/trash'
*/
const index4c93005063dbcb63b23c80c16785acdc = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index4c93005063dbcb63b23c80c16785acdc.url(options),
    method: 'get',
})

index4c93005063dbcb63b23c80c16785acdc.definition = {
    methods: ["get","head"],
    url: '/admin/samples/trash',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Yuan\AdminCore\Trash\TrashController::index
* @see vendor/yuanmaharsyah/admin-core/src/Trash/TrashController.php:60
* @route '/admin/samples/trash'
*/
index4c93005063dbcb63b23c80c16785acdc.url = (options?: RouteQueryOptions) => {
    return index4c93005063dbcb63b23c80c16785acdc.definition.url + queryParams(options)
}

/**
* @see \Yuan\AdminCore\Trash\TrashController::index
* @see vendor/yuanmaharsyah/admin-core/src/Trash/TrashController.php:60
* @route '/admin/samples/trash'
*/
index4c93005063dbcb63b23c80c16785acdc.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index4c93005063dbcb63b23c80c16785acdc.url(options),
    method: 'get',
})

/**
* @see \Yuan\AdminCore\Trash\TrashController::index
* @see vendor/yuanmaharsyah/admin-core/src/Trash/TrashController.php:60
* @route '/admin/samples/trash'
*/
index4c93005063dbcb63b23c80c16785acdc.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index4c93005063dbcb63b23c80c16785acdc.url(options),
    method: 'head',
})

/**
* @see \Yuan\AdminCore\Trash\TrashController::index
* @see vendor/yuanmaharsyah/admin-core/src/Trash/TrashController.php:60
* @route '/admin/samples/trash'
*/
const index4c93005063dbcb63b23c80c16785acdcForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index4c93005063dbcb63b23c80c16785acdc.url(options),
    method: 'get',
})

/**
* @see \Yuan\AdminCore\Trash\TrashController::index
* @see vendor/yuanmaharsyah/admin-core/src/Trash/TrashController.php:60
* @route '/admin/samples/trash'
*/
index4c93005063dbcb63b23c80c16785acdcForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index4c93005063dbcb63b23c80c16785acdc.url(options),
    method: 'get',
})

/**
* @see \Yuan\AdminCore\Trash\TrashController::index
* @see vendor/yuanmaharsyah/admin-core/src/Trash/TrashController.php:60
* @route '/admin/samples/trash'
*/
index4c93005063dbcb63b23c80c16785acdcForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index4c93005063dbcb63b23c80c16785acdc.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

index4c93005063dbcb63b23c80c16785acdc.form = index4c93005063dbcb63b23c80c16785acdcForm
/**
* @see \Yuan\AdminCore\Trash\TrashController::index
* @see vendor/yuanmaharsyah/admin-core/src/Trash/TrashController.php:60
* @route '/admin/sample-admin/trash'
*/
const indexd672c2dc6817ac78edd433b4b5779b8d = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: indexd672c2dc6817ac78edd433b4b5779b8d.url(options),
    method: 'get',
})

indexd672c2dc6817ac78edd433b4b5779b8d.definition = {
    methods: ["get","head"],
    url: '/admin/sample-admin/trash',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Yuan\AdminCore\Trash\TrashController::index
* @see vendor/yuanmaharsyah/admin-core/src/Trash/TrashController.php:60
* @route '/admin/sample-admin/trash'
*/
indexd672c2dc6817ac78edd433b4b5779b8d.url = (options?: RouteQueryOptions) => {
    return indexd672c2dc6817ac78edd433b4b5779b8d.definition.url + queryParams(options)
}

/**
* @see \Yuan\AdminCore\Trash\TrashController::index
* @see vendor/yuanmaharsyah/admin-core/src/Trash/TrashController.php:60
* @route '/admin/sample-admin/trash'
*/
indexd672c2dc6817ac78edd433b4b5779b8d.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: indexd672c2dc6817ac78edd433b4b5779b8d.url(options),
    method: 'get',
})

/**
* @see \Yuan\AdminCore\Trash\TrashController::index
* @see vendor/yuanmaharsyah/admin-core/src/Trash/TrashController.php:60
* @route '/admin/sample-admin/trash'
*/
indexd672c2dc6817ac78edd433b4b5779b8d.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: indexd672c2dc6817ac78edd433b4b5779b8d.url(options),
    method: 'head',
})

/**
* @see \Yuan\AdminCore\Trash\TrashController::index
* @see vendor/yuanmaharsyah/admin-core/src/Trash/TrashController.php:60
* @route '/admin/sample-admin/trash'
*/
const indexd672c2dc6817ac78edd433b4b5779b8dForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: indexd672c2dc6817ac78edd433b4b5779b8d.url(options),
    method: 'get',
})

/**
* @see \Yuan\AdminCore\Trash\TrashController::index
* @see vendor/yuanmaharsyah/admin-core/src/Trash/TrashController.php:60
* @route '/admin/sample-admin/trash'
*/
indexd672c2dc6817ac78edd433b4b5779b8dForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: indexd672c2dc6817ac78edd433b4b5779b8d.url(options),
    method: 'get',
})

/**
* @see \Yuan\AdminCore\Trash\TrashController::index
* @see vendor/yuanmaharsyah/admin-core/src/Trash/TrashController.php:60
* @route '/admin/sample-admin/trash'
*/
indexd672c2dc6817ac78edd433b4b5779b8dForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: indexd672c2dc6817ac78edd433b4b5779b8d.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

indexd672c2dc6817ac78edd433b4b5779b8d.form = indexd672c2dc6817ac78edd433b4b5779b8dForm

/**
* Multiple routes resolve to \Yuan\AdminCore\Trash\TrashController::index, so this export is a
* dictionary keyed by URI rather than a callable, with the verbs prefixed where two routes share a URI.
* Call a specific route with `index['<key>'](...)`, or import the route by name from your
* generated `routes/` directory.
*/
export const index = {
    '/admin/users/trash': indexad0b74ed5c212ab67e0ab1508dc276b7,
    '/admin/customers/trash': indexb727d97dbbaebdede00c7cb3d43702c7,
    '/admin/invoices/trash': index64daec36d73148742d93855a9e3b98c3,
    '/admin/samples/trash': index4c93005063dbcb63b23c80c16785acdc,
    '/admin/sample-admin/trash': indexd672c2dc6817ac78edd433b4b5779b8d,
}

/**
* @see \Yuan\AdminCore\Trash\TrashController::restore
* @see vendor/yuanmaharsyah/admin-core/src/Trash/TrashController.php:101
* @route '/admin/users/trash/restore'
*/
const restorea60ff09f83be2dc0b9fd810b809c6245 = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: restorea60ff09f83be2dc0b9fd810b809c6245.url(options),
    method: 'post',
})

restorea60ff09f83be2dc0b9fd810b809c6245.definition = {
    methods: ["post"],
    url: '/admin/users/trash/restore',
} satisfies RouteDefinition<["post"]>

/**
* @see \Yuan\AdminCore\Trash\TrashController::restore
* @see vendor/yuanmaharsyah/admin-core/src/Trash/TrashController.php:101
* @route '/admin/users/trash/restore'
*/
restorea60ff09f83be2dc0b9fd810b809c6245.url = (options?: RouteQueryOptions) => {
    return restorea60ff09f83be2dc0b9fd810b809c6245.definition.url + queryParams(options)
}

/**
* @see \Yuan\AdminCore\Trash\TrashController::restore
* @see vendor/yuanmaharsyah/admin-core/src/Trash/TrashController.php:101
* @route '/admin/users/trash/restore'
*/
restorea60ff09f83be2dc0b9fd810b809c6245.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: restorea60ff09f83be2dc0b9fd810b809c6245.url(options),
    method: 'post',
})

/**
* @see \Yuan\AdminCore\Trash\TrashController::restore
* @see vendor/yuanmaharsyah/admin-core/src/Trash/TrashController.php:101
* @route '/admin/users/trash/restore'
*/
const restorea60ff09f83be2dc0b9fd810b809c6245Form = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: restorea60ff09f83be2dc0b9fd810b809c6245.url(options),
    method: 'post',
})

/**
* @see \Yuan\AdminCore\Trash\TrashController::restore
* @see vendor/yuanmaharsyah/admin-core/src/Trash/TrashController.php:101
* @route '/admin/users/trash/restore'
*/
restorea60ff09f83be2dc0b9fd810b809c6245Form.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: restorea60ff09f83be2dc0b9fd810b809c6245.url(options),
    method: 'post',
})

restorea60ff09f83be2dc0b9fd810b809c6245.form = restorea60ff09f83be2dc0b9fd810b809c6245Form
/**
* @see \Yuan\AdminCore\Trash\TrashController::restore
* @see vendor/yuanmaharsyah/admin-core/src/Trash/TrashController.php:101
* @route '/admin/customers/trash/restore'
*/
const restore06dc08982d4a44d437f222fa094bfc37 = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: restore06dc08982d4a44d437f222fa094bfc37.url(options),
    method: 'post',
})

restore06dc08982d4a44d437f222fa094bfc37.definition = {
    methods: ["post"],
    url: '/admin/customers/trash/restore',
} satisfies RouteDefinition<["post"]>

/**
* @see \Yuan\AdminCore\Trash\TrashController::restore
* @see vendor/yuanmaharsyah/admin-core/src/Trash/TrashController.php:101
* @route '/admin/customers/trash/restore'
*/
restore06dc08982d4a44d437f222fa094bfc37.url = (options?: RouteQueryOptions) => {
    return restore06dc08982d4a44d437f222fa094bfc37.definition.url + queryParams(options)
}

/**
* @see \Yuan\AdminCore\Trash\TrashController::restore
* @see vendor/yuanmaharsyah/admin-core/src/Trash/TrashController.php:101
* @route '/admin/customers/trash/restore'
*/
restore06dc08982d4a44d437f222fa094bfc37.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: restore06dc08982d4a44d437f222fa094bfc37.url(options),
    method: 'post',
})

/**
* @see \Yuan\AdminCore\Trash\TrashController::restore
* @see vendor/yuanmaharsyah/admin-core/src/Trash/TrashController.php:101
* @route '/admin/customers/trash/restore'
*/
const restore06dc08982d4a44d437f222fa094bfc37Form = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: restore06dc08982d4a44d437f222fa094bfc37.url(options),
    method: 'post',
})

/**
* @see \Yuan\AdminCore\Trash\TrashController::restore
* @see vendor/yuanmaharsyah/admin-core/src/Trash/TrashController.php:101
* @route '/admin/customers/trash/restore'
*/
restore06dc08982d4a44d437f222fa094bfc37Form.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: restore06dc08982d4a44d437f222fa094bfc37.url(options),
    method: 'post',
})

restore06dc08982d4a44d437f222fa094bfc37.form = restore06dc08982d4a44d437f222fa094bfc37Form
/**
* @see \Yuan\AdminCore\Trash\TrashController::restore
* @see vendor/yuanmaharsyah/admin-core/src/Trash/TrashController.php:101
* @route '/admin/invoices/trash/restore'
*/
const restore58238c958c93653b11173d8bdea786f2 = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: restore58238c958c93653b11173d8bdea786f2.url(options),
    method: 'post',
})

restore58238c958c93653b11173d8bdea786f2.definition = {
    methods: ["post"],
    url: '/admin/invoices/trash/restore',
} satisfies RouteDefinition<["post"]>

/**
* @see \Yuan\AdminCore\Trash\TrashController::restore
* @see vendor/yuanmaharsyah/admin-core/src/Trash/TrashController.php:101
* @route '/admin/invoices/trash/restore'
*/
restore58238c958c93653b11173d8bdea786f2.url = (options?: RouteQueryOptions) => {
    return restore58238c958c93653b11173d8bdea786f2.definition.url + queryParams(options)
}

/**
* @see \Yuan\AdminCore\Trash\TrashController::restore
* @see vendor/yuanmaharsyah/admin-core/src/Trash/TrashController.php:101
* @route '/admin/invoices/trash/restore'
*/
restore58238c958c93653b11173d8bdea786f2.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: restore58238c958c93653b11173d8bdea786f2.url(options),
    method: 'post',
})

/**
* @see \Yuan\AdminCore\Trash\TrashController::restore
* @see vendor/yuanmaharsyah/admin-core/src/Trash/TrashController.php:101
* @route '/admin/invoices/trash/restore'
*/
const restore58238c958c93653b11173d8bdea786f2Form = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: restore58238c958c93653b11173d8bdea786f2.url(options),
    method: 'post',
})

/**
* @see \Yuan\AdminCore\Trash\TrashController::restore
* @see vendor/yuanmaharsyah/admin-core/src/Trash/TrashController.php:101
* @route '/admin/invoices/trash/restore'
*/
restore58238c958c93653b11173d8bdea786f2Form.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: restore58238c958c93653b11173d8bdea786f2.url(options),
    method: 'post',
})

restore58238c958c93653b11173d8bdea786f2.form = restore58238c958c93653b11173d8bdea786f2Form
/**
* @see \Yuan\AdminCore\Trash\TrashController::restore
* @see vendor/yuanmaharsyah/admin-core/src/Trash/TrashController.php:101
* @route '/admin/samples/trash/restore'
*/
const restore1b175b7260a28ef3abf579bd3f9ee191 = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: restore1b175b7260a28ef3abf579bd3f9ee191.url(options),
    method: 'post',
})

restore1b175b7260a28ef3abf579bd3f9ee191.definition = {
    methods: ["post"],
    url: '/admin/samples/trash/restore',
} satisfies RouteDefinition<["post"]>

/**
* @see \Yuan\AdminCore\Trash\TrashController::restore
* @see vendor/yuanmaharsyah/admin-core/src/Trash/TrashController.php:101
* @route '/admin/samples/trash/restore'
*/
restore1b175b7260a28ef3abf579bd3f9ee191.url = (options?: RouteQueryOptions) => {
    return restore1b175b7260a28ef3abf579bd3f9ee191.definition.url + queryParams(options)
}

/**
* @see \Yuan\AdminCore\Trash\TrashController::restore
* @see vendor/yuanmaharsyah/admin-core/src/Trash/TrashController.php:101
* @route '/admin/samples/trash/restore'
*/
restore1b175b7260a28ef3abf579bd3f9ee191.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: restore1b175b7260a28ef3abf579bd3f9ee191.url(options),
    method: 'post',
})

/**
* @see \Yuan\AdminCore\Trash\TrashController::restore
* @see vendor/yuanmaharsyah/admin-core/src/Trash/TrashController.php:101
* @route '/admin/samples/trash/restore'
*/
const restore1b175b7260a28ef3abf579bd3f9ee191Form = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: restore1b175b7260a28ef3abf579bd3f9ee191.url(options),
    method: 'post',
})

/**
* @see \Yuan\AdminCore\Trash\TrashController::restore
* @see vendor/yuanmaharsyah/admin-core/src/Trash/TrashController.php:101
* @route '/admin/samples/trash/restore'
*/
restore1b175b7260a28ef3abf579bd3f9ee191Form.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: restore1b175b7260a28ef3abf579bd3f9ee191.url(options),
    method: 'post',
})

restore1b175b7260a28ef3abf579bd3f9ee191.form = restore1b175b7260a28ef3abf579bd3f9ee191Form
/**
* @see \Yuan\AdminCore\Trash\TrashController::restore
* @see vendor/yuanmaharsyah/admin-core/src/Trash/TrashController.php:101
* @route '/admin/sample-admin/trash/restore'
*/
const restore4b23bc414f616ffac5613a281922ed12 = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: restore4b23bc414f616ffac5613a281922ed12.url(options),
    method: 'post',
})

restore4b23bc414f616ffac5613a281922ed12.definition = {
    methods: ["post"],
    url: '/admin/sample-admin/trash/restore',
} satisfies RouteDefinition<["post"]>

/**
* @see \Yuan\AdminCore\Trash\TrashController::restore
* @see vendor/yuanmaharsyah/admin-core/src/Trash/TrashController.php:101
* @route '/admin/sample-admin/trash/restore'
*/
restore4b23bc414f616ffac5613a281922ed12.url = (options?: RouteQueryOptions) => {
    return restore4b23bc414f616ffac5613a281922ed12.definition.url + queryParams(options)
}

/**
* @see \Yuan\AdminCore\Trash\TrashController::restore
* @see vendor/yuanmaharsyah/admin-core/src/Trash/TrashController.php:101
* @route '/admin/sample-admin/trash/restore'
*/
restore4b23bc414f616ffac5613a281922ed12.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: restore4b23bc414f616ffac5613a281922ed12.url(options),
    method: 'post',
})

/**
* @see \Yuan\AdminCore\Trash\TrashController::restore
* @see vendor/yuanmaharsyah/admin-core/src/Trash/TrashController.php:101
* @route '/admin/sample-admin/trash/restore'
*/
const restore4b23bc414f616ffac5613a281922ed12Form = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: restore4b23bc414f616ffac5613a281922ed12.url(options),
    method: 'post',
})

/**
* @see \Yuan\AdminCore\Trash\TrashController::restore
* @see vendor/yuanmaharsyah/admin-core/src/Trash/TrashController.php:101
* @route '/admin/sample-admin/trash/restore'
*/
restore4b23bc414f616ffac5613a281922ed12Form.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: restore4b23bc414f616ffac5613a281922ed12.url(options),
    method: 'post',
})

restore4b23bc414f616ffac5613a281922ed12.form = restore4b23bc414f616ffac5613a281922ed12Form

/**
* Multiple routes resolve to \Yuan\AdminCore\Trash\TrashController::restore, so this export is a
* dictionary keyed by URI rather than a callable, with the verbs prefixed where two routes share a URI.
* Call a specific route with `restore['<key>'](...)`, or import the route by name from your
* generated `routes/` directory.
*/
export const restore = {
    '/admin/users/trash/restore': restorea60ff09f83be2dc0b9fd810b809c6245,
    '/admin/customers/trash/restore': restore06dc08982d4a44d437f222fa094bfc37,
    '/admin/invoices/trash/restore': restore58238c958c93653b11173d8bdea786f2,
    '/admin/samples/trash/restore': restore1b175b7260a28ef3abf579bd3f9ee191,
    '/admin/sample-admin/trash/restore': restore4b23bc414f616ffac5613a281922ed12,
}

/**
* @see \Yuan\AdminCore\Trash\TrashController::destroy
* @see vendor/yuanmaharsyah/admin-core/src/Trash/TrashController.php:114
* @route '/admin/users/trash'
*/
const destroyad0b74ed5c212ab67e0ab1508dc276b7 = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroyad0b74ed5c212ab67e0ab1508dc276b7.url(options),
    method: 'delete',
})

destroyad0b74ed5c212ab67e0ab1508dc276b7.definition = {
    methods: ["delete"],
    url: '/admin/users/trash',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Yuan\AdminCore\Trash\TrashController::destroy
* @see vendor/yuanmaharsyah/admin-core/src/Trash/TrashController.php:114
* @route '/admin/users/trash'
*/
destroyad0b74ed5c212ab67e0ab1508dc276b7.url = (options?: RouteQueryOptions) => {
    return destroyad0b74ed5c212ab67e0ab1508dc276b7.definition.url + queryParams(options)
}

/**
* @see \Yuan\AdminCore\Trash\TrashController::destroy
* @see vendor/yuanmaharsyah/admin-core/src/Trash/TrashController.php:114
* @route '/admin/users/trash'
*/
destroyad0b74ed5c212ab67e0ab1508dc276b7.delete = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroyad0b74ed5c212ab67e0ab1508dc276b7.url(options),
    method: 'delete',
})

/**
* @see \Yuan\AdminCore\Trash\TrashController::destroy
* @see vendor/yuanmaharsyah/admin-core/src/Trash/TrashController.php:114
* @route '/admin/users/trash'
*/
const destroyad0b74ed5c212ab67e0ab1508dc276b7Form = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroyad0b74ed5c212ab67e0ab1508dc276b7.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \Yuan\AdminCore\Trash\TrashController::destroy
* @see vendor/yuanmaharsyah/admin-core/src/Trash/TrashController.php:114
* @route '/admin/users/trash'
*/
destroyad0b74ed5c212ab67e0ab1508dc276b7Form.delete = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroyad0b74ed5c212ab67e0ab1508dc276b7.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroyad0b74ed5c212ab67e0ab1508dc276b7.form = destroyad0b74ed5c212ab67e0ab1508dc276b7Form
/**
* @see \Yuan\AdminCore\Trash\TrashController::destroy
* @see vendor/yuanmaharsyah/admin-core/src/Trash/TrashController.php:114
* @route '/admin/customers/trash'
*/
const destroyb727d97dbbaebdede00c7cb3d43702c7 = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroyb727d97dbbaebdede00c7cb3d43702c7.url(options),
    method: 'delete',
})

destroyb727d97dbbaebdede00c7cb3d43702c7.definition = {
    methods: ["delete"],
    url: '/admin/customers/trash',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Yuan\AdminCore\Trash\TrashController::destroy
* @see vendor/yuanmaharsyah/admin-core/src/Trash/TrashController.php:114
* @route '/admin/customers/trash'
*/
destroyb727d97dbbaebdede00c7cb3d43702c7.url = (options?: RouteQueryOptions) => {
    return destroyb727d97dbbaebdede00c7cb3d43702c7.definition.url + queryParams(options)
}

/**
* @see \Yuan\AdminCore\Trash\TrashController::destroy
* @see vendor/yuanmaharsyah/admin-core/src/Trash/TrashController.php:114
* @route '/admin/customers/trash'
*/
destroyb727d97dbbaebdede00c7cb3d43702c7.delete = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroyb727d97dbbaebdede00c7cb3d43702c7.url(options),
    method: 'delete',
})

/**
* @see \Yuan\AdminCore\Trash\TrashController::destroy
* @see vendor/yuanmaharsyah/admin-core/src/Trash/TrashController.php:114
* @route '/admin/customers/trash'
*/
const destroyb727d97dbbaebdede00c7cb3d43702c7Form = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroyb727d97dbbaebdede00c7cb3d43702c7.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \Yuan\AdminCore\Trash\TrashController::destroy
* @see vendor/yuanmaharsyah/admin-core/src/Trash/TrashController.php:114
* @route '/admin/customers/trash'
*/
destroyb727d97dbbaebdede00c7cb3d43702c7Form.delete = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroyb727d97dbbaebdede00c7cb3d43702c7.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroyb727d97dbbaebdede00c7cb3d43702c7.form = destroyb727d97dbbaebdede00c7cb3d43702c7Form
/**
* @see \Yuan\AdminCore\Trash\TrashController::destroy
* @see vendor/yuanmaharsyah/admin-core/src/Trash/TrashController.php:114
* @route '/admin/invoices/trash'
*/
const destroy64daec36d73148742d93855a9e3b98c3 = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy64daec36d73148742d93855a9e3b98c3.url(options),
    method: 'delete',
})

destroy64daec36d73148742d93855a9e3b98c3.definition = {
    methods: ["delete"],
    url: '/admin/invoices/trash',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Yuan\AdminCore\Trash\TrashController::destroy
* @see vendor/yuanmaharsyah/admin-core/src/Trash/TrashController.php:114
* @route '/admin/invoices/trash'
*/
destroy64daec36d73148742d93855a9e3b98c3.url = (options?: RouteQueryOptions) => {
    return destroy64daec36d73148742d93855a9e3b98c3.definition.url + queryParams(options)
}

/**
* @see \Yuan\AdminCore\Trash\TrashController::destroy
* @see vendor/yuanmaharsyah/admin-core/src/Trash/TrashController.php:114
* @route '/admin/invoices/trash'
*/
destroy64daec36d73148742d93855a9e3b98c3.delete = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy64daec36d73148742d93855a9e3b98c3.url(options),
    method: 'delete',
})

/**
* @see \Yuan\AdminCore\Trash\TrashController::destroy
* @see vendor/yuanmaharsyah/admin-core/src/Trash/TrashController.php:114
* @route '/admin/invoices/trash'
*/
const destroy64daec36d73148742d93855a9e3b98c3Form = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy64daec36d73148742d93855a9e3b98c3.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \Yuan\AdminCore\Trash\TrashController::destroy
* @see vendor/yuanmaharsyah/admin-core/src/Trash/TrashController.php:114
* @route '/admin/invoices/trash'
*/
destroy64daec36d73148742d93855a9e3b98c3Form.delete = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy64daec36d73148742d93855a9e3b98c3.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy64daec36d73148742d93855a9e3b98c3.form = destroy64daec36d73148742d93855a9e3b98c3Form
/**
* @see \Yuan\AdminCore\Trash\TrashController::destroy
* @see vendor/yuanmaharsyah/admin-core/src/Trash/TrashController.php:114
* @route '/admin/samples/trash'
*/
const destroy4c93005063dbcb63b23c80c16785acdc = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy4c93005063dbcb63b23c80c16785acdc.url(options),
    method: 'delete',
})

destroy4c93005063dbcb63b23c80c16785acdc.definition = {
    methods: ["delete"],
    url: '/admin/samples/trash',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Yuan\AdminCore\Trash\TrashController::destroy
* @see vendor/yuanmaharsyah/admin-core/src/Trash/TrashController.php:114
* @route '/admin/samples/trash'
*/
destroy4c93005063dbcb63b23c80c16785acdc.url = (options?: RouteQueryOptions) => {
    return destroy4c93005063dbcb63b23c80c16785acdc.definition.url + queryParams(options)
}

/**
* @see \Yuan\AdminCore\Trash\TrashController::destroy
* @see vendor/yuanmaharsyah/admin-core/src/Trash/TrashController.php:114
* @route '/admin/samples/trash'
*/
destroy4c93005063dbcb63b23c80c16785acdc.delete = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy4c93005063dbcb63b23c80c16785acdc.url(options),
    method: 'delete',
})

/**
* @see \Yuan\AdminCore\Trash\TrashController::destroy
* @see vendor/yuanmaharsyah/admin-core/src/Trash/TrashController.php:114
* @route '/admin/samples/trash'
*/
const destroy4c93005063dbcb63b23c80c16785acdcForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy4c93005063dbcb63b23c80c16785acdc.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \Yuan\AdminCore\Trash\TrashController::destroy
* @see vendor/yuanmaharsyah/admin-core/src/Trash/TrashController.php:114
* @route '/admin/samples/trash'
*/
destroy4c93005063dbcb63b23c80c16785acdcForm.delete = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy4c93005063dbcb63b23c80c16785acdc.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy4c93005063dbcb63b23c80c16785acdc.form = destroy4c93005063dbcb63b23c80c16785acdcForm
/**
* @see \Yuan\AdminCore\Trash\TrashController::destroy
* @see vendor/yuanmaharsyah/admin-core/src/Trash/TrashController.php:114
* @route '/admin/sample-admin/trash'
*/
const destroyd672c2dc6817ac78edd433b4b5779b8d = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroyd672c2dc6817ac78edd433b4b5779b8d.url(options),
    method: 'delete',
})

destroyd672c2dc6817ac78edd433b4b5779b8d.definition = {
    methods: ["delete"],
    url: '/admin/sample-admin/trash',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Yuan\AdminCore\Trash\TrashController::destroy
* @see vendor/yuanmaharsyah/admin-core/src/Trash/TrashController.php:114
* @route '/admin/sample-admin/trash'
*/
destroyd672c2dc6817ac78edd433b4b5779b8d.url = (options?: RouteQueryOptions) => {
    return destroyd672c2dc6817ac78edd433b4b5779b8d.definition.url + queryParams(options)
}

/**
* @see \Yuan\AdminCore\Trash\TrashController::destroy
* @see vendor/yuanmaharsyah/admin-core/src/Trash/TrashController.php:114
* @route '/admin/sample-admin/trash'
*/
destroyd672c2dc6817ac78edd433b4b5779b8d.delete = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroyd672c2dc6817ac78edd433b4b5779b8d.url(options),
    method: 'delete',
})

/**
* @see \Yuan\AdminCore\Trash\TrashController::destroy
* @see vendor/yuanmaharsyah/admin-core/src/Trash/TrashController.php:114
* @route '/admin/sample-admin/trash'
*/
const destroyd672c2dc6817ac78edd433b4b5779b8dForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroyd672c2dc6817ac78edd433b4b5779b8d.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \Yuan\AdminCore\Trash\TrashController::destroy
* @see vendor/yuanmaharsyah/admin-core/src/Trash/TrashController.php:114
* @route '/admin/sample-admin/trash'
*/
destroyd672c2dc6817ac78edd433b4b5779b8dForm.delete = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroyd672c2dc6817ac78edd433b4b5779b8d.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroyd672c2dc6817ac78edd433b4b5779b8d.form = destroyd672c2dc6817ac78edd433b4b5779b8dForm

/**
* Multiple routes resolve to \Yuan\AdminCore\Trash\TrashController::destroy, so this export is a
* dictionary keyed by URI rather than a callable, with the verbs prefixed where two routes share a URI.
* Call a specific route with `destroy['<key>'](...)`, or import the route by name from your
* generated `routes/` directory.
*/
export const destroy = {
    '/admin/users/trash': destroyad0b74ed5c212ab67e0ab1508dc276b7,
    '/admin/customers/trash': destroyb727d97dbbaebdede00c7cb3d43702c7,
    '/admin/invoices/trash': destroy64daec36d73148742d93855a9e3b98c3,
    '/admin/samples/trash': destroy4c93005063dbcb63b23c80c16785acdc,
    '/admin/sample-admin/trash': destroyd672c2dc6817ac78edd433b4b5779b8d,
}

const TrashController = { index, restore, destroy }

export default TrashController