<template>
  <div id="foot" class="w-full text-center flex flex-row items-center justify-center gap-2 border-t h-16" style="min-height: 4rem;">
      <p class="text-sm">© 2022 InkBytes , Inc. All rights reserved.</p>
      <div class="flex flex-row gap-1">
          <img src="../assets/twitter.svg" class="w-4 h-4" />
          <img src="../assets/instagram.svg" class="w-4 h-4" />
          <img src="../assets/figma.svg" class="w-4 h-4" />
      </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Footer',
});
</script>