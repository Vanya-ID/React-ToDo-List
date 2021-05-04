import React, {useState, KeyboardEvent, ChangeEvent} from "react";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

const AddItemForm = (props: AddItemFormPropsType) => {

    const [title, setTitle] = useState<string>('');
    const [error, setError] = useState<boolean>(false);

    const errorMessage = error ? "title is required!" : null


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
            <input
                className={error ? 'error' : ' '}
                value={title}
                onChange={onChangeTitle}
                onKeyPress={onKeyPressAddItem}
            />
            <button onClick={onClickAddItem}>+</button>
            <div className={'errorMessage'}>{errorMessage}</div>
        </div>
    )
}

export default AddItemForm