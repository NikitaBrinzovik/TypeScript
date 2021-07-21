
import {v1} from "uuid";
import {AddToDoLIstActionType, RemoveToDoListActionType, toDoListID_1, toDoListID_2} from "./ToDoList-reducers";
import {TasksStateType, TaskType} from "../AppWithRedux";

export type RemoveTaskActionType = {
    type: "REMOVE-TASK"
    taskID: string
    toDoListID: string

}
export type addTaskActionType = {
    type: "ADD-TASK"
    title: string
    toDoListID: string
}
export type ChangeTaskStatusType = {
    type: "CHANGE-TASK-STATUS"
    taskID: string
    isDone: boolean
    toDoListID: string
}
export type ChangeTaskTitleType = {
    type: "CHANGE-TASK-TITLE"
    taskID: string
    isDone?: boolean
    toDoListID: string
    title: string
}

export type ActionTypes =
    RemoveTaskActionType
    | addTaskActionType
    | ChangeTaskStatusType
    | ChangeTaskTitleType
    | AddToDoLIstActionType
    | RemoveToDoListActionType;

//Заготовка с готовыми двумя листами. Смотри в ToDoList-reducers: initialState, чтоб тоже разкомментировать
/*export const initialState: TasksStateType = {
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
}*/
export const initialState: TasksStateType = {toDoListID_1:[{id: v1(), isDone: true, title: "HTML"}]}
export const tasksReducer = (state: TasksStateType = initialState, action: ActionTypes): TasksStateType => {

    switch (action.type) {
        case "REMOVE-TASK":
            // let toDoListTasks = state[action.toDoListID];
            // state[action.toDoListID] = toDoListTasks.filter(t => t.id !== action.taskID);
            // return {...state}

            //вариант в 1 строку, вместо 3:
            return {
                ...state,
                [action.toDoListID]: state[action.toDoListID].filter(t => t.id !== action.taskID)
            }

        case "ADD-TASK":
            let task: TaskType = {title: action.title, isDone: false, id: v1()}

            // return [...toDoList, newToDoList]
            return {
                ...state,
                [action.toDoListID]: [task, ...state[action.toDoListID]]
            }
        case "CHANGE-TASK-STATUS":
            return {
                ...state,
                [action.toDoListID]: state[action.toDoListID].map(task => {
                    if (task.id === action.taskID) {
                        return {...task, isDone: action.isDone}
                    } else {
                        return task
                    }
                })
            }
        case "CHANGE-TASK-TITLE":
            return {
                ...state,
                [action.toDoListID]: state[action.toDoListID].map(task => {
                    if (task.id === action.taskID) {
                        return {...task, title: action.title}
                    } else {
                        return task
                    }
                })
            }
        case "ADD-TODOLIST":
            return {
                ...state,
                [action.toDoListID]: []
            }
        case "REMOVE-TODOLIST":
            let copyState = {...state}
            delete copyState[action.toDoListID]
            return copyState
        default:
            return state
    }
}
export const removeTaskActionCreator = (taskID: string, toDoListID: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', taskID, toDoListID}
}
export const addTaskActionCreator = (title: string, toDoListID: string): addTaskActionType => {
    return {type: 'ADD-TASK', title, toDoListID}
}
export const changeTaskStatusActionCreator = (taskID: string, isDone: boolean, toDoListID: string): ChangeTaskStatusType => {
    return {type: "CHANGE-TASK-STATUS", isDone, taskID, toDoListID}
}
export const changeTaskTitleActionCreator = (taskID: string, title: string, toDoListID: string): ChangeTaskTitleType => {
    return {type: "CHANGE-TASK-TITLE", taskID, title, toDoListID}
}
