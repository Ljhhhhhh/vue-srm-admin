import store from '@/store'

export default {
  data() {
    return {
      id: null,
      tempRoute: {}
    }
  },
  watch: {
    id: function(val) {
      this.tempRoute = Object.assign({}, this.$route)
      const title = `${this.$route.meta.title}-${val}`
      const route = Object.assign({}, this.tempRoute, { title })
      document.title = title
      this.$store.dispatch('tagsView/updateVisitedView', route)
    }
  },
  methods: {
    goListWithRefresh(route) {
      store.commit('page/ADD_ROUTE', route)
    }
  }
}
