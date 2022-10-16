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

    }, [toggle])


    const getData = async () => {
        try {
            let data1 = await fetch("https://presolv-task.herokuapp.com/task")
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
            let res = await fetch(`https://presolv-task.herokuapp.com/task/${e}`, {
                method: "PATCH",
                body: JSON.stringify({
                    taskComplete: toggle
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
            let data = await res.json()
            console.log(data)
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
                        <div key={e._id} className='display-main'>
                            <div className='displayHead'>
                            {e.taskName}
                            </div>
                            
                            <div className='display-desc'>
                            {e.desc}
                            </div>
                            
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
