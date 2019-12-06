import Vue from 'vue'
import dayjs from 'dayjs'

Vue.prototype.dayjs = dayjs
// 合并两个对象，并过滤掉值为空的属性
Vue.prototype.$filterEmptyValue = (...rest) => {
  const query = Object.assign({}, ...rest)
  for (const key in query) {
    if (!query[key] && query[key] !== 0 && typeof query[key] !== 'boolean') {
      delete query[key]
    }
  }
  return query
}
