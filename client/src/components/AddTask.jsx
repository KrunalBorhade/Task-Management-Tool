import React, { useState } from 'react'
import { Container } from '@mui/system';
import { TextField, Button, TextareaAutosize, InputLabel, Select, MenuItem, Box, FormControl, Alert } from '@mui/material';
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useEffect } from 'react';

export const AddTask = (props) => {
    const [taskName, setTaskName] = useState("")
    const [desc, setDesc] = useState("")
    const [devloper, setDeveloper] = useState("")
    const [dueDate, setdueDate] = useState("")

    useEffect(() => {
        registerData()
    }, [])

    const regData = (e) => {
        e.preventDefault()
    }

    const registerData = async (e) => {
        e.preventDefault()
        try {
            let res = await fetch("https://presolv-task.herokuapp.com/task", {
                method: "POST",
                body: JSON.stringify({
                    taskName,
                    desc,
                    devloper,
                    dueDate
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
            let data = await res.json()
            console.log(data)
            props.getData()
        } catch (error) {
            console.log(error)
        }
    }

    const handleChange = (e) => {
        setDeveloper(e.target.value);
    }

    const taskAdd = (e) => {
        setTaskName(e.target.value)
        if (taskName.length > 100) {
            alert("Text Length must be 100 Characters")
        }
    }

    const taskDes = (e) => {
        setDesc(e.target.value)
        if (desc.length > 100) {
            alert("Text Length must be 500 Characters")
        }
    }

    return (
        <div>
            <h2 style={{ fontFamily: "revert-layer" }}>Add Task</h2>

            <form onSubmit={regData}>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    '& > :not(style)': { m: 1 },
                    justifyContent: "center", textOverflow: 'ellipsis'
                }}>
                    <TextField id="outlined-basic" type="text" label="Task Name" error variant="outlined" required sx={{ mt: '50rem', }} onChange={taskAdd} inputProps={{ maxLength: 100 }} />
                    <TextareaAutosize id="outlined-basic" value={desc} type="text" placeholder="Task-Description" maxRows={4} variant="outlined" required minRows={3} sx={{ mt: '30px', overflow: 'auto', }} style={{ width: 220 }} inputProps={{ maxLength: 5 }} onChange={taskDes} />
                    <Box>
                        <FormControl sx={{ m: 1, minWidth: 120 }}>

                            <Select
                                labelId="demo-simple-select-helper-label"
                                id="demo-simple-select-helper"
                                value={devloper}
                                label="devloper"
                                onChange={handleChange}
                                style={{ width: "220px" }}
                            >

                                <MenuItem value={"Krunal"}>Krunal</MenuItem>
                                <MenuItem value={"Shubham"}>Shubham</MenuItem>
                                <MenuItem value={"Amaan"}>Amaan</MenuItem>
                                <MenuItem value={"Swara"}>Swara</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    <Box>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                views={["year", "month", "day"]}
                                label="Due Date"
                                value={dueDate}

                                onChange={(newValue) => {
                                    setdueDate((newValue).format('YYYY-MM-DD'));
                                }}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                    </Box>

                    <Button sx={{ mt: '30px' }} variant="contained" onClick={registerData}>ADD TASK</Button>
                </Box>
            </form>
        </div>
    )
}
