import React, {useState, KeyboardEvent, ChangeEvent, MouseEvent} from "react";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}
//создаём универсальную компоненту для добавления...
function AddItemForm(props:AddItemFormPropsType) {
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
        ? <div style={{color: "red", border: "1px solid firebrick", borderRadius: "5px"}}>Найн!</div>
        : null


    const onKeyPressAddItem = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            onClickAddItem()
        }
    }
    return(
        <div>
            <input className={error ? "error" : ""}
                   value={title}
                //value={error ? "xxx" : title}
                   onChange={onChangeTitle}
                   onKeyPress={onKeyPressAddItem}

            />
            <button onClick={onClickAddItem}>+</button>
            {errorMessage}
        </div>
    )
}

export default AddItemForm;