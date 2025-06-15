---
title: js,jq获取 滚动条高度 及 浏览器宽高
categories: 学习
date: 2018-11-01 00:23:59
updated: 2018-11-01 00:23:59
tags: js
cover: /img/10.webp
main_color: '#7390b2'
---

// 获取 滚动条高度
console.log(window.scrollY);    
console.log(window.pageYOffset);
console.log(document.documentElement.scrollTop);  // chrome下document.body.scrollTop值恒为0
console.log($(window).scrollTop());
console.log($("html,body").scrollTop());
console.log($(document).scrollTop());

<!--more-->

// 浏览器窗口可视区 宽度(不包含滚动条)
console.log(document.body.clientWidth);    // document.documentElement
console.log($(document.body).width());    //$(document.documentElement), $("html,body") 和 $(window)都可
console.log(window.innerWidth);  // 包含滚动条!

// 值会随窗口变窄而减小(数值未发现规律),但最终不会小于 最初设置的document宽
console.log($(document).width());

 


//浏览器可视区 高度(不包含滚动条)
console.log(document.documentElement.clientHeight);
console.log($(window).height());
console.log(window.innerHeight);

// 最初document 的高度(即使js改变了文档宽高也无效)
console.log(document.body.clientHeight);
console.log($(document.body).height());    // $(document.documentElement)和 $("html,body") 



console.log(window.outerWidth);  // Chrome测试发现比inner多14px,不知为何
alert(window.outerHeight);  // 似乎不是浏览器高!
