---
title: "教程：网页插入B站视频的方法"
date: 2026-08-01T11:30:00+08:00
draft: false
tags: ["视频"]
categories: ["发文教程"]
---

### **1.创建短代码文件（一次性创建即可，以后所有 B站视频 都能用）**

在你的博客根目录下，新建文件 layouts/shortcodes/bilibili.html（如果文件夹不存在就手动创建）：

**提醒：本文的MD代码中的** /* 代码 */ **是为了以文本的方式显示出次代码，实际使用时应该删除。**

```
{{- $bvid := .Get "bvid" | default (.Get 0) -}}
{{- $page := .Get "page" | default "1" -}}
{{- $title := .Get "title" | default "" -}}

{{- if not $bvid -}}
  {{ errorf "bilibili shortcode 需要提供 bvid，例如：{{</* bilibili BV1xx411c7mD */>}} 或 {{</* bilibili bvid=\"BV1xx411c7mD\" page=\"2\" */>}}" }}
{{- end -}}

<figure style="margin:1.5rem 0;">
  <div style="position:relative;width:100%;padding-bottom:56.25%;height:0;overflow:hidden;border-radius:8px;">
    <iframe
      style="position:absolute;top:0;left:0;width:100%;height:100%;border:0;"
      src="https://player.bilibili.com/player.html?bvid={{ $bvid }}&page={{ $page }}&autoplay=0"
      scrolling="no"
      frameborder="no"
      framespacing="0"
      loading="lazy"
      allowfullscreen>
    </iframe>
  </div>
  {{- if $title }}<figcaption style="margin-top:.5rem;text-align:center;font-size:.9em;color:#888;">{{ $title }}</figcaption>{{- end }}
</figure>


```

### **2.调用方式：文章 .md 里写一行调用短代码就行。**

```
最简：{{</* bilibili BV11Z4y1W77e */>}}
```
效果如下：

{{< bilibili BV11Z4y1W77e >}}

```
多 P 视频 + 标题：{{</* bilibili bvid="BV11Z4y1W77e" page="2" title="第二讲" */>}}

page 默认 1，title 可选（显示成图注）

播放器自带响应式 16:9 包裹，手机上不变形，不依赖主题 CSS，所以 Blowfish / PaperMod 通用
```

**提醒：把 BV11Z4y1W77e 换成你视频链接里那串 BV 号即可。**

**&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;私密文章里也能放，外层页面加密、视频从 B站加载，没问题。**

要发视频的话，本地 hugo server 预览一下，确认没问题再推上去