<template>
  <div :class="['fixed inset-0', !showUsers ? 'pointer-events-none' : '']">
    <div :class="['w-full h-screen z-0 transition-colors duration-300 lg:bg-transparent', !showUsers ? 'bg-transparent' : 'bg-black/30']" @click="toggleUsersList" />
    <div :class="['w-[500px] transform border-l px-5 fixed top-0 right-0 h-screen z-10 bg-white overflow-hidden transition-transform duration-300 lg:translate-x-[500px]', !showUsers ? 'translate-x-[500px]' : '']">
      <div class="absolute top-0 right-0 h-16 flex items-center justify-center mr-1 cursor-pointer" @click="toggleUsersList">
				<div class="flex justify-center items-center bg-gray-50 rounded-full w-10 h-10 leading-none tracking-tighter">
          <svg xmlns="http://www.w3.org/2000/svg" fill="#000000" viewBox="0 0 50 50" width="20px" height="20px"><path d="M 9.15625 6.3125 L 6.3125 9.15625 L 22.15625 25 L 6.21875 40.96875 L 9.03125 43.78125 L 25 27.84375 L 40.9375 43.78125 L 43.78125 40.9375 L 27.84375 25 L 43.6875 9.15625 L 40.84375 6.3125 L 25 22.15625 Z"/></svg>
        </div>
			</div>
      <RoomDetails />
    </div>
  </div>
  <div class="w-1/6 border-l hidden lg:block">
  <RoomDetails />
  </div>
</template>

<script>
import { computed } from 'vue'
import useStore from '../../store'

import RoomDetails from './RoomDetails.vue'

export default {
  name: 'RoomDetailsWrapper',
  components: { RoomDetails },
  setup() {
    const store = useStore();
    return {
			showUsers: computed(() => store.state.chat.showUsers),
			toggleUsersList: () => store.commit('chat/toggleUsersList')
    }
  }
}
</script>
