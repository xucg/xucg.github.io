---
title: "勾股定理公式写法"
date: 2026-07-19
draft: false
math: true
tags: ["几何", "GeoGebra", "勾股定理"]
---
这是一篇示例文章，用来测试数学公式。
```
行内公式示例：直角三角形满足 \(a^2 + b^2 = c^2\)。
```
行内公式示例：直角三角形满足 \(a^2 + b^2 = c^2\)。

块级公式示例：
```
\[c = \sqrt{a^2 + b^2}\]
```
\[c = \sqrt{a^2 + b^2}\]
```
\[c = \sqrt{a^2 + b^2},a^2 + b^2 = c^2\]
```
\[c = \sqrt{a^2 + b^2},a^2 + b^2 = c^2\]
```
\begin{aligned}
a^2 + b^2 = c^2 ,c = \sqrt{a^2 + b^2}
\end{aligned}
```
\begin{aligned}
a^2 + b^2 = c^2,c = \sqrt{a^2 + b^2}
\end{aligned}

也可以写多行公式：
```
\[
\begin{aligned}
a^2 + b^2 = c^2 \\
c = \sqrt{a^2 + b^2}
\end{aligned}
\]
 在公式中直接使用 \\ 即可换行
```
\[
\begin{aligned}
a^2 + b^2 = c^2 \\
c = \sqrt{a^2 + b^2}
\end{aligned}
\]

```
\[
\begin{aligned}
a^2 + b^2 &= c^2 \\
c &= \sqrt{a^2 + b^2}
\end{aligned}
\]
 在公式中直接使用 \\ 即可换行，两个&使得2公式在=处对齐。
```
\[
\begin{aligned}
a^2 + b^2 &= c^2 \\
c &= \sqrt{a^2 + b^2}
\end{aligned}
\]


```
\[c = \sqrt{a^2 + b^2},\\ a^2 + b^2 = c^2\]  在公式中直接使用 \\ 即可换行
```
\[c = \sqrt{a^2 + b^2},\\ a^2 + b^2 = c^2\]


align：默认自动加行号

align*：无行号，和 aligned 视觉接近

aligned:属于块内对齐，包裹在` \[ \] `行间公式里，默认无公式编号，排版紧凑，适合单组多行公式，最推荐博客使用

写作建议：行内公式优先使用 `\(...\)`，块级公式优先使用 `\[...\]`，这样比 `$...$` 更不容易和普通文本冲突。

