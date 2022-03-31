<template>
  <div style="display: flex; flex-direction: column; width: 100%; height: 100%">
    <Header :logged="logged" />
        <slot/>
    <Footer />
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'

export default defineComponent({
    name: 'DefaultLayout',
    components: {
        Header, Footer
    }
})
</script>

<style>
body {
    margin: 0;
}
</style>