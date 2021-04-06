import React, {useState} from 'react';
import './App.css';
import ToDoList from "./ToDoList";

export type TaskType = {
    title: string
    isDone: boolean
    id: number
}
export type FilterValuesType = "all" | "active" | "completed"

function App() {
//BLL-работают с данными
    const [tasks, setTasks] = useState <Array<TaskType>>( [
        {id: 1, isDone: true, title: "HTML"},
        {id: 2, isDone: true, title: "CSS"},
        {id: 3, isDone: true, title: "React"},
        {id: 4, isDone: false, title: "TS"},
    ])
    const [filter, setFilter] = useState <"all" | "active" | "completed">("all")

    function changeFilter(value: FilterValuesType) {
        setFilter(value)
    }
    function  removeTasks(taskID:number) {
        const filterTasks = tasks.filter(t => t.id !== taskID)
        console.log(filterTasks)
        // хей UI обновись
        setTasks(filterTasks)
    }


//UI:
    function getTaskForTODoList () {
        let taskFoToDoList = tasks
        switch (filter) {
            case "active":
                taskFoToDoList = tasks.filter(t => t.isDone)
                break;
            case "completed":
                taskFoToDoList = tasks.filter(t => t.isDone)
                break;
        }
        return taskFoToDoList
    }

    return (
        <div className="App">
            <ToDoList
                title={"What to learn"}
                tasks={getTaskForTODoList()}
                removeTask={removeTasks}
                changeFilter={changeFilter}
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
