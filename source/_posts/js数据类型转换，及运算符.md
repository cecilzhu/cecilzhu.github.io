---
title: js数据类型转换,及运算符
date: 2023-03-10 18:35:10
updated: 2023-03-10 18:35:10
categories: 学习
tags: js
cover: /img/10.webp
main_color: '#7390b2'
---

**一、不同的数据类型会占用不同大小的内存空间，为数据指定相应的数据类型，可以更合理地使用内存。**

**二、js中的数据类型（7种原始类型/基本类型，1种引用类型/复杂类型）**
原始类型/基本类型：Number,String,Boolean,Null,Undifined,BigInt,Symbol
引用类型/复杂类型: Object

typeof 操作符【此为操作符，并非构造函数！typeof()中的()只是将后续的内容当做一个整体而已，非必须有】
作用：以 字符串形式 返回 变量中值的 数据类型。
"undefined"表示 变量 已使用var,let等关键字声明，但未赋值（初始化）;
"boolean"表示为 变量值的 数据类型为 布尔值;
"string"表示为字符串;
"number"表示为数值;
"object"表示为对象；（变量值为null时， typeof测出来的数据类型是object ---特殊情况）
"function"表示为函数;
"symbol"表示为符号；

 <!--more-->

`1.Number`
一般值：整数，小数（又称 浮点数，小数运算之前，必须先把小数转换为整数！）；
特殊值：NAN, Infinity, MAX_VALUE, MIN_VALUE

NaN (为not a number的简写)代表一个计算错误，它是一个错误的操作所得到的结果；console.log(10 * "abc"); // NaN
NaN和任何数据进行运算，结果都是NaN。
Infinity, 无穷大 ；-Infinity, 负无穷大 【1/0 在js中值为无穷大，java中会直接报错】

MAX_VALUE, MIN_VALUE（最大正数值，最小正数值）
用法：
var min = Number.MIN_VALUE;
var max = Number.MAX_VALUE;

isNaN()构造函数
用法及作用
isNaN(num)，判断num值为NaN则返回true

`2.String`
var str = 'qwer';
str.length获取str的length
str[1]获取str的第2个字母

字符串的拼接【'+'遇到 字符串，直接解释为 字符串拼接】
转义字符（\'、\"引号的 转义，\n换行等）
es6中的 模板字符串。用法（反引号中直接写 包含 以${}包裹变量名的 字符串）：`qwer${变量名}erter`

`3.Boolean(共2个值，非true即false)`
关系运算符 返回的结果，就是布尔数据类型。console.log(2 > 1);   //true
'!'的 取反 操作。
`4.Undefined(只有1个值undefined)`
变量 已使用var,let等关键字声明，但未赋值（初始化） 时，该变量的数据类型为Undefined。被动的，很少主动用！
   var uname;
   console.log(uname);  //变量的值 默认为 undefined
   console.log(typeof uname);  //变量中值的 数据类型 为undefined
`5.Null(只有1个值Null）`
用法（给一个已经声明的变量进行初始化，经常用！）：var user = null;
`6.Object`
可以表示一组数据，是其他数据的一个集合。可看作一个容器，是js中众多容器 {}  []  set map...中的一种。

**三、js中的 数据类型转换**
`1.其它数据类型 转为 String类型`
强转：  toString()  String()
toString() 【只能把number 和 boolean 转换为字符串！undefined、Null都没有原型链，无法强转】
举例：  var a = 100; 
a不是一个对象，a.toString(),会瞬间把a包装成一个对象，这类对象叫包装对象，其中'. '为属性访问运算符。

String()构造函数，强大！【可以把number、boolean、undefined、null、字面量(固定取值) 转换为字符串！】

隐式转换：方便！（'+'遇到 字符串，直接解释为 拼接字符串，故 字符串前直接加'+' 即可对其完成类型转换） 
【运算符 左右两侧数据类型不一致时，运算符会悄悄的把一种数据类型转为另一种数据类型，保持数据类型一致。】

`2.其它数据类型 转为 Number类型`
Number() 构造函数，或者前面加上"+" 【把"123"、"   123   "转成123、空格字符串"     "或空串"" 转成0、"100px"转成NaN】
特殊：Number(false)和Number(Null) 都转为 0。Number(true) 转为 1。Number(undefined) 转为 NaN。

parseInt转为整数 parseFloat转为小数【能转则转！"100px"转成100，"px100"转成NaN】

`3.其它数据类型 转为 Boolean类型`
Boolean() 构造函数，强转
 【转为false: 0, null, NaN, undefined, 空串""。其他情况都转为true】


**四、运算符**
       // 运算符：具有某些特定功能的符号  +  -  *  /  %
        // 操作数： 1 + 1 运算符号两侧的数据都是 操作数
        // 要求：运算的时候，左右两侧的数据类型必须保持一致。如果不一致，会发生类型转换。

        //  从功能上划分：【运算后，都会整体返回一个布尔值。】
        //     算术运算符
        //     递增递减运算符( ++ 在前，整体是一个新值 ，++在后整体是一个旧值)
        //     关系运算符
    【算数、递增递减、和关系运算符中，会把两边的 操作数 隐式转换为Number类型】
        //     逻辑运算符（&&一假全假、||一真全真、!。注意：&&碰到第一个为false，便会立即中断后续的语句。|| 碰到第一个为true，也会立即中断后续的语句。）
        //     赋值运算符
    
        // 从操作数上划分
        //    一元运算符  单目运算符
        //    二元运算符  双目运算符
        //    三元运算符  三目运算符  三元表达式 （表达式 ? 结果A : 结果B）


【拓展】
1.!=隐式类型转换 不判断数据类型。!==判断数据类型（==与===同理）

2.后端传递数据过来进行判断时，为数组时判断数组的长度，为对象时用if(Object.keys(obj).length){}，判断对象属性数组长度。
如果可能传过来null，也有可能传过来数组，并且不希望空数组执行语句，则可以if(res && res.length){}，res和res.length位置不能换，如果为null，则直接返回null，后面的res.length不执行，从而不报错，如果为[]，则res.length为0，返回0，也将空数组去除了。

3.在js中根本不存在真正的空对象，理解这一点至关重要！即使时最简单的{}对象也会包含从Object.prototype继承而来的属性和方法。我们提到的"空对象"只是说这个对象没有自有属性，不考虑它是否有继承而来的属性。
{}、null、[]的区别【注：在转化为 布尔值时，只有null转为false！[]、{}都会被转为true。】
{}是一个不完全空的对象，原型链上有Object；null为原型链顶端，因此Object.prototype.__proto__===null为true。
null是完全空对象，原型链也没有。
[]原型链上还比{}多一个Array。

4.使用 三元运算符能做到的，if else语句也能做到。只是三元运算符不仅能用于js，也能与html标签结合使用：
