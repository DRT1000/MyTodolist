import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button, IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";

type PropsType={
    addItem:(title:string)=>void
}

function AddItemForm(props: PropsType) {

    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const addItem = () => {
        if (title.trim() !== "") {
            props.addItem(title);
            setTitle("")
        } else {
            setError("Title is required")
        }
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === "Enter") {
            addItem();
        }
    }
    return <div>
            <TextField
                variant="outlined"
                size={"small"}
                value={title}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                error={!!error}
                label="Title"
                helperText={error}
            />
        <IconButton color="secondary" onClick={addItem}>
            <AddBox/>
        </IconButton>
        </div>
}

export default AddItemForm