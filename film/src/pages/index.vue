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
      <index-header-pic></index-header-pic>
    </div>

    <div class="contentMain">
      <div>
        <div class="contentLeft">
          <ul class="cont-ul">
            <!-- 引入 movieslist -->
            <movies-list></movies-list>
          </ul>
        </div>
      </div>
      <div>
        <div class="contentRight">
          <ul class="cont-ul">
            <!-- list 组件展示 -->
            <news-list></news-list>
          </ul>
        </div>
      </div>
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

export default {
  data() {
    return {

    }
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
    height: 50px;
  }
  .userMessage{
    padding-top: 60px;
    margin-top: -10px;
    margin-left: -10px;
  }
  .contentPic{
    padding-top: 5px;
  }
  .contentLeft{
    width: 60%;
    float: left;
    margin-top:5px;
    border-top: 1px solid #000;
  }
  .contentRight{
    width: 38%;
    margin-left: 1%;
    float: left;
    margin-top:5px;
    border-top: 1px solid #000;
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
