<template>
  <div>
    <srm-form
      form-name="detail"
      :form-items="formItems"
      :merge-form.sync="detail"
      :reset-msg="false"
      :inline="false"
      @submit="submit"
    >
      <template v-slot:content prop="content">
        <Tinymce ref="editor" v-model="detail.content" :height="400" />
      </template>
      <!-- <el-form-item prop="content" style="margin-bottom: 30px;">
        <Tinymce ref="editor" v-model="postForm.content" :height="400" />
      </!--> -->
    </srm-form>
  </div>
</template>
<script>
import { fetchArticle } from 'api/article'
import { statusMap } from './statusMap'
import Tinymce from '@/components/Tinymce'
export default {
  name: 'ArticleEdit',
  components: {
    Tinymce
  },
  data() {
    return {
      id: null,
      tempRoute: {},
      detail: {},
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
  created() {
    this.tempRoute = Object.assign({}, this.$route)
    this.getDetail()
    // const id = this.$route.params.id
    // if (this.id !== id) {
    //   this.id = id
    //   this.getDetail()
    // }
  },
  methods: {
    async getDetail() {
      this.id = this.$route.params.id
      console.log('getDetail')
      const title = `编辑文章-${this.id}`
      this.setTagsViewTitle(title)
      const { code, data } = await fetchArticle(this.id)
      if (code === 20000) {
        this.detail = data
      } else {
        this.$message.error('获取详情失败')
      }
    },
    setTagsViewTitle(title) {
      const route = Object.assign({}, this.tempRoute, { title })
      document.title = title
      this.$store.dispatch('tagsView/updateVisitedView', route)
    },
    submit() {
      console.log('submit')
    }
  }
}
</script>
