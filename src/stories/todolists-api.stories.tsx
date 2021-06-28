import React, {useEffect, useState} from 'react'
import axios from 'axios';
import {toDoListAPI} from "../api/todolist-api";

export default {
    title: 'API'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        toDoListAPI.getToDo().then(res => {
            setState(res.data)
        })
    }, [])
    return <div> {JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {

    const [state, setState] = useState<any>(null)

    useEffect(() => {
        const title = 'new Title'
        toDoListAPI.createToDo(title)
            .then(res => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {

        const id = '0b1fb9c5-a1be-4487-b7a1-381d89ef8acb'

        toDoListAPI.deleteToDo(id)
            .then(res => {
                setState(res.data)
            })
    }, [])
    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {

    const [state, setState] = useState<any>(null)

    useEffect(() => {
        const id = "16585288-15b7-4202-8b24-35975cc4258e"
        const title = 'Second One'
        toDoListAPI.updateToDo(id, title)
            .then(res => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

