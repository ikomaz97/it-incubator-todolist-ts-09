import {FilterValuesType, TasksStateType, TodolistType} from '../App';
import {v1} from 'uuid';

export type RemoveTaskActionType = {
    type: ''
}
export type AddTaskActionType = {
    type: ''
}


type ActionsType = RemoveTaskActionType | AddTaskActionType;

export const taskReducer = (state: Array<TasksStateType>, action: ActionsType) => {
    switch (action.type) {
        case '':
            return state
        case '':
            return state


        default:
            throw new Error("I don't understand this type")
    }
}

export const removeTaskAC = (todolistId: string): RemoveTaskActionType => {
    return { type: ''}
}
export const addTaskC = (title: string): AddTaskActionType => {
    return { type: ''}
}
