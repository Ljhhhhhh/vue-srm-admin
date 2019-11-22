<template>
  <div class="container">
    <div class="handle-wrap">
      <!-- 如果使用此slot，请给slot添加class="srm-table-btn" -->
      <slot name="buttons" />
      <el-button
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
        v-if="!selectDisabled"
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
            <img
              :src="scope.row[column.prop]"
              :width="column.width || '120px'"
              :height="column.height || 'auto'"
              alt="img"
              @click="imgClick(scope.row[column.prop], column.previewWidth)"
            >
          </template>
        </el-table-column>
        <el-table-column
          v-else-if="column.type === 'index'"
          :key="column.type"
          type="index"
          v-bind="setAttrs(column)"
        />
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
      <div class="handle-wrap">
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
        v-show="total>0"
        class="pagination"
        background
        layout="total, prev, pager, next "
        :total="total"
        :page-size="pageRequest.pageSize"
        :current-page="pageRequest.pageNo"
        @current-change="currentChange"
      />
    </div>
    <image-preview
      :width="previewWidth"
      :current-img.sync="imgSrc"
    />
  </div>
</template>
<script>
import Render from './render'
import ImagePreview from '@/components/ImagePreview'
import { scrollTo } from '@/utils/scroll-to'

export default {
  name: 'SrmTable',
  components: {
    Render,
    ImagePreview
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
    selectDisabled: {
      type: Boolean,
      default: false
    },
    // 分页查询数据
    pageRequest: {
      type: Object,
      default: () => ({
        pageNo: 1,
        pageSize: 15
      })
    }
  },
  data() {
    return {
      downloadLoading: false,
      // 当前预览图片的地址
      imgSrc: '',
      // 当前预览图片的宽度
      previewWidth: '50%',
      // 当前选择项的集合
      selections: []
    }
  },
  watch: {
    sourceData: function() {
      scrollTo(0, 0)
    }
  },
  methods: {
    // 图片预览
    imgClick(src, previewWidth) {
      this.imgSrc = src
      this.previewWidth = previewWidth || '50%'
    },
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
    currentChange(pageNo) {
      this.$emit('changePage', pageNo)
    },
    setAttrs(options) {
      return {
        align: options.align || 'center',
        prop: options.prop,
        label: options.label,
        width: options.width,
        minWidth: options.minWidth,
        fixed: options.fixed,
        formatter: options.formatter,
        sortable: options.sortable
      }
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const filterColumn = this.columns.filter(v => v.prop)
        const tHeader = filterColumn.map(v => v.label)
        const data = this.selections.map((item) => filterColumn.map(col => {
          if (!col.prop) return
          if (col.formatter) {
            return col.formatter(this.selections[col])
          }
          return item[col.prop]
        }))
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'table-list'
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
</style>
