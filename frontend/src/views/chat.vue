<template>
	<div class="w-full h-screen flex flex-col overflow-hidden">
        <DefaultLayout>
		<div class="w-full max-w-full mx-auto h-full flex flex-row border-x" style="max-height: calc(100vh - 8rem)">
			<Rooms />
			<!-- <CreateRoom /> -->
			<Inbox />
			<div class="w-2/5 border-l px-5">
        <div class="flex flex-col">
          <div class="font-semibold text-xl py-4">Room Members</div>
          <div class="font-semibold py-4">Created 22 Sep 2021</div>
          <div class="font-light">
            Members will be displayed here
          </div>
        </div>
      </div>
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

export default defineComponent({
	name: 'Chat',
	components: { DefaultLayout, Rooms, Inbox, CreateRoom },
	data() {
		return {}
	},
})
</script>


<style>
</style>
