import {TasksStateType} from "../App";
import {v1} from "uuid";


export type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    taskId: string
    todolistId: string
}
export type AddTaskActionType = {
    type: 'ADD-TASK'
    title: string
    todolistId: string
}
export type ChangeTaskStatusActionType = {
    type: 'CHANGE-STATUS'
    taskId: string
    todolistId: string
    isDone: boolean
}
export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TITLE'
    taskId: string
    todolistId: string
    title: string
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    title: string
    todolistId: string
}
export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    todolistId: string
}


export type ActionType =
    RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionType) => {
    switch (action.type) {
        case 'REMOVE-TASK':
            let copyState = {...state}
            copyState[action.todolistId] = copyState[action.todolistId].filter(t => t.id !== action.taskId)
            return copyState
        case 'ADD-TASK':
            let newTask = {id: v1(), title: action.title, isDone: false}
            return {
                ...state,
                [action.todolistId]: [newTask, ...state[action.todolistId]]
            }
        case "CHANGE-STATUS":
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(t => {
                    if (t.id !== action.taskId) {
                        return t
                    } else {
                        return {...t, isDone: action.isDone}
                    }
                })
            }
        case "CHANGE-TITLE":
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(task => {
                    if (task.id !== action.taskId) {
                        return task
                    } else {
                        return {...task, title: action.title}
                    }
                })
            }
        case "ADD-TODOLIST":
            return {
                ...state,
                [action.todolistId]: []
            }
        case "REMOVE-TODOLIST": {
            let copyState = {...state}
            delete copyState[action.todolistId]
            return copyState
        }
        default:
            return state
    }
}


export const RemoveTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', todolistId, taskId}
}
export const AddTaskAC = (title: string, todolistId: string): AddTaskActionType => {
    return {type: 'ADD-TASK', title, todolistId}
}
export const ChangeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string): ChangeTaskStatusActionType => {
    return {type: 'CHANGE-STATUS', taskId, isDone, todolistId}
}
export const ChangeTaskTitleAC = (taskId: string, title: string, todolistId: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TITLE', taskId, title, todolistId}
}
export const AddTodolistAC = (title: string): AddTodolistActionType => {
    return {type: 'ADD-TODOLIST', title, todolistId: v1()}
}
