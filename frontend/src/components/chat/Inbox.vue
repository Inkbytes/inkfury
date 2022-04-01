<template>
	<div class="w-full flex flex-col justify-between">
		<div class="w-full h-full p-4 overflow-y-scroll hide-scroll">
			<MyBubble />
			<Bubble />
		</div>
		<div class="w-full py-3 px-3 flex items-center justify-between border-t">

				<input aria-placeholder="Type your message here" placeholder="Type your message here" class="py-2 mx-3 pl-5 block w-full rounded-full bg-gray-100 outline-none focus:text-gray-700" type="text" name="message" required="">

				<button class="outline-none focus:outline-none" type="submit">
						<img class="w-7 h-7" src="../../assets/sendButton.svg">
				</button>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import MyBubble from './MyBubble.vue'
import Bubble from './Bubble.vue'

export default defineComponent({
	components: { MyBubble, Bubble },
	setup() {
		
	},
})
</script>


<style>
hide-scroll::-webkit-scrollbar {
	display: none;
}
  
.hide-scroll {
	-ms-overflow-style: none;  /* IE and Edge */
	scrollbar-width: none;  /* Firefox */
}
</style>
