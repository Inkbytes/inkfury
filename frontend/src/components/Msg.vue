<template>
    <div v-if="msgState" :class="{ red : msgError }">
        <p>{{ this.msg }}</p>
    </div>
</template>

<script>
import { computed, defineComponent } from 'vue';
import useStore from '../store';

export default defineComponent({
    name : 'Msg',
    setup() {
        const store = useStore()

        return {
            msg : computed(() => store.state.msg.msg),
            msgState : computed(() => store.state.msg.msgState),
            msgError : computed(() => store.state.msg.error)
        }
    }
});
</script>

<style scoped>
    div {
        background: #42b983;
        color: white;
        margin: 0;
        height: 30px;
    }
    .red {
        background: red !important;
    }
    p {
        margin: 0;
        padding-top: 5px;  
    }
</style>