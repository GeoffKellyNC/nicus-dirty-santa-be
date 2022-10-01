const express = require('express')
const playerControllers = require('../controllers/playerControllers')



const router = express.Router()


// GET ROUTES ----------
router
    .route("/getPlayers")
    .get(playerControllers.getPlayers)



    

// POST ROUTES ----------


router
    .route("/setPlayer")
    .post(playerControllers.setPlayer)

router
    .route("/getSinglePlayer")
    .post(playerControllers.getSinglePlayer)





module.exports = router
