# 下载组件

该组件用于从指定url下载资源,可用于下载pdf、json、html、各种格式的图片等

作者：zhuping.yuan@zhaopin.com.cn

## 使用方法
```html
<template>
    <download text="导出模板"
          url="https://img09.zhaopin.cn/2012/other/mobile/weex/province.json"
          suffix="json"
          name="省份数据"
          className="download-btn"
          @success="successHandler"
          @error="errorHandler">
    </download>
</template>

<script>
export default {
    methods: {
        // 下载完成回调
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

<style lang="postcss">
.download .download-btn {
    // 需要添加 .download 提高优先级
    // ...
}
</style>
```


## props 属性
<table>
    <tr>
        <th>属性</th>
        <th>说明</th>
        <th>类型</th>
        <th>默认值</th>
        <th>是否必填</th>
    </tr>
        <tr>
        <td>url</td>
        <td>资源下载路径</td>
        <td>String</td>
        <td>-</td>
        <td>是</td>
    </tr>
    <tr>
        <td>text</td>
        <td>提示文案</td>
        <td>String</td>
        <td>下载</td>
        <td>否</td>
    </tr>
    <tr>
        <td>extension</td>
        <td>资源扩展名</td>
        <td>String</td>
        <td>若没有则会从资源路径上取</td>
        <td>否</td>
    </tr>
    <tr>
        <td>name</td>
        <td>资源名称</td>
        <td>String</td>
        <td>若没有则会从资源路径上取文件名</td>
        <td>否</td>
    </tr>
    <tr>
        <td>className</td>
        <td>资源下载路径</td>
        <td>String</td>
        <td>样式重写的样式名称，需要在定义前加.download </td>
        <td>否</td>
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
        <td>下载成功回调事件</td>
        <td>{ message: SUCCESS_MSG }</td>
    </tr>
    <tr>
        <td>error</td>
        <td>下载失败回调事件</td>
        <td>{ message: ERROR_MSG }</td>
    </tr>
</table>

## slot 插槽
<table>
    <tr>
        <th>名称</th>
        <th>说明</th>
    </tr>
    <tr>
        <td>默认插槽</td>
        <td>自定义显示内容</td>
    </tr>
</table>

