<template>
  <div class="container">
    <div>
      <movie-index-header></movie-index-header>
    </div>
    <div class="contentMain">
      <h1>文章标题</h1>
      <div>文章发布时间</div>
      <div class="contentText">文章内容</div>
    </div>
      <comment></comment>
    <div>
      <common-footer></common-footer>
    </div>
    <div>
      <common-footer></common-footer>
    </div>
  </div>
</template>

<script>
import MovieIndexHeader from '../components/MovieIndexHeader'
import CommonFooter from '../components/CommonFooter'
import Comment from '../components/Comment'
let article_id = 0;

export default {
  name: 'NewDetail',
  components: {
    MovieIndexHeader,
    CommonFooter,
    Comment
  }
}
</script>

<style scoped lang="css">
  .container{
    width: 100%;
    margin: 0 auto;
  }
  .contentMain{
    padding-top: 150px;
  }
  .contentText{
    font-size: 15px;
    padding-top: 20px;
  }
</style>
