import {FilterValuesType} from './App';
import s from './App.module.css'
import {AddItemForm} from './components/AddItemForm';
import {EditableSpan} from './components/EditableSpan';
import {Button, ButtonGroup, Checkbox, IconButton, List, ListItem} from '@material-ui/core';
import {HighlightOff} from '@material-ui/icons';

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

export function Todolist(props: PropsType) {

    const removeTaskHandler = (id: string) => props.removeTask(id, props.todoListID)
    const addTaskHandler = (title: string) => {
        props.addTask(props.todoListID, title);
    }
    const changeIsDoneHandler = (id: string, isDone: boolean) => {
        props.changeTasksStatus(id, props.todoListID, isDone)
    }
    const changeTaskTitleHandler = (id: string, title: string) => {
        props.changeTaskTitle(id, props.todoListID, title)
    }
    const changeTodoListTitleHandler = (title: string) => {
        props.changeTodoListTitle(props.todoListID, title)
    }
    const onAllClickHandler = () => props.changeTodoListFilter(props.todoListID, 'all');
    const onActiveClickHandler = () => props.changeTodoListFilter(props.todoListID, 'active');
    const onCompletedClickHandler = () => props.changeTodoListFilter(props.todoListID, 'completed');


    return (
        <div>
            <h3>
                <EditableSpan title={props.title} callBack={changeTodoListTitleHandler}/>
                <IconButton onClick={() => props.removeTodoList(props.todoListID)} size={'small'}>
                    <HighlightOff/>
                </IconButton>
            </h3>

            <AddItemForm callBack={addTaskHandler}/>
            {props.tasks.length
                ? <List>
                    {props.tasks.map(t => {
                        return <ListItem key={t.id} className={t.isDone ? s.isDone : ''} style={{padding: '0px'}}>
                            <Checkbox
                                checked={t.isDone}
                                onChange={(e) => changeIsDoneHandler(t.id, e.currentTarget.checked)}
                                color={'primary'}
                            />
                            <EditableSpan
                                title={t.title}
                                callBack={(title) => changeTaskTitleHandler(t.id, title)}/>
                            <IconButton
                                onClick={() => removeTaskHandler(t.id)}
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
