import {FilterValuesType} from './App';
import s from './App.module.css'
import {AddItemForm} from './components/AddItemForm';
import {EditableSpan} from './components/EditableSpan';
import {Button, ButtonGroup, Checkbox, IconButton, List, ListItem} from '@material-ui/core';
import {HighlightOff} from '@material-ui/icons';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './state/store';
import {TasksStateType} from './AppWithRedux';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from './state/tasks-reducer';


type PropsType = {
    todoListID: string
    title: string
    filter: FilterValuesType

    removeTodoList: (todoListID: string) => void
    changeTodoListTitle: (todoListID: string, title: string) => void
    changeTodoListFilter: (todoListID: string, value: FilterValuesType) => void

}

export function TodolistWithContext(props: PropsType) {
    const dispatch = useDispatch()
    const tasks = useSelector<AppRootStateType, TasksStateType>( state => state.tasks)

    const removeTask = (id: string, todoListID: string) => {
        dispatch(removeTaskAC(id, todoListID))
    }
    const addTask = (todoListID: string, title: string) => {
        dispatch(addTaskAC(todoListID, title))
    }
    const changeTasksStatus = (id: string, todoListID: string, isDone: boolean) => {
        dispatch(changeTaskStatusAC(id, todoListID, isDone))
    }
    const changeTaskTitle = (id: string, todoListID: string, title: string) => {
        dispatch(changeTaskTitleAC(id, todoListID, title))
    }

    const changeTodoListTitleHandler = (title: string) => {
        props.changeTodoListTitle(props.todoListID, title)
    }
    const onAllClickHandler = () => props.changeTodoListFilter(props.todoListID, 'all');
    const onActiveClickHandler = () => props.changeTodoListFilter(props.todoListID, 'active');
    const onCompletedClickHandler = () => props.changeTodoListFilter(props.todoListID, 'completed');

    const getTasksForRender = () => {
        let tasksForRender = tasks[props.todoListID]
        if (props.filter === 'active') {
            tasksForRender = tasks[props.todoListID].filter(t => !t.isDone)
        }
        if (props.filter === 'completed') {
            tasksForRender = tasks[props.todoListID].filter(t => t.isDone)
        }
        return tasksForRender
    }

    return (
        <div>
            <h3>
                <EditableSpan title={props.title} callBack={changeTodoListTitleHandler}/>
                <IconButton onClick={() => props.removeTodoList(props.todoListID)} size={'small'}>
                    <HighlightOff/>
                </IconButton>
            </h3>

            <AddItemForm callBack={(title)=>{addTask(props.todoListID, title)}}/>
            {getTasksForRender().length
                ? <List>
                    {getTasksForRender().map(t => {
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
                    <Button variant={props.filter === 'all' ? 'contained' : 'outlined'}
                            onClick={onAllClickHandler}>
                        All
                    </Button>
                    <Button variant={props.filter === 'active' ? 'contained' : 'outlined'}
                            onClick={onActiveClickHandler}>
                        Active
                    </Button>
                    <Button variant={props.filter === 'completed' ? 'contained' : 'outlined'}
                            onClick={onCompletedClickHandler}>
                        Completed
                    </Button>
                </ButtonGroup>
            </div>
        </div>
    )
}
