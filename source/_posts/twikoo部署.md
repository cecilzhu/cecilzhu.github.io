---
title: twikoo部署
date: 2024-01-22 07:52:31
updated: 2024-01-22 07:52:31
tags: js
categories: 学习
top:
swiper_index:
top_group_index:
cover: 
main_color: '#b3bfe0'
comments:
copyright:
copyright_author:
copyright_url:
aplayer:
highlight_shrink:
aside:
---

[TOC]
## 部署方式（推荐1、2，大陆直连）

###  1.netlify:
https://yujun.netlify.app/.netlify/functions/twikoo
<iframe
	src="https://yujun.netlify.app/.netlify/functions/twikoo"
	frameborder="0"
	height="150" width="100%"
></iframe>

###  2.HuggingFace（大陆最快！但SMTP端口被封，邮件通知功能 失效！）:
https://mancai-twikoo.hf.space
<iframe
	src="https://mancai-twikoo.hf.space"
	frameborder="0"
	height="150" width="100%"
></iframe>

### 3. vercel:
https://twikoo.eamon.ggff.net
<iframe
	src="https://twikoo.eamon.ggff.net"
	frameborder="0"
	height="150" width="100%"
></iframe>


https://twikoo-alpha-blue.vercel.app
<iframe
	src="https://twikoo-alpha-blue.vercel.app"
	frameborder="0"
	height="150" width="100%"
></iframe>

###  4.worker:
https://twikoowk.eamon.ggff.net
<iframe
	src="https://twikoowk.eamon.ggff.net"
	frameborder="0"
	height="150" width="100%"
></iframe>


https://twikoo-cloudflare.z1260750674.workers.dev/
<iframe
	src="https://twikoo-cloudflare.z1260750674.workers.dev/"
	frameborder="0"
	height="150" width="100%"
></iframe>

## 数据库comment表中 字段的 意义:

_id: 这是一个唯一标识该条评论的字符串ID,通常用作MongoDB数据库中的主键。它具有唯一性和重要性,是评论的主要标识。
uid: 这是一个唯一标识评论者的字符串ID。它可以用来关联评论与评论者的其他信息,比如头像、用户名等。
nick: 这是评论者的昵称,用于在评论中显示评论者的名称。
mail: 这是评论者的邮箱地址,可用于联系评论者或进行邮件通知。
mailMd5: 这是评论者邮箱地址的MD5哈希值,用于gravatar头像服务的集成。
link: 这是评论者的个人网站链接,可以在评论中展示。
ua: 这是评论者使用的用户代理字符串,可以用于分析评论者的设备和浏览器信息。
ip: 这是评论者的IP地址,可用于分析评论来源和检测异常情况。
master: 这个标志是否是博主的评论,0表示普通用户评论,1表示博主评论。

{% note warning modern %}注意：关于评论所在的post页面链接！本地环境有 显性的`.html`后缀。而 生产环境 表面 无后缀 且以表面形式保存到了数据库中（生产环境实际是html页面，但线上环境会自动隐藏`.html`后缀）{% endnote %}
url: 这是评论所在页面的URL。
href: 这是评论所在页面的完整URL（邮件通知中，评论所在的页面链接）。

comment: 这是评论的内容文本。
pid: 这是父级评论的ID,用于实现评论的层级关系。
rid: 这是回复评论的ID,用于将回复与被回复的评论关联起来。
isSpam: 这个标志是否将该评论识别为垃圾评论,0表示正常评论,1表示垃圾评论。
created: 这是评论创建的Unix时间戳,用于评论的时间排序。
updated: 这是评论最后更新的Unix时间戳。
like: 这是对该评论的点赞信息,以JSON数组的形式存储。
top: 这个标志是否将该评论置顶,0表示普通评论,1表示置顶评论。
avatar: 这是评论者的头像URL,可用于在评论中显示头像。

总的来说,这些字段涵盖了评论的各个方面,包括评论者信息、评论内容、评论关系、评论状态等,为Twikoo提供了丰富的数据支持。其中,_id、uid和created等字段是比较重要的,可以作为数据的主键和索引。

## 导入数据库中的数据，需注意：
> 1.url,href的路径是否还存在，且 不同环境下 的页面路径与数据库中的路径一致（注意路径是否有`.html`后缀！！），不然即便导入成功也无处渲染。
> 2.like字段，与“点赞者”创建 赞 时，保留的 赞id和个人信息 有依赖关系。
> 3.每个评论的"_id"是唯一的。
