import React from 'react'
import {Provider} from "react-redux";
import {AppRootStateType, store} from "../../STATE/STORE";


import {combineReducers, createStore} from 'redux'
import {v1} from 'uuid'
import {initialState, tasksReducer} from "../../STATE/tasks-reducer";
import {toDoListReducer} from "../../STATE/ToDoList-reducers";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    toDoLists: toDoListReducer
})

const initialGlobalState = {
    toDoLists: [
        {id: "toDoListID1", title: "What to learn", filter: "all"},
        {id: "toDoListID2", title: "What to buy", filter: "all"}
    ] ,
    tasks: {
        ["toDoListID1"]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "TS", isDone: false},
        ],
        ["toDoListID2"]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "React Book", isDone: true},
        ]
    }
};


export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootStateType);

export const ReduxStoreProviderDecorator = (storyFn: any) => (
    <Provider
        store={storyBookStore}>{storyFn()}
    </Provider>)

