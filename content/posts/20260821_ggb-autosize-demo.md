---
title: "教程：GGB 自适应宽度与高度"
date: 2026-08-21T18:30:00+08:00
draft: false
tags: ["GeoGebra"]
categories: ["发文教程"]
---

本篇用来验证 `ggb` 短代码现在的表现：**宽度 100% 铺满**，且 **高度随内容自动测量自适应**（不再用固定值）。

### 自适应高度（不写 height，由脚本自动测量）

{{< ggb src="/ggb/20260821_Static Settings.html?embed" >}}

### 对照：固定高度 300（会被裁切，便于对比效果）

{{< ggb src="/ggb/20260821_Static Settings.html?embed" height="300" >}}

---

本地预览：

```bash
cd /home/xucg/xucgitblog/xucg.github.io
hugo server -D --gc
```

打开本篇文章即可看到上方 iframe 自动撑满内容高度；下方固定 300 的会被裁掉一部分，对比明显。
把 `static/ggb/20260821_Static Settings.html` 替换成你真实的 GeoGebra 导出文件即可上线。
