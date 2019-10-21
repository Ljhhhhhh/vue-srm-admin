export default {
  activated() {
    if (this.$route.params.refresh && typeof this.getList === 'function') {
      this.getList()
    }
  }
}
