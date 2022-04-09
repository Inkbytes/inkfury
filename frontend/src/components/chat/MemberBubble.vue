<template>
  <div class="my-3">
    <Menu as="div" class="relative inline-block text-left w-3/4">
      <div v-if="user">
        <MenuButton class="inline-flex justify-between items-center w-full rounded-md border border-gray-300 shadow-2xl px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-400 focus:outline-none  focus:bg-gray-500 focus:text-white">
          <img class="h-10 w-10 rounded-full object-cover" :src="getImage(user.avatar)" alt="username">
          <span>{{ user.fullname }}</span>
          <ChevronDownIcon class="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
        </MenuButton>
      </div>
      <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
        <MenuItems class="origin-top-right absolute right-0 mt-2 w-56 z-10 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div class="py-1">
            <MenuItem v-slot="{ active }" v-if="isAdmin">
              <a @click="block" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm cursor-pointer']">Block</a>
            </MenuItem>
            <MenuItem v-slot="{ active }" v-if="isAdmin && !isMuted()">
              <a @click="mute" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm cursor-pointer']">Mute</a>
            </MenuItem>
            <MenuItem v-slot="{ active }" v-if="isAdmin && isMuted()">
              <a @click="unmute" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm cursor-pointer']">Unmute</a>
            </MenuItem>
            <MenuItem v-slot="{ active }">
              <a @click="visitProfile" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm cursor-pointer']">Profile</a>
            </MenuItem>
            <MenuItem v-slot="{ active }">
              <a href="#" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block w-full text-left px-4 py-2 text-sm cursor-pointer']">Start Game</a>
            </MenuItem>
            <MenuItem v-slot="{ active }" v-if="isOwner">
              <a href="#" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block w-full text-left px-4 py-2 text-sm cursor-pointer']">Set As Admin</a>
            </MenuItem>
          </div>
        </MenuItems>
      </transition>
    </Menu>
  </div>
</template>

<script lang="ts">
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { ChevronDownIcon } from '@heroicons/vue/solid'
import axios from 'axios'
import useStore from '../../store'
import { ChatRoom } from '../../store/chat'

export default {
  props: ['user', 'isAdmin', 'room', 'isOwner'],
  components: {
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    ChevronDownIcon,
  },
  data() {
    const store = useStore();
    return {
      leaveRoom: (room: ChatRoom) => store.commit('chat/leaveRoom'),
    }
  }
  ,
  methods: {
    isMuted() {
      if(this.user?.id === this.room.owner_id)
        return;
      return this.room.muted_members.find((id: number) => id === this.user.id) !== undefined;
    },
    getImage(pic: string) {
      if (pic?.startsWith("https://cdn.intra.42.fr/users/"))
        return pic;
      else return "../assets/" + pic;
    },
    async block(){
      if(this.user?.id === this.room.owner_id)
        return;
      await axios
              .post(`http://10.12.2.4:9000/api/chat/${this.room.id}/block/${this.user.id}`, {}, { withCredentials: true })
              .then()
              .catch(err => console.log(err));
    },
    async mute(){
      await axios
              .post(`http://10.12.2.4:9000/api/chat/${this.room.id}/mute/${this.user.id}`, {}, { withCredentials: true })
              .then()
              .catch(err => console.log(err));
      this.$router.go("/chat");
    },
    async unmute(){
      await axios
              .post(`http://10.12.2.4:9000/api/chat/${this.room.id}/unmute/${this.user.id}`, {}, { withCredentials: true })
              .then()
              .catch(err => console.log(err));
      this.$router.go("/chat");
    },
    visitProfile(){
      this.$router.push('/profile/' + this.user.login)
    },
    setAsAdmin(){
      
    },
    startGame(){

    },
  }
}
</script>
