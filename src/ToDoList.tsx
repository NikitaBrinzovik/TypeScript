import React, {useState, KeyboardEvent, ChangeEvent, MouseEvent} from "react";
import {FilterValuesType, TaskType} from "./App";

type ToDoListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskID: string) => void
    addTask: (taskID: string) => void
    changeFilter: (value: string) => void //FilterValueType
}

function ToDoList(props: ToDoListPropsType) {
    const [title, setTitle] = useState("")
    const tasksJSXElement = props.tasks.map(t => {
        const removeTask = () => { props.removeTask(t.id) }
        return (
            <li>
                <input type="checkbox" checked={t.isDone}/>
                <span>{t.title}</span>
                <button onClick={removeTask}>-</button>
            </li>
        )
    })

    const onClickAddTask = () => {
        props.addTask(title)
        setTitle("")
    }
    const onKeyPressAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        if(e.key === "Enter") {
            onClickAddTask()
        }
    }
    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)
    const onClickChangeFilter = (e: MouseEvent<HTMLButtonElement>) => props.changeFilter(e.currentTarget.name)
    // const onClickActiveFilter = () => props.changeFilter("active")
    // const onClickCompletedFilter = () => props.changeFilter("completed")

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    value={title}
                    onChange={onChangeTitle}
                    onKeyPress={onKeyPressAddTask}
                />
                <button onClick={onClickAddTask}>+</button>
            </div>
            <ul>
                {tasksJSXElement}
                {/*<li><input type="checkbox" checked={props.tasks[0].isDone}/> <span>{props.tasks[0].title}</span></li>*/}
                {/*<li><input type="checkbox" checked={props.tasks[1].isDone}/> <span>{props.tasks[1].title}</span></li>*/}
                {/*<li><input type="checkbox" checked={props.tasks[2].isDone}/> <span>{props.tasks[2].title}</span></li>*/}
            </ul>
            <div>
                <button name="all" onClick={onClickChangeFilter}>All</button>
                {/*<button  onClick={onClickActiveFilter}>Active</button>*/}
                <button name="active" onClick={onClickChangeFilter}>Active</button>
                <button name="completed" onClick={onClickChangeFilter}>Completed</button>
            </div>
        </div>

    )
}

export default ToDoList;