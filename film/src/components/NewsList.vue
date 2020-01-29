<template>
  <li class="goods-list">
    <div class="newsList">
      <router-link 
      to="{path: '/newDetail', query: {id: id}}" 
      class="goods-list-link">
        {{articleTitle}}
        {{articleTimeShow}}
      </router-link>
    </div>
  </li>
</template>

<script>
export default {
  data() {
    return {
      articleTimeShow:''
    }
  },
  props:['id', 'articleTime', 'articleTitle'],
  components: {

  },
  created(){
    this.articleTimeShow = new Date(parseInt(this.articleTime)).toLocaleString().replace(/:\d(1,2)$/, ' ');

  }
}
</script>

<style scoped lang="css">
  .newsList{
    padding: 5px;
    font-size: 10px;
    border-bottom: 1px solid #ababab;
  }
</style>
