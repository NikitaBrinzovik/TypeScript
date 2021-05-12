import React, {useState, KeyboardEvent, ChangeEvent, MouseEvent} from "react";
import {Button, IconButton, TextField} from "@material-ui/core";
import {AddCircleOutlineTwoTone} from "@material-ui/icons";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

//создаём универсальную компоненту для добавления...
function AddItemForm(props: AddItemFormPropsType) {
    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<boolean>(false)

    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(false)
    }

    const onClickAddItem = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addItem(trimmedTitle)
        } else {
            setError(true)
        }
        setTitle("")
    }

    const errorMessage = error
        ? <div style={{color: "red", borderRadius: "5px"}}>Найн! Писать задача, шнейля!</div>
        : null


    const onKeyPressAddItem = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            onClickAddItem()
        }
    }
    return (
        <div>
            <TextField
                        // className={error ? "error" : ""}
                       value={title}
                       variant={"outlined"}
                       label={'Hey, write here task) Faster!'}
                       onChange={onChangeTitle}
                       onKeyPress={onKeyPressAddItem}
                       error={!!error}
                       helperText={errorMessage}

            />
            <IconButton onClick={onClickAddItem}  color={"primary"}>
                <AddCircleOutlineTwoTone />
            </IconButton>
        </div>
    )
}

export default AddItemForm;