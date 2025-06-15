---
title: java class中的构造方法
categories: 学习
date: 2018-11-23 00:40:13
updated: 2018-11-23 00:40:13
tags: java
cover: /img/10.webp
main_color: '#7390b2'
---

### 构造方法:初始化对象成员 时调用的方法。
1.方法名 和 类名完全相同
2.在方法名的前面没有返回值类型的声明
3.在方法中不能使用return语句返回一个值
4.当没有指定构造方法时，系统会自动添加无参的构造方法
5.当有指定构造方法时，无论该构造方法是有参，还是无参，系统都不会再自动添加无参的构造方法
6.构造方法的重载：方法名相同，但参数不同的多个方法，调用时会自动根据不同的参数选择相应的方法
7.构造函数 不能被继承(子类默认先自动调用父类的 无参构造方法)
<!--more-->

### 无参的构造方法
```java
public class HelloWorld {
    public static void main(String[] args) {
        Cat cat = new Cat();
    }
}
class Animal {
    public Animal() {
        System.out.println("动物");
    }
}
class Cat extends Animal {
    public Cat() {
        super();//有无均可，默认先调用父类构造方法
        System.out.println("猫");//输出：动物 猫
    }
}
```
## 有参的构造方法
```java
public class HelloWorld {
    public static void main(String[] args) {
        Cat cat = new Cat();
    }
}
class Animal {
    public Animal(String name) {
        System.out.println("动物name："+name);
    }
}
class Cat extends Animal {
    public Cat() {
        super("喵星人");
        System.out.println("猫");//输出：动物name:喵星人    猫
    }
}
```
