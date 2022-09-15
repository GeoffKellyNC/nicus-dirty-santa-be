const express = require('express')
const prizeControllers = require('../controllers/prizeControllers')


const router = express.Router()


router
    .route("/setPrize")
    .post(prizeControllers.setPrize)

module.exports = router