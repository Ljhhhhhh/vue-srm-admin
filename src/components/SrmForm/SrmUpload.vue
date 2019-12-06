<template>
  <span class="srm-upload_container">
    <el-upload
      v-if="!$attrs.multiple"
      class="image-uploader"
      :action="action"
      :show-file-list="showFileList"
      :on-success="uploadSuccess"
      :before-upload="beforeUpload"
      v-bind="$attrs"
    >
      <div class="upload-wrap" :style="imgStyle">
        <component :is="$attrs['is-video'] ? 'video' : 'img'" v-if="src" class="avatar" :src="src" />
        <i
          v-else
          class="el-icon-plus avatar-uploader-icon"
        />
      </div>
    </el-upload>
    <!--
      :on-success="uploadSuccess"
     -->
    <el-upload
      v-else
      :before-upload="beforeUpload"
      v-bind="$attrs"
      :file-list="fileList"
      :action="action"
      list-type="picture-card"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :on-exceed="onExceed"
      :on-change="changeImg"
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
    >只能上传{{ ext }}文件，且不超过{{ maxSizeWithUnit }} <span v-if="$attrs.limit">最多上传{{ $attrs.limit }}张</span> </div>
    <ImagePreview :current-img.sync="previewSrc" />
  </span>
</template>
<script>
import ImagePreview from '@/components/ImagePreview'
import { uploadAction } from 'api/upload'
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
      default: 5 * 1024
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
    },
    showFileList: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      action: uploadAction,
      init: false,
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
  watch: {
    'imageUrl': {
      handler: 'getSrc',
      immediate: true
    }
  },
  methods: {
    getSrc() {
      const src = this.imageUrl || this.$attrs.value
      if (this.$attrs.multiple) {
        this.src = Array.isArray(src) ? src : src ? [src] : []
      } else {
        this.src = src
      }
      if (this.init) return
      if (this.$attrs.multiple && Array.isArray(this.src)) {
        this.src.map((src, idx) => {
          if (!this.fileList.find(v => v.url === src)) {
            this.fileList.push({
              name: idx,
              url: src
            })
          }
        })
      } else {
        this.fileList = []
      }
    },
    onExceed(files) {
      this.$message({
        message: `最多上传${this.$attrs.limit}张图片`,
        type: 'warning'
      })
    },
    handlePictureCardPreview(src) {
      this.previewSrc = src.url
    },
    handleRemove(file, fileList) {
      this.src = fileList.map(item => item.url || item.data)
      this.$emit('update', this.src)
    },
    beforeUpload: function(file) {
      this.init = true // 标志位
      const ext = this.ext
      const maxSize = this.maxSize
      const isOkExt = ext.indexOf(file.name.substring(file.name.lastIndexOf('.')).toLocaleLowerCase()) >= 0
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
    changeImg(file, fileList) {
      const flag = fileList.every(img => {
        return img.response || img.url.startsWith('https://')
      })
      if (flag) {
        const src = fileList.map(img => img.data || img.url)
        this.$emit('update', src)
      }
    },
    uploadSuccess(response, file, fileList) {
      if (this.$attrs.multiple) {
        // const oldList = [...this.src]
        // const list = fileList.filter(item => item.response)
        // if (list.length) {
        //   const newList = list.map(item => {
        //     return item.response.data.filePath
        //   })
        //   this.src = Array.from(new Set(oldList.concat(newList)))
        //   // this.src.push(newList)
        // }
      } else {
        const newUrl = response.data
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
    i, img, video {
      display: block;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 28px;
      color: #8c939d;
    }
    i{
      width: 120px;
      height: 120px;
    }
  }
}

</style>
