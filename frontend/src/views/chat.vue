<template>
	<div class="w-full h-screen flex flex-col overflow-hidden">
        <DefaultLayout>
		<div class="w-full max-w-full mx-auto h-full flex flex-row border-x" style="max-height: calc(100vh - 8rem)">
			<Rooms />
			<!-- <CreateRoom /> -->
			<Inbox />
			<RoomDetailsWrapper />
		</div>
        </DefaultLayout>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import DefaultLayout from '../layouts/default.vue'
import Inbox from '../components/chat/Inbox.vue'
import Rooms from '../components/chat/Rooms.vue'
import CreateRoom from '../components/chat/CreateRoom.vue'
import RoomDetailsWrapper from '../components/chat/RoomDetailsWrapper.vue'

export default defineComponent({
	name: 'Chat',
	components: { DefaultLayout, Rooms, Inbox, CreateRoom, RoomDetailsWrapper },
	data() {
		return {}
	},
})
</script>


<style>
</style>
