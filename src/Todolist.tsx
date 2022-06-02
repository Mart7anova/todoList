import {FilterValuesType} from './App';
import s from './App.module.css'
import {Checkbox} from './components/Checkbox';
import {AddItemForm} from './components/AddItemForm';

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
    changetodoListFilter: (todoListID: string, value: FilterValuesType) => void
    changeTasksStatus: (todoListID: string, id: string, isDone: boolean) => void

}

export function Todolist(props: PropsType) {

    const addTask = (title: string) => {
        props.addTask(props.todoListID, title);
    }
    const onAllClickHandler = () => props.changetodoListFilter(props.todoListID, 'all');
    const onActiveClickHandler = () => props.changetodoListFilter(props.todoListID, 'active');
    const onCompletedClickHandler = () => props.changetodoListFilter(props.todoListID, 'completed');
    const onClickHandler = (id: string) => props.removeTask(props.todoListID, id)
    const changeIsDoneHandler = (id: string, isDone: boolean) => {
        props.changeTasksStatus(props.todoListID, id, isDone)
    }

    const allButtonClasses = props.filter === 'all' ? s.activeFilter : ''
    const activeButtonClasses = props.filter === 'active' ? s.activeFilter : ''
    const completeButtonClasses = props.filter === 'completed' ? s.activeFilter : ''

    return (
        <div>
            <h3>{props.title}
                <button onClick={() => props.removeTodoList(props.todoListID)}>x</button>
            </h3>
            <AddItemForm callBack={addTask}/>
            {props.tasks.length
                ? <ul>
                    {props.tasks.map(t => {
                        return <li key={t.id} className={t.isDone ? s.isDone : ''}>
                            <Checkbox checked={t.isDone} callBack={(isDone) => changeIsDoneHandler(t.id, isDone)}/>
                            <span>{t.title}</span>
                            <button onClick={() => onClickHandler(t.id)}>x</button>
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
