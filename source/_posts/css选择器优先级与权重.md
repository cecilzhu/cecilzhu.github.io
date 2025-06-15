---
title: css选择器优先级与权重
date: 2021-8-05 04:05:00
permalink:
updated: 2021-8-05 04:05:00
tags: css
categories: 学习
top:
swiper_index:
top_group_index:
top_img:
comments:
cover:
main_color: '#b3bfe0'
copyright:
copyright_author:
copyright_url:
aplayer:
highlight_shrink:
aside:
---
## 各种选择器 优先级
1.第一优先级：`!important`会覆盖页面内任何位置的元素样式，权值为 无穷大
2.内联（行内）样式，如`style="color: green"`，权值为1,0,0,0
3.ID选择器，如#app，权值为0,1,0,0
4.类、伪类、属性选择器，如`.foo, :first-child, div[class="foo"]`，权值为0,0,1,0
5.标签、伪元素选择器，如`div::first-line`，权值为0,0,0,1
6.通配选择器，如`*{}`，权值为0,0,0,0
7.继承 的样式没有权值。（补充，`<td align="right">`，`<img width="10">`等标签 属性的 自带样式，优先级 不高于 继承样式）

## 权重 计算规则
*【重要：以上数字，非 十进制！eg：0,0,0,5+0,0,0,6=0,0,0,11 小于0,0,1,1】* 
在层级选择器（子代，后代，兄弟，通用兄弟选择器）中。被 多类 选择器 选中的某元素，计算权重时， 分类别、按个数 分别相加 计算权重。总权重 相等 时，还要考虑 样式的 继承性、后来居上 等特性。
一般情况下，只从中直接选取 最高优先级 的 选择器类别 按个数计算大概权重，即可。
行内（内联）样式：`<div style="color:red;">`
外部样式：`<link>`或`@import`引入`.css文件`
内部（内嵌）样式：`<style>`中嵌入代码

## 需注意：
1.权重相同的情况下，位于后面的样式会覆盖前面的样式
2.通配符、子选择器、兄弟选择器，虽然权重为0,0,0,0，但是优先于继承的样式
3.对于 同一类别 的选择器，要分类别、个数相加 计算 最终权重！
