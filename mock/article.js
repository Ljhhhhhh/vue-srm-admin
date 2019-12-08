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
      return {
        code: 20001,
        data: '没有该数据'
      }
    }
  },

  {
    url: '/article/delete',
    type: 'post',
    response: config => {
      const { id } = config.body
      let ids = id
      if (!Array.isArray(id)) {
        ids = [id]
      }
      List = List.filter(article => {
        return ids.findIndex(id => +id === article.id) < 0
      })
      count = List.length
      return {
        code: 20000,
        data: 'success'
      }
    }
  },

  {
    url: '/article/create',
    type: 'post',
    response: _ => {
      const { title, content, status, author, reviewer, image_uri } = _.body
      List.unshift(Mock.mock({
        id: '@increment',
        timestamp: +Mock.Random.date('T'),
        author,
        reviewer,
        title: title,
        content_short: 'mock data',
        content: content,
        forecast: '@float(0, 100, 2, 2)',
        importance: '@integer(1, 3)',
        'type|1': ['CN', 'US', 'JP', 'EU'],
        status,
        display_time: Date.now(),
        pageviews: '@integer(300, 5000)',
        image_uri
      }))
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
      const { id, ...rest } = _.body
      List = List.map(article => {
        if (article.id === +id) {
          article = Object.assign({}, article, { ...rest })
        }
        return article
      })
      return {
        code: 20000,
        data: 'success'
      }
    }
  },
  {
    url: '/upload',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'http://img.cixi518.com/ljh_logo.jpeg'
      }
    }
  }
]

