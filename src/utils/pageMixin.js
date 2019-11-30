import Cookies from 'js-cookie'
import settings from '@/settings'
import SrmDialogCheck from '@/components/SrmDialogCheck'
export default {
  data() {
    return {
      listQuery: { ...settings.listQuery }, // 扩展运算，以免影响settings中的值
      total: 0,
      listLoading: false,
      fetchList: null,
      tableData: [],
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
    if (Cookies.get(settings.needRefresh) && typeof this.getList === 'function') {
      this.getList()
      Cookies.remove(settings.needRefresh)
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
    getList() {
      if (!this.fetchList || typeof this.fetchList !== 'function') {
        this.$message.error('请把列表接口函数赋值给fetchList')
      }
      this.listLoading = true
      const query = this.$formattQuery(this.listQuery, this.searchForm)
      this.fetchList(query).then(response => {
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
