const db = require('../db/db.config')
const { v4: uuid } = require('uuid')


class Player {
    constructor(playerName){
        this.playerId = uuid();
        this.playerName = playerName
    }

    setPlayer () {
        try {
            const sql = `INSERT INTO player_data (player_id, player_name) VALUES ('${this.playerId}', '${this.playerName}')`
            return db.execute(sql)
        } catch (error) {
            console.log('Player Model setPlayer Error: ', error)
        }
    }

    static async getAllPlayers() {
        const sql = `SELECT * FROM player_data`
        const playerRes = await db.execute(sql)
        const playerData = playerRes.data 
        console.log('Player model PlayerData: ', playerData) //!REMOVE
    }
}

module.exports = Player