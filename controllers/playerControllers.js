const Player = require('../models/Player')


exports.setPlayer = async (req, res) => {
    try {
        const { playerName, pin } = req.body.data

        const newPlayer = new Player(playerName, pin)
        const newPlayerId = await newPlayer.setPlayer()

        const playerDataRes = await Player.getPlayer(newPlayerId)

        res.status(200).json({ message: playerDataRes[0][0] })
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