<template>
  <div class="headerPic">
    <div>
      <p class="imgTitle">{{ recommendTitle }}</p>
      <a href="baidu.com">
        <img src="../assets/1_130326114005_1.jpg" class="headerImg" alt="头部图片">
      </a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      recommendTitle: ''
    }
  },
  components: {

  }
}
</script>

<style scoped lang="css">
  .headerPic{
    height: 300px;
    width: 100%;
    background-color: antiquewhite;
  }
  .headerImg{
    height: 300px;
    width: 100%;
  }
  .imgTitle{
    z-index: 2;
    padding-left: 45%;
    padding-top: 230px;
    position: absolute;
    color: #fff;
    font-size: 20px;
  }
</style>
