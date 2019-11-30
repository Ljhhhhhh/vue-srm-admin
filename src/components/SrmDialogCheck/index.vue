<template>
  <el-dialog
    :title="title"
    :visible="visible"
    :width="width"
    :show-close="false"
    class="srm-dialog_body"
  >
    <div class="dialog-content">
      <i class="el-icon-warning" />
      <span>{{ content }}</span>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleDialog(false)">取消</el-button>
      <el-button type="primary" @click="handleDialog(true)">确定</el-button>
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
    // eslint-disable-next-line
    currentItem: {
      required: true
    },
    content: {
      type: String,
      default: '是否确定继续此操作'
    },
    width: {
      type: String,
      default: '350px'
    }
  },
  data() {
    return {
      visible: false
    }
  },
  watch: {
    currentItem: {
      handler: function(val) {
        if (val !== null && val !== undefined) {
          this.visible = true
        } else {
          this.visible = false
        }
      },
      deep: true
    }
  },
  methods: {
    handleDialog(check) {
      if (check) {
        this.$emit('confirmItem', this.currentItem)
      }
      this.$emit('update:currentItem', null)
    }
  }
}
</script>
<style lang="scss" scoped>
.srm-dialog_body /deep/ .el-dialog__body{
  padding: 10px 20px;
}
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
