<template>
  <div>
    <div>
      <div>
        <div class="box">
          <label>输入用户名：</label>
          <input v-model="username" type="text" placeholder="用户名" />
        </div>
        <div class="box">
          <label>密码：</label>
          <input v-model="password" type="password" placeholder="密码" />
        </div>
        <div class="box">,
          <button @click="userLogin()">登录</button>
          <button style="margin-left:10px" @click="userRegister()">注册</button>
          <button style="margin-left:10px" @click="findPassword()">忘记密码</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data(){
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    userLogin(event) {
      axios
        .post("http://localhost:3000/users/login", {
          username: this.username,
          password: this.password
        })
        .then(data1 => {
          // console.log(data1)
          if(data1.data.status == 1){
            alert(data1.data.meg)
          }else{
            let save_token = {
              token: data1.data.data.token,
              username: this.username
            }
            // console.log(data1.data.data)
            localStorage.setItem('token', data1.data.data.token);
            localStorage.setItem('username', data1.data.data.user[0].username);
            localStorage.setItem('_id', data1.data.data.user[0]._id);
            this.$router.go(-1)
          }
        });
    },
    // 注册
    userRegister(event){
      this.$router.push({path: 'register'})
    },
    // 找回密码
    findPassword(event){
      this.$router.push({path: 'findPassword'})
    }

  }
};
</script>

<style scoped lang="css">
.box {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 10px;
}
</style>
