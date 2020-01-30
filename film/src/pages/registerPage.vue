<template>
  <div>
    <div class="box">
      <div style="width: 30%; padding-top: 10%">
        <h2>REGISTER</h2>
        <div>
          <i-input v-model="username" type="text" placeholder="请输入用户名" size="large">
            <Icon type="ios-person-outline" slot="prepend" />
          </i-input>
        </div>
        <div class="box">
          <i-input v-model="password" type="password" placeholder="请输入密码" size="large">
            <Icon type="ios-lock-outline" slot="prepend" />
          </i-input>
        </div>
        <div class="box">
          <i-input v-model="rePassword" type="password" placeholder="请再次输入密码" size="large">
            <Icon type="ios-lock-outline" slot="prepend" />
          </i-input>
        </div>
        <div class="box">
          <i-input v-model="userMail" type="email" placeholder="请输入邮箱" size="large">
            <Icon type="ios-mail-outline" slot="prepend" />
          </i-input>
        </div>
        <div class="box">
          <i-input v-model="userPhone" type="text" placeholder="请输入手机号" size="large">
            <Icon type="ios-call-outline" slot="prepend" />
          </i-input>
        </div>
      </div>
    </div>
    <div class="box">
      <div class="box-in">
        <i-button shape="circle" size="large" type="info" @click="userRegister()">注册</i-button>
        <i-button shape="circle" size="large" type="info" @click="back()">
          <Icon type="ios-arrow-dropleft" size="20" />
        </i-button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      username: "",
      password: "",
      userMail: "",
      userPhone: "",
      rePassword: ""
    };
  },
  components: {},
  methods: {
    userRegister(event) {
      if (this.password != this.rePassword) {
        alert("两次密码不一致");
      } else {
        let sendData = {
          username: this.username,
          password: this.password,
          userMail: this.userMail,
          userPhone: this.userPhone
        };
        axios
          .post("http://localhost:3000/users/register", sendData)
          .then(data => {
            // console.log(data)
            if (data.data.status == 1) {
              alert(data.data.meg);
            } else {
              alert(data.data.meg);
              this.$router.go(-1);
            }
          });
      }
    },
    back(event) {
      this.$router.push({ path: "/LoginPage" });
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
h2 {
  text-align: center;
  margin-bottom: 20px;
}
.box-in {
  margin-top: 20px;
}
</style>
