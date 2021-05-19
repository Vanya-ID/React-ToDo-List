import React, {useState, KeyboardEvent, ChangeEvent} from "react";
import {FilterValuesType, TaskType} from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

type  ToDoListProprsType = {
    todoListID: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    addTask: (title: string, todoListID: string) => void
    removeTask: (taskID: string, todoListID: string) => void
    removeToDoList: (todoListID: string) => void
    changeTodoListFilter: (newFilterValue: FilterValuesType, todoListID: string) => void
    changeTasksStatus: (taskID: string, newIsDoneValue: boolean, todoListID: string) => void
    changeTasksTitle: (taskID: string, newTitle: string, todoListID: string) => void
    changeTodoListTitle: (title: string, todoListID: string) => void
}

function ToDoList(props: ToDoListProprsType) {
    const {filter} = props
// const filter = props.filter


    const JSXTasks = props.tasks.map(t => {

        const removeTask = () => props.removeTask(t.id, props.todoListID)
        const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeTasksStatus(t.id, e.currentTarget.checked, props.todoListID)
        }
        const changeTaskTitle = (title: string) => {
            props.changeTasksTitle(t.id, title, props.todoListID)
        }

        return (
            <li
                key={t.id}>
                <span className={t.isDone ? "isDone" : ""}>
                    <Checkbox
                        color={"primary"}
                        onChange={changeTaskStatus}
                        checked={t.isDone}/>
                    <EditableSpan title={t.title} changeTitle={changeTaskTitle}/>
                </span>
                <IconButton onClick={removeTask} color={"secondary"}>
                    <Delete fontSize={"small"}/>
                </IconButton>
            </li>
        )
    })

    const setAllFilterValue = () => props.changeTodoListFilter("all", props.todoListID);
    const setActiveFilterValue = () => props.changeTodoListFilter("active", props.todoListID);
    const setCompletedFilterValue = () => props.changeTodoListFilter("completed", props.todoListID);

    const addTask = (title: string) => props.addTask(title, props.todoListID)

    const deleteToDoListOnClick = () => {
        props.removeToDoList(props.todoListID);
    }

    const changeTodoListTitle = (title: string) => {
        props.changeTodoListTitle(title, props.todoListID)
    }


    return (
        <div>
            <h3>
                <EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>
                <IconButton onClick={deleteToDoListOnClick} color={"secondary"}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <ul style={{listStyle: "none", paddingLeft: '0'}}>
                {JSXTasks}
            </ul>
            <div>
                <Button
                    size={"small"}
                    variant={filter === "all" ? "contained" : 'outlined'}
                    color={"primary"}
                    onClick={setAllFilterValue}>
                    All
                </Button>
                <Button
                    size={"small"}
                    variant={filter === "active" ? "contained" : 'outlined'}
                    color={"primary"}
                    style={{marginLeft: '5px'}}
                    onClick={setActiveFilterValue}>
                    Active
                </Button>
                <Button
                    size={"small"}
                    variant={filter === "completed" ? "contained" : 'outlined'}
                    color={"primary"}
                    style={{marginLeft: '5px'}}
                    onClick={setCompletedFilterValue}>
                    Completed
                </Button>
            </div>
        </div>
    )
}

export default ToDoList;