<template>
  <div class="dashboard-container">
    <div class="dashboard-text">欢迎您: {{ name }}</div>
    <h1>项目介绍</h1>
    <div>这是一项基于vue-element-admin开发的项目，项目核心为二次封装了表格、表单组件，使后台开发高效、易维护</div>
    <a class="link" target="_blank" href="https://github.com/Ljhhhhhh/vue-erp">项目源码</a>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.link{
  color: #409EFF;
  line-height: 30px;
}
</style>
