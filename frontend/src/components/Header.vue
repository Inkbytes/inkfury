<template>
  <div class="nav">
      <div id="logo">
        <img src="../assets/logo.svg">
        <h1>InkFury</h1>
      </div>
      <ul>
          <li><a href="">Core team</a></li>
          <li><a href="">About</a></li>
          <li id="login"><a href="">Login</a></li>
      </ul>
  </div>
</template>

<script>
export default {

}
</script>

<style>
    .nav {
        margin:  auto;
        width: 50%;
        overflow: hidden;
    }
    #logo {
        float: left;
        display: inline-block
    }
    #logo h1{
        display: inline-block;
        font-family: 'Inter';
        font-style: normal;
        font-weight: bold;
        font-size: 24px;
        line-height: 30px;
        color: #0A2A42;
    }
    .nav ul {
        float: right;
        display: flex;
        list-style: none;
        align-items: center;
        height: 62.16px !important;
        margin: 0;
    }
    .nav ul a {
        padding: 0 10px;
        font-family: 'Inter';
        font-style: normal;
        font-weight: bold;
        font-size: 18px;
        line-height: 22px;
        color: #000000;
        text-decoration: none;
        display: inline-block;
    }
    #login a{
        color: white;
        padding: 10px;
        background: #0069FF;
        border-radius: 20px;
    }
</style>