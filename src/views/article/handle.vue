<template>
  <div>
    文章操作
    <el-button @click="back">返回</el-button>
  </div>
</template>
<script>
export default {
  name: 'ArticleHandle',
  data() {
    return {
      id: null
    }
  },
  activated() {
    const id = this.$route.params.id
    if (this.id !== id) {
      this.id = id
      this.getDetail()
    }
  },
  methods: {
    getDetail() {
      console.log('getDetail')
    },
    back() {
      this.$router.back()
    }
  }
}
</script>
