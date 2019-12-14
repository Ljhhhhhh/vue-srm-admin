# 升级vue-element-admin，高效开发后台管理系统
## 前言
[vue-element-admin](https://panjiachen.gitee.io/vue-element-admin-site/zh/)作为一个后台前端解决方案，它丰富的插件、优雅的解决方案无需多言。然而在企业级中后台产品的开发中，我们最常遇到的需求就是列表页、详情页。`vue-element-admin`的解决方案是直接使用`element-ui`的`el-table/el-form`实现了需求。**由于列表页、详情页有很多的需求是相近甚至相同的**，在这样的前提下， 我考虑是不是能基于`vue-element-admin`打造更高效的中后台解决方案呢，于是有了`srm-admin`。
## `srm-admin`做了什么
### `SrmTable`：配置式表格组件
`SrmTable`用与列表页中的列表数据展示，它是基于配置展示所需数据。拥有自定义slot、render渲染、formatter等功能使其在快速开发的前提下同时拥有极高的可定制能力。另外，它还无需任何多余操作即可根据表格展示列导出Excel文件。
### `SrmForm`：配置式表单组件
`SrmForm`基于配置生成表单，可快速完成详情页编辑、列表页筛选等功能。
`SrmForm`目录结构：<br>
![目录结构](http://img.cixi518.com/srmform-tree.png)
### `pageMixin`：列表页功能集成
`pageMixin`功能列表：
1. 对页码、每页条数进行监听，当页码/每页条数变动之后，自动触发请求，获取对应数据源。
2. 对搜索条件进行过滤，自动过滤无效属性。
3. 标记请求中、请求完成状态。
4. 判断当前列表是否需要刷新，如果需要刷新，完成自动刷新。
5. 增加`mixinHandleItem`方法，需要操作列表数据时，使用此方法做中转简化数据操作与回调动作（如果需要）。
6. 引入`SrmDialogCheck`组件，如果操作数据前需要确认，可对其传入需要操作的一项或多项数据完成确认提示。
### `detailMixin`：详情页功能集成
`pageMixin`功能列表：
1. 根据`id`设置当前页的标题后缀：
![title-by-id](http://img.cixi518.com/title-by-id.png)
2. 自定义标题后缀：
![title-by-id](http://img.cixi518.com/title-by-title.png)
3. `goListWithRefresh`方法：标记需要刷新的页面，并根据参数判断是否需要立即返回。



`SrmForm`内部还集成了以下组件：

1. `SrmCheckboxGroup`：多选框
2. `SrmRadioGroup`：单选框
3. `SrmSelect`：选择器
4. `SrmUpload`：文件上传
5. `SrmValueRegio`：值区间