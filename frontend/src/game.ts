import p5 from 'p5'


const sketch = function(p: any){
	const WIDTH = 1500;
	const HEIGHT = 800;
	const list: number[] = [-4, -3, 3, 4];
	let xpos: number = WIDTH / 2;
	let ypos: number = HEIGHT / 2;
	let dx:	number = list[Math.floor(Math.random() * 4)];
	let dy: number = list[Math.floor(Math.random() * 4)];
	let	p1pos: number = HEIGHT / 2;
	let p2pos: number = HEIGHT / 2;
	let p1score = 0;
	let p2score = 0;
	let	gameison = false;
	let game_status = 0;

	const paddle_width = 10;
	const paddle_height: number = WIDTH / 10;
	p.setup = () => {
		p.createCanvas(WIDTH, HEIGHT);
		p.background(0);
	};

	const key_event = () => {
		if (p.keyIsDown(p.UP_ARROW)){
			if (p1pos > 0)
				p1pos -= 10;
		}
		if (p.keyIsDown(p.DOWN_ARROW)){
			if (p1pos < HEIGHT - paddle_height)
				p1pos += 10;
		}
		if (p.keyIsDown(87)){
			if (p2pos > 0)
				p2pos -= 10;
		}
		if (p.keyIsDown(83)){
			if (p2pos < HEIGHT - paddle_height)
				p2pos += 10;
		}
	}

	const	draw_objects = () => {
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

	const move_ball = () => {
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

		xpos = xpos + dx;
		ypos = ypos + dy;

		p.textSize(100);
		p.stroke('white');
		p.text(p1score, (WIDTH / 2) - 150, HEIGHT / 2 - 150);
		p.text(p2score, (WIDTH / 2) + 100, HEIGHT / 2 - 150);
	}

	const	reset_ball = () => {
		xpos = WIDTH / 2;
		ypos = HEIGHT / 2;
		dx = list[Math.floor(Math.random() * 4)];
		dy = list[Math.floor(Math.random() * 4)];
	}

	const reset_game = () => {
		p1score = 0;
		p2score = 0;
	}

// welcome page
	const press_to_play = (n: number) => {
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
		p.text('press space to play', WIDTH / 2 - 150, 300);
		if (p.keyIsDown(32)){
			reset_game();
			gameison = true;
		}
	}

//


	p.draw = function (){
		if (p1score === 5){
			gameison = false;
			game_status = 1;
		}else if (p2score === 5){
			gameison = false;
			game_status = 2;
		}
		if (gameison){
			key_event();
			draw_objects();
			move_ball();
		}else{
			press_to_play(game_status);
		}
	};
};

const myp5 = new p5(sketch);