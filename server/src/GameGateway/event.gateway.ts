import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse } from "@nestjs/websockets";
import { Logger } from '@nestjs/common';
import { Server, Socket } from "socket.io";
import { arrayBuffer } from "stream/consumers";

// game class
class Game{
	player1Id: Socket;
	player2Id: Socket;
	watchersId: string[];
	roomId: string;

	constructor(p1: Socket, p2: Socket, room: string){
		this.player1Id = p1;
		this.player2Id = p2;
		this.roomId = room;
	}

	addWatcher(watcherId: string){
		this.watchersId.push(watcherId);
	}

	isPlayerInThisGame(id: Socket) : boolean {
		if (this.player1Id == id || this.player2Id == id)
			return true;
		return false;
	}
}

let connections1 = [];
let gameNumber = 0;
let GameArray: any [] = [];

@WebSocketGateway({ cors: true })
export class GameGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect{
	@WebSocketServer() wss: Server;

	private logger: Logger = new Logger('AppGateway');

	afterInit(server: Server){
		this.logger.log('Server intialized..');
		// console.log(server.sockets);
	}

	handleConnection(client: Socket|any, ...args: any[]){
		this.logger.log(`Client connected ${client.id}`);
		connections1.push(client.id);
		if (connections1.length == 1){
			client.emit('initiation', 1);
			client.join('room-'+gameNumber);
			client.gameId = gameNumber;
		}else if (connections1.length == 2){
			client.emit('initiation', 2);
			client.join('room-'+gameNumber);
			client.gameId = gameNumber;
			gameNumber++;
		}
	}

	handleDisconnect(client: Socket){
		this.logger.log(`Client disconnected ${client.id}`);
		if (connections1.length >= 1)
			connections1.splice(connections1.indexOf(client.id), 1);
		this.logger.log(`Connections size: ${connections1.length}`);
	}


	@SubscribeMessage('game')
	handleGame(client: Socket|any, data: any): void {
		client.broadcast.to('room-'+client.gameId).emit('game', data);
	}

	@SubscribeMessage('start-game')
	handleStartGame(client: Socket|any, data: any): void {
		client.broadcast.to('room-'+client.gameId).emit('start-game', data);
	}

	@SubscribeMessage('player2-connected')
	handleP2(client: Socket|any, data: any): void{
		client.broadcast.to('room-'+client.gameId).emit('player2-connected', data);
	}

	@SubscribeMessage('ready')
	ready_event(client:	Socket|any, data: any): void{
		connections1.splice(0, connections1.length);
	}
}
