import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import EditableSpan from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskType} from "./AppWithReducers";

export type TasksPropsType = {
    task: TaskType
    todoListID: string
    removeTask: (taskID: string, todoListID: string) => void
    changeTasksStatus: (taskID: string, newIsDoneValue: boolean, todoListID: string) => void
    changeTasksTitle: (taskID: string, newTitle: string, todoListID: string) => void
}

const Tasks = React.memo((props: TasksPropsType) => {

    const {task, removeTask, changeTasksStatus, changeTasksTitle, todoListID} = props

    const removeTaskHandler = useCallback(() => removeTask(task.id, todoListID), [task, todoListID, removeTask])
    const changeTaskStatus = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        changeTasksStatus(task.id, e.currentTarget.checked, todoListID)
    }, [task, todoListID, changeTasksStatus])
    const changeTaskTitle = useCallback((title: string) => {
        changeTasksTitle(task.id, title, todoListID)
    }, [task, todoListID, changeTasksTitle])

    return (
        <li>
                <span className={task.isDone ? "isDone" : ""}>
                    <Checkbox
                        color={"primary"}
                        onChange={changeTaskStatus}
                        checked={task.isDone}/>
                    <EditableSpan title={task.title} changeTitle={changeTaskTitle}/>
                </span>
            <IconButton onClick={removeTaskHandler} color={"secondary"}>
                <Delete fontSize={"small"}/>
            </IconButton>
        </li>
    )
})
export default Tasks