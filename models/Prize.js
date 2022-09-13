const db = require('../db/db.config')
const { v4: uuid } = require('uuid')




class Prize {
    constructor(data){
        this.prizeId = uuid();
        this.prizeName = data.prizeName;
        this.prizeImg = data.prizeImg;
    }


    async setPrize (){
        try {
            const sql = `INSERT INTO prize_data (prize_id, prize_name, prize_image) VALUE ('${this.prizeId}', '${this.prizeName}', '${this.prizeImg}') `
            return db.execute(sql)
        } catch (error) {
            console.log('Prize.Model setPrize Error: ', error)
        }
    }

    static async getAllPrizes() {
        try {
            const sql = `SELECT * FROM prize_data`
            const prizeDataRes = await db.execute(sql)
            const allPrizeData = prizeDataRes.data
            console.log('All Prize Data: ', allPrizeData) //! REMOVE
            
        } catch (error) {
            console.log('Prize.Model getAllPrizes Error: ', error)
        }
    }
}