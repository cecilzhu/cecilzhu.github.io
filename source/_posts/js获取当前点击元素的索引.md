---
title: js获取当前点击元素的索引
categories: 学习
date: 2018-11-14 23:29:46
updated: 2018-11-14 23:29:46
tags: [js]
cover:
main_color: '#b3bfe0'
---

以ul下的li元素为例；获取li的索引，代码如下：

<p>
	&lt;ul id="list"&gt;<br>
     	&nbsp;&nbsp;&nbsp;&nbsp;&lt;li&gt;1&lt;/li&gt;<br>
    	&nbsp;&nbsp;&nbsp;&nbsp;&lt;li&gt;2&lt;/li&gt;<br>
     	&nbsp;&nbsp;&nbsp;&nbsp;&lt;li&gt;3&lt;/li&gt;<br>
    	&nbsp;&nbsp;&nbsp;&nbsp;&lt;li&gt;4&lt;/li&gt;<br>
	&lt;/ul&gt;
</p>


<!--more-->

方法1：(自执行匿名函数法)

var ul = document.getElementById("list");
var list = ul.getElementsByTagName('li'); 
for(var i=0;i<list.length;i++) {
  !function(j) {	// 匿名函数表达式1(j为该匿名函数形参)
     // console.log(j); //0,1,2,3
    	list[j].onclick = function() {	// 该匿名函数中 无参数！
       console.log(j); // 点哪个输出哪个
      };
    }(i);	// 传入实参i,调用匿名函数
  }




方法2：(函数调用法)

function acti(ind) {
  list[ind].onclick = function() {	// 该匿名函数中 无参数！
     console.log(ind); // 点哪个输出哪个
  };
}
for(var i=0;i<list.length;i++) {
  acti(i);
}




方法3:(添加自定义属性index法)

把每个li元素加上自定义属性index,在li被点击时获取相应index属性即可

var ul = document.getElementById("list");
var list = ul.querySelectorAll('li'); 
for (var i = 0; i<list.length; i++) {
   list[i].index = i;	// 为每个li添加自定义属性并相应赋值
}
ul.addEventListener('click',function(e){	// 为整个ul添加click
   console.log(e.target.index);	// 输出click target(即被点击的li) 对应的index值
})




方法4：(数组indexOf元素索引定位法)

获取ul下的所有li，找到被点击li在所有li中的位置

ul.addEventListener('click',function(e){
   var item = e.target;
   var listArr = Array.from(list);
   console.log(listArr.indexOf(item));
})
