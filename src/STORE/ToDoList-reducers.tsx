import {FilterValuesType, ToDoListType} from "../App";
import {v1} from "uuid";

export type RemoveToDoListActionType = {
    type: "REMOVE-TODOLIST"
    toDoListID: string
}
export type AddToDoLIstActionType = {
    type: "ADD-TODOLIST"
    title: string
    toDoListID: string
}
export type ChangeToDoListTitleActionType = {
    type: "CHANGE-TITLE"
    title: string
    toDoListID: string
}
export type ChangeFilterActionType = {
    type: "CHANGE-FILTER"
    value: FilterValuesType
    toDoListID: string
}
export type ActionTypes =
    RemoveToDoListActionType
    | AddToDoLIstActionType
    | ChangeToDoListTitleActionType
    | ChangeFilterActionType

export const RemoveToDoListActionCreator = (toDoListID: string): RemoveToDoListActionType => {
    return {type: "REMOVE-TODOLIST", toDoListID: toDoListID}
}

export const AddToDoListActionCreator = (title:string): AddToDoLIstActionType => {
    return {type: 'ADD-TODOLIST', title, toDoListID: v1()}
}


export const ChangeTitleActionCreator = (toDoListID: string, title: string): ChangeToDoListTitleActionType => {
    return {type: "CHANGE-TITLE", toDoListID, title}
}

//export const newFilter: FilterValuesType = "completed";
export const ChangeFilterToDoListActionCreator = (toDoListID: string, value:FilterValuesType): ChangeFilterActionType => {
    return {type: "CHANGE-FILTER", toDoListID, value}
}

export const toDoListReducer = (toDoList: Array<ToDoListType>, action: ActionTypes): Array<ToDoListType> => {

    switch (action.type) {
        case "REMOVE-TODOLIST":
            return toDoList.filter(tl => tl.id !== action.toDoListID)
        case "ADD-TODOLIST":
            const newToDoListID = action.toDoListID
            const newToDoList: ToDoListType = {id: newToDoListID, title: action.title, filter: "all"}
            return [newToDoList, ...toDoList]
        case "CHANGE-TITLE":

            return toDoList.map(tl => tl.id === action.toDoListID ? {...tl, title: action.title} : tl)
        case "CHANGE-FILTER":
            return (toDoList.map(tl => tl.id === action.toDoListID ? {...tl, filter: action.value} : tl))
        default:
            return toDoList
    }
}


