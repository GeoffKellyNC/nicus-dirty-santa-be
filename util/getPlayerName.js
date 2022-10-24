

const getPlayerName = (playerData, playerId) => {
    const player = playerData.find(player => player.id === playerId)
    return player.player_name
}

export default getPlayerName