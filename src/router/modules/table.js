/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const tableRouter = {
  path: '/table',
  component: Layout,
  redirect: '/table/example1',
  name: 'Table',
  meta: {
    title: '高级表格',
    icon: 'table',
    roles: ['admin']
  },
  children: [
    {
      path: 'example1',
      component: () => import('@/views/table/example1'),
      name: 'TableExample1',
      meta: { title: '案例一' },
      roles: ['admin']
    },
    {
      path: 'example2',
      component: () => import('@/views/table/example2'),
      name: 'TableExample2',
      meta: { title: '案例二' },
      roles: ['admin']
    }
  ]
}
export default tableRouter
