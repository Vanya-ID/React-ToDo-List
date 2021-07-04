import {TasksStateType} from '../App';
import {AddTodolistActionType, RemoveTodolistActionType, SetTodoListsActionType} from './todolists-reducer';
import {TaskType, todolistsAPI, UpdateTaskModelType} from '../api/todolists-api'
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK',
    todolistId: string
    taskId: string
}

export type AddTaskActionType = {
    type: 'ADD-TASK',
    task: TaskType
}

export type UpdateTaskActionType = {
    type: 'UPDATE-TASK',
    todolistId: string
    taskId: string
    model: UpdateDomainTaskModelType
}
type ActionsType = RemoveTaskActionType | AddTaskActionType
    | UpdateTaskActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodoListsActionType
    | FetchTaskActionType

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
            const copy2 = {...state}
            copy2[action.todolistId] = action.tasks
            return copy2
        case 'SET-TODOLISTS':
            const copy = {...state}
            action.todos.forEach((t) => {
                copy[t.id] = []
            })
            return copy
        case 'REMOVE-TASK': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistId];
            stateCopy[action.todolistId] = tasks.filter(t => t.id !== action.taskId);
            return stateCopy;
        }
        case 'ADD-TASK': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.task.todoListId];
            // const newTask = [action.task, ...tasks]
            stateCopy[action.task.todoListId] = [action.task, ...tasks];
            return stateCopy;
        }
        case 'UPDATE-TASK': {
            let todolistTasks = state[action.todolistId];
            state[action.todolistId] = todolistTasks
                .map(t => t.id === action.taskId ? {...t, ...action.model} : t);
            return ({...state});
        }
        case 'ADD-TODOLIST': {
            return {
                ...state,
                [action.todolist.id]: []
            }
        }
        case 'REMOVE-TODOLIST': {
            const copyState = {...state};
            delete copyState[action.id];
            return copyState;
        }
        default:
            return state;
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', taskId: taskId, todolistId: todolistId}
}
export const addTaskAC = (task: TaskType): AddTaskActionType => {
    return {type: 'ADD-TASK', task}
}
export const updateTaskAC = (taskId: string, model: UpdateDomainTaskModelType, todolistId: string): UpdateTaskActionType => {
    return {type: 'UPDATE-TASK', model, todolistId, taskId}
}
export const fetchTaskAC = (todolistId: string, tasks: Array<TaskType>) => {
    return {type: 'SET-TASKS', todolistId, tasks} as const
}

type FetchTaskActionType = ReturnType<typeof fetchTaskAC>

// THUNK
export const fetchTasksTC = (todoID: string) => {
    return (dispatch: Dispatch) => {
        todolistsAPI.getTasks(todoID)
            .then((res) => {
                //dispatch action
                dispatch(fetchTaskAC(todoID, res.data.items))
            })
    }
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

type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: number
    priority?: number
    startDate?: string
    deadline?: string
}
export const updateTaskTC = (todoID: string,
                             taskID: string,
                             domainModel : UpdateDomainTaskModelType) => (dispatch: Dispatch,
                                                                          getState: () => AppRootStateType) => {
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