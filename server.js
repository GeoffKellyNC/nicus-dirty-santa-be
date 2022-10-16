require('dotenv').config()
const express = require('express')
const cors = require('cors')
const http = require('http')
const returnSocket = require('./util/returnSocket').returnSocket


const socketIo = require("socket.io");


const app = express()
app.use(express.json())
app.use(cors())

const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});
app.set('io', io)

app.get('/', (req, res) => {
    res.send('<h1>Server is running</h1>')
})


// app.use("/auth", require("./routes/authRoutes"))
app.use("/player", require("./routes/playerRoutes"))
app.use("/prize", require("./routes/prizeRoutes"))
app.use("/game", require("./routes/gameRoutes"))




io.on('connection', (socket) => {
    console.log('New client connected')
    socket.on('startGame' , (data) => {
        const { gameId } = data
        io.local.emit('startGame', { gameId })
    })
    socket.on('sendGiftChosen', (data) => {
        console.log('Gift Chosen', data) //!REMOVE
        const { playerName, giftName } = data
        io.local.emit('giftChosen', { playerName, giftName })
        io.local.emit('moveMade', { playerName })
    })
    socket.on('disconnect', () => {
        console.log('user disconnected');
    }
    );
  });



const PORT = process.env.PORT || 9001;
server.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}...`)
})


