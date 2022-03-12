import { Sleeping } from 'matter';
import p5 from 'p5'


const sketch = function(p){
	const WIDTH = 800;
	const HEIGHT = 600;
	var list: number[] = [-4, -3, -2, -1, 1, 2, 3, 4];
	var xpos: number = WIDTH / 2;
	var ypos: number = HEIGHT / 2;
	var dx:	number = list[Math.floor(Math.random() * 8)];
	var dy: number = list[Math.floor(Math.random() * 8)];
	var	p1pos: number = HEIGHT / 2;
	var p2pos: number = HEIGHT / 2;

	var p1score: number = 0;
	var p2score: number = 0;

	var	gameison: boolean = true;

	p.setup = () => {
		p.createCanvas(WIDTH, HEIGHT);
		p.background(0);
	};

	var key_event = () => {
		if (p.keyIsDown(p.UP_ARROW)){
			if (p1pos > 4)
				p1pos -= 8;
		}
		else if (p.keyIsDown(p.DOWN_ARROW)){
			if (p1pos < HEIGHT - 86)
				p1pos += 8;
		}
		else if (p.keyIsDown(87)){
			if (p2pos > 4)
				p2pos -= 8;
		}
		else if (p.keyIsDown(83)){
			if (p2pos < HEIGHT - 86)
				p2pos += 8;
		}
	}

	var	draw_objects = () => {
		p.background(0);
		p.strokeWeight(4);
		p.stroke(1000);
		p.line(WIDTH / 2, 0, WIDTH / 2, HEIGHT);
		p.noFill();
		p.circle(WIDTH / 2, HEIGHT / 2, 70);
		p.fill('white');
		p.rect(10, p1pos, 10, 80);
		p.rect(WIDTH - 20, p2pos, 10, 80);
		p.ellipse(xpos, ypos, 20, 20);
		p.stroke(1);
		p.textSize(12);
		p.text('PONG GAME', WIDTH / 2 - 37, 20);
		p.fill('white');
		p.textSize(100);
		p.text(p1score, (WIDTH / 2) - 150, HEIGHT / 2 - 150);
		p.text(p2score, (WIDTH / 2) + 100, HEIGHT / 2 - 150);
	}

	var move_ball = () => {
		if (xpos >= WIDTH - 20)
		{
			if (ypos >= p2pos && ypos <= p2pos + 80){

				dx > 0 ? dx += 1: dx -= 1;
				dx = -dx;
			}
			else{
				p1score += 1;
				reset_ball();
			}
		}
		if (xpos <= 20)
		{
			if (ypos >= p1pos && ypos <= p1pos + 80){
				dx > 0 ? dx += 1: dx -= 1;
				dx = -dx;
			}
			else{
				p2score += 1;
				reset_ball();
			}
		}		
		if (ypos >= HEIGHT - 10 || ypos <= 10)
		{
			dy = -dy;
		}

		xpos = xpos + dx;
		ypos = ypos + dy;
	}

	var	reset_ball = () => {
		xpos = WIDTH / 2;
		ypos = HEIGHT / 2;
		dx = list[Math.floor(Math.random() * 8)];
		dy = list[Math.floor(Math.random() * 8)];
	}


// welcome page
	var welcome_page = () => {
		p.textSize(70);
		p.fill('white');
		p.text('WELCOME', WIDTH / 2 - 100, 100);
	}

//


	p.draw = function (){
		if (gameison){
			key_event();
			draw_objects();
			move_ball();
		}else{
			welcome_page();
		}
		if (p1score === 5){
			console.log("player 1 wins");
		}else if (p2score === 5){
			console.log("player 2 wins");
		}
	};
};

const myp5 = new p5(sketch);