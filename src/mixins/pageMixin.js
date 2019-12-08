import settings from '@/settings'
import SrmDialogCheck from '@/components/SrmDialogCheck'
export default {
  data() {
    return {
      listQuery: { ...settings.listQuery }, // 扩展运算，以免影响settings中的值
      total: 0, // 总条数
      listLoading: false, // 是否加载中
      fetchList: null, // 请求接口函数
      tableData: [], // 获取数据
      searchForm: {}, // 筛选条件
      checkDialogItem: undefined // 当前选择项
    }
  },
  components: {
    SrmDialogCheck
  },
  watch: {
    listQuery: {
      handler: 'getList',
      deep: true
    }
  },
  activated() {
    if (this.$store.state.page.needRefreshRouteList.includes(this.$route.path)) {
      this.$store.commit('page/REMOVE_ROUTE', this.$route.path)
      this.getList()
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    refresh() {
      if (this.listQuery.page !== 1) {
        Object.assign(this.listQuery, {
          page: 1
        })
      } else {
        this.getList()
      }
    },
    changePage(page) {
      this.listQuery.page = page
    },
    changeSize(size) {
      this.listQuery.pageSize = size
    },
    getList() {
      if (!this.fetchList || typeof this.fetchList !== 'function') {
        this.$message.error('请把列表接口函数赋值给fetchList')
        return
      }
      this.listLoading = true
      const query = this.$filterEmptyValue(this.listQuery, this.searchForm)
      this.fetchList(query).then(response => {
        // 基于接口统一处理
        this.tableData = response.data.items
        this.total = response.data.total
        this.listLoading = false
      })
    },
    /**
     * @description: 操作项目及回调
     * fn: 需要执行的函数
     * cb: 回调（可传空）
     * ...rest: 需要执行函数的参数
     */
    async mixinHandleItem(fn, cb, ...rest) {
      const { code, data } = await fn(...rest)
      if (code === 20000) {
        this.$message.success('操作成功')
        if (cb && typeof cb === 'function') {
          cb()
        }
      } else {
        this.$message.error(data || '操作失败，请重试')
      }
    }
  }
}
