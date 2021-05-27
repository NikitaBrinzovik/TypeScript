import {TasksStateType, TaskType} from "../App";
import {v1} from "uuid";
import {ChangeFilterActionType} from "./ToDoList-reducers";

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

export type ActionTypes = RemoveTaskActionType | addTaskActionType | ChangeTaskStatusType;


export const tasksReducer = (state: TasksStateType, action: ActionTypes): TasksStateType => {

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
            let task: TaskType = {title: action.title, isDone: false, id:v1()}

            // return [...toDoList, newToDoList]
            return {
                ...state,
                [action.toDoListID]: [task, ...state[action.toDoListID]]
            }
        case "CHANGE-TASK-STATUS":
            let task2: TaskType = {title: action.taskID, isDone: action.isDone, id:v1()}
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
        default:
            return state
    }
}
export const removeTaskActionCreator = (taskID: string, toDoListID: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', taskID, toDoListID}
}
export const addTaskActionCreator = (title: string, toDoListID: string):addTaskActionType=> {
    return {type: 'ADD-TASK', title, toDoListID}
}
export const changeTaskStatusActionCreator = (taskID: string, isDone: boolean, toDoListID: string):ChangeTaskStatusType => {
    return {type:"CHANGE-TASK-STATUS", isDone, taskID, toDoListID}
}


// const addTaskActionCreator = (toDoListID: string):AddToDoLIstActionType =>{
//     return {type: 'ADD-TODOLIST', title: newToDoListTitle}
// }
// const removeTaskActionCreator = (toDoListID:string): RemoveToDoListActionType=> {
//     return {type:"REMOVE-TODOLIST", toDoListID: toDoListID}
// }
// const changeTaskTitleActionCreator = (toDoListID:string):ChangeToDoListTitleActionType => {
//     return {type: "CHANGE-TITLE", toDoListID , title: newTodolistTitle}
// }
//
// const changeFilterTaskActionCreator = (toDoListID:string):ChangeFilterActionType => {
//     return {type:"CHANGE-FILTER", toDoListID, value:newFilter}
// }