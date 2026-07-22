---
title: " 范例：发布本地的GGB"
date: 2026-07-22
draft: false
math: true

---

1.创建短代码文件（这是一次性的，有就可以了）
在你的博客根目录下，新建文件 layouts/shortcodes/ggb.html（如果文件夹不存在就手动创建）：

```
<iframe src="{{ .Get 0 }}" 
        width="100%" 
        height="550" 
        frameborder="0" 
        allowfullscreen 
        sandbox="allow-same-origin allow-scripts allow-popups allow-forms">
</iframe>
```

2.修改你的 Markdown 文章
把原来的 iframe 代码，换成调用短代码的方式：
```
---
title: "范例：发布本地的GG"
date: 2026-07-22
draft: false
math: true
---

这是一篇示例文章，用来测试发布本地的GGB
[[< ggb "/ggb/yuanzhuzhankai.html" >]]      【把本行2对中括号换成大括号】
```

3.重启 Hugo 服务
```
cd /d D:\=SYSFLODERS=\Desktop\xucg.github.io
hugo server -D --gc
```
刷新文章页面，现在短代码会直接渲染 iframe，不会被主题过滤。

{{< ggb "/ggb/yuanzhuzhankai.html" >}}