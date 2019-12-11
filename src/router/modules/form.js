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
      path: 'example',
      component: () => import('@/views/form/example'),
      name: 'FormExample',
      meta: { title: '高级表单' }
    }
  ]
}
export default formRouter
