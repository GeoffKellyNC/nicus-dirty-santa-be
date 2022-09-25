const express = require('express')
const gameControllers = require('../controllers/gameControllers')


const router = express.Router();


router
    .route("/startGame")
    .post(gameControllers.startGame)

router
    .route("/setPlayerTurn")
    .post(gameControllers.setPlayerTurn)

router
    .route("/rejoinGame")
    .post(gameControllers.rejoinGame)



module.exports = router