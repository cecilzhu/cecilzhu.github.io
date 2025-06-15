---
title: audio控件插入
date: 2019-10-10 01:53:38
updated: 2019-10-10 01:53:38
categories: 随笔
tags: 
cover: /img/10.webp
main_color: '#7390b2'
---

![audio控件插入](Never-letting-Go/22.webp)



{% tabs 安知鱼audio嵌入, 2 %}

<!-- tab Tag Plugins的audio  -->

```md
{% audio 音频链接 %}
```
**效果：**
{% audio https://api.i-meto.com/meting/api?server=netease&type=url&id=466794344&auth=e7271f8ddd3ba21e06cd210b53c0562248f94d25 %}

<!-- endtab -->

<!-- tab 自定义标签  -->

```html
<!-- 用法一（MetingJS API） -->
<meting-js id="2611181089" server="netease" type="song" mutex="true" preload="none" theme="var(--anzhiyu-main)" data-lrctype="0" ></meting-js>

<!-- 用法二（播放页面 链接） -->
<meting-js auto="https://music.163.com/playlist?id=13830672260" mutex="true"  preload="none" data-lrctype="0"></meting-js>

```
**效果：**
<meting-js id="2611181089" server="netease" type="song" mutex="true" preload="none" theme="var(--anzhiyu-main)" data-lrctype="0" ></meting-js>

<meting-js auto="https://music.163.com/playlist?id=13830672260" mutex="true" preload="none" data-lrctype="0" theme="var(--anzhiyu-main)"></meting-js>

<!-- endtab -->

{% endtabs %}
