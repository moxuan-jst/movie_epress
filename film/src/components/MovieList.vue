<template>
  <div class="movieList">
    <div>
      <router-link
        to="{path: '/movieDetail, query:{id: id}}"
        class="goods-list-link"
      >{{ movieName }} {{ movieTimeShow}}</router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      movieTimeShow: ''
    };
  },
  // 子组件获取父组件数据
  props: ['id', 'movieName', 'movieTime'],
  created(){
    this.movieTimeShow = new Date(parseInt(this.movieTime)).toLocaleString().replace(/:\d(1,2)$/, ' ');
  },
  components: {}
};
</script>

<style scoped lang="css">
.movieList {
  padding: 5px;
  border-bottom: 1px solid #ababab;
}
</style>
