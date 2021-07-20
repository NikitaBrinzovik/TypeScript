import React, {MouseEvent, useCallback} from "react";
import {AddItemForm} from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {FilterValuesType, TaskType} from "./AppWithRedux";
import {Task} from "./Task";

export type ToDoListPropsType = {
    toDoListID: string
    title: string
    filter: string //FilterValuesType
    changeFilter: (value: FilterValuesType, toDoListID: string) => void //FilterValuesType
    tasks: Array<TaskType>
    addTask: (taskID: string, toDoListID: string) => void
    removeTask: (taskID: string, toDoListID: string) => void
    changeTaskStatus: (taskID: string, newIsDoneValue: boolean, toDoListID: string) => void
    changeTaskTitle: (taskID: string, newTitle: string, toDoListID: string) => void
    removeToDoList: (toDoListID: string) => void
    changeToDoListTitle: (title: string, toDoListID: string) => void
}

const ToDoList = React.memo((props: ToDoListPropsType) => {//закешировали ф-ию
    console.log('ToDoList is called')
    const addTask = useCallback((title: string) =>{
        props.addTask(title, props.toDoListID)
    } , [props.addTask, props.toDoListID])

    const onClickRemoveToDoList = () => props.removeToDoList(props.toDoListID)

    const changeToDoListTitle = useCallback((title: string) => {
        props.changeToDoListTitle(title, props.toDoListID)
    }, [props.changeToDoListTitle, props.toDoListID])

    const onClickChangeFilter = (e: MouseEvent<HTMLButtonElement>) =>
        props.changeFilter(e.currentTarget.name, props.toDoListID)

    // let tasks1 = getTaskForToDoList()
  /*  const onAllClickHandler = useCallback(() => props.changeFilter('all', props.toDoListID), [props.toDoListID, props.changeFilter])
    const onActiveClickHandler = useCallback(() => props.changeFilter('active', props.toDoListID), [props.toDoListID, props.changeFilter])
    const onCompletedClickHandler = useCallback(() => props.changeFilter('completed', props.toDoListID), [props.toDoListID, props.changeFilter])
    let tasksForTodolist = props.tasks
    if (props.filter === 'active') {
        tasksForTodolist = props.tasks.filter(t => t.isDone === false)
    }
    if (props.filter === 'completed') {
        tasksForTodolist = props.tasks.filter(t => t.isDone === true)
    }*/


    const tasksJSXElement = props.tasks.map(t =>
        <Task
            toDoListID={props.toDoListID}
            removeTask={props.removeTask}
            changeTaskStatus={props.changeTaskStatus}
            changeTaskTitle={props.changeTaskTitle}
            task={t}
            key={t.id}
            />
    )

   /* const getTaskForToDoList = (ToDoList: ToDoListType) => {
        //let taskFoToDoList = tasks
        switch (ToDoList.filter) {
            case "active":
                console.log('filter1')
                //taskFoToDoList =
                return props.tasks.filter(t => !t.isDone)
                break;
            case "completed":
                console.log('filter2')
                return props.tasks.filter(t => t.isDone)
                break;
        }
        return props.tasks
    }*/
    return (
        <div>
            <h3>
                <EditableSpan title={props.title} changeTitle={changeToDoListTitle}/>
                <IconButton onClick={onClickRemoveToDoList} aria-label="delete">
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <ul style={{listStyle: "none", paddingLeft: "0"}}>
                {tasksJSXElement}
            </ul>
            <div>
                <Button variant={props.filter === "all" ? "contained" : "outlined"}
                        name="all" onClick={onClickChangeFilter }
                        //name="all" onClick={onAllClickHandler}
                >All
                </Button>
                <Button variant={props.filter === "active" ? "contained" : "outlined"}
                        color={"primary"} name="active" onClick={onClickChangeFilter }
                        //color={"primary"} name="active" onClick={onActiveClickHandler}
                >Active
                </Button>
                <Button variant={props.filter === "completed" ? "contained" : "outlined"}
                        color={"secondary"} name="completed" onClick={onClickChangeFilter }
                        //color={"secondary"} name="completed" onClick={onCompletedClickHandler}
                >Completed
                </Button>
            </div>
        </div>

    )
})

export default ToDoList;

