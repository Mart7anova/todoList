import {FilterValuesType} from './App';
import s from './App.module.css'
import {Checkbox} from './components/Checkbox';
import {AddItemForm} from './components/AddItemForm';
import {EditableSpan} from './components/EditableSpan';

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

    removeTask: (todoListID: string, taskId: string) => void
    removeTodoList: (todoListID: string) => void
    addTask: (todoListID: string, title: string) => void
    changeTasksStatus: (todoListID: string, id: string, isDone: boolean) => void
    changeTaskTitle: (todoListID: string, id: string, title: string)=> void
    changeTodoListTitle:(todoListID: string, title: string) => void
    changeTodoListFilter: (todoListID: string, value: FilterValuesType) => void


}

export function Todolist(props: PropsType) {

    const removeTaskHandler = (id: string) => props.removeTask(props.todoListID, id)
    const addTaskHandler = (title: string) => {
        props.addTask(props.todoListID, title);
    }
    const changeIsDoneHandler = (id: string, isDone: boolean) => {
        props.changeTasksStatus(props.todoListID, id, isDone)
    }
    const changeTaskTitleHandler = (id: string, title: string) => {
        props.changeTaskTitle(props.todoListID, id, title)
    }
    const changeTodoListTitleHandler = (title: string) => {
        props.changeTodoListTitle(props.todoListID, title)
    }
    const onAllClickHandler = () => props.changeTodoListFilter(props.todoListID, 'all');
    const onActiveClickHandler = () => props.changeTodoListFilter(props.todoListID, 'active');
    const onCompletedClickHandler = () => props.changeTodoListFilter(props.todoListID, 'completed');


    const allButtonClasses = props.filter === 'all' ? s.activeFilter : ''
    const activeButtonClasses = props.filter === 'active' ? s.activeFilter : ''
    const completeButtonClasses = props.filter === 'completed' ? s.activeFilter : ''

    return (
        <div>
            <h3><EditableSpan title={props.title} callBack={changeTodoListTitleHandler}/>
                <button onClick={() => props.removeTodoList(props.todoListID)}>x</button>
            </h3>
            <AddItemForm callBack={addTaskHandler}/>
            {props.tasks.length
                ? <ul>
                    {props.tasks.map(t => {
                        return <li key={t.id} className={t.isDone ? s.isDone : ''}>
                            <Checkbox checked={t.isDone} callBack={(isDone) => changeIsDoneHandler(t.id, isDone)}/>
                            {/*<span>{t.title}</span>*/}
                            <EditableSpan title={t.title} callBack={(title)=>changeTaskTitleHandler(t.id, title)}/>
                            <button onClick={() => removeTaskHandler(t.id)}>x</button>
                        </li>
                    })}</ul>
                : <span>List is empty</span>
            }
            <div>
                <button className={allButtonClasses}
                        onClick={onAllClickHandler}>All
                </button>
                <button className={activeButtonClasses}
                        onClick={onActiveClickHandler}>Active
                </button>
                <button className={completeButtonClasses}
                        onClick={onCompletedClickHandler}>Completed
                </button>
            </div>
        </div>
    )
}
