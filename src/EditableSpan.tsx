import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Input, TextField} from "@material-ui/core";

type EditableSpanPropsType = {
    title: string
    changeTitle: (title: string) => void
}

const EditableSpan = React.memo((props: EditableSpanPropsType) => {

    const [editMode, setEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState<string>(props.title);

    const onEditMode = () => setEditMode(true)
    const offEditMode = () => {
        setEditMode(false)
        props.changeTitle(title)
    }

    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)
    const onKeyPressChangeTitle = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter')
            offEditMode()
    }


    return (
        editMode
            ? <Input
                color={"primary"}
                value={title}
                autoFocus
                onChange={onChangeTitle}
                onKeyPress={onKeyPressChangeTitle}
                onBlur={offEditMode}
            />
            : <span
                onDoubleClick={onEditMode}
            >
                {props.title}
        </span>
    )
})

export default EditableSpan