import { createServer } from "http";
import { Server, Socket } from "socket.io";

// Interfaces
import InterfaceMessages from './interfaces/interface.msg'

const httpServer = createServer();
const io = new Server(httpServer, {
    transports: ['websocket']
});

let AllMessages = <Array<InterfaceMessages>>[]

io.on('connection', (socket: Socket) => {
    console.log('[IO] Connection => Server has a new connection')
    io.emit('chat.message', AllMessages)
    socket.on('chat.message', (msg: InterfaceMessages) => {
        AllMessages.push(msg)
        io.emit('chat.message', AllMessages)
    })
    socket.on('disconnect', () => {
        console.log('[SOCKET] Disconnect => A connection was disconnected')
    })

})

httpServer.listen(8888, '192.168.1.9', 0, () => {
    console.log('Server Run!');
});