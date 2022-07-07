import React, {useCallback} from 'react';
import {AddItemForm} from './components/AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {
    addTodoListAC,
    changeTodoListFilterAC,
    changeTodoListTitleAC,
    removeTodoListAC
} from './state/todolist-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './state/store';
import {Todolist} from './Todolist';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from './state/tasks-reducer';


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

function AppWithRedux() {
    const dispatch = useDispatch()
    const todoLists = useSelector<AppRootStateType, Array<TodoListType>>(state => state.todoLists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)

    const removeTodoList = useCallback((todoListID: string) => {
        dispatch(removeTodoListAC(todoListID))
    }, [dispatch])
    const addTodoList = useCallback((title: string) => {
        dispatch(addTodoListAC(title))
    }, [dispatch])
    const changeTodoListsFilter = useCallback((todoListID: string, filter: FilterValuesType) => {
        dispatch(changeTodoListFilterAC(todoListID, filter))
    }, [dispatch])
    const changeTodoListTitle = useCallback((todoListID: string, title: string) => {
        dispatch(changeTodoListTitleAC(todoListID, title))
    }, [dispatch])

    const removeTask = useCallback((id: string, todoListID: string) => {
        dispatch(removeTaskAC(id, todoListID))
    },[dispatch])
    const addTask = useCallback((todoListID: string, title: string) => {
        dispatch(addTaskAC(todoListID, title))
    },[dispatch])
    const changeTasksStatus = useCallback((id: string, todoListID: string, isDone: boolean) => {
        dispatch(changeTaskStatusAC(id, todoListID, isDone))
    }, [dispatch])
    const changeTaskTitle = useCallback((id: string, todoListID: string, title: string) => {
        dispatch(changeTaskTitleAC(id, todoListID, title))
    }, [dispatch])



    const todoListsComponents = todoLists.length
        ? todoLists.map(todo => {
            return (
                <Grid item key={todo.id}>
                    <Paper elevation={1}
                           style={{padding: '20px'}}>
                        <Todolist todoListID={todo.id}
                                  title={todo.title}
                                  filter={todo.filter}
                                  tasks={tasks[todo.id]}

                                  removeTask={removeTask}
                                  removeTodoList={removeTodoList}
                                  addTask={addTask}
                                  changeTasksStatus={changeTasksStatus}
                                  changeTaskTitle={changeTaskTitle}
                                  changeTodoListTitle={changeTodoListTitle}
                                  changeTodoListFilter={changeTodoListsFilter}
                        />
                    </Paper>
                </Grid>)
        })
        : <div style={{padding: '10px 15px'}}>Create your first TodoList!</div>
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

export default AppWithRedux;
