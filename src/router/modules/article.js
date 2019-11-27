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
      meta: { title: '文章详情', noCache: true },
      hidden: true
    }
  ]
}
export default ArticleRouter
