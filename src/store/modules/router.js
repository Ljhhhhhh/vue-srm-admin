import { constantRoutes, asyncRoutes } from '@/router'

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes
      .concat(routes) // 添加用户角色对应的路由
  }
}

const actions = {
  generateRoutes({ commit }, roles) {
    console.log(roles, 'payload')
    // TODO:: 根据角色获取具体的路由
    return new Promise(resolve => {
      commit('SET_ROUTES', asyncRoutes)
      resolve(asyncRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
