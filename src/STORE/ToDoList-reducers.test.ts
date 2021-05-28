import {
    AddToDoListActionCreator,
    ChangeFilterToDoListActionCreator, ChangeTitleActionCreator,
    newFilter, newTodolistTitle,
    newToDoListTitle,
    RemoveToDoListActionCreator,

    toDoListReducer
} from './ToDoList-reducers';
import {v1} from 'uuid';
import {ToDoListType} from '../App';


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



