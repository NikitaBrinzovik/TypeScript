import React from "react";
// @ts-ignore
import {action} from  "@storybook/addon-actions";
import {Task} from "../../Task";

export default {
    title: "Task Component",
    component: Task
}
const removeTaskCallback = action("This task removed")
const changeTaskStatusCallback = action("Status changed")
const changeTaskTitleCallback = action("Title changed ")
//const removeTaskCallback = action("Button `add` was pressed near the form. Text in form:")

export const TaskBaseExample = () => {
    return <>
        <Task
            toDoListID={"toDoListID1"}
            removeTask={removeTaskCallback}
            changeTaskStatus={changeTaskStatusCallback}
            changeTaskTitle={changeTaskTitleCallback}//в сторибуке дабл клик на название
            task={ {title: "Completed (double click on me)", isDone: true, id: '1'} }
        />
        <Task
            toDoListID={"toDoListID2"}
            removeTask={removeTaskCallback}
            changeTaskStatus={changeTaskStatusCallback}
            changeTaskTitle={changeTaskTitleCallback}
            task={ {title: "notCompleted (double click on me)", isDone: false, id: '2'} }
        />
    </>
}