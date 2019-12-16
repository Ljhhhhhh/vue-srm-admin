<template>
  <div class="container">
    <div class="handle-wrap">
      <slot name="buttons" />
      <el-button
        v-if="exportVisible"
        class="table-export_btn"
        :disabled="!selections.length"
        :loading="downloadLoading"
        type="primary"
        icon="el-icon-download"
        @click="handleDownload"
      >
        <span>导出</span><span v-show="selections.length">{{ selections.length }}项</span>
      </el-button>
    </div>
    <el-table
      v-loading="loading"
      :data="sourceData"
      style="width: 100%"
      @selection-change="selectionChange"
    >
      <el-table-column
        v-if="selectVisible"
        type="selection"
        width="45"
        align="center"
      />
      <template v-for="(column, index) in columns">
        <el-table-column
          v-if="column.render"
          :key="column.prop"
          :label="column.label"
        >
          <template slot-scope="scope">
            <Render
              :row="scope.row"
              :index="index"
              :render="column.render"
            />
          </template>
        </el-table-column>
        <slot
          v-else-if="column.slot"
          :name="column.slot"
        />
        <el-table-column
          v-else-if="column.isImg"
          :key="column.prop"
          v-bind="setAttrs(column)"
        >
          <template slot-scope="scope">
            <el-image
              class="srm-table_img"
              :style="{width: column.width || '120px', height: column.height || 'auto'}"
              :src="scope.row[column.prop]"
              :preview-src-list="[scope.row[column.prop]]"
            />
          </template>
        </el-table-column>
        <el-table-column
          v-else
          :key="column.prop"
          v-bind="setAttrs(column)"
        />
      </template>
    </el-table>
    <!--分页栏-->
    <div
      class="toolbar"
    >
      <div v-if="deleteVisible" class="handle-wrap">
        <el-button
          class="button"
          size="small"
          type="danger"
          :disabled="!selections.length"
          icon="el-icon-delete"
          @click="handleBatchDelete"
        >
          <span>删除</span><span v-show="selections.length">{{ selections.length }}项</span>
        </el-button>
      </div>
      <el-pagination
        v-show="total > pageRequest.pageSize"
        :page-sizes="pageSizes"
        class="pagination"
        background
        :layout="layout"
        :total="total"
        :page-size="pageRequest.pageSize"
        :current-page.sync="pageRequest.page"
        @current-change="currentChange"
        @size-change="sizeChange"
      />
    </div>
  </div>
</template>
<script>
import Render from './render'
import { scrollTo } from '@/utils/scroll-to'

export default {
  name: 'SrmTable',
  components: {
    Render
    // ImagePreview
  },
  props: {
    // 列表数据
    sourceData: {
      type: Array,
      required: true
    },
    // 数据总数
    total: {
      type: Number,
      required: true
    },
    // 定义列
    columns: {
      type: Array,
      required: true
    },
    // 是否加载中
    loading: {
      type: Boolean,
      default: false
    },
    // 是否可选择行
    selectVisible: {
      type: Boolean,
      default: true
    },
    // 分页查询数据
    pageRequest: {
      type: Object,
      default: () => ({
        page: 1,
        pageSize: 10
      })
    },
    // 是否可导出
    exportVisible: {
      type: Boolean,
      default: true
    },
    // 是否可以批量删除
    deleteVisible: {
      type: Boolean,
      default: true
    },
    // 导出文件默认名称
    exportName: {
      type: String,
      default: ''
    },
    // 每页条数选择器
    pageSizes: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      downloadLoading: false,
      // 当前选择项的集合
      selections: []
    }
  },
  computed: {
    layout() {
      const layout = ['total', 'prev', 'pager', 'next']
      if (this.pageSizes.length) {
        layout.push('sizes')
      }
      return layout.join(', ')
    }
  },
  watch: {
    sourceData: function() {
      scrollTo(0, 0)
    }
  },
  methods: {
    // 已选项
    selectionChange(selections) {
      this.selections = selections
      this.$emit('selectionChange', { selections })
    },
    // 批量删除
    handleBatchDelete() {
      this.$emit('handleBatchDelete', this.selections)
    },
    // 切换页面
    currentChange(page) {
      this.$emit('changePage', page)
    },
    sizeChange(size) {
      this.$emit('changeSize', size)
    },
    setAttrs(params) {
      // eslint-disable-next-line
      const { slot, ...options } = params
      if (!options.align) {
        options.align = 'center'
      }
      return { ...options }
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const filterColumn = this.columns.filter(v => v.prop)
        const tHeader = []
        const data = this.selections.map((item) => filterColumn.map(col => {
          if (!col.prop) return
          tHeader.push(col.label)
          if (col.formatter) {
            return col.formatter(item, '', item[col.prop])
          }
          return item[col.prop]
        }))
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: this.exportName || document.title
        })
        this.downloadLoading = false
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.container{
  padding: 0 15px;
}
.srm-table_img{
  cursor: pointer;
}
.toolbar{
  margin-top: 15px;
  padding: 0 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  .handle-wrap{
    position: absolute;
    left: 0;
  }
}
.handle-wrap{
  display: flex;
  align-items: center;
  text-align: center;
  margin-bottom: 15px;
}
* + .table-export_btn{
  margin-left: 15px;
}
</style>
