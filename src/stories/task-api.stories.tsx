import React, {useEffect, useState} from 'react'
import {taskAPI} from "../api/task-api";

export default {
    title: 'API Tasks'
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {

        const todoID = '16585288-15b7-4202-8b24-35975cc4258e'

        taskAPI.getTask(todoID).then(res => {
            setState(res.data)
        })
    }, [])
    return <div> {JSON.stringify(state)}</div>
}
export const CreateTasks = () => {

    const [state, setState] = useState<any>(null)

    useEffect(() => {

        const todoID = '16585288-15b7-4202-8b24-35975cc4258e'
        const title = 'First Tasks'

        taskAPI.createTasks(todoID, title)
            .then(res => {
                setState(res.data)
            })
    }, [])
    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {

        const todoID = '16585288-15b7-4202-8b24-35975cc4258e'
        const taskID = '6a83a39e-d627-467d-b39c-6e6ab9bf791f'

        taskAPI.deleteTasks(todoID, taskID)
            .then(res => {
                setState(res.data)
            })
    }, [])
    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTasksTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {

        const todoID = '16585288-15b7-4202-8b24-35975cc4258e'
        const taskID = '1965137d-fb56-409c-b214-53e5fe64a4ac'
        const title = 'Изменено'

        taskAPI.updateTasks(todoID, taskID, title)
            .then(res => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

