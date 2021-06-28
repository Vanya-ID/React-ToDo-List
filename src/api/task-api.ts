import axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/todo-lists',
    withCredentials: true,
    headers: {
        "API-KEY": "6c29e1e8-fc4e-43a9-8828-21203c5a484c"
    }
})

export const taskAPI = {
    getTask(toDoID: string) {
        return instance.get(`/${toDoID}/tasks`)
    },
    createTasks(toDoID: string, title: string) {
        return instance.post(`/${toDoID}/tasks`, {title: title})
    },
    deleteTasks(toDoID: string, taskID: string) {
        return instance.delete(`/${toDoID}/tasks/${taskID}`)
    },
    updateTasks(toDoID: string, taskID: string, title: string) {
        return instance.put(`/${toDoID}/tasks/${taskID}`, {title: title})
    }
}