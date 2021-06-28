import {FilterValuesType} from "../App";
import {v1} from "uuid";
import {ToDoListType} from "../AppWithRedux";

export type RemoveToDoListAT = {
    type: 'REMOVE-TODOLIST'
    todoListID: string
}
export  type AddToDoListAT = {
    type: 'ADD-TODOLIST'
    title: string
    todolistID: string
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

export const toDoListID_1 = v1();
export const toDoListID_2 = v1();

let initialState: Array<ToDoListType> = [
    {id: toDoListID_1, title: 'What to learn', filter: 'all'},
    {id: toDoListID_2, title: 'What to buy', filter: 'all'}
]


export const toDoListsReducer = (toDoLists = initialState, action: ActionUnionType): Array<ToDoListType> => {
    switch (action.type) {

        case "REMOVE-TODOLIST":
            return toDoLists.filter(tl => tl.id !== action.todoListID)

        case "ADD-TODOLIST":
            return [...toDoLists, {id: action.todolistID, title: action.title, filter: "all"}]

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
    title: title,
    todolistID: v1()
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

