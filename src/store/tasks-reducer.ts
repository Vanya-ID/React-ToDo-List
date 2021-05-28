import {TasksStateType, TaskType, ToDoListType} from "../App";
import {v1} from "uuid";
import {AddToDoListAT, RemoveToDoListAT} from "./todolists-reducer";

type RemoveTaskAT = {
    type: 'REMOVE-TASK'
    todoListID: string
    taskID: string
}
type AddTaskAT = {
    type: 'ADD-TASK'
    title: string
    todoListID: string
}
type ChangeTasksStatusAT = {
    type: 'CHANGE-TASK-STATUS'
    taskID: string
    newIsDoneValue: boolean
    todoListID: string
}
type ChangeTasksTitleAT = {
    type: 'CHANGE-TASK-TITLE'
    taskID: string
    newTitle: string
    todoListID: string
}


export type ActionUnionType = RemoveTaskAT |
    AddTaskAT |
    ChangeTasksStatusAT |
    ChangeTasksTitleAT |
    AddToDoListAT |
    RemoveToDoListAT

export const tasksReducer = (tasks: TasksStateType, action: ActionUnionType): TasksStateType => {
    switch (action.type) {

        case "REMOVE-TASK":
            return {...tasks, [action.todoListID]: tasks[action.todoListID].filter(t => t.id !== action.taskID)}


        case "ADD-TASK":
            const newTask: TaskType = {
                id: v1(),
                title: action.title,
                isDone: false
            }
            return {...tasks, [action.todoListID]: [newTask, ...tasks[action.todoListID]]}

        case "CHANGE-TASK-STATUS":
            return {
                ...tasks,
                [action.todoListID]: tasks[action.todoListID].map(t =>
                    t.id === action.taskID ? {...t, isDone: action.newIsDoneValue} : t)
            }

        case "CHANGE-TASK-TITLE":
            return {
                ...tasks,
                [action.todoListID]: tasks[action.todoListID].map(t =>
                    t.id === action.taskID ? {...t, title: action.newTitle} : t)
            }

        case "ADD-TODOLIST":
            return {
                ...tasks,
                [action.todolistID]: []
            }
        case "REMOVE-TODOLIST":
            let copyState = {...tasks};
            delete copyState[action.todoListID]
            return copyState

        default:
            return tasks
    }
}

export const RemoveTaskAC = (taskID: string, todoListID: string): RemoveTaskAT => {
    return {
        type: "REMOVE-TASK",
        todoListID: todoListID,
        taskID: taskID
    }
}
export const AddTaskAC = (todoListID: string, title: string): AddTaskAT => {
    return {
        type: "ADD-TASK",
        title: title,
        todoListID: todoListID
    }
}
export const ChangeTasksStatusAC = (taskID: string, newIsDoneValue: boolean, todoListID: string): ChangeTasksStatusAT => {
    return {
        type: "CHANGE-TASK-STATUS",
        taskID: taskID,
        newIsDoneValue: newIsDoneValue,
        todoListID: todoListID
    }
}
export const ChangeTasksTitleAC = (taskID: string, newTitle: string, todoListID: string): ChangeTasksTitleAT => {
    return {
        type: "CHANGE-TASK-TITLE",
        taskID: taskID,
        newTitle: newTitle,
        todoListID: todoListID
    }
}

