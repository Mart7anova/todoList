import s from './App.module.css'
import {EditableSpan} from './components/EditableSpan';
import { Checkbox, IconButton, ListItem} from '@material-ui/core';
import {HighlightOff} from '@material-ui/icons';
import {memo, useCallback} from 'react';


type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    task: TaskType
    isDone: boolean

    removeTask: (taskId: string) => void
    changeTasksStatus: (id: string, isDone: boolean) => void
    changeTaskTitle: (id: string, title: string) => void
}

export const Tasks:  React.FC<PropsType> = memo(props => {
    const {
        task,
        isDone,
        removeTask,
        changeTasksStatus,
        changeTaskTitle,
    } = props
    console.log('a')

    const removeTaskHandler = useCallback((id: string) => removeTask(id), [removeTask])

    const changeIsDoneHandler = useCallback((id: string, isDone: boolean) => {
        changeTasksStatus(id, isDone)
    }, [changeTasksStatus])
    const changeTaskTitleHandler = useCallback((id: string, title: string) => {
        changeTaskTitle(id, title)
    }, [changeTaskTitle])

    return (
        <ListItem className={isDone ? s.isDone : ''} style={{padding: '0px'}}>
            <Checkbox
                checked={isDone}
                onChange={(e) => changeIsDoneHandler(task.id, e.currentTarget.checked)}
                color={'primary'}
            />
            <EditableSpan
                title={task.title}
                callBack={(title) => changeTaskTitleHandler(task.id, title)}/>
            <IconButton
                onClick={() => removeTaskHandler(task.id)}
                size={'small'}>
                <HighlightOff/>
            </IconButton>
        </ListItem>
    )
})
