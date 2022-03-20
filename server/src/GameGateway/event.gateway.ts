import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse } from "@nestjs/websockets";
import { Logger } from '@nestjs/common';
import { Server, Socket } from "socket.io";

let io : any;
let game_queue : any [] = [];
let game_number : number = 0;

@WebSocketGateway({ cors: true })
export class GameGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect{
	@WebSocketServer() wss: Server;

	private logger: Logger = new Logger('AppGateway');

	afterInit(server: Server){
		this.logger.log('Server intialized..');
		io = server;
	}

	handleConnection(client: Socket|any, ...args: any[]){
		this.logger.log(`Client connected ${client.id}`);
		this.logger.log(`game_queue.length ${game_queue.length}`);
		// add client to the queue
		game_queue.push(client);
		// if two players or more and on the queue arbitrary choose who is p1 and p2
		// queue them advance to pregame status
		if (game_queue.length >= 2)
			queue_players();
	}

	handleDisconnect(client: Socket|any){
		this.logger.log(`Client disconnected ${client.id}`);

		if (game_queue.findIndex( (e: Socket|any) => e === client) != -1)
			game_queue.splice(game_queue.findIndex( (e: Socket|any) => e === client), 1);
		else{
//	disconnected in pregame or game or postgame
			const clients = io.sockets.adapter.rooms.get('room-'+client.gameId);

			if (!clients)
				return ;
//	pay attention to who want to watch they won't be queued!
			for (const e of clients)
			{
				const e_socket = io.sockets.sockets.get(e);
				e_socket.leave('room-'+client.gameId);
				e_socket.emit('quitgame-event', 1);
			}
		}
	}

	@SubscribeMessage('startgame-event')
	startgameHandler(client: Socket|any, data: any): void{
		client.to('room-'+client.gameId).emit('startgame-event', 1);
	}

	@SubscribeMessage('game-event')
	gameHandler(client: Socket|any, data: any): void{
		client.to('room-'+client.gameId).emit('game-event', data);
	}

	@SubscribeMessage('scoregame-event')
	scoreHandler(client: Socket|any, data: any): void{
		client.to('room-'+client.gameId).emit('scoregame-event', data);
	}

	@SubscribeMessage('queueme-event')
	queuemeHandler(client: Socket|any, data: any): void{
		game_queue.push(client);
		if (game_queue.length >= 2)
			queue_players();
	}
}

let	queue_players = () => {
	let player1: any = game_queue[0];
	let player2: any = game_queue[1];

	// emit to 1or2-event
	player1.emit('1or2-event', 1);
	player2.emit('1or2-event', 2);

	// join the room game_number
	player1.gameId = game_number;
	player2.gameId = game_number;

	player1.join('room-'+player1.gameId);
	player2.join('room-'+player2.gameId);

	// pop the players from the queue
	game_queue.splice(0, 2);

	// increment game_number
	game_number++;
}
