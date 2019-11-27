/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const formRouter = {
  path: '/form',
  component: Layout,
  redirect: '/form/example1',
  name: 'Form',
  meta: {
    title: '高级表单',
    icon: 'form'
  },
  children: [
    {
      path: 'example1',
      component: () => import('@/views/form/example1'),
      name: 'FormExample1',
      meta: { title: '案例一' }
    },
    {
      path: 'example2',
      component: () => import('@/views/form/example2'),
      name: 'FormExample2',
      meta: { title: '案例二' }
    }
  ]
}
export default formRouter
