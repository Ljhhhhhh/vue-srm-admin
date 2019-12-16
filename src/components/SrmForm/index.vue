<template>
  <div class="container">
    <el-form
      :ref="form"
      v-bind="$attrs"
      :model="Model"
      :show-message="showMessage"
      :inline="inline"
      :size="size"
      :label-width="labelWitdh"
    >
      <el-row :gutter="gutter">
        <template v-for="(item, index) in _formItems">
          <component
            :is="inline ? 'span' : 'el-col'"
            :key="index + item.attrs.key || item.slot"
            :span="item.itemAttrs.col || 24"
          >
            <el-form-item
              v-if="item._ifRender"
              :key="index + item.attrs.key || item.slot"
              v-bind="item.itemAttrs || {}"
              :prop="item.attrs.key"
            >
              <!-- 将表单内部的数据通过作用域插槽传给外部 -->
              <slot v-if="item.slot" :name="item.slot" :scope="Model" />
              <component
                :is="item.tag"
                v-else
                v-model="Model[item.attrs.key]"
                :size="size"
                v-bind="item.attrs || {}"
                v-on="item.listeners || {}"
              />
            </el-form-item>
          </component>
        </template>
        <component :is="inline ? 'span' : 'el-col'" :span="btnCol">
          <el-form-item>
            <slot name="buttons" />
            <el-button v-if="!!submitMsg" type="primary" @click="handleSubmit">{{ submitMsg }}</el-button>
            <el-button v-if="resetMsg" type="info" @click="handleReset">{{ resetMsg }}</el-button>
            <span v-if="showBack" class="el-button el-button--small" @click="goBack">返回</span>
          </el-form-item>
        </component>

      </el-row>
    </el-form>
  </div>
</template>

<script>
import componentMap from './util'
import SrmSelect from './SrmSelect'
import SrmRadioGroup from './SrmRadioGroup'
import SrmCheckboxGroup from './SrmCheckboxGroup'
import SrmValueRegio from './SrmValueRegio'
import SrmUpload from './SrmUpload'
import { proxyProp } from '../../utils/proxyProp'
import { findComponentUpwardByProp, findComponentsDownward } from '../../utils/findComponents'
const form = Symbol('form') // 保证每个实例有独一无二的标志位
// 如果子项含有树组件，请单独处理树组件的验证结果
export default {
  name: 'SrmForm',
  components: {
    SrmSelect,
    SrmRadioGroup,
    SrmCheckboxGroup,
    SrmValueRegio,
    SrmUpload
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    formItems: {
      type: Array,
      required: true
    },
    formName: {
      type: String,
      required: true
    },
    inline: {
      type: Boolean,
      default: false
    },
    submitMsg: {
      type: [Boolean, String],
      default: '提交'
    },
    resetMsg: {
      type: [Boolean, String],
      default: '重置'
    },
    labelWitdh: {
      type: String,
      default: 'auto'
    },
    // 传入mergeForm允许父组件修改内部Model对象
    // mergeForm: {
    //   type: Object,
    //   default: () => {}
    // },
    size: {
      type: String,
      default: 'small'
    },
    showBack: {
      type: Boolean,
      default: true
    },
    gutter: {
      type: Number,
      default: 24
    },
    btnCol: {
      type: Number,
      default: 24
    }
  },
  data() {
    return {
      Model: {},
      originModel: {},
      form
    }
  },
  computed: {
    // 根据formItem计算出实际需要让页面渲染的真正的_formItem数据
    _formItems() {
      // this.Model中的值改变触发computed
      let _formItems = []
      _formItems = this.formItems.map(item => {
        // this.$emit(`update:merge-form`, this.Model)
        this.$emit('change', this.Model)
        return this.computeFormItem(item, this.Model)
      }
      )
      return _formItems
    },
    showMessage() {
      return this.$attrs['show-message'] !== false
    }
  },
  watch: {
    // 使用watch观察父组件传入的formItems,初始化Model对象(只调用一次)
    formItems: {
      handler() {
        this.formItems.forEach(formItem => {
          if (!formItem.attrs || !formItem.attrs.key) return // 跳过没有key的属性(插槽)
          let value = formItem.attrs.value
          if (formItem.tag === 'value-regio') {
            value = value || {}
          }
          if (value) {
            this.$set(
              this.Model,
              formItem.attrs.key,
              value
            )
          }
        })
        this.originModel = JSON.parse(JSON.stringify(this.Model))
      },
      deep: true,
      immediate: true
    }
    // mergeForm: {
    //   handler() {
    //     this.mergeModel()
    //   },
    //   deep: true,
    //   immediate: true
    // }
  },
  mounted() {
    // 代理父组件的mergeForm属性
    const parentComponent = findComponentUpwardByProp(this, [this.formName])
    if (parentComponent) {
      parentComponent[this.formName] = proxyProp(parentComponent[this.formName])
    } else {
      throw new Error('can not find parentComponent')
    }
    // mounted钩子中formItems是空数组,所以不在mounted里面操作formItems
  },
  methods: {
    computeFormItem(formItem, Model) {
      const item = { ...formItem }
      // 表单控件的类型
      const tag = item.tag || 'input'
      // 对应到组件映射表
      const basicItem = componentMap[tag]
      item.tag = basicItem.component
      // 继承基类的属性
      item.attrs = Object.assign({}, basicItem.attrs, item.attrs)
      // 获取动态 Attributes
      if (item.getAttrs) { item.attrs = Object.assign(item.attrs, item.getAttrs(Model)) }
      // 条件渲染
      item._ifRender = item.ifRender ? item.ifRender(Model) : true
      // 防止表单提交时存在多余 key
      if (!item._ifRender) {
        delete Model[item.attrs.key]
      }
      // form-item 配置
      return item
    },
    // mergeModel() {
    //   Object.assign(this.Model, this.mergeForm)
    // },
    // 提交按钮
    handleSubmit() {
      // 验证SrmValueRegio的值是否合法
      const SrmValueRegios = findComponentsDownward(this, 'SrmValueRegio')
      const valueRegioValid = SrmValueRegios.every(SrmValueRegio => {
        return SrmValueRegio.validate()
      })
      if (!valueRegioValid) return
      // 验证表单中的所有项目
      this.$refs[form].validate(async valid => {
        if (valid) {
          try {
            this.$emit('submit')
          } catch (e) {
            console.log(e)
          }
        }
      })
    },
    handleReset() {
      const ElTrees = findComponentsDownward(this, 'ElTree')
      if (ElTrees && ElTrees.length) {
        ElTrees.map(item => {
          item.setCheckedKeys([])
        })
      }
      this.Model = JSON.parse(JSON.stringify(this.originModel))
      this.$emit('change', this.Model)
      this.$emit('after-reset')
    },
    goBack() {
      this.$confirm('确认返回上一页？', '返回', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'info'
      }).then(() => {
        this.$router.go(-1)
        this.$store.dispatch('tagsView/delView', {
          path: this.$route.path
        })
      }).catch(e => {
        console.log(e)
      })
    }
  }
}
</script>
<style lang="scss">
  .el-select,
  .el-date-editor.el-input,
  .el-date-editor.el-input__inner,
  .el-cascader {
    width: 100%;
  }
</style>
