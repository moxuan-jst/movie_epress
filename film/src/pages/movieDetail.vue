<template>
  <div class="container">
    <div>
      <movie-index-header></movie-index-header>
    </div>
    <div class="contentMain">
      <div class>
        <h1>{{ detail.movieName }}</h1>
        <div class="viewNum">下载次数：{{ detail.movieNumDownload }}</div>
      </div>
      <div class>
        <button @click="movieDownload()">点击下载</button>
      </div>
      <div>
        <img class="headerImg" :src="detail.movieImg" />
      </div>
      <div class="btnPosition">
        <div class="SupportBtn" @click="support()">点赞</div>
        <div>{{ detail.movieNumSuppose }}</div>
      </div>
      <div>
        <comment :movie_id="movie_id"></comment>
      </div>
    </div>
    <div>
      <common-footer></common-footer>
    </div>
  </div>
</template>

<script>
import MovieIndexHeader from "../components/MovieIndexHeader";
import CommonFooter from "../components/CommonFooter";
import Comment from "../components/Comment";
import axios from "axios";

let movie_id = 0;
export default {
  name: "MovieDetail",
  data() {
    return {
      detail: []
    };
  },
  components: {
    MovieIndexHeader,
    CommonFooter,
    Comment
  },
  created() {
    this.movie_id = this.$route.query.id;
    movie_id = this.$route.query.id;
    axios
      .post("http://localhost:3000/movie/detail", { id: movie_id })
      .then(data => {
        this.detail = data.body.data;
      });
  },
  methods: {
    // 点赞
    support(event) {
      axios
        .post("http://localhost:3000/movie/support", { id: movie_id })
        .then(data1 => {
          let data_temp = data1.body;
          let that = this;
          console.log(data_temp);
          if (data_temp.status === 0) {
            axios
              .post("http://localhost:3000/movie/showNumber", { id: movie_id })
              .then(data2 => {
                that.detail["movieNumSuppose"] =
                  data2.body.data.movieNumSuppose;
              });
          } else {
            alert(data_temp.message);
          }
        });
    },
    // 电影下载
    movieDownload(event) {
      axios
        .post("http://localhost:3000/movie/download", { movie_id: movie_id })
        .then(data1 => {
          if (data1.status == 1) {
            alert(data1.message);
          } else {
            // 跳转至下载链接
            window.location = data1.reback.data;
          }
        });
    }
  }
};
</script>

<style scoped lang="css">
.headerImg {
  height: 200px;
}
.container {
  width: 100%;
  margin: 0 auto;
}
.contentMain {
  padding-top: 150px;
}

.btnPosition {
  padding-left: 48%;
}
.SupportBtn {
  border: 1px solid #000;
  width: 60px;
}
.viewNum {
  font-size: 10px;
}
</style>
