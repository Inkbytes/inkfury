<template>
  <DefaultLayout class="bg-slate-50">
      <Iprofile v-if="!loading" :users="users" :games="games" :wins="gameWon"/>
  </DefaultLayout>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import Iprofile from '../../components/Iprofile.vue'


import DefaultLayout from '../../layouts/default.vue'

import useStore from '../../store'


export default defineComponent({
    name: 'Profile',
    components: { DefaultLayout, Iprofile},
    data() {
        const store = useStore();
        return {
            users: [],
            user : computed(() => store.state.auth.user),
            loading :true,
            games :[],
            gameWon: 0
        }
    },
   async mounted()
    {
        await(fetch("http://10.12.2.4:9000/api/users", {credentials: 'include'}))
            .then(res => res.json())
            .then(data =>  data && (this.users = data) )
            .catch(err => console.log(err.message))
        await(fetch("http://10.12.2.4:9000/api/game/completed", {credentials: 'include'}))
            .then(res => res.json())
            .then(data =>  data && (this.games = data) )
            .catch(err => console.log(err.message))
        await(fetch("http://10.12.2.4:9000/api/game/score/"+ this.user.id, {credentials: 'include'}))
            .then(res => res.json())
            .then(data =>  data && (this.gameWon = data.wins) )
            .catch(err => console.log(err.message))
        this.loading = false
    }
});
</script>
