import React from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import AddItemForm from "./AdditemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC,
    RemoveTodolistAC,
} from "./state/todolists-reducer";
import {
    AddTaskAC,
    AddTodolistAC,
    ChangeTaskStatusAC,
    ChangeTaskTitleAC,
    RemoveTaskAC,
} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";

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

    const todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const dispatch = useDispatch()

    function removeTask(id: string, todolistId: string) {
        dispatch(RemoveTaskAC(id, todolistId))
    }

    function changeFilter(value: FilterType, todolistID: string) {
        dispatch(ChangeTodolistFilterAC(value, todolistID))
    }

    function addTask(title: string, todolistId: string) {
        dispatch(AddTaskAC(title, todolistId))
    }

    function changeStatus(id: string, isDone: boolean, todolistId: string) {
        dispatch(ChangeTaskStatusAC(id, isDone, todolistId))
    }

    function changeTaskTitle(id: string, title: string, todolistId: string) {
        dispatch(ChangeTaskTitleAC(id, title, todolistId))
    }

    function changeTodolistTitle(title: string, todolistId: string) {
        dispatch(ChangeTodolistTitleAC(title, todolistId))
    }

    function removeTodolist(id: string) {
        dispatch(RemoveTodolistAC(id))
    }

    function addTodolist(title: string) {
        dispatch(AddTodolistAC(title))
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
