import React, {useCallback} from 'react';
import './App.css';
import ToDoList from "./ToDoList";
import AddItemForm from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    AddTodoListAC,
    ChangeTodoListFilterAC,
    ChangeTodoListTitleAC,
    RemoveTodoListAC,
} from "./store/todolists-reducer";
import {AddTaskAC, ChangeTasksStatusAC, ChangeTasksTitleAC, RemoveTaskAC} from "./store/tasks-reducer";
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
    const toDoLists = useSelector<AppRootStateType, Array<ToDoListType>>(state => state.toDoLists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)

    const dispatch = useDispatch()

    const removeTask = useCallback((taskID: string, todoListID: string) => {
        dispatch(RemoveTaskAC(taskID, todoListID))
    }, [dispatch])

    const addTask = useCallback((title: string, todoListID: string) => {
        dispatch(AddTaskAC(todoListID, title))
    }, [dispatch])

    const changeTasksStatus = useCallback((taskID: string, newIsDoneValue: boolean, todoListID: string) => {
        dispatch(ChangeTasksStatusAC(taskID, newIsDoneValue, todoListID))
    }, [dispatch])

    const changeTasksTitle = useCallback((taskID: string, newTitle: string, todoListID: string) => {
        dispatch(ChangeTasksTitleAC(taskID, newTitle, todoListID))
    }, [dispatch])

    // toDoLists:
    const changeTodoListFilter = useCallback((newFilterValue: FilterValuesType, todoListID: string) => {
        dispatch(ChangeTodoListFilterAC(todoListID, newFilterValue))
    }, [dispatch])

    const changeTodoListTitle = useCallback((title: string, todoListID: string) => {
        dispatch(ChangeTodoListTitleAC(todoListID, title))
    }, [dispatch])

    const removeToDoList = useCallback((todoListID: string) => {
        dispatch(RemoveTodoListAC(todoListID))
        delete tasks[todoListID]
    }, [dispatch])

    const addToDoList = useCallback((title: string) => {
        dispatch(AddTodoListAC(title))
    }, [dispatch])


    // UI:


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
                        tasks={tasks[tl.id]}
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
