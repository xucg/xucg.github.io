---
title: " 发帖测试发布本地的GGB"
date: 2026-07-22
draft: false
math: true

---

这是一篇示例文章，用来测试发布本地的GGB

创建短代码文件
在你的博客根目录下，新建文件 layouts/shortcodes/ggb.html（如果文件夹不存在就手动创建）：
html
预览
<iframe src="{{ .Get 0 }}" 
        width="100%" 
        height="550" 
        frameborder="0" 
        allowfullscreen 
        sandbox="allow-same-origin allow-scripts allow-popups allow-forms">
</iframe>
修改你的 Markdown 文章
把原来的 iframe 代码，换成调用短代码的方式：
markdown
---
title: "发帖测试发布本地的GGB"
date: 2026-07-22
draft: false
math: true
---

这是一篇示例文章，用来测试发布本地的GGB

{{< ggb "/ggb/yuanzhuzhankai.html" >}}

重启 Hugo 服务
cmd
cd /d D:\=SYSFLODERS=\Desktop\xucg.github.io
hugo server -D
刷新文章页面


{{< ggb "/ggb/yuanzhuzhankai.html" >}}

下面是 GeoGebra 演示窗口。之后写文章时，只需要替换 `id` 即可：
{{< geogebra id="Mzc3N2Vw" width="100%" height="520" >}}

写作建议：行内公式优先使用 `\(...\)`，块级公式优先使用 `\[...\]`，这样比 `$...$` 更不容易和普通文本冲突。

