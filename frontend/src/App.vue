<template>
  <router-view />
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    name: 'app',
    components: { },
    data() {
      return {
        logged : true
      }
    }
  });
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
