<template>
  <div class="container">
    <div>
      <!-- 展示引入的 header 组件 -->
      <movie-index-header></movie-index-header>
    </div>

    <div class="userMessage">
      <!-- 展示引入的用户信息组件 -->
      <user-message></user-message>
    </div>

    <div class="contentPic">
      <!-- 展示大图组件 -->
      <!-- 各种list组件并用v-for来遍历获得的数据 -->
      <index-header-pic 

      >
      <!-- v-for="item in headerItems" 
      :key="item.id" 
      :recommendImg="item.recommendImg" 
      :recommendSrc="item.recommendSrc" 
      :recommendTitle="item.recommendTitle" -->
      </index-header-pic>
    </div>

    <div class="contentMain">
      <Row>
        <i-col span="11" offset="1">
          <Card>
            <p slot="title">
              <Icon type="ios-film"></Icon>
              电影
            </p>
            <ul class="cont-ul">
            <!-- 引入 movieslist -->
            <movies-list
              v-for="item in movieItems"
              :key="item._id"
              :id="item._id"
              :movieName="item.movieName"
              :movieTime="item.movieTime"
            ></movies-list>
          </ul>
          </Card>
        </i-col>
        <i-col span="10" offset="1">
          <Card>
            <p slot="title">
              <Icon type="ios-paper"></Icon> 
              新闻
            </p>
            <ul class="cont-ul">
            <!-- list 组件展示 -->
            <news-list
              v-for="item in newsItems"
              :key="item._id"
              :id="item._id"
              :articleTitle="item.articleTitle"
              :articleTime="item.articleTime"
            ></news-list>
          </ul>
          </Card>
        </i-col>
      </Row>
    </div>

    <!-- footer 组件 -->
    <common-footer></common-footer>
  </div>
</template>

<script>
// 引入所有组件
import MovieIndexHeader from '../components/MovieIndexHeader';
import CommonFooter from '../components/CommonFooter';
import NewsList from '../components/NewsList';
import MoviesList from '../components/MovieList';
import IndexHeaderPic from '../components/IndexHeaderPic';
import UserMessage from '../components/UserMessage';
import axios from 'axios'
import Vueaxios from 'vue-axios'

export default {
  data() {
    return {
      // 获取主页推荐，主页新闻列表和主页电影列表，并将获得的内容放置在定义的变量中
      headerItems: [],
      newsItems: [],
      movieItems: []
    }
  },
  // 获得数据，获取主页推荐，主页新闻列表和主页电影列表
  created(){
    // 主页推荐
    axios.get('http://localhost:3000/showIndex').then(Response => {
      this.headerItems = Response.data;
      // console.log(this.headerItems)
    })
    
    // 获取新闻
    axios.get('http://localhost:3000/showArticle').then(Response => {
      this.newsItems = Response.data;
      // console.log(this.newsItems)
    })

    // 获取所有电影
    axios.get('http://localhost:3000/showRanking').then(Response => {
      this.movieItems = Response.data;
      // console.log(this.movieItems)
    })
  },
  // 注册组件
  components: {
    MovieIndexHeader,
    CommonFooter,
    NewsList,
    MoviesList,
    IndexHeaderPic,
    UserMessage
  }
}
</script>

<style scoped lang="css">
  .container{
    width: 100%;
    margin: 0 auto;
  }
  .contentMain{
    padding-top: 15px;
  }
  .userMessage{
    margin-top: 0px;
    margin-left: 0px;
  }
  .contentPic{
    padding-top: 5px;
  }


  .cont-ul{
    padding-top: 0.5rem;
    background-color: #fff;
  }
  .cont-ul::after{
    content: '';
    display: block;
    clear: both;
    width: 0;
    height: 0;
  }
</style>
