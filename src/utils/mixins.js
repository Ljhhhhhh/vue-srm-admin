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
    goListWithRefresh(data) {
      Cookies.set(needRefresh, true)
      this.$router.replace(data)
    }
  }
}
