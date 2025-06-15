---
title: absolute探讨
date: 2020-10-05 03:47:14
permalink:
updated: 2020-10-05 03:47:14
tags: css
categories: 学习
top:
swiper_index:
top_group_index:
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
文章本来写完了，正发布时网站崩溃了。自动保存个球。还有插图全没了！！！



## 亲测，直接上重点总结：：：
1.兄弟元素中间，至少一个absolute。该absolute元素 相对于 最近的外层（父、祖先级元素）relative定位，没有就直接相对于窗口定位。给方向后，让去哪里才去哪里。没有指定方向时，原地悬浮，纹丝不动！！！

2.祖父relative，【父 无论relative，还是absolute】。子元素absolute。该absolute子元素 相对于 父级 定位。

3.祖父relative，【父 不设置position】。子元素absolute。此情况 同上1.
该absolute子元素 相对于 祖父级 定位。

