import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {Task} from '../Task';

export default {
    title: 'TODOLIST/Task',
    component: Task,
    args: {
        removeTask: action('remove task'),
        changeTasksStatus: action('change task status'),
        changeTaskTitle: action('change task title'),
    }
} as ComponentMeta<typeof Task>;

const Template: ComponentStory<typeof Task> = (args) => <Task {...args} />;

export const TaskExample = Template.bind({});
TaskExample.args = {
    task: {id: 'task-01', title: 'Task', isDone: false},

};

export const TaskIsDone = Template.bind({});
TaskIsDone.args = {
    task: {id: 'task-02', title: 'Task', isDone: true},

};


