import React, {useState} from 'react';
import './App.css';
import ToDoList from "./ToDoList";
import {v1} from 'uuid';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValuesType = "all" | "active" | "completed";

function App() {

    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: 'HTML', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'React', isDone: false}
    ]);

    function removeTask(taskID: string) {
        setTasks(tasks.filter(t => t.id !== taskID))
    }

    function addTask(title: string) {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }
        setTasks([newTask, ...tasks])
    }

    function changeTasksStatus(taskID: string, newIsDoneValue: boolean) {
        console.log(newIsDoneValue);

        setTasks(tasks.map(t => t.id === taskID ? {...t, isDone: newIsDoneValue} : t))
    }

    const [todoListFilter, setTodoListFilter] = useState<FilterValuesType>("all");

    function changeTodoListFilter(newFilterValue: FilterValuesType) {
        setTodoListFilter(newFilterValue)
    }

    function getTasksForTodoList() {
        switch (todoListFilter) {
            case "active":
                return tasks.filter(t => !t.isDone);
            case "completed":
                return tasks.filter((t => t.isDone))
            default:
                return tasks
        }
    }

    return (
        <div className="App">
            <ToDoList
                title={'First one'}
                tasks={getTasksForTodoList()}
                filter={todoListFilter}
                addTask={addTask}
                removeTask={removeTask}
                changeTodoListFilter={changeTodoListFilter}
                changeTasksStatus={changeTasksStatus}
            />
        </div>
    );

}

export default App;
