/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const formRouter = {
  path: '/form',
  component: Layout,
  redirect: '/form/adform',
  name: 'Form',
  meta: {
    title: 'Form',
    icon: 'form'
  },
  children: [
    {
      path: 'adform',
      component: () => import('@/views/form/myForm'),
      name: 'MyForm',
      meta: { title: 'ad form' }
    }
  ]
}
export default formRouter
