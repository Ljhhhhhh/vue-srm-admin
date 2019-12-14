<template>
  <div>
    <el-card>
      <div slot="header">{{ detailForm.title }}</div>
      <el-row>
        <el-col :span="8">作者：{{ detailForm.author }}</el-col>
        <el-col :span="8">审阅人：{{ detailForm.reviewer }}</el-col>
        <el-col :span="8">文章状态：{{ detailForm.status | statusFormat }}</el-col>
        <div class="h15" />
        <el-col :span="8">发布时间：{{ detailForm.display_time }}</el-col>
        <el-col :span="8">浏览量：{{ detailForm.pageviews }}</el-col>
      </el-row>
    </el-card>
    <el-card>
      <div slot="header">文章详情</div>
      <div v-html="detailForm.content" />
    </el-card>
    <div class="h15" />
    <el-button type="primary" @click="back">返回</el-button>
  </div>
</template>
<script>
import detailMixin from '@/mixins/detailMixin'
import { fetchArticle } from 'api/article'
import { statusMap } from 'assets/data-maps'
export default {
  name: 'ArticleDetail',
  filters: {
    statusFormat: function(val) {
      if (typeof val === 'number') {
        return statusMap.find(v => v.value === val).label
      }
      return '未知'
    }
  },
  mixins: [detailMixin],
  data() {
    return {
      titleById: false,
      detailForm: {
        title: '1234'
      }
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
        this.detailForm = data
        this.setTitle(this.detailForm.title)
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
