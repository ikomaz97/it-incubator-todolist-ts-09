import { v1 } from 'uuid';
import { FilterValuesType, TasksStateType, TodolistType } from '../App';

// Define action types
export type RemoveTaskActionType = {
    type: 'REMOVE-TASK',
    taskId: string,
    todoListId: string
}

export type AddTaskActionType = {
    type: 'ADD-TASK',
    title: string,
    todoListId: string
}

type ActionsType = RemoveTaskActionType | AddTaskActionType;

// Action creators
export const removeTaskAC = (taskId: string, todoListId: string): RemoveTaskActionType => {
    return { type: 'REMOVE-TASK', taskId, todoListId };
}

export const addTaskAC = (title: string, todoListId: string): AddTaskActionType => {
    return {
        type: 'ADD-TASK',
        title,
        todoListId
    }
}

// Reducer
export const taskReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return {
                ...state,
                [action.todoListId]: state[action.todoListId].filter(task => task.id !== action.taskId)
            };
        }
        case 'ADD-TASK': {
            const newTask = { id: Date.now().toString(), title: action.title, isDone: false };
            return {
                ...state,
                [action.todoListId]: [newTask, ...state[action.todoListId]]
            }
        }
        default:
            throw new Error("I don't understand this type");
    }
}