import React, {useState} from 'react';
import s from'./App.module.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from './components/AddItemForm';

export type FilterValuesType = 'all' | 'active' | 'completed';
export type todoListType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type taskType = {
    id: string
    title: string
    isDone: boolean
}

export type tasksStateType = {
    [todoListID: string]: Array<taskType>
}

function App() {
    //BLL
    const todoListID_1 = v1()
    const todoListID_2 = v1()

    const [todoLists, setTodoLists] = useState<Array<todoListType>>([
        {id: todoListID_1, title: 'What to learn', filter: 'all'},
        {id: todoListID_2, title: 'What to bay', filter: 'all'},
    ])
    const [tasks, setTasks] = useState({
        [todoListID_1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
            {id: v1(), title: 'Rest API', isDone: false},
            {id: v1(), title: 'GraphQL', isDone: false},
        ],
        [todoListID_2]: [
            {id: v1(), title: 'Sugar', isDone: true},
            {id: v1(), title: 'Chocolate', isDone: true},
            {id: v1(), title: 'Cake', isDone: false},
            {id: v1(), title: 'Ice-cream', isDone: false},
        ]
    })

    function removeTask(todoListID: string, id: string) {
        setTasks({...tasks, [todoListID]: tasks[todoListID].filter(t => t.id !== id)})
    }
    function addTask(todoListID: string, title: string) {
        const task: taskType = {id: v1(), title, isDone: false}
        setTasks({...tasks, [todoListID]: [task, ...tasks[todoListID]]})
    }
    function changeTodoListsFilter(todoListID: string, filter: FilterValuesType) {
        setTodoLists(todoLists.map(todo => todo.id === todoListID ? {...todo, filter} : todo))
    }
    function changeTasksStatus(todoListID: string, id: string, isDone: boolean) {
        const newTask = tasks[todoListID].map(t => t.id === id ? {...t, isDone} : t)
        setTasks({...tasks, [todoListID]: newTask})
    }
    const removeTodoList = (todoListID: string) => {
        setTodoLists(todoLists.filter(todo => todo.id !== todoListID))
        delete tasks[todoListID]
    }
    const addTodoList = (title: string) =>{
        const newTodoListID = v1()
        const newTodoList: todoListType={ id:newTodoListID, title, filter: 'all'}
        setTodoLists([newTodoList,...todoLists])
        setTasks({...tasks, [newTodoListID]:[]})
    }
    const getTasksForRender = (todoList: todoListType) => {
        let tasksForRender = tasks[todoList.id]
        if (todoList.filter === 'active') {
            tasksForRender = tasks[todoList.id].filter(t => !t.isDone)
        }
        if (todoList.filter === 'completed') {
            tasksForRender = tasks[todoList.id].filter(t => t.isDone)
        }
        return tasksForRender
    }

    const todoListsComponents = todoLists.length ? todoLists.map(todo => {
            return (
                <Todolist key={todo.id}
                          todoListID={todo.id}
                          title={todo.title}
                          filter={todo.filter}
                          tasks={getTasksForRender(todo)}

                          removeTask={removeTask}
                          removeTodoList={removeTodoList}
                          addTask={addTask}
                          changetodoListFilter={changeTodoListsFilter}
                          changeTasksStatus={changeTasksStatus}/>

            )
        }) : <span>Create your first TodoList!</span>
    return (
        <div className={s.App}>
            <AddItemForm callBack={addTodoList} />
            {todoListsComponents}
        </div>
    );
}

export default App;
