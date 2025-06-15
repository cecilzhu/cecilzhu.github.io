---
title: wamp server2.5版本 配置多站点
date: 2018-11-28 19:05:38
updated: 2018-11-28 19:05:38
categories: 学习
tags: php
cover:
main_color: '#b3bfe0'
---


先找到 需要修改的以下3个文件：

httpd.conf：D:\wamp\bin\apache\apache2.4.9\conf

httpd-vhosts：D:\wamp\bin\apache\apache2.4.9\conf\extra

hosts：C:\WINDOWS\System32\drivers\etc


<!--more-->


1.修改 httpd.conf：(在文档中分别找到以下三句，把句首的注释符 ‘#’删掉)

LoadModule php5_module "d:/wamp/bin/php/php5.5.12/php5apache2_4.dll"

PHPIniDir d:/wamp/bin/php/php5.5.12

Include conf/extra/httpd-vhosts.conf

 

 

2.修改 httpd-vhosts：

复制粘贴两个 以下模板

<VirtualHost *:80>
    ServerAdmin webmaster@dummy-host2.example.com
    DocumentRoot "c:/Apache24/docs/dummy-host2.example.com"
    ServerName dummy-host2.example.com
    ErrorLog "logs/dummy-host2.example.com-error.log"
    CustomLog "logs/dummy-host2.example.com-access.log" common
</VirtualHost>

并修改其为：

<VirtualHost *:80>
    DocumentRoot  "D:/wamp/www/demo/site1"   // 新站点，即site.com的根目录
    ServerName  localhost1.com      // 新站点的域名
       <Directory "e:/PhpProject/">
            Options Indexes FollowSymLinks
            AllowOverride all
            Require all granted
      </Directory>
</VirtualHost>

<VirtualHost *:80>
    DocumentRoot  "D:/wamp/www/demo/site2"   
    ServerName  localhost2.com 
       <Directory "e:/PhpProject/">
            Options Indexes FollowSymLinks
            AllowOverride all
            Require all granted
      </Directory>
</VirtualHost>





 

。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。

为使 最初安装成功时 的localhost界面  继续生效(新建站点后，原来默认的localhost域名就会失效)：

在此还需要重新添加一个站点，

<VirtualHost *:80>
    DocumentRoot   "D:/wamp/www/"    // 此为wamp server 默认项目根目录
    ServerName   localhost
</VirtualHost>



 

 

还有一点！！！在我建好站 之后，再把所有的这些东西删掉 重启wamp server，3个站点都照样能正常工作。你们建站前先把它删掉试试！

   <Directory "e:/PhpProject/">
            Options Indexes FollowSymLinks
            AllowOverride all
            Require all granted
      </Directory>


3.修改 hosts(为新域名指定 127.0.0.1)：

这是win64位2.5版本wampserver的百度云链接：

 https://pan.baidu.com/s/1llyy7yyJnrLvuGyskVVSsQ
