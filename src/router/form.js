import Layout from '@/layout'

export default [
  {
    path: '/form',
    component: Layout,
    redirect: '/form/myForm',
    name: 'Form',
    meta: {
      title: '表单',
      icon: 'form'
    },
    children: [
      {
        path: 'index',
        name: 'FormIndex',
        component: () => import('@/views/form/index'),
        meta: { title: 'Form', icon: 'form' }
      },
      {
        path: 'myForm',
        name: 'myForm',
        component: () => import('@/views/form/myForm'),
        meta: { title: '我的表单', icon: 'form' }
      }
    ]
  }
]
