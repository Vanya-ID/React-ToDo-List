import React from "react";
import {FilterValuesType, TaskType} from "./App";

type  ToDoListProprsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskID : number) => void
    changeTodoListFilter: (newFilterValue: FilterValuesType) => void
}

function ToDoList(props: ToDoListProprsType) {

    const tasks = props.tasks.map(t => {
        const removeTask = ()=> props.removeTask(t.id)
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

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
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