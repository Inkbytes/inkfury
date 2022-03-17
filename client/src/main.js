
const socket = io("http://localhost:3000");

var player = 0;

socket.on("connect", ()=>{
	console.log(`connected with id ${socket.id}`);
})

socket.on("initiation", (nb) => {
	if (nb === 1){
		player = 1;
	}else if (nb === 2){
		player = 2;
	}
});



const sketch = function(p){
	const maxWIDTH = 1200;
	const maxHEIGHT = 800;
	var WIDTH = 1200;
	var HEIGHT = 800;

	var list = [-4, -3, 3, 4];
	var xpos = WIDTH / 2;
	var ypos = HEIGHT / 2;
	var dx = list[Math.floor(Math.random() * 4)];
	var dy = list[Math.floor(Math.random() * 4)];
	var	p1pos = HEIGHT / 2;
	var p2pos = HEIGHT / 2;
	var p1score = 0;
	var p2score = 0;
	var	gameison = false;
	var game_status = 0;
	var connected_players = 0;

	var paddle_width = 10;
	var paddle_height = WIDTH / 10;
	let bg;
	let img;

	p.preload = () => {
	}

	p.setup = () => {
		p.createCanvas(WIDTH, HEIGHT);
		p.background(0);
	};

	var key_event = () => {
		if (player == 1 && p.keyIsDown(p.UP_ARROW)){
			if (p1pos > 0)
				p1pos -= 10;
		}
		if (player == 1 && p.keyIsDown(p.DOWN_ARROW)){
			if (p1pos < HEIGHT - paddle_height)
				p1pos += 10;
		}
		if (player == 2 && p.keyIsDown(p.UP_ARROW)){
			if (p2pos > 0)
				p2pos -= 10;
		}
		if (player == 2 && p.keyIsDown(p.DOWN_ARROW)){
			if (p2pos < HEIGHT - paddle_height)
				p2pos += 10;
		}
	}

	var map3 = () => {
		p.background('red');
		p.strokeWeight(4);
		p.stroke(1000);
		p.line(WIDTH / 2, 0, WIDTH / 2, HEIGHT);
		p.noFill();
		p.circle(WIDTH / 2, HEIGHT / 2, 70);
		p.fill('red');
		p.rect(10, p1pos, paddle_width, paddle_height);
		p.rect(WIDTH - 20, p2pos, paddle_width, paddle_height);
		p.ellipse(xpos, ypos, 20, 20);
		p.stroke(1);
		p.textSize(12);
		p.text('PONG GAME', WIDTH / 2 - 37, 20);
		p.fill('white');
	}

	var map2 = () => {
		p.background('blue');
		p.strokeWeight(4);
		p.stroke(1000);
		p.line(WIDTH / 2, 0, WIDTH / 2, HEIGHT);
		p.noFill();
		p.circle(WIDTH / 2, HEIGHT / 2, 70);
		p.fill('blue');
		p.rect(10, p1pos, paddle_width, paddle_height);
		p.rect(WIDTH - 20, p2pos, paddle_width, paddle_height);
		p.ellipse(xpos, ypos, 20, 20);
		p.stroke(1);
		p.textSize(12);
		p.text('PONG GAME', WIDTH / 2 - 37, 20);
		p.fill('white');
	}

	var	map1 = () => {
		p.background(0);
		p.strokeWeight(4);
		p.stroke(1000);
		p.line(WIDTH / 2, 0, WIDTH / 2, HEIGHT);
		p.noFill();
		p.circle(WIDTH / 2, HEIGHT / 2, 70);
		p.fill('white');
		p.rect(10, p1pos, paddle_width, paddle_height);
		p.rect(WIDTH - 20, p2pos, paddle_width, paddle_height);
		p.ellipse(xpos, ypos, 20, 20);
		p.stroke(1);
		p.textSize(12);
		p.text('PONG GAME', WIDTH / 2 - 37, 20);
		p.fill('white');

		// p.stroke('red');
		// p.line(10 + paddle_width, 0, 10 + paddle_width, HEIGHT);
		// p.line(WIDTH - paddle_width - 10, 0, WIDTH - paddle_width - 10, HEIGHT);
	}

	var move_ball = () => {
		if (xpos + 10 >= WIDTH - paddle_width - 10 && ypos >= p2pos - 5 && ypos <= p2pos + paddle_height + 5)
		{
			dx > 0 ? dx += 1: dx -= 1;
			dx = -dx;
		}
		else if (xpos + 10 >= WIDTH){
			p1score += 1;
			reset_ball();
		}
		if (xpos - 10 <= paddle_width + 10 && ypos >= p1pos - 5 && ypos <= p1pos + paddle_height + 5)
		{
			dx > 0 ? dx += 1: dx -= 1;
			dx = -dx;
		}
		else if (xpos - 10 <= 0){
			p2score += 1;
			reset_ball();
		}
		if (ypos >= HEIGHT - 10 || ypos <= 10)
		{
			dy = -dy;
		}


		if (player == 1){
			xpos = xpos + dx;
			ypos = ypos + dy;
		}
		p.textSize(100);
		p.stroke('white');
		p.text(p1score, (WIDTH / 2) - 150, HEIGHT / 2 - 150);
		p.text(p2score, (WIDTH / 2) + 100, HEIGHT / 2 - 150);
	}

	var	reset_ball = () => {
		xpos = WIDTH / 2;
		ypos = HEIGHT / 2;
		dx = list[Math.floor(Math.random() * 4)];
		dy = list[Math.floor(Math.random() * 4)];
	}

	var reset_game = () => {
		p1score = 0;
		p2score = 0;
	}

// welcome page
	var welcome_page = (n) => {
		p.stroke(1);
		p.fill('white');
		if (n === 0){
			p.textSize(100);
			p.text('WELCOME', WIDTH / 2 - 250, 100);
			p.textSize(20);
		}else if (n === 1){
			p.textSize(40);
			p.text('player 1 won', WIDTH / 2, 200);
		}else if (n === 2){
			p.textSize(40);
			p.text('player 2 won', WIDTH / 2, 200);
		}
		if (player != 0){
			socket.emit("number-of-players", "G");
			socket.on("number-of-players", (msg) => {
				connected_players = msg;
			});
			if (connected_players >= 2){
				p.text('player connected press space to play', WIDTH / 2 - 150, 300);
				if (p.keyIsDown(32)){
					reset_game();
					gameison = true;
				}
			}else{
				p.text('waiting for another player', WIDTH / 2 - 150, 300);

			}
		}
	}

//

	var comunicate_coord = () => {
		if (player == 1)
		{
			socket.emit("game", {player: 1,paddle: p1pos/HEIGHT, ball: {x: xpos/WIDTH, y: ypos/HEIGHT}});
		}
		else if (player == 2)
		{
			socket.emit("game", {player: 2,paddle: p2pos/HEIGHT});
		}
		socket.on("game", (obj) => {
			if (obj.player == 1)
			{
				p1pos = obj.paddle * HEIGHT;
				xpos = obj.ball.x * WIDTH;
				ypos = obj.ball.y * HEIGHT;
			}
			else{
				p2pos = obj.paddle * HEIGHT;
			}
		});
	}

	var debug_player = () => {
		if (player == 1)
			console.log("you are player number 1")
		else if (player == 2)
			console.log("you are player number 2")
		else
			console.log("you are a watcher");
	}

	var start_game = () => {
		if (gameison){
			socket.emit("start-game", "yalah");
			reset_game();
		}else{
		socket.on("start-game", (data) => {
			gameison = true;
			reset_game();
		});
		}
	}

	p.windowResized = () => {
		HEIGHT = (window.innerHeight < maxHEIGHT) ? window.innerHeight : maxHEIGHT;
		WIDTH = (window.innerWidth < maxWIDTH) ? window.innerWidth : maxWIDTH;
		p.resizeCanvas(WIDTH, HEIGHT);
		p.background(0);
	};

	p.draw = function (){
		debug_player();
		if (p1score === 5){
			gameison = false;
			game_status = 1;
		}else if (p2score === 5){
			gameison = false;
			game_status = 2;
		}
		if (gameison){
			key_event();
			map1();
			comunicate_coord();
			move_ball();
		}else{
			welcome_page(game_status);
			start_game();
		}
	};
};

const myp5 = new p5(sketch);

// responsive feature is introduction the score bug 
// the mf is small