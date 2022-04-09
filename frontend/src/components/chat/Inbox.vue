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
		<div ref="message_area" class="w-full h-full p-4 overflow-y-scroll hide-scroll">
			<!-- <div v-for="(msg, idx) in msgs" :key="idx">
				<MyBubble v-if="msg.id == userId" :msgs="msgs" />
				<Bubble v-else />
			</div> -->
			<MyBubble :msgs="msgs" :isTyping="isTyping"/>
			<!-- <Bubble :msgs="msgs" :isTyping="isTyping" :user="currentUser" v-else/> -->
		</div>
		<form @submit.prevent="submitMsg" class="w-full py-3 px-3 flex items-center justify-between border-t">
			<button type="button" class="mx-2 bg-sky-600 font-semibold text-xs text-white py-2 px-6 my-2 rounded-lg" @click="toggleLookup">Find Room</button>
			<button type="button" class="mx-2 bg-blue-600 font-semibold text-xs text-white py-2 px-6 my-2 rounded-lg" @click="toggleShowCreateForm">Create Room</button>
			<input :disabled="mutedInput" placeholder="Type your message here..." class="disabled:cursor-not-allowed py-2 mx-3 pl-5 block w-full rounded-full bg-gray-100 outline-none focus:text-gray-700" v-model="msg" @input="typing" >
			<button class="outline-none focus:outline-none bg-green-600 font-semibold text-sm text-white py-2 px-4 my-2 rounded-lg" type="submit">Send</button>
			<button type="button" class="mx-2 bg-red-600 font-semibold text-sm text-white py-2 px-4 my-2 rounded-lg" @click="leaveRoom">Leave</button>
		</form>
	</div>
</template>

<script lang="ts" >
import { computed, defineComponent } from 'vue'
import MyBubble from './MyBubble.vue'
import Bubble from './Bubble.vue'
import useStore from '../../store'
import { ChatRoom } from '../../store/chat'
import axios, { AxiosResponse } from 'axios'

export default defineComponent({
	components: { MyBubble, Bubble },
	// props: ['socket'],
	data() {
		const store = useStore();
		return { 
			msg: '',
			msgs: [],
			isTyping: false,
			lastTyped: 0,
			payload: {
				senderId: null,
				room: '',
				message: '', // TODO: fetch user data from DB
			},
			// payload: '',
			roomData: {} as ChatRoom,
			currentUser: computed(() => store.state.auth.user),
			showUsers: computed(() => store.state.chat.showUsers),
			currentRoomId: computed(() => store.state.chat.currentRoomId),
			socket: computed(() => store.state.chat.socket),
			toggleUsersList: () => store.commit('chat/toggleUsersList'),
			toggleShowCreateForm: () => store.commit('chat/toggleShowCreateForm'),
			toggleLookup: () => store.commit('chat/toggleLookup'),
			leaveRoomStore: (data: ChatRoom) => store.commit('chat/leaveRoom', data),
			chatRooms: computed(() => store.state.chat.rooms),
			mutedInput: computed(() => store.state.chat.mutedInput),
			// inputDisabled: 0,
		}
	},
	watch: {
		async currentRoomId(newVal) {
			if(this.currentRoomId !== null) {
				await axios	
							.get('http://10.12.1.4:9000/api/chat/' + this.currentRoomId, { withCredentials: true })
							.then((data: AxiosResponse) => this.roomData = data.data)
							.catch(err => console.log(err));
				// await fetch('http://10.12.1.4:9000/api/chat/' + this.currentRoomId)
				// 		.then(res => res.json())
				// 		.then(data => this.roomData = data)
				// 		.catch(err => console.log(err));
			}
		}
	},
	async mounted() {
			if(this.currentRoomId !== null) {
				await axios	
							.get('http://10.12.1.4:9000/api/chat/' + this.currentRoomId, { withCredentials: true })
							.then((data: AxiosResponse) => this.roomData = data.data)
							.catch(err => console.log(err));
			}
			this.socket?.on('chatToClient', (payload: any) => {
				console.log(payload);
				this.msgs.push({message: payload.message, senderId: payload.senderId});
				this.payload = payload;
				this.$nextTick(() => {
					const message_area = this.$refs.message_area as HTMLElement;
					message_area.scrollTo(0, message_area.scrollHeight);
				});
			})
			this.socket?.on('typing', () => {
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
	async beforeUnmount() {
		this.socket.removeListener('chatToClient');
		this.socket.removeListener('typing');
	},
	methods: {
		// async checkMuted(){
		// 	await fetch('http://10.12.1.4:9000/api/chat/' + this.currentUser?.id, {credentials: 'include'})
		// 					.then(res => res.json())
    //         	.then(data =>  data && (this.roomData = data) )
    //         	.catch(err => console.log(err.message));
		// 	if(this.roomData.muted_members?.find(id => id !== this.currentUser?.id) !== undefined)
		// 		this.inputDisabled = 1;
		// },
		submitMsg() {
			this.msg = this.msg.trim()
			if(!this.msg.length)
				return false;
			this.payload.senderId = this.currentUser?.id;
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
			if (this.currentRoomId !== null)
				await axios
							.post(`http://10.12.1.4:9000/api/chat/${this.currentRoomId}/leave`, {}, { withCredentials: true })
							.then((res: AxiosResponse) => {
								console.log(this.roomData.name + ' deleted');
								this.leaveRoomStore(this.roomData);
								this.roomData = {} as any;
								this.$router.go('/chat');
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
