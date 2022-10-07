require('dotenv').config()
const express = require('express')
const cors = require('cors')
const http = require('http')


const socketIo = require("socket.io");


const app = express()
app.use(express.json())
app.use(cors())

const server = http.createServer(app);
const io = socketIo(server);
app.set('io', io)

app.get('/', (req, res) => {
    res.send('<h1>Server is running</h1>')
})



// app.use("/auth", require("./routes/authRoutes"))
app.use("/player", require("./routes/playerRoutes"))
app.use("/prize", require("./routes/prizeRoutes"))
app.use("/game", require("./routes/gameRoutes"))

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    }
    );
  });


const PORT = process.env.PORT || 9001;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`)
})

module.exports = app;