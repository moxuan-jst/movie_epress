<template>
  <div class="header">
    <router-link to="/LoginPage">
      <div class="header_menu">登录</div>
    </router-link>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped lang="css">
  .header{
    width: 103%;
    height: 30px;
    left: 0;
    top: 0;
    color: #000;
    background-color: #C3BD5C;
  }
  .header_menu{
    padding-right: 60px;
    padding-top: 10px;
    float: right;
    color: #fff;
    font-size: 8px;
  }
</style>
