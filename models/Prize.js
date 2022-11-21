const db = require('../db/db.config')
const { v4: uuid } = require('uuid')




class Prize {
    constructor(data){
        this.prizeId = uuid();
        this.prizeName = data.prizeName;
        this.prizeImg = data.prizeImg;
        this.prizeValue = data.prizeValue;
        this.prizeDescription = data.prizeDescription;
    }


    async setPrize (){
        try {
            console.log('Prize prizeDescription: ', this.prizeDescription) //! REMOVE
            const sql = `INSERT INTO prize_data (prize_id, prize_name, prize_image, prize_value, prize_description) VALUE ('${this.prizeId}', '${this.prizeName}', '${this.prizeImg}', '${this.prizeValue}', '${this.prizeDescription}') `
            return db.execute(sql)
        } catch (error) {
            console.log('Prize.Model setPrize Error: ', error)
        }
    }

    static async getAllPrizes() {
        try {
            const sql = `SELECT * FROM prize_data`
            const prizeDataRes = await db.execute(sql)
            return prizeDataRes[0]
            
        } catch (error) {
            console.log('Prize.Model getAllPrizes Error: ', error)
        }
    }

    static async setPlayerPrize (prizeId, playerId) {
        try {
            const playerSql = `UPDATE player_data SET player_current_prize = '${prizeId}' WHERE player_id = '${playerId}'`
            const prizeSql = `UPDATE prize_data SET prize_current_owner = '${playerId}' WHERE prize_id = '${prizeId}'`
            await db.execute(playerSql)
            await db.execute(prizeSql)
            return true
        } catch (error) {
            console.log('Prize.Model setPlayerPrize Error: ', error)
            return false
        }

    }

    static async stealPrize (prizeId, oldPlayer, newPlayer, currentGift) {

        try {
            const getNumTimesStolen = async () => {
                const stolenSQL = `SELECT prize_num_steals FROM prize_data WHERE prize_id = '${prizeId}'`
                const stolenRes = await db.execute(stolenSQL)
                console.log('STOLEN RES: ',stolenRes[0][0]) //!REMOVE
                return stolenRes
            }
            //! --- Yes, I know this is a terrible way to do this for security purposes and performance. in a production environment --- !//

            const removeOldSQL = `UPDATE player_data SET player_current_prize = NULL WHERE player_id = '${oldPlayer}'`
            const setNewSQL = `UPDATE player_data SET player_current_prize = '${prizeId}' WHERE player_id = '${newPlayer}'`
            const updatedSteals = await getNumTimesStolen()
            const newSteals = updatedSteals[0][0].prize_num_steals + 1;
            const updateGiftSQL = `UPDATE prize_data SET prize_current_owner = '${newPlayer}' WHERE prize_id = '${prizeId}'`;
            const updateStealsSQL = `UPDATE prize_data SET prize_num_steals = '${newSteals}' WHERE prize_id = '${prizeId}'`;
            const updateGiftPreviousSQL = `UPDATE prize_data SET prize_previous_owner = '${oldPlayer}' WHERE prize_id = '${prizeId}'`;
            await db.execute(removeOldSQL)
            await db.execute(setNewSQL)
            await db.execute(updateGiftSQL)
            await db.execute(updateGiftPreviousSQL)
            await db.execute(updateStealsSQL)
            if (currentGift){
                const updateGiftSQL = `UPDATE prize_data SET prize_current_owner = NULL WHERE prize_id = '${currentGift}'`
                await db.execute(updateGiftSQL)
            }
            return true
        } catch (error) {
            console.log('Prize Model stealPrize Error: ', error)
            return false
        }

    }

    static async test (prizeId) {
        const stolenSQL = `SELECT prize_num_steals FROM prize_data WHERE prize_id = '${prizeId}'`
        const stolenRes = db.execute(stolenSQL)
        return stolenRes
    }
}

module.exports = Prize