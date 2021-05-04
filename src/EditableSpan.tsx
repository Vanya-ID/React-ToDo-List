import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type EditableSpanPropsType = {
    title: string
    changeTitle: (title: string) => void
}

function EditableSpan(props: EditableSpanPropsType) {

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
            ? <input
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
}

export default EditableSpan