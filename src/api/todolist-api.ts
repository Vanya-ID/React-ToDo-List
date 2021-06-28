import axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    withCredentials: true,
    headers: {
        "API-KEY": "6c29e1e8-fc4e-43a9-8828-21203c5a484c"
    }
})

type CommonType<T= {}> = {
    resultCode: number
    messages: string[]
    fieldsErrors: string[]
    data: T
}

type ToDoType = {
    id: string
    title: string
    addedDate: string
    order: number
}

export const toDoListAPI = {
    getToDo() {
        return instance.get<Array<ToDoType>>('/todo-lists')
    },
    createToDo(title: string) {
        return instance.post<Array<CommonType<{ item: ToDoType }>>>('/todo-lists', {title: title})
    },
    deleteToDo(toDoID: string) {
        return instance.delete<Array<CommonType>>(`/todo-lists/${toDoID}`)
    },
    updateToDo(toDoID: string, title: string) {
        return instance.put<Array<CommonType>>(`/todo-lists/${toDoID}`, {title: title})
    }
}