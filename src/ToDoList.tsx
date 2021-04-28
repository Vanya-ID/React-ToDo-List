import React, {useState, KeyboardEvent, ChangeEvent} from "react";
import {FilterValuesType, TaskType} from "./App";

type  ToDoListProprsType = {
    todoListID: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    addTask: (title: string, todoListID: string) => void
    removeTask: (taskID: string, todoListID: string) => void
    deleteToDoList:(todoListID: string)=>void
    changeTodoListFilter: (newFilterValue: FilterValuesType, todoListID: string) => void
    changeTasksStatus: (taskID: string, newIsDoneValue: boolean, todoListID: string) => void
}

function ToDoList(props: ToDoListProprsType) {
    const {filter} = props
// const filter = props.filter

    const [title, setTitle] = useState<string>('');
    const [error, setError] = useState<boolean>(false);


    const JSXTasks = props.tasks.map(t => {

        const removeTask = () => props.removeTask(t.id,props.todoListID)

        return (
            <li className={t.isDone ? "isDone" : ""}
                key={t.id}>
                <input
                    onChange={(e) =>
                        props.changeTasksStatus(t.id, e.currentTarget.checked, props.todoListID)}
                    type="checkbox"
                    checked={t.isDone}/>
                <span>{t.title}</span>
                <button onClick={removeTask}>X</button>
            </li>
        )
    })

    const setAllFilterValue = () => props.changeTodoListFilter("all", props.todoListID);
    const setActibeFilterValue = () => props.changeTodoListFilter("active", props.todoListID);
    const setCompletedFilterValue = () => props.changeTodoListFilter("completed", props.todoListID);

    const onClickAddTask = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addTask(trimmedTitle, props.todoListID)
        } else {
            setError(true)
        }
        setTitle("")
    }

    const onKeyPressAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onClickAddTask()
        }
    }

    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(false)
    }

    const deleteToDoListonClick =()=>{
        props.deleteToDoList(props.todoListID);
    }

    const errorMessage = error ? "title is required!" : null

    return (
        <div>
            <h3>
                {props.title}
                <button onClick={deleteToDoListonClick}>X</button>
            </h3>
            <div>
                <input
                    className={error ? 'error' : ' '}
                    value={title}
                    onChange={onChangeTitle}
                    onKeyPress={onKeyPressAddTask}
                />
                <button onClick={onClickAddTask}>+</button>
                <div className={'errorMessage'}>{errorMessage}</div>
            </div>
            <ul>
                {JSXTasks}
            </ul>
            <div>
                <button className={filter === "all" ? "activeFilter" : ''} onClick={setAllFilterValue}>
                    All
                </button>
                <button className={filter === "active" ? "activeFilter" : ''} onClick={setActibeFilterValue}>
                    Active
                </button>
                <button className={filter === "completed" ? "activeFilter" : ''} onClick={setCompletedFilterValue}>
                    Completed
                </button>
            </div>
        </div>
    )
}

export default ToDoList;