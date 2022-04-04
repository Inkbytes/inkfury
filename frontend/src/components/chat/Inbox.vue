<template>
	<div class="w-full flex flex-col justify-between">
		<div class="flex items-center border-b border-gray-300 justify-center pl-3 py-4">
      <img class="h-10 w-10 rounded-full object-cover" src="https://images.pexels.com/photos/3777931/pexels-photo-3777931.jpeg?auto=compress&amp;cs=tinysrgb&amp;h=750&amp;w=1260" alt="username">
      <span class="block ml-2 font-bold text-base text-gray-600">Eduard</span>
      <span class="connected text-green-500 ml-2">
        <svg width="6" height="6">
          <circle cx="3" cy="3" r="3" fill="currentColor"></circle>
        </svg>
      </span>
   </div>
		<div class="w-full h-full p-4 overflow-y-scroll hide-scroll">
			<!-- <div v-for="(msg, idx) in msgs" :key="idx">
				<MyBubble v-if="msg.id == userId" :msgs="msgs" />
				<Bubble v-else />
			</div> -->
			<MyBubble :msgs="msgs" :isTyping="isTyping" />
			<!-- <Bubble /> -->
		</div>
		<form @submit.prevent="submitMsg" class="w-full py-3 px-3 flex items-center justify-between border-t">
			<input placeholder="Type your message here..." class="py-2 mx-3 pl-5 block w-full rounded-full bg-gray-100 outline-none focus:text-gray-700" v-model="msg" @input="typing" >
			<button class="outline-none focus:outline-none" type="submit">
					<svg class="w-7 h-7 stroke-gray-500 fill-transparent hover:fill-blue-300 hover:stroke-blue-500 hover:stroke-2" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"> <title id="sendIconTitle">Send</title> <desc id="sendIconDesc">Icon of a paper plane</desc> <polygon points="21.368 12.001 3 21.609 3 14 11 12 3 9.794 3 2.394"/> </svg>
			</button>
		</form>
	</div>
</template>

<script lang="ts" >
import { computed, defineComponent } from 'vue'
import MyBubble from './MyBubble.vue'
import Bubble from './Bubble.vue'
import useStore from '../../store'
import { io } from 'socket.io-client'

export default defineComponent({
	components: { MyBubble, Bubble },
	props: ['socket'],
	data() {
		return { 
			msg: '',
			msgs: [] as string[],
			isTyping: false,
			lastTyped: 0,
			// payload: {
			// 	senderId: 1,
			// 	roomId: 1,
			// 	message: '', // TODO: fetch user data from DB
			// } 
			payload: '',
			socket: null,
		}
	},
	mounted() {
			this.socket = io('http://localhost:7000/chat');
			this.socket.on('chatToClient', (message: any) => {
				// console.log(message);
				this.msgs.push(message);
			})
			this.socket.on('typing', () => {
				const time = Date.now();
				this.isTyping = true;
				this.lastTyped = time;
				setTimeout(() => {
					if (this.lastTyped == time){
						this.isTyping = false;
						this.lastTyped = 0;
					}
				}, 2000)
			})
	},
	methods: {
		submitMsg() {
			this.msg = this.msg.trim()
			if(!this.msg.length)
				return false
			// this.payload.senderId = this.user.id
			// this.payload.roomId = 1;
			this.payload = this.msg
			this.socket.emit('chatToServer', this.payload)
			this.msg = ''
		},
		typing() {
			if (!this.isTyping){
				this.socket.emit('typing', this.payload);
			}
		}
	}
})
</script>


<style>
.hide-scroll::-webkit-scrollbar {
	display: none;
}
  
.hide-scroll {
	-ms-overflow-style: none;  /* IE and Edge */
	scrollbar-width: none;  /* Firefox */
}
</style>
