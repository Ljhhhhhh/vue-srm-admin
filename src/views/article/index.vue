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
      @changePage="changePage"
    >
      <el-table-column slot="operation" label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="setItem(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </srm-table>
    <srm-dialog-check
      content="确认删除该文章吗？"
      :current-item.sync="checkDialogItem"
      @confirmItem="deleteItem"
    />
  </div>
</template>
<script>
import {
  fetchList,
  deleteArticle
} from '@/api/article'
import { statusMap } from './statusMap'
import pageMixin from 'utils/pageMixin'
export default {
  name: 'ArticleList',
  mixins: [pageMixin],
  data() {
    return {
      fetchList,
      deleteVisible: false,
      columns: [
        { type: 'index', label: '序号', width: 50 },
        { prop: 'author', label: '作者', width: 100 },
        { prop: 'title', label: '标题', 'show-overflow-tooltip': true, width: 300 },
        { prop: 'image_uri', label: '封面', isImg: true },
        { prop: 'pageviews', label: '阅读量' },
        { prop: 'status', label: '当前状态', formatter: this.statusFormat },
        { prop: 'display_time', label: '发布时间' },
        { slot: 'operation', label: '操作' }
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
    },
    setItem(item) {
      this.checkDialogItem = item
    },
    deleteItem(item) {
      this.mixinHandleItem(deleteArticle, this.getList, item.id)
    }
  }
}
</script>
