import { io, Socket } from 'socket.io-client';

class SocketManager {
  private static instance: SocketManager;
  private socket: Socket | null = null;

  private constructor() {}

  public static getInstance(): SocketManager {
    if (!SocketManager.instance) {
      SocketManager.instance = new SocketManager();
    }
    return SocketManager.instance;
  }

  public connect(): void {
        if (!this.socket) {
            this.socket = io();

            this.socket.on('priceData', (priceData) => {
            console.log('priceData:', priceData);
        });

        console.log(`Connected to socket`);
    }
  }

  public disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      console.log('Disconnected from socket');
    }
  }

  public getSocket(): Socket | null {
    return this.socket;
  }
}

export default SocketManager;
