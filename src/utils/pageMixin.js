export default {
  data() {
    return {
      listQuery: {
        page: 1,
        pageSize: 3
      },
      total: 0,
      listLoading: false,
      fetchList: null,
      tableData: []
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
    }
  }
}
