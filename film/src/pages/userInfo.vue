<template>
  <div class="container">
    <div>
      <movie-index-header></movie-index-header>
    </div>
    <div class="userMessage">
      <user-message></user-message>
    </div>

    <!-- 用户相关信息 -->
    <div>
      <div class="box">用户名：用户名</div>
    </div>
    <div>
      <div class="box">邮箱：邮箱</div>
    </div>
    <div>
      <div class="box">电话：电话</div>
    </div>
    <div>
      <div class="box">用户状态：用户状态</div>
    </div>
    <div>
      <button>修改密码</button>
    </div>
    <!-- 用户密码修改，需要时显示 -->
    <div>
      <div class="box">
        <label>输入旧密码：</label>
        <input type="text" placeholder="输入旧密码">
      </div>
      <div class="box">
        <label>输入新密码：</label>
        <input type="text" placeholder="输入新密码">
      </div>
      <div class="box">
        <button>修改密码</button>
      </div>
    </div>
    <div style="padding-top: 10px">
      <!-- 需要跳转至新页面 -->
      <router-link to="/sendEmail">
        <button>发送站内信</button>
      </router-link>
    </div>
    <common-footer></common-footer>
  </div>
</template>

<script>
import MovieIndexHeader from '../components/MovieIndexHeader';
import CommonFooter from '../components/CommonFooter';
import UserMessage from '../components/UserMessage';

export default {
  name: 'HelloWorld',
  data() {
    return {

    }
  },
  components: {
    MovieIndexHeader,
    CommonFooter,
    UserMessage
  }
}
</script>

<style scoped lang="css">
  .box{
    display: inline-flex;
  }
  .container{
    width: 100%;
    margin: 0 auto;
  }
  .userMessage{
    padding-top: 60px;
    margin-top: -10px;
    margin-left: -10px;
  }
</style>
