import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Add} from '@material-ui/icons';
import {IconButton, TextField} from '@material-ui/core';

type AddItemFormPropsType = {
    callBack: (title: string) => void
}

export const AddItemForm = (props: AddItemFormPropsType) => {
    let [title, setTitle] = useState<string>('')
    let [error, setError] = useState<string | null>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(null)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) addItem();
    }

    const addItem = () => {
        if (title.trim() !== '') {
            props.callBack(title.trim());
            setTitle('');
        } else {
            setError('Title is required')
        }
    }

    return (
        <div>
            <TextField variant="outlined"
                       label="Title"
                       size={'small'}
                       value={title}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}
                       error={!!error}
                       helperText={error}
            />
            <IconButton onClick={addItem} size={'small'}>
                <Add/>
            </IconButton>
        </div>
    );
};
