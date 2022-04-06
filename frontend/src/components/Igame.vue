<template>
    <div>
        <!-- <router-link :to="{ name: 'spectateGame', params: {id: game.id}}" v-for="game in games" :key="game"> -->
            <aside class="match" v-for="game in games" :key="game">
                <div class="flex">
                    <h4>{{getUserById(game.p1Id).fullname}}</h4>
                    <img :src="getImage(getUserById(game.p1Id).avatar)" width="50" height="50">
                </div>
                <div class="flex">
                    <h4>{{getUserById(game.p2Id).fullname}}</h4>
                    <img :src="getImage(getUserById(game.p2Id).avatar)" width="50" height="50">
                </div>
            </aside>
        <!-- </router-link> -->
    </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';


import DefaultLayout from '../layouts/default.vue'

import useStore from '../store'


export default defineComponent({
    name: 'Games',
    props: ['users', 'games'],
    components: { DefaultLayout},
    data() {
        const store = useStore();
        return {

        }
    },
    methods: {
        getUserById(id : number) {
            console.log(this.users.find(element => element.id === id))
            return this.users.find(element => element.id === id)
        },
        getImage(pic: string) {
            if (pic.startsWith("https://cdn.intra.42.fr/users/"))
                return pic;
            else return "../assets/" + pic;
        }
    }
});
</script>

<style>
.match {
  padding: 5px 0;
  display: flex;
  background: #323232;
  box-shadow: 0px 4px 28px rgba(0, 0, 0, 0.01);
  border-radius: 9px;
  width: 45%;
  margin-right: 2.5%;
  margin-bottom: 20px;
}
.match img {
    height: 50px;
    border: 1px solid rgba(0, 0, 0, 0.14);
    box-sizing: border-box;
    border-radius: 8px; 
}
</style>