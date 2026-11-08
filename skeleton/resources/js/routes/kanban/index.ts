import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
import trash067cdb from './trash'
import board8caaa4 from './board'
/**
* @see \Yuan\AdminCore\Trash\TrashController::trash
* @see vendor/yuanmaharsyah/admin-core/src/Trash/TrashController.php:60
* @route '/admin/kanban/trash'
*/
export const trash = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: trash.url(options),
    method: 'get',
})

trash.definition = {
    methods: ["get","head"],
    url: '/admin/kanban/trash',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Yuan\AdminCore\Trash\TrashController::trash
* @see vendor/yuanmaharsyah/admin-core/src/Trash/TrashController.php:60
* @route '/admin/kanban/trash'
*/
trash.url = (options?: RouteQueryOptions) => {
    return trash.definition.url + queryParams(options)
}

/**
* @see \Yuan\AdminCore\Trash\TrashController::trash
* @see vendor/yuanmaharsyah/admin-core/src/Trash/TrashController.php:60
* @route '/admin/kanban/trash'
*/
trash.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: trash.url(options),
    method: 'get',
})

/**
* @see \Yuan\AdminCore\Trash\TrashController::trash
* @see vendor/yuanmaharsyah/admin-core/src/Trash/TrashController.php:60
* @route '/admin/kanban/trash'
*/
trash.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: trash.url(options),
    method: 'head',
})

/**
* @see \Yuan\AdminCore\Trash\TrashController::trash
* @see vendor/yuanmaharsyah/admin-core/src/Trash/TrashController.php:60
* @route '/admin/kanban/trash'
*/
const trashForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: trash.url(options),
    method: 'get',
})

/**
* @see \Yuan\AdminCore\Trash\TrashController::trash
* @see vendor/yuanmaharsyah/admin-core/src/Trash/TrashController.php:60
* @route '/admin/kanban/trash'
*/
trashForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: trash.url(options),
    method: 'get',
})

/**
* @see \Yuan\AdminCore\Trash\TrashController::trash
* @see vendor/yuanmaharsyah/admin-core/src/Trash/TrashController.php:60
* @route '/admin/kanban/trash'
*/
trashForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: trash.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

trash.form = trashForm

/**
* @see \Modules\Task\Http\Controllers\TaskController::index
* @see modules/Task/Http/Controllers/TaskController.php:31
* @route '/admin/kanban'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/kanban',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Task\Http\Controllers\TaskController::index
* @see modules/Task/Http/Controllers/TaskController.php:31
* @route '/admin/kanban'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Task\Http\Controllers\TaskController::index
* @see modules/Task/Http/Controllers/TaskController.php:31
* @route '/admin/kanban'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \Modules\Task\Http\Controllers\TaskController::index
* @see modules/Task/Http/Controllers/TaskController.php:31
* @route '/admin/kanban'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \Modules\Task\Http\Controllers\TaskController::index
* @see modules/Task/Http/Controllers/TaskController.php:31
* @route '/admin/kanban'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \Modules\Task\Http\Controllers\TaskController::index
* @see modules/Task/Http/Controllers/TaskController.php:31
* @route '/admin/kanban'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \Modules\Task\Http\Controllers\TaskController::index
* @see modules/Task/Http/Controllers/TaskController.php:31
* @route '/admin/kanban'
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
* @see \Modules\Task\Http\Controllers\TaskBoardController::board
* @see modules/Task/Http/Controllers/TaskBoardController.php:28
* @route '/admin/kanban/board'
*/
export const board = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: board.url(options),
    method: 'get',
})

board.definition = {
    methods: ["get","head"],
    url: '/admin/kanban/board',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Task\Http\Controllers\TaskBoardController::board
* @see modules/Task/Http/Controllers/TaskBoardController.php:28
* @route '/admin/kanban/board'
*/
board.url = (options?: RouteQueryOptions) => {
    return board.definition.url + queryParams(options)
}

/**
* @see \Modules\Task\Http\Controllers\TaskBoardController::board
* @see modules/Task/Http/Controllers/TaskBoardController.php:28
* @route '/admin/kanban/board'
*/
board.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: board.url(options),
    method: 'get',
})

/**
* @see \Modules\Task\Http\Controllers\TaskBoardController::board
* @see modules/Task/Http/Controllers/TaskBoardController.php:28
* @route '/admin/kanban/board'
*/
board.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: board.url(options),
    method: 'head',
})

/**
* @see \Modules\Task\Http\Controllers\TaskBoardController::board
* @see modules/Task/Http/Controllers/TaskBoardController.php:28
* @route '/admin/kanban/board'
*/
const boardForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: board.url(options),
    method: 'get',
})

/**
* @see \Modules\Task\Http\Controllers\TaskBoardController::board
* @see modules/Task/Http/Controllers/TaskBoardController.php:28
* @route '/admin/kanban/board'
*/
boardForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: board.url(options),
    method: 'get',
})

/**
* @see \Modules\Task\Http\Controllers\TaskBoardController::board
* @see modules/Task/Http/Controllers/TaskBoardController.php:28
* @route '/admin/kanban/board'
*/
boardForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: board.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

board.form = boardForm

/**
* @see \Modules\Task\Http\Controllers\TaskController::lookup
* @see modules/Task/Http/Controllers/TaskController.php:42
* @route '/admin/kanban/lookup'
*/
export const lookup = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: lookup.url(options),
    method: 'get',
})

lookup.definition = {
    methods: ["get","head"],
    url: '/admin/kanban/lookup',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Task\Http\Controllers\TaskController::lookup
* @see modules/Task/Http/Controllers/TaskController.php:42
* @route '/admin/kanban/lookup'
*/
lookup.url = (options?: RouteQueryOptions) => {
    return lookup.definition.url + queryParams(options)
}

/**
* @see \Modules\Task\Http\Controllers\TaskController::lookup
* @see modules/Task/Http/Controllers/TaskController.php:42
* @route '/admin/kanban/lookup'
*/
lookup.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: lookup.url(options),
    method: 'get',
})

/**
* @see \Modules\Task\Http\Controllers\TaskController::lookup
* @see modules/Task/Http/Controllers/TaskController.php:42
* @route '/admin/kanban/lookup'
*/
lookup.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: lookup.url(options),
    method: 'head',
})

/**
* @see \Modules\Task\Http\Controllers\TaskController::lookup
* @see modules/Task/Http/Controllers/TaskController.php:42
* @route '/admin/kanban/lookup'
*/
const lookupForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: lookup.url(options),
    method: 'get',
})

/**
* @see \Modules\Task\Http\Controllers\TaskController::lookup
* @see modules/Task/Http/Controllers/TaskController.php:42
* @route '/admin/kanban/lookup'
*/
lookupForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: lookup.url(options),
    method: 'get',
})

/**
* @see \Modules\Task\Http\Controllers\TaskController::lookup
* @see modules/Task/Http/Controllers/TaskController.php:42
* @route '/admin/kanban/lookup'
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
* @see \Modules\Task\Http\Controllers\TaskController::create
* @see modules/Task/Http/Controllers/TaskController.php:68
* @route '/admin/kanban/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/admin/kanban/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Task\Http\Controllers\TaskController::create
* @see modules/Task/Http/Controllers/TaskController.php:68
* @route '/admin/kanban/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \Modules\Task\Http\Controllers\TaskController::create
* @see modules/Task/Http/Controllers/TaskController.php:68
* @route '/admin/kanban/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \Modules\Task\Http\Controllers\TaskController::create
* @see modules/Task/Http/Controllers/TaskController.php:68
* @route '/admin/kanban/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \Modules\Task\Http\Controllers\TaskController::create
* @see modules/Task/Http/Controllers/TaskController.php:68
* @route '/admin/kanban/create'
*/
const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \Modules\Task\Http\Controllers\TaskController::create
* @see modules/Task/Http/Controllers/TaskController.php:68
* @route '/admin/kanban/create'
*/
createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \Modules\Task\Http\Controllers\TaskController::create
* @see modules/Task/Http/Controllers/TaskController.php:68
* @route '/admin/kanban/create'
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
* @see \Modules\Task\Http\Controllers\TaskController::store
* @see modules/Task/Http/Controllers/TaskController.php:78
* @route '/admin/kanban'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/kanban',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Task\Http\Controllers\TaskController::store
* @see modules/Task/Http/Controllers/TaskController.php:78
* @route '/admin/kanban'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\Task\Http\Controllers\TaskController::store
* @see modules/Task/Http/Controllers/TaskController.php:78
* @route '/admin/kanban'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \Modules\Task\Http\Controllers\TaskController::store
* @see modules/Task/Http/Controllers/TaskController.php:78
* @route '/admin/kanban'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \Modules\Task\Http\Controllers\TaskController::store
* @see modules/Task/Http/Controllers/TaskController.php:78
* @route '/admin/kanban'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \Modules\Task\Http\Controllers\TaskController::bulkDestroy
* @see modules/Task/Http/Controllers/TaskController.php:124
* @route '/admin/kanban'
*/
export const bulkDestroy = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: bulkDestroy.url(options),
    method: 'delete',
})

bulkDestroy.definition = {
    methods: ["delete"],
    url: '/admin/kanban',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Task\Http\Controllers\TaskController::bulkDestroy
* @see modules/Task/Http/Controllers/TaskController.php:124
* @route '/admin/kanban'
*/
bulkDestroy.url = (options?: RouteQueryOptions) => {
    return bulkDestroy.definition.url + queryParams(options)
}

/**
* @see \Modules\Task\Http\Controllers\TaskController::bulkDestroy
* @see modules/Task/Http/Controllers/TaskController.php:124
* @route '/admin/kanban'
*/
bulkDestroy.delete = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: bulkDestroy.url(options),
    method: 'delete',
})

/**
* @see \Modules\Task\Http\Controllers\TaskController::bulkDestroy
* @see modules/Task/Http/Controllers/TaskController.php:124
* @route '/admin/kanban'
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
* @see \Modules\Task\Http\Controllers\TaskController::bulkDestroy
* @see modules/Task/Http/Controllers/TaskController.php:124
* @route '/admin/kanban'
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
* @see \Modules\Task\Http\Controllers\TaskController::show
* @see modules/Task/Http/Controllers/TaskController.php:56
* @route '/admin/kanban/{task}'
*/
export const show = (args: { task: string | number } | [task: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/admin/kanban/{task}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Task\Http\Controllers\TaskController::show
* @see modules/Task/Http/Controllers/TaskController.php:56
* @route '/admin/kanban/{task}'
*/
show.url = (args: { task: string | number } | [task: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { task: args }
    }

    if (Array.isArray(args)) {
        args = {
            task: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        task: args.task,
    }

    return show.definition.url
            .replace('{task}', parsedArgs.task.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Task\Http\Controllers\TaskController::show
* @see modules/Task/Http/Controllers/TaskController.php:56
* @route '/admin/kanban/{task}'
*/
show.get = (args: { task: string | number } | [task: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Task\Http\Controllers\TaskController::show
* @see modules/Task/Http/Controllers/TaskController.php:56
* @route '/admin/kanban/{task}'
*/
show.head = (args: { task: string | number } | [task: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \Modules\Task\Http\Controllers\TaskController::show
* @see modules/Task/Http/Controllers/TaskController.php:56
* @route '/admin/kanban/{task}'
*/
const showForm = (args: { task: string | number } | [task: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Task\Http\Controllers\TaskController::show
* @see modules/Task/Http/Controllers/TaskController.php:56
* @route '/admin/kanban/{task}'
*/
showForm.get = (args: { task: string | number } | [task: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Task\Http\Controllers\TaskController::show
* @see modules/Task/Http/Controllers/TaskController.php:56
* @route '/admin/kanban/{task}'
*/
showForm.head = (args: { task: string | number } | [task: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \Modules\Task\Http\Controllers\TaskController::edit
* @see modules/Task/Http/Controllers/TaskController.php:88
* @route '/admin/kanban/{task}/edit'
*/
export const edit = (args: { task: string | number } | [task: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/kanban/{task}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Task\Http\Controllers\TaskController::edit
* @see modules/Task/Http/Controllers/TaskController.php:88
* @route '/admin/kanban/{task}/edit'
*/
edit.url = (args: { task: string | number } | [task: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { task: args }
    }

    if (Array.isArray(args)) {
        args = {
            task: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        task: args.task,
    }

    return edit.definition.url
            .replace('{task}', parsedArgs.task.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Task\Http\Controllers\TaskController::edit
* @see modules/Task/Http/Controllers/TaskController.php:88
* @route '/admin/kanban/{task}/edit'
*/
edit.get = (args: { task: string | number } | [task: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Task\Http\Controllers\TaskController::edit
* @see modules/Task/Http/Controllers/TaskController.php:88
* @route '/admin/kanban/{task}/edit'
*/
edit.head = (args: { task: string | number } | [task: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \Modules\Task\Http\Controllers\TaskController::edit
* @see modules/Task/Http/Controllers/TaskController.php:88
* @route '/admin/kanban/{task}/edit'
*/
const editForm = (args: { task: string | number } | [task: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Task\Http\Controllers\TaskController::edit
* @see modules/Task/Http/Controllers/TaskController.php:88
* @route '/admin/kanban/{task}/edit'
*/
editForm.get = (args: { task: string | number } | [task: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Task\Http\Controllers\TaskController::edit
* @see modules/Task/Http/Controllers/TaskController.php:88
* @route '/admin/kanban/{task}/edit'
*/
editForm.head = (args: { task: string | number } | [task: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \Modules\Task\Http\Controllers\TaskController::update
* @see modules/Task/Http/Controllers/TaskController.php:103
* @route '/admin/kanban/{task}'
*/
export const update = (args: { task: string | number } | [task: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/admin/kanban/{task}',
} satisfies RouteDefinition<["put"]>

/**
* @see \Modules\Task\Http\Controllers\TaskController::update
* @see modules/Task/Http/Controllers/TaskController.php:103
* @route '/admin/kanban/{task}'
*/
update.url = (args: { task: string | number } | [task: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { task: args }
    }

    if (Array.isArray(args)) {
        args = {
            task: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        task: args.task,
    }

    return update.definition.url
            .replace('{task}', parsedArgs.task.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Task\Http\Controllers\TaskController::update
* @see modules/Task/Http/Controllers/TaskController.php:103
* @route '/admin/kanban/{task}'
*/
update.put = (args: { task: string | number } | [task: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \Modules\Task\Http\Controllers\TaskController::update
* @see modules/Task/Http/Controllers/TaskController.php:103
* @route '/admin/kanban/{task}'
*/
const updateForm = (args: { task: string | number } | [task: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \Modules\Task\Http\Controllers\TaskController::update
* @see modules/Task/Http/Controllers/TaskController.php:103
* @route '/admin/kanban/{task}'
*/
updateForm.put = (args: { task: string | number } | [task: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \Modules\Task\Http\Controllers\TaskController::destroy
* @see modules/Task/Http/Controllers/TaskController.php:114
* @route '/admin/kanban/{task}'
*/
export const destroy = (args: { task: string | number } | [task: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/kanban/{task}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Task\Http\Controllers\TaskController::destroy
* @see modules/Task/Http/Controllers/TaskController.php:114
* @route '/admin/kanban/{task}'
*/
destroy.url = (args: { task: string | number } | [task: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { task: args }
    }

    if (Array.isArray(args)) {
        args = {
            task: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        task: args.task,
    }

    return destroy.definition.url
            .replace('{task}', parsedArgs.task.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Task\Http\Controllers\TaskController::destroy
* @see modules/Task/Http/Controllers/TaskController.php:114
* @route '/admin/kanban/{task}'
*/
destroy.delete = (args: { task: string | number } | [task: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \Modules\Task\Http\Controllers\TaskController::destroy
* @see modules/Task/Http/Controllers/TaskController.php:114
* @route '/admin/kanban/{task}'
*/
const destroyForm = (args: { task: string | number } | [task: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \Modules\Task\Http\Controllers\TaskController::destroy
* @see modules/Task/Http/Controllers/TaskController.php:114
* @route '/admin/kanban/{task}'
*/
destroyForm.delete = (args: { task: string | number } | [task: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const kanban = {
    trash: Object.assign(trash, trash067cdb),
    index: Object.assign(index, index),
    board: Object.assign(board, board8caaa4),
    lookup: Object.assign(lookup, lookup),
    create: Object.assign(create, create),
    store: Object.assign(store, store),
    bulkDestroy: Object.assign(bulkDestroy, bulkDestroy),
    show: Object.assign(show, show),
    edit: Object.assign(edit, edit),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
}

export default kanban