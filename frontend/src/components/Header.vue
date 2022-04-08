<template>
  <div class="w-full  shadow-md">
    <div id="demo">
      <transition name="fade">
        <Msg />
      </transition>
    </div>
    <Modal v-if="!signUp && user && logged && !loading" :user="user" />
    <Is2fa v-if="!load && user && user.is2fa && !user.isLogged" :email="email" />
    <div
      class="w-full mx-auto max-w-7xl flex flex-row items-center justify-between py-2 px-8 h-16"
      style="min-height: 4rem"
    >
      <div class="flex flex-row items-center gap-8">
        <div>
          <router-link class="flex flex-row gap-2" :to="{ name: 'Home' }">
            <img src="../assets/logo.svg" />
            <h1 class="text-xl font-semibold">InkFury</h1>
          </router-link>
        </div>
        <ul class="flex flex-row gap-4 items-center text-sm font-semibold">
          <li
            v-if="logged"
            class="hover:text-blue-600 transition-colors duration-300"
          >
            <router-link :to="{ name: 'Chat' }">Chat</router-link>
          </li>
          <li
            v-if="!logged"
            class="hover:text-blue-600 transition-colors duration-300"
          >
            <a href="#education">Core team</a>
          </li>
          <li v-else class="hover:text-blue-600 transition-colors duration-300">
            <router-link :to="{ name: 'Game' }">Game</router-link>
          </li>
          <li
            v-if="!logged"
            class="hover:text-blue-600 transition-colors duration-300"
          >
            <a href="#about">About</a>
          </li>
          <li v-else class="hover:text-blue-600 transition-colors duration-300">
            <router-link :to="{ name: 'Profile' }">Profile</router-link>
          </li>
        </ul>
      </div>
      <a
        v-if="!logged"
        id="login"
        class="
          px-4
          py-2
          text-xs text-white
          bg-green-600
          rounded-md
          font-semibold
          hover:bg-green-400
          duration-300
        "
        href="http://10.12.1.6:9000/api/login"
        >login</a
      >
      <a
        v-else
        id="logOut"
        class="
          px-4
          py-2
          text-xs text-white
          bg-red-600
          rounded-md
          font-semibold
          hover:bg-red-400
          duration-300
        "
        @click="logout"
        >Log out</a
      >
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Msg from "./Msg.vue";
import Modal from  '../components/Modal.vue'
import Is2fa from  '../components/Is2fa.vue'

import { computed } from "vue";
import useStore from "../store";


import axios, { AxiosResponse } from "axios";
import Loading from "./Loading.vue";

export default defineComponent({
  name: "Header",
  el: "#demo",
  data() {
    const store = useStore();
    return {
      load: false,
      login: (e: any) => store.commit("auth/setLogged", e),
      userData: (e: any) => store.commit("auth/setUser", e),
      logged: computed(() => store.state.auth.logged),
      setLoading: (e: boolean) => store.commit("config/setLoading", e),
      user : {},
      signUp: true,
      email: '',
      store
    };
  },
  components: { Msg, Loading, Modal, Is2fa },
  methods: {
    async logout() {
      this.load = true
      window.location.href = 'http://10.12.1.6:9000/api/login/logout'
      this.user.isLogged = false
      const usr = this.user
      await axios.post("http://10.12.1.6:9000/api/users", usr, {withCredentials: true})
    },
    deleteAllCookies() {
      var cookies = document.cookie.split(";");

      for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
      }
    },
  },
  async mounted() {
    await axios
      .post(
        "http://10.12.1.6:9000/api/login/login_verification",
        {},
        { withCredentials: true }
      )
      .then((resp: AxiosResponse) => {
        this.login(true);
        this.userData(resp.data.user);
        this.user = resp.data.user
        this.signUp = resp.data.sign
        this.setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        this.login(false);
        if (this.$route.path !== "/") this.$router.replace("/");
        this.setLoading(false);
      }); 
      const usr = this.user;
      if (this.user && this.user.is2fa && !this.user.isLogged) {
        axios.post("http://10.12.1.6:9000/api/tfa/verify", usr, {withCredentials: true})
        .then((resp: AxiosResponse) =>{
             this.email = resp.data
        })
        .catch(err => console.log(err.message))
      }
      else {
        this.user.isLogged = true
        const usr = this.user
        axios.post("http://10.12.1.6:9000/api/users", usr, {withCredentials: true})
      }
  },
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>