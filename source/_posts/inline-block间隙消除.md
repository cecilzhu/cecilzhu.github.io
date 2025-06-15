---
title: inline-block间隙消除
date: 2020-10-05 03:51:48
permalink:
updated: 2020-10-05 03:51:48
tags: css
categories: 学习
top:
swiper_index:
top_group_index:
top_img:
comments:
cover:  /img/10.webp
main_color: '#7390b2'
copyright:
copyright_author:
copyright_url:
aplayer:
highlight_shrink:
aside:
---
{% tip cogs %}
float元素之间是没有间距的。inline-block兄弟元素之间，如何像flaot元素那样，去掉inline-block元素间的间隙？
{% endtip %}

## 方法一：父元素设置font-size为0，子元素单独再设置字体大小
## 方法二：设置字符间距letter-spacing，或单词间距word-spacing
这个方法的原理有点像一所用的font-size，具体做法是给父元素一个letter-spacing或者word-spacing的负值（稍微大一点，比如 -6px），子元素再调整为0即可，具体使用字符间距还是单词间距其实大同小异。
## 方法三：直接采用使用Flex或float布局（这样处理的三栏式布局没必要用inline-block）
## 方法四：设置margin-right为负值
用margin负值来抵掉元素间的空白，不过margin负值的大小与上下文的字体和文字大小相关，并且同一大小的字体，元素之间的间距在不同浏览器下是不一样的，如：font-size:16px时，Chrome下元素之间的间距为8px,而Firefox下元素之间的间距为4px。所以这个方法并不通用，也相对比较麻烦，因此不太推荐使用。

{% tip cogs %}
以下方式不规范，不推荐！！！
{% endtip %}

## 方法五（通过修改html格式）：
```html
<ul>
    <li>one</li  
    ><li>two</li  
    ><li>three</li>
</ul>
<!-- or -->
<ul>
    <li>one</li><!--  
    --><li>two</li><!--  
    --><li>three</li>
</ul>
```
