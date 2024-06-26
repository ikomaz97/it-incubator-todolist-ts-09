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

export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS',
    taskId: string,
    isDone: boolean,
    todoListId: string
}

export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE',
    taskId: string,
    newTitle: string,
    todoListId: string
}

export type AddTodolistActionType = {
    type: 'ADD-TODOLIST',
    title: string
    todoListId: string
}

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST',
    id: string
}

type ActionsType = RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType;

// Action creators
export const removeTaskAC = (taskId: string, todoListId: string): RemoveTaskActionType => {
    return { type: 'REMOVE-TASK', taskId, todoListId };
}

export const addTaskAC = (title: string, todoListId: string): AddTaskActionType => {
    return {
        type: 'ADD-TASK',
        title,
        todoListId,
    }
}

export const changeTaskStatusAC = (taskId: string, isDone: boolean, todoListId: string): ChangeTaskStatusActionType => {
    return {
        type: 'CHANGE-TASK-STATUS',
        taskId,
        isDone,
        todoListId
    }
}

export const changeTaskTitleAC = (taskId: string, newTitle: string, todoListId: string): ChangeTaskTitleActionType => {
    return {
        type: 'CHANGE-TASK-TITLE',
        taskId,
        newTitle,
        todoListId
    }
}

export const addTodolistAC = (title: string): AddTodolistActionType => {
    return { type: 'ADD-TODOLIST', title, todoListId: v1()}
}

export const removeTodolistAC = (id: string): RemoveTodolistActionType => {
    return { type: 'REMOVE-TODOLIST', id }
}

// Reducer
export const tasksReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return {
                ...state,
                [action.todoListId]: state[action.todoListId].filter(task => task.id !== action.taskId)
            };
        }
        case 'ADD-TASK': {
            const newTask = { id: v1(), title: action.title, isDone: false };
            return {
                ...state,
                [action.todoListId]: [newTask, ...state[action.todoListId]]
            }
        }
        case 'CHANGE-TASK-STATUS': {
            return {
                ...state,
                [action.todoListId]: state[action.todoListId].map(task =>
                    task.id === action.taskId ? { ...task, isDone: action.isDone } : task
                )
            }
        }
        case 'CHANGE-TASK-TITLE': {
            return {
                ...state,
                [action.todoListId]: state[action.todoListId].map(task =>
                    task.id === action.taskId ? { ...task, title: action.newTitle } : task
                )
            }
        }
        case 'ADD-TODOLIST': {
            const newTodolistId = v1();
            return {
                ...state,
                [action.todoListId]: []
            }
        }
        case 'REMOVE-TODOLIST': {
            const stateCopy = { ...state };
            delete stateCopy[action.id];
            return stateCopy;
        }
        default:
            throw new Error("I don't understand this type");
    }
}