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