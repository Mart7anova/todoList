import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import AppWithRedux from '../AppWithRedux';
import { ReduxStoreProviderDecorator } from './dicorators/ReduxStoreProviderDecorator';

export default {
    title: 'TODOLIST/AppWithRedux',
    component: AppWithRedux,
    decorators: [ReduxStoreProviderDecorator]

} as ComponentMeta<typeof AppWithRedux>;

const Template: ComponentStory<typeof AppWithRedux> = () => <AppWithRedux />;

export const AppWithReduxExample = Template.bind({});
AppWithReduxExample.args = {
};


