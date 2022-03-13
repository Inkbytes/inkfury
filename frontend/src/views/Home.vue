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

  <div id="about">
    <h2>We are here for you</h2>
    <p class="bold">Learn how to make and publish sites with Figma</p>
    <p class="normal">Makers is a Figma Plugin to help you build and publish sites directly in Figma. No code required.</p>
    <div id="content">
      <aside>
          <p class="bold">How do you go from Figma to Site?</p>
          <p class="normal">Lorem ipsum dolor sit amet, aeque tation vis ei. Ne his simul sensibus percipitur. Lorem ipsum dolor sit amet, aeque tation vis ei. Ne his simul sensibus percipitur.</p>
      </aside>
      <aside>
        <p class="bold">Where’s all the love?</p>
        <p class="normal">Lorem ipsum dolor sit amet, aeque tation vis ei. Ne his simul sensibus percipitur.</p>
      </aside>
      <aside>
        <p class="bold">Where’s all the love?</p>
        <p class="normal">Lorem ipsum dolor sit amet, aeque tation vis ei. Ne his simul sensibus percipitur. Lorem ipsum dolor sit amet, aeque tation vis ei. Ne his simul sensibus percipitur.</p>
      </aside>
    </div>
  </div>

  <div id="education">
    <h3>EDUCATION</h3>
    <p class="bold">Learn how to make and publish sites with Figma</p>
    <p class="normal">Makers is a Figma Plugin to help you build and publish sites directly in Figma. No code required.</p>
    <Swiper :slides-per-view="3" :space-between="0" :autoplay="{
      delay: 2500,
      disableOnInteraction: false,
    }">

        <swiper-slide><div class="ID">
            <img src="../assets/mashad.jpeg" width="50" height="50">
            <h2>Ashad Mohamed</h2>
            <p>backend, UI UX and database</p>
            <a href="https://github.com/f0rkr"><img src="../assets/github.png" width="20"></a>
          </div></swiper-slide>
        <swiper-slide><div class="ID">
            <img src="../assets/oel-ouar.jpeg" width="50" height="50">
            <h2>Oussama Elouarti</h2>
            <p>frontend and UI UX</p>
            <a href="https://github.com/OussamaElouarti"><img src="../assets/github.png" width="20"></a>
          </div></swiper-slide>
        <swiper-slide><div class="ID">
            <img src="../assets/ztaouil.jpeg" width="50" height="50">
            <h2>Zakaria Taouil</h2>
            <p>pong game</p>
            <a href="https://github.com/taouil-zakaria"><img src="../assets/github.png" width="20"></a>
          </div></swiper-slide>
        <swiper-slide><div class="ID">
            <img src="../assets/abiari.jpeg" width="50" height="50">
            <h2>Ali Biari</h2>
            <p>chat</p>
            <a href="https://github.com/Gruxme"><img src="../assets/github.png" width="20"></a>
          </div></swiper-slide>
        <swiper-slide><div class="ID">
            <img src="../assets/aabounak.jpeg" width="50" height="50">
            <h2>Ayoub Abounakif</h2>
            <p>chat</p>
            <a href="https://github.com/ayoubabounakif"><img src="../assets/github.png" width="20"></a>
          </div></swiper-slide>
    </Swiper>
  </div>

  <Footer/>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import 'swiper/swiper-bundle.min.css';
import SwiperCore, { Autoplay} from "swiper/core";
SwiperCore.use([Autoplay]);

export default defineComponent({
  name: 'Home',
  components: { Header, Footer, Swiper, SwiperSlide,},
  data() {
    return {
      
    }
  }
});
</script>

<style scoped>
#text {
  margin-top: 42px;
  margin-right: 200px;
}
#pong {
  display: flex;
  max-width: 1200px;
  margin: 0 auto;
  text-align: left;
  margin-bottom: 100px;
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
  font-weight: bold;
  font-size: 18px;
  line-height: 40px;
  text-align: center;
}
#education {
  max-width: 1200px;
  margin: 0 auto 100px;
}
#education h3 {
  color: #0069FF;
}
#education p {
  margin: 0 auto;
  margin-bottom: 10px;
}
#education .bold {
  max-width: 720px;
}
#education .normal {
  max-width: none;
  margin-bottom: 40px;
}
.ID {
  width: 300px;
  height: 200px;
  margin: 0 auto;
  background-color: #F1F1F1;
  border-radius: 20px;
}
.ID img {
  margin-top: 10px;
  border-radius: 10px;
}
.ID h2 {
  margin-bottom: 0;
}
#about {
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
  margin-bottom: 100px;
}
#about h2{
  font-family: 'Inter';
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 29px;
  text-align: center;
  text-transform: uppercase;
  color: #678398;
}
#about .bold {
  max-width: 720px;
  margin: 0 auto;
}
#about .normal {
  max-width: none;
}
#content {
  display: flex;
}
#content aside {
  width: 30%;
}
#content aside .bold {
  text-align: left;
  font-size: 24px;
  line-height: 24px;
}
#content aside .normal {
  text-align: left;
}
#content aside:first-child {
  margin-right: 5%;
}
#content aside:last-child {
  margin-left: 5%;
}
</style>