import React from "react";
// @ts-ignore
import {action} from "@storybook/addon-actions";

import EditableSpan from "../../EditableSpan";

export default {
    title: "EditableSpan Component",
    component: EditableSpan
}

const changeTitleCallback = action("title changed")

export const EditableSpanBaseExample = () => {
    return <EditableSpan title={"here will be title (double click on me)"} changeTitle={changeTitleCallback} />
}