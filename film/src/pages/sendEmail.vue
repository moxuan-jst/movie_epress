<template>
  <div class="container">
    <div>
      <movie-index-header></movie-index-header>
    </div>
    <div class="userMessage">
      <user-message></user-message>
    </div>
    <!-- 用户相关 -->
    <label>收件箱</label>
    <div>
      <email-list 
        v-for="(item, index) in receive_items"
        :key="index" 
        :title="item.title" 
        :fromUser="item.fromUser"
        :context="item.context"  
      ></email-list>
    </div>
    <label>发件箱</label>
    <div>
      <email-list 
        v-for="(item, index) in send_items"
        :key="index"
        :title="item.title"
        :fromUser="item.fromUser"
        :context="item.context"  
      ></email-list>
    </div>
    <send-talk-box></send-talk-box>
      <common-footer></common-footer>
  </div>
</template>

<script>
import MovieIndexHeader from "../components/MovieIndexHeader";
import CommonFooter from "../components/CommonFooter";
import UserMessage from "../components/UserMessage";
import EmailList from "../components/EmailList";
import SendTalkBox from "../components/SendTalk-Box";
import axios from 'axios'

export default {
  data() {
    return {
      receive_items: [],
      send_items: [],
      detail: []
    };
  },
  components: {
    MovieIndexHeader,
    CommonFooter,
    UserMessage,
    EmailList,
    SendTalkBox
  },
  created(){
    let userId = localStorage._id
    let send_data = {
      token: localStorage.token,
      user_id: localStorage._id,
      receive: 0
    }
    let receive_data = {
      token: localStorage.token,
      user_id: localStorage._id,
      receive: 1
    }
    if(userId){
      axios.post('http://localhost:3000/users/showEmail', send_data).then(data1 => {  
        // console.log(data1)
        if(data1.data.status == 1){
          alert(data1.data.meg)
        }else{
          this.send_items = data1.data.data
        }
      })
      axios.post('http://localhost:3000/users/showEmail', receive_data).then(data1 => {
        console.log(data1)
        if(data1.data.status == 1){
          alert(data1.data.meg)
        }else{
          this.receive_items = data1.data.data
        }
      })
    }else{
      alert("用户信息错误")
    }
  }
};
</script>

<style scoped lang="css">
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
</style>
