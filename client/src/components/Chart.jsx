import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';


ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);


export function Chart({ chartData }) {

    let devK = chartData.devK
    let devKT = chartData.devKT
    let devKF = chartData.devKF

    let devS = chartData.devS
    let devST = chartData.devST
    let devSF = chartData.devSF

    let devA = chartData.devA
    let devAT = chartData.devAT
    let devAF = chartData.devAF

    let devR = chartData.devR
    let devRT = chartData.devRT
    let devRF = chartData.devRF

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top'
            },
            title: {
                display: true,
                text: 'TASK CHART',
            },
        },
    };

    const labels = ["Krunal", 'Shubham', "Amaan", 'Swara'];

    const data = {
        labels,
        datasets: [
            {
                label: 'All Tasks',
                data: [devK, devS, devA, devR],
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: 'Completed Task',
                data: [devKT, devST, devAT, devRT],
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
            {
                label: 'Incomplete Task',
                data: [devKF, devSF, devSF, devRF],
                backgroundColor: 'rgb(0,128,128)',
            },
        ],
    };


    return (
        <>
            <div style={{ width: "600px", margin: "auto auto" }}>
                <Bar options={options} data={data} />;
            </div>
        </>
    )
}
