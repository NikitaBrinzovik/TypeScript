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

type ResponseType<D = {}> = {//если не передавать, то будет пустым объектом: D = {}
    resultCode: number
    messages: Array<string>
    data: D /*переменная*/
    fieldsErrors?: Array<string>
}

export type TaskEntityType ={
    description: string
    title: string
    //completed: boolean
    status: number
    priority: number
    startDate: string //datetime
    deadline: string //datetime
    id: string
    todoListId: string
    order: number
    addedDate: string //datetime
}
type UpdateTaskModelType = {
    title: string
    description: string
    //completed: boolean
    status: number
    priority: number
    startDate: string //datetime
    deadline: string //datetime
}
type GetTaskResponseType = {
    error: string | null
    totalCount: number
    items: Array<TaskEntityType>

}
export const todolistAPI = {
    getTodos() {
        return instance.get<Array<TodoListType>>('/todo-lists')
    },

    createTodo(title: string) {
        return instance.post<Array<ResponseType<{ item: TodoListType }>>>('/todo-lists', title)
    },

    deleteTodo(id: string) {
        return instance.delete<Array<ResponseType>>(`todo-lists/${id}`)//<Array<ResponseType<{}>>>
    },

    updateTodo(id: string, title: string) {
        return instance.put<Array<ResponseType>>(`todo-lists/${id}`, {title}) //<Array<ResponseType<{}>>>
    },
}

export const taskAPI = {
    getTasks(todolistId:any) {
        return instance.get<GetTaskResponseType>(`/todo-lists/${todolistId}/tasks`)
    },

    createTask(todolistId: string, title:string) {
        return instance.post<ResponseType<TaskEntityType>>(`/todo-lists/${todolistId}/tasks`, title)
    },

    deleteTask(todolistId:string, taskId:string) {
        return instance.delete<ResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`)//ResponseType<{}>
    },

    updateTask(todolistId: string, taskId:string, model:UpdateTaskModelType) {
        return instance.put<ResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`, model)//model уже объект, пишем без {}
    },
}