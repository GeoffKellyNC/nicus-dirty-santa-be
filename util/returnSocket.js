

let ioSocket;

const returnSocket = (socket) => {
    ioSocket = socket
    return ioSocket
}


module.exports = { returnSocket, ioSocket }