# 升级vue-element-admin，高效开发后台管理系统
## 前言
[vue-element-admin](https://panjiachen.gitee.io/vue-element-admin-site/zh/)作为一个后台前端解决方案，它丰富的插件、优雅的解决方案无需多言。然而在企业级中后台产品的开发中，我们最常遇到的需求就是列表页、详情页。`vue-element-admin`的解决方案是直接使用`element-ui`的`el-table/el-form`实现了需求。**由于列表页、详情页有很多的需求是相近甚至相同的**，在这样的前提下， 我考虑是不是能基于`vue-element-admin`打造更高效的中后台解决方案呢，于是有了`vue-srm-admin`。
**项目源码、案例展示、源码必知在文章末尾，请查收。**
## `vue-srm-admin`做了什么

### `pageMixin`：列表页功能集成

1. 对页码、每页条数进行监听，当页码/每页条数变动之后，自动触发请求，获取对应数据源。
2. 对搜索条件进行过滤，自动过滤无效属性。
3. 标记请求中、请求完成状态。
4. 判断当前列表是否需要刷新，如果需要刷新，完成自动刷新。
5. 增加`mixinHandleItem`方法，需要操作列表数据时，使用此方法做中转简化数据操作与回调动作（如果需要）。
6. 引入`SrmDialogCheck`组件，如果操作数据前需要确认，可对其传入需要操作的一项或多项数据完成确认提示。

### `detailMixin`：详情页功能集成

1. 根据`id`设置当前页的标题后缀：<br />
![title-by-id](http://img.cixi518.com/title-by-id.png)
2. 自定义标题后缀：<br />
![title-by-id](http://img.cixi518.com/title-by-title.png)
3. `goListWithRefresh`方法：标记需要刷新的页面，并根据参数判断是否需要立即返回。

### `SrmTable`：配置式表格组件

#### 简介：`SrmTable`用与列表页中的列表数据展示，它是基于配置展示所需数据。拥有自定义slot、render渲染、formatter等功能使其在快速开发的前提下同时拥有极高的可定制能力。另外，它还无需任何多余操作即可根据表格展示列导出Excel文件。

#### Attributes

| 参数          | 说明                    |  类型   | 默认值 |
| :------------ | ----------------------- | :-----: | :----: |
| sourceData    | 显示的数据              |  array  |  必填  |
| total         | 总条目数                | number  |  必填  |
| columns       | 需要展示的字段（参见下方代码演示） |  array  |  必填  |
| loading       | 是否加载中              | boolean | false  |
| selectVisible | 是否可选择行            | boolean |  true  |
| pageRequest   | 页码与每页条数          | object  |   {page: 1,pageSize: 10}|
| exportVisible | 是否可导出 | boolean |  true  |
| deleteVisible | 是否可以批量删除    | boolean |   true   |
| exportName    | 导出文件默认名称 | string | '' |
| pageSizes     | 每页显示个数选择器的选项设置 | number[] | [] |

#### Events

| 方法名      | 说明                    |  参数 |
| :------------ | ----------------------- | :-----: |
| selectionChange | 当选择项发生变化时会触发该事件 |  selection  |
| handleBatchDelete | 点击批量删除会触发该事件      | selection |
| changePage | 切换页码时触发该事件 |  page  |
| changeSize | 切换每页条数时触发该事件 | pagesize |

#### Slot

| name      | 说明                    |
| :------------ | ----------------------- |
| buttons | 表格上方区域（一般用于展示按钮） |

#### 使用示例
[表格代码演示](https://github.com/Ljhhhhhh/vue-srm-admin/blob/master/src/views/table/example2.vue)

### `SrmForm`：配置式表单组件
`SrmForm`基于配置生成表单，可快速完成详情页编辑、列表页筛选等功能。

#### Attributes

| 参数          | 说明                    |  类型   | 默认值 |
| :------------ | ----------------------- | :-----: | :----: |
| v-model | 表单数据对象 | object | 必填 |
| formName | 表单数据对象名称    | string |  必填  |
| formItems | 表单字段项（参见下方代码演示） |  array  |  必填  |
| inline | 行内表单模式 | boolean | false |
| submitMsg | 提交按钮文案(值为false时隐藏按钮) | string \| boolean |  提交  |
| resetMsg | 重置按钮文案(值为false时隐藏按钮) |  string \| boolean  |  重置  |
| labelWitdh | 表单域标签的宽度      | string | auto |
| size | 用于控制该表单内组件的尺寸 | string | small |
| showBack | 是否展示返回按钮 | boolean |  true  |
| gutter | 栅格间隔（当inline值为true时无效） | number |   24   |
| btnCol | 按钮区域布局（当inline值为true时无效） | string | 24 |

#### Events

| 方法名      | 说明                    |  参数 |
| :------------ | ----------------------- | :-----: |
| submit | 点击提交会触发该事件 |  无  |
| after-reset | 点击重置按钮会触发该事件    | 无 |

#### Slot

| name      | 说明                    |
| :------------ | ----------------------- |
| buttons | 表单下方区域（一般用于展示按钮） |

#### 使用示例
[表单代码演示](https://github.com/Ljhhhhhh/vue-srm-admin/blob/master/src/views/form/example.vue)

## `vue-srm-admin`源码必知
1. [functional(函数化组件)](https://cn.vuejs.org/v2/api/#functional)
2. [v-bind](https://cn.vuejs.org/v2/api/#v-bind)
3. [自定义v-model](https://cn.vuejs.org/v2/guide/components-custom-events.html#%E8%87%AA%E5%AE%9A%E4%B9%89%E7%BB%84%E4%BB%B6%E7%9A%84-v-model)
4. [.sync](https://cn.vuejs.org/v2/guide/components-custom-events.html#sync-%E4%BF%AE%E9%A5%B0%E7%AC%A6)
5. [动态组件](https://cn.vuejs.org/v2/guide/components-dynamic-async.html#ad)
6. [v-on](https://cn.vuejs.org/v2/api/#v-on)
7. [$listeners](https://cn.vuejs.org/v2/api/#vm-listeners)
8. [findComponents 系列方法](https://juejin.im/book/5bc844166fb9a05cd676ebca/section/5bd984eb6fb9a0228c38ceef)
9. [proxy](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy)
10. [$attrs](https://cn.vuejs.org/v2/api/#vm-attrs)

## 项目展示
[项目源码](https://github.com/Ljhhhhhh/vue-srm-admin)
[项目预览](http://vue-erp.cixi518.com)

## 总结
`vue-srm-admin`对表格、表单进行了高度封装，同时加入常用`mixin`，大幅提升了我在开发公司后台管理系统时的效率和质量。相信对您也有所帮助。Let's go!

## 参考
1. [vue-element-admin基础模板](https://github.com/PanJiaChen/vue-admin-template)
2. [我是如何让公司后台管理系统焕然一新的（下）-封装组件](https://juejin.im/post/5c7b4761f265da2db2795036)
3. [手摸手，带你用vue撸后台 系列四(vueAdmin 一个极简的后台基础模板)](https://juejin.im/post/595b4d776fb9a06bbe7dba56)

> 前端交流学习，欢迎加我微信好友 `13216698987`，我会把你拉到前端学习群。