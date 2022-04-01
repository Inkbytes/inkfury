import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
export declare class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    wss: Server;
    private logger;
    afterInit(server: Server): void;
    handleConnection(client: Socket, ...args: any[]): void;
    handleDisconnect(client: Socket): void;
    handleMessage(client: Socket, payload: {
        sender: string;
        room: string;
        message: string;
    }): void;
    handleJoinRoom(client: Socket, room: string): void;
    handleLeaveRoom(client: Socket, room: string): void;
}
