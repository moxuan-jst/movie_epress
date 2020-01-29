<template>
  <div>
    <div>
      <div>
        <div class="box">
          <label>输入用户名：</label>
          <input v-model="username" type="text" placeholder="用户名" />
        </div>
        <div class="box">
          <label>输入密码：</label>
          <input v-model="password" type="password" placeholder="密码" />
        </div>
        <div class="box">
          <label>重复输入密码：</label>
          <input v-model="rePassword" type="password" placeholder="密码" />
        </div>
        <div class="box">
          <label>输入邮箱：</label>
          <input v-model="userMail" type="email" placeholder="邮箱" />
        </div>
        <div class="box">
          <label>输入手机号：</label>
          <input v-model="userPhone" type="text" placeholder="手机号" />
        </div>
        <div class="box">
          <button @click="userRegister()">注册</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      username: '',
      password: '',
      userMail: '',
      userPhone: '',
      rePassword: ''
    }
  },
  components: {

  },
  methods: {
    userRegister(event){
      if(this.password != this.rePassword){
        alert('两次密码不一致')
      }else{
        let sendData = {
          username: this.username,
          password: this.password,
          userMail: this.userMail,
          userPhone: this.userPhone
        }
        axios.post('http://localhost:3000/users/register', sendData).then(data => {
          // console.log(data)
          if(data.data.status == 1){
            alert(data.data.meg)
          }else{
            alert(data.data.meg)
            this.$router.go(-1)
          }
        })
      }
    }
  }
}
</script>

<style scoped lang="css">
.box {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 10px;
}
</style>
