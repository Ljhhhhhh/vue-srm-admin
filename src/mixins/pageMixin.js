import SrmDialogCheck from '@/components/SrmDialogCheck'
export default {
  data() {
    return {
      // 页码及每页条数
      listQuery: {
        page: 1,
        pageSize: 10
      },
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
  // 激活时判断是否需要重新请求列表页
  activated() {
    if (this.$store.state.page.needRefreshRouteList.includes(this.$route.path)) {
      this.getList()
      this.$store.commit('page/REMOVE_ROUTE', this.$route.path)
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    // 刷新
    refresh() {
      if (this.listQuery.page !== 1) {
        Object.assign(this.listQuery, {
          page: 1
        })
      } else {
        this.getList()
      }
    },
    // 页码切换
    changePage(page) {
      this.listQuery.page = page
    },
    // 每页条数切换
    changeSize(size) {
      this.listQuery.pageSize = size
    },
    // 获取列表数据
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
