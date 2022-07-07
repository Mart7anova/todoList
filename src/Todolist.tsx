import {FilterValuesType} from './App';
import s from './App.module.css'
import {AddItemForm} from './components/AddItemForm';
import {EditableSpan} from './components/EditableSpan';
import {Button, ButtonGroup, Checkbox, IconButton, List, ListItem} from '@material-ui/core';
import {HighlightOff} from '@material-ui/icons';
import React, {memo, useCallback, useMemo} from 'react';
import {TasksStateType, TodoListType} from './AppWithRedux';
import {Tasks} from './Task';


type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    todoListID: string
    title: string
    filter: FilterValuesType
    tasks: Array<TaskType>

    removeTask: (taskId: string, todoListID: string) => void
    removeTodoList: (todoListID: string) => void
    addTask: (todoListID: string, title: string) => void
    changeTasksStatus: (id: string, todoListID: string, isDone: boolean) => void
    changeTaskTitle: (id: string, todoListID: string, title: string) => void
    changeTodoListTitle: (todoListID: string, title: string) => void
    changeTodoListFilter: (todoListID: string, value: FilterValuesType) => void
}

export const Todolist: React.FC<PropsType> = memo(props => {

    const {
        todoListID,
        title,
        filter,
        tasks,
        removeTask,
        removeTodoList,
        addTask,
        changeTasksStatus,
        changeTaskTitle,
        changeTodoListTitle,
        changeTodoListFilter,
    } = props

    const removeTaskHandler = useCallback((id: string) => {
        removeTask(id, todoListID)
    }, [removeTask, todoListID])

    const addTaskHandler = useCallback((title: string) => {
        addTask(todoListID, title);
    }, [addTask, todoListID])

    const changeIsDoneHandler = useCallback((id: string, isDone: boolean) => {
        changeTasksStatus(id, todoListID, isDone)
    }, [changeTasksStatus, todoListID])

    const changeTaskTitleHandler = useCallback((id: string, title: string) => {
        changeTaskTitle(id, todoListID, title)
    }, [changeTaskTitle, todoListID])

    const changeTodoListTitleHandler = useCallback((title: string) => {
        changeTodoListTitle(todoListID, title)
    }, [changeTodoListTitle, todoListID])

    const onAllClickHandler = () => changeTodoListFilter(todoListID, 'all');
    const onActiveClickHandler = () => changeTodoListFilter(todoListID, 'active');
    const onCompletedClickHandler = () => changeTodoListFilter(todoListID, 'completed');

    const tasksWithUseMemo = useMemo(() => {
        let tasksForRender = tasks
        if (filter === 'active') {
            tasksForRender = tasks.filter(t => !t.isDone)
        }
        if (filter === 'completed') {
            tasksForRender = tasks.filter(t => t.isDone)
        }
        return tasksForRender.map(t => {
            return <Tasks key={t.id}
                          task={t}
                          isDone={t.isDone}
                          removeTask={removeTaskHandler}
                          changeTasksStatus={changeIsDoneHandler}
                          changeTaskTitle={changeTaskTitleHandler}/>
        })
    }, [tasks, filter])

    return (
        <div>
            <h3>
                <EditableSpan title={title} callBack={changeTodoListTitleHandler}/>
                <IconButton onClick={() => removeTodoList(todoListID)} size={'small'}>
                    <HighlightOff/>
                </IconButton>
            </h3>

            <AddItemForm callBack={addTaskHandler}/>
            {tasks.length
                ? <List>
                    {tasks.map(t => {
                        return <ListItem key={t.id} className={t.isDone ? s.isDone : ''} style={{padding: '0px'}}>
                            <Checkbox
                                checked={t.isDone}
                                onChange={(e) => changeTasksStatus(t.id, props.todoListID, e.currentTarget.checked)}
                                color={'primary'}
                            />
                            <EditableSpan
                                title={t.title}
                                callBack={(title) => changeTaskTitle(t.id, props.todoListID, title)}/>
                            <IconButton
                                onClick={() => removeTask(t.id, props.todoListID)}
                                size={'small'}>
                                <HighlightOff/>
                            </IconButton>
                        </ListItem>
                    })}</List>
                : <span>List is empty</span>
            }
            <div>
                <ButtonGroup color="primary"
                             disableElevation>
                    <Button variant={filter === 'all' ? 'contained' : 'outlined'}
                            onClick={onAllClickHandler}>
                        All
                    </Button>
                    <Button variant={filter === 'active' ? 'contained' : 'outlined'}
                            onClick={onActiveClickHandler}>
                        Active
                    </Button>
                    <Button variant={filter === 'completed' ? 'contained' : 'outlined'}
                            onClick={onCompletedClickHandler}>
                        Completed
                    </Button>
                </ButtonGroup>
            </div>
        </div>
    )
})
