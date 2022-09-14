const Player = require('../models/Player')


exports.setPlayer = async (req, res) => {
    try {
        const { playerName } = req.body.data

        const newPlayer = new Player(playerName)
        const setPlayer = await newPlayer.setPlayer()
        console.log('Player Controller setPlayerRes: ', setPlayer)

        res.status(200).json({ message: 'PlayerSet'})
    } catch (error) {
        console.log('Player Controller setPlayer Error: ', error)
    }
}


exports.getPlayers = async (req, res) => {
    try {
        const sql = `SELECT * FROM player_data`
        const getPlayerRes = await db.execute(sql)
        const players = getPlayerRes.data
        console.log('Player Controller Players: ', players) //!REMOVE
    } catch (error) {
        console.log('Player Controller getPlayers error: ', error)
    }
}