<template>
  <form class="w-full flex flex-col justify-between" @submit="createRoom">
    <div class="flex items-center justify-center h-full w-full bg-gray-100 overflow-y-auto">
      <div class="flex flex-col items-center justify-center bg-white py-8 rounded-md px-12 shadow-lg w-1/4 min-w-[400px] min-h-[600px] h-1/2">
        <h1 class="text-center text-lg font-bold text-gray-500">Create Room</h1>
        <div class="space-y-8 mt-6 w-full">
          <div class="w-full">
            <input type="text" placeholder="Name" v-model="roomData.name" class="px-4 py-2 bg-gray-50 w-3/4">
          </div>
          <div class="w-full">
            <input type="password" placeholder="Password" v-model="roomData.password" class="px-4 py-2 bg-gray-50 w-3/4">
          </div>
          <div class="w-full font-semibold text-s text-gray-500">Visibility</div>
          <div class="bg-gray-200 rounded-lg flex flex-row w-3/4 mx-auto">
              <div class="inline-flex rounded-lg w-3/4">
                <input type="radio" name="room_type" id="Private" value="private" hidden="" v-model="roomData.visibility">
                <label for="Private" class="w-full radio text-center self-center py-2 px-4 rounded-lg cursor-pointer hover:opacity-75">Private</label>
              </div>
              <div class="inline-flex rounded-lg w-3/4">
                <input type="radio" name="room_type" id="Public" value="public" checked="true" hidden="" v-model="roomData.visibility">
                <label for="Public" class="w-full radio text-center self-center py-2 px-4 rounded-lg cursor-pointer hover:opacity-75">Public</label>
              </div>
          </div>
        </div>
        <button :disabled="!roomData.name.length" class="w-3/4 mt-5 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-500 disabled:hover:bg-gray-200 bg-green-600 text-white hover:bg-green-700 hover:text-white py-2 rounded-md font-semibold tracking-tight transition-all duration-300">Create</button>
      </div>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import axios, { AxiosResponse } from "axios";
import useStore from '../../store';

export default defineComponent({
  data() {
		const store = useStore();
    return {
      roomData: {
        name: '',
        password: '',
        owner_id: computed(() => store.state.auth.user?.id).value,
        visibility: 'public',
      }
    }
  },
  methods: {
    async createRoom() {
      const formData = this.roomData;
      const headers = { 'Content-Type': 'application/json' }
      axios
        .post(`http://10.12.2.4:9000/api/chat`, formData, { headers } )
        .then((res: AxiosResponse) => {
          console.log(this.roomData.name + " Created");
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
})
</script>


<style>
  input:checked ~ .radio {
  color:white;
  background-color: green;
  }
</style>
