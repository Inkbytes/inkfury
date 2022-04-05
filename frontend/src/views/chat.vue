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

export default defineComponent({
	name: 'Chat',
	components: { DefaultLayout, Rooms, Inbox, CreateRoom, RoomDetailsWrapper },
	data() {
		const store = useStore();
		return {
			store,
			hasRooms: computed(() => store.state.chat.hasRooms),
			setRooms: (data: ChatRoom[]) => store.commit('chat/userRooms', data),
		}
	},
	async mounted() {
		await fetch('http://localhost:9000/api/chat')
					.then(res => res.json())
					.then(data => this.setRooms(data))
					.catch(err => console.log(err))
	}
})
</script>


<style>
</style>
