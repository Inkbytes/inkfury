<template>
	<div class="w-20 group hover:!w-80 lg:hover:!w-1/3 lg:w-1/3 max-w-sm h-full flex flex-col border-r transition-all duration-300">
		<div class="my-3 mx-3">
      <div class="relative text-gray-600 focus-within:text-gray-400">
        <span class="absolute inset-y-0 left-0 flex items-center pl-2">
          <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" class="w-6 h-6 text-gray-500"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        </span>
        <input aria-placeholder="Look for rooms or create new ones" placeholder="Look for rooms..." class="py-2 pl-10 block w-full rounded bg-gray-100 outline-none focus:text-gray-700" type="search" name="search" required="" autocomplete="search" v-model="roomSearchInput" @input="searchRoom">
      </div>
    </div>
		<ul class="flex flex-col h-full w-full overflow-y-scroll hide-scroll">
			<li class="w-full flex flow-row items-center border-b hover:border-0 rounded-2xl" v-for="room in rooms" :key="room.id">
				<a style="min-height: 4rem;" class="hover:bg-gray-400 rounded-2xl w-full px-3 h-20 cursor-pointer flex items-center text-sm focus:outline-none focus:border-gray-300 transition duration-150 ease-in-out text-gray-600 hover:text-white" @click="roomClick(room.id, room.name)">
					<img class="h-10 w-10 rounded-full object-cover m-auto lg:m-0" src="../../assets/userIcon.svg">
					<div class="w-full py-2 group-hover:!flex hidden lg:flex flex-col items-start justify-center ml-2">
						<div class="flex flex-row font-semibold text-base w-full text-left">
							<span class="inline-block font-semibold text-m whitespace-nowrap overflow-hidden line-clamp-1 "> {{ room.name }}</span>
						</div>
					</div>
				</a>
			</li>
		</ul>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import useStore from '../../store'

export default defineComponent({
	data() {
		const store = useStore();

		return { 
			currentRoomName: '',
			rooms: computed(() => store.state.chat.rooms),
			socket: computed(() => store.state.chat.socket),
			setRoomId: (id: number) => store.commit('chat/setCurrentRoomId', id),
			roomSearchInput: ''
		}
	},
	methods: {
		roomClick(id: number, name: string) {
			if(this.currentRoomName)
				this.socket.emit('leaveRoom', this.currentRoomName);
			this.currentRoomName = name;
			this.setRoomId(id);
			this.socket.emit('joinRoom', name);
		},
		searchRoom() {
			console.log(this.roomSearchInput);
		}
	}
})
</script>


<style>
hide-scroll::-webkit-scrollbar {
    display: none !important;
}
  
.hide-scroll {
	-ms-overflow-style: none !important;  /* IE and Edge */
	scrollbar-width: none !important;  /* Firefox */
}
</style>
