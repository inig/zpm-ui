<template>
  <div class="remote-component-container"
       :style="containerStyles">
    <component :is="currentView"
               v-bind="$props"
               :style="{opacity: componentLoaded ? 1 : 0}"></component>
    <div class="remote-loading"
         v-if="!componentLoaded">
      <slot name="loading"></slot>
    </div>
  </div>
</template>

<style scoped>
.remote-component-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.remote-component-container > div {
  transition: all 0.3s ease-in-out;
}
.remote-loading {
  position: absolute;
}
</style>

<script>
import axios from 'axios'
import qs from 'querystring'
export default {
  name: 'RemoteComponent',
  props: {
    url: {
      type: String,
      default: ''
    },
    width: {
      type: [String, Number]
    },
    height: {
      type: [String, Number]
    },
    proxy: {
      type: Object,
      default () {
        return {
          url: 'http://127.0.0.1:3000/Zpm/cli/ajax',
          method: 'POST'
        }
      }
    }
  },
  data () {
    return {
      responseData: null,
      comId: '',
      componentLoaded: false
    }
  },
  computed: {
    containerStyles () {
      return this.componentLoaded ? {} : {
        width: this.width + 'px',
        height: this.height + 'px'
      }
    },
    currentView () {
      if (!this.responseData) return { template: '<div class="remoteInfo">正在加载中。。。</div>' }
      const tplData = this.resolveStr(this.responseData)

      // eslint-disable-next-line
      let ponentObj = tplData.scripts ? (new Function(`return ${tplData.scripts.slice(tplData.scripts.indexOf('{'), tplData.scripts.lastIndexOf('}') + 1)}`)()) : {}
      ponentObj.template = tplData.templates
      this.$el.setAttribute('class', `remote-component-container remote css${this.cssId}`)
      if (!document.querySelector(`style[id=css${this.cssId}]`)) { // 防止重复创建
        let cssStr = `
                    ${tplData.styles}
                `
        this.resolveCss(cssStr)
      }
      return ponentObj
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    getId () {
      var d = new Date().getTime()
      var uid = 'xxxxxxxx-4xxx-yxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0
        d = Math.floor(d / 16)
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16)
      })
      return uid
    },
    resolveCss (css) {
      let style = document.createElement('style')
      style.setAttribute('type', 'text/css')
      style.setAttribute('id', 'css' + this.cssId)
      if (style.styleSheet) {
        // IE
        style.styleSheet.cssText = css
      } else { // w3c
        var cssText = document.createTextNode(css)
        style.appendChild(cssText)
      }
      var heads = document.getElementsByTagName('head')
      if (heads.length) {
        heads[0].appendChild(style)
      } else {
        document.documentElement.appendChild(style)
      }
      // less.render(lessInput).then(function (output) {
      //   let style = document.createElement('style')
      //   style.setAttribute('type', 'text/css')
      //   style.setAttribute('id', 'css' + this.cssId)
      //   if (style.styleSheet) {
      //     // IE
      //     style.styleSheet.cssText = output.css
      //   } else { // w3c
      //     var cssText = document.createTextNode(output.css)
      //     style.appendChild(cssText)
      //   }
      //   var heads = document.getElementsByTagName('head')
      //   if (heads.length) {
      //     heads[0].appendChild(style)
      //   } else {
      //     document.documentElement.appendChild(style)
      //   }
      // }.bind(this))
    },
    resolveStr (str) {
      return {
        templates: str.match(/<template>/) ? str.match(/<template>([\s\S]*)<\/template>/)[1] : '',
        scripts: str.match(/<script.*>/) ? str.match(/<script.*>([\s\S]*)<\/script>/)[1] : '',
        styles: str.match(/<style.*>/) ? str.match(/<style.*>([\s\S]*)<\/style>/)[1] : ''
      }
    },
    async getData () {
      this.componentLoaded = false
      if (!this.url) {
        this.componentLoaded = true
        this.responseData = '<template><p></p></template>'
        this.$emit('error', {
          url: this.url,
          id: this.cssId,
          message: 'url不能为空',
          componentData: null
        })
      } else {
        await axios({
          method: this.proxy.method || 'POST',
          url: this.proxy.url || 'http://127.0.0.1:3000/Zpm/cli/ajax',
          data: qs.stringify(Object.assign({
            url: this.url,
            method: 'get'
          }, this.proxy.data || {}))
        }).catch(() => {
          this.responseData = '<template><p></p></template>'
          this.componentLoaded = true
          this.$emit('error', {
            url: this.url,
            id: this.cssId,
            message: '组件加载失败',
            componentData: null
          })
        }).then(res => {
          if (res.data.status === 200) {
            this.cssId = this.getId()
            this.responseData = res.data.data
            this.$emit('success', {
              url: this.url,
              id: this.cssId,
              message: '成功',
              componentData: res.data.data
            })
          } else {
            this.responseData = '<template><p></p></template>'
            this.$emit('error', {
              url: this.url,
              id: this.cssId,
              message: '组件加载失败',
              componentData: res.data.data
            })
          }
          setTimeout(() => {
            this.componentLoaded = true
          }, 500)
        })
      }
      // this.$store.dispatch('doAction', {
      //   event: 'addRemote',
      //   data: { url: this.url, cssId: this.cssId, responseData: this.responseData }
      // })
    }
  },
  watch: {
    url () {
      this.getData()
    }
  }
}
</script>
