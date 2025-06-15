---
title: hexo过滤器阶段
date: 2024-12-15 11:11:50
permalink:
updated: 2024-12-15 11:11:50
tags: hexo
categories: 学习
top:
swiper_index:
top_group_index:
cover:
main_color: '#b3bfe0'
comments:
aside:
copyright:
copyright_url:
copyright_author:
description: hexo g阶段,hexo过滤器阶段,以及备份（`filters`、`events`、`helpers`等）不同类型的hexo脚本，在hexo加载时，可能有不同程度的影响。
---

[TOC]

## 一、hexo g阶段

### 以下是 Hexo 中常用的过滤器阶段及其 执行顺序 的表格说明，按执行顺序排列：

<div id = "md-table">

| **阶段名称**         | **触发时机**                              | **执行顺序** | **描述**                                                     |
| -------------------- | ----------------------------------------- | ------------ | ------------------------------------------------------------ |
| `before_post_render` | 在渲染文章（如 Markdown 转 HTML）之前触发 | 最早         | 用于修改文章内容的源文件，比如解析自定义标签或前置处理 Markdown 内容。 |
| `after_post_render`  | 在渲染文章后（HTML 已生成）触发           | 较早         | 用于处理文章渲染后的 HTML，比如添加自定义的 DOM 或属性。     |
| `before_generate`    | 在开始生成文件之前触发                    | 中间         | 用于在文件生成前进行站点数据的修改或准备工作。               |
| `after_generate`     | 在所有文件生成完成后触发                  | 较晚         | 用于修改生成后的文件或添加额外文件，通常用于 SEO 优化或缓存生成等后处理逻辑。 |
| `before_render`      | 在渲染文件之前触发                        | 依赖情况     | 渲染所有类型文件（不仅限于文章，如模板、页面等）前触发，用于全局性修改。 |
| `after_render`       | 在渲染文件之后触发                        | 依赖情况     | 渲染所有类型文件后触发，常用于压缩 HTML、CSS 或 JS 文件。    |
| `before_exit`        | 在 Hexo 进程结束之前触发                  | 最晚         | 用于清理资源、保存缓存、写日志等退出前的操作。               |

</div>

## 示例：

```js
/**
 * AnZhiYu
 * lazyload
 * replace src to data-lazy-src
 */

"use strict";

const urlFor = require("hexo-util").url_for.bind(hexo);

const lazyload = htmlContent => {
  const error_img = hexo.theme.config.error_img.post_page
  const bg = hexo.theme.config.lazyload.placeholder
    ? urlFor(hexo.theme.config.lazyload.placeholder)
    : "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
  return htmlContent.replace(
    /(<img(?!.class[\t]*=[\t]*['"].*?nolazyload.*?['"]).*? src=)/gi,
    `$1 "${bg}" data-lazy-src=`
  );
  //   return htmlContent.replace(
  //   /(<img(?!.class[\t]*=[\t]*['"].*?nolazyload.*?['"]).*? src=)/gi,
  //   `$1 "${bg}" onerror="this.onerror=null,this.src=&quot;${error_img}&quot;" data-lazy-src=`
  // );
}

hexo.extend.filter.register('after_render:html', data => {
  const { enable, field } = hexo.theme.config.lazyload
  if (!enable || field !== 'site') return
  return lazyload(data)
})

hexo.extend.filter.register('after_post_render', data => {
  const { enable, field } = hexo.theme.config.lazyload
  if (!enable || field !== 'post') return
  data.content = lazyload(data.content)
  return data
})

```
## 二、hexo过滤器 补充：
### 完整的 hexo.extend.filter.register 类别按执行顺序排列：

<div id = "md-table">

| **事件**                   | **事件名称（`hexo.extend.filter.register` 类别）**         | **描述**                                                              |
|----------------------------|---------------------------------------------------------|-----------------------------------------------------------------------|
| **初始化阶段**              | `before_init` / `after_init`                             | 在Hexo初始化之前和之后触发，允许自定义项目结构和配置。                |
| **清理缓存阶段**            | `before_clean` / `after_clean`                           | 在清理缓存之前和之后触发，用于在清理前后执行操作。                   |
| **创建新文章**              | `new_post`                                              | 在创建新文章时触发，用于生成文章文件或执行额外的初始化操作。         |
| **生成阶段**                | `before_generate` / `after_generate`                     | 在生成页面前后触发，允许修改或处理页面内容。                          |
| **渲染页面阶段**            | `before_render` / `after_render`                         | 在渲染页面内容之前和之后触发，允许修改渲染流程或渲染后的内容。        |
| **渲染HTML页面阶段**        | `after_render:html`                                      | 在HTML渲染完成后触发，用于修改或插入HTML结构，例如SEO优化等。         |
| **处理文章内容阶段**        | `before_post_render` / `after_post_render`               | 文章渲染前后触发，常用于插入文章的附加内容（如社交按钮等）。           |
| **内容处理阶段**            | `before_content_render` / `after_content_render`         | 用于文章内容的渲染前后，进行内容修改或格式化。                        |
| **部署阶段**                | `before_deploy` / `after_deploy`                         | 在部署之前和之后触发，用于自定义部署流程。                            |
| **服务器启动阶段**          | `before_serve` / `after_serve`                           | 在本地服务器启动前后触发，用于开发环境中的调试和优化。                |
| **发布后处理阶段**          | `after_publish`                                          | 在Hexo发布后触发，通常用于清理、日志记录或其他后期操作。             |

</div>


## 三、拓展

**备份**（`filters`、`events`、`helpers`等）**不同类型**的hexo脚本，在hexo加载时，可能对项目会有不同程度的影响。

1. `filters (过滤器)` - 🚫 最易受影响 (重复执行)

问题本质： 使用 hexo.extend.filter.register('filter_name', function(){...}) 注册的过滤器是 全局注册 到 Hexo 实例上的。

重复执行： 如果在 两个不同的 .js 文件 中（即使是主题目录下的不同子目录），注册了 同名 的过滤器（'filter_name'），那么 当该过滤器被触发时，这两个函数都会被执行（即，执行了两次逻辑）！ 执行顺序通常取决于文件加载顺序（文件名排序或目录结构）。

影响范围： 主题目录下的 scripts/、scripts/filters/、scripts/any-subfolder/ 等 所有子目录 中的脚本文件，只要它们被加载并注册了同名过滤器。

2. `events (事件)` - 🚫 受影响 (重复执行)

问题本质： 使用 hexo.on('event_name', function(){...}) 监听 Hexo 事件。

重复执行： 如果在 两个不同的 .js 文件 中监听了 同一个事件（'event_name'），那么 当该事件被触发时，这两个监听函数都会被执行！

影响范围： 同样影响主题目录下 scripts/、scripts/events/ 等所有子目录中的脚本文件。

3. `helpers (辅助函数)` - ⚠️ 影响方式不同 (覆盖而非重复执行)

问题本质： 使用 hexo.extend.helper.register('helper_name', function(){...}) 注册的辅助函数也是 全局注册。

重复注册后果： 如果在 两个不同的 .js 文件 中注册了 同名 的辅助函数（'helper_name'），那么 后注册的函数会完全覆盖先注册的函数。 最终在模板中调用 helper_name() 时，只会执行最后注册的那个函数。

与过滤器的区别： 它不会导致函数被执行多次，但会导致 预期外的函数被替换，同样会造成问题（功能失效或行为改变）。

影响范围： 同样影响主题目录下 scripts/、scripts/helpers/ 等所有子目录中的脚本文件。

> ### 总结：
> **`备份脚本`可能会出现的`冲突`**
>
> 1. 发生在`注册的组件名`（filter_name, helper_name, event_name）上，而`不是文件名`上。仅仅使用不同的文件名（或放在不同子目录如 scripts/filters/ vs scripts/helpers/），无法隔离在 hexo 全局对象上注册的组件。
> 2. `filters` 和 `events` 会导致 **重复执行**，而`helpers` 会导致 **覆盖**。这是 Hexo 插件/脚本机制决定的。
>
> **如何备份脚本才能`避免冲突`?**
> 1. 将备份脚本中的 hexo.extend.filter.register、hexo.extend.helper.register、hexo.on 等关键注册行直接用 // 或 /* */ `注释掉`，确保它们不会被执行。这是比较可靠的手动方法。
> 2. 将所要备份的hexo脚本，`移出hexo加载路径`。