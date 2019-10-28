<template>
  <span class="srm-upload_container">
    <el-upload
      v-if="!$attrs.multiple"
      class="image-uploader"
      action="http://192.168.10.181:30006/oss/upload"
      :show-file-list="false"
      :on-success="uploadSuccess"
      :before-upload="beforeUpload"
      :headers="headers"
      v-bind="$attrs"
    >
      <div class="upload-wrap" :style="imgStyle">
        <img
          v-if="src"
          :src="src"
          class="avatar"
        >
        <i
          v-else
          class="el-icon-plus avatar-uploader-icon"
        />
      </div>
    </el-upload>
    <el-upload
      v-else
      :on-success="uploadSuccess"
      :before-upload="beforeUpload"
      :headers="headers"
      v-bind="$attrs"
      :file-list="fileList"
      action="http://192.168.10.181:30006/oss/upload"
      list-type="picture-card"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
    >
      <!-- <div class="upload-wrap">
        <i
          class="el-icon-plus"
        />
      </div> -->
      <i class="el-icon-plus" />
    </el-upload>
    <div
      v-if="showMsg"
      class="el-upload__tip"
    >只能上传{{ ext }}文件，且不超过{{ maxSizeWithUnit }}</div>
    <ImagePreview :current-img.sync="previewSrc" />
  </span>
</template>
<script>
import setting from '@/settings'
import ImagePreview from '@/components/ImagePreview'
export default {
  name: 'SrmUpload',
  components: {
    ImagePreview
  },
  model: {
    prop: 'imageUrl',
    event: 'update'
  },
  props: {
    ext: {
      type: String,
      default: '.jpg,.png'
    },
    maxSize: {
      type: Number,
      default: 2048
    },
    imageUrl: {
      type: [String, Array],
      default: ''
    },
    imgStyle: {
      type: Object,
      default: () => {}
    },
    showMsg: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      headers: {
        platform: setting.platform
      },
      src: '',
      previewSrc: '',
      fileList: []
    }
  },
  computed: {
    // fileList() {
    //   if (this.$attrs.multiple && Array.isArray(this.src)) {
    //     return this.src.map((item, idx) => ({
    //       name: idx,
    //       url: item
    //     }))
    //   }
    //   return []
    // },
    maxSizeWithUnit() {
      if (this.maxSize > 1024) {
        return (this.maxSize / 1024).toFixed(2) + 'MB'
      }
      return this.maxSize + 'KB'
    }
  },
  // watch: {
  //   'imageUrl': {
  //     handler: function() {
  //       const src = this.imageUrl || this.$attrs.value
  //       if (this.$attrs.multiple) {
  //         // const newSrc = Array.isArray(src) ? src : src ? [src] : []
  //         this.src = Array.isArray(src) ? src : src ? [src] : []
  //       } else {
  //         this.src = src
  //       }
  //     },
  //     immediate: true
  //   }
  // },
  mounted() {
    const src = this.imageUrl || this.$attrs.value
    if (this.$attrs.multiple) {
      // const newSrc = Array.isArray(src) ? src : src ? [src] : []
      this.src = Array.isArray(src) ? src : src ? [src] : []
    } else {
      this.src = src
    }
    if (this.$attrs.multiple && Array.isArray(this.src)) {
      this.fileList = this.src.map((item, idx) => ({
        name: idx,
        url: item
      }))
    } else {
      this.fileList = []
    }
  },
  methods: {
    handlePictureCardPreview(src) {
      this.previewSrc = src.url
    },
    handleRemove(file, fileList) {
      this.src = fileList.map(item => item.response.data.filePath)
      this.$emit('update', this.src)
    },
    beforeUpload: function(file) {
      const ext = this.ext
      const maxSize = this.maxSize
      const isOkExt = ext.indexOf(file.name.substring(file.name.lastIndexOf('.'))) >= 0
      if (!isOkExt) {
        this.$message.error('只能上传' + ext + '格式的文件')
        return false
      }
      const isLtmaxWidth = file.size / 1024 < maxSize
      if (!isLtmaxWidth) {
        this.$message.error('上传文件大小不能超过' + maxSize + 'KB!')
        return false
      }
      return true
    },
    uploadSuccess(response, file, fileList) {
      if (this.$attrs.multiple) {
        const flag = fileList.every(item => item.response)
        if (flag) {
          this.src = fileList.map(item => {
            if (item.response) {
              return item.response.data.filePath
            }
          })
        }
      } else {
        const newUrl = response.data.filePath
        this.src = newUrl
      }
      this.$emit('update', this.src)
    }
  }
}

</script>
<style lang="scss" scoped>
.image-uploader /deep/ {
  .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    line-height: 1;
    font-size: 0;
  }
  // .avatar-uploader-icon {
  //   font-size: 28px;
  //   color: #8c939d;
  //   width: 120px;
  //   height: 120px;
  //   line-height: 120px;
  //   text-align: center;
  // }
}
.srm-upload_container /deep/ {
  .upload-wrap{
    width: 120px;
    height: 120px;
    i, img {
      display: block;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 28px;
      color: #8c939d;
    }
  }
}

</style>
