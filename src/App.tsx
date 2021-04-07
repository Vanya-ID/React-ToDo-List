import React from 'react';
import './App.css';
import ToDoList from "./ToDoList";

export  type  TaskType = {
    id: number
    title : string
    isDone: boolean
}

function App() {

    const tasksToLearn: Array<TaskType> = [
        {id:0, title:'HTML', isDone:true },
        {id:1, title:'JS', isDone:true },
        {id:2, title:'React', isDone:false }
    ]

    const tasksToBuy: Array<TaskType> = [
        {id:3, title:'Beer', isDone:true },
        {id:4, title:'Water', isDone:false },
        {id:5, title:'Beaf', isDone:true }
    ]


    return (
        <div className="App">
           <ToDoList title={'First one'} tasks={tasksToLearn}/>
           <ToDoList title={'Next'} tasks={tasksToBuy}/>

        </div>
    );
}

export default App;
