<template>
  <div id="foot">
      <p class="copyright">© 2022 InkBytes , Inc. All rights reserved.</p>
      <div id="social">
        <a id="twitter" href=""></a>
        <a id="instagram" href=""></a>
        <a id="github" href=""></a>
      </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Footer',
});
</script>

<style>
#foot {
    overflow: hidden;
    max-width: 800px;
    width: 100%;
    margin: 0 auto;
}
#foot p {
    float: left;
    display: inline-block;
    font-family: 'Inter';
    font-style: normal;
    font-weight: bold;
    font-size: 14px;
    line-height: 17px;
    text-align: center;
    color: #678398;
}
#social {
    float: right;
}
#social a {
    margin-top: 18px;
    margin-bottom: 12px;
    margin-left: 5px;
    width: 24px;
    display: inline-block;
    height: 24px;
}
#twitter {
    background-image: url("../assets/twitter.svg");
}
#instagram {
    background-image: url("../assets/instagram.svg");
}
#github {
    background-image: url("../assets/figma.svg");
}
</style>