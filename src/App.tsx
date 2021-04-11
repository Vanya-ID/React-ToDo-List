import React, {useState} from 'react';
import './App.css';
import ToDoList from "./ToDoList";

export  type  TaskType = {
    id: number
    title: string
    isDone: boolean
}

export type FilterValuesType = "all" | "active" | "completed";

function App() {

    // const tasks: Array<TaskType> = [
    //     {id: 0, title: 'HTML', isDone: true},
    //     {id: 1, title: 'JS', isDone: true},
    //     {id: 2, title: 'React', isDone: false}
    // ]

    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: 0, title: 'HTML', isDone: true},
        {id: 1, title: 'JS', isDone: true},
        {id: 2, title: 'React', isDone: false}
    ]);

    function removeTask(taskID : number) {
        setTasks(tasks.filter(t=> t.id !==taskID))
    }

    const [todoListFilter, setTodoListFilter] = useState<FilterValuesType>("all");

    function changeTodoListFilter(newFilterValue: FilterValuesType) {
        setTodoListFilter(newFilterValue)
    }

    function getTasksForTodoList() {
        switch (todoListFilter) {
            case "active":
                return tasks.filter(t => t.isDone === false);
            case "completed":
                return tasks.filter((t => t.isDone === true))
            default:
                return tasks
        }
    }

    return (
        <div className="App">
            <ToDoList
                title={'First one'}
                tasks={getTasksForTodoList()}
                removeTask={removeTask}
                changeTodoListFilter={changeTodoListFilter}
            />
        </div>
    );
}

export default App;
