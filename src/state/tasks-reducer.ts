import {TasksStateType} from '../App';
import {addTodolistAC, changeTodolistTitleAC, removeTodolistAC, setTodoListsAC,} from './todolists-reducer';
import {TaskType, todolistsAPI, UpdateTaskModelType} from '../api/todolists-api'
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";

const initialState: TasksStateType = {
    /*"todolistId1": [
        { id: "1", title: "CSS", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
        { id: "2", title: "JS", status: TaskStatuses.Completed, todoListId: "todolistId1", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
        { id: "3", title: "React", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low }
    ],
    "todolistId2": [
        { id: "1", title: "bread", status: TaskStatuses.New, todoListId: "todolistId2", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
        { id: "2", title: "milk", status: TaskStatuses.Completed, todoListId: "todolistId2", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
        { id: "3", title: "tea", status: TaskStatuses.New, todoListId: "todolistId2", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low }
    ]*/

}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case "SET-TASKS":
            return {
                ...state,
                [action.todolistId]: action.tasks
            }
        case 'SET-TODOLISTS':
            const copy = {...state}
            action.todos.forEach((t) => {
                copy[t.id] = []
            })
            return copy
        case 'REMOVE-TASK':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)
            }
        case 'ADD-TASK':
            return {
                ...state,
                [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]
            }
        case 'UPDATE-TASK':
            return {
                ...state, [action.todolistId]: state[action.todolistId]
                    .map(t => t.id === action.taskId ? {...t, ...action.model} : t)
            }
        case 'ADD-TODOLIST':
            return {
                ...state,
                [action.todolist.id]: []
            }
        case 'REMOVE-TODOLIST':
            const copyState = {...state};
            delete copyState[action.id];
            return copyState;
        default:
            return state;
    }
}

// ACTIONS
export const removeTaskAC = (taskId: string, todolistId: string) => ({
    type: 'REMOVE-TASK',
    taskId: taskId,
    todolistId: todolistId
} as const)
export const addTaskAC = (task: TaskType) => ({type: 'ADD-TASK', task} as const)
export const updateTaskAC = (taskId: string, model: UpdateDomainTaskModelType, todolistId: string) => ({
    type: 'UPDATE-TASK',
    model,
    todolistId,
    taskId
} as const)
export const fetchTaskAC = (todolistId: string, tasks: Array<TaskType>) => ({
    type: 'SET-TASKS',
    todolistId,
    tasks
} as const)

// THUNK
export const fetchTasksTC = (todoID: string) => (dispatch: Dispatch) => {
    todolistsAPI.getTasks(todoID)
        .then((res) => {
            //dispatch action
            dispatch(fetchTaskAC(todoID, res.data.items))
        })
}
export const removeTaskTC = (todoID: string, taskID: string) => (dispatch: Dispatch) => {
    todolistsAPI.deleteTask(todoID, taskID)
        .then((res) => {
            if (res.data.resultCode === 0) dispatch(removeTaskAC(taskID, todoID))
        })
}
export const addTaskTC = (todoID: string, taskTitle: string) => (dispatch: Dispatch) => {
    todolistsAPI.createTask(todoID, taskTitle)
        .then((res) => {
            dispatch(addTaskAC(res.data.data.item))
        })
}
export const updateTaskTC = (todoID: string, taskID: string, domainModel: UpdateDomainTaskModelType) =>
    (dispatch: Dispatch, getState: () => AppRootStateType) => {
        const state = getState()
        const allTasks = state.tasks
        const allTasksForClickedTodo = allTasks[todoID]
        const clickedTask = allTasksForClickedTodo.find((t) => {
            return t.id === taskID
        })
        // const model: any = {...clickedTask, status}
        if (clickedTask) {
            const apiModel: UpdateTaskModelType = {
                title: clickedTask.title,
                status: clickedTask.status,
                description: clickedTask.description,
                priority: clickedTask.priority,
                deadline: clickedTask.deadline,
                startDate: clickedTask.startDate,
                ...domainModel
            }
            todolistsAPI.updateTask(todoID, taskID, apiModel)
                .then((res) => {
                    dispatch(updateTaskAC(taskID, domainModel, todoID))
                })
        }
    }


//  TYPES
type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: number
    priority?: number
    startDate?: string
    deadline?: string
}
type ActionsType = ReturnType<typeof removeTaskAC> |
    ReturnType<typeof addTaskAC> |
    ReturnType<typeof updateTaskAC> |
    ReturnType<typeof fetchTaskAC> |
    ReturnType<typeof setTodoListsAC> |
    ReturnType<typeof addTodolistAC> |
    ReturnType<typeof changeTodolistTitleAC> |
    ReturnType<typeof removeTodolistAC>
