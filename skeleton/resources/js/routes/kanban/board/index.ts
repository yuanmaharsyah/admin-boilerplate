import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
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

const board = {
    move: Object.assign(move, move),
}

export default board