import React from 'react';
import {Story, Meta} from '@storybook/react';
import {action} from "@storybook/addon-actions";
import Tasks, {TasksPropsType} from "../Tasks";


export default {
    title: 'TODOLISTS/Tasks',
    component: Tasks,
    argTypes: {
        onClick: {
            description: 'Btn clicked inside'
        }
    },
} as Meta;

const changeTasksTitleCallBack = action('change Title')
const changeTasksStatusCallBack = action('change status')
const removeTaskCallBack = action('remove')

const baseArg = {
    changeTasksTitle: changeTasksTitleCallBack,
    changeTasksStatus: changeTasksStatusCallBack,
    removeTask: removeTaskCallBack
}

const Template: Story<TasksPropsType> = (args) =>
    <Tasks {...args} />;

export const TasksIsDoneExample = Template.bind({});
TasksIsDoneExample.args = {
    ...baseArg,
    task: {id: '1', title: 'Js', isDone: true},
    todoListID: 'qwer',
};

export const TasksIsNotDoneExample = Template.bind({});
TasksIsNotDoneExample.args = {
    ...baseArg,
    task: {id: '2', title: 'HTML', isDone: false},
    todoListID: 'qwert',
};

