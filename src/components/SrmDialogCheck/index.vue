<template>
  <el-dialog
    :title="title"
    :visible.sync="visible"
    :width="width"
    :show-close="false"
  >
    <div class="dialog-content">
      <i class="el-icon-warning" />
      <span>{{ content }}</span>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleDialog(false)">取 消</el-button>
      <el-button type="primary" @click="handleDialog(true)">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  name: 'SrmDialogCheck',
  props: {
    title: {
      type: String,
      default: '提示'
    },
    content: {
      type: String,
      default: '是否确定继续此操作'
    },
    width: {
      type: String,
      default: '350px'
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleDialog(check) {
      this.$emit('update:visible', false)
      if (check) {
        this.$emit('handleDialog', check)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.dialog-content{
  display: flex;
  align-items: center;
  justify-content: flex-start;
  i{
    color: #E6A23C;
    font-size: 1.5em;
    margin-right: 5px;
  }
}
</style>
