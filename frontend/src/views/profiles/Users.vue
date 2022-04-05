<template>
  <DefaultLayout>
    <UserProfile v-if="!!currentUser && !loading" :users="users" :login="login" />
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
      users: []
    };
  },
  components: { DefaultLayout, UserProfile },
  async mounted()
  {
      await(fetch("http://10.12.1.6:9000/api/users"))
          .then(res => res.json())
          .then(data =>  data && (this.users = data) )
          .catch(err => console.log(err.message))
      this.loading = false
  }
});
</script>
