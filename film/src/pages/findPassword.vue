<template>
  <div>
    <div>
      <div v-show="showUserInfo">
        <div class="box">
          <label>输入用户名：</label>
          <input v-model="username" type="text" placeholder="用户名">
        </div>
        <div class="box">
          <label>输入邮箱：</label>
          <input v-model="userMail" type="email" placeholder="邮箱">
        </div>
        <div class="box">
          <label>输入手机号：</label>
          <input v-model="userPhone" type="text" placeholder="手机号">
        </div>
         <div class="box">
          <button @click="checkUser()">找回密码</button>
        </div>
      </div>
      <div>
        <div v-show="showRePassword">
          <div class="box">
            <label>输入新密码：</label>
          <input v-model="repassowrd" type="password" placeholder="输入新密码">
          </div>
          <div class="box">
            <button @click="changeUserPassword()">修改密码</button>
          </div>
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
      userMail: '',
      userPhone: '',
      repassowrd: '',
      showRePassword: false,
      showUserInfo: true
    }
  },
  components: {

  },
  methods: {
    checkUser(event){
      axios.post('http://localhost:3000/users/findPassword', {
        username: this.username,
        userMail: this.userMail,
        userPhone: this.userPhone
      }).then(data1 => {
        // console.log(data1)
        if(data1.data.status == 1){
          alert(data1.data.meg)
        }else{
          alert(data1.data.meg)
          this.showRePassword = true;
          this.showUserInfo = false;
          // console.log(this.showRePassword)
        }
      })
    },

// 修改密码是无论是否正确，都提示验证成功 
    changeUserPassword(){
      axios.post('http://localhost:3000/users/findPassword', {
        username: this.username,
        userMail: this.userMail,
        userPhone: this.userPhone,
        repassowrd: this.repassowrd,
      }).then(data1 => {
        console.log(data1)
        if(data1.data.status == 1){
          alert(data1.data.meg)
        }else{
          alert(data1.data.meg)
          this.$router.go(-1)
        }
      })
    }
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
