<template>
  <div class="w-full flex flex-col justify-between" style="max-height: calc(100vh - 8rem)">
    <div class="flex items-center justify-center pl-3 h-20">
      <span class="block ml-2 font-bold text-2xl text-gray-600">Room Details</span>
    </div>
    <div class="w-full h-screen max-h p-4 overflow-y-scroll hide-scroll" >
      <span class="text-lg font-semibold">Members:</span>
      <div v-for="member in getMembers()" :key="member">
        <MemberBubble :user="getUserData(member)" :isAdmin="isAdmin()" :room="getRoom()" :isOwner="isOwner()" v-if="member !== currentUserId"/>
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
      users: []
    }    
  },
  async mounted() {
    await fetch("http://10.12.1.4:9000/api/users", {credentials: 'include'})
            .then(res => res.json())
            .then(data =>  data && (this.users = data) )
            .catch(err => console.log(err.message));
  },
  methods: {
    getRoom(){
      return this.rooms.find((e) => e.id === this.currentRoomId);
    },
    getMembers() {
      return this.rooms.find((e) => e.id === this.currentRoomId)?.members;
    },
    getUserData(id: number) {
      return this.users.find(user => user?.id === id)
    },
    isAdmin(){
      const admins = this.rooms.find((e) => e.id === this.currentRoomId)?.admins;
      if(admins?.find(admin => admin === this.currentUserId) !== undefined)
        return true;
      return false;
    },
    isOwner() {
      if (this.rooms.find(e => e.id === this.currentRoomId)?.owner_id === this.currentUserId)
        return true;
      return false;
    }
  }
}
</script>

<style>

</style>
