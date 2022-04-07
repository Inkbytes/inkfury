<template>
  <div id="loading">
     <h1 style="font-size: 46px;">Loading</h1>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import useStore from '../store';

export default defineComponent({
  name: 'Loading',
  setup() {
      const store = useStore()

      return {
        isLoading: computed(() => store.state.config.isLoading)
      }
  }
});
</script>

<style>
#loading {
    z-index: 99999;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: fixed;
    width: 100%;
    height: 100vh;
    background-color: rgba(13, 25, 122, .4);
}
</style>
