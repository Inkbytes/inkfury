import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse } from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer() wss: Server;

  private logger: Logger = new Logger('AppGateway');

  afterInit(server: Server) {
    this.logger.log('Server initialized!');
  }

  handleConnection(client: Socket, ...args: any[]) {
      this.logger.log(`'Client connected:    ${client.id}'`)
  }

  handleDisconnect(client: Socket) {
      this.logger.log(`'Client disconnected: ${client.id}'`)
  }

  @SubscribeMessage('msgToServer')
  handleMessage(client: Socket, text: string): void {
    this.wss.emit('msgToClient', text); // To Broadcast for example
    // client.emit('msgToClient', text);
  }
}
