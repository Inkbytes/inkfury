<template>
  <DefaultLayout>
    <UserProfile v-if="!!currentUser" :login="login" />
  </DefaultLayout>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import UserProfile from "../../components/UserProfile.vue";
import DefaultLayout from "../../layouts/default.vue";
import useStore from "../../store";

export default defineComponent({
  name: "Users",
  props: ["login"],
  data() {
    const store = useStore();
    return {
      currentUser: computed(() => store.state.auth.user)
    };
  },
  components: { DefaultLayout, UserProfile },
});
</script>
