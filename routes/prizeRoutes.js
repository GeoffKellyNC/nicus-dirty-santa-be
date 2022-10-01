const express = require('express')
const prizeControllers = require('../controllers/prizeControllers')


const router = express.Router()


// GET ROUTES ----------

router
    .route("/getAllPrizes")
    .get(prizeControllers.getAllPrizes)




// POST ROUTES ----------

router
    .route("/setPrize")
    .post(prizeControllers.setPrize)


router
    .route("/setPlayerPrize")
    .post(prizeControllers.setPlayerPrize)

router
    .route("/stealPrize")
    .post(prizeControllers.stealPrize)



module.exports = router