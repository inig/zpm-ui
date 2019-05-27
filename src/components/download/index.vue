<template lang="pug">
  .download(onselectstart="return false" @click="downloadResuorce" )
    <slot>
      button(:class="className"
          zp-stat-id="down_cv_click"
          zp-stat-track="down_cv_click") {{text}}
    </slot>
</template>
<script>
import throttle from 'lodash.throttle'
import download from './download.js'

export default {
  props: {
    text: {
      type: String,
      default: '下载',
    },
    url: {
      type: String,
      default: '',
    },
    suffix: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: '',
    },
    className: {
      type: String,
      default: '',
    },
  },
  methods: {
    downloadResuorce: throttle(function () {
      if (!this.url) {
        this.$emit('error', { message: '资源路径url不能为空' })
        return false
      }

      const suffix = this.suffix ? this.suffix : (this.url.match(/\.([a-zA-Z]+)(?:[\?#]|$)/i) || [])[1]//eslint-disable-line
      if (!suffix) {
        this.$emit('error', { message: '缺少资源扩展名suffix，请明确资源类型' })
        return false
      }

      const name = this.name
        ? this.name
        : (this.url.match(/(\/.+)\/(.+)\.([a-zA-Z]+)(?:[\?#]|$)/i) || [])[2] || `${new Date()}` //eslint-disable-line

      try {
        const x = new XMLHttpRequest()
        x.onreadystatechange = (state) => {
          if (x.readyState === 4) {
            if (x.status === 200) {
              this.$emit('success', { message: '成功' })
            } else {
              this.$emit('error', { message: '失败' })
            }
          }
        }
        x.open('GET', this.url, true)
        x.responseType = 'blob'
        x.onload = (e) => { download(x.response, `${name}.${suffix}`) }
        x.send()
      } catch (err) {
        this.$emit('error', { message: err.message })
      }
    }, 1000 * 3),
  },
}
</script>
<style lang="postcss">
/** @define download; weak */
.download {
  cursor: pointer;

  & button {
    border: none;
    cursor: pointer;
    outline: none;
    background-image: linear-gradient(-270deg, #fb7574 0%, #ff4255 100%);
    border-radius: 24px;
    color: #fff;
    width: 352px;
    height: 48px;

    &:hover {
      background: #ff4255;
      color: #fff;
    }
  }
}
</style>
