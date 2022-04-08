<template>
    <div>
        <router-link :to="{ name: 'spectateGame', params: {id: game.gameId}}" v-for="game in games" :key="game">
            <aside class="match" >
                        <div>
                            <h4>{{getUserById(game.p1Id).fullname}}</h4>
                            <img :src="getImage(getUserById(game.p1Id).avatar)" width="50" height="50">
                        </div>
                        <span>VS</span>
                        <div>
                            <img :src="getImage(getUserById(game.p2Id).avatar)" width="50" height="50">
                            <h4>{{getUserById(game.p2Id).fullname}}</h4>
                        </div>
            </aside>
        </router-link>
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

<style scoped>
.match {
  text-align: center;
  margin: 20px auto 20px;
  padding: 5px 0;
  display: flex;
  background: #323232;
  box-shadow: 0px 4px 28px rgba(0, 0, 0, 0.01);
  border-radius: 9px;
  width: 50%;
}
.match div {
    width: 50%;
}
.match img {
    height: 50px;
    border: 1px solid rgba(0, 0, 0, 0.14);
    box-sizing: border-box;
    border-radius: 8px; 
    display: inline-block;
}
.match h4, span {
    display: inline-block;
    color: white;
}
.match span {
    padding-top: 12px;
}
</style>