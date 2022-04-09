<template>
  <DefaultLayout class="bg-slate-50">
      <div v-if="!games.length">
          <h1>No games are playing</h1>
      </div>
      <Igame v-else-if="!loading && games.length" :users="users" :games="games"/>
  </DefaultLayout>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import Igame from '../components/Igame.vue'


import DefaultLayout from '../layouts/default.vue'

import io from 'socket.io-client'

export default defineComponent({
    name: 'Games',
    components: { DefaultLayout, Igame},
    data() {
        return {
            users: [],
            loading :true,
            games: []
        }
    },
   async mounted()
    {
        await(fetch("http://10.12.1.4:9000/api/users", {credentials: 'include'}))
            .then(res => res.json())
            .then(data =>  data && (this.users = data) )
            .catch(err => console.log(err.message))
        let socket: any = io("http://10.12.1.4:9000");

        socket.on('connect', () => {
            console.log(`/games connected with id ${socket.id}`);
			socket.emit('sendgamearray-event', 1);
        });
        socket.on('receivegamearray-event', ( data: any ) => {
			console.log(`data received: ${data}`);
            this.games = data;
        });
        this.loading = false
    }
});
</script>

<style scoped>
    h1 {
        margin: 20px auto 20px;
        text-align: center;
    }
</style>
