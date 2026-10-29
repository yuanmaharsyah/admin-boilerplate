import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
import permissions7d3099 from './permissions'
/**
* @see \Yuan\AdminCore\Modules\Levels\Http\Controllers\LevelsController::index
* @see vendor/yuanmaharsyah/admin-core/modules/Levels/Http/Controllers/LevelsController.php:34
* @route '/admin/levels'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/levels',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Yuan\AdminCore\Modules\Levels\Http\Controllers\LevelsController::index
* @see vendor/yuanmaharsyah/admin-core/modules/Levels/Http/Controllers/LevelsController.php:34
* @route '/admin/levels'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Yuan\AdminCore\Modules\Levels\Http\Controllers\LevelsController::index
* @see vendor/yuanmaharsyah/admin-core/modules/Levels/Http/Controllers/LevelsController.php:34
* @route '/admin/levels'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \Yuan\AdminCore\Modules\Levels\Http\Controllers\LevelsController::index
* @see vendor/yuanmaharsyah/admin-core/modules/Levels/Http/Controllers/LevelsController.php:34
* @route '/admin/levels'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \Yuan\AdminCore\Modules\Levels\Http\Controllers\LevelsController::index
* @see vendor/yuanmaharsyah/admin-core/modules/Levels/Http/Controllers/LevelsController.php:34
* @route '/admin/levels'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \Yuan\AdminCore\Modules\Levels\Http\Controllers\LevelsController::index
* @see vendor/yuanmaharsyah/admin-core/modules/Levels/Http/Controllers/LevelsController.php:34
* @route '/admin/levels'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \Yuan\AdminCore\Modules\Levels\Http\Controllers\LevelsController::index
* @see vendor/yuanmaharsyah/admin-core/modules/Levels/Http/Controllers/LevelsController.php:34
* @route '/admin/levels'
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
* @see \Yuan\AdminCore\Modules\Levels\Http\Controllers\LevelsController::create
* @see vendor/yuanmaharsyah/admin-core/modules/Levels/Http/Controllers/LevelsController.php:51
* @route '/admin/levels/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/admin/levels/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Yuan\AdminCore\Modules\Levels\Http\Controllers\LevelsController::create
* @see vendor/yuanmaharsyah/admin-core/modules/Levels/Http/Controllers/LevelsController.php:51
* @route '/admin/levels/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \Yuan\AdminCore\Modules\Levels\Http\Controllers\LevelsController::create
* @see vendor/yuanmaharsyah/admin-core/modules/Levels/Http/Controllers/LevelsController.php:51
* @route '/admin/levels/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \Yuan\AdminCore\Modules\Levels\Http\Controllers\LevelsController::create
* @see vendor/yuanmaharsyah/admin-core/modules/Levels/Http/Controllers/LevelsController.php:51
* @route '/admin/levels/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \Yuan\AdminCore\Modules\Levels\Http\Controllers\LevelsController::create
* @see vendor/yuanmaharsyah/admin-core/modules/Levels/Http/Controllers/LevelsController.php:51
* @route '/admin/levels/create'
*/
const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \Yuan\AdminCore\Modules\Levels\Http\Controllers\LevelsController::create
* @see vendor/yuanmaharsyah/admin-core/modules/Levels/Http/Controllers/LevelsController.php:51
* @route '/admin/levels/create'
*/
createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \Yuan\AdminCore\Modules\Levels\Http\Controllers\LevelsController::create
* @see vendor/yuanmaharsyah/admin-core/modules/Levels/Http/Controllers/LevelsController.php:51
* @route '/admin/levels/create'
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
* @see \Yuan\AdminCore\Modules\Levels\Http\Controllers\LevelsController::store
* @see vendor/yuanmaharsyah/admin-core/modules/Levels/Http/Controllers/LevelsController.php:58
* @route '/admin/levels'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/levels',
} satisfies RouteDefinition<["post"]>

/**
* @see \Yuan\AdminCore\Modules\Levels\Http\Controllers\LevelsController::store
* @see vendor/yuanmaharsyah/admin-core/modules/Levels/Http/Controllers/LevelsController.php:58
* @route '/admin/levels'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Yuan\AdminCore\Modules\Levels\Http\Controllers\LevelsController::store
* @see vendor/yuanmaharsyah/admin-core/modules/Levels/Http/Controllers/LevelsController.php:58
* @route '/admin/levels'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \Yuan\AdminCore\Modules\Levels\Http\Controllers\LevelsController::store
* @see vendor/yuanmaharsyah/admin-core/modules/Levels/Http/Controllers/LevelsController.php:58
* @route '/admin/levels'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \Yuan\AdminCore\Modules\Levels\Http\Controllers\LevelsController::store
* @see vendor/yuanmaharsyah/admin-core/modules/Levels/Http/Controllers/LevelsController.php:58
* @route '/admin/levels'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \Yuan\AdminCore\Modules\Levels\Http\Controllers\LevelsController::edit
* @see vendor/yuanmaharsyah/admin-core/modules/Levels/Http/Controllers/LevelsController.php:73
* @route '/admin/levels/{level}/edit'
*/
export const edit = (args: { level: number | { id: number } } | [level: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/levels/{level}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Yuan\AdminCore\Modules\Levels\Http\Controllers\LevelsController::edit
* @see vendor/yuanmaharsyah/admin-core/modules/Levels/Http/Controllers/LevelsController.php:73
* @route '/admin/levels/{level}/edit'
*/
edit.url = (args: { level: number | { id: number } } | [level: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { level: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { level: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            level: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        level: typeof args.level === 'object'
        ? args.level.id
        : args.level,
    }

    return edit.definition.url
            .replace('{level}', parsedArgs.level.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Yuan\AdminCore\Modules\Levels\Http\Controllers\LevelsController::edit
* @see vendor/yuanmaharsyah/admin-core/modules/Levels/Http/Controllers/LevelsController.php:73
* @route '/admin/levels/{level}/edit'
*/
edit.get = (args: { level: number | { id: number } } | [level: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \Yuan\AdminCore\Modules\Levels\Http\Controllers\LevelsController::edit
* @see vendor/yuanmaharsyah/admin-core/modules/Levels/Http/Controllers/LevelsController.php:73
* @route '/admin/levels/{level}/edit'
*/
edit.head = (args: { level: number | { id: number } } | [level: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \Yuan\AdminCore\Modules\Levels\Http\Controllers\LevelsController::edit
* @see vendor/yuanmaharsyah/admin-core/modules/Levels/Http/Controllers/LevelsController.php:73
* @route '/admin/levels/{level}/edit'
*/
const editForm = (args: { level: number | { id: number } } | [level: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \Yuan\AdminCore\Modules\Levels\Http\Controllers\LevelsController::edit
* @see vendor/yuanmaharsyah/admin-core/modules/Levels/Http/Controllers/LevelsController.php:73
* @route '/admin/levels/{level}/edit'
*/
editForm.get = (args: { level: number | { id: number } } | [level: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \Yuan\AdminCore\Modules\Levels\Http\Controllers\LevelsController::edit
* @see vendor/yuanmaharsyah/admin-core/modules/Levels/Http/Controllers/LevelsController.php:73
* @route '/admin/levels/{level}/edit'
*/
editForm.head = (args: { level: number | { id: number } } | [level: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \Yuan\AdminCore\Modules\Levels\Http\Controllers\LevelsController::update
* @see vendor/yuanmaharsyah/admin-core/modules/Levels/Http/Controllers/LevelsController.php:84
* @route '/admin/levels/{level}'
*/
export const update = (args: { level: number | { id: number } } | [level: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/admin/levels/{level}',
} satisfies RouteDefinition<["put"]>

/**
* @see \Yuan\AdminCore\Modules\Levels\Http\Controllers\LevelsController::update
* @see vendor/yuanmaharsyah/admin-core/modules/Levels/Http/Controllers/LevelsController.php:84
* @route '/admin/levels/{level}'
*/
update.url = (args: { level: number | { id: number } } | [level: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { level: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { level: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            level: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        level: typeof args.level === 'object'
        ? args.level.id
        : args.level,
    }

    return update.definition.url
            .replace('{level}', parsedArgs.level.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Yuan\AdminCore\Modules\Levels\Http\Controllers\LevelsController::update
* @see vendor/yuanmaharsyah/admin-core/modules/Levels/Http/Controllers/LevelsController.php:84
* @route '/admin/levels/{level}'
*/
update.put = (args: { level: number | { id: number } } | [level: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \Yuan\AdminCore\Modules\Levels\Http\Controllers\LevelsController::update
* @see vendor/yuanmaharsyah/admin-core/modules/Levels/Http/Controllers/LevelsController.php:84
* @route '/admin/levels/{level}'
*/
const updateForm = (args: { level: number | { id: number } } | [level: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \Yuan\AdminCore\Modules\Levels\Http\Controllers\LevelsController::update
* @see vendor/yuanmaharsyah/admin-core/modules/Levels/Http/Controllers/LevelsController.php:84
* @route '/admin/levels/{level}'
*/
updateForm.put = (args: { level: number | { id: number } } | [level: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \Yuan\AdminCore\Modules\Levels\Http\Controllers\LevelsController::destroy
* @see vendor/yuanmaharsyah/admin-core/modules/Levels/Http/Controllers/LevelsController.php:95
* @route '/admin/levels/{level}'
*/
export const destroy = (args: { level: number | { id: number } } | [level: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/levels/{level}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Yuan\AdminCore\Modules\Levels\Http\Controllers\LevelsController::destroy
* @see vendor/yuanmaharsyah/admin-core/modules/Levels/Http/Controllers/LevelsController.php:95
* @route '/admin/levels/{level}'
*/
destroy.url = (args: { level: number | { id: number } } | [level: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { level: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { level: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            level: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        level: typeof args.level === 'object'
        ? args.level.id
        : args.level,
    }

    return destroy.definition.url
            .replace('{level}', parsedArgs.level.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Yuan\AdminCore\Modules\Levels\Http\Controllers\LevelsController::destroy
* @see vendor/yuanmaharsyah/admin-core/modules/Levels/Http/Controllers/LevelsController.php:95
* @route '/admin/levels/{level}'
*/
destroy.delete = (args: { level: number | { id: number } } | [level: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \Yuan\AdminCore\Modules\Levels\Http\Controllers\LevelsController::destroy
* @see vendor/yuanmaharsyah/admin-core/modules/Levels/Http/Controllers/LevelsController.php:95
* @route '/admin/levels/{level}'
*/
const destroyForm = (args: { level: number | { id: number } } | [level: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \Yuan\AdminCore\Modules\Levels\Http\Controllers\LevelsController::destroy
* @see vendor/yuanmaharsyah/admin-core/modules/Levels/Http/Controllers/LevelsController.php:95
* @route '/admin/levels/{level}'
*/
destroyForm.delete = (args: { level: number | { id: number } } | [level: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

/**
* @see \Yuan\AdminCore\Modules\Levels\Http\Controllers\LevelsController::permissions
* @see vendor/yuanmaharsyah/admin-core/modules/Levels/Http/Controllers/LevelsController.php:112
* @route '/admin/levels/{level}/permissions'
*/
export const permissions = (args: { level: number | { id: number } } | [level: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: permissions.url(args, options),
    method: 'get',
})

permissions.definition = {
    methods: ["get","head"],
    url: '/admin/levels/{level}/permissions',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Yuan\AdminCore\Modules\Levels\Http\Controllers\LevelsController::permissions
* @see vendor/yuanmaharsyah/admin-core/modules/Levels/Http/Controllers/LevelsController.php:112
* @route '/admin/levels/{level}/permissions'
*/
permissions.url = (args: { level: number | { id: number } } | [level: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { level: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { level: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            level: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        level: typeof args.level === 'object'
        ? args.level.id
        : args.level,
    }

    return permissions.definition.url
            .replace('{level}', parsedArgs.level.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Yuan\AdminCore\Modules\Levels\Http\Controllers\LevelsController::permissions
* @see vendor/yuanmaharsyah/admin-core/modules/Levels/Http/Controllers/LevelsController.php:112
* @route '/admin/levels/{level}/permissions'
*/
permissions.get = (args: { level: number | { id: number } } | [level: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: permissions.url(args, options),
    method: 'get',
})

/**
* @see \Yuan\AdminCore\Modules\Levels\Http\Controllers\LevelsController::permissions
* @see vendor/yuanmaharsyah/admin-core/modules/Levels/Http/Controllers/LevelsController.php:112
* @route '/admin/levels/{level}/permissions'
*/
permissions.head = (args: { level: number | { id: number } } | [level: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: permissions.url(args, options),
    method: 'head',
})

/**
* @see \Yuan\AdminCore\Modules\Levels\Http\Controllers\LevelsController::permissions
* @see vendor/yuanmaharsyah/admin-core/modules/Levels/Http/Controllers/LevelsController.php:112
* @route '/admin/levels/{level}/permissions'
*/
const permissionsForm = (args: { level: number | { id: number } } | [level: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: permissions.url(args, options),
    method: 'get',
})

/**
* @see \Yuan\AdminCore\Modules\Levels\Http\Controllers\LevelsController::permissions
* @see vendor/yuanmaharsyah/admin-core/modules/Levels/Http/Controllers/LevelsController.php:112
* @route '/admin/levels/{level}/permissions'
*/
permissionsForm.get = (args: { level: number | { id: number } } | [level: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: permissions.url(args, options),
    method: 'get',
})

/**
* @see \Yuan\AdminCore\Modules\Levels\Http\Controllers\LevelsController::permissions
* @see vendor/yuanmaharsyah/admin-core/modules/Levels/Http/Controllers/LevelsController.php:112
* @route '/admin/levels/{level}/permissions'
*/
permissionsForm.head = (args: { level: number | { id: number } } | [level: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: permissions.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

permissions.form = permissionsForm

const levels = {
    index: Object.assign(index, index),
    create: Object.assign(create, create),
    store: Object.assign(store, store),
    edit: Object.assign(edit, edit),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
    permissions: Object.assign(permissions, permissions7d3099),
}

export default levels