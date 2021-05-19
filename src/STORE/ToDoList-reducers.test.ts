import {
    AddToDoLIstActionType, ChangeFilterActionType, ChangeToDoListTitleActionType,
    RemoveToDoListActionType,
    toDoListReducer
} from './ToDoList-reducers';
import {v1} from 'uuid';
import {FilterValuesType, ToDoListType} from '../App';
import {ActionTypes} from "./ToDoList-reducers"


const RemoveToDoListActionCreator = (toDoListID:string): RemoveToDoListActionType=> {
    return {type:"REMOVE-TODOLIST", toDoListID: toDoListID}
}
test('correct todolist should be removed', () => {
    let toDolistId1 = v1();
    let toDolistId2 = v1();

    const startState: Array<ToDoListType> = [
        {id: toDolistId1, title: "What to learn", filter: "all"},
        {id: toDolistId2, title: "What to buy", filter: "all"}
    ]

    const endState = toDoListReducer(startState, RemoveToDoListActionCreator(toDolistId1))//actionCR либо:{ type: 'REMOVE-TODOLIST', toDoListID:toDolistId1}

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(toDolistId2);
});


const AddToDoListActionCreator = (toDoListID: string):AddToDoLIstActionType =>{
    return {type: 'ADD-TODOLIST', title: newToDoListTitle}
}
let newToDoListTitle = "New Todolist";
test('correct todolist should be added', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();



    const startState: Array<ToDoListType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]

    const endState = toDoListReducer(startState, AddToDoListActionCreator(newToDoListTitle))

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newToDoListTitle);
});


const ChangeTitleActionCreator = (toDoListID:string):ChangeToDoListTitleActionType => {
    return {type: "CHANGE-TITLE", toDoListID , title: newTodolistTitle}
}
let newTodolistTitle = "New Todolist";
test('correct todolist should change its name', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();



    const startState: Array<ToDoListType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]

    // const action:ActionTypes = {
    //     type: 'CHANGE-TITLE',
    //     toDoListID: todolistId2,
    //     title: newTodolistTitle
    // };
    // если используем action, то пишем его вторым параметром в endState, либо используем actionCreator
    const endState = toDoListReducer(startState, ChangeTitleActionCreator(todolistId2));

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});


const ChangeFilterToDoListActionCreator = (toDoListID:string):ChangeFilterActionType => {
    return {type:"CHANGE-FILTER", toDoListID, value:newFilter}
}
let newFilter: FilterValuesType = "completed";
test('correct filter of todolist should be changed', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    //let newFilter: FilterValuesType = "completed";

    const startState: Array<ToDoListType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]

    // const action: ActionTypes = {
    //     type: 'CHANGE-FILTER',
    //     toDoListID: todolistId2,
    //     value: newFilter
    // };

    const endState = toDoListReducer(startState, ChangeFilterToDoListActionCreator(todolistId2));

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});



