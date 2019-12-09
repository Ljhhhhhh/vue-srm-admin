<template>
  <div>
    <srm-form
      v-model="searchForm"
      form-name="searchForm"
      :inline="true"
      :form-items="queryColumns"
      :show-back="false"
      submit-msg="搜索"
      @submit="refresh"
      @after-reset="refresh"
    />
    <srm-table
      :source-data="tableData"
      :columns="columns"
      :total="total"
      :page-request="listQuery"
      :loading="listLoading"
      :page-sizes="[10, 25, 50]"
      @handleBatchDelete="setItem($event, 'delete')"
      @changePage="changePage"
      @changeSize="changeSize"
    >
      <el-button slot="buttons" type="success" icon="el-icon-plus" @click="setItem({}, 'create')">新增</el-button>
      <el-table-column slot="operation" label="操作" width="180" align="center">
        <template slot-scope="scope">
          <el-button type="text" @click="setItem(scope.row, 'delete')">删除</el-button>
          <el-button type="text" @click="setItem(scope.row, 'edit')">编辑</el-button>
          <el-button type="text" @click="setItem(scope.row, 'detail')">查看</el-button>
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
import { statusMap } from 'assets/data-maps'
import pageMixin from '@/mixins/pageMixin'
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
        { prop: 'image_uri', label: '封面', isImg: true, width: 120 },
        { prop: 'pageviews', label: '阅读量' },
        { prop: 'status', label: '当前状态', formatter: this.statusFormat },
        { prop: 'display_time', label: '发布时间' },
        // 没有prop的列不会被导出
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
      ]

    }
  },
  methods: {
    statusFormat(row, column, cellvalue) {
      return statusMap.find(item => item.value === cellvalue).label
    },
    setItem(item, type) {
      switch (type) {
        case 'delete':
          this.checkDialogItem = item
          break
        case 'detail':
          this.$router.push({ name: 'ArticleDetail', params: {
            id: item.id
          }})
          break
        case 'edit':
          this.$router.push(`/article/edit/${item.id}`)
          break
        case 'create':
          this.$router.push('/article/create')
          break
        default:
          break
      }
    },
    deleteItem(item) {
      let id
      if (Array.isArray(item)) {
        id = item.map(v => v.id)
      } else {
        id = item.id
      }
      this.mixinHandleItem(deleteArticle, this.getList, id)
    }
  }
}
</script>
