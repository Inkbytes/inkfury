<template>
  <div id="backdrop">
      <div class="modal">
          <h1 class="font-medium leading-tight text-3xl mt-0 mb-5 text-blue-600">2 Factor authentication</h1>
          <label class="center block text-gray-500 font-bold  mb-1 md:mb-0 pr-4" for="">Verifacation code sent to your email: <br> {{ email }}</label>
          <input class="flex-initial shadow appearance-none border rounded  py-2 px-3 text-gray-500 leading-tight focus:outline-none focus:shadow-outline" action="" v-model="code"  placeholder="*****"/>
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" @click="send()">verify</button>
      </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import axios, { AxiosResponse } from "axios";
import useStore from '../store'

export default defineComponent({
    props: ["email"],
    data() {
        const store = useStore();
        return {
            user : computed(() => store.state.auth.user),
            code : '',
            setMsg: (e: boolean) => store.commit('msg/setMsg', e),
            setError: (e: boolean) => store.commit('msg/setError', e),
            setState: (e: boolean) => store.commit('msg/setState', e)
        }
    },
    methods: {
        closeModal() {
            this.$emit('close')
        },
        send() {
            this.user.isLogged = true
            const pin = this.code
            const usr = this.user
            axios.post("http://10.12.1.6:9000/api/tfa", {code : pin}, {withCredentials: true})
            .then(async (resp : AxiosResponse) => {
                if (resp.data) {
                    this.setMsg('verification successful!');
                    this.setState(true);
                    axios.post("http://10.12.1.6:9000/api/users", usr, {withCredentials: true})
                    this.closeModal();
                    await new Promise(r => setTimeout(r, 2000));
                    this.setState(false)
                }
                else {
                    this.setMsg('Code not valid!')
                    this.setState(true)
                    this.setError(true)
                    await new Promise(r => setTimeout(r, 2000));
                    this.setState(false)
                    window.location.href = 'http://10.12.1.6:9000/api/login/logout'
                }
            })
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
        z-index: 4;
    }
</style>