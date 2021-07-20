import React, {useState, KeyboardEvent, ChangeEvent, MouseEvent} from "react";
import {IconButton, TextField} from "@material-ui/core";
import {AddCircleOutlineTwoTone} from "@material-ui/icons";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

//создаём универсальную компоненту для добавления...
export const AddItemForm = React.memo( (props: AddItemFormPropsType) => { //React.memo-для контроля перерисовки только с новыми props
    console.log('push, push the button2')
    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<boolean>(false)

    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {// onChangeHandler

        setTitle(e.currentTarget.value)
        setError(false)
        console.log('push, push the button')
    }

    const onClickAddItem = () => { //onKeyPressHandler
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addItem(trimmedTitle)
        } else {
            console.log('push, push the button3')
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
});

export default AddItemForm;