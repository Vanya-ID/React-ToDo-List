import React, {useState} from 'react';
import './App.css';
import ToDoList from "./ToDoList";
import {v1} from 'uuid';
import AddItemForm from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValuesType = "all" | "active" | "completed";


type ToDoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TaskStateType = {
    [key: string]: Array<TaskType>
}

function App() {
    const toDoListID_1 = v1();
    const toDoListID_2 = v1();

    const [toDoLists, setToDoLists] = useState<Array<ToDoListType>>([
        {id: toDoListID_1, title: 'What to learn', filter: 'all'},
        {id: toDoListID_2, title: 'What to buy', filter: 'all'}
    ])

    const [tasks, setTasks] = useState<TaskStateType>({
        [toDoListID_1]: [
            {id: v1(), title: 'HTML', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'React', isDone: false}
        ],
        [toDoListID_2]: [
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'Bread', isDone: true},
            {id: v1(), title: 'Cola', isDone: false}
        ]
    })


    function removeTask(taskID: string, todoListID: string) {
        // tasks[todoListID] =  tasks[todoListID].filter(t => t.id !== taskID);
        setTasks({...tasks, [todoListID]: tasks[todoListID].filter(t => t.id !== taskID)});
    }

    function addTask(title: string, todoListID: string) {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }
        setTasks({...tasks, [todoListID]: [newTask, ...tasks[todoListID]]})
    }

    function changeTasksStatus(taskID: string, newIsDoneValue: boolean, todoListID: string) {
        // tasks[todoListID] = tasks[todoListID].map(t => t.id === taskID ? {...t, isDone: newIsDoneValue} : t)
        setTasks({
            ...tasks,
            [todoListID]: tasks[todoListID].map(t => t.id === taskID ? {...t, isDone: newIsDoneValue} : t)
        })
    }

    function changeTasksTitle(taskID: string, newTitle: string, todoListID: string) {
        // tasks[todoListID] = tasks[todoListID].map(t => t.id === taskID ? {...t, isDone: newIsDoneValue} : t)
        setTasks({
            ...tasks,
            [todoListID]: tasks[todoListID].map(t => t.id === taskID ? {...t, title: newTitle} : t)
        })
    }

    function changeTodoListFilter(newFilterValue: FilterValuesType, todoListID: string) {
        setToDoLists(toDoLists.map(tl => tl.id === todoListID ? {...tl, filter: newFilterValue} : tl))
    }

    function changeTodoListTitle(title: string, todoListID: string) {
        setToDoLists(toDoLists.map(tl => tl.id === todoListID ? {...tl, title: title} : tl))
    }

    function deleteToDoList(todoListID: string) {
        setToDoLists(toDoLists.filter(tl => tl.id !== todoListID))
        delete tasks[todoListID]
    }

    function addToDoList(title: string) {
        const newToDoListID = v1()
        const newToDoList: ToDoListType = {id: newToDoListID, title, filter: 'all'}

        setToDoLists([...toDoLists, newToDoList])
        setTasks({...tasks, [newToDoListID]: []})
    }

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
                        deleteToDoList={deleteToDoList}
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

export default App;
