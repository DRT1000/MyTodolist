import React, {useCallback} from "react";
import {FilterType} from "./App";
import AddItemForm from "./AdditemForm";
import EditableSpan from "./EditableSpan";

import {Task} from "./Task";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    filter: FilterType
    tasks: Array<TaskType>
    removeTodolist: (id: string) => void
    removeTask: (id: string, todolistId: string) => void
    changeFilter: (value: FilterType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (id: string, title: string, todolistId: string) => void
    changeTodolistTitle: (title: string, todolistId: string) => void
}

export const Todolist: React.FC<PropsType> = React.memo(function Todolist(props: PropsType) {
    console.log("Todolist called")
    let tasksForTodolist = props.tasks
    if (props.filter === "active") {
        tasksForTodolist = props.tasks.filter(t => !t.isDone)
    }
    if (props.filter === "completed") {
        tasksForTodolist = props.tasks.filter(t => t.isDone)
    }

    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id)
    }, [props.addTask, props.id])

    const removeTodolist = () => props.removeTodolist(props.id)

    const onAllClick = useCallback(() => props.changeFilter("all", props.id), [props.id])
    const onActiveClick = useCallback(() => props.changeFilter("active", props.id), [props.id])
    const onCompletedClick = useCallback(() => props.changeFilter("completed", props.id), [props.id])

    const changeTodolistTitle = useCallback((title: string) => {
        props.changeTodolistTitle(title, props.id)
    }, [])


    return <div>
        <h3><EditableSpan onChange={changeTodolistTitle} value={props.title}/>
            <IconButton onClick={removeTodolist}>
                <Delete/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask}/>
        <div>
            {
                tasksForTodolist.map(t => {
                        return <Task
                            key={t.id}
                            task={t}
                            todolistId={props.id}
                            changeTaskTitle={props.changeTaskTitle}
                            changeTaskStatus={props.changeTaskStatus}
                            removeTask={props.removeTask}
                        />
                    }
                )
            }
        </div>
        <div>
            <Button variant={props.filter === "all" ? "outlined" : "text"}
                    onClick={onAllClick} color={"secondary"}>All
            </Button>
            <Button variant={props.filter === "active" ? "outlined" : "text"}
                    onClick={onActiveClick} color={"primary"}>Active
            </Button>
            <Button variant={props.filter === "completed" ? "outlined" : "text"}
                    onClick={onCompletedClick} color={"default"}>Completed
            </Button>
        </div>
    </div>
})
