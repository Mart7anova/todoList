import {FilterValuesType, TodoListType} from '../App';

export type ActionType = RemoveTodoListAT | AddTodoListAT | ChangeTodoListFilterAT | ChangeTodoListTitleAT

export type RemoveTodoListAT = {
    type: 'REMOVE-TODOLIST'
    id: string
}

export type AddTodoListAT = {
    type: 'ADD-TODOLIST'
    id: string
    title: string
}

export type ChangeTodoListFilterAT = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: FilterValuesType
}
export type ChangeTodoListTitleAT = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    title: string
}

export const todolistsReducer = (state: Array<TodoListType>, action: ActionType): Array<TodoListType> => {
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

export const RemoveTodoListAC = (id: string): RemoveTodoListAT => ({type: 'REMOVE-TODOLIST', id})
export const AddTodoListAC = (id: string, title: string): AddTodoListAT => ({type: 'ADD-TODOLIST', id, title})
export const ChangeTodoListFilterAC = (id: string, filter: FilterValuesType): ChangeTodoListFilterAT => ({type: 'CHANGE-TODOLIST-FILTER', id, filter})
export const ChangeTodoListTitleAC = (id: string, title: string): ChangeTodoListTitleAT => ({type: 'CHANGE-TODOLIST-TITLE', id, title})