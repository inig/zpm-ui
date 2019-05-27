# 下载组件

该指令用于img标签，当img图片资源下载失败或者出错时，会默认加载显示自定义的图片，要求传入自定义的图片路径，否则会报错

作者：zhuping.yuan@zhaopin.com.cn

## 使用示例
```html
<template>
    <img src="http://desktop-bucket.zhaopin.cn/pre/assets/1-resume.a3759d.png"
         v-image="'http://desktop-bucket.zhaopin.cn/pre/assets/3-miniprogram-qrcode.35c2b4.jpg'">
         <!-- 注意：需要传入字符串 -->
    <img src="http://desktop-bucket.zhaopin.cn/pre/assets/1-resume.a3759d.png"
         v-image="require(common/images/pdf.png)">
         <!-- 注意：使用项目中的图片资源用requre() -->
</template>

<script>
import {image} from 'common/directives'
export default {
    directives:{
      image
    }
}
</script>
```


## 导入方法 & 定义指令
```js
// 按需导入
import {image} from 'common/directives'
export default {
    directives:{
      image
    }
}

// 全部导入
import * as myDirectives from 'common/directives'
export default {
    directives:myDirectives
}
```


## props    
<table>
    <tr>
        <th>指令</th>
        <th>说明</th>
        <th>类型</th>
        <th>默认值</th>
        <th>是否必填</th>
    </tr>
        <tr>
        <td>v-image</td>
        <td>图片下载失败时 显示自定义的默认图</td>
        <td>String</td>
        <td>-</td>
        <td>是</td>
    </tr>
</table>
