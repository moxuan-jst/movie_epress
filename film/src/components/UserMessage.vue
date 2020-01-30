<template>
  <div class="header" v-if=!isLogin>
    <Row>
      <i-col span="2" offset="22">
        <router-link to="/LoginPage">
          <div class="header_menu"><Icon type="ios-person"></Icon>登录</div>
        </router-link>
      </i-col>
    </Row>
  </div>
  <div v-else class="header">
    <Row>
      <i-col span="2" offset="22">
        <router-link :to="{path: '/userInfo', query: {id: id}}">
          <div class="header_menu"><Icon type="ios-person"></Icon>已登录：{{username}}</div>
        </router-link>
      </i-col>
    </Row>
  </div>
</template>

<script>
export default {
  data(){
    return {
      isLogin: false,
      username: ''
    }
  },
  created(){
    let token = localStorage.getItem('token')
    if(token){
      this.isLogin = true
      this.username = localStorage.getItem('username')
      this.id = localStorage.getItem('_id')
    }else{
      console.log('用户登录失败');
      // 可以岑家跳转信息或者返回错误信息
    }
  }
}
</script>

<style scoped lang="css">
  .header{
    width: 103%;
    height: 30px;
    left: 0;
    top: 0;
    color: #000;
    background-color: #c3bbbb;
  }
  .header_menu{
    /* padding-right: 60px; */
    padding-top: 6px;
    /* float: right; */
    color: #fff;
    font-size: 12px;
  }
</style>
