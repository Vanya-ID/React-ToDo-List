import React, {useState, KeyboardEvent, ChangeEvent} from "react";
import {FilterValuesType, TaskType} from "./App";

type  ToDoListProprsType = {
    title: string
    tasks: Array<TaskType>
    addTask: (title: string) => void
    removeTask: (taskID: string) => void
    changeTodoListFilter: (newFilterValue: FilterValuesType) => void
}

function ToDoList(props: ToDoListProprsType) {

    const [title, setTitle] = useState('');

    const tasks = props.tasks.map(t => {
        const removeTask = () => props.removeTask(t.id)
        return (
            <li key={t.id}>
                <input type="checkbox" checked={t.isDone}/>
                <span>{t.title}</span>
                <button onClick={removeTask}>X</button>
            </li>
        )
    })

    const setAllFilterValue = () => props.changeTodoListFilter("all");
    const setActibeFilterValue = () => props.changeTodoListFilter("active");
    const setCompletedFilterValue = () => props.changeTodoListFilter("completed");

    const onClickAddTask = () => {
        props.addTask(title)
        setTitle("")
    }

    const onKeyPressAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onClickAddTask()
        }
    }

    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    value={title}
                    onChange={onChangeTitle}
                    onKeyPress={onKeyPressAddTask}
                />
                <button onClick={onClickAddTask}>+</button>
            </div>
            <ul>
                {tasks}
            </ul>
            <div>
                <button onClick={setAllFilterValue}>
                    All
                </button>
                <button onClick={setActibeFilterValue}>
                    Active
                </button>
                <button onClick={setCompletedFilterValue}>
                    Completed
                </button>
            </div>
        </div>
    )
}

export default ToDoList;