<template>
	<DefaultLayout >
		<div class="m-auto" id="p5Canvas" ></div>
	</DefaultLayout>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

import DefaultLayout from '../layouts/default.vue'

import p5 from 'p5'

import io from 'socket.io-client'

import  useStore  from '../store'

export default defineComponent({
    components: {DefaultLayout},
    data() {
		const store = useStore();
        return {
			game: true,
			bgClicked: false,
			logged: computed(() => store.state.auth.logged),
			gameid : this.$route.params.id
        }
	},
	mounted() {
		this.play();
	},
	methods: {
		play() {
			this.bgClicked = true

			const ip_addr = '10.12.1.4';

			const socket = io("http://"+ip_addr+":9000");

			socket.on("connect", ()=>{
				console.log(`connected with id ${socket.id}`);
				// join correspondant room.
				socket.emit('addme-event', this.gameid);
			})


			const lobby = Symbol('lobby');
			const pregame = Symbol('pregame');
			const game = Symbol('game');
			const postgame = Symbol('postgame');
			const quitgame = Symbol('quitgame');

			let game_state = game;

			let player_number = 0;
			const maxWIDTH = 1200;
			const maxHEIGHT = 800;
			let WIDTH = 1200;
			let HEIGHT = 800;

			let list = [-4, -3, 3, 4];
			let xpos = WIDTH / 2;
			let ypos = HEIGHT / 2;
			let dx = list[Math.floor(Math.random() * 4)];
			let dy = list[Math.floor(Math.random() * 4)];
			let	p1pos = HEIGHT / 2;
			let p2pos = HEIGHT / 2;
			let p1score = 0;
			let p2score = 0;

			let paddle_width = 10;
			let paddle_height = WIDTH / 10;
			let imag:any

			let g_tmp_flag = false;
			let quitflag = 0;

			const sketch = function(p:any){

			// 	p.preload = () => {	
			// }

				p.setup = () => {
					p.createCanvas(WIDTH, HEIGHT);
					p.background(0);
				};


				let	d_game = () => {
			// draw game components
					p.background(0);
					p.stroke(1);
					p.textSize(10);
					p.text(player_number, 10, 10);
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

					ball_collition_mouvement();

					socket.on('quitgame-event', () => {
						if (game_state === game)
							game_state = quitgame;
					});
					if (p1score == 5 || p2score == 5)
						game_state = postgame;
				}

				let d_postgame = () => {
			// draw postgame
					p.background(0);
					p.stroke(1);
					p.textSize(30);
					p.fill('white');
					let winner = (p1score > p2score) ? 1 : 2;
					p.text('game finished player_number ' + winner +
						' won', WIDTH / 2, HEIGHT / 2);

			// reset game and replay
			
				}

				let d_quitgame = () => {
			// draw quitgame
					// console.log('d_quitgame');
					p.background(0);
					p.stroke(1);
					p.textSize(30);

					let loser = (player_number === 1) ? 2 : 1;
					p.text('player_number ' + loser + '  quits', WIDTH / 2, HEIGHT / 2);

					if (p.keyIsDown(32))
					{
						game_state = lobby;
						socket.emit('queueme-event', 1);
					}
				}

				let ball_collition_mouvement = () => {
					

					
						socket.on('scoregame-event', (obj) => {
							p1score = obj.p1;
							p2score = obj.p2;
						});
					
					send_receiv_game_info();

			//	display score
					p.textSize(100);
					p.stroke('white');
					p.text(p1score, (WIDTH / 2) - 150, HEIGHT / 2 - 150);
					p.text(p2score, (WIDTH / 2) + 100, HEIGHT / 2 - 150);
				}


				let send_receiv_game_info = () => {

			//  player 1 receives player 2's paddle and player 2 receives p1 paddle's and ball
					socket.on('game-event', (gameobj) => {
						if (gameobj.player === 1)
						{
							p1pos = gameobj.paddle * HEIGHT;
							xpos = gameobj.ball.x * WIDTH;
							ypos = gameobj.ball.y * HEIGHT;
						}
						else
						{
							p2pos = gameobj.paddle * HEIGHT;
						}
					});
				}

				p.windowResized = () => {
					HEIGHT = (window.innerHeight < maxHEIGHT) ? window.innerHeight : maxHEIGHT;
					WIDTH = (window.innerWidth < maxWIDTH) ? window.innerWidth : maxWIDTH;
					p.resizeCanvas(WIDTH, HEIGHT);
					p.background(0);
				};

				p.draw = function (){
					if (game_state === game)
						d_game();
					else if (game_state === postgame)
						d_postgame();
					else if (game_state === quitgame)
						d_quitgame();
				};
			};

				let id  = document.getElementById('p5Canvas');
				if (id)
				{
					new p5(sketch, id);
				}
			}
	}
});
</script>
