<template>
  <div class="newsList">
    <div>
      <router-link 
      to="{path: '/newDetail', query: {id: id}}" 
      class="goods-list-link">
        {{articleTitle}}
        {{articleTimeShow}}
      </router-link>
    </div>
  </div>
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
    border-bottom: 1px solid #ababab;
  }
</style>
