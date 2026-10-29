import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see \Yuan\AdminCore\Trash\TrashController::restore
* @see vendor/yuanmaharsyah/admin-core/src/Trash/TrashController.php:101
* @route '/admin/invoices/trash/restore'
*/
export const restore = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: restore.url(options),
    method: 'post',
})

restore.definition = {
    methods: ["post"],
    url: '/admin/invoices/trash/restore',
} satisfies RouteDefinition<["post"]>

/**
* @see \Yuan\AdminCore\Trash\TrashController::restore
* @see vendor/yuanmaharsyah/admin-core/src/Trash/TrashController.php:101
* @route '/admin/invoices/trash/restore'
*/
restore.url = (options?: RouteQueryOptions) => {
    return restore.definition.url + queryParams(options)
}

/**
* @see \Yuan\AdminCore\Trash\TrashController::restore
* @see vendor/yuanmaharsyah/admin-core/src/Trash/TrashController.php:101
* @route '/admin/invoices/trash/restore'
*/
restore.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: restore.url(options),
    method: 'post',
})

/**
* @see \Yuan\AdminCore\Trash\TrashController::restore
* @see vendor/yuanmaharsyah/admin-core/src/Trash/TrashController.php:101
* @route '/admin/invoices/trash/restore'
*/
const restoreForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: restore.url(options),
    method: 'post',
})

/**
* @see \Yuan\AdminCore\Trash\TrashController::restore
* @see vendor/yuanmaharsyah/admin-core/src/Trash/TrashController.php:101
* @route '/admin/invoices/trash/restore'
*/
restoreForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: restore.url(options),
    method: 'post',
})

restore.form = restoreForm

/**
* @see \Yuan\AdminCore\Trash\TrashController::destroy
* @see vendor/yuanmaharsyah/admin-core/src/Trash/TrashController.php:114
* @route '/admin/invoices/trash'
*/
export const destroy = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/invoices/trash',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Yuan\AdminCore\Trash\TrashController::destroy
* @see vendor/yuanmaharsyah/admin-core/src/Trash/TrashController.php:114
* @route '/admin/invoices/trash'
*/
destroy.url = (options?: RouteQueryOptions) => {
    return destroy.definition.url + queryParams(options)
}

/**
* @see \Yuan\AdminCore\Trash\TrashController::destroy
* @see vendor/yuanmaharsyah/admin-core/src/Trash/TrashController.php:114
* @route '/admin/invoices/trash'
*/
destroy.delete = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(options),
    method: 'delete',
})

/**
* @see \Yuan\AdminCore\Trash\TrashController::destroy
* @see vendor/yuanmaharsyah/admin-core/src/Trash/TrashController.php:114
* @route '/admin/invoices/trash'
*/
const destroyForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url({
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
destroyForm.delete = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const trash = {
    restore: Object.assign(restore, restore),
    destroy: Object.assign(destroy, destroy),
}

export default trash