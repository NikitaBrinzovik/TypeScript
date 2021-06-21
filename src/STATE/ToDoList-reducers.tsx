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

export const AddToDoListActionCreator = (title: string): AddToDoLIstActionType => {
    return {type: 'ADD-TODOLIST', title, toDoListID: v1()}
}


export const ChangeTitleActionCreator = (toDoListID: string, title: string): ChangeToDoListTitleActionType => {
    return {type: "CHANGE-TITLE", toDoListID, title}
}

//export const newFilter: FilterValuesType = "completed";
export const ChangeFilterToDoListActionCreator = (toDoListID: string, value: FilterValuesType): ChangeFilterActionType => {
    return {type: "CHANGE-FILTER", toDoListID, value}
}


export const toDoListID_1 = v1()
export const toDoListID_2 = v1()
const initialState: Array<ToDoListType> = [
    {id: toDoListID_1, title: "what to learn", filter: "all"},
    {id: toDoListID_2, title: "what to buy", filter: "all"},
]
export const toDoListReducer = (state: Array<ToDoListType> = initialState, action: ActionTypes): Array<ToDoListType> => {


    switch (action.type) {
        case "REMOVE-TODOLIST":
            return state.filter(tl => tl.id !== action.toDoListID)
        case "ADD-TODOLIST":
            const newToDoListID = action.toDoListID
            const newToDoList: ToDoListType = {id: newToDoListID, title: action.title, filter: "all"}
            return [newToDoList, ...state]
        case "CHANGE-TITLE":

            return state.map(tl => tl.id === action.toDoListID ? {...tl, title: action.title} : tl)
        case "CHANGE-FILTER":
            return state.map(tl => tl.id === action.toDoListID ? {...tl, filter: action.value} : tl)
        default:
            return state;
    }
}


