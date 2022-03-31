<template>
  <div id="backdrop" @click.self="closeModal">
      <div class="modal">
          <h1 class="font-medium leading-tight text-3xl mt-0 mb-5 text-blue-600">Settings</h1>
          <div class="md:flex md:items-center mb-6">
            <label class="md:w-1/3 block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-chaneg-nick-name">Change nickname</label>
            <input class="md:w-2/3 flex-initial shadow appearance-none border rounded  py-2 px-3 text-gray-500 leading-tight focus:outline-none focus:shadow-outline" type="text" :placeholder="nickname"> <br>
          </div>
          <div class="form-check flex justify-center mt-5">
            <input class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" value="" id="flexCheckDefault">
            <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="flexCheckDefault">
                2FA authenticator
            </label>
        </div>
        <div class="flex justify-center mt-5">
            <div class="mb-5 w-96">
                <label for="formFile" class="block text-gray-500 font-bold  mb-1 md:mb-0 pr-4">Change your picture</label>
                <input class="form-control
                block
                shadow
                w-full
                px-3
                py-1.5
                text-base
                font-normal
                text-gray-700
                bg-white bg-clip-padding
                border rounded
                transition
                ease-in-out
                m-0
                focus:text-gray focus:bg-white focus:border-blue-600 focus:outline-none" type="file" id="formFile">
            </div>
        </div>
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Save</button>
      </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
    props: ["nickname"],
    methods: {
        closeModal() {
            this.$emit('close')
        }
    }
});
</script>

<style scoped>
    .modal {
        width: 500px;
        padding: 20px;
        margin: 200px auto;
        background: white;
        border-radius: 10px;
        text-align: center;
    }
    #backdrop {
        top: 0;
        text-align: left;
        position: fixed;
        background: rgba(0,0,0,0.5);
        width: 100%;
        height: 100%;
        z-index: 1;
    }
</style>