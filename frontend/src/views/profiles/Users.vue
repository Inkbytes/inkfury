<template>
  <DefaultLayout>
    <UserProfile v-if="!!currentUser && !loading" :users="users" :login="login" :games="games" />
  </DefaultLayout>
</template>

<script lang="ts">
import { defineComponent, computed, onUpdated } from "vue";
import UserProfile from "../../components/UserProfile.vue";
import DefaultLayout from "../../layouts/default.vue";
import useStore from "../../store";

export default defineComponent({
  name: "Users",
  props: ["login"],
  data() {
    const store = useStore();
    return {
      currentUser: computed(() => store.state.auth.user),
      loading: computed(() => store.state.config.isLoading),
      users: [],
      games: []
    };
  },
  components: { DefaultLayout, UserProfile },
  async mounted()
  {
      await(fetch("http://10.12.2.4:9000/api/users"))
          .then(res => res.json())
          .then(data =>  data && (this.users = data) )
          .catch(err => console.log(err.message))
      await(fetch("http://10.12.2.4:9000/api/game/completed"))
            .then(res => res.json())
            .then(data =>  data && (this.games = data) )
            .catch(err => console.log(err.message))
  }
});
</script>
