import Mock from 'mockjs'
// http://mockjs.com/examples.html#Image

let List = []
let count = 100

const baseContent = '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>'

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    timestamp: +Mock.Random.date('T'),
    author: '@cname',
    reviewer: '@cname',
    title: '@ctitle(5, 30)',
    content_short: 'mock data',
    content: baseContent,
    forecast: '@float(0, 100, 2, 2)',
    importance: '@integer(1, 3)',
    'type|1': ['CN', 'US', 'JP', 'EU'],
    'status|1': [3, 1, 2],
    display_time: '@date()',
    comment_disabled: true,
    pageviews: '@integer(300, 5000)',
    image_uri: "@image('200x100', '#50B347', '#FFF', 'png', 'IMG')"
  }))
}

export default [
  {
    url: '/article/list',
    type: 'get',
    response: config => {
      const { status, author, title, page = 1, pageSize = 10, sort } = config.query

      let mockList = List.filter(item => {
        if (+status && item.status !== +status) return false
        if (title && item.title.indexOf(title) < 0) return false
        if (author && item.author.indexOf(author) < 0) return false
        return true
      })

      if (sort === '-id') {
        mockList = mockList.reverse()
      }

      const pageList = mockList.filter((item, index) => index < pageSize * page && index >= pageSize * (page - 1))

      return {
        code: 20000,
        data: {
          total: mockList.length,
          items: pageList
        }
      }
    }
  },

  {
    url: '/article/detail',
    type: 'get',
    response: config => {
      const { id } = config.query
      for (const article of List) {
        if (article.id === +id) {
          return {
            code: 20000,
            data: article
          }
        }
      }
    }
  },

  {
    url: '/article/delete',
    type: 'get',
    response: config => {
      const { id } = config.query
      if (List.find(article => article.id === +id)) {
        List = List.filter(article => article.id !== +id)
        count--
        return {
          code: 20000,
          data: 'success'
        }
      }
    }
  },

  {
    url: '/article/pv',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: {
          pvData: [
            { key: 'PC', pv: 1024 },
            { key: 'mobile', pv: 1024 },
            { key: 'ios', pv: 1024 },
            { key: 'android', pv: 1024 }
          ]
        }
      }
    }
  },

  {
    url: '/article/create',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },

  {
    url: '/article/update',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]

