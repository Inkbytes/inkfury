<template>
    <Header :game="game"/>
	<div v-if="!bgClicked" id="swiper">
		<h1>Choose your game background</h1>
		<Swiper id="choose-bg" :slides-per-view="2" :space-between="0" :autoplay="{
		delay: 1500,
		disableOnInteraction: false,
		}">
			<SwiperSlide><img src="https://i.imgur.com/eWtfMME.png" width="500" height="400" @click="play('https://i.imgur.com/eWtfMME.png')"></SwiperSlide>
			<SwiperSlide><img src="https://i.imgur.com/0HztdXb.jpeg" width="500" height="400" @click="play('https://i.imgur.com/0HztdXb.jpeg')"></SwiperSlide>
			<SwiperSlide><img src="https://i.imgur.com/M7YCfZS.jpeg" width="500" height="400" @click="play('https://i.imgur.com/M7YCfZS.jpeg')"></SwiperSlide>
			<SwiperSlide><img src="https://i.imgur.com/njI0p7U.jpeg" width="500" height="400" @click="play('https://i.imgur.com/njI0p7U.jpeg')"></SwiperSlide>
		</Swiper>
		<button @click="play('none')">continue with Default</button>
	</div>
    <div  id="p5Canvas" ></div>
    <Footer />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import p5 from 'p5'
import { Swiper, SwiperSlide } from "swiper/vue";
import 'swiper/swiper-bundle.min.css';
import SwiperCore, { Autoplay } from "swiper/core";
SwiperCore.use([Autoplay]);
export default defineComponent({
    components: {Header, Footer, Swiper, SwiperSlide},
    data() {
        return {
			game: true,
			bgClicked: false,
        }
    },
	methods: {
		play(image : any) {
			this.bgClicked = true

			const sketch = function(p: any){
			const WIDTH = 1200;
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
			let imag: any;

			const paddle_width = 10;
			const paddle_height: number = WIDTH / 10;
			
			p.preload = () => {
				if (image !== "none")
					imag = p.loadImage(image);
				else
					imag = 0;	
			}

			p.setup = () => {
				p.createCanvas(WIDTH, HEIGHT);
				p.background(imag);
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
				p.background(imag);
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
				let id  = document.getElementById('p5Canvas');
				if (id)
				{
					const myp5 = new p5(sketch, id);
				}
			}
	}
});
</script>

<style>
#p5Canvas , #choose-bg{
	max-width: 1200px;
	margin: 0 auto 50px;
}
#swiper img {
	cursor: pointer;
}
button {
	color: white;
	background: #0069FF;
	border: none;
	border-radius: 15px;
	padding: 10px 15px;
	font-family: 'Inter';
	font-style: normal;
	font-weight: bold;
	font-size: 18px;
	line-height: 40px;
	text-align: center;
	cursor: pointer;
}
</style>