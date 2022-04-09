<template>
  <div id="backdrop" class="w-screen h-screen" @click.self="closeModal">
    <div class="modal h-screen w-1/6 overflow-y-scroll hide-scroll" style="max-height: calc(100vh - 8rem - 100px)">
      <div v-if="showPwdInput">
        <input class="border-2 rounded-lg border-gray-500 py-3 px-3" type="password" placeholder="Enter password..." v-model="password" @keyup.enter="checkPwd">
      </div>
      <ul v-else class="flex flex-col w-full">
			  <li class="w-full flex flow-row items-center border-b hover:border-0 rounded-2xl" v-for="room in rooms" :key="room.id">
          <div style="min-height: 4rem;" class="rounded-2xl w-full px-3 h-20 cursor-pointer flex items-center mt-1 focus:outline-none focus:border-gray-300 transition duration-150 ease-in-out hover:bg-gray-500 hover:text-white" @click="joinRoom(room)">
            <img class="h-10 w-10 rounded-full object-cover m-auto lg:m-0" src="../../assets/userIcon.svg">
            <div class="w-full py-2 group-hover:!flex hidden lg:flex flex-col items-start justify-center ml-2">
              <div class="flex flex-row font-semibold text-base w-full text-left">
                <span class="inline-block font-semibold text-m whitespace-nowrap overflow-hidden line-clamp-1 "> {{ room.name }}</span>
              </div>
            </div>
          </div>
			  </li>
		  </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import axios, { AxiosResponse } from "axios";
import useStore from '../../store'
import { ChatRoom } from '../../store/chat';

export default defineComponent({
  props: ["user"],
  data() {
      const store = useStore();
      return {
        toggleLookup: () => store.commit('chat/toggleLookup'),
        rooms: computed(() => store.state.chat.rooms),
        currentRoomId: computed(() => store.state.chat.currentRoomId),
        socket: computed(() => store.state.chat.socket),
        setCurrenRoomId: (id: number) => store.commit('chat/setCurrentRoomId', id),
        addRoom: (room: ChatRoom) => store.commit('chat/addRoom', room),
        currentUser: computed(() => store.state.auth.user),
        refreshInbox: () => store.commit('chat/refreshInbox'),
        setMsg: (e: boolean) => store.commit('msg/setMsg', e),
        setError: (e: boolean) => store.commit('msg/setError', e),
        setState: (e: boolean) => store.commit('msg/setState', e),
        password: '',
        room: {} as ChatRoom | undefined,
        showPwdInput: false,
      }
  },
  methods: {
    async checkPwd(){
      this.showPwdInput = true;
      const currentRoom = this.rooms.find(e => e.id === this.currentRoomId);
      const pwd = this.password
      await axios
              .post(`http://10.12.2.4:9000/api/chat/${this.room.id}/join/${this.currentUser?.id}`, { password: pwd }, { withCredentials: true })
              .then(async () => {
                this.refreshInbox();
                if(currentRoom?.name !== undefined)
                  this.socket.emit('leaveRoom', currentRoom?.name);
                this.addRoom(this.room);
                this.$router.go('/chat');
                this.setState(true)
                this.setError(false);
                this.setMsg('success');
                await new Promise(r => setTimeout(r, 2000));
                this.setState(false)
              })
              .catch(async () => {
                this.setState(true)
                this.setError(true)
                this.setMsg('not valid password');
                await new Promise(r => setTimeout(r, 2000));
                this.setState(false)
              });
    },
    closeModal() {
      this.toggleLookup();
    },
    async joinRoom(room: ChatRoom){
      const currentRoom = this.rooms.find(e => e.id === this.currentRoomId);
      if(room?.members.find((id) => id === this.currentUser?.id)) {
        this.refreshInbox();
        if(currentRoom?.name !== undefined)
          this.socket.emit('leaveRoom', currentRoom?.name);
        this.socket.emit('joinRoom', room.name);
        this.setCurrenRoomId(room.id);
        this.toggleLookup();
      }
      else {
        if(room.pw_protected){
          this.showPwdInput = true;
          this.room = room
        }
        else {
          await axios
                .post(`http://10.12.2.4:9000/api/chat/${room.id}/join/${this.currentUser?.id}`, {}, { withCredentials: true })
                .then(() => {
                  this.refreshInbox();
                  if(currentRoom?.name !== undefined)
                    this.socket.emit('leaveRoom', currentRoom?.name);
                  this.addRoom(room);
                  this.$router.go('/chat')
                })
                .catch(async () => {
                  this.setState(true)
                  this.setError(true)
                  this.setMsg('User blocked from room!');
                  this.$router.go('/chat')
                  await new Promise(r => setTimeout(r, 2000));
                  this.setState(false)
                });
        }
      }
      // console.log(currentRoom);

      // this.addRoom(currentRoom);
    }
    // save() {
        
    // }
  }
});
</script>

<style scoped>
    .modal {
        /* width: 500px; */
        padding: 20px;
        margin: 100px auto;
        background: white;
        border-radius: 10px;
        text-align: center;
    }
    #backdrop {
        top: 0;
        text-align: left;
        position: fixed;
        background: rgba(0,0,0,0.5);
        /* width: 100%; */
        /* height: 100%; */
        z-index: 1;
    }
</style>
