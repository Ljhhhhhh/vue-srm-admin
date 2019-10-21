<template>
  <div>
    <!-- <div class="handle-content">
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
        <SrmValueRegio :value-arr.sync="filterQuery.valueArr" label="金额限制" unit="元" />
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div> -->
    <srm-table
      :source-data="tableData"
      :columns="columns"
      :total="total"
      :select-disabled="selectDisabled"
      :page-request="listQuery"
      :loading="listLoading"
      @changePage="changePage"
    >
      <el-table-column
        slot="isOpen"
        label="是否可用"
        align="center"
      >
        <template slot-scope="scope">
          <i
            v-if="scope.row.isOpen === 1"
            class="el-icon-check"
          />
          <i
            v-else
            class="el-icon-close"
            style="color:#F56C6C;font-size: 16px"
          />
        </template>
      </el-table-column>
      <el-table-column
        slot="operate"
        label="操作"
        align="center"
      >
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click="disabledUser(scope.row)"
          >
            {{ scope.row.isOpen === 1 ? '禁用' : '启用' }}
          </el-button>
          <el-button
            type="text"
            size="small"
            @click="editUser(scope.row)"
          >编辑</el-button>
          <el-button
            type="text"
            size="small"
            @click="resetPassword(scope.row)"
          >重置密码</el-button>
        </template>
      </el-table-column>
    </srm-table>
    <srm-dialog-check :visible="dialogVisible" @handleDialog="handleDialog" />
    <!-- <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="350px"
      :show-close="false"
    >
      <div class="dialog-content">
        <i class="el-icon-warning" />
        <span>是否确定继续此操作</span>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleDialog(false)">取 消</el-button>
        <el-button type="primary" @click="handleDialog(true)">确 定</el-button>
      </span>
    </el-dialog> -->
  </div>
</template>
<script>
import {
  fetchList
  // fetchPv,
  // createArticle,
  // updateArticle
} from '@/api/users'
import SrmTable from '@/components/SrmTable'
import SrmDialogCheck from '@/components/SrmDialogCheck'
export default {
  name: 'Users',
  components: {
    SrmTable,
    SrmDialogCheck
  },
  data() {
    return {
      dialogVisible: false,

      tableData: [],
      columns: [
        { prop: 'username', label: '姓名' },
        { prop: 'mobile', label: '手机号码' },
        { prop: 'roleName', label: '角色名称' },
        { prop: 'department', label: '部门', minWidth: 100 },
        { prop: 'jobPosition', label: '职位', minWidth: 100 },
        { prop: 'startDate', label: '创建时间', minWidth: 100 },
        { slot: 'isOpen', label: '是否可用', prop: 'isOpen', formatter: (row, column, cellvalue) => {
          return cellvalue === 1 ? '是' : '否'
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
        pageNo: 1,
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
    handleDialog(check) {
      this.dialogVisible = false
      if (check) {
        console.log('hello world')
      }
    },
    onSubmit() {
      console.log(this.filterQuery)
    },
    setStatus(row) {
      console.log(row, 'row')
    },
    changePage(page) {
      this.listQuery.pageNo = page
    },
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        console.log(response, 'response')
        // Just to simulate the time of the request
        setTimeout(() => {
          this.tableData = response.data.rows
          this.total = response.data.total
          this.listLoading = false
        }, 1 * 1000)
      })
    },
    disabledUser(item) {
      console.log(item, 'disabledUser')
      this.dialogVisible = true
    },
    editUser(item) {
      console.log(item, 'editUser')
    },
    resetPassword(item) {
      console.log(item, 'resetPassword')
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
