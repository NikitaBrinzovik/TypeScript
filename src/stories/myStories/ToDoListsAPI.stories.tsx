import React, {useEffect, useState} from 'react'
import {todolistAPI, taskAPI} from "../../API/ToDoListAPI";



export const GetTodolistsExample = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        // здесь мы будем делать запрос и ответ закидывать в стейт.

        todolistAPI.getTodos()// response- это ответ от axios. data- это ответ от разработчика бека
            .then((res) => {setState((res.data[0].id))})//получить id первого тудулиста

    }, [])

    // который в виде строки будем отображать в div-ке
    return <div> {JSON.stringify(state)}</div>
}

export const CreateTodolistExample = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        const title = "!hello!!"

        todolistAPI.createTodo(title)
            .then((res) => {setState(res.data)})

    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const DeleteTodolistExample = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        let id = "5ca6462f-d4d9-446a-82fa-c810016ba7f1"

        todolistAPI.deleteTodo(id)
            .then((res) => {setState(res.data)})

    }, [])

    return <div> {JSON.stringify(state)}</div>//преобразует объект в json строку
}

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        let id = "803e05c5-af91-4a6c-a3c4-e4cc41b44488";
        const title = "hello update"

        todolistAPI.updateTodo(id, title)
            .then((res) => {setState((res.data))})

    }, [])

    return <div> {JSON.stringify(state)}</div>
}


export const GetTasksExample = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>("")



    const getTasks = () => {
        taskAPI.getTasks(setTodolistId)
            .then((res) => {setState(res.data)})

    }

    return <div> {JSON.stringify(state)}
        <div>
            <input placeholder={"todolistId"} value={todolistId} onChange={(e) =>
            {setTodolistId(e.currentTarget.value)}}/>
            <button onClick={getTasks}> Get Task</button>
        </div>
    </div>
}

export const CreateTasksExample = () => {
    const [state, setState] = useState<any>(null)
    const [taskTitle, setTaskTitle] = useState<string>("")
    const [todolistId, setTodolistId] = useState<string>("")

    const createTask = () => {
        taskAPI.createTask(todolistId , taskTitle)
            .then((res) => {setState(res.data)})
    }

    return <div> {JSON.stringify(state)}
        <div>
            <input placeholder={"todolistId"} value={todolistId} onChange={(e) =>
            {setTodolistId(e.currentTarget.value)}}/>
            <input placeholder={"task Title"} value={taskTitle} onChange={(e) =>
            {setTaskTitle(e.currentTarget.value)}}/>
            <button onClick={createTask}> Create Task</button>
        </div>
    </div>
}

export const DeleteTaskExample = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>("")
    const [taskId, setTaskId] = useState<string>("")

    const deleteTask = () => {
        taskAPI.deleteTask(todolistId , taskId)
            .then((res) => {setState(res.data)})
    }

    return <div> {JSON.stringify(state)}
        <div>
            <input placeholder={"todolistId"} value={todolistId}
                   onChange={(e) => {setTodolistId(e.currentTarget.value)}}/>
            <input placeholder={"taskId"} value={taskId}
                   onChange={(e) => {setTaskId(e.currentTarget.value)}}/>
            <button onClick={deleteTask}> Delete Task</button>
        </div>
    </div>
}

export const UpdateTasksTitle = () => {
    const [state, setState] = useState<any>(null)
    const [taskTitle, setTaskTitle] = useState<string>("title 1")
    const [description, setDescription] = useState<string>("description")
    const [status, setStatus] = useState<number>(0)
    const [priority, setPriority] = useState<number>(0)
    const [startDate, setStartDate] = useState<string>("")
    const [deadline, setDeadline] = useState<string>("")
    const [todolistId, setTodolistId] = useState<string>("")
    const [taskId, setTaskId] = useState<string>("")

    const updateTask = () => {
        taskAPI.updateTask(todolistId , taskId, {
            deadline: "",
            description: description,
            priority: priority,
            title: taskTitle,
            status: status,
            startDate: "",
        })
            .then((res) => {setState(res.data)})
    }

    return <div> {JSON.stringify(state)}
        <div>
            <input placeholder={"todolistId"} value={todolistId} onChange={(e) =>{setTodolistId(e.currentTarget.value)}}/>
            <input placeholder={"taskId"} value={taskId} onChange={(e) =>{setTaskId(e.currentTarget.value)}}/>
            <input placeholder={"task Title"} value={taskTitle} onChange={(e) =>{setTaskTitle(e.currentTarget.value)}}/>
            <input placeholder={"task description"} value={description} onChange={(e) =>{setDescription(e.currentTarget.value)}}/>
            <input placeholder={"task status"} value={status}  type="number" onChange={(e) =>{setStatus(+e.currentTarget.value)}}/>
            <input placeholder={"task priority"} value={priority} type="number" onChange={(e) =>{setPriority(+e.currentTarget.value)}}/>
            {/*<input placeholder={"task startDate"} value={startDate} onChange={(e) =>{setStartDate(e.currentTarget.value)}}/>
            <input placeholder={"task deadline"} value={deadline} onChange={(e) =>{setDeadline(e.currentTarget.value)}}/>
*/}

            <button onClick={updateTask}> update Task</button>
        </div>
    </div>
}





export default {
    title: 'API',
    component:
    GetTodolistsExample,
    CreateTodolistExample,
     DeleteTodolistExample,
    UpdateTodolistTitle,
    GetTasksExample,
    CreateTasksExample,
    DeleteTasksExample: DeleteTaskExample,
    UpdateTasksTitle,
}
