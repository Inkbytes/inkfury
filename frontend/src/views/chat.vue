<template>
	<div class="w-full h-screen flex flex-col overflow-hidden">
        <DefaultLayout>
		<div class="w-full max-w-full mx-auto h-full flex flex-row border-x" style="max-height: calc(100vh - 8rem)">
			<Rooms />
			<Inbox v-if="hasRooms" />
			<CreateRoom v-else />
			<RoomDetailsWrapper />
		</div>
        </DefaultLayout>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import DefaultLayout from '../layouts/default.vue'
import Inbox from '../components/chat/Inbox.vue'
import Rooms from '../components/chat/Rooms.vue'
import CreateRoom from '../components/chat/CreateRoom.vue'
import RoomDetailsWrapper from '../components/chat/RoomDetailsWrapper.vue'
import useStore from '../store'
import { ChatRoom } from '../store/chat'
import { io, Socket } from 'socket.io-client'

export default defineComponent({
	name: 'Chat',
	components: { DefaultLayout, Rooms, Inbox, CreateRoom, RoomDetailsWrapper },
	data() {
		const store = useStore();
		return {
			store,
			hasRooms: false,
			roomCount: computed(() => store.state.chat.rooms.length),
			setRooms: (data: ChatRoom[]) => store.commit('chat/userRooms', data),
			setSocket: (socket: Socket) => store.commit('chat/setSocket', socket),
		}
	},
	async mounted() { //fetch current user rooms, public rooms and friends list
		await fetch('http://10.12.2.4:9000/api/chat')
					.then(res => res.json())
					.then(data => this.setRooms(data))
					.catch(err => console.log(err))
		const socket = io('http://10.12.2.4:7000/chat');
		this.setSocket(socket);
	},
	watch: {
		roomCount(newVal) {
			newVal > 0 ? this.hasRooms = true : this.hasRooms = false;
		}
	}
})
</script>


<style>
</style>
