require('dotenv').config()
const express = require('express')
const cors = require('cors')
const http = require('http')
const { Server } = require('socket.io')



const LOCAL = true


const app = express()
app.use(express.json())
app.use(cors())

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: LOCAL ? 'http://localhost:3000' : '*',
        methods: ['GET', 'POST']
    }
});

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
        const { gameId, gameData } = data
        io.local.emit('startGame', { gameId, gameData })
    })

    socket.on('moveMadeServer', (data => {
        const { type, playerName, giftName, oldPlayerName} = data
        console.log('Gift Chosen', data) 

        switch(type){
            case 'choose':
                console.log('Gift Chosen') //!REMOVE
                io.local.emit('giftChosen', { playerName, giftName })
                io.local.emit('moveMade', { playerName })
                return
            case 'steal':
                console.log('Gift Stolen') //!REMOVE
                console.log(`${playerName} stole ${giftName} from ${oldPlayerName}!`) //!REMOVE
                io.local.emit('giftStolen', {playerName, oldPlayerName, giftName})
                io.local.emit('moveMade', { playerName })
                return
            default:
                return
        }
    }))

    socket.on('disconnect', () => {
        console.log('us disconnected');
    });
    socket.on('shuffled', (data) => {
        io.local.emit('shuffled', { shuffledPlayers: data.shuffledNames })
    })

    socket.on('updatePlayerOrder', (data) => {
        const { playerList, playerId } = data 
        io.local.emit('sendPlayerOrder', { playerList })
        io.local.emit('sendNextPlayer', { playerId })
    })
    socket.on('player-joined', (data) => {
        console.log('Player Joined', data) //!REMOVE
        const { playerName } = data
        io.local.emit('player-joined-update', { playerName })
    }) 
  });
  



const PORT = process.env.PORT || 9001;

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`)
})


