import Cookies from 'js-cookie'

const needRefresh = 'needRefresh'

export default {
  activated() {
    if (Cookies.get(needRefresh) && typeof this.getList === 'function') {
      this.getList()
      Cookies.remove(needRefresh)
    }
  },
  methods: {
    goListWithRefresh(route) {
      Cookies.set(needRefresh, true)
      this.$router.replace(route)
    },
    async handleItem(fn, cb, ...rest) {
      // let data
      // if (typeof param === 'string') {
      //   data = [param]
      // } else {
      //   data = param
      // }
      const { code, message } = await fn(...rest)
      if (code === 200) {
        this.$message.success('操作成功')
        if (cb && typeof cb === 'function') {
          cb()
        }
      } else {
        this.$message.error(message || '操作失败，请重试')
      }
    }
  }
}
