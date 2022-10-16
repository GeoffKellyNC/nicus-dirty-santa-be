const Game = require('../models/Game')

exports.startGame = async (req, res) => {
    try {
        let { message } = req.body.data
        if (message = 'startGame'){
            const newGame = new Game()
            const gameId = await newGame.startGame()
            const gameData = await Game.getGameData(gameId)
            res.status(200).json({ message: gameData })
        }else{
            res.status(501).json({ message: 'Something Went Wrong'})
        }
    } catch (error) {
        console.log('gameController startGame error: ', error)
        res.status(500).json({ message: error})
    }
    
}

exports.setPlayerTurn = async (req, res) => {
    try {
        const { playerId, gameId } = req.body.data
        const currentPlayerId = await Game.setCurrentPlayer(playerId, gameId)
        res.status(200).json({ message: currentPlayerId })
    } catch (error) {
        console.log('gameController setPlayerTurn Error: ', error)
        res.status(500).json({ message: error })
    }
}

exports.rejoinGame = async (req, res) => {
    try {
        const { userName, pin } = req.body.data
        const playerData = await Game.rejoinGame(userName, pin)

        if(!playerData){
            res.status(200).json({message: 401})
            return
        }
        res.status(200).json({ message: playerData })
    } catch (error) {
        console.log('gameController rejoinGame Error: ', error)
        res.status(500).json({ message: error })
    }
}

exports.getGameData = async (req, res) => {
    try {
        const { gameId } = req.body.data
        const gameData = await Game.getGameData(gameId)
        console.log('gameData: ', gameData) //!REMOVE
        res.status(200).json({ message: gameData })
    } catch (error) {
        console.log('gameController getGameData Error: ', error)
        res.status(500).json({ message: error })
    }
}