<template>
  <el-radio-group v-bind="$attrs" :value="value" v-on="$listeners">
    <el-radio
      v-for="item in $attrs.options"
      :key="item.value"
      :label="item.value"
      :disabled="item.disabled"
    >
      {{ item.label }}
    </el-radio>
  </el-radio-group>
</template>
<script>
export default {
  name: 'SrmRadioGroup',
  props: {
    value: {
      type: [String, Number],
      default: ''
    }
  },
  data() {
    return {}
  }
}
</script>
