<template>
  <div class="nav">
      <div id="logo">
        <img src="../assets/logo.svg">
        <h1>InkFury</h1>
      </div>
      <ul>
          <li v-if="!loged"><a href="#education">Core team</a></li>
          <li v-else><a href="">Game</a></li>
          <li v-if="!loged"><a href="#about">About</a></li>
          <li v-else><a href="">Profil</a></li>
          <li v-if="!loged" id="login"><a href="">Login</a></li>
          <li v-else id="logOut"><a href="">Log out</a></li>
      </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Header',
  data(){
      return {
          loged: false
      }
  }
});
</script>

<style>
    .nav {
        margin:  auto;
        max-width: 800px;
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
    .nav ul a {
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
        padding: 10px;
        background: #42b983;
        border-radius: 20px;
    }
    #logOut a{
        color: white;
        padding: 10px;
        background: salmon;
        border-radius: 20px;
    }
</style>