import router from '@/router'

const state = {
  needRefreshRouteList: []
}

const mutations = {
  ADD_ROUTE: (state, route) => {
    router.replace(route)
    if (state.needRefreshRouteList.includes(route)) return
    state.needRefreshRouteList.push(route)
  },
  REMOVE_ROUTE: (state, route) => {
    state.needRefreshRouteList = state.needRefreshRouteList.filter(v => v !== route)
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
