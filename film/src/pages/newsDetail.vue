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
import axios from 'axios'

let article_id = 0;
export default {
  name: 'NewDetail',
  data(){
    return {
      detail: [],
      article_id: ''
    }
  },
  components: {
    MovieIndexHeader,
    CommonFooter,
    Comment
  },
  created(){
    article_id = this.$route.query.id;
    this.article_id = article_id;
    axios.post('http://localhost:3000/articleDetail', {article_id: article_id}).then(data => {
      this.detail = data.body.data[0];
      this.detail.articleTime = new Date(parseInt(this.detail.articleTime)).toLocaleString();
    })
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
