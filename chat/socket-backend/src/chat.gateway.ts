import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Socket, Server } from 'socket.io'

@WebSocketGateway() // You can specify a port and a namespace
export class ChatGateway {

    @SubscribeMessage('message')
    handleMessage(client: Socket, message: string): void {
        console.log(client.id + " sent a message");
        console.log(message);
    }
}