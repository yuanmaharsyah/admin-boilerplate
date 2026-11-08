import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
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
* @see \Modules\Task\Http\Controllers\TaskBoardController::move
* @see modules/Task/Http/Controllers/TaskBoardController.php:51
* @route '/admin/kanban/board'
*/
export const move = (options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: move.url(options),
    method: 'patch',
})

move.definition = {
    methods: ["patch"],
    url: '/admin/kanban/board',
} satisfies RouteDefinition<["patch"]>

/**
* @see \Modules\Task\Http\Controllers\TaskBoardController::move
* @see modules/Task/Http/Controllers/TaskBoardController.php:51
* @route '/admin/kanban/board'
*/
move.url = (options?: RouteQueryOptions) => {
    return move.definition.url + queryParams(options)
}

/**
* @see \Modules\Task\Http\Controllers\TaskBoardController::move
* @see modules/Task/Http/Controllers/TaskBoardController.php:51
* @route '/admin/kanban/board'
*/
move.patch = (options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: move.url(options),
    method: 'patch',
})

/**
* @see \Modules\Task\Http\Controllers\TaskBoardController::move
* @see modules/Task/Http/Controllers/TaskBoardController.php:51
* @route '/admin/kanban/board'
*/
const moveForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: move.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \Modules\Task\Http\Controllers\TaskBoardController::move
* @see modules/Task/Http/Controllers/TaskBoardController.php:51
* @route '/admin/kanban/board'
*/
moveForm.patch = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: move.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

move.form = moveForm

const TaskBoardController = { board, move }

export default TaskBoardController