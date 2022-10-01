const Player = require('../models/Player')


exports.setPlayer = async (req, res) => {
    try {
        const { playerName, pin } = req.body.data

        const newPlayer = new Player(playerName, pin)
        const newPlayerId = await newPlayer.setPlayer()

        const playerDataRes = await Player.getPlayer(newPlayerId)

        res.status(200).json({ message: playerDataRes })
    } catch (error) {
        console.log('Player Controller setPlayer Error: ', error)
    }
}


exports.getPlayers = async (req, res) => {
    try {
        const players = await Player.getAllPlayers()
        res.status(200).json({ message: players})
    } catch (error) {
        console.log('Player Controller getPlayers error: ', error)
    }
}


exports.getSinglePlayer = async (req, res) => {
    try {
        const { playerId } = req.body.data
        const singlePlayer = await Player.getPlayer(playerId)
        res.status(200).json({ message: singlePlayer})
    } catch (error) {
        console.log('PlayerController getSinglePlayer Error: ', error)
        res.status(500).json({ message: error})
    }
}