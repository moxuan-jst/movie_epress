<template>
  <div>
    <div>
      <input v-model="toUserName" type="text" placeholder="发送用户名">
    </div>
    <div style="padding: 10px">
      <input v-model="title" type="text" placeholder="发送标题">
    </div>
    <div style="padding: 10px">
      <textarea v-model="context" style="width: 80%; height: 50px;" placeholder="内容"></textarea>
    </div>
    <div style="padding: 10px">
      <button @click="sendMail()">发送站内信</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  props: [],
  data() {
    return {
      toUserName: '',
      context: '',
      title: ''
    }
  },
  components: {

  },
  methods:{
    sendMail(event){
      let send_data = {
        token: localStorage.token,
        user_id: localStorage._id,
        toUsername: this.toUserName,
        title: this.title,
        context: this.context
      }
      axios.post('http://localhost:3000/users/sendEmail', send_data).then( data1 => {
        if(data1.data.status == 1){
          alert(data1.data.meg)
        }else{
          alert("发送成功")
          // 发送成功后自动刷新页面
          window.location.reload(true);
        }
      })
    }
  }
}
</script>

<style scoped lang="css">

</style>
