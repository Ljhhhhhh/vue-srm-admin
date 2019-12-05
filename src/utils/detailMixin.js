import store from '@/store'

export default {
  methods: {
    goListWithRefresh(route) {
      store.commit('page/ADD_ROUTE', route)
    }
  }
}
