<template>
	<div class="chat-message">
			<div class="flex items-end justify-end">
				<div class="flex flex-col space-y-2 text-s max-w-s mx-2 order-1 items-end">
						<div class="px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white " v-for="msg in msgs" :key="msg">{{msg}}</div>
				</div>
				<img src="https://images.unsplash.com/photo-1590031905470-a1a1feacbb0b?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144" alt="My profile" class="w-6 h-6 rounded-full order-2" v-if="msgs.length && !isTyping">
			</div>

			<div class="flex items-end justify-end pt-1" v-if="isTyping">
				<div class="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
						<div class="px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white ">Typing...</div>
				</div>
				<img src="https://images.unsplash.com/photo-1590031905470-a1a1feacbb0b?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144" alt="My profile" class="w-6 h-6 rounded-full order-2">
			</div>

	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	props: ['msgs', 'isTyping'],
	data() {
		return {}
	},
})
</script>

<style>

</style>
