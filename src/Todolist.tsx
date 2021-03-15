import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {FilterType} from "./App";
import AddItemForm from "./AdditemForm";
import EditableSpan from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {CheckBox, Delete} from "@material-ui/icons";

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

export function Todolist(props: PropsType) {

    function addTask(title: string) {
        props.addTask(title, props.id)
    }

    const removeTodolist = () => props.removeTodolist(props.id)

    const onAllClick = () => props.changeFilter("all", props.id)
    const onActiveClick = () => props.changeFilter("active", props.id)
    const onCompletedClick = () => props.changeFilter("completed", props.id)

    const changeTodolistTitle = (title: string) => {
        props.changeTodolistTitle(title, props.id)
    }


    return <div>
        <h3><EditableSpan onChange={changeTodolistTitle} value={props.title}/>
            <IconButton onClick={removeTodolist}>
                <Delete/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask}/>
        <div>
            {
                props.tasks.map(t => {
                        const removeTask = () => props.removeTask(t.id, props.id)
                        const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)
                        }
                        const changeTaskTitle = (title: string) => {
                            props.changeTaskTitle(t.id, title, props.id)
                        }
                        return (
                            <div key={t.id} className={t.isDone ? "is-done" : ""}>
                                <Checkbox color="primary" onChange={changeStatus} checked={t.isDone}/>
                                <EditableSpan value={t.title} onChange={changeTaskTitle}/>
                                <IconButton onClick={removeTask}>
                                    <Delete/>
                                </IconButton>
                            </div>)
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
}
