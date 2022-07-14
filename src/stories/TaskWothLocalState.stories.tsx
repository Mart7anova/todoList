import React, {useState} from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {Task} from '../Task';
import {v1} from 'uuid';
import {TaskType} from '../App';

export default {
    title: 'TODOLIST/Task',
    component: Task,
} as ComponentMeta<typeof Task>;

const TaskWithLocalState = () => {
    const [tasks, setTasks] = useState<TaskType>( {id: v1(), title: 'HTML&CSS', isDone: true})

    const changeTasksStatus = () => setTasks({...tasks, isDone: !tasks.isDone})
    const changeTaskTitle = (id: string, title: string) => setTasks({...tasks, title})

    return <Task task={tasks} removeTask={action('remove task')} changeTasksStatus={changeTasksStatus} changeTaskTitle={changeTaskTitle}/>
}

const Template: ComponentStory<typeof TaskWithLocalState> = () => <TaskWithLocalState />;

export const TaskWithLocalStateExample = Template.bind({});
TaskWithLocalStateExample.args = {};


