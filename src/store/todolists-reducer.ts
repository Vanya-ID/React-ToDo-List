import {FilterValuesType, ToDoListType} from "../App";
import {v1} from "uuid";

type RemoveToDoListAT = {
    type: 'REMOVE-TODOLIST'
    todoListID: string
}
type AddToDoListAT = {
    type: 'ADD-TODOLIST'
    title: string
}
type ChangeTodoListTitleAT = {
    type: 'CHANGE-TODOLIST-TITLE'
    title: string
    todoListID: string
}
type ChangeTodoListFilterAT = {
    type: 'CHANGE-TODOLIST-FILTER'
    newFilterValue: FilterValuesType
    todoListID: string
}

export type ActionUnionType = RemoveToDoListAT | AddToDoListAT | ChangeTodoListTitleAT | ChangeTodoListFilterAT

export const toDoListsReducer = (toDoLists: Array<ToDoListType>, action: ActionUnionType): Array<ToDoListType> => {
    switch (action.type) {

        case "REMOVE-TODOLIST":
            return toDoLists.filter(tl => tl.id !== action.todoListID)

        case "ADD-TODOLIST":
            const newToDoListID = v1()
            const newToDoList: ToDoListType = {id: newToDoListID, title: action.title, filter: 'all'}
            return [...toDoLists, newToDoList]

        case "CHANGE-TODOLIST-TITLE":
            return toDoLists.map(tl => tl.id === action.todoListID ? {...tl, title: action.title} : tl)

        case "CHANGE-TODOLIST-FILTER":
            return toDoLists.map(tl => tl.id === action.todoListID ? {...tl, filter: action.newFilterValue} : tl)

        default:
            return toDoLists
    }
}

export const RemoveTodoListAC = (todoListID: string): RemoveToDoListAT => ({
    type: "REMOVE-TODOLIST",
    todoListID: todoListID
})
export const AddTodoListAC = (title: string): AddToDoListAT => ({
    type: "ADD-TODOLIST",
    title: title
})
export const ChangeTodoListTitleAC = (todoListID: string, title: string): ChangeTodoListTitleAT => ({
    type: "CHANGE-TODOLIST-TITLE",
    title: title,
    todoListID: todoListID
})
export const ChangeTodoListFilterAC = (todoListID: string, newFilterValue: FilterValuesType): ChangeTodoListFilterAT => ({
    type: "CHANGE-TODOLIST-FILTER",
    newFilterValue: newFilterValue,
    todoListID: todoListID
})

