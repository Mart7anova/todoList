import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';

export type filterType = 'all' | 'active' | 'completed'
export type tasksType={
    id:number
    title:string
    isDone:boolean
}

const defaultTasks: Array<tasksType> = [
    {id: 1, title: 'HTML&CSS', isDone: true},
    {id: 2, title: 'JS', isDone: true},
    {id: 3, title: 'JS', isDone: true},
    {id: 4, title: 'JS', isDone: true},
    {id: 5, title: 'ReactJS', isDone: false}
]

function App() {

    let [tasks, setTasks] = useState<Array<tasksType>>(defaultTasks)
    const [filter, setFilter] = useState<filterType>('all')

    let taskFilter = tasks
    if(filter==='active') taskFilter = tasks.filter(t=>t.isDone)
    if(filter==='completed') taskFilter = tasks.filter(t=>!t.isDone)

    const changeFilter = (name: filterType) => {
        setFilter(name)
    }

    const removeTasks = (id: number) => {
        tasks = tasks.filter(el => el.id !== id)
        return setTasks(tasks)
    }

    return (
        <div className="App">
            <Todolist
                title="What to learn"
                tasks={taskFilter}
                removeTasks={removeTasks}
                changeFilter={changeFilter}
            />
        </div>
    );
}

export default App;
