<template>
  <div id="backdrop" @click.self="closeModal">
      <div class="modal">
          <h1>Settings</h1>
            <p>Change nickname</p>
            <input type="text" :value="nickname"> <br>
            <input type="checkbox">
            <p>2FA authentication</p> <br>
            <p>Choose a profile picture</p>
            <input type="file"
                id="avatar" name="avatar"
                accept="image/png, image/jpeg"> <br>
            <button>Save</button>
      </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
    props: ["nickname"],
    methods: {
        closeModal() {
            this.$emit('close')
        }
    }
});
</script>

<style scoped>

    .modal {
        width: 500px;
        padding: 20px;
        margin: 200px auto;
        background: white;
        border-radius: 10px;
    }
    #backdrop {
        top: 0;
        text-align: left;
        position: fixed;
        background: rgba(0,0,0,0.5);
        width: 100%;
        height: 100%;
        z-index: 1;
    }
    .modal p {
        display: inline-block;
    }
    .modal h1{
        text-align: center;
    }
    .modal button {
        text-align: center !important;
    }
</style>