import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'
// import Layout from '@/layout'

const state = {
  token: getToken(),
  name: '',
  avatar: ''
  // routerList: []
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
  // SET_ROUTER: (state, router) => {
  //   state.routerList = router
  // }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        console.log(response, 'response')
        let { data: token } = response
        token = 'bearer ' + token
        commit('SET_TOKEN', token)
        setToken(token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo().then(response => {
        const { data } = response

        if (!data) {
          reject('Verification failed, please Login again.')
        }

        const { username, avatar } = data

        commit('SET_NAME', username)
        commit('SET_AVATAR', avatar)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // getRouter({ commit, state }, router) {
  //   return new Promise((resolve, reject) => {
  //     fetchRouter().then(response => {
  //       const { data } = response
  //       console.log(data, 'routerlist data', router.addRoutes, 'router')
  //       /*
  //       path: '/form',
  //   component: Layout,
  //   redirect: '/form/myForm',
  //   name: 'Form',
  //    */
  //       // const asyncRoutes = data.map(item => {
  //       //   return {
  //       //     path: item.route,
  //       //     component: () => import(`@/views/users/users`)
  //       //     // component: item.component ? () => import(`@/views/users/users`) : Layout
  //       //   }
  //       // })
  //       const asyncRoutes = [{
  //         path: '/users',
  //         component: Layout,
  //         redirect: '/users/users',
  //         name: 'userControl',
  //         meta: { title: '系统用户', icon: 'user' },
  //         children: [
  //           {
  //             path: 'users',
  //             name: 'users',
  //             component: () => import('@/views/users/users'),
  //             meta: { title: '用户管理', icon: 'user' }
  //           },
  //           {
  //             path: 'mytable',
  //             name: 'myTable',
  //             component: () => import('@/views/table/my'),
  //             meta: { title: 'myTable', icon: 'table' }
  //           },
  //           {
  //             path: 'tree',
  //             name: 'Tree',
  //             component: () => import('@/views/tree/index'),
  //             meta: { title: 'Tree', icon: 'tree' }
  //           }
  //         ]
  //       }]
  //       router.addRoutes(asyncRoutes)
  //       console.log(router.options.routes, 'router.$router.options.routes')
  //       commit('SET_ROUTER', asyncRoutes)
  //       // TODO:: 侧边栏不刷新
  //       resolve(asyncRoutes)
  //       // if (!data) {
  //       //   reject('Verification failed, please Login again.')
  //       // }

  //       // const { username, avatar } = data

  //       // commit('SET_NAME', username)
  //       // commit('SET_AVATAR', avatar)
  //       // resolve(data)
  //     }).catch(error => {
  //       reject(error)
  //     })
  //   })
  // },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        removeToken()
        resetRouter()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      removeToken()
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

