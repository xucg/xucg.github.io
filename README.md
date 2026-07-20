# 数学与几何博客

这是一个基于 Hugo + PaperMod 的数学博客模板，已配置：

- PaperMod 主题
- MathJax 数学公式渲染
- GeoGebra 短代码
- GitHub Pages 自动部署工作流
- 便携版 Hugo，无需系统全局安装

## 本地预览

在 PowerShell 中进入本目录，运行：

```powershell
.\serve.ps1
```

然后打开：

```text
http://localhost:1313/
```

## 构建静态文件

```powershell
.\build.ps1
```

构建结果会输出到 `public/` 目录。

## 写文章

文章放在：

```text
content/posts/
```

可复制 `content/posts/pythagorean-ggb-demo.md` 作为模板。

## 数学公式

推荐写法：

```md
行内公式：\(a^2 + b^2 = c^2\)

块级公式：

\[
c = \sqrt{a^2 + b^2}
\]
```

不优先推荐 `$...$`，因为它容易和普通美元符号冲突。

## GeoGebra

文章中使用：

```md
{{< geogebra id="Mzc3N2Vw" width="100%" height="520" >}}
```

把 `id` 替换成 GeoGebra 分享链接里的材料 ID 即可。

## GitHub Pages

仓库已包含：

```text
.github/workflows/deploy.yml
```

推送到 GitHub 后，在仓库 Settings → Pages 中选择 GitHub Actions 部署。

## Cloudflare Pages

以后迁移到 Cloudflare Pages 时，连接同一个 GitHub 仓库，使用：

```text
Build command: hugo --gc --minify
Build output directory: public
Environment variable: HUGO_VERSION=0.164.0
```

如果需要预览部署 URL 自动作为 baseURL，可使用：

```text
hugo --gc --minify -b $CF_PAGES_URL
```
