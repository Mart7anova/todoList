import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {TextField} from '@material-ui/core';

type EditableSpanPropsType = {
    title: string
    callBack: (title: string) => void
}

export const EditableSpan = (props: EditableSpanPropsType) => {
    const [editMode, setEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState<string>(props.title)

    const onEditMode = () => setEditMode(true)
    const offEditMode = () => {
        setEditMode(false)
        props.callBack(title)
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) offEditMode()
    }

    return (
        editMode
            ? <TextField variant={'standard'}
                         onBlur={offEditMode}
                         autoFocus
                         value={title}
                         onChange={onChangeHandler}
                         onKeyPress={onKeyPressHandler}

            />
            : <span onDoubleClick={onEditMode}>{props.title}</span>
    );
};
