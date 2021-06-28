import React from 'react';
import { Story, Meta } from '@storybook/react';
import {action} from "@storybook/addon-actions";
import {AddItemForm, AddItemFormPropsType} from "../AddItemForm";


export default {
    title: 'TODOLISTS/AddItemForm',
    component: AddItemForm,
    argTypes: {
       onClick: {
           description: 'Btn clicked inside'
       }
    },
} as Meta;

const Template: Story<AddItemFormPropsType> = (args) =>
    <AddItemForm {...args} />;

export const AddItemFormExample = Template.bind({});
AddItemFormExample.args = {
  addItem: action('btn clicked')
};

