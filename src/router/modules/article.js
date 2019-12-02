/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const ArticleRouter = {
  path: '/article',
  component: Layout,
  redirect: '/article/list',
  name: 'Article',
  meta: {
    title: '文章管理',
    icon: 'article'
  },
  children: [
    {
      path: 'list',
      component: () => import('@/views/article'),
      name: 'ArticleList',
      meta: { title: '文章管理' }
    },
    {
      path: 'detail',
      component: () => import('@/views/article/detail'),
      name: 'ArticleDetail',
      meta: { title: '文章详情' },
      hidden: true
    },
    /*
      {
        path: 'edit/:id(\\d+)',
        component: () => import('@/views/example/edit'),
        name: 'EditArticle',
        meta: { title: 'Edit Article', noCache: true, activeMenu: '/example/list' },
        hidden: true
      },
    */
    {
      path: 'handle',
      component: () => import('@/views/article/handle'),
      name: 'ArticleHandle',
      meta: { title: '文章新增' },
      hidden: true
    }
  ]
}
export default ArticleRouter
