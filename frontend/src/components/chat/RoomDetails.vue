<template>
  <div class="w-full flex flex-col justify-between" style="max-height: calc(100vh - 8rem)">
    <div class="flex items-center bg-gray-100 justify-center pl-3 h-20">
      <span class="block ml-2 font-bold text-2xl text-gray-600">Room Details</span>
    </div>
    <div class="w-full h-screen max-h p-4 overflow-y-scroll hide-scroll bg-gray-200" >
      Members
      <div v-for="user in room.members" :key="user" >
        <MemberBubble :userId="getUserData(user)"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed } from '@vue/runtime-core';
import useStore from '../../store'
import MemberBubble from './MemberBubble.vue'
import { ChatRoom } from '../../store/chat'
import { User42Profile } from '@/store/auth';
export default {
  components: { MemberBubble },
  data() {
    const store = useStore();
    return {
      currentRoomId: computed(() => store.state.chat.currentRoomId),
      rooms: computed(() => store.state.chat.rooms),
      room: {} as ChatRoom | undefined,
      users: []
    }    
  },
  async mounted() {
    await fetch("http://10.12.2.4:9000/api/users")
            .then(res => res.json())
            .then(data =>  data && (this.users = data) )
            .catch(err => console.log(err.message));
    this.room = this.rooms.find((e) => e.id == this.currentRoomId);
  },
  methods: {
    getUserData(id: number) {
      return this.users.find((e: User42Profile) => e.user?.id === id)
    }
  }
}
</script>

<style>

</style>
