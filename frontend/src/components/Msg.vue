<template>
    <div>
        <p>{{ this.msg }}</p>
    </div>
</template>

<script>
import { defineComponent } from 'vue';
export default defineComponent({
    props: ['msg'],
    name : 'Msg'
});
</script>

<style scoped>
    div {
        background: #42b983;
        color: white;
        margin: 0;
        height: 30px;
    }
    p {
        margin: 0;
        padding-top: 5px;  
    }
</style>