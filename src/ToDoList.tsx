import React, {useState, KeyboardEvent, ChangeEvent, MouseEvent} from "react";
import {FilterValuesType, TaskType} from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, IconButton, Checkbox} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

type ToDoListPropsType = {
    todoListID: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskID: string, todoListID: string) => void
    addTask: (taskID: string, todoListID: string) => void
    changeFilter: (value: FilterValuesType, todoListID: string) => void //FilterValuesType
    filter: string //FilterValuesType
    changeTaskStatus: (taskID: string, newIsDoneValue: boolean, todoListID: string) => void
    removeTodoList: (todoListID: string) => void
    changeTaskTitle: (taskID: string, newTitle: string, todoListID: string) => void
    changeTodoListTitle: (title: string, todoListID: string) => void
}

function ToDoList(props: ToDoListPropsType) {

    const addTask = (title: string) => props.addTask(title, props.todoListID)

    const filter = props.filter

    const tasksJSXElement = props.tasks.map(t => {
        const taskClasses: string = t.isDone ? "is-done" : "";
        const removeTask = () => {
            props.removeTask(t.id, props.todoListID)
        }
        const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) =>
            props.changeTaskStatus(t.id, e.currentTarget.checked, props.todoListID)
        const changeTaskTitle = (title: string) => {
            props.changeTaskTitle(t.id, title, props.todoListID)
        }
        return (
            <div className={taskClasses} key={t.id}>
                <Checkbox color={"secondary"} onChange={changeTaskStatus} checked={t.isDone} style={ {opacity: "0.8"}}/>
                <EditableSpan title={t.title} changeTitle={changeTaskTitle}/>
                <IconButton onClick={removeTask} aria-label="delete" style={ {opacity: "0.5"}}>
                    <Delete/>
                </IconButton>
            </div>
        )
    })


    const onClickChangeFilter = (e: MouseEvent<HTMLButtonElement>) =>
        props.changeFilter(e.currentTarget.name, props.todoListID)

    const onClickRemoveTodoList = () => props.removeTodoList(props.todoListID)

    const changeTodoListTitle = (title: string) => props.changeTodoListTitle(title, props.todoListID)

    return (
        <div>
            <h3>
                <EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>
                <IconButton onClick={onClickRemoveTodoList} aria-label="delete">
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <ul style={ {listStyle: "none", paddingLeft: "0"}}>
                {tasksJSXElement}
            </ul>
            <div>
                <Button variant={props.filter === "all" ? "contained" : "outlined"}
                        name="all" onClick={onClickChangeFilter}
                >All
                </Button>
                <Button variant={props.filter === "active" ? "contained" : "outlined"}
                        color={"primary"} name="active" onClick={onClickChangeFilter}
                >Active
                </Button>
                <Button variant={props.filter === "completed" ? "contained" : "outlined"}
                        color={"secondary"} name="completed" onClick={onClickChangeFilter}
                >Completed
                </Button>
            </div>
        </div>

    )
}

export default ToDoList;