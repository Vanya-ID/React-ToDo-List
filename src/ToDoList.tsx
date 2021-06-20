import React, { useCallback} from "react";
import {FilterValuesType, TaskType} from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button,  IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import Tasks from "./Tasks";

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

const ToDoList = React.memo((props: ToDoListProprsType) => {
    const {filter} = props
// const filter = props.filter
    const getTasksForTodoList = () => {
        switch (props.filter) {
            case "active":
                return props.tasks.filter(t => !t.isDone);
            case "completed":
                return props.tasks.filter((t => t.isDone))
            default:
                return props.tasks
        }
    }

    let newTasks = getTasksForTodoList();

    const JSXTasks = newTasks.map(t => {
        return (
            <Tasks
                key={t.id}
                task={t}
                todoListID={props.todoListID}
                removeTask={props.removeTask}
                changeTasksStatus={props.changeTasksStatus}
                changeTasksTitle={props.changeTasksTitle}
            />
        )
    })

    const setAllFilterValue = useCallback(() =>
        props.changeTodoListFilter("all", props.todoListID), [props.todoListID]);

    const setActiveFilterValue = useCallback(() =>
        props.changeTodoListFilter("active", props.todoListID), [props.todoListID]);

    const setCompletedFilterValue = useCallback(() =>
        props.changeTodoListFilter("completed", props.todoListID), [props.todoListID]);

    const addTask = useCallback((title: string) => props.addTask(title, props.todoListID),
        [props.addTask, props.todoListID])

    const deleteToDoListOnClick = useCallback(() => {
        props.removeToDoList(props.todoListID);
    }, [props.todoListID])

    const changeTodoListTitle = useCallback((title: string) => {
        props.changeTodoListTitle(title, props.todoListID)
    }, [props.todoListID])


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
})

export default ToDoList;