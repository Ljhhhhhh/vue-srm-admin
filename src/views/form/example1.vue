<template>
  <div>
    <srm-form
      :inline="true"
      :form-items="formItems"
      :merge-form.sync="mergeForm"
      @submit="showTableData"
      @after-reset="getList"
    >
      <template v-slot:slotCheckBox>
        <el-checkbox v-model="mergeForm.slotCheckBox">插槽复选框1</el-checkbox>
      </template>
      <template v-slot:upload>
        <div>
          <!-- <el-upload>
            <div>++</div>
          </el-upload> -->
        </div>
      </template>
    </srm-form>
  </div>
</template>
<script>
import SrmForm from '@/components/SrmForm'
import { findItem } from '@/components/SrmForm/util'
import { createArticle, fetchList } from '@/api/article'
export default {
  name: 'FormExample1',
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
            // form为ZFrom的:model对象
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
            key: 'date'
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
          slot: 'slotCheckBox',
          // attrs: {
          //   key: 'slotCheckBox'
          // },
          itemAttrs: {
            label: '插槽复选框'
          }
        },
        {
          slot: 'upload',
          // attrs: {
          //   key: 'upload'
          // },
          itemAttrs: {
            label: '上传图片'
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
      createArticle,
      mergeForm: {}
    }
  },
  methods: {
    showTableData() {
      console.log('showTableData')
    },
    getList() {
      console.log('getList')
    },
    async getInfo() {
      try {
        const [res1] = await Promise.all([fetchList()])
        console.log(res1, 'res1')
        const optionsList = res1.data.items.map(item => {
          return {
            value: item.id, label: '第' + item.title
          }
        })
        // const [res1, res2] = await Promise.all([fetchList(), cascader()])
        findItem(this.formItems, 'asyncRadio').attrs.options = optionsList
        // this.findItem('cascader').attrs.options = res2.options
      } catch (e) {
        console.log(e)
      }
    }
    // findItem(key) {
    //   return this.formItems.find(
    //     formItem => formItem.attrs && formItem.attrs.key === key
    //   )
    // }
  }
}
</script>
