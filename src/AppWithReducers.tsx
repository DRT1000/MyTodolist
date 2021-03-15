import React, {useReducer, useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from "uuid";
import AddItemForm from "./AdditemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC,
    RemoveTodolistAC,
    todolistsReducer
} from "./state/todolists-reducer";
import {
    AddTaskAC,
    AddTodolistAC,
    ChangeTaskStatusAC,
    ChangeTaskTitleAC,
    RemoveTaskAC,
    tasksReducer
} from "./state/tasks-reducer";

export type FilterType = "all" | "active" | "completed"
export type TodolistType = {
    id: string
    title: string
    filter: FilterType
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}


function App() {
    let todolistId1 = v1()
    let todolistId2 = v1()

    let [todolists, dispatchToTodolist] = useReducer(todolistsReducer, [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ])

    let [tasks, dispatchToTasks] = useReducer(tasksReducer, {
        [todolistId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
        ],
        [todolistId2]: [
            {id: v1(), title: "RestApi", isDone: true},
            {id: v1(), title: "Graph", isDone: false}
        ]
    })


    function removeTask(id: string, todolistId: string) {
        const action=RemoveTaskAC(id,todolistId)
        dispatchToTasks(action)
    }

    function changeFilter(value: FilterType, todolistID: string) {
        const action=ChangeTodolistFilterAC(value,todolistID)
        dispatchToTodolist(action)
    }

    function addTask(title: string, todolistId: string) {
        const action=AddTaskAC(title,todolistId)
        dispatchToTasks(action)
    }

    function changeStatus(id: string, isDone: boolean, todolistId: string) {
        const action=ChangeTaskStatusAC(id, isDone, todolistId)
        dispatchToTasks(action)
    }

    function changeTaskTitle(id: string, title: string, todolistId: string) {
        const action = ChangeTaskTitleAC(id, title, todolistId)
        dispatchToTasks(action)
    }

    function changeTodolistTitle(title: string, todolistId: string) {
        const action = ChangeTodolistTitleAC(title, todolistId)
        dispatchToTodolist(action)
    }

    function removeTodolist(id: string) {
        const action = RemoveTodolistAC(id)
        dispatchToTasks(action)
        dispatchToTodolist(action)
    }

    function addTodolist(title: string) {
        const action = AddTodolistAC(title)
        dispatchToTasks(action)
        dispatchToTodolist(action)
    }


    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "20px"}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map(tl => {
                            let allTodolistTasks = tasks[tl.id];
                            let tasksForTodolist = allTodolistTasks;

                            if (tl.filter === "active") {
                                tasksForTodolist = allTodolistTasks.filter(t => !t.isDone)
                            }
                            if (tl.filter === "completed") {
                                tasksForTodolist = allTodolistTasks.filter(t => t.isDone)
                            }

                            return <Grid item>
                                <Paper style={{padding: "10px"}}>
                                    <Todolist
                                        key={tl.id}
                                        id={tl.id}
                                        title={tl.title}
                                        tasks={tasksForTodolist}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeTaskTitle={changeTaskTitle}
                                        removeTodolist={removeTodolist}
                                        changeTaskStatus={changeStatus}
                                        changeTodolistTitle={changeTodolistTitle}
                                        filter={tl.filter}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default App;
