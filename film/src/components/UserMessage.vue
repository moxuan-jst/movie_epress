<template>
  <Menu mode="horizontal" theme="dark" v-if=!isLogin>
    <router-link to="/LoginPage">
      <MenuItem name="1" id="menuitem"><Icon type="ios-person"></Icon>登录</MenuItem>
    </router-link>
  </Menu>
  <Menu v-else mode="horizontal" theme="dark">
    <router-link :to="{path: '/userInfo', query: {id: id}}">
      <MenuItem name="2" id="menuitem"><Icon type="ios-person"></Icon>已登录：{{username}}</MenuItem>
    </router-link>
  </Menu>
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
<style lang="css" scoped>
  #menuitem {
    font-size: 16px;
  }
</style>
