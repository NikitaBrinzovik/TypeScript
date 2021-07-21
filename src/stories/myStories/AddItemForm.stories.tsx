import {AddItemForm} from "../../AddItemForm";
import React from "react";
// @ts-ignore
import {action} from  "@storybook/addon-actions";


export default {
    title: "AddItemForm Component",
    component: AddItemForm
}

const callback = action("Button `add` was pressed near the form. Text in form:")

export const AddItemFormBaseExample = (props: any) => {
    return <AddItemForm addItem={callback}
    />
}
