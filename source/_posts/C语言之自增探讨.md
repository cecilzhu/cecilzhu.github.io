---
title: C语言之自增探讨
date: 2016-8-05 03:59:11
permalink:
updated: 2016-8-05 03:59:11
tags: C
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
sum = ++i + ++i的处理结果在 不同的编程语言（如java，js）及不同的编译器中可能有差异，以下仅针对C语言！纯粹个人理解，仅供参考。。
```C
#include "stdio.h"
void main()
{                             
    int i=1,sum;
/*  i = i++; //i=2 先赋值，再运算
    i = ++i; //i=2 先运算，再赋值
 */
    printf("i=%d\n",i); 

/*注意：
a=++i; 等效为：i=i+1；a=i； 
a=i++; 等效为：a=i；i=i+1；
sum=a+b;
a，b各自的 返回值 与 i值 不相关！
*/

//sum = ++i + ++i;
//6【未验证！左++i先自增为2暂不返回，右++i由i=2继续自增为3（i=3）完成 b=i 并返回，同时左++i也 完成 a=i 返回3结束。两者相加为6】

//sum = i++ + ++i;
//4【左i++ 完成 a=i 先返回1结束，之后左i自增为2，右++i继续自增为3 完成 b=i 并返回3，结束，两者相加为4】

//sum = i++ + i++;
 //2【左i++ 完成 a=i 先返回1结束，右i++ 完成 b=i 同时返回1结束，两者相加为2】

//sum = ++i + i++; 
//4【左++i先自增为2（i=2）暂不返回，右i++ 完成 b=i 直接返回2，左 同时返回2，结束，两者相加为4】

/*
    sum = i++; //sum=1 ,i=2
    sum = ++i; //sum=2 ,i=2
*/
   //printf("sum=%d\n,i=%d\n",sum,i);  
}    
```
## 要点：
1. ++i是先运算，再赋值。i++是先赋值，再运算！
2. 完成 赋值表达式 便 返回值，与 i值 不相关！
```C
sum = i++; //sum=1 ,i=2
sum = ++i; //sum=2 ,i=2
printf("sum=%d\n,i=%d\n",sum,i);
```
