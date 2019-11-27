import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'
import dayjs from 'dayjs'
import mixins from 'utils/mixins'

import '@/icons' // icon
import '@/permission' // permission control

import * as filters from './filters'

import SrmTable from '@/components/SrmTable'
import SrmForm from '@/components/SrmForm'
import SrmDialogCheck from '@/components/SrmDialogCheck'

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online! ! !
 */
import { mockXHR } from '../mock'
if (process.env.NODE_ENV === 'production') {
  mockXHR()
}

// set ElementUI lang to EN
Vue.use(ElementUI, {
  locale,
  size: 'small'
})

Vue.mixin(mixins)

Vue.prototype.dayjs = dayjs
// 合并两个对象，并过滤掉值为空的属性
Vue.prototype.$formattQuery = (...rest) => {
  const query = Object.assign({}, ...rest)
  for (const key in query) {
    if (!query[key] && query[key] !== 0 && typeof query[key] !== 'boolean') {
      delete query[key]
    }
  }
  return query
}

// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.component('SrmForm', SrmForm)
Vue.component('SrmTable', SrmTable)
Vue.component('SrmDialogCheck', SrmDialogCheck)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
