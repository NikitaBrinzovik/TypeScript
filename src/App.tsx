import React from 'react';
import './App.css';
import ToDoList from "./ToDoList";

export type TaskType = {
    title: string
    isDone: boolean
    id: number
}

function App() {
//BLL
    const tasksToLearn: Array<TaskType>= [
        {id: 1, isDone: true, title: "HTML"},
        {id: 2, isDone: true, title: "CSS"},
        {id: 3, isDone: true, title: "React"},
    ]
    const tasksToBuy: Array<TaskType>= [
        {id: 1, isDone: true, title: "Булочка"},
        {id: 2, isDone: true, title: "Хлебушек"},
        {id: 3, isDone: false, title: "Молочка"},
    ]
    const tasksToDo: Array<TaskType>= [
        {id: 1, isDone: true, title: "HTML"},
        {id: 2, isDone: false, title: "CSS"},
        {id: 3, isDone: true, title: "React"},
    ]
//UI:
    return (
        <div className="App">
            <ToDoList title={"What to learn"} tasks={tasksToLearn}/>
            <ToDoList title={"What to buy"} tasks={tasksToBuy}/>
            <ToDoList title={"What to do"} tasks={tasksToDo}/>
        </div>
    );
}

export default App;
