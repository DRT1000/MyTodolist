import React, {ChangeEvent, useState} from "react";
import {TextField} from "@material-ui/core";

type PropsType = {
    value: string
    onChange: (newValue: string) => void
}

function EditableSpan(props: PropsType) {
    const [editMode, setEditMode] = useState(false)
    const [title, setTitle] = useState(props.value)

    const activateEditMode = () => {
        setEditMode(true);
        setTitle(props.value)
    }
    const activateViewMode = () => {
        setEditMode(false);
        props.onChange(title)
    }
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    return editMode ?
        <TextField variant="standard" value={title} onChange={changeTitle} autoFocus onBlur={activateViewMode}/>
        : <span onDoubleClick={activateEditMode}>{props.value}</span>
}


export default EditableSpan