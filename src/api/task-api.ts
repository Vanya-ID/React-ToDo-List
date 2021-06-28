import axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/todo-lists',
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

type TaskType = {
    description: string
    title: string
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

export type UpdateModelTaskType = {
    description: string
    title: string
    status: number
    startDate: string
    priority: number
    deadline: string
}

type GetTasksRes = {
    error: string | null
    totalCount: number
    items: TaskType[]
}

export const taskAPI = {
    getTask(toDoID: string) {
        return instance.get<GetTasksRes>(`/${toDoID}/tasks`)
    },
    createTasks(toDoID: string, title: string) {
        return instance.post<CommonType<TaskType>>(`/${toDoID}/tasks`, {title: title})
    },
    deleteTasks(toDoID: string, taskID: string) {
        return instance.delete<CommonType>(`/${toDoID}/tasks/${taskID}`)
    },
    updateTasks(toDoID: string, taskID: string, model: UpdateModelTaskType) {
        return instance.put<CommonType>(`/${toDoID}/tasks/${taskID}`, model)
    }
}