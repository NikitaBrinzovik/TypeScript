import React, {useState} from 'react';
import './App.css';
import ToDoList from "./ToDoList";
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";
import {AppBar, IconButton, Typography, Toolbar, Button, Container, Grid, Paper} from "@material-ui/core";
import {Menu} from '@material-ui/icons';


export type TaskType = {
    title: string
    isDone: boolean
    id: string

}
export type FilterValuesType = string
export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}
//стейт для тасек
type TaskStateType = {
    [key: string]: Array<TaskType>
}


function App() {
//BLL-работают с данными

    //вынесем и создадим id  в отдельные переменные
    const todoListID_1 = v1()
    const todoListID_2 = v1()
    //создаем лок стейт с тудулистами
    const [todoList, setTodoList] = useState<Array<TodoListType>>([
        {id: todoListID_1, title: "what to learn", filter: "all"},
        {id: todoListID_2, title: "what to buy", filter: "all"},
    ])
    const [tasks, setTasks] = useState<TaskStateType>({
        [todoListID_1]: [
            {id: v1(), isDone: true, title: "HTML"},
            {id: v1(), isDone: true, title: "CSS"},
            {id: v1(), isDone: true, title: "React"},
            {id: v1(), isDone: false, title: "TS"},
        ],
        [todoListID_2]: [
            {id: v1(), isDone: true, title: "milk"},
            {id: v1(), isDone: true, title: "meat"},
            {id: v1(), isDone: true, title: "bread"},
            {id: v1(), isDone: false, title: "weed"},
        ],
    })

    function removeTasks(taskID: string, todoListID: string) {
        tasks[todoListID] = tasks[todoListID].filter((t) => t.id !== taskID)
        setTasks({...tasks})

        //setTodoList(todoList.filter(tl=>tl.id !== todoListID))
        //delete  tasks[todoListID]
        //const filterTasks = tasks.filter(t => t.id !== taskID)
        // хей UI обновись
        //setTasks(filterTasks)
    }

    function addTask(title: string, todoListID: string) {
        const newTask: TaskType = {
            id: v1(),
            //title: title, ниже запись короче
            title,
            isDone: false
        }
        //setTasks([newTask, ...tasks])
        setTasks({...tasks, [todoListID]: [newTask, ...tasks[todoListID]]})
    }

    function addTodoList(title: string) {
        const newTodoListID = v1()
        const newTodoList: TodoListType = {id: newTodoListID, title, filter: "all"}
        setTodoList([...todoList, newTodoList])
        setTasks({...tasks, [newTodoListID]: []})
    }

    function changeTaskStatus(taskID: string, newIsDoneValue: boolean, todoListID: string) {

        setTasks({
            ...tasks,
            [todoListID]: tasks[todoListID].map(t => t.id === taskID ? {...t, isDone: newIsDoneValue} : t)
        })

    }

    function changeTaskTitle(taskID: string, newTitle: string, todoListID: string) {
        setTasks({
            ...tasks,
            [todoListID]: tasks[todoListID].map(t => t.id === taskID ? {...t, title: newTitle} : t)
        })
    }

    function changeFilter(value: FilterValuesType, todoListID: string) { //FilterValueType
        setTodoList(todoList.map(tl => tl.id === todoListID ? {...tl, filter: value} : tl))
    }

    function changeTodoListTitle(title: string, todoListID: string) {
        setTodoList(todoList.map(tl => tl.id === todoListID ? {...tl, title: title} : tl))
    }

    function removeTodoLIst(todoListID: string) {
        setTodoList(todoList.filter(tl => tl.id !== todoListID))
        delete tasks[todoListID]

    }

//UI:
    function getTaskForTODoList(TodoList: TodoListType) {
        //let taskFoToDoList = tasks
        switch (TodoList.filter) {
            case "active":
                //taskFoToDoList =
                return tasks[TodoList.id].filter(t => !t.isDone)
                break;
            case "completed":
                return tasks[TodoList.id].filter(t => t.isDone)
                break;
        }
        return tasks[TodoList.id]
    }

    const todoListComponents = todoList.map(tl => {
            return (
                <Grid item>
                    <Paper elevation={5} style={{padding: "20px"}}>
                        <ToDoList
                            key={tl.id}
                            todoListID={tl.id}
                            title={tl.title}
                            tasks={getTaskForTODoList(tl)}
                            addTask={addTask}
                            removeTask={removeTasks}
                            changeFilter={changeFilter}
                            filter={tl.filter}
                            changeTaskStatus={changeTaskStatus}
                            removeTodoList={removeTodoLIst}
                            changeTaskTitle={changeTaskTitle}
                            changeTodoListTitle={changeTodoListTitle}
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

                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={3}>
                    {todoListComponents}
                </Grid>

            </Container>

        </div>
    );
}

export default App;
