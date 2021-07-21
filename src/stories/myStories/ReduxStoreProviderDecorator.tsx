import React from 'react'
import {Provider} from "react-redux";
import {AppRootStateType} from "../../STATE/STORE";
import {combineReducers, createStore} from 'redux'
import {v1} from 'uuid'
import {tasksReducer} from "../../STATE/tasks-reducer";
import {toDoListReducer} from "../../STATE/ToDoList-reducers";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    toDoLists: toDoListReducer
})

const initialGlobalState = {
    toDoLists: [
        {id: "toDoListID_1", title: "What to learn", filter: "all"},
        {id: "toDoListID_2", title: "What to buy", filter: "all"}
    ],
    tasks: {
        ["toDoListID_1"]: [
            {id: v1(), isDone: true, title: "HTML"},
            {id: v1(), isDone: true, title: "CSS"},
            {id: v1(), isDone: true, title: "React"},
            {id: v1(), isDone: false, title: "TS"},
        ],
        ["toDoListID_2"]: [
            {id: v1(), isDone: true, title: "milk"},
            {id: v1(), isDone: true, title: "meat"},
            {id: v1(), isDone: true, title: "bread"},
            {id: v1(), isDone: false, title: "weed"},
        ]
    }
};

export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootStateType);

export const ReduxStoreProviderDecorator = (storyFn: any) => (
    <Provider
        store={storyBookStore}>{storyFn()}
    </Provider>)

