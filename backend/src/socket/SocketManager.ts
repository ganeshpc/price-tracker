import { Server as HttpServer } from "http";

import { Server } from "socket.io";

class SocketManager {

    io: Server;

    constructor(httpServer: HttpServer) {
        this.io = new Server(httpServer);
        this.io.on('connection', (socket: any) => {
            console.log('a user connected');

            setInterval(() => {
                socket.emit('message', 'hello');
            }, 1000);

            socket.on('disconnect', () => {
                console.log('user disconnected');
            });
        });        
    }
};

export default SocketManager;
