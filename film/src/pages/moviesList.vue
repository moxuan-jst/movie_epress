<template>
  <div class="container">
    <div>
      <movie-index-header></movie-index-header>
    </div>

    <div class="contentMain">
      <div>
        <div class="contentLeft">
          <ul class="cont-ul">
            <movies-list></movies-list>
          </ul>
        </div>
      </div>
    </div>
    <div>
      <common-footer></common-footer>
    </div>
  </div>
</template>

<script>
import MovieIndexHeader from '../components/MovieIndexHeader'
import CommonFooter from '../components/CommonFooter'
import MoviesList from '../components/MovieList'

export default {
  data() {
    return {

    }
  },
  components: {
    MovieIndexHeader,
    CommonFooter,
    MoviesList
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
