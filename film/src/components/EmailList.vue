<template>
  <div class="message">
    <div>
      {{title}}
    </div>
    <div>
      {{fromUser}}
    </div>
    <div>
      {{context}}
    </div>
  </div>
</template>

<script>
export default {
  props: ['title', 'fromUser', 'context'],
  data() {
    return {
    }
  },
  components: {

  }
}
</script>

<style scoped lang="css">
  .message{
    border: 1px solid;
  }
</style>
