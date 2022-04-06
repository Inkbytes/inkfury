<template>
	<div class="w-full flex flex-col justify-between">
		<div class="relative flex items-center border-b border-gray-300 justify-center pl-3 h-20">
      <!-- <img class="h-10 w-10 rounded-full object-cover" src="https://images.pexels.com/photos/3777931/pexels-photo-3777931.jpeg?auto=compress&amp;cs=tinysrgb&amp;h=750&amp;w=1260" alt="username"> -->
      <span class="block ml-2 font-bold text-2xl text-gray-600">{{roomData.name}}</span>
      <!-- <span class="connected text-green-500 ml-2">
        <svg width="6" height="6">
          <circle cx="3" cy="3" r="3" fill="currentColor"></circle>
        </svg>
      </span> -->

			<div class="absolute lg:hidden top-0 right-0 h-16 flex items-center justify-center mr-4 cursor-pointer" @click="toggleUsersList">
				<div class="flex justify-center items-center  w-10 h-10 leading-none tracking-tighter">
					<svg viewBox="0 0 100 80" width="25" height="25">
            <rect width="100" height="20" rx="10"></rect>
            <rect y="30" width="100" height="20" rx="10"></rect>
            <rect y="60" width="100" height="20" rx="10"></rect>
          </svg>
				</div>
			</div>
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
			<button class="outline-none focus:outline-none bg-green-600 font-semibold text-sm text-white py-2 px-4 my-2 rounded-lg" type="submit">Send</button>
			<button class="mx-2 bg-red-600 font-semibold text-sm text-white py-2 px-4 my-2 rounded-lg" @click="leaveRoom">Leave</button>
		</form>
	</div>
</template>

<script lang="ts" >
import { computed, defineComponent } from 'vue'
import MyBubble from './MyBubble.vue'
import Bubble from './Bubble.vue'
import useStore from '../../store'
import { io } from 'socket.io-client'
import { ChatRoom } from '@/store/chat'
import axios, { AxiosResponse } from 'axios'

export default defineComponent({
	components: { MyBubble, Bubble },
	// props: ['socket'],
	data() {
		const store = useStore();
		return { 
			msg: '',
			msgs: [] as string[],
			isTyping: false,
			lastTyped: 0,
			payload: {
				senderId: 1,
				room: '',
				message: '', // TODO: fetch user data from DB
			},
			// payload: '',
			roomData: {} as ChatRoom,
			currentUserId: computed(() => store.state.auth.user?.id).value,
			showUsers: computed(() => store.state.chat.showUsers),
			currentRoomId: computed(() => store.state.chat.currentRoomId),
			socket: computed(() => store.state.chat.socket),
			toggleUsersList: () => store.commit('chat/toggleUsersList'),
		}
	},
	async mounted() {
			if(this.currentRoomId !== null) {
				await fetch('http://10.12.2.4:9000/api/chat/' + this.currentRoomId)
						.then(res => res.json())
						.then(data => this.roomData = data)
						.catch(err => console.log(err));
			}
			this.socket.on('chatToClient', (payload: any) => {
				console.log(payload);
				this.msgs.push(payload.message);
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
	watch: {
		async currentRoomId(newVal){
			await fetch('http://10.12.2.4:9000/api/chat/' + newVal)
						.then(res => res.json())
						.then(data => this.roomData = data)
						.catch(err => console.log(err));
		}
	},
	methods: {
		submitMsg() {
			this.msg = this.msg.trim()
			if(!this.msg.length)
				return false
			this.payload.senderId = this.currentUserId;
			this.payload.room = this.roomData.name;
			this.payload.message = this.msg;
			console.log(this.payload);
			this.socket.emit('chatToServer', this.payload)
			this.msg = ''
		},
		typing() {
			if (!this.isTyping){
				this.socket.emit('typing', this.roomData.name);
			}
		},
		async leaveRoom() {
			await axios.delete('http://localhost:9000/api/chat/' + this.currentRoomId)
			.then((res: AxiosResponse) => {
				console.log(this.roomData.name + ' deleted');
				this.$forceUpdate();
			})
			.catch(err => {
				console.error(err); 
			})
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
