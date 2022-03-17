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

let connections = [];
let numberOfGames = 0;
let GameArray: any [] = [];

// client.id1,client.id2,room

@WebSocketGateway({ cors: true })
export class GameGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect{
	@WebSocketServer() wss: Server;

	private logger: Logger = new Logger('AppGateway');

	afterInit(server: Server){
		this.logger.log('Server intialized..');
	}

	handleConnection(client: Socket, ...args: any[]){
		this.logger.log(`Client connected ${client.id}`);
		connections.push(client.id);

		if (connections.length == 1){
			client.emit('initiation', 1);
		}else if (connections.length == 2){
			client.emit('initiation', 2);
			// let currentGame = new Game(connections[0], connections[1], 'room' + numberOfGames);
			// GameArray.push(currentGame);
			// connections.splice(0, 2);
			// currentGame.player1Id.join(currentGame.roomId);
			// currentGame.player2Id.join(currentGame.roomId);
		}
	}

	handleDisconnect(client: Socket){
		this.logger.log(`Client disconnected ${client.id}`);
		connections.splice(connections.indexOf(client.id), 1);
	}


	@SubscribeMessage('game')
	handleGame(client: Socket, data: any): void {
		client.broadcast.emit('game', data);
	}

	@SubscribeMessage('start-game')
	handleStartGame(client: Socket, data: any): void {
		client.broadcast.emit('start-game', data);
	}

	@SubscribeMessage('number-of-players')
	handlePlayers(client: Socket, data: any): void {
		client.emit('number-of-players', connections.length);
	}

}
