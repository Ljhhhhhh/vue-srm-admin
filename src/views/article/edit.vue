<template>
  <div>
    <srm-form
      v-model="detailForm"
      form-name="detailForm"
      :form-items="formItems"
      :inline="false"
      @submit="submit"
    >
      <!-- :reset-msg="false" -->
      <!-- :merge-form.sync="detailForm" -->
      <template v-slot:content prop="content">
        <Tinymce ref="editor" v-model="detailForm.content" :height="400" />
      </template>
    </srm-form>
  </div>
</template>
<script>
import { fetchArticle, updateArticle } from 'api/article'
import { statusMap } from './statusMap'
import Tinymce from '@/components/Tinymce'
// import { proxyProp } from '../../../../../work/srm-admin/src/utils/proxyProp'
import { proxyProp } from 'utils/proxyProp'
export default {
  name: 'ArticleEdit',
  components: {
    Tinymce
  },
  data() {
    return {
      id: null,
      tempRoute: {},
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
            label: '审阅',
            col: 6
          },
          attrs: {
            key: 'reviewer',
            placeholder: '请输入审阅'
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
          // attrs: {
          //   key: 'slotCheckBox'
          // },
          itemAttrs: {
            label: '文章详情'
          }
        }
      ]
    }
  },
  mounted() {
    this.tempRoute = Object.assign({}, this.$route)
    this.detailForm = proxyProp(this.detailForm)
    this.getDetail()
  },
  methods: {
    async getDetail() {
      this.id = this.$route.params.id
      console.log('getDetail')
      const title = `编辑文章-${this.id}`
      this.setTagsViewTitle(title)
      const { code, data } = await fetchArticle(this.id)
      if (code === 20000) {
        // this.detailForm = {}
        Object.assign(this.detailForm, { ...data })
        // this.detailForm = proxyProp(this.detailForm)
      } else {
        this.$message.error('获取详情失败')
      }
    },
    setTagsViewTitle(title) {
      const route = Object.assign({}, this.tempRoute, { title })
      document.title = title
      this.$store.dispatch('tagsView/updateVisitedView', route)
    },
    async submit() {
      const data = Object.assign({}, this.detailForm, { id: this.id })
      const { code, data: result } = await updateArticle(data)
      console.log('submit', code, result)
    }
  }
}
</script>
