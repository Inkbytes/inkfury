import { Server } from 'socket.io';
export declare class AlertGateway {
    wss: Server;
    sendToAll(message: string): void;
}
