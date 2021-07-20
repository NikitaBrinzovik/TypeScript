import {
    AddToDoListActionCreator,
    ChangeFilterToDoListActionCreator, ChangeTitleActionCreator,
    RemoveToDoListActionCreator,
    toDoListReducer
} from './ToDoList-reducers';
import {v1} from 'uuid';
import { ToDoListType } from '../AppWithRedux';

let toDoListId1: string;
let toDoListId2: string;
let startState: Array<ToDoListType>

beforeEach(() => {
    toDoListId1 = v1();
    toDoListId2 = v1();
    startState = [
        {id: toDoListId1, title: "What to learn", filter: "all"},
        {id: toDoListId2, title: "What to buy", filter: "all"}
    ]
})

test('correct todolist should be removed', () => {

    const endState = toDoListReducer(startState, RemoveToDoListActionCreator(toDoListId1))//actionCR либо:{ type: 'REMOVE-TODOLIST', toDoListID:toDoListId1}

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(toDoListId2);
});


test('correct todolist should be added', () => {

    const endState = toDoListReducer(startState, AddToDoListActionCreator("aaaaa"))

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe("aaaaa");
});


test('correct todolist should change its name', () => {
    // const action:ActionTypes = {
    //     type: 'CHANGE-TITLE',
    //     toDoListID: toDoListId2,
    //     title: newTodolistTitle
    // };
    // если используем action, то пишем его вторым параметром в endState, либо используем actionCreator
    const endState = toDoListReducer(startState, ChangeTitleActionCreator(toDoListId2, "aaaaa"));

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe("aaaaa");
});


test('correct filter of todolist should be changed', () => {
    let toDoListId1 = v1();
    let toDoListId2 = v1();

    //let newFilter: FilterValuesType = "completed";

    const startState: Array<ToDoListType> = [
        {id: toDoListId1, title: "What to learn", filter: "all"},
        {id: toDoListId2, title: "What to buy", filter: "all"}
    ]

    // const action: ActionTypes = {
    //     type: 'CHANGE-FILTER',
    //     toDoListID: toDoListId2,
    //     value: newFilter
    // };

    const endState = toDoListReducer(startState, ChangeFilterToDoListActionCreator(toDoListId2, "all"));

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe("all");
});



