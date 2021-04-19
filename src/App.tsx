import React, {useState} from 'react';
import './App.css';
import ToDoList from "./ToDoList";
import {v1} from "uuid";

export type TaskType = {
    title: string
    isDone: boolean
    id: string
}
export type FilterValuesType = "all" | "active" | "completed"

function App() {
//BLL-работают с данными
    const [tasks, setTasks] = useState <Array<TaskType>>( [
        {id: v1(), isDone: true, title: "HTML"},
        {id: v1(), isDone: true, title: "CSS"},
        {id: v1(), isDone: true, title: "React"},
        {id: v1(), isDone: false, title: "TS"},
    ])
    const [filter, setFilter] = useState <string>("all") //"all" | "active" | "completed"

    function changeFilter(value: string) { //FilterValueType
        setFilter(value)
    }
    function  removeTasks(taskID:string) {
        const filterTasks = tasks.filter(t => t.id !== taskID)
        console.log(filterTasks)
        // хей UI обновись
        setTasks(filterTasks)
    }
    function changeTaskStatus (taskID: string, newIsDoneValue: boolean) {
        setTasks(tasks.map(t => t.id === taskID ? {...t, isDone: newIsDoneValue} : t))
    }
    function addTask(title:string) {
        const newTask: TaskType = {
            id:v1(),
            //title: title, ниже запись короче
            title,
            isDone: false
        }
        setTasks([newTask, ...tasks])
    }

//UI:
    function getTaskForTODoList () {
        let taskFoToDoList = tasks
        switch (filter) {
            case "active":
                taskFoToDoList = tasks.filter(t => !t.isDone)
                break;
            case "completed":
                taskFoToDoList = tasks.filter(t => t.isDone)
                break;
        }
        return taskFoToDoList
    }

    return (
        //JSX:
        <div className="App">
            <ToDoList
                title={"What to learn"}
                tasks={getTaskForTODoList()}
                addTask={addTask}
                removeTask={removeTasks}
                changeFilter={changeFilter}
                filter={filter}
                changeTaskStatus={changeTaskStatus}
            />
            {/*<ToDoList title={"What to buy"} tasks={tasksToBuy}/>*/}
            {/*<ToDoList title={"What to do"} tasks={tasksToDo}/>*/}
        </div>
    );
}

export default App;

// let tasks: Array<TaskType> = [
//     {id: 1, isDone: true, title: "HTML"},
//     {id: 2, isDone: true, title: "CSS"},
//     {id: 3, isDone: true, title: "React"},
//     {id: 4, isDone: true, title: "TS"},
// ]
// const tasksToBuy: Array<TaskType>= [
//     {id: 1, isDone: true, title: "Булочка"},
//     {id: 2, isDone: true, title: "Хлебушек"},
//     {id: 3, isDone: false, title: "Молочка"},
// ]
// const tasksToDo: Array<TaskType>= [
//     {id: 1, isDone: true, title: "HTML"},
//     {id: 2, isDone: false, title: "CSS"},
//     {id: 3, isDone: true, title: "React"},
// ]
