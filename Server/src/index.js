const express = require("express")
const { register, login } = require("./controllers/user.controller")
const cors = require('cors')
const taskController = require("./controllers/task.controller")

const app = express()
app.use(express.json())
app.use(cors())

app.use("/register", register)
app.use("/login", login)
app.use("/task", taskController)


module.exports = app