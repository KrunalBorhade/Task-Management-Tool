const express = require("express")
const Task = require("../models/task.model")

const router = express.Router()

router.get("/", async (req, res) => {
    try {
        const task = await Task.find().lean().exec()
        let devKT = await Task.find({ $and: [{ "taskComplete": true }, { devloper: { $eq: "Krunal" } }] }).count()
        let devKF = await Task.find({ $and: [{ "taskComplete": false }, { devloper: { $eq: "Krunal" } }] }).count()
        let devK = devKT + devKF

        let devST = await Task.find({ $and: [{ "taskComplete": true }, { devloper: { $eq: "Shubham" } }] }).count()
        let devSF = await Task.find({ $and: [{ "taskComplete": false }, { devloper: { $eq: "Shubham" } }] }).count()
        let devS = devST + devSF

        let devAT = await Task.find({ $and: [{ "taskComplete": true }, { devloper: { $eq: "Amaan" } }] }).count()
        let devAF = await Task.find({ $and: [{ "taskComplete": false }, { devloper: { $eq: "Amaan" } }] }).count()
        let devA = devAT + devAF

        let devRT = await Task.find({ $and: [{ "taskComplete": true }, { devloper: { $eq: "Swara" } }] }).count()
        let devRF = await Task.find({ $and: [{ "taskComplete": false }, { devloper: { $eq: "Swara" } }] }).count()
        let devR = devRT + devRF


        return res.status(200).send({ task, devKT, devKF, devK, devST, devSF, devS, devAT, devAF, devA, devRT, devRF, devR })
    } catch (error) {
        return res.status(500).send({ message: error.message })
    }
})

router.post("/", async (req, res) => {
    try {
        const task = await Task.create(req.body)

        return res.status(200).send(task)
    } catch (error) {
        return res.status(500).send({ message: error.message })
    }
})

router.get("/:id", async (req, res) => {
    try {
        let task = await Task.findById(req.params.id)

        if (!task) {
            return res.status(500).send({ message: "Task not found" })
        }
        task = await Task.findById(req.params.id)
        return res.status(201).send({ task })

    } catch (err) {
        return res.status(500).send({ message: err.message })
    }
})

router.patch("/:id", async (req, res) => {
    try {
        let task = await Task.findById(req.params.id)
        if (!task) {
            return res.status(500).send({ message: "Task not found" })
        }
        task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true })
        return res.status(201).send(task)
    } catch (err) {
        return res.status(500).send({ message: err.message })
    }
})

module.exports = router