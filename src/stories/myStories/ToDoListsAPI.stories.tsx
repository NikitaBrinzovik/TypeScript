import React, {useEffect, useState} from 'react'
import {todolistAPI} from "../../API/ToDoListAPI";



export const GetTodolistsExample = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        // здесь мы будем делать запрос и ответ закидывать в стейт.

        todolistAPI.getTodos()// response- это ответ от axios. data- это ответ от разработчика бека
            .then((res) => {setState((res.data[0].id))})

    }, [])

    // который в виде строки будем отображать в div-ке
    return <div> {JSON.stringify(state)}</div>
}

export const CreateTodolistExample = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        const title = "hello"

        todolistAPI.createTodo(title)
            .then((res) => {setState(res.data)})

    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const DeleteTodlistExample = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        let id = "803e05c5-af91-4a6c-a3c4-e4cc41b44488"

        todolistAPI.deleteTodo(id)
            .then((res) => {setState(res.data)})

    }, [])

    return <div> {JSON.stringify(state)}</div>//преобразует объект в json строку
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        let id = "803e05c5-af91-4a6c-a3c4-e4cc41b44488";
        const title = "hello"

        todolistAPI.updateTodo(id, title)
            .then((res) => {setState((res.data))})

    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export default {
    title: 'API',
    component:GetTodolistsExample, CreateTodolistExample, DeleteTodlistExample, UpdateTodolistTitle
}
