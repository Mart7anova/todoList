import React from 'react';
import {Provider} from 'react-redux';
import { v1 } from 'uuid';
import {combineReducers, createStore} from 'redux';
import { tasksReducer } from '../../state/tasks-reducer';
import {todoListsReducer} from '../../state/todolist-reducer';
import {AppRootStateType} from '../../state/store';

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todoListsReducer
})

const initialGlobalState = {
    todoLists: [
        {id: 'todolistId1', title: 'What to learn', filter: 'all'},
        {id: 'todolistId2', title: 'What to buy', filter: 'all'}
    ],
    tasks: {
        ['todolistId1']: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'React', isDone: false},
        ],
        ['todolistId2']: [
            {id: v1(), title: 'Milk', isDone: false},
            {id: v1(), title: 'Water', isDone: true},
        ]
    }
}

export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootStateType)

export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactElement) => {
    return<Provider store={storyBookStore}>{storyFn()}</Provider>
}