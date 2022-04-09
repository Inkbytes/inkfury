import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import axios, { AxiosResponse } from "axios";
import { ConsoleLogger, Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { LargeNumberLike } from 'crypto';
import { Game } from './game'
import update_score from './game'
import { fetch } from 'node-fetch'
import { CurrentGameDto } from './dto/game.dto';

//

let io: any;
const game_queue: any[] = [];
let private_queue: any[] = [];
let game_number = 1;
let game_array: any[] = [];

let mapper: any[] = [];

@WebSocketGateway({ cors: true })
export class GameGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() wss: Server;

  private logger: Logger = new Logger('AppGateway');

  afterInit(server: Server) {
    this.logger.log('Server intialized..');
    io = server;
  }

  handleConnection(client: any, ...args: any[]) {
    this.logger.log(`Client connected ${client.id}`);

	// console.log(client.player);
    // game_queue.push(client);
    // this.logger.log(`game_queue.length ${game_queue.length}`);
    // add client to the queue
    // if two players or more and on the queue arbitrary choose who is p1 and p2
    // queue them advance to pregame status
    // if (game_queue.length >= 2) queue_players();
  }

  handleDisconnect(client: Socket | any) {
    this.logger.log(`Client disconnected ${client.id}`);

    if (game_queue.findIndex((e: Socket | any) => e === client) != -1)
      game_queue.splice(
        game_queue.findIndex((e: Socket | any) => e === client),
        1,
      );
    else {
      //	disconnected in pregame or game or postgame
      const clients = io.sockets.adapter.rooms.get('room-' + client.gameId);

	  let current_game = game_array.find(e => e.gameId === client.gameId);
    if (!clients) return;
    if (current_game){  
      axios.put('http://10.12.2.4:9000/api/users', {id: current_game.p1Id, inGame: false}, {withCredentials: true});
      axios.put('http://10.12.2.4:9000/api/users', {id: current_game.p2Id, inGame: false}, {withCredentials: true});
      let idx = game_array.indexOf(current_game);
      game_array.splice(idx, 1);
    }
      //	pay attention to who want to watch they won't be queued!
      for (const e of clients) {
        const e_socket = io.sockets.sockets.get(e);
        e_socket.leave('room-' + client.gameId);
        e_socket.emit('quitgame-event', 1);
      }
    }
    this.logger.log(`game_queue.length ${game_queue.length}`);
  }

  @SubscribeMessage('startgame-event')
  startgameHandler(client: Socket | any, data: any): void {
    client.to('room-' + client.gameId).emit('startgame-event', 1);
  }

  @SubscribeMessage('startgame2-event')
  startgame2Handler(client: Socket | any, data: any): void {
    client.to('room-' + client.gameId).emit('startgame2-event', 1);
  }


  @SubscribeMessage('game-event')
  gameHandler(client: Socket | any, data: any): void {
    client.to('room-' + client.gameId).emit('game-event', data);
  }

  @SubscribeMessage('scoregame-event')
  scoreHandler(client: Socket | any, data: any): void {
    client.to('room-' + client.gameId).emit('scoregame-event', data);
	update_score(game_array, client.gameId, data.p1, data.p2);
  }

  @SubscribeMessage('queueme-event')
  queuemeHandler(client: Socket | any, data: any): void {
    game_queue.push(client);
    if (game_queue.length >= 2) queue_players();
  }
  //	post game info to game table

  // register userId
  @SubscribeMessage('registerme-event')
  registermeHandler(client: any, data: any): void{
	  if (!client.userId)
	  	client.userId = data;
	  game_queue.push(client);
      if (game_queue.length >= 2) queue_players();
  }

  @SubscribeMessage('postdb-event')
  async postdbHandler(client: any, data: any): Promise<void> {
	  let current_game = game_array.find(e => e.gameId === client.gameId);
	  if (current_game != undefined && current_game.posted === 0){
		  // post
		  axios
		  .post('http://10.12.2.4:9000/api/game/completed', {
			  gameId: current_game.gameId,
			  p1id: current_game.p1Id,
			  p2id: current_game.p2Id,
			  p1Score: current_game.p1Score,
			  p2Score: current_game.p2Score,
		  })
		  .then( () => current_game.posted = 1)
		  .catch ( err => console.log(err))

		let winnerId = (current_game.p1Score > current_game.p2Score) ? current_game.p1Id : current_game.p2Id;
	
		const res =  await axios.get('http://10.12.2.4:9000/api/game/score/'+winnerId);
		if (res.data.userId === undefined){
			axios
			.post('http://10.12.2.4:9000/api/game/score', {
				userId: winnerId,
				wins: 1,
			})
			.then( (resp) => console.log('gut-1'))
			.catch( err => { console.log(err)})
		}else{
			axios
			.put('http://10.12.2.4:9000/api/game/score/'+res.data.userId,
			{
				wins: res.data.wins + 1,
			})
			.then ( (resp) => console.log('gut-2'))
			.catch (err => {console.log(err)})
		}
    axios.put('http://10.12.2.4:9000/api/users', {id: current_game.p1Id, inGame: false}, {withCredentials: true});
	  axios.put('http://10.12.2.4:9000/api/users', {id: current_game.p2Id, inGame: false}, {withCredentials: true});
		let idx = game_array.indexOf(current_game);
		game_array.splice(idx, 1);
		// console.log(game_array);
	  }

  }

  @SubscribeMessage('addme-event')
  addmeHandler(client: any, data: any): void{
	  client.join('room-'+data);
  }

  @SubscribeMessage('sendgamearray-event')
  sendgamearrayHanddler(client: any, data: any): void{
	  client.emit('receivegamearray-event', game_array);
  }

  @SubscribeMessage('privatequeuee-event')
  privatequeueeHandler(client: any, data: any): void{
	//
	client.gameId = data.gameId;
	client.userId = data.userId;
	
	client.join('room-'+client.gameId);
	const clients = io.sockets.adapter.rooms.get('room-' + client.gameId);

	if (clients.length === 1){
		let current_game = new Game(client.gameId);
		current_game.p1Id = client.userId;
		private_queue.push(current_game);
		mapper.push(client);
	}

	if (clients.length === 2){
// queue them mfs
		let current_game = private_queue.find(e => e.gameId === client.gameId);
		current_game.p2Id = client.userId;
		let p1sock = mapper.find(e => e.userId === current_game.p1Id);
		mapper.splice(mapper.findIndex(e => e.userId === current_game.p1Id));
		game_array.push(current_game);
		private_queue.splice(private_queue.findIndex(e => e.gameId === client.gameId), 1);

		axios.put('http://10.12.2.4:9000/api/users', {id: p1sock.userId, inGame: true})
		.catch( err => console.log(err));
		axios.put('http://10.12.2.4:9000/api/users', {id: client.userId, inGame: true})
		.catch( err => console.log(err));   

		p1sock.emit('1or2-event', 1);
		client.emit('1or2-event', 2);
	}
  }
}

const queue_players = () => {
  const player1: any = game_queue.shift();
  const player2: any = game_queue.shift();

  if (player1.userId === player2.userId)
    return ;

  console.log(`hamid queued p1: ${player1.id} & p2: ${player2.id}`);
  // join the room game_number
  player1.gameId = game_number;
  player2.gameId = game_number;

  axios.put('http://10.12.2.4:9000/api/users', {id: player1.userId, inGame: true})
  .catch( err => console.log(err));
  axios.put('http://10.12.2.4:9000/api/users', {id: player2.userId, inGame: true})
  .catch( err => console.log(err));                                                                                                                                                                                            

  // emit to 1or2-event
  player1.emit('1or2-event', 1);
  player2.emit('1or2-event', 2);


  player1.join('room-' + player1.gameId);
  player2.join('room-' + player2.gameId);


  // create a Game object
  let game = new Game(game_number);

  game.p1Id = player1.userId;
  game.p2Id = player2.userId;

//   console.log(game);

  game_array.push(game);
  // increment game_number
  game_number++;
};
