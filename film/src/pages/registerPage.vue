<template>
  <div>
    <div>
      <div>
        <div class="box">
          <label>输入用户名：</label>
          <input type="text" placeholder="用户名">
        </div>
        <div class="box">
          <label>输入密码：</label>
          <input type="password" placeholder="密码">
        </div>
        <div class="box">
          <label>重复输入密码：</label>
          <input type="password" placeholder="密码">
        </div>
        <div class="box">
          <label>输入邮箱：</label>
          <input type="email" placeholder="邮箱">
        </div>
        <div class="box">
          <label>输入手机号：</label>
          <input type="text" placeholder="手机号">
        </div>
         <div class="box">
          <button>注册</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  components: {

  }
}
</script>

<style scoped lang="css">
  .box{
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 10px;
  }
</style>
