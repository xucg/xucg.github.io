# 老徐数学博客

基于 **Hugo + Blowfish** 的数学 / 几何教学博客，支持 KaTeX 数学公式与 GeoGebra 演示短代码。

- 主题：Blowfish（通过 Hugo Modules 引入，见 `go.mod`，当前锁定 v2.104.0）
- 公式渲染：KaTeX（Blowfish 内置）
- 部署：GitHub Pages（Actions 自动构建）+ Cloudflare Pages 双线
- 仓库刻意保持精简：`themes/`、`public/`、`tools/`（本地 Hugo）均不进版本库

## 目录结构（需要维护的部分）

```
config/      站点与主题配置（你主要改这里）
content/     文章（content/posts/）
layouts/     你对 Blowfish 的覆盖（single / footer / home / shortcodes …）
assets/      自定义样式 / 脚本
i18n/        中文文案
archetypes/  文章模板
static/      静态资源
.github/     GitHub Pages 部署工作流
go.mod       主题版本锁定（Hugo Modules）
```

> 你修改过的代码都在 `layouts/`、`config/`、`assets/`、`i18n/`，与 Blowfish 主题完全分离。
> 升级主题只需 `hugo mod get -u ./...`（或改 `go.mod` 里的版本号），不会动到你的代码。

## 本地预览

需要先有 Hugo（扩展版，>= 0.164.0）：

- 方式 A：全局安装 Hugo 后直接 `hugo server`
- 方式 B：把 `hugo.exe` 放到 `tools/hugo/hugo.exe`（被 gitignore，不进仓库），再运行：

```powershell
.\serve.ps1
```

首次运行会自动通过 Hugo Modules 拉取 Blowfish 主题（需联网）。
预览地址：http://localhost:1313/

## 构建静态文件

```powershell
.\build.ps1
```

或直接 `hugo --gc --minify`，结果输出到 `public/`（gitignore，不进仓库）。

## 写文章

文章放在 `content/posts/`，可复制现有 `.md` 作模板。

## 私密文章（密码保护）

把不想公开、需输密码才能看的文章放在 `content/private/`，并在 front matter 加 `hidden: true`：

```md
---
title: "标题"
date: 2026-07-30T08:00:00+08:00
draft: false
hidden: true
---

正文……
```

- 构建时用 [staticrypt](https://github.com/robinmoisson/staticrypt) 把 `public/private/<slug>/index.html` 加密成「输密码才能看」的页面；GitHub Pages 与 Cloudflare Pages 通用。
- 该文章**不会**出现在首页、文章列表、RSS、sitemap 中（`hidden: true` + 自定义 `layouts/sitemap.xml` 已排除 `private` 区与 `hidden` 页）。

**密码设置（优先级从上到下）：**

1. 环境变量 `PROTECTED_PASSWORD`（CI 推荐）。
2. 仓库根放 `.protected-password` 文件（一行密码，已 gitignore；可复制 `.protected-password.example`）。
3. 都不设 → 跳过加密，私密文章保持**明文**（方便本地预览时不设密码也能看）。

**双线部署要填的密码：**

- GitHub Pages：仓库 Settings → Secrets and variables → Actions → 新建 `PROTECTED_PASSWORD`（deploy.yml 已读取该密钥）。
- Cloudflare Pages：控制台 build 设置加环境变量 `PROTECTED_PASSWORD`（构建命令已改为 `npm run build`）。

> 注意：客户端加密只是「隐藏明文」，加密数据和解密脚本都在网页里，懂技术的人仍可扒源码暴力破解，**别放真机密**。加密文章里的 KaTeX 公式在解密后可能不自动渲染（纯文本 / 图片不受影响）。

## 数学公式（KaTeX）

```md
行内公式：\(a^2 + b^2 = c^2\)

块级公式：

\[
c = \sqrt{a^2 + b^2}
\]
```

不优先推荐 `$...$`，因为它容易和普通美元符号冲突。

## GeoGebra

```md
{{< geogebra id="Mzc3N2Vw" width="100%" height="520" >}}
```

把 `id` 换成 GeoGebra 分享链接里的材料 ID。

## GitHub Pages

推送到 `master` 即自动构建部署（`.github/workflows/deploy.yml`）。
主题由 Hugo Modules 在构建时自动拉取，无需手动 clone。
仓库 Settings → Pages 选择 "GitHub Actions" 部署。

## Cloudflare Pages

在 Cloudflare 控制台连接同一 GitHub 仓库，构建设置：

```text
Build command: npm run build
Build output directory: public
Environment variables:
  HUGO_VERSION=0.164.0
  PROTECTED_PASSWORD=<你的私密文章密码>
```

`npm run build` = `hugo --gc --minify` + 对 `content/private/` 下文章做密码加密（见下「私密文章」）。
如需把预览部署 URL 设为 baseURL，可保留 `-b $CF_PAGES_URL`。

> 注意：构建命令已从 `hugo --minify` 改为 `npm run build`；首次部署前需在控制台设置 `PROTECTED_PASSWORD` 环境变量，否则私密文章会以明文发布。

如需把预览部署 URL 设为 baseURL：

```text
Build command: hugo --gc --minify -b $CF_PAGES_URL
```

## 部署指南（从最小备份到线上，逐步照做）

本仓库刻意保持最小：备份包**不含** `.git` / `public/` / `themes/` / `tools/` / `node_modules/`（详见 `.gitignore`）。
所以「解压即用」前，要先把它恢复成一个 Git 仓库、并装一次依赖。下面全程用 `.bat`，**双击即可**，不用记命令。

### 脚本一览（仓库根目录）

| 脚本 | 用途 |
|------|------|
| `restore_backup.bat` | 把解压出来的备份恢复成 Git 仓库并**强制推送**（更换主题 / 恢复备份时用） |
| `serve.bat` | 本地预览（**明文**草稿，不加密），开 `http://localhost:1313/` |
| `preview-private.bat` | 本地看**密码锁**效果（构建 + 加密 + 本地服务器），开 `http://localhost:8080/` |
| `deploy.bat "说明"` | 日常发布：提交并推送到 `master`，触发双线部署 |

### 0. 一次性准备：本机软件

- **Git**：你已装好。
- **Node.js（LTS）**：私密文章加密必需。没装就 `winget install OpenJS.NodeJS.LTS`，装完**重开终端**。
- **Hugo（扩展版，≥0.164.0）**：
  - 全局装：`scoop install hugo-extended` 或 `choco install hugo-extended`；或
  - 便携：把 `hugo.exe` 放到仓库 `tools/hugo/hugo.exe`（被 gitignore，不进备份，需自己放一份）。
- **Go 工具链**：Hugo Modules 拉取主题需要 `go` 二进制。
  - 便携版放 `C:\Users\XuCG\go-portable`（脚本会自动加进 PATH），或全局装 `go`。
  - 注：线上 CI（GitHub Actions / Cloudflare Pages）自带 node/go，本机装不装不影响线上构建。

### 1. 解压备份 → 恢复成工作库（双击 `restore_backup.bat`）

把 `xucg.github.io-backup-*.tar.gz` 解压到任意目录（如桌面 `xucg.github.io`）。
备份**不含 `.git`**，所以还不是 Git 仓库。双击仓库里的：

```
restore_backup.bat
```

它依次执行：`git init` → 设 `master` 分支 → 关联远程 → 提交 → 强制推送。
也就是下面这条命令链（这就是更换主题时强制推送覆盖远程的标准做法）：

```
git init
git branch -M master
git remote add origin https://github.com/xucg/xucg.github.io.git
git add -A
git commit -m "restore Blowfish theme via Hugo Modules"
git fetch origin
git push --force origin master
```

> ⚠️ **强制推送会覆盖远程**：GitHub Pages 与 Cloudflare Pages 两个线上站都会变成这个备份对应的主题。
> 旧主题的代码仍在你另一个备份包里，不会丢。

### 2. 安装依赖（仅首次）

在仓库目录运行（或双击 `preview-private.bat` 时会自动跑）：

```
npm install
```

装 `staticrypt`（私密文章加密用）。以后不用重装。

### 3. 本地写文章 / 预览（明文）

双击 `serve.bat`，浏览器开 `http://localhost:1313/`。
私密文章草稿明文预览：`http://localhost:1313/private/<slug>/`（`hidden: true` 只让它不进列表，直链可看）。

### 4. 设置私密文章密码（可选，但线上要加密就必设）

脚本找密码的优先级：**环境变量 `PROTECTED_PASSWORD` > 仓库根 `.protected-password` 文件 > 都不设则跳过加密（明文）**。

- 复制 `.protected-password.example` 为 `.protected-password`（文件名前有点的隐藏文件），第一行写密码；`#` 开头是注释会被忽略。
- 或设环境变量 `PROTECTED_PASSWORD`。

> ⚠️ **不设密码就部署 = 私密文章以明文发布！** 本地 `serve.bat` 预览不受影响（它不加密）。

**三个密码必须一致（改密码要一起改）：**
- 本地仓库根 `.protected-password` 文件；
- Cloudflare Pages 控制台环境变量 `PROTECTED_PASSWORD`；
- GitHub 仓库 Settings → Secrets → Actions 里的 `PROTECTED_PASSWORD`。
> 任一处不一致，线上解密会报"密码错误"。

**密码格式注意：**
- 建议 **≥14 位**；staticrypt 在 <14 位时会交互问 `[y/N]`，无头/CI 会卡死（脚本已加 `--short` 跳过，但长密码更安全）。
- `.protected-password` **只写一行密码**，不要带 `#` 注释行（曾经整文件被当密码导致"密码错误"），脚本会自动剥 BOM。直接复制 `.protected-password.example` 改最稳。

### 5. 本地看「密码锁」效果（和线上一致）

双击 `preview-private.bat` → 它做：检查 Node → 装依赖 → 构建 + 加密 → 起本地服务器，并**自动打开浏览器到 `http://localhost:8080/private/`**（私密文章目录页，点任意一篇输密码看正文）。`Ctrl+C` 停止。

> 重跑前先关掉**之前**的预览终端窗口：旧的 `npx serve` 会占着 8080 端口，导致新预览起不来、或看到旧内容。
> 浏览器里 `/private/` 目录页**本身不加密**（只列标题+链接），点进具体文章才是密码页——这是设计如此（见下「注意事项」）。

### 6. 部署到线上（双击 `deploy.bat`）

改完文章 / 配置后，双击：

```
deploy.bat "这次更新的说明"
```

或手动：

```
git add -A
git commit -m "更新说明"
git push origin master
```

`push` 触发双线自动构建部署：

- **GitHub Pages**：仓库 **Settings → Secrets and variables → Actions** → 新建 `PROTECTED_PASSWORD`（仅首次）。
- **Cloudflare Pages**：控制台 build 设置加环境变量 `PROTECTED_PASSWORD`（仅首次；构建命令已是 `npm run build`）。
- 验证：`https://xucg.github.io/` 与 `https://xucg.pages.dev/`。

### 7. 更换主题 / 从不同备份恢复（强制推送）

场景（常见于更换主题 / 从另一个主题的备份恢复时）：
你删掉当前库目录、把**另一个主题**的备份解压到同一位置，GitHub Desktop「添加本地存储库」时提示：

> *This directory does not appear to be a Git repository. Would you like to create a repository here instead?*

处理：直接双击 `restore_backup.bat`（即第 1 步那条命令），它会把这份新主题作为新提交**强制推送**覆盖远程；
之后在 GitHub Desktop 里也能看到并推送（若已配好 remote）。

> 若 push 被拒提示 *protected branch*，去仓库 **Settings → Branches** 临时关闭 `master` 的 force push 保护，推完再开。

## 注意事项与排错（必读）

下面这些坑都踩过，按说做能省大量时间。

### 私密文章 / 加密

- **密码长度**：staticrypt 在密码 <14 字符时会交互问 `[y/N]`，无头 / CI 环境会卡死。脚本已加 `--short` 跳过询问，但建议密码仍设 ≥14 位更安全。
- **密码三处必须一致**：本地 `.protected-password`、Cloudflare Pages 环境变量 `PROTECTED_PASSWORD`、GitHub Actions 仓库 Secret `PROTECTED_PASSWORD`。改密码要三处一起改，否则线上解密会"密码错误"。
- **`.protected-password` 文件格式**：gitignore，不在备份里。第一行写密码，不要有 `#` 注释行（脚本会忽略 # 行，但曾经整文件被当密码导致错误），脚本会自动剥 BOM。复制 `.protected-password.example` 最稳。
- **加密只覆盖"直接子目录"文章页**：`encrypt-protected.mjs` 只加密 `public/private/<slug>/index.html`，**刻意排除**目录页 `public/private/index.html` 和分页页 `public/private/page/1/index.html`。所以 `/private/` 目录页本身是**明文**（列出文章标题 + 链接），点进去才是密码页——这是设计如此，不是漏加密。
- **staticrypt 的默认输出坑（脚本已规避，了解即可）**：它默认把结果写到 `encrypted/` 子目录且只取文件名，多篇文章会互相覆盖。脚本改用 `-d` 临时目录加密、再用 `renameSync` 移回覆盖原 `index.html`。所以**不要**直接裸跑 `staticrypt`，要用 `npm run build` / `preview-private.bat`。
- **`.staticrypt.json` 固定 salt**：已提交仓库，让"记住我"跨部署生效，勿删。
- **`hidden: true` 的边界**：让文章不进首页 / 列表 / RSS / sitemap，但仍被构建并发布（URL 可直访）。**不设密码就 push = 明文发布**，务必先设密码再部署。
- **加密文章的 KaTeX**：staticrypt 用 `document.write` 解密重写，Blowfish 的 `katex-render.js` 是顶层调用，多数情况解密后公式能渲染；但加密含公式文章后**务必本地预览验证**一次。

### 本机环境

- **Node.js 必需**：`preview-private.bat` 和 `build.ps1` 的加密步骤需要 Node（本机已装 v24.18.0）。没装 → `winget install OpenJS.NodeJS.LTS`，装完**重开终端**。仅看明文草稿用 `serve.bat`，不需要 Node。
- **Go 工具链必需（本机）**：Hugo Modules 拉主题需 `go` 二进制；便携版 `C:\Users\XuCG\go-portable`（脚本自动加 PATH）或全局装。线上 CI 自带，本机装不装不影响线上。
- **端口 8080 被占**：旧的 `npx serve` 没关会占 8080，导致新预览起不来或看到旧内容。重跑 `preview-private.bat` 前先关掉之前的终端窗口。
- **git 的 `LF will be replaced by CRLF` 警告**：无害，忽略。

### 修改 `.bat` 的硬规矩（你 cmd 默认开了延迟变量扩展）

- `.bat` 必须**纯 ASCII**：中文在 GBK 代码页下会乱码，把 `&` / `|` 等拆成假命令（如 `'G' 不是内部或外部命令`）。
- 不得出现**裸 `!`**：`!` 被当变量引用，报 `此时不应有 !.`。
- `echo` 参数里**不要带括号**：`(` `)` 在某些配置下被当代码块解析。
- 改完 `.bat` 后，在终端（不是双击）跑一遍，出错能直接看到输出。

### 部署 / 双线

- **Cloudflare Pages 构建命令必须是 `npm run build`**（不是 `hugo --minify`），否则加密步骤不跑，私密文章明文发布。
- **强制推送会覆盖两个线上站**：`restore_backup.bat` / `git push --force origin master` 会把远程整个换成当前备份对应的主题；旧主题在另一个备份包里不丢。若被拒 *protected branch*，去仓库 Settings → Branches 临时关 `master` 的 force push 保护。
- **Blowfish v2.104.0 + Hugo 0.164.0**：主题最佳 0.163.3，用 0.164.0 仅 WARN 不影响；Cloudflare Pages 设 `HUGO_VERSION=0.164.0`。

### 升级主题后的验证

- `hugo mod get -u ./...` → 重新构建 → 跑 `preview-private.bat` 确认 `/private/` 仍正常列出且加密。
- ⚠️ 风险：若未来 Blowfish 开始过滤列表里的 `hidden`，`/private/` 目录页会变空白。届时去掉私密文章的 `hidden` 或加一小段自定义 section 模板即可，不影响升级成败。
- `layouts/` 下覆盖文件（`vendor.html` / `sitemap.xml` / `shortcodes/katex.html`）若主题大版本改了对应文件名会"静默失效"（不报错、行为回退），升级后留意。

## 升级主题（Blowfish）

```bash
hugo mod get -u ./...                                  # 升级到最新
# 或锁定指定版本：编辑 go.mod 里的 v2.104.0 后运行
hugo mod get github.com/nunocoracao/blowfish/v2@v2.x.y
```

升级后本地 `hugo server` 验证；若你覆盖的某段 partial 在新版改名 / 改签名，只在 `layouts/` 里对应调整即可。
