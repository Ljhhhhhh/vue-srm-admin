import store from '@/store'

export default {
  data() {
    return {
      id: null,
      tempRoute: {},
      titleById: true // 使用id做为标题标识
    }
  },
  watch: {
    // 默认使用id作为标题后缀
    id: function(val) {
      if (!this.titleById) return
      this.tempRoute = Object.assign({}, this.$route)
      const title = `${this.$route.meta.title}-${val}`
      const route = Object.assign({}, this.tempRoute, { title })
      document.title = title
      this.$store.dispatch('tagsView/updateVisitedView', route)
    }
  },
  methods: {
    // 自定义标题后缀
    setTitle(val) {
      if (!val) {
        console.error('动态标题值为空，请检查核实！')
      }
      this.tempRoute = Object.assign({}, this.$route)
      const title = `${this.$route.meta.title}-${val}`
      const route = Object.assign({}, this.tempRoute, { title })
      document.title = title
      this.$store.dispatch('tagsView/updateVisitedView', route)
    },
    /**
     * @description: 标记返回页面
     * route: 需要标记的页面路由
     * later: 是否稍后返回route
    */
    goListWithRefresh(route, later = false) {
      if (!route) {
        console.error('没有传入页面路由地址')
        return
      }
      if (later) {
        store.commit('page/ADD_ROUTE_LATER', route)
      } else {
        store.commit('page/ADD_ROUTE', route)
      }
    }
  }
}
