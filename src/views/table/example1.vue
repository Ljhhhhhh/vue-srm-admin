<template>
  <div>
    <srm-table
      :source-data="tableData"
      :delete-visible="false"
      :select-visible="false"
      :columns="columns"
      :total="total"
      :page-request="listQuery"
      :loading="listLoading"
      :export-visible="false"
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
      columns: [
        { type: 'index', label: '序号' },
        { prop: 'author', label: '作者' },
        { prop: 'title', label: '标题', 'show-overflow-tooltip': true, width: 300 },
        { prop: 'image_uri', label: '封面', isImg: true },
        { prop: 'pageviews', label: '阅读量' },
        { prop: 'status', label: '当前状态', formatter: this.statusFormat },
        { prop: 'display_time', label: '发布时间' }
      ]
    }
  },
  methods: {
    statusFormat(row, column, cellvalue) {
      return statusMap.find(item => item.value === cellvalue).label
    }
  }
}
</script>
