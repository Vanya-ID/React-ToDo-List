import React, {useState, KeyboardEvent, ChangeEvent} from "react";
import {IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

const AddItemForm = (props: AddItemFormPropsType) => {

    const [title, setTitle] = useState<string>('');
    const [error, setError] = useState<boolean>(false);

    const onClickAddItem = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addItem(trimmedTitle)
        } else {
            setError(true)
        }
        setTitle("")
    }

    const onKeyPressAddItem = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onClickAddItem()
        }
    }

    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(false)
    }


    return (
        <div>
            <TextField
                error={error}
                value={title}
                onChange={onChangeTitle}
                onKeyPress={onKeyPressAddItem}
                helperText={error && 'Ошибочка вышла дружок'}
            />
            <IconButton onClick={onClickAddItem} style={{paddingLeft: '0'}} color={"primary"}>
                <AddBox/>
            </IconButton>
            {/*
            <div className={'errorMessage'}>{errorMessage}</div>
*/}
        </div>
    )
}

export default AddItemForm