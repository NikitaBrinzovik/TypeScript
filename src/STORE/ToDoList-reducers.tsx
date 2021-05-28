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

export const newToDoListTitle = "New Todolist";
export const AddToDoListActionCreator = (toDoListID: string): AddToDoLIstActionType => {
    return {type: 'ADD-TODOLIST', title: newToDoListTitle, toDoListID: v1()}
}

export const newTodolistTitle = "New Todolist";
export const ChangeTitleActionCreator = (toDoListID: string): ChangeToDoListTitleActionType => {
    return {type: "CHANGE-TITLE", toDoListID, title: newTodolistTitle}
}

export const newFilter: FilterValuesType = "completed";
export const ChangeFilterToDoListActionCreator = (toDoListID: string): ChangeFilterActionType => {
    return {type: "CHANGE-FILTER", toDoListID, value: newFilter}
}

export const toDoListReducer = (toDoList: Array<ToDoListType>, action: ActionTypes): Array<ToDoListType> => {

    switch (action.type) {
        case "REMOVE-TODOLIST":
            return toDoList.filter(tl => tl.id !== action.toDoListID)
        case "ADD-TODOLIST":
            const newToDoListID = action.toDoListID
            const newToDoList: ToDoListType = {id: newToDoListID, title: action.title, filter: "all"}
            return [...toDoList, newToDoList]
        case "CHANGE-TITLE":

            return toDoList.map(tl => tl.id === action.toDoListID ? {...tl, title: action.title} : tl)
        case "CHANGE-FILTER":
            return (toDoList.map(tl => tl.id === action.toDoListID ? {...tl, filter: action.value} : tl))
        default:
            return toDoList
    }
}


