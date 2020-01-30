<template lang="html">
  <div class="footer">
    <div class="copy">
      <i class="glyphicon glyphicon-copyright-mark">2019</i>
      <span>&nbsp;by<a href="https://wwww.moxuan.xyz"> 墨轩啊</a></span>
    </div>
    <div class="info">
        <a href="moxuan-jst@foxmail.com"><i class="iconfont">&#xe7f9;</i><span>&nbsp;E-Mail:moxuan-jst@foxmail.com</span></a>
        <a href="https://github.com/moxuan-jst"><i class="iconfont">&#xe600;<span>&nbsp;moxuan-jst</span></i></a>
        <a href="https://weibo.com/u/2690290777"><i class="iconfont">&#xe65e;</i><span>&nbsp;墨轩啊</span></a>
    </div>
  </div>
</template>
<style scoped lang="css">
.footer{
    width: 100%;
    height: 50px;
    background-color: rgb(34, 34, 34);
    position: absolute;
    bottom: 0;
    left:0;
    border-radius: 3px;
    display: flex;
    justify-content: center; 
    align-items: center;
    flex-direction: column;
    color: #ffffff;
    font-size: 16px;
}
.copy a{
    color: #ffffff;
}
.info a{
    margin-right: 10px;
    color: #ffffff;
}
.copy a:hover,
.info a:hover{
    color: rgb(51, 122, 183);
    text-decoration: none;
}


/* 字体图标 */

@font-face {
  font-family: 'iconfont';  /* project id 1478474 */
  src: url('//at.alicdn.com/t/font_1478474_7omr7e9yu9l.eot');
  src: url('//at.alicdn.com/t/font_1478474_7omr7e9yu9l.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_1478474_7omr7e9yu9l.woff2') format('woff2'),
  url('//at.alicdn.com/t/font_1478474_7omr7e9yu9l.woff') format('woff'),
  url('//at.alicdn.com/t/font_1478474_7omr7e9yu9l.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_1478474_7omr7e9yu9l.svg#iconfont') format('svg');
}

.iconfont{
    font-family:"iconfont" !important;
    font-size:16px;font-style:normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;
}
</style>
