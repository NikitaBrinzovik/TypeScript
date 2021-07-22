import axios from "axios";

const instance = axios.create({
    baseURL: `https://social-network.samuraijs.com/api/1.1`,
    withCredentials: true,
    headers: {"api-key": "3f338418-f98d-49bd-8d21-8909cba70bac"}
})

export type TodoListType = {
    id: string
    addedDate: string
    order: number
    title: string
}

type ResponseType<D> = {
    resultCode: number
    messages: Array<string>
    data: D /*переменная*/
    fieldsErrors?: Array<string>
}


export const todolistAPI = {
    getTodos() {
        return instance.get<Array<TodoListType>>('/todo-lists')
    },

    createTodo(title: string) {
        return instance.post<Array<ResponseType<{}>>>('/todo-lists', title)
    },

    deleteTodo(id: string) {
        return instance.delete<Array<ResponseType<{ item: TodoListType }>>>(`todo-lists/${id}`)
    },

    updateTodo(id: string, title: string) {
        return instance.put<Array<ResponseType<{}>>>(`todo-lists/${id}`, {title})
    },
}