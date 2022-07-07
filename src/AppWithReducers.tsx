import React, {useReducer} from 'react';
import {v1} from 'uuid';
import {AddItemForm} from './components/AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {
    addTodoListAC,
    changeTodoListFilterAC,
    changeTodoListTitleAC,
    removeTodoListAC,
    todoListsReducer
} from './state/todolist-reducer';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from './state/tasks-reducer';

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type TasksStateType = {
    [todoListID: string]: Array<TaskType>
}

function AppWithReducers() {
    //BLL
    const todoListID_1 = v1()
    const todoListID_2 = v1()

    const [todoLists, dispatchToTodoList] = useReducer(todoListsReducer, [
        {id: todoListID_1, title: 'What to learn', filter: 'all'},
        {id: todoListID_2, title: 'What to bay', filter: 'all'},
    ])
    const [tasks, dispatchToTasks] = useReducer(tasksReducer, {
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

    const removeTask = (id: string, todoListID: string) => {
        dispatchToTasks(removeTaskAC(id, todoListID))
    }
    const addTask = (todoListID: string, title: string) => {
        dispatchToTasks(addTaskAC(todoListID, title))
    }
    const changeTasksStatus = (id: string, todoListID: string, isDone: boolean) => {
        dispatchToTasks(changeTaskStatusAC(id, todoListID, isDone))
    }
    const changeTaskTitle = (id: string, todoListID: string, title: string) => {
        dispatchToTasks(changeTaskTitleAC(id, todoListID, title))
    }
    const getTasksForRender = (todoList: TodoListType) => {
        let tasksForRender = tasks[todoList.id]
        if (todoList.filter === 'active') {
            tasksForRender = tasks[todoList.id].filter(t => !t.isDone)
        }
        if (todoList.filter === 'completed') {
            tasksForRender = tasks[todoList.id].filter(t => t.isDone)
        }
        return tasksForRender
    }

    const removeTodoList = (todoListID: string) => {
        const action = removeTodoListAC(todoListID)
        dispatchToTodoList(action)
        dispatchToTasks(action)
    }
    const addTodoList = (title: string) => {
        const action = addTodoListAC(title)
        dispatchToTodoList(action)
        dispatchToTasks(action)
    }
    const changeTodoListsFilter = (todoListID: string, filter: FilterValuesType) => {
        dispatchToTodoList(changeTodoListFilterAC(todoListID, filter))
    }
    const changeTodoListTitle = (todoListID: string, title: string) => {
        dispatchToTodoList(changeTodoListTitleAC(todoListID, title))
    }


    const todoListsComponents = todoLists.length
        ? todoLists.map(todo => {
            return (
                <Grid item key={todo.id}>
                    <Paper elevation={1}
                           style={{padding: '20px'}}>
                        {/*<Todolist todoListID={todo.id}
                                  title={todo.title}
                                  filter={todo.filter}
                                  tasks={getTasksForRender(todo)}

                                  removeTask={removeTask}
                                  removeTodoList={removeTodoList}
                                  addTask={addTask}
                                  changeTasksStatus={changeTasksStatus}
                                  changeTaskTitle={changeTaskTitle}
                                  changeTodoListTitle={changeTodoListTitle}
                                  changeTodoListFilter={changeTodoListsFilter}
                        />*/}
                    </Paper>
                </Grid>)
        })
        : <span>Create your first TodoList!</span>
    return (
        <div>

            <AppBar position="static">
                <Toolbar style={{justifyContent: 'space-between'}}>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        Todolists
                    </Typography>
                    <Button color="inherit" variant={'outlined'}>Login</Button>
                </Toolbar>
            </AppBar>

            <Container fixed>
                <Grid container style={{padding: '15px 0px'}}>
                    <AddItemForm callBack={addTodoList}/>
                </Grid>
                <Grid container spacing={3}>
                    {todoListsComponents}
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithReducers;
