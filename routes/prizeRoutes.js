const express = require('express')
const prizeControllers = require('../controllers/prizeControllers')


const router = express.Router()


router
    .route("/setPrize")
    .post(prizeControllers.setPrize)

router
    .route("/getAllPrizes")
    .get(prizeControllers.getAllPrizes)

router
    .route("/setPlayerPrize")
    .post(prizeControllers.setPlayerPrize)

module.exports = router