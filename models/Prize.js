const db = require('../db/db.config')
const { v4: uuid } = require('uuid')




class Prize {
    constructor(data){
        this.prizeId = uuid();
        this.prizeName = data.prizeName;
        this.prizeImg = data.prizeImg;
        this.prizeValue = data.prizeValue
    }


    async setPrize (){
        try {
            const sql = `INSERT INTO prize_data (prize_id, prize_name, prize_image, prize_value) VALUE ('${this.prizeId}', '${this.prizeName}', '${this.prizeImg}', '${this.prizeValue}') `
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
        }

    }
}

module.exports = Prize