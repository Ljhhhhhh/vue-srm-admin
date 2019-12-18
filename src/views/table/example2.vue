<template>
  <div>
    <srm-table
      :source-data="tableData"
      :columns="columns"
      :total="total"
      :page-sizes="[10, 25, 50, 100]"
      :page-request="listQuery"
      :loading="listLoading"
      @changePage="changePage"
      @changeSize="changeSize"
      @handleBatchDelete="setItems"
    />
    <srm-dialog-check
      content="确认删除选中的文章吗？"
      :current-item.sync="checkDialogItem"
      @confirmItem="batchDelete"
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
  name: 'TableExample2',
  mixins: [pageMixin],
  data() {
    return {
      fetchList,
      columns: [
        { type: 'index', label: '序号' },
        { prop: 'author', label: '作者' },
        { prop: 'title', label: '标题', 'show-overflow-tooltip': true, width: 300 },
        { prop: 'pageviews', label: '阅读量' },
        // 使用render渲染时，如需导出功能，必须配合formatter格式化对应值
        { prop: 'status', label: '当前状态', formatter: this.statusFormat, render: (h, { row, column, index }) => {
          const statusTag = [null, 'primary', 'success', 'danger'][row.status]
          const statusName = statusMap.find(item => item.value === row.status).label
          return h('el-tag', {
            props: {
              type: statusTag
            }
          }, statusName)
        } },
        { prop: 'display_time', label: '发布时间', render: (h, { row, column, index }) => {
          return h('span', row.display_time)
        }
        }
      ]
    }
  },
  methods: {
    statusFormat(row, column, cellvalue) {
      return statusMap.find(item => item.value === cellvalue).label
    },
    setItems(items) {
      this.checkDialogItem = items
    },
    batchDelete(items) {
      const ids = items.map(v => v.id)
      this.mixinHandleItem(deleteArticle, this.getList, ids)
    }
  }
}
</script>
