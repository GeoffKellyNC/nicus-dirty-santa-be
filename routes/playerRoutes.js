const express = require('express')
const playerControllers = require('../controllers/playerControllers')



const router = express.Router()

router
    .route("/setPlayer")
    .post(playerControllers.setPlayer)

router
    .route("/getPlayers")
    .get(playerControllers.getPlayers)


module.exports = router
