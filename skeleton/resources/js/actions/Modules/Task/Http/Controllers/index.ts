import TaskController from './TaskController'
import TaskBoardController from './TaskBoardController'

const Controllers = {
    TaskController: Object.assign(TaskController, TaskController),
    TaskBoardController: Object.assign(TaskBoardController, TaskBoardController),
}

export default Controllers