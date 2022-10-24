const Prize = require('../models/Prize')





exports.setPrize = async (req, res) => {
    try {
        const { prizeName, prizeImg, prizeValue } = req.body.data
        const newPrize = new Prize({ prizeName, prizeImg, prizeValue })
        await newPrize.setPrize()

        res.status(200).json({ message: 'Prize Set'})
    } catch (error) {
        res.status(500).json({ message: error })
        console.log('prize.controller setPrize Error: ', error)
    }
}

exports.getAllPrizes = async (req, res) => {
    try {
        const prizeData = await Prize.getAllPrizes()
        res.status(200).json({ message: prizeData})
    } catch (error) {
        console.log('prize.controller getAllPrizes Error: ', error)
        res.status(500).json({ message: error})
    }
}

exports.setPlayerPrize = async (req, res) => {
    try {
        const { prizeId, playerId } = req.body.data
        const setPrize = await Prize.setPlayerPrize(prizeId, playerId)
        return setPrize ? res.status(200).json({ message: 'Successful'}) : res.status(420).json({message: 'Error'})
        
    } catch (error) {
        console.log('prizeControllers setPlayer Prize Error: ', error)
        res.status(500).json({ message: error})
    }
}


exports.stealPrize = async (req, res) => {
    try {
        const { prizeId, oldPlayer, newPlayer, currentGift } = req.body.data


        const handleSteal = await Prize.stealPrize(prizeId, oldPlayer, newPlayer, currentGift)

        if (handleSteal){
            res.status(200).json({ message: 'OK'})
        }

    } catch (error) {
        console.log('prizeControllers stealPrize Error: ', error)
        res.status(500).json({ message: error})
    }
}