<template>
  <div>
    <srm-form
      form-name="searchForm"
      :inline="true"
      :form-items="queryColumns"
      :merge-form.sync="searchForm"
      :show-back="false"
      submit-msg="搜索"
      @submit="refresh"
      @after-reset="refresh"
    />
    <srm-table
      :source-data="tableData"
      :delete-visible="false"
      :columns="columns"
      :total="total"
      :page-request="listQuery"
      :loading="listLoading"
      :show-export="false"
      @changePage="changePage"
    />
  </div>
</template>
<script>
import {
  fetchList
} from '@/api/article'
import { statusMap } from 'assets/data-maps'
import pageMixin from '@/mixins/pageMixin'
export default {
  name: 'TableExample1',
  mixins: [pageMixin],
  data() {
    return {
      fetchList,
      deleteVisible: false,
      columns: [
        { type: 'index', label: '序号' },
        { prop: 'author', label: '作者' },
        { prop: 'title', label: '标题', 'show-overflow-tooltip': true, width: 300 },
        { prop: 'image_uri', label: '封面', isImg: true },
        { prop: 'pageviews', label: '阅读量' },
        { prop: 'status', label: '当前状态', formatter: this.statusFormat },
        { prop: 'display_time', label: '发布时间' }
      ],
      queryColumns: [
        {
          tag: 'input',
          itemAttrs: {
            label: '文章标题'
          },
          attrs: {
            key: 'title',
            placeholder: '请输入文章标题'
          }
        },
        {
          tag: 'input',
          itemAttrs: {
            label: '作者'
          },
          attrs: {
            key: 'author',
            placeholder: '请输入作者'
          }
        },
        {
          tag: 'select',
          itemAttrs: {
            label: '文章状态'
          },
          attrs: {
            key: 'status',
            options: statusMap
          }
        }
      ],
      searchForm: {}
    }
  },
  methods: {
    statusFormat(row, column, cellvalue) {
      return statusMap.find(item => item.value === cellvalue).label
    }
  }
}
</script>
