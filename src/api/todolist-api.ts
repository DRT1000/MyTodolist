import axios from "axios";

export type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    data: D
}
type TodoListType = {
    id: string
    addedDate: string
    order: number
    title: string
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}

type TaskType = {
    description: string
    title: string
    completed: boolean
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: string
    addedDate: string
}
type GetTasksResponse = {
    error: string | null
    totalCount: number
    items: TaskType[]
}

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '8e7bb9b9-2c47-4778-8965-f644b4c67b22'
    }
})


export const todolistAPI = {
    changeTodolistTitle(todoId: string, title: string) {
        return instance.put(`todo-lists/${todoId}`, {title: title})
    },
    getTodolists() {
        return instance.get<Array<TodoListType>>(`todo-lists`)
    },
    deleteTodolist(todoId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todoId}`)
    },
    createTodolist(title: string) {
        return instance.post<ResponseType<{ item: TodoListType }>>(`todo-lists`, {title: title})
    },
    getTasks(todoId: string) {
        return instance.get<GetTasksResponse>(`todo-lists/${todoId}/tasks`)
    },
    deleteTask(todoId: string, taskId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todoId}/tasks/${taskId}`)
    },
    createTask(todoId: string, title: string) {
        return instance.post<ResponseType<{ item: TaskType }>>(`todo-lists/${todoId}/tasks`, {title: title})
    },
    updateTaskTitle(todoId: string, taskId: string, title: string) {
        return instance.put<ResponseType<{ item: TaskType }>>(`todo-lists/${todoId}/tasks/${taskId}`, {title: title})
    }

}
