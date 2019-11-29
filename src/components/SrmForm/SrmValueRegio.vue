<template>
  <el-form :ref="SrmValueRegioRef" :model="valueForm" :inline="true" :rules="rules" v-bind="$attrs" style="display: inline">
    <el-form-item prop="min" class="value-regio-item">
      <el-input v-model.number="valueForm.min" clearable>
        <span v-if="icon" slot="suffix" class="el-input__icon" :class="icon" />
        <span v-if="unit" slot="suffix">{{ unit }}</span>
      </el-input>
    </el-form-item>
    <el-form-item label="~" prop="max" class="value-regio-item">
      <el-input v-model.number="valueForm.max" clearable>
        <span v-if="icon" slot="suffix" class="el-input__icon" :class="icon" />
        <span v-if="unit" slot="suffix">{{ unit }}</span>
      </el-input>
    </el-form-item>
  </el-form>
</template>
<script>
// const MIN_NUMBER = 1
// const MAX_NUMBER = 100000
export default {
  name: 'SrmValueRegio',
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    // 类型为对象的值，需要包含min/max两个属性
    value: {
      type: [Object, null],
      default: () => {}
    },
    // 验证失败时的错误提示，分别针对min和max的数组
    errorMessage: {
      type: Array,
      default: () => []
    },
    // 图标
    icon: {
      type: String,
      default: ''
    },
    // 单位
    unit: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      SrmValueRegioRef: Symbol('SrmValueRegioRef'),
      valueForm: {
        min: null,
        max: null
      },
      rules: {
        min: [
          { validator: this.validateMin, trigger: 'blur' }
        ],
        max: [
          { validator: this.validateMax, trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    valueForm: {
      handler: 'getVal',
      immediate: true,
      deep: true
    }
  },
  mounted() {
    this.valueForm = {
      min: this.value.min,
      max: this.value.max
    }
  },
  methods: {
    getVal(val) {
      const { min, max } = val || this.$attrs.value
      this.$emit('change', {
        min,
        max
      })
    },
    validate() {
      let validRes = false
      this.$refs[this.SrmValueRegioRef].validate(valid => {
        validRes = valid
      })
      return validRes
    },
    validateMin(rule, value, callback) {
      const one = Number(value)
      const max = Number(this.valueForm.max)
      if (!max || one <= max) {
        return callback()
      }
      const errorMsg = this.errorMessage.length ? this.errorMessage[0] : `输入值不得大于${max}`
      return callback(new Error(errorMsg))
    },
    validateMax(rule, value, callback) {
      const one = Number(value)
      const min = Number(this.valueForm.min)
      if (!min || one >= min) {
        return callback()
      }
      const errorMsg = this.errorMessage[1] ? this.errorMessage[1] : `输入值不得小于${min}`
      return callback(new Error(errorMsg))
    }
  }
}
</script>
<style lang="scss" scoped>
  .value-regio-item{
    margin-bottom: 0;
  }
</style>
