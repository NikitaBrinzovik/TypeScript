import {TaskType} from "./AppWithRedux";
import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import EditableSpan from "./EditableSpan";
import {Delete} from "@material-ui/icons";

type TaskPropsType = {
    toDoListID: string
    removeTask: (taskID: string, toDoListID: string) => void
    changeTaskStatus: (taskID: string, newIsDoneValue: boolean, toDoListID: string) => void
    changeTaskTitle: (taskID: string, newTitle: string, toDoListID: string) => void
    task: TaskType
}
export const Task = React.memo((props: TaskPropsType) => {
    console.log('1')
    const taskClasses: string = props.task.isDone ? "is-done" : "";

    const removeTask = () => {
        props.removeTask(props.task.id, props.toDoListID)
    }
    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) =>
        props.changeTaskStatus(props.task.id, e.currentTarget.checked, props.toDoListID)

    const changeTaskTitle = useCallback((title: string) => {
        props.changeTaskTitle(props.task.id, title, props.toDoListID)
    }, [props.changeTaskTitle, props.task.id, props.toDoListID])
    return (
        <div className={taskClasses} key={props.task.id}>
            <Checkbox color={"secondary"} onChange={changeTaskStatus} checked={props.task.isDone}
                      style={{opacity: "0.8"}}/>
            <EditableSpan title={props.task.title} changeTitle={changeTaskTitle}/>
            <IconButton onClick={removeTask} aria-label="delete" style={{opacity: "0.5"}}>
                <Delete/>
            </IconButton>
        </div>
    )
})