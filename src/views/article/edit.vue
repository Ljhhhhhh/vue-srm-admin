<template>
  <div>
    文章操作
    <el-button @click="back">返回</el-button>
  </div>
</template>
<script>
export default {
  name: 'ArticleEdit',
  data() {
    return {
      id: null,
      tempRoute: {}
    }
  },
  created() {
    const id = this.$route.params.id
    this.tempRoute = Object.assign({}, this.$route)
    if (this.id !== id) {
      this.id = id
      this.getDetail()
    }
  },
  methods: {
    getDetail() {
      console.log('getDetail')
      this.setTagsViewTitle()
      this.setPageTitle()
    },
    back() {
      this.$router.back()
    },
    setTagsViewTitle() {
      const title = 'Edit Article'
      const route = Object.assign({}, this.tempRoute, { title: `${title}-${this.id}` })
      console.log(route, 'route')
      this.$store.dispatch('tagsView/updateVisitedView', route)
    },
    setPageTitle() {
      const title = 'Edit Article'
      document.title = `${title} - ${this.id}`
    }
  }
}
</script>
