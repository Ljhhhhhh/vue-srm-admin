<template>
  <div class="container">
    <srm-form
      v-model="mergeForm"
      :rules="rules"
      class="my-form"
      form-name="mergeForm"
      :inline="false"
      :form-items="formItems"
      @submit="showTableData"
      @after-reset="getList"
    >
      <template v-slot:colorPicker>
        <el-color-picker v-model="mergeForm.colorPicker" />
      </template>
    </srm-form>
  </div>
</template>
<script>
import SrmForm from '@/components/SrmForm'
import { findItem } from '@/components/SrmForm/util'
export default {
  name: 'FormExample',
  components: {
    SrmForm
  },
  data() {
    return {
      formItems: [
        {
          tag: 'input',
          itemAttrs: {
            label: '姓名'
          },
          attrs: {
            key: 'name',
            placeholder: '请输入姓名'
          },
          getAttrs(Model) {
            // 返回一个被合并到当前attrs属性里的对象
            return Model.age === '22' ? { disabled: true } : null
          }
        },
        {
          tag: 'input',
          itemAttrs: {
            label: '年龄',
            rules: [{ required: true, message: '年龄不能为空', trigger: 'click' }]
          },
          attrs: {
            key: 'age',
            placeholder: '请输入年龄'
          },
          ifRender(Model) {
            return Model.hobby === '2'
          }
        },
        {
          tag: 'select',
          itemAttrs: {
            label: '兴趣'
          },
          attrs: {
            key: 'hobby',
            placeholder: '请输入兴趣',
            options: [
              { value: '1', label: '吃饭' },
              { value: '2', label: '睡觉' },
              { value: '3', label: '打豆豆' }
            ]
          }
        },
        {
          tag: 'date',
          itemAttrs: {
            label: '日期'
          },
          attrs: {
            key: 'date',
            'value-format': 'yyyy-MM-dd'
          }
        },
        {
          tag: 'radio',
          itemAttrs: {
            label: '单选框'
          },
          attrs: {
            value: '1',
            key: 'radio',
            options: [{ value: '1', label: '男' }, { value: '2', label: '女' }]
          }
        },
        {
          tag: 'upload',
          itemAttrs: {
            label: '文章封面',
            col: 24
          },
          attrs: {
            key: 'image_uri'
          }
        },
        {
          tag: 'radio',
          itemAttrs: {
            label: '调用后端接口-单选框'
          },
          attrs: {
            value: '1',
            key: 'asyncRadio',
            options: []
          }
        },
        {
          tag: 'checkbox-group',
          itemAttrs: {
            label: '复选框组'
          },
          attrs: {
            value: ['1'],
            key: 'checkboxGroup',
            options: [
              { value: '1', label: '复选框1' },
              { value: '2', label: '复选框2' },
              { value: '3', label: '复选框3' }
            ]
          }
        },
        {
          tag: 'cascader',
          itemAttrs: {
            label: '级联选择器'
          },
          attrs: {
            key: 'cascader',
            value: [],
            options: []
          }
        },
        {
          tag: 'checkbox',
          itemAttrs: {
            label: '复选框'
          },
          attrs: {
            key: 'checkbox',
            value: true,
            label: '复选框'
          }
        },
        {
          slot: 'colorPicker',
          itemAttrs: {
            label: '颜色选择器'
          }
        },
        {
          tag: 'value-regio',
          itemAttrs: {
            label: '订单金额'
          },
          attrs: {
            key: 'priceRegio'
          }
        },
        {
          tag: 'textarea',
          itemAttrs: {
            label: '文本框'
          },
          attrs: {
            key: 'textarea'
          }
        }
      ],
      rules: {
        name: [
          { required: true, message: '姓名必填' }
        ]
      },
      mergeForm: {}
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.getInfo()
    })
  },
  methods: {
    showTableData() {
      this.$message.info('请在控制台查看当前表单值')
      console.log({ ...this.mergeForm })
    },
    getList() {
      console.log('getList')
    },
    async getInfo() {
      const optionsList = [
        { label: '选项一', value: 1 },
        { label: '选项二', value: 2 },
        { label: '选项三', value: 3 }
      ]
      findItem(this.formItems, 'asyncRadio').attrs.options = optionsList
    }
  }
}
</script>
<style lang="scss" scoped>
  .container{
    .my-form{
      width: 650px;
    }
  }
</style>
