import React, {useReducer, useState} from 'react';
import './App.css';
import ToDoList from "./ToDoList";
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";
import {AppBar, IconButton, Typography, Toolbar, Button, Container, Grid, Paper} from "@material-ui/core";
import {Menu} from '@material-ui/icons';
import {
    AddToDoListActionCreator,
    ChangeFilterToDoListActionCreator,
    ChangeTitleActionCreator,
    RemoveToDoListActionCreator,
    toDoListReducer
} from "./STATE/ToDoList-reducers";
import {
    addTaskActionCreator,
    changeTaskStatusActionCreator, changeTaskTitleActionCreator,
    removeTaskActionCreator,
    tasksReducer
} from "./STATE/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./STATE/STORE";


export type TaskType = {
    title: string
    isDone: boolean
    id: string

}
export type FilterValuesType = string
export type ToDoListType = {
    id: string
    title: string
    filter: FilterValuesType
}
//стейт для тасек
export type TasksStateType = {
    [key: string]: Array<TaskType>
}


function AppWithRedux() {

    const dispatch = useDispatch()
    const toDoList = useSelector<AppRootStateType, Array<ToDoListType>>(state => state.toDoLists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)


    function removeTasks(taskID: string, toDoListID: string) {
        const action = removeTaskActionCreator(taskID, toDoListID);
        dispatch(action)
    }

    function addTask(title: string, toDoListID: string) {
        const action = addTaskActionCreator(title, toDoListID);
        dispatch(action);

    }

    function changeTaskStatus(taskID: string, newIsDoneValue: boolean, toDoListID: string) {
        const action = changeTaskStatusActionCreator(taskID, newIsDoneValue, toDoListID)
        dispatch(action);
    }

    function changeTaskTitle(taskID: string, newTitle: string, toDoListID: string) {
        //короткая запись:
        dispatch(changeTaskTitleActionCreator(taskID, newTitle, toDoListID));
    }

    //functions for to do list:
    function changeFilter(value: FilterValuesType, toDoListID: string) { //FilterValueType
        const action = ChangeFilterToDoListActionCreator(toDoListID, value)
        dispatch(action);
    }

    function changeToDoListTitle(title: string, toDoListID: string) {
        const action = ChangeTitleActionCreator(title, toDoListID)
        dispatch(action);
    }

    function removeToDoLIst(toDoListID: string) {
        const action = RemoveToDoListActionCreator(toDoListID)
        dispatch(action)
    }

    function addToDoList(title: string) {
        const action = AddToDoListActionCreator(title)
        dispatch(action)

    }

//UI:
    function getTaskForToDoList(ToDoList: ToDoListType) {
        //let taskFoToDoList = tasks
        switch (ToDoList.filter) {
            case "active":
                //taskFoToDoList =
                return tasks[ToDoList.id].filter(t => !t.isDone)
                break;
            case "completed":
                return tasks[ToDoList.id].filter(t => t.isDone)
                break;
        }
        return tasks[ToDoList.id]
    }

    const toDoListComponents = toDoList.map(tl => {
            return (
                <Grid item key={tl.id}>
                    <Paper elevation={5} style={{padding: "20px"}}>
                        <ToDoList

                            toDoListID={tl.id}
                            title={tl.title}
                            tasks={getTaskForToDoList(tl)}
                            addTask={addTask}
                            removeTask={removeTasks}
                            changeFilter={changeFilter}
                            filter={tl.filter}
                            changeTaskStatus={changeTaskStatus}
                            removeToDoList={removeToDoLIst}
                            changeTaskTitle={changeTaskTitle}
                            changeToDoListTitle={changeToDoListTitle}

                        />
                    </Paper>
                </Grid>
            )
        }
    )
    return (
        //JSX:
        <div className="App">
            <AppBar position="static">
                <Toolbar style={{justifyContent: "space-between"}}>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        ToDoList
                    </Typography>
                    <Button color="inherit" variant={"outlined"}> Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed style={{padding: "10px"}}>
                <Grid container style={{padding: '20px 0px'}}>

                    <AddItemForm addItem={addToDoList}/>
                </Grid>
                <Grid container spacing={3}>
                    {toDoListComponents}
                </Grid>

            </Container>

        </div>
    );
}

export default AppWithRedux;
