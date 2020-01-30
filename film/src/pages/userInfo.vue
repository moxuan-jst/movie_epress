<template>
  <div class="container">
    <div>
      <movie-index-header></movie-index-header>
    </div>

    <!-- 用户相关信息 -->
    <Row>
      <Col offset="5">
        <Card id="card">
          <p slot="title">
            <Icon type="ios-person"></Icon>User Info
          </p>
          <List border size="large">
            <ListItem>用户名：{{detail.username}}</ListItem>
            <ListItem>邮箱：{{detail.userMail}}</ListItem>
            <ListItem>电话：{{detail.userPhone}}</ListItem>
            <ListItem>用户状态：{{userStatus}}</ListItem>
          </List>
          <Button type="warning" @click="showChangeUserPassword()">修改密码</Button>
          <router-link to="/sendEmail">
            <Button type="success">发送站内信</Button>
          </router-link>
        </Card>
      </Col>
    </Row>

    <!-- 用户密码修改，需要时显示 -->
    <Row>
      <i-col offset="5">
        <Card v-show="showRePassword" id="card">
          <List>
            <ListItem>
              <Input v-model="password" type="text" placeholder="输入旧密码">
                <Icon type="ios-lock-outline" slot="prepend" />
              </Input>
            </ListItem>
            <ListItem>
              <Input v-model="repassword" type="text" placeholder="输入新密码">
                <Icon type="ios-lock-outline" slot="prepend" />
              </Input>
            </ListItem>
            <Button type="warning" @click="changeUserPassword()">修改密码</Button>
          </List>
        </Card>
      </i-col>
    </Row>

    <common-footer></common-footer>
  </div>
</template>

<script>
import MovieIndexHeader from "../components/MovieIndexHeader";
import CommonFooter from "../components/CommonFooter";
import UserMessage from "../components/UserMessage";
import axios from "axios";

export default {
  name: "HelloWorld",
  data() {
    return {
      username: "",
      detail: [],
      userStatus: "",
      showRePassword: false,
      password: "",
      repassword: ""
    };
  },
  components: {
    MovieIndexHeader,
    CommonFooter,
    UserMessage
  },
  created() {
    let userId = this.$route.query.id;
    if (userId) {
      axios
        .post("http://localhost:3000/showUser", { user_id: userId })
        .then(data1 => {
          // console.log(data1)
          if (data1.data.status == 1) {
            alert(data1.data.meg);
          } else {
            this.detail = data1.data.data;
            if (data1.data.data.userStop) {
              this.userStatus = "用户已经被封停";
            } else {
              this.userStatus = "用户状态正常";
            }
          }
        });
    } else {
      alert("用户信息错误");
    }
  },
  methods: {
    showChangeUserPassword(event) {
      this.showRePassword = true;
    },

    // 修改密码是无论是否正确，都提示验证成功
    changeUserPassword(event) {
      let token = localStorage.token;
      let user_id = localStorage._id;
      let username = this.detail.username;
      let userMail = this.detail.userMail;
      let userPhone = this.detail.userPhone;
      axios
        .post("http://localhost:3000/users/findPassword", {
          username,
          userMail,
          userPhone,
          token,
          user_id,
          repassword: this.repassword,
          password: this.password
        })
        .then(data1 => {
          console.log(data1);
          if (data1.data.status == 1) {
            alert(data1.data.meg);
          } else {
            alert(data1.data.meg);
            // this.$router.go(-1)
          }
        });
    }
  }
};
</script>

<style scoped lang="css">
Button{
  margin-top: 10px;
}
.box {
  display: inline-flex;
}
.container {
  width: 100%;
  margin: 0 auto;
}
.userMessage {
  padding-top: 60px;
  margin-top: -10px;
  margin-left: -10px;
}
#card{
  width: 80%; 
  height: 10%;
  margin-top: 10px;
}
</style>
