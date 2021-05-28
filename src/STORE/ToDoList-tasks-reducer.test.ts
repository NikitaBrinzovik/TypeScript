import {TasksStateType, ToDoListType} from "../App";
import {tasksReducer} from "./tasks-reducer";
import {AddToDoListActionCreator, RemoveToDoListActionCreator, toDoListReducer} from "./ToDoList-reducers";


test('ids should be equals', () => {
    const startTasksState: TasksStateType = {};
    const startToDoListsState: Array<ToDoListType> = [];

    const action = AddToDoListActionCreator("new toDoList");

    const endTasksState = tasksReducer(startTasksState, action) //{"qqq": []}
    const endToDoListsState = toDoListReducer(startToDoListsState, action) //[{id:"qqq", title:"new toDoList", filter: "all"}]

    const keys = Object.keys(endTasksState); // ["qqq"]
    const idFromTasks = keys[0];
    const idFromToDoLists = endToDoListsState[0].id;

    expect(idFromTasks).toBe(action.toDoListID);
    expect(idFromToDoLists).toBe(action.toDoListID);
});

test('property with toDoListID should be deleted', () => {
    const startState: TasksStateType = {
        "toDoListID1": [
            {id: "1", title: "CSS", isDone: false},
            {id: "2", title: "JS", isDone: true},
            {id: "3", title: "React", isDone: false}
        ],
        "toDoListID2": [
            {id: "1", title: "bread", isDone: false},
            {id: "2", title: "milk", isDone: true},
            {id: "3", title: "tea", isDone: false}
        ]
    };

    const action = RemoveToDoListActionCreator("toDoListID2");

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState["toDoListID2"]).not.toBeDefined();
});
