<template>
  <div>
    <el-card>
      <div slot="header">{{ detailForm.title }}</div>
      <el-row>
        <el-col :span="6">作者：{{ detailForm.author }}</el-col>
        <el-col :span="6">审阅人：{{ detailForm.reviewer }}</el-col>
      </el-row>
    </el-card>
    <el-card>
      <div slot="header">文章详情</div>
      <div v-html="detailForm.content" />
    </el-card>
    <el-button @click="back">返回</el-button>
  </div>
</template>
<script>
import detailMixin from '@/mixins/detailMixin'
import { fetchArticle } from 'api/article'
export default {
  name: 'ArticleDetail',
  mixins: [detailMixin],
  data() {
    return {
      detailForm: {}
    }
  },
  mounted() {
    this.id = this.$route.params && this.$route.params.id || null
    if (this.id) {
      this.getDetail()
    }
  },
  methods: {
    async getDetail() {
      const { code, data } = await fetchArticle(this.id)
      if (code === 20000) {
        Object.assign(this.detailForm, data)
      } else {
        this.$router.back()
      }
    },
    back() {
      this.$router.back()
    }
  }
}
</script>
