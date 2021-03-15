import {FilterType, TodolistType} from "../App";
import {v1} from "uuid";


export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    todolistId: string
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    todolistId: string
    title: string
}
export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    title: string
}
export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: FilterType
}
export type ActionType =
    RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType

const initialState:Array<TodolistType>=[]


export const todolistsReducer = (state: Array<TodolistType>=initialState, action: ActionType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.todolistId)
        case 'ADD-TODOLIST':
            const newTodolist: TodolistType = {
                id: action.todolistId,
                title: action.title,
                filter: "all"
            }
            return [...state, newTodolist]
        case 'CHANGE-TODOLIST-TITLE':
            const todolists = state.map(tl => {
                if (tl.id === action.id) {
                    return {...tl, title: action.title}
                } else {
                    return tl
                }
            })
            return todolists
        case 'CHANGE-TODOLIST-FILTER':
            const filteredTodolist = state.map(tl => {
                if (tl.id === action.id) {
                    return {...tl, filter: action.filter}
                } else {
                    return tl
                }
            })
            return filteredTodolist
        default:
            return state
    }
}

export const RemoveTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return {type: 'REMOVE-TODOLIST', todolistId}
}
export const AddTodolistAC = (title: string): AddTodolistActionType => {
    return {type: 'ADD-TODOLIST', title: title, todolistId:v1()}
}
export const ChangeTodolistTitleAC = (title: string, todolistId:string): ChangeTodolistTitleActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', title, id:todolistId}
}
export const ChangeTodolistFilterAC = (filter:FilterType, todolistId:string): ChangeTodolistFilterActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER', filter, id:todolistId}
}
