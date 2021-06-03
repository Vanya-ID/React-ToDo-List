import React, {useReducer, useState} from 'react';
import './App.css';
import ToDoList from "./ToDoList";
import {v1} from 'uuid';
import AddItemForm from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    AddTodoListAC,
    ChangeTodoListFilterAC,
    ChangeTodoListTitleAC,
    RemoveTodoListAC,
    toDoListsReducer
} from "./store/todolists-reducer";
import {AddTaskAC, ChangeTasksStatusAC, ChangeTasksTitleAC, RemoveTaskAC, tasksReducer} from "./store/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store/store";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValuesType = "all" | "active" | "completed";


export type ToDoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {
    const toDoLists = useSelector<AppRootStateType, Array<ToDoListType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)

    const dispatch = useDispatch()

    function removeTask(taskID: string, todoListID: string) {
        dispatch(RemoveTaskAC(taskID, todoListID))
    }

    function addTask(title: string, todoListID: string) {
        dispatch(AddTaskAC(todoListID, title))
    }

    function changeTasksStatus(taskID: string, newIsDoneValue: boolean, todoListID: string) {
        dispatch(ChangeTasksStatusAC(taskID, newIsDoneValue, todoListID))
    }

    function changeTasksTitle(taskID: string, newTitle: string, todoListID: string) {
        dispatch(ChangeTasksTitleAC(taskID, newTitle, todoListID))
    }

    // toDoLists:
    function changeTodoListFilter(newFilterValue: FilterValuesType, todoListID: string) {
        dispatch(ChangeTodoListFilterAC(todoListID, newFilterValue))
    }

    function changeTodoListTitle(title: string, todoListID: string) {
        dispatch(ChangeTodoListTitleAC(todoListID, title))
    }

    function removeToDoList(todoListID: string) {
        dispatch(RemoveTodoListAC(todoListID))
        delete tasks[todoListID]
    }

    function addToDoList(title: string) {
        dispatch(AddTodoListAC(title))
    }


    // UI:
    function getTasksForTodoList(toDoList: ToDoListType) {
        switch (toDoList.filter) {
            case "active":
                return tasks[toDoList.id].filter(t => !t.isDone);
            case "completed":
                return tasks[toDoList.id].filter((t => t.isDone))
            default:
                return tasks[toDoList.id]
        }
    }


    const toDoListComponents = toDoLists.map(tl => {
        return (
            <Grid key={tl.id} item>
                <Paper elevation={3}
                       style={{padding: '10px'}}
                >
                    <ToDoList
                        key={tl.id}
                        todoListID={tl.id}
                        title={tl.title}
                        tasks={getTasksForTodoList(tl)}
                        filter={tl.filter}
                        addTask={addTask}
                        removeTask={removeTask}
                        changeTodoListFilter={changeTodoListFilter}
                        changeTasksStatus={changeTasksStatus}
                        changeTasksTitle={changeTasksTitle}
                        changeTodoListTitle={changeTodoListTitle}
                        removeToDoList={removeToDoList}
                    />
                </Paper>
            </Grid>
        )
    })

    return (
        <div>
            <AppBar position={"static"}>
                <Toolbar style={{justifyContent: 'space-between'}}>
                    <IconButton color={"inherit"}>
                        <Menu/>
                    </IconButton>
                    <Typography variant={'h6'}>
                        TodoLists
                    </Typography>
                    <Button size={"small"} variant={"outlined"} color={"inherit"}>
                        Login
                    </Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '20px 0 '}}>
                    <AddItemForm addItem={addToDoList}/>
                </Grid>
                <Grid container spacing={3}>
                    {toDoListComponents}
                </Grid>
            </Container>
        </div>
    );

}

export default AppWithRedux;
