<template>
  <div class="w-full flex flex-col justify-between" style="max-height: calc(100vh - 8rem)">
    <div class="flex items-center bg-gray-100 justify-center pl-3 h-20">
      <span class="block ml-2 font-bold text-2xl text-gray-600">Room Details</span>
    </div>
    <div class="w-full h-screen max-h p-4 overflow-y-scroll hide-scroll bg-gray-200" >
      Members
      <div v-for="member in members" :key="member" >
        <MemberBubble :user="getUserData(member)" :isAdmin="isAdmin()"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed } from '@vue/runtime-core';
import useStore from '../../store'
import MemberBubble from './MemberBubble.vue'
import { User42Profile } from '../../store/auth';
export default {
  components: { MemberBubble },
  data() {
    const store = useStore();
    return {
      currentRoomId: computed(() => store.state.chat.currentRoomId),
      currentUserId: computed(() => store.state.auth.user?.id), 
      rooms: computed(() => store.state.chat.rooms),
      members: [] as number[] | undefined,
      admins: [] as number[] | undefined,
      users: []
    }    
  },
  async mounted() {
    await fetch("http://10.12.2.4:9000/api/users")
            .then(res => res.json())
            .then(data =>  data && (this.users = data) )
            .catch(err => console.log(err.message));
    this.members = this.rooms.find((e) => e.id === this.currentRoomId)?.members;
    this.admins = this.rooms.find((e) => e.id === this.currentRoomId)?.admins;
  },
  methods: {
    getUserData(id: number) {
      return this.users.find(user => user?.id === id)
    },
    isAdmin(){
      return this.admins?.find(admin => admin === this.currentUserId);
    }
  }
}
</script>

<style>

</style>
