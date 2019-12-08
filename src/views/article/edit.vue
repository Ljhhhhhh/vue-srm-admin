<template>
  <div>
    <srm-form
      v-model="detailForm"
      form-name="detailForm"
      :reset-msg="false"
      :form-items="formItems"
      :inline="false"
      @submit="submit"
    >
      <template v-slot:content prop="content">
        <Tinymce ref="editor" v-model="detailForm.content" :height="400" />
      </template>
    </srm-form>
  </div>
</template>
<script>
import { fetchArticle, updateArticle, createArticle } from 'api/article'
import { statusMap } from 'assets/data-maps'
import Tinymce from '@/components/Tinymce'
import detailMixin from '@/mixins/detailMixin'
export default {
  name: 'ArticleEdit',
  components: {
    Tinymce
  },
  mixins: [detailMixin],
  data() {
    return {
      detailForm: {},
      formItems: [
        {
          tag: 'input',
          itemAttrs: {
            label: '标题',
            col: 24
          },
          attrs: {
            key: 'title',
            placeholder: '请输入标题'
          }
        },
        {
          tag: 'input',
          itemAttrs: {
            label: '作者',
            col: 6
          },
          attrs: {
            key: 'author',
            placeholder: '请输入作者'
          }
        },
        {
          tag: 'input',
          itemAttrs: {
            label: '审阅人',
            col: 6
          },
          attrs: {
            key: 'reviewer',
            placeholder: '请输入审阅人'
          }
        },
        {
          tag: 'select',
          itemAttrs: {
            label: '文章状态',
            col: 6
          },
          attrs: {
            key: 'status',
            options: statusMap.filter(v => v.label !== '全部')
          }
        },
        {
          tag: 'upload',
          itemAttrs: {
            label: '文章封面',
            col: 24
          },
          attrs: {
            key: 'image_uri'
          }
        },
        {
          slot: 'content',
          itemAttrs: {
            label: '文章详情'
          }
        }
      ]
    }
  },
  computed: {
    submitFn() {
      return this.id ? updateArticle : createArticle
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
    async submit() {
      let msg = '文章更新成功'
      const data = Object.assign({}, this.detailForm)
      if (this.id) {
        data.id = this.id
        msg = '创建文章成功'
      }
      const { code } = await this.submitFn(data)
      if (code === 20000) {
        this.$message.success(msg)
        this.goListWithRefresh('/article/list')
      }
    }
  }
}
</script>
