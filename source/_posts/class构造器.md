---
title: class构造器
date: 2022-11-05 01:29:49
permalink:
updated: 2022-11-05 01:29:49
tags: js
categories: 学习
cover: /img/12.webp
main_color: '#857bae'
top:
swiper_index:
top_group_index:
comments:
copyright:
copyright_author:
copyright_url:
aplayer:
highlight_shrink:
aside:
---
JavaScript 语言中，生成实例对象的传统方法是通过构造函数。ES6 的class可以看作只是一个语法糖，它的绝大部分功能，ES5 都可以做到，新的class写法只是让对象原型的写法更加清晰更像面向对象编程的语法而已。所以ES6 的类，完全可以看作 构造函数的另一种写法。

## 构造函数
constructor方法是类的默认方法，通过new命令生成对象实例时，自动调用该方法。一个类必须有constructor方法，如果没有显式定义，一个空的constructor方法会被默认添加。
```js
class Person{
}
等同于
class Person{
  // 构造函数
  constructor(){}
}
```
## 实例 属性和方法、静态 属性和方法
定义在类体中的属性称为实例属性，定义在类体中的方法称为实例方法。如下，temp、name、age就是实例属性，sayName方法就是实例方法。

同理，直接通过类调用的，而不是通过实例对象调用的。即只能通过“类名.names”或“类名.fn()”方式访问的属性和方法，便是 静态属性、静态方法。不会被实例继承
```js
class Person {
    constructor(name, age) {
        // 实例属性  【常用】
        this.name = name;
        this.age = age;
        // 实例方法  不常用
        this.sayName = function () {
            console.log("i am ", this.name);
        }
    }
    // 实例属性
    temp = 'briup';

    // 给原型对象 添加 公有方法 【常用】
    say() {
        return "我是Person对应的 原型对象上的 公有say方法";
    }

    //静态属性、静态方法
    static names = `我是 Person类 中的 静态属性`;
    static staticSay() {
        return `我是 Person类 中的 静态方法，只能在 Person作为对象时，通过属性访问运算符'.' 使用。`
    };
}

//在 Person对应的 原型对象上 添加 公有属性color
Person.prototype.color = 'red';

let p1 = new Person('Ronda', 22);
console.log(p1.temp);  // briup
console.log(p1.hasOwnProperty('temp'));  // true 【写在constructor之外的temp为 实例属性，并非其 原型对象上的 公有属性】
console.log(p1.__proto__.hasOwnProperty('temp'));  // false  实例化对象p1的 原型对象上没有temp属性
console.log(Person.prototype.say());  // ‘我是Person对应的 原型对象上的 公有say方法’

console.log(Person.names);
console.log(Person.staticSay());
```

### 关于 实例属性的 补充：
```js
class People{
  num = 1;
  constructor(num){  
    this.num = num;
  }
  num = 3;
}

let people = new People(2);
console.log(people.num);  // 2
```
等同于
```js
class People{
 constructor(num){  
   //不论在类内部哪里定义num属性，在constructor都会提前
   this.num = 1;
   this.num = 3;

   this.num = num;
 }
}
```

## class中的继承
```js
class Student {
    constructor(name, age) {
        // 在里面写的属性和方法 会挂载到 实例对象上
        this.name = name;
        this.age = age;
        this.work = function () {
            console.log('work..');
        }
    }
    //  在constructor外面写的方法 会挂载在 原型对象上
    say() {
        console.log('say..');
    }
}
let stu = new Student('张三', 18);
console.log(stu);// Student {name: '张三', age: 18, work: ƒ}

// 继承使用的关键字 extends、super
// 声明一个班长类 班长类去继承学生类的一些属性
class Monitor extends Student {
    constructor(name, age, id) {
        super(name, age);// super调用父类的构造函数
        this.id = id;//增加自己的 实例属性
    }
}
// 父类的 公有属性和私有属性 都可以被继承
let mon1 = new Monitor('李四', 18, 01);
console.log(mon1);// Monitor {name: '李四', age: 18, id: 1, work: ƒ}
mon1.say();// say..
```

[关于super关键字，详见ES6中Class类构造函数、实例、原型属性和方法、继承extends、super关键字_es6中类的原型属性和原型方法_The..Fuir的博客-CSDN博客](https://blog.csdn.net/qq_51066068/article/details/124705885#t7) 

## class的set设置器和get访问器
get 关键字将对象属性与函数进行绑定,当属性被访问时,对应函数被执行。

set 关键字将对象属性与函数进行绑定,当属性被赋值时,对应函数被执行。

【注意：实例对象的 属性名，与绑定该属性的 函数名 不能 同名】
```js
class Student {
    constructor(address, age) {
        this._address = address;
        this.age = age
    }
    // 设置器和访问器
    get address() {
        console.log('get启用了');
        return this._address
    }
    set address(value) {
        console.log('set启用了');
        this._address = value
    }
}
let stu = new Student('北京', 18);
console.log(stu.address);//不加下划线 相当于通过get set去访问【输出“get启用了  北京”】
// console.log(stu._address); //加上下划线 相当于是正常的属性访问

// stu.address = '上海';
// stu._address = '上海'; //加上下划线，是正常的修改属性值
console.log(stu);
```

