import React, {ChangeEvent, MouseEventHandler, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTasks: (title: string) => void
}

export function Todolist({addTasks, changeFilter, removeTask, ...props } :PropsType) {
    const [title, setTitle] = useState('')

    const onChangeValueInputHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)

    const onClickAddTasksHandler = () => {
        addTasks(title)
        setTitle('')
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') onClickAddTasksHandler()
    }

    const removeTaskHandler = (id: string) => {
        removeTask(id)
    }

    const changeFilterHandler = (value: FilterValuesType) => {
        changeFilter(value)
    }

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={title} onChange={onChangeValueInputHandler} onKeyPress={onKeyPressHandler}/>
            <button onClick={onClickAddTasksHandler}>+</button>
        </div>
        <ul>{props.tasks.map(t =>
            <li key={t.id}>
                <input type="checkbox" checked={t.isDone}/>
                <span>{t.title}</span>
                <button onClick={() => removeTaskHandler(t.id)}>x</button>
            </li>)
        }</ul>
        <div>
            <button onClick={() => changeFilterHandler('all')}>All</button>
            <button onClick={() => changeFilterHandler('active')}>Active</button>
            <button onClick={() => changeFilterHandler('completed')}>Completed</button>
        </div>
    </div>
}
