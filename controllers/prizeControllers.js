const Prize = require('../models/Prize')





exports.setPrize = async (req, res) => {
    try {
        const { prizeId, prizeName, prizeImg } = req.body.data
        const newPrize = new Prize({ prizeId, prizeName, prizeImg })
        await newPrize.setPrize()

        res.status(200).json({ message: 'Prize Set'})
    } catch (error) {
        res.status(500).json({ message: error })
        console.log('prize.controller setPrize Error: ', error)
    }
}