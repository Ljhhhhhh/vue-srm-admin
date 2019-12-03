<template>
  <el-dialog
    :visible="!!currentImg"
    :before-close="close"
    :width="width"
  >
    <img :src="currentImg" alt="img" width="100%">

  </el-dialog>
</template>
<script>
export default {
  props: {
    width: {
      type: String,
      default: '50%'
    },
    currentImg: {
      type: String,
      required: true
    }
  },
  computed: {
    imageList() {
      if (this.currentImg) {
        return [this.currentImg]
      }
      return []
    }
  },
  methods: {
    close() {
      this.$emit('update:currentImg', '')
    }
  }
}
</script>
