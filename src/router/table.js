import Layout from '@/layout'

export default [{
  path: '/example',
  component: Layout,
  redirect: '/example/table',
  name: 'Example',
  meta: { title: '示例', icon: 'example' },
  children: [
    {
      path: 'table',
      name: 'Table',
      component: () => import('@/views/table/index'),
      meta: { title: 'Table', icon: 'table' }
    },
    {
      path: 'mytable',
      name: 'myTable',
      component: () => import('@/views/table/my'),
      meta: { title: 'myTable', icon: 'table' }
    },
    {
      path: 'tree',
      name: 'Tree',
      component: () => import('@/views/tree/index'),
      meta: { title: 'Tree', icon: 'tree' }
    }
  ]
}]
