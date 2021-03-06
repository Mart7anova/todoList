import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {AddItemForm} from '../components/AddItemForm';
import {action} from '@storybook/addon-actions';

export default {
  title: 'TODOLIST/AddItemForm',
  component: AddItemForm,

  argTypes: {
    callBack: {
      description: 'Button inside form clicked'
    },
  },
} as ComponentMeta<typeof AddItemForm>;

const Template: ComponentStory<typeof AddItemForm> = (args) => <AddItemForm {...args} />;

export const AddItemFormExample = Template.bind({});
AddItemFormExample.args = {
  callBack: action('Button inside form clicked')
};
