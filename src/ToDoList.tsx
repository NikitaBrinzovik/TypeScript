import React, {useState, KeyboardEvent, ChangeEvent, MouseEvent} from "react";
import {FilterValuesType, TaskType} from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";

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
    // const [title, setTitle] = useState("")
    // const [error, setError] = useState<boolean>(false)
    // const onClickAddTask = () => {
    //     const trimmedTitle = title.trim()
    //     if (trimmedTitle) {
    //         props.addTask(trimmedTitle, props.todoListID)
    //     } else {
    //         setError(true)
    //     }
    //     setTitle("")
    // }
    // const onKeyPressAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
    //     if (e.key === "Enter") {
    //         onClickAddTask()
    //     }
    // }
    // const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    //     setTitle(e.currentTarget.value)
    //     setError(false)
    // }
    // const onClickActiveFilter = () => props.changeFilter("active")
    // const onClickCompletedFilter = () => props.changeFilter("completed")
    // const errorMessage = error
    //     ? <div style={{color: "red", border: "1px solid firebrick", borderRadius: "5px"}}>Найн!</div>
    //     : null

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
            <li className={taskClasses} key={t.id}>
                <input
                    onChange={changeTaskStatus}
                    type="checkbox"
                    checked={t.isDone}
                />
                {/*<span>{t.title}</span>*/}
                <EditableSpan title={t.title} changeTitle={changeTaskTitle}/>
                <button onClick={removeTask}>-</button>
            </li>
        )
    })


    const onClickChangeFilter = (e: MouseEvent<HTMLButtonElement>) =>
        props.changeFilter(e.currentTarget.name, props.todoListID)

    const onClickRemoveTodoList = () => props.removeTodoList(props.todoListID)

    const changeTodoListTitle =(title: string) => props.changeTodoListTitle(title, props.todoListID)

    return (
        <div>
            <h3>
                <EditableSpan title={props.title} changeTitle={changeTodoListTitle} />
                <button onClick={onClickRemoveTodoList}>x</button>
            </h3>
            <AddItemForm addItem={addTask}/>
            {/*<div>*/}
            {/*    <input className={error ? "error" : ""}*/}
            {/*           value={title}*/}
            {/*        //value={error ? "xxx" : title}*/}
            {/*           onChange={onChangeTitle}*/}
            {/*           onKeyPress={onKeyPressAddTask}*/}

            {/*    />*/}
            {/*    <button onClick={onClickAddTask}>+</button>*/}
            {/*    {errorMessage}*/}
            {/*</div>*/}
            <ul>
                {tasksJSXElement}
                {/*<li><input type="checkbox" checked={props.tasks[0].isDone}/> <span>{props.tasks[0].title}</span></li>*/}
                {/*<li><input type="checkbox" checked={props.tasks[1].isDone}/> <span>{props.tasks[1].title}</span></li>*/}
                {/*<li><input type="checkbox" checked={props.tasks[2].isDone}/> <span>{props.tasks[2].title}</span></li>*/}
            </ul>
            <div>
                <button name="all" onClick={onClickChangeFilter}
                        className={filter === "all" ? "active-filter" : ""}>All
                </button>
                {/*<button  onClick={onClickActiveFilter}>Active</button>*/}
                <button name="active" onClick={onClickChangeFilter}
                        className={filter === "active" ? "active-filter" : ""}>Active
                </button>
                <button name="completed" onClick={onClickChangeFilter}
                        className={filter === "completed" ? "active-filter" : ""}>Completed
                </button>
            </div>
        </div>

    )
}

export default ToDoList;