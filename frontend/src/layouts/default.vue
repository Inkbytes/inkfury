<template>
  <div style="display: flex; flex-direction: column; width: 100%; height: 100%">
    <Header :logged="logged" />
      <Loading v-if="isLoading" />
      <slot v-else/>
    <Footer />
  </div>
</template>

<script>
import { defineComponent, computed } from 'vue'
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import Loading from '../components/Loading.vue'

import useStore from '../store'

export default defineComponent({
    name: 'DefaultLayout',
    components: {
        Header, Footer, Loading
    },
    setup() {
      const store = useStore()

      return {
        isLoading: computed(() => store.state.config.isLoading)
      }
    }
})
</script>

<style scoped>
body {
    margin: 0;
}
</style>