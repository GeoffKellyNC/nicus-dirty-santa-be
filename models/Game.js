const db = require('../db/db.config')
const { v4: uuid } = require('uuid')
const ioSocket  = require('../util/returnSocket').ioSocket



class Game {
    constructor(){
        this.gameId = uuid()
    }

    async startGame(){
        try {
            const sql = `INSERT INTO game_data (game_id, game_status) VALUE ('${this.gameId}', 'active')`
            await db.execute(sql)
            return this.gameId
        } catch (error) {
            console.log('GameModel startGame Error: ', error)
        }
    }

    /**
     * 
     * @param {string} playerId 
     * @param {string} gameId 
     * @returns playerUID as a string
     */

    static async setCurrentPlayer(playerId, gameId){
        try {
            const sql = `UPDATE game_data SET current_turn = '${playerId}' WHERE game_id = '${gameId}'`
            await db.execute(sql)
            return playerId
        } catch (error) {
            console.log('GameModel setNextPlayer Error: ', error)
        }
    }

    static async rejoinGame(userName, pin){
        try {
            const getPlayerInfoSQL = `SELECT * FROM player_data WHERE player_name = '${userName}' AND player_pin = '${pin}'`
            const playerInfo = await db.execute(getPlayerInfoSQL)
            return playerInfo[0][0]
            
        } catch (error) {
            console.log('GameModel rejoinGame Error: ', error)
        }
    }

    static async getGameData (gameId){
        try {
            const sql = `SELECT * FROM game_data WHERE game_id = '${gameId}'`
            const gameData = await db.execute(sql)
            return gameData[0][0]
        } catch (error) {
            console.log('GameModel getGameData Error: ', error)
        }
    }

    static async handleSocket(type){
        try {
            switch (type) {
                case 'start':
                    console.log('Socket Check', ioSocket)
                    break;
                default:
                    break;
            }
        } catch(error){
            console.log(error)
        }

    }
}



module.exports = Game;