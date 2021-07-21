import {combineReducers, createStore} from "redux";
import {toDoListReducer} from "./ToDoList-reducers";
import {tasksReducer} from "./tasks-reducer";
//import {TasksStateType, ToDoListType} from "../AppWithRedux";

export const rootReducer = combineReducers({//Создали общий редюсер, состоящий из мелких редюсеров
    toDoLists: toDoListReducer,
    tasks: tasksReducer,
})

/*type AppRootStateType = {
    toDoLists: Array<ToDoListType>
    tasks: TasksStateType
}*/

export type AppRootStateType = ReturnType<typeof rootReducer>//лайф-хак по типизации: верни нам тип рутРедюсера

export const store = createStore(rootReducer);//создали стор


// @ts-ignore
window.store = store;