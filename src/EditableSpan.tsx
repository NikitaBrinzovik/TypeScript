import React, {ChangeEvent, useState} from "react";
import {TextField} from "@material-ui/core";

type EditableSpanPropsType = {
    title: string
    changeTitle: (title:string) => void
}

const EditableSpan = React.memo((props: EditableSpanPropsType) => {
    const [editMode, setEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState<string>(props.title)

    const onEditMode = () => setEditMode(true)
    const offEditMode = () => {
        setEditMode(false)
        props.changeTitle(title)
    }

    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)

    return (
        editMode
            ? <TextField
                color={"primary"}
                value={title}
                autoFocus={true}  //автофокус при запуске функции внутри инпута
                onChange={onChangeTitle}
                onBlur={offEditMode}
            />
            : <span onDoubleClick={onEditMode}>{props.title}</span> //при двойном нажатии запускается функц
    )
})

export default EditableSpan;