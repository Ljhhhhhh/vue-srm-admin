<template>
  <div>
    <div class="handle-content">
      <el-form :inline="true" :model="filterQuery" class="demo-form-inline" size="mini">
        <el-form-item label="审批人">
          <el-input v-model="filterQuery.user" placeholder="审批人" clearable />
        </el-form-item>
        <el-form-item label="活动区域">
          <el-select v-model="filterQuery.region" placeholder="活动区域">
            <el-option label="区域一" value="shanghai" />
            <el-option label="区域二" value="beijing" />
          </el-select>
        </el-form-item>
        <el-date-picker
          v-model="filterQuery.time"
          size="small"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        />
        <SrmValueRegio v-model="filterQuery.valueArr" label="金额限制" unit="元" />
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <srm-table
      :source-data="tableData"
      :columns="columns"
      :total="total"
      :select-disabled="selectDisabled"
      :page-request="listQuery"
      :loading="listLoading"
      @changePage="changePage"
    >
      <el-table-column slot="operate" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="edit(scope.row)">编辑</el-button>
          <el-button type="text" size="small" @click="deleteUser(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </srm-table>
  </div></template>
<script>
import {
  fetchList
  // fetchPv,
  // createArticle,
  // updateArticle
} from '@/api/article'
import SrmValueRegio from '@/components/SrmForm/SrmValueRegio'
import SrmTable from '@/components/SrmTable'
export default {
  name: 'TableExample1',
  components: {
    SrmTable,
    SrmValueRegio
  },
  data() {
    return {
      tableData: [],
      columns: [
        { prop: 'id', label: 'ID', minWidth: 50 },
        { prop: 'author', label: '作者', minWidth: 100, width: 500 },
        { prop: 'title', label: '标题', minWidth: 100 },
        { prop: 'timestamp', label: '创建时间', minWidth: 100, sortable: true, formatter: (row, column, cellValue) => (
          this.dayjs(cellValue).format('YYYY年MM月DD日')
        )
        },
        { prop: 'image_uri', label: '图片预览', minWidth: 100, isImg: true, previewWidth: '520px' },
        { prop: 'status', label: '状态', minWidth: 70, render: (h, { row, index }) => {
          const { status } = row
          const statusMap = {
            published: { text: '发布', type: 'success' },
            draft: { text: '下架', type: 'warning' },
            deleted: { text: '删除', type: 'danger' }
          }
          const statusText = statusMap[status].text
          return h('el-button', {
            props: {
              size: 'mini',
              type: statusMap[status].type
            },
            on: {
              click: () => {
                this.setStatus(row)
              }
            }
          }, statusText)
        } },
        { slot: 'operate' }
      ],
      total: 0,
      listLoading: false,
      filterQuery: {
        user: '',
        region: '',
        time: [],
        valueArr: []
      },
      selectDisabled: false,
      listQuery: {
        pageNum: 1,
        pageSize: 20
      }
    }
  },
  watch: {
    listQuery: {
      handler: 'getList',
      deep: true
    }
  },
  created() {
    this.getList()
  },
  methods: {
    onSubmit() {
      console.log(this.filterQuery)
    },
    setStatus(row) {
      console.log(row, 'row')
    },
    changePage(page) {
      this.listQuery.pageNum = page
    },
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        // Just to simulate the time of the request
        setTimeout(() => {
          this.tableData = response.data.items
          this.total = response.data.total
          this.listLoading = false
        }, 1 * 1000)
      })
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
