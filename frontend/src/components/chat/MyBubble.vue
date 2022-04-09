<template>
	<div class="chat-message">
			<div class="flex items-center justify-center">
				<div class="flex flex-col space-y-2 text-s max-w-s mx-2 order-1 items-end">
						<div class="px-4 py-2 rounded-lg flex flex-row items-end " v-for="msg in msgs" :key="msg">
							<div class="px-4 py-2 rounded-lg inline-block  bg-blue-600 text-white max-w-2xl break-words ">{{msg.message}}</div>
							<img :src="getImage(getUser(msg.senderId))" alt="My profile" class="w-6 h-6 ml-2 rounded-full order-2" v-if="msgs.length && !isTyping">
						</div>
				</div>
			</div>

			<div class="flex items-end justify-end pt-1" v-if="isTyping">
				<div class="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
						<div class="px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white ">Typing...</div>
				</div>
				<!-- <img src="getImage(getUser())" alt="My profile" class="w-6 h-6 rounded-full order-2"> -->
			</div>

	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	props: ['msgs', 'isTyping'],
	data() {
		return {
			users: [],
		}
	},
	async mounted() {
		await fetch("http://10.12.2.4:9000/api/users", {credentials: 'include'})
            .then(res => res.json())
            .then(data =>  data && (this.users = data) )
            .catch(err => console.log(err.message));
	},
	methods: {
		getUser(id: number){
			return this.users.find(user => user.id === id)?.avatar.toString();
		},
		getImage(pic: string) {
      if (pic?.startsWith("https://cdn.intra.42.fr/users/"))
        return pic;
      else return "../assets/" + pic;
    },
	}
})
</script>

<style>

</style>
