import { Server as HttpServer } from "http";

import { Server } from "socket.io";

import coinPricePoller from "../utils/coinPricePoller";
import logger from "../utils/winston.config";

class SocketManager {

    io: Server;

    constructor(httpServer: HttpServer) {
        this.io = new Server(httpServer);

        this.io.on('connection', (socket: any) => {
            logger.info('User connected');

            coinPricePoller.on('priceData', (data) => {
                socket.emit('priceData', data);
            });

            socket.on('disconnect', () => {
                logger.info('User disconnected');
            });
        });        
    }
};

export default SocketManager;
