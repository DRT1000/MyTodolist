import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from "uuid";
import AddItemForm from "./AdditemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";

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

    let [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ])

    let [tasks, setTasks] = useState<TasksStateType>({
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
        let tasksForTodolist = tasks[todolistId]
        tasks[todolistId] = tasksForTodolist.filter(t => t.id !== id)
        setTasks({...tasks})
    }

    function changeFilter(value: FilterType, todolistID: string) {
        let todolist = todolists.find(tl => tl.id === todolistID)
        if (todolist) {
            todolist.filter = value
            setTodolists([...todolists])
        }
    }

    function addTask(title: string, todolistId: string) {
        let newTask = {id: v1(), title: title, isDone: false}
        let todolistTasks = tasks[todolistId]
        tasks[todolistId] = [newTask, ...todolistTasks]
        setTasks({...tasks})
    }

    function changeStatus(id: string, isDone: boolean, todolistId: string) {
        let todolistTasks = tasks[todolistId]
        let task = todolistTasks.find(t => t.id === id)
        if (task) {
            task.isDone = isDone
            setTasks({...tasks})
        }
    }

    function changeTaskTitle(id: string, title: string, todolistId: string) {
        let todolistTasks = tasks[todolistId]
        let task = todolistTasks.find(t => t.id === id)
        if (task) {
            task.title = title
            setTasks({...tasks})
        }
    }

    function changeTodolistTitle(title: string, todolistId: string) {
        const todolist = todolists.find(t => t.id === todolistId)
        if (todolist) {
            todolist.title = title
            setTodolists([...todolists])
        }
    }

    function removeTodolist(id: string) {
        setTodolists(todolists.filter(tl => tl.id !== id))
        delete tasks[id]
        setTasks({...tasks})
    }

    function addTodolist(title: string) {
        let newTodolistId = v1()
        let newTodolist: TodolistType = {id: newTodolistId, title: title, filter: "all"}
        setTodolists([newTodolist, ...todolists])
        setTasks({
            ...tasks,
            [newTodolistId]: []
        })
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
