<template>
	<div class="w-full h-screen flex flex-col overflow-hidden">
        <DefaultLayout>
		<div class="w-full max-w-7xl mx-auto h-full flex flex-row border-x" style="max-height: calc(100vh - 8rem)">
			<Rooms />
			<Inbox />
		</div>
        </DefaultLayout>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import DefaultLayout from '../layouts/default.vue'
import Inbox from '../components/chat/Inbox.vue'
import Rooms from '../components/chat/Rooms.vue'
export default defineComponent({
	name: 'Chat',
	components: { DefaultLayout, Rooms, Inbox },
	data() {
		return {}
	},
})
</script>


<style>
</style>
