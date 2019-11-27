<template>
  <div>
    <srm-form
      :inline="true"
      :form-items="queryColumns"
      :merge-form.sync="mergeForm"
      :show-back="false"
      :btn-col="6"
      class="search-content"
      submit-msg="搜索"
      @submit="getList"
      @after-reset="changePage(1)"
    />
    <srm-table
      :source-data="tableData"
      :columns="columns"
      :total="total"
      :page-request="listQuery"
      :loading="listLoading"
      @changePage="changePage"
      @selectionChange="selectionChange"
    >
      <div
        slot="buttons"
        class="srm-table-btn"
      >
        <el-button
          type="success"
          icon="el-icon-plus"
          @click="handleProduct(false)"
        >新增</el-button>
        <!-- <el-button
          type="info"
          icon="el-icon-document"
          @click="goLogs"
        >操作日志</el-button> -->
      </div>
      <el-table-column
        slot="status"
        label="审核状态"
        align="center"
      >
        <template slot-scope="scope">
          <el-tag v-if="+scope.row.status === 0">待审核</el-tag>
          <el-tag
            v-if="+scope.row.status === 1"
            type="success"
          >审核通过</el-tag>
          <el-tag
            v-if="+scope.row.status === 2"
            type="danger"
          >驳回</el-tag>
        </template>
      </el-table-column>
    </srm-table>
  </div>
</template>
<script>
import {
  fetchList
} from '@/api/article'
import { statusMap } from './statusMap'
export default {
  name: 'TableExample1',
  data() {
    return {
      currentItem: null,
      tableData: [],
      columns: [
        { type: 'index', label: '序号' },
        { prop: 'author', label: '作者' },
        { prop: 'title', label: '标题' },
        { prop: 'image_uri', label: '封面', isImg: true },
        { prop: 'pageviews', label: '阅读量' },
        { prop: 'status', label: '当前状态', formatter: (row, column, cellvalue) => {
          return statusMap.find(item => item.value === cellvalue).label
        } },
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
      total: 0,
      listLoading: false,
      mergeForm: {},
      listQuery: {
        page: 1,
        pageSize: 10
      },
      selectedItems: [],
      dialogShippingVisible: false // 设置运费模板弹窗可见
    }
  },
  watch: {
    listQuery: {
      handler: 'getList',
      deep: true
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    selectionChange(list) {
      this.selectedItems = list.selections
    },
    handleProduct(item, readonly = false) {
      if (!item) {
        this.$router.push({ name: 'CreateProduct', params: {
          readonly
        }})
      } else {
        this.$router.push({ name: 'CreateProduct', params: {
          id: item.goodsId,
          readonly
        }})
      }
    },
    handleDialog(item) {
      this.dialogVisible = true
      this.currentItem = item
    },
    // async deleteItem() {
    //   let ids
    //   if (Array.isArray(this.currentItem)) {
    //     ids = this.currentItem.map(item => item.goodsId)
    //   } else {
    //     ids = this.currentItem.goodsId
    //   }
    //   this.handleItem(deleteProduct, ids, this.getList)
    // },
    changePage(page) {
      this.listQuery.page = page
    },
    getList() {
      this.listLoading = true
      const query = this.$formattQuery(this.listQuery, this.mergeForm)
      fetchList(query).then(response => {
        this.tableData = response.data.items
        this.total = response.data.total
        this.listLoading = false
      })
    }
  }
}
</script>
