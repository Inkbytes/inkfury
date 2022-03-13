<template>
  
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
    data() {
        return {
            users: []
        }
    },
    mounted() {
        fetch("http://localhost:3000/users")
            .then((res) => res.json())
                .then(data => this.users = data)          
            .catch(err => console.log(err.message))  
    }
});
</script>

<style>

</style>