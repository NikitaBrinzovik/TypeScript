import {
    addTaskActionCreator,
    changeTaskStatusActionCreator, changeTaskTitleActionCreator,
    removeTaskActionCreator,
    tasksReducer
} from './tasks-reducer';
import {AddToDoListActionCreator} from "./ToDoList-reducers";
import {TasksStateType} from "../AppWithRedux";


beforeEach(() => {
})
test('correct task should be deleted from correct array', () => {
    const startState: TasksStateType = {
        "toDoListID1": [
            {title: "CSS", isDone: false, id: "1"},
            {title: "JS", isDone: true, id: "2"},
            {title: "React", isDone: false, id: "3"}
        ],
        "toDoListID2": [
            {title: "bread", isDone: false, id: "1"},
            {title: "milk", isDone: true, id: "2"},
            {title: "tea", isDone: false, id: "3"}
        ]
    };

    const action = removeTaskActionCreator("2", "toDoListID2");

    const endState = tasksReducer(startState, action)

    expect(endState).toEqual({
        "toDoListID1": [
            {title: "CSS", isDone: false, id: "1"},
            {title: "JS", isDone: true, id: "2"},
            {title: "React", isDone: false, id: "3"}
        ],
        "toDoListID2": [
            {title: "bread", isDone: false, id: "1"},
            {title: "tea", isDone: false, id: "3"}
        ]
    });

});

test('correct task should be added to correct array', () => {
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

    const action = addTaskActionCreator("juce", "toDoListID2");

    const endState = tasksReducer(startState, action)

    expect(endState["toDoListID1"].length).toBe(3);
    expect(endState["toDoListID2"].length).toBe(4);
    expect(endState["toDoListID2"][0].id).toBeDefined();
    expect(endState["toDoListID2"][0].title).toBe("juce");
    expect(endState["toDoListID2"][0].isDone).toBe(false);
})

test('status of specified task should be changed', () => {
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

    const action = changeTaskStatusActionCreator("2", false, "toDoListID2");

    const endState = tasksReducer(startState, action)

    expect(endState["toDoListID1"][1].isDone).toBe(true);
    expect(endState["toDoListID2"][1].isDone).toBe(false);
});

test('Изменение title для таски', () => {
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

    const action = changeTaskTitleActionCreator("2", "beef", "toDoListID2");

    const endState = tasksReducer(startState, action)

    expect(endState["toDoListID1"][1].title).toBe("JS");
    expect(endState["toDoListID2"][1].title).toBe("beef");
});

test('new array should be added when new todolist is added', () => {
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

    const action = AddToDoListActionCreator("new Todolist");

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState);// результат метода: ["toDoListID1", "toDoListID2"]
    const newKey = keys.find(k => k != "toDoListID1" && k != "toDoListID2");
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});



