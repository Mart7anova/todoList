import {v1} from 'uuid';
import {TasksStateType} from '../App';
import {AddTodoListAT, RemoveTodoListAT} from './todolist-reducer';


export type RemoveTaskAT = ReturnType<typeof removeTaskAC>
export type AddTaskAT = ReturnType<typeof addTaskAC>
export type ChangeTaskStatusAT = ReturnType<typeof changeTaskStatusAC>
export type ChangeTaskTitleAT = ReturnType<typeof changeTaskTitleAC>

export type ActionType = RemoveTaskAT
    | AddTaskAT
    | ChangeTaskStatusAT
    | ChangeTaskTitleAT
    | AddTodoListAT
    | RemoveTodoListAT

const initial: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initial, action: ActionType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {
                ...state,
                [action.todoListId]: state[action.todoListId].filter(t => t.id !== action.tasksId)
            }
        case 'ADD-TASK':
            return {
                ...state,
                [action.todoListId]: [{
                    id: v1(),
                    title: action.title,
                    isDone: false
                },
                    ...state[action.todoListId]
                ]
            }
        case 'CHANGE-TASK-STATUS':
            debugger
            return {
                ...state,
                [action.todoListId]: state[action.todoListId].map(t =>
                    t.id === action.tasksId
                        ? {...t, isDone: action.isDone}
                        : t
                )
            }
        case 'CHANGE-TASK-TITLE':
            return {
                ...state,
                [action.todoListId]: state[action.todoListId].map(t =>
                    t.id === action.tasksId
                        ? {...t, title: action.title}
                        : t
                )
            }
        case 'ADD-TODOLIST':
            return {
                ...state,
                [action.id]: []
            }
        case 'REMOVE-TODOLIST':
            const copyState = {...state}
            delete copyState[action.id]
            return {...copyState}
        /*const {[action.id]:[], ...rest} = {...state}
        return rest*/
        default:
            return state
    }
}

export const removeTaskAC = (tasksId: string, todoListId: string) => (
    {type: 'REMOVE-TASK', tasksId, todoListId} as const
)
export const addTaskAC = (todoListId: string, title: string) => (
    {type: 'ADD-TASK', todoListId, title} as const
)
export const changeTaskStatusAC = (tasksId: string, todoListId: string, isDone: boolean) => (
    {type: 'CHANGE-TASK-STATUS', tasksId, todoListId, isDone} as const
)
export const changeTaskTitleAC = (tasksId: string, todoListId: string, title: string) => (
    {type: 'CHANGE-TASK-TITLE', tasksId, todoListId, title} as const
)

