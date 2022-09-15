const db = require('../db/db.config')
const { v4: uuid } = require('uuid')


class Player {
    constructor(playerName, pin){
        this.playerId = uuid();
        this.playerName = playerName
        this.playerPin = pin
    }

    async setPlayer () {
        try {
            const sql = `INSERT INTO player_data (player_id, player_name, player_pin) VALUES ('${this.playerId}', '${this.playerName}', '${this.playerPin}')`
            await db.execute(sql)
            return this.playerId
        } catch (error) {
            console.log('Player Model setPlayer Error: ', error)
        }
    }

    static async getAllPlayers() {
        const sql = `SELECT * FROM player_data`
        const playersData = await db.execute(sql)
        return playersData[0]
    }

    static async getPlayer (id){
        const sql = `SELECT * FROM player_data WHERE player_id = '${id}'`
        const playerData = await db.execute(sql)
        return playerData
    }
}

module.exports = Player