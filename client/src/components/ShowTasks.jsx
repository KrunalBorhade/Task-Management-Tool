import { experimental_extendTheme } from '@mui/material'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { AddTask } from './AddTask'
import { Chart } from './Chart'
import "./ShowTask.css"

export const ShowTasks = () => {
    const [data, setData] = useState([])
    const [toggle, setToggle] = useState(false)
    const [chartData, setChartData] = useState([])

    useEffect(() => {

        getData()

    }, [])


    const getData = async () => {
        try {
            let data1 = await fetch("http://localhost:5000/task")
            let res = await data1.json()
            setChartData(res)
            setData(res.task)
        } catch (error) {
            console.log(error)
        }
    }

    const handleChange = async (e) => {
        setToggle(!toggle)
        try {
            let res = await fetch(`http://localhost:5000/task/${e}`, {
                method: "PATCH",
                body: JSON.stringify({
                    taskComplete: toggle
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
            let data = await res.json()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <AddTask getData={getData} />
            <h2>All Tasks</h2>
            <div className='display-container'>
                {data.map((e) => {
                    return (
                        <div className='display-main'>
                            <h1 key={e._id}>{e.taskName}</h1>
                            <p>{e.desc}</p>
                            <div className='main-flex'>
                                <p>{e.devloper}</p>
                                <p>{e.dueDate.slice(0, 10)}</p>
                            </div>
                            <button onClick={() => handleChange(e._id)}>{e.taskComplete ? "Complete" : "Incomplete"}</button>
                        </div>
                    )
                })}
            </div>

            <Chart chartData={chartData} />
        </div>
    )
}
