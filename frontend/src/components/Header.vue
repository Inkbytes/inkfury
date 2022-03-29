<template>
  <Loading />
    <div id="demo">
        <transition name="fade">
            <Msg v-if="error" :msg="errorMsg"/>
        </transition>
    </div>
  <div class="nav">
      <router-link :to="{ name: 'Home' }">
      <div id="logo">
        <img src="../assets/logo.svg">
        <h1>InkFury</h1>
      </div>
      </router-link>
      <ul>
          <li v-if="!logged"><a href="#education">Core team</a></li>
          <li v-else-if="!game"><router-link :to="{ name : 'Game' }">Game</router-link></li>
          <li v-else><a href="">Chat</a></li>
          <li v-if="!logged"><a href="#about">About</a></li>
          <li v-else-if="profil"><a href="">Chat</a></li>
          <li v-else><router-link :to="{ name: 'Profile'}">Profile</router-link></li>
          <li v-if="!logged" id="login"><a href="http://10.12.1.6:3000">Login</a></li>
          <li v-else id="logOut"><a @click="logout" >Log out</a></li>
      </ul>
  </div>
</template>

<script lang="ts">
// eslint-disable-next-line
import { defineComponent } from 'vue';
import Msg from './Msg.vue'

import { computed } from 'vue'
import useStore from '../store'

import axios, { AxiosResponse } from "axios";
import Loading from './Loading.vue';

export default defineComponent({
  props: [ 'profil' , 'game', 'error', 'errorMsg'],
  name: 'Header',
  el: "#demo",
  data(){
      const store = useStore();
      console.log(store)
      return {
          login: (e:any) => store.commit('auth/setLogged', e),
          userData:(e:any) => store.commit('auth/setUser', e),
          logged: computed(() => store.state.auth.logged),
          setLoading: (e: boolean) => store.commit('config/setLoading', e),
          store
      }
  },
  components: { Msg, Loading },
  methods: {
      logout() {
          this.login(false);
          this.deleteAllCookies();
          this.$router.replace('/')
      },
      deleteAllCookies() {
        var cookies = document.cookie.split(";");

        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i];
            var eqPos = cookie.indexOf("=");
            var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
        }
    }
  },
  mounted() {
    axios
        .post("http://10.12.1.6:3000/login_verification", {}, { withCredentials: true })
        .then((resp: AxiosResponse) => {
          this.login(true);
          this.userData(resp.data)
          this.setLoading(false);
        })
        .catch(() => {
           this.login(false);
          if (this.$route.path !== '/')
            this.$router.replace('/')
        this.setLoading(false);
        })
  }
});
</script>

<style>
    .nav {
        width: 100%;
        margin:  auto;
        max-width: 900px;
        overflow: hidden;
        margin-bottom: 30px;
    }
    #logo {
        float: left;
        display: inline-block;
        cursor: pointer;
    }
    #logo h1{
        display: inline-block;
        font-family: 'Inter';
        font-style: normal;
        font-weight: bold;
        font-size: 24px;
        line-height: 30px;
        color: #0A2A42;
        margin-left: 5px;
    }
    .nav ul {
        float: right;
        display: flex;
        list-style: none;
        align-items: center;
        height: 62.16px !important;
        margin: 0;
    }
    .nav ul a , router-link{
        padding: 0 10px;
        font-family: 'Inter';
        font-style: normal;
        font-weight: bold;
        font-size: 18px;
        line-height: 22px;
        color: #000000;
        text-decoration: none;
        display: inline-block;
    }
    #login a{
        color: white;
        padding: 8px;
        background: #42b983;
        border-radius: 10px;
    }
    #logOut a{
        color: white;
        padding: 8px;
        background: salmon;
        border-radius: 10px;
        cursor: pointer;
    }
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to{
        opacity: 0;
    }
</style>