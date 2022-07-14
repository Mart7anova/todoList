import {FilterValuesType} from './App';
import {AddItemForm} from './components/AddItemForm';
import {EditableSpan} from './components/EditableSpan';
import {Button, ButtonGroup, IconButton, List} from '@material-ui/core';
import {HighlightOff} from '@material-ui/icons';
import React, {memo, useCallback, useMemo} from 'react';
import {Task} from './Task';


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
            return <Task key={t.id}
                         task={t}
                         removeTask={removeTaskHandler}
                         changeTasksStatus={changeIsDoneHandler}
                         changeTaskTitle={changeTaskTitleHandler}
            />
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
                ? <List>{tasksWithUseMemo}</List>
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
