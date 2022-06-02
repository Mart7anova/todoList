import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import s from '../App.module.css';

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

    const errorInputStyle = error ? s.error : ''
    const errorMessageStyle = error ? s.errorMessage : ''

    return (
        <div>
            <input value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   className={errorInputStyle}
            />
            <button onClick={addItem}>+</button>
            <div className={errorMessageStyle}>{error}</div>
        </div>
    );
};
