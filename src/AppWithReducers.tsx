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
} from "./STORE/ToDoList-reducers";
import {
    addTaskActionCreator,
    changeTaskStatusActionCreator, changeTaskTitleActionCreator,
    removeTaskActionCreator,
    tasksReducer
} from "./STORE/tasks-reducer";


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


function AppWithReducers() {
//BLL-работают с данными

    //вынесем и создадим id  в отдельные переменные
    const toDoListID_1 = v1()
    const toDoListID_2 = v1()
    //создаем лок стейт с тудулистами
    const [toDoList, dispatchToToDoListReducer] = useReducer(toDoListReducer, [
        {id: toDoListID_1, title: "what to learn", filter: "all"},
        {id: toDoListID_2, title: "what to buy", filter: "all"},
    ])
    const [tasks, dispatchToTasksReducer] = useReducer(tasksReducer, {
        [toDoListID_1]: [
            {id: v1(), isDone: true, title: "HTML"},
            {id: v1(), isDone: true, title: "CSS"},
            {id: v1(), isDone: true, title: "React"},
            {id: v1(), isDone: false, title: "TS"},
        ],
        [toDoListID_2]: [
            {id: v1(), isDone: true, title: "milk"},
            {id: v1(), isDone: true, title: "meat"},
            {id: v1(), isDone: true, title: "bread"},
            {id: v1(), isDone: false, title: "weed"},
        ],
    })

    function removeTasks(taskID: string, toDoListID: string) {
        const action = removeTaskActionCreator(taskID, toDoListID);
        dispatchToTasksReducer(action)
    }

    function addTask(title: string, toDoListID: string) {
        const action = addTaskActionCreator(title, toDoListID);
        dispatchToTasksReducer(action);

    }

    function changeTaskStatus(taskID: string, newIsDoneValue: boolean, toDoListID: string) {
        const action = changeTaskStatusActionCreator(taskID, newIsDoneValue, toDoListID)
        dispatchToTasksReducer(action);
    }

    function changeTaskTitle(taskID: string, newTitle: string, toDoListID: string) {
        //короткая запись:
        dispatchToTasksReducer(changeTaskTitleActionCreator(taskID, newTitle, toDoListID));
    }

    //functions for to do list:
    function changeFilter(value: FilterValuesType, toDoListID: string) { //FilterValueType
        const action = ChangeFilterToDoListActionCreator(toDoListID, value)
        dispatchToToDoListReducer(action);
    }

    function changeToDoListTitle(title: string, toDoListID: string) {
        const action = ChangeTitleActionCreator(title, toDoListID)
        dispatchToToDoListReducer(action);
    }

    function removeToDoLIst(toDoListID: string) {
        const action = RemoveToDoListActionCreator(toDoListID)
        dispatchToToDoListReducer(action)
        dispatchToTasksReducer(action)
    }

    function addToDoList(title: string) {
        const action = AddToDoListActionCreator(title)
        dispatchToToDoListReducer(action)
        dispatchToTasksReducer(action)

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

export default AppWithReducers;
