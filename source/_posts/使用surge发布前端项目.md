---
title: 使用surge发布前端项目
date: 2023-03-05 21:15:50
updated: 2023-03-05 21:15:50
categories: 学习
tags: 工具
cover:
main_color: '#b3bfe0'
---

Surge是面向前端开发人员的静态web发布网站。

#### 1. 安装node
#### 2. 安装surge
npm install --global surge

<!--more-->

```
操作命令：
$ surge --help
  surge – single command web publishing. (v0.23.1)
  Usage:
    surge <project> <domain>
  Options:
    -a, --add           adds user to list of collaborators (email address)
    -r, --remove        removes user from list of collaborators (email address)
    -V, --version       show the version number
    -h, --help          show this help message
  Additional commands:
    surge whoami        show who you are logged in as
    surge logout        expire local token
    surge login         only performs authentication step
    surge list          list all domains you have access to
    surge teardown      tear down a published project
    surge plan          set account plan  Guides:
    Getting started     surge.sh/help/getting-started-with-surge
    Custom domains      surge.sh/help/adding-a-custom-domain
    Additional help     surge.sh/help
  When in doubt, run surge from within your project directory.
```

#### 3.进入待发布的目录
cd <to-public-dir>
#### 4.发布

【可直接命令（`surge + project相对路径 + 自定义域名`）进行project的发布，不过域名可能会冲突！！！】

$ surge
   Welcome to surge! (surge.sh)
   Login (or create surge account) by entering email & password.
          email: me@xiexianbin.cn
       password: Surge2022
   Running as me@xiexianbin.cn (Student)
        project: D:\code\public\
domain: fallacious-action.surge.sh 此域名可 自定义为 *****.surge.sh，域名太短可能会发生冲突，配置失效！！
     encryption: *.surge.sh, surge.sh (185 days)
             IP: 138.197.235.123
   Success! - Published to fallacious-action.surge.sh

`发布成功后，访问指定ip或域名即可在线看到 此project。`
`撤销已发布项目 使用命令 surge teardown+域名。`
`亲测速度还可以，很方便。可以自定义 多个域名，但共享同一个ip`
