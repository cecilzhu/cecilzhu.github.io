---
title: margin重叠与BFC探讨
date: 2021-10-05 04:26:21
permalink:
updated: 2021-10-05 04:26:21
tags: css
categories: 学习
keywords:
description:
top: true
swiper_index: 2
top_group_index: 2
top_img:
comments:
cover: /img/10.webp
main_color: '#7390b2'
copyright:
copyright_author:
copyright_url:
aplayer:
highlight_shrink:
aside:
---

<a href="https://www.cnblogs.com/renshengruge/p/6369762.html"  target="_self" >https://www.cnblogs.com/renshengruge/p/6369762.html</a>    
<a href="https://www.cnblogs.com/leejersey/p/3991398.html"  target="_self" >https://www.cnblogs.com/leejersey/p/3991398.html</a>             

<div id="cnblogs_post_body" class="blogpost-body"><h3><strong><code>CSS2.1</code>的盒模型中规定的内容——<code>Collapsing margins</code>：</strong></h3>
<p><span style="color: #0000ff">所有毗邻的两个或更多盒元素的 上下margin 将会合并为一个margin共享之。</span></p>
<p><span style="color: #0000ff">毗邻的定义为：同级或者嵌套的盒元素，并且它们之间没有非空内容、Padding或Border分隔。</span></p>
<p>&nbsp;</p>
<p>解决办法：【触发BFC】</p>
<p><span style="color: #000000">给<span style="color: #3366ff">父元素</span>加上&nbsp;<span style="color: #3366ff"><code>padding替代margin/1px透明border/1px的padding/overflow:hidden<span style="color: #888888">(IE要添加zoom:1)</span></code></span>，</span></p>
<p><span style="color: #000000">或者给<span style="color: #3366ff">父元素/子元素</span>设置为&nbsp;<span style="color: #3366ff"><code>float或position:absolute/fixed.或display设置为：inline-block、 inline-flex、 inline-grid、 或table-caption等【或设置父元素为flex、grid、table-cell也可，但子元素不行】</code></span></span></p>
<p><span style="color: #000000">(<code>CSS2.1</code>规定浮动元素和绝对定位元素不参与<code>margin</code>折叠)。</span></p>
<p>&nbsp;</p></div>


**1.BFC 是什么？**
BFC (Block Formatting Contexts) 即块级格式化上下文，从样式上看，它与普通的容器没有什么区别，但是从功能上，BFC 可以看作是隔离了的独立容器，容器里面的元素不会在布局上影响到外面的元素，并且 BFC 具有普通容器没有的一些特性，例如可以包含浮动元素，上面的第二类方法（如 overflow 方法）就是触发了父元素的 BFC ，使到它可以包含浮动元素，从而防止出现高度塌陷的问题。

**2.如何触发 BFC**
触发 BFC 的条件如下：

> 1.浮动，float 除 none 以外的值
> 2.绝对定位，position（absolute，fixed） 
> 3.display为以下其中之一，inline-block、table-cell、table-caption、 inline-flex、 或 inline-grid等
> 4.overflow 除了 visible以外的值（hidden，auto，scroll） 

> 在 CSS3 中，BFC 叫做 Flow Root，并增加了一些触发条件：
> display 的 table-caption 值 position 的 fixed 值，其实 fixed 是 absolute 的一个子类，因此在 CSS2.1 中使用这个值也会触发 BFC ，只是在 CSS3 中更加明确了这一点。

**3.BFC 主要有三个特性：**

***(1) BFC 会阻止外边距折叠***
两个相连的 div 在 **垂直 方向上的** 外边距会发生叠加，有些书籍会把这个情况列作 bug ，这里 Kayo 并不同意，这种折叠虽然会给不熟悉 CSS 布局的开发者带来一些不便，但实际上它具有完整且具体的折叠规则，并且在主流浏览器中都存在，因此 Kayo 更认为这应该是 CSS 的特性。当然，在实际开发中，或许我们有时会不需要这种折叠，这时可以利用 BFC 的其中一个特性——阻止外边距叠加。

**阻止 外边距 重叠**的方式：

情况一、**父、子元素之间** 的外边距
> 方式1、为 **父元素** 设置属性
> 1-1、设置属性（absolutu/fixed、左右float、inline-...、**overflow:hidden**），以激活父元素的BFC。
> 1-2、父元素也可以设置 边框/padding，如border:1px solid transparent。
> 方式2、为 **子元素** 设置属性，以激活 子元素的BFC
> 设置属性（absolutu/fixed、左右float、inline-...）。

情况二、**2个兄弟元素之间** 的外边距（激活 元素的BFC）
> 方式1、为 **元素本身** 设置属性（absolutu/fixed、左右float、inline-...。**没有overflow！**）。
> 【注意：】
> 1.overflow:hidden在兄弟元素之间 无效。
> 2.脱离文档流会对 后面兄弟元素的布局会产生影响！只能给第2个元素设置（absolutu/fixed、左右float）。
> 方式2、 **元素 外层加个包裹** 为**包裹**设置 属性**overflow:hidden**，激活 包裹 的BFC，将其子元素的 外边距 包裹在里面。

```javascript
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title></title>
    <style type="text/css">
        .box {
            width: 100px;
            height: 100px;
            background: #5aa878;
            margin: 50px;
        }
        .container {
            overflow: hidden;
        }
    </style>
</head>
<body>
    <div class='container'>
        <div class="box"></div>
    </div>
    <!-- <div class="container"> -->
    <div class="box"></div>
    <!-- </div> -->
</body>
</html>
```

***(2) BFC 可以包含浮动的元素（清除浮动影响 方式之一）***
这也正是上面使用 overflow: hidden 与 overflow: auto 方法闭合浮动的原理，使用 overflow: hidden 或 overflow: auto 触发浮动元素父元素的 BFC 特性，从而可以包含浮动元素，闭合浮动。

W3C 的原文是“'Auto' heights for block formatting context roots”，也就是 BFC 会根据子元素的情况自动适应高度，即使其子元素中包括浮动元素。

但是 IE6-7 并不支持 W3C 的 BFC ，而是使用自产的 hasLayout 。从表现上来说，它跟 BFC 很相似，只是 hasLayout 自身存在很多问题，导致了 IE6-7 中一系列的 bug 。触发 hasLayout 的条件与触发 BFC 有些相似，具体情况 Kayo 会另写文章介绍。这里 Kayo 推荐为元素设置 IE 特有的 CSS 属性 zoom: 1 触发 hasLayout ，zoom 用于设置或检索元素的缩放比例，值为“1”即使用元素的实际尺寸，使用 zoom: 1 既可以触发 hasLayout 又不会对元素造成其他影响，相对来说会更为方便。

***(3) BFC 可以阻止元素被浮动元素覆盖***
浮动元素的block兄弟元素会无视浮动元素的位置，尽量占满一整行，这样该block元素就会被浮动的兄弟元素遮盖，为 该block兄弟元素 触发 BFC 后可以阻止这种情况的发生。

