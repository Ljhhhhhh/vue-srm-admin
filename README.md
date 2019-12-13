# 封装高级表格/表单，高效开发后台管理系统
## 案例讲解
### 列表页
#### 列表页预览
![文章列表页预览](http://img.cixi518.com/article.png)
#### 列表页需求拆分
1. 数据筛选

2. 列表展示

3. 数据项操作

4. Excel导出

#### 列表页思路引导

针对数据筛选，需要一个表单。针对列表展示，需要一个表格。数据项操作应有开发者全权掌握。Excel导出功能则可以视作列表展示的扩展功能。

#### 列表页代码演示
![列表页代码](http://img.cixi518.com/article-code.png)
#### 细说列表页

1. 数据筛选
2. 列表展示
3. 数据操作

从代码演示中，我们可以看到`srm-form`以及`srm-table`，`srm-form`实现数据筛选功能，srm-table则实现了数据的展示、数据项的操作及导出功能。

Q：`srm-form`如何实现数据筛选功能？

A：`form-items`属性传入一个数组设置当前表单需要编辑的字段，v-model绑定了数据筛选对象，并利用`form-name`属性获取当前页面需要被`proxy`(动态修改)的变量。点击搜索按钮触发`submit`方法，点击重置按钮重置当前表单数据并触发`after-reset`方法。


Q：`srm-table`如何展示数据？

A：`source-data`接受需要展示的列表数据、`column`接受表格需要展示的数据列。用户切换页码/每页条数后会触发`changePage/changeSize`事件。




## 表格组件
## 表单组件
## 弹窗确认组件
## pageMixin
## detailMixin