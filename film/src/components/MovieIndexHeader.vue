<template lang="html">
<Row>
    <Menu mode="horizontal" theme="dark" active-name="1">
        <router-link to="/">
          <MenuItem name="1"  id="menuitem">
            <Icon type="md-home" />
            主页
          </MenuItem>
        </router-link>
        <router-link to="/movieList">
          <MenuItem name="2" id="menuitem">
            <Icon type="ios-people"/>
            电影
          </MenuItem>   
        </router-link>
        <i-col offset="21">
          <MenuItem name="3">
            <user-message></user-message>
          </MenuItem>
        </i-col>
    </Menu>
</Row>
</template>
 
<script>
import UserMessage from "../components/UserMessage";
export default {
  components: {
    UserMessage
  }
};
</script>
<style scoped>
  #menuitem{
    font-size: 16px;
  }
</style>