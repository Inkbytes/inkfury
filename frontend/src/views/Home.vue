<template>
  <Header/>

  <div id="pong">
    <aside id="text">
      <h3>InkFury</h3>
      <p class="bold">Play Ping-Pong with your friends</p>
      <p class="normal">Makers is a Figma Plugin to help you build and publish sites directly in Figma. No code required.</p>
      <button>Play online</button>
    </aside>
    <aside id="pic">
      <img src="../assets/pong.webp" alt="" width="515" height="500">
    </aside>
  </div>

  <div id="education">
    <h3>EDUCATION</h3>
    <p class="bold">Learn how to make and publish sites with Figma</p>
    <p class="normal">Makers is a Figma Plugin to help you build and publish sites directly in Figma. No code required.</p>
    
  </div>

  <Footer/>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";

export default defineComponent({
  name: 'Home',
  components: { Header, Footer},
});
</script>

<style scoped>
#text {
  margin-top: 42px;
}
#pong {
  display: flex;
  max-width: 1000px;
  margin: 0 auto;
  text-align: left;
  margin-bottom: 30px;
}
#text h3{
font-family: 'Inter';
font-style: normal;
font-weight: bold;
font-size: 24px;
line-height: 29px;
color: #0A2A42;
}
#pic {
  text-align: center;
}
.bold {
  font-family: 'Inter';
  font-style: normal;
  font-weight: bolder;
  font-size: 48px;
  line-height: 58px;
  max-width: 400px;
  color: #000000;
}
.normal {
  max-width: 483px;
  font-family: 'Inter';
  font-style: normal;
  font-weight: lighter;
  font-size: 16px;
  line-height: 150%;
  color: #0A2A42;
}
button {
  color: white;
  background: #0069FF;
  border: none;
  border-radius: 15px;
  padding: 10px 15px;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 40px;
  text-align: center;
}
</style>