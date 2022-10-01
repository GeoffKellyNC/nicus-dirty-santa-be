const express = require('express')
const gameControllers = require('../controllers/gameControllers')


const router = express.Router();




// POST ROUTES ----------

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