<template>
	<div class="w-20 group hover:!w-80 lg:hover:!w-1/3 lg:w-1/3 max-w-sm h-full flex flex-col border-r transition-all duration-300" style="max-height: calc(100vh - 8rem)">
		<div class="my-3 mx-3">
      <!-- <div class="relative text-gray-600 focus-within:text-gray-400"> -->
        <!-- <span class="absolute inset-y-0 left-0 flex items-center pl-2">
          <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" class="w-6 h-6 text-gray-500"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        </span> -->
				<!-- <button class="border border-gray-200 py-2 px-2 bg-gree">
					Lookup Rooms
				</button> -->
        <!-- <input aria-placeholder="Look for rooms or create new ones" placeholder="Look for rooms..." class="py-2 pl-10 block w-full rounded bg-gray-100 outline-none focus:text-gray-700" type="search" name="search" required="" autocomplete="search" v-model="roomSearchInput" @input="searchRoom"> -->

      <!-- </div> -->
    </div>
		<ul class="flex flex-col h-screen w-full overflow-y-scroll hide-scroll">
			<li class="w-full flex flow-row items-center border-b hover:border-0 rounded-2xl" v-for="room in matchingRooms" :key="room.id">
				<a style="min-height: 4rem;" :class="['rounded-2xl w-full px-3 h-20 cursor-pointer flex items-center mt-1 focus:outline-none focus:border-gray-300 transition duration-150 ease-in-out ', currentRoomId === room.id ? 'text-white bg-green-600' : 'text-gray-600 hover:bg-gray-300 hover:text-black']" @click="roomClick(room.id, room.name)">
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
import { ChatRoom } from '../../store/chat';
import { computed, defineComponent } from 'vue'
import useStore from '../../store'

export default defineComponent({
	data() {
		const store = useStore();

		return { 
			currentRoomName: '' as string | undefined,
			rooms: computed(() => store.state.chat.rooms),
			currentUserId: computed(() => store.state.auth.user?.id),
			socket: computed(() => store.state.chat.socket),
			setRoomId: (id: number) => store.commit('chat/setCurrentRoomId', id),
			refreshInbox: () => store.commit('chat/refreshInbox'),
			toggleShowCreateForm: () => store.commit('chat/toggleShowCreateForm'),
			showCreateForm: computed(() => store.state.chat.showCreateForm),
			currentRoomId: computed(() => store.state.chat.currentRoomId),
			roomSearchInput: ''
		}
	},
	computed: {
		matchingRooms() {
			let myRooms = [] as ChatRoom[];
			this.rooms.forEach(room => {
				 if ( room.members.find(e => e === this.currentUserId) !== undefined)
				 	myRooms.push(room)
			})
			return myRooms;
		},
	},
	methods: {
		roomClick(id: number, name: string) {
			if (id === this.currentRoomId && !this.showCreateForm) return;
			this.currentRoomName = this.rooms.find((room) => room.id === this.currentRoomId)?.name;
			this.socket.emit('leaveRoom', this.currentRoomName);
			this.currentRoomName = name;
			this.setRoomId(id);
			this.socket.emit('joinRoom', name);
			// this.toggleShowCreateForm();
			this.refreshInbox();
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
