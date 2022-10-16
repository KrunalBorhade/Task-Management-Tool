const mongoose = require("mongoose")


const taskSchema = new mongoose.Schema(
    {
        taskName: { type: String, required: true, maxLength: 100 },
        desc: { type: String, required: true, maxLength: 500 },
        devloper: { type: String, required: true },
        dueDate: { type: Date, required: true },
        taskComplete: { type: Boolean, default: false }
    },
    {
        timestamps: true,
        versionKey: false
    }
)

const Task = mongoose.model("task", taskSchema)
module.exports = Task