<template>
  <el-form :model="valueForm" :inline="true" :rules="rules" size="small" style="display: inline">
    <el-form-item :label="label" prop="valueStart">
      <el-input v-model.number="valueForm.valueStart" clearable>
        <span v-if="icon" slot="suffix" class="el-input__icon" :class="icon" />
        <span v-if="unit" slot="suffix">{{ unit }}</span>
      </el-input>
    </el-form-item>
    <el-form-item label="—" prop="valueEnd">
      <el-input v-model.number="valueForm.valueEnd" clearable>
        <span v-if="icon" slot="suffix" class="el-input__icon" :class="icon" />
        <span v-if="unit" slot="suffix">{{ unit }}</span>
      </el-input>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  name: 'ValueRegio',
  props: {
    valueArr: {
      type: Array,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    errorMessage: {
      type: Array,
      default: () => ['起始值不能大于结束值', '结束值不能小于起始值']
    },
    icon: {
      type: String,
      default: ''
    },
    unit: {
      type: String,
      default: ''
    }
  },
  data() {
    const validatorStart = (rule, value, callback) => {
      if (this.valueForm.valueEnd && value > this.valueForm.valueEnd) {
        callback(this.errorMessage[0])
      }
      callback()
    }
    const validatorEnd = (rule, value, callback) => {
      if (this.valueForm.valueStart && value < this.valueForm.valueStart) {
        callback(this.errorMessage[1])
      }
      callback()
    }
    return {
      valueForm: {
        valueStart: null,
        valueEnd: null
      },
      rules: {
        valueStart: [
          { validator: validatorStart, trigger: 'blur' }
        ],
        valueEnd: [
          { validator: validatorEnd, trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    valueForm: {
      handler: function(newVal) {
        const { valueStart, valueEnd } = newVal
        this.$emit('update:valueArr', [valueStart, valueEnd])
      },
      deep: true
    }
  },
  mounted() {
    this.valueForm = {
      valueStart: this.valueArr[0],
      valueEnd: this.valueArr[1]
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
