<template>
  <Carousel autoplay loop radius-dot>
      <CarouselItem>
          <a class="demo-carousel" href="#"> 
            <img src="../assets/0_ab2fd9c320.jpg" class="headerImg" alt="头部图片">
          </a>
      </CarouselItem>
      <CarouselItem>
          <a class="demo-carousel" href="#"> 
            <img src="../assets/0_ab2fd9c320.jpg" class="headerImg" alt="头部图片">
          </a>
      </CarouselItem>
      <CarouselItem>
          <a class="demo-carousel" href="#"> 
            <img src="../assets/0_ab2fd9c320.jpg" class="headerImg" alt="头部图片">
          </a>
      </CarouselItem>
      <CarouselItem>
          <a class="demo-carousel" href="#"> 
            <img src="../assets/0_ab2fd9c320.jpg" class="headerImg" alt="头部图片">
          </a>
      </CarouselItem>
  </Carousel>
</template>

<script>
export default {
  // 组件间值传递
  props:['recommendSrc', 'recommendImg', 'recommendTitle']
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
