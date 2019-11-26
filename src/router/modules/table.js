/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const tableRouter = {
  path: '/table',
  component: Layout,
  redirect: '/table/complex-table',
  name: 'Table',
  meta: {
    title: 'Table',
    icon: 'table'
  },
  children: [
    {
      path: 'my',
      component: () => import('@/views/table/my'),
      name: 'DynamicTable',
      meta: { title: 'Dynamic Table' }
    }
  ]
}
export default tableRouter
