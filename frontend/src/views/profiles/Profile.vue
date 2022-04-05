<template>
  <DefaultLayout class="bg-slate-50">
      <Iprofile v-if="!loading" :users="users"/>
  </DefaultLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
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
            loading :true
        }
    },
   async mounted()
    {
        await(fetch("http://10.12.2.2:9000/api/users"))
            .then(res => res.json())
            .then(data =>  data && (this.users = data) )
            .catch(err => console.log(err.message))
        this.loading = false
    }
});
</script>