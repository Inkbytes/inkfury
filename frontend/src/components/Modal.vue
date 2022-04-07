<template>
  <div id="backdrop" @click.self="closeModal">
      <div class="modal">
          <h1 class="font-medium leading-tight text-3xl mt-0 mb-5 text-blue-600">Settings</h1>
          <div class="md:flex md:items-center mb-6">
            <label class="md:w-1/3 block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-chaneg-nick-name">Change nickname</label>
            <input class="md:w-2/3 flex-initial shadow appearance-none border rounded  py-2 px-3 text-gray-500 leading-tight focus:outline-none focus:shadow-outline" type="text"  v-model="login"> <br>
          </div>
          <div class="form-check flex justify-center mt-5">
            <input class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" id="checkbox" v-model="is2fa">
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
                focus:text-gray focus:bg-white focus:border-blue-600 focus:outline-none" type="file" id="formFile" accept="image/*"  @change="switchAvatar">
            </div>
        </div>
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" @click="save">Save</button>
      </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import axios, { AxiosResponse } from "axios";
import useStore from '../store'

export default defineComponent({
    props: ["user"],
    data() {
        const store = useStore();
        return {
            is2fa : this.user.is2fa,
            ext: '',
            images : null,
            login: this.user.login,
            currLogin : this.user.login,
            imgError: true,
            setMsg: (e: boolean) => store.commit('msg/setMsg', e),
            setError: (e: boolean) => store.commit('msg/setError', e),
            setState: (e: boolean) => store.commit('msg/setState', e)
        }
    },
    methods: {
        closeModal() {
            this.$emit('close')
        },
        switchAvatar(e : any){
            this.images = e.target.files[0];
            this.ext = this.images.name.split('.')[1];
            this.imgError = false
        },
        save() {
            this.user.login = this.login
            this.user.is2fa = this.is2fa
            if (this.imgError === false)
            {
                const formData = new FormData();
                const imageName = this.user.login+'.'+this.ext;
                formData.append('file' , this.images)
                const headers = { 'Content-Type': 'multipart/form-data' };
                axios
                    .post(`http://10.12.1.6:9000/api/users/image/${imageName}`, formData, { headers })
                    .then(() => {
                        
                        });
                this.user.avatar = imageName
            }
            this.user.isFirst = true;
            const usr = this.user
            axios
                .put("http://10.12.1.6:9000/api/users", usr, {})
                .then(async (resp:AxiosResponse) => {
                    if (resp.data.Error !== undefined) {
                        this.login = this.currLogin
                        this.user.login = this.currLogin
                        this.setError(true)
                        this.setMsg(resp.data.Error)
                        this.setState(true)
                        this.closeModal();
                        await new Promise(r => setTimeout(r, 2000));
                        this.setState(false)
                    }
                    else {
                        this.setMsg('successful modification')
                        this.setState(true)
                        this.setError(false)
                        this.$router.go('/profile')
                    }
                })
                .catch(err => {
                    console.log(err.message)
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
        z-index: 1;
    }
</style>