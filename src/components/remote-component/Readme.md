# 异步加载远端组件

该组件用于从指定url异步加载远端组件

作者：liang.shan@zhaopin.com.cn

<vuep template="#example"></vuep>

<script v-pre type="text/x-template" id="example">
  <template>
    <div>Hello, {{ name }}!</div>
    <remote-component
        url="https://static.dei2.com/experience/Greeting.vue">
      <div slot="loading"
           style="width: 24px; height: 24px;">
        <img src="https://static.dei2.com/experience/loading.gif"
             alt="loading"
             style="width: 24px; height: 24px;">
      </div>
    </remote-component>
  </template>

  <script>
    module.exports = {
      data: function () {
        return { name: 'Vue' }
      }
    }
  </script>
</script>


## 使用方法
```html
<template>
    <remote-component
        url="https://static.dei2.com/experience/Greeting.vue"
        @success="successHandler"
        @error="errorHandler">
      <div slot="loading"
           style="width: 24px; height: 24px;">
        <img src="https://static.dei2.com/experience/loading.gif"
             alt="loading"
             style="width: 24px; height: 24px;">
      </div>
    </remote-component>
</template>

<script>
export default {
    methods: {
        // 加载完成回调
        successHandler ( data ) {
            // ...
        },
        errorHandler ( err ) {
            console.error( err.message )
            // ...
        }
    }
}
</script>
```

## props 属性
<table>
    <tr>
        <th>属性</th>
        <th>说明</th>
        <th>类型</th>
        <th>默认值</th>
        <th>是否必填</th>
        <th>备注</th>
    </tr>
    <tr>
        <td>url</td>
        <td>远端组件路径</td>
        <td>String</td>
        <td>-</td>
        <td>是</td>
        <td></td>
    </tr>
    <tr>
        <td>proxy</td>
        <td>AJAX代理</td>
        <td>Object</td>
        <td>
            <span>{</span><br>
            <span style="margin-left: 20px;">url: '', // 代理接口路径</span><br>
            <span style="margin-left: 20px;">method: 'POST' // 请求method</span><br>
            <span style="margin-left: 20px;">data: { } // 请求参数</span><br>
            <span>}</span>
        </td>
        <td>是</td>
        <td style="width: 200px;">
            <span style="font-size: 12px; color: #ff9900;">远端组件可能不支持跨域访问，需要提供一个代理接口来访问跨域组件</span><br>
        </td>
    </tr>
</table>

## events 事件
<table>
    <tr>
        <th>事件名</th>
        <th>说明</th>
        <th>返回值</th>
    </tr>
    <tr>
        <td>success</td>
        <td>加载成功回调事件</td>
        <td>
            <span>{</span><br>
            <span style="margin-left: 20px;">url: REMOTE_COMPONENT_URL, // 组件路径</span><br>
            <span style="margin-left: 20px;">id: COMPONENT_ID, // 组件ID</span><br>
            <span style="margin-left: 20px;">message: SUCCESS_MSG,</span><br>
            <span style="margin-left: 20px;">componentData: RESPONSE_COMPONENT_DATA // 组件DATA</span><br>
            <span>}</span>
        </td>
    </tr>
    <tr>
        <td>error</td>
        <td>下载失败回调事件</td>
        <td>
            <span>{</span><br>
            <span style="margin-left: 20px;">url: REMOTE_COMPONENT_URL, // 组件路径</span><br>
            <span style="margin-left: 20px;">id: COMPONENT_ID, // 组件ID</span><br>
            <span style="margin-left: 20px;">message: ERROR_MSG,</span><br>
            <span style="margin-left: 20px;">componentData: RESPONSE_COMPONENT_DATA // 组件DATA，加载异常时为null</span><br>
            <span>}</span>
        </td>
    </tr>
</table>

## slot 插槽
<table>
    <tr>
        <th>名称</th>
        <th>说明</th>
    </tr>
    <tr>
        <td>loading</td>
        <td>组件加载时的loading</td>
    </tr>
</table>
