<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  #app{
    width: 100vw;
    height: 100vh;
    /* fixed 当页面的其余部分滚动时，背景图像不会移动。 */
    background: #57c3c2 fixed no-repeat;
    /* 把背景图像扩展至足够大，以使背景图像完全覆盖背景区域 */
    background-size: cover;
  }
</style>
