import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';

let mapper: any[] = [];
// This decorator gives us access to the socket.io functionality.
@WebSocketGateway(7000, {
  namespace: 'chat',
  cors: true,
})


export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  // This decorator gives us access to the websockets server instance.
  @WebSocketServer() wss: Server;

  private logger: Logger = new Logger('ChatGateway');

  afterInit(server: Server) {
    this.logger.log('Server initialized!');
  }
  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`'Client connected:    ${client.id}'`);
  }
  handleDisconnect(client: Socket) {
    this.logger.log(`'Client disconnected: ${client.id}'`);
    mapper.splice(mapper.findIndex(e => e.socketId === client.id), 1);
  }

  /* -- We make use of the instance in here, where we send data to all clients
    connected to the server using the emit() function.
    handleMessage uses the SubscribeMessage decorator which makes it able to
    listen to an event named msgToServer.
  */
  /* @SubscribeMessage('msgToServer')
  handleMessage(client: Socket, payload: any): void {
    this.wss.emit('msgToClient', payload);
    // client.emit('msgToClient', data);
  } */

  @SubscribeMessage('chatToServer')
  handleMessage(
    client: Socket,
    payload: { senderID: number; room: string; message: string },
  ) {
    // console.log(payload);
    // this.wss.emit('chatToClient', payload);
    // console.log(client.id);
    // client.in(payload.room).emit('chatToClient', payload);
    this.wss.to(payload.room).emit('chatToClient', payload);
    // client.emit('chatToClient', data);
  }

  @SubscribeMessage('typing')
  userTyping(client: Socket, room: string) {
    client.broadcast.to(room).emit('typing');
  }
  @SubscribeMessage('joinRoom')
  handleJoinRoom(client: Socket, room: string) {
    client.join(room);
    this.logger.log(`room --- : ${room}`);
    client.emit('joinedRoom', room);
  }
  @SubscribeMessage('leaveRoom')
  handleLeaveRoom(client: Socket, room: string) {
    client.leave(room);
    client.emit('leftRoom', room);
  }
  @SubscribeMessage('startGame')
  StartGame(client: Socket, obj: any) {
    // client.leave(room);
    // client.emit('leftRoom', room);
    let sockid = mapper.find(e => e.userId === obj.userid);
    this.logger.log(`sockid found in mapper: ${sockid?.socketId}`);
    client.to(sockid?.socketId).emit('startGame', obj.gameid);
  }
  @SubscribeMessage('logId')
  logId(client: Socket, id: number) {
    let found = mapper.find(e => e.userId === id);

	if (!found)
		mapper.push({userId: id, socketId: client.id});
	else
		found.socketId = client.id;
  }
}
