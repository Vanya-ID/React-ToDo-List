import React from 'react';
import {Story, Meta} from '@storybook/react';
import AppWithRedux from "../AppWithRedux";
import {ReduxStoreProviderDecorator} from "./ReduxStoreProviderDecorator";


export default {
    title: 'TODOLISTS/AppWithRedux',
    component: AppWithRedux,
    decorators: [ReduxStoreProviderDecorator],
    argTypes: {
        onClick: {
            description: 'Btn clicked inside'
        }
    },
} as Meta;


const Template: Story = (args) => <AppWithRedux {...args} />;
export const AppWithReduxExample = Template.bind({});
AppWithReduxExample.args = {};
