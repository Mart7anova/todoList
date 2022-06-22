import { v1 } from 'uuid';
import {FilterValuesType, TodoListType} from '../App';

export type RemoveTodoListAT = ReturnType<typeof removeTodoListAC>
export type AddTodoListAT = ReturnType<typeof addTodoListAC>
export type ChangeTodoListFilterAT = ReturnType<typeof changeTodoListFilterAC>
export type ChangeTodoListTitleAT = ReturnType<typeof changeTodoListTitleAC>

export type ActionType = RemoveTodoListAT
    | AddTodoListAT
    | ChangeTodoListFilterAT
    | ChangeTodoListTitleAT

export const todoListsReducer = (state: Array<TodoListType>, action: ActionType): Array<TodoListType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(todo => todo.id !== action.id)

        case 'ADD-TODOLIST':
            const newTodoList: TodoListType = {
                id: action.id,
                title: action.title,
                filter: 'all'
            }
            return [...state, newTodoList]

        case 'CHANGE-TODOLIST-FILTER':
            return state.map(todo => todo.id === action.id ? {...todo, filter: action.filter} : todo)

        case 'CHANGE-TODOLIST-TITLE':
            return state.map(todo => todo.id === action.id ? {...todo, title: action.title} : todo)

        default:
            return state
    }
}

export const removeTodoListAC = (id: string) => (
    {type: 'REMOVE-TODOLIST', id} as const
)
export const addTodoListAC = (title: string) => (
    {type: 'ADD-TODOLIST', id: v1(), title} as const
)
export const changeTodoListFilterAC = (id: string, filter: FilterValuesType) => (
    {type: 'CHANGE-TODOLIST-FILTER', id, filter} as const
)
export const changeTodoListTitleAC = (id: string, title: string) => (
    {type: 'CHANGE-TODOLIST-TITLE', id, title} as const
)