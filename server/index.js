const connect = require("./connect");
const express = require("express");
const cors = require("cors");
const games = require("./gameRoutes");

const app = express()
const PORT = 3000

// Mounts middleware
app.use(cors()) // Used for tranferring data between the front and back end
app.use(express.json())
app.use(games)

app.listen(PORT, () => {
    connect.connectToServer()
    console.log(`Server is running on port ${PORT}`)
})