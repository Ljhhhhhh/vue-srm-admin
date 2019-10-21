import { constantRoutes } from '@/router'
// import { fetchRouter } from '@/api/user'
import Layout from '@/layout'

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    console.log('routes', routes)
    state.addRoutes = routes
    state.routes = constantRoutes
      .concat(routes) // 添加用户角色对应的路由
      .concat([{ path: '*', redirect: '/404', hidden: true }]) // 必须添加404到路由最末尾
  }
}

const actions = {
  generateRoutes({ commit }) {
    return new Promise(resolve => {
      const asyncRoutes = [{
        path: '/users',
        component: Layout,
        redirect: '/users/users',
        name: 'userControl',
        meta: { title: '系统用户', icon: 'user' },
        children: [
          {
            path: 'users',
            name: 'users',
            component: () => import('@/views/users/users'),
            meta: { title: '用户管理', icon: 'user' }
          },
          {
            path: 'mytable',
            name: 'myTable',
            component: () => import('@/views/table/my'),
            meta: { title: 'myTable', icon: 'table' }
          },
          {
            path: 'tree',
            name: 'Tree',
            component: () => import('@/views/tree/index'),
            meta: { title: 'Tree', icon: 'tree' }
          }
        ]
      }]
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
