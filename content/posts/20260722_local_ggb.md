---
title: " 范例：发布本地的GGB"
date: 2026-07-22
draft: false
math: true

---


1.创建短代码文件（一次性创建即可，以后所有 GGB 都能用）

在你的博客根目录下，新建文件 layouts/shortcodes/ggb.html（如果文件夹不存在就手动创建）：
```
<iframe 
    src="{{ .Get "src" }}"
    width="100%"
    height="{{ .Get "height" | default "550" }}"
    frameborder="0"
    allowfullscreen
    sandbox="allow-same-origin allow-scripts allow-popups allow-forms">
</iframe>
```
调用示例

<!-- 使用默认高度 550 -->
【把本行中2对中括号改为大括号】     [[< ggb src="/ggb/yuanzhuzhankai.html?embed" >]]      

<!-- 单独设置高度 700 -->
【把本行中2对中括号改为大括号】     [[< ggb src="/ggb/yuanzhuzhankai.html?embed" height="700" >]]

2.修改你的 Markdown 文章
把原来的 iframe 代码，换成调用短代码的方式：

我们来发布本地的“圆柱展开的GGB”

<!-- 使用默认高度 550 -->
【把本行中2对中括号改为大括号】     [[< ggb src="/ggb/yuanzhuzhankai.html?embed" >]]

<!-- 单独设置高度 300 -->
【把本行中2对中括号改为大括号】     [[< ggb src="/ggb/yuanzhuzhankai.html?embed" height="300" >]]

下面是显示效果：

<!-- 使用默认高度 550 -->

-- 使用默认高度 550 --

{{< ggb src="/ggb/yuanzhuzhankai.html?embed" >}}

<!-- 单独设置高度 300 -->

-- 单独设置高度 300 --

{{< ggb src="/ggb/yuanzhuzhankai.html?embed" height="300" >}}

3.重启 Hugo 服务

cd /d D:=SYSFLODERS=\Desktop\xucg.github.io
hugo server -D --gc

刷新文章页面，现在短代码会直接渲染 iframe，不会被主题过滤。