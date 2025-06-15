---
title: commonJs与Es6Module
date: 2022-11-03 00:44:14
permalink:
updated: 2022-11-03 00:44:14
tags: js
categories: 学习
top: true
swiper_index: 3
top_group_index: 3
top_img:
comments:
cover: /img/12.webp
main_color: '#857bae'
copyright:
copyright_author:
copyright_url:
aplayer:
highlight_shrink:
aside:
---
## 一、commonJs模块化规范
【1.js文件直接输出结果；2.须在node 环境使用，html不认识require，报错Uncaught ReferenceError: require is not defined】
目录结构：
{% tip cogs %}
--index.js【入口js，该js文件使用“require 关键字”引入 小模块nodeOut.js】
--nodeOut.js【小模块，该js文件使用“exports 关键字”暴露 数据】
{% endtip %}

》》nodeOut.js 暴露 数据：
注意：（若引入的是没有 通过exports暴露的 模块（js文件），会得到一个空对象 {} ）
1.被引入模块的（js文件,例如nodeOut.js）中，通过exports暴露的是 至少包含一个 键值对 的 对象；被引入模块的（json文件）中，通过exports暴露的是“json文件中的内容”。
将要引入 模块的（js文件）中，通过require('.js')引入的是 至少包含一个 键值对 的 对象。
示例：暴露（一个数据） 
```js
exports.address = '郑州'，

或

let address = '郑州';
exports.address = address;//暴露出 只包含一个键值对 的对象 {address:"郑州"}
```

两种方式都一样，通过require('./nodeOut.js')引入，
```js
let a = require('./nodeOut.js');
console.log(a);// {address:"郑州"}
```

2. 示例：暴露（多个数据）
```js
let names = '张三';
function logout(){
    console.log('退出');
}

方式1：(直接导出 1个对象！其中 每个键值对的 键、值 名相同，可简写一个名字)
module.exports = {
    names:names, logout
}
方式2：
exports.names = names;

function暴露方式1：exports.logout = logout;
或者 不在上面声明 具名函数，而直接 暴露 出：【如下方式 单独暴露 函数，导出的是 匿名 函数体（两种暴露function方式最终的“引用的传递”效果相同）】
function暴露方式2：exports.logout = function () {
    console.log('退出');
};
```

》》index.js 引入数据：
let a = require('./nodeOut.js');
console.log(a);
通过function暴露方式1 输出： { names: '张三', logout: [Function:logout] }，
通过function暴露方式2 输出： { names: '张三', logout: [Function] }
a.logout();// 退出

{% tip sync %}
【重点总结：无论是 方式1、方式2 哪种暴露方式，最终导出的本质都是一个对象，可以通过该对象的“属性”来访问暴露的功能。】
【补充：json文件只有 2种 数据格式："string"，，，，[{"string"}] 或 [{"string":"string"}]】
{% endtip %}

3.引入模块时，通过require('./a')，可省略 拓展名，具体有3种情况：
将要引入 模块的 index.js文件 所在目录中，
若同时有a.js、a.json、(文件夹)a/index.js，通过require('./a')引入的 默认是 a.js；
目录结构：

{% tip cogs %}
--a/index.js
--a.json
--a.js
--index.js

若同时有a.json、(文件夹)a/index.js，没有a.js，则通过require('./a')引入的 默认是 a.json；
目录结构：
--a/index.js
--a.json
--index.js

若只有 (文件夹)a/index.js，则通过require('./a')引入的 默认是 同目录a文件夹下的 index.js；
目录结构：
--a/index.js
--index.js
{% endtip %}

```js
let a = require('./a');
console.log(a);
```

## 二、es6提出的ESmodule模块化规范
【1.html通过`<script src:"js文件" type:"module"></script>`引入js文件后，html页面输出结果；2.浏览器客户端中使用】
{% tip sync %}
【补充：
---同源策略：页面之间的数据传输的基础是同源（协议、域名、端口号 都相同），否则会出现“跨域”错误;
---不同于 commonJs中的require('a')，函数import('.js')中的“拓展名”，不能省略！只能import('a.js')
---不同于 commonJs中的 exports.key名 = value值、module.exports = {key:value}，前面暴露的必须是个对象a（let a = require('a')引入后，可直接通过“a.属性名”访问）；
{% endtip %}

1. ESmodule中"命名导出"方式，（即export let 变量名、或 export{ 变量名1，函数名1} ）暴露的也都是一个对象。
注意：
暴露出的 变量名、函数名 或类名 作为该对象的“属性名”（都要在import处必须使用 {}“解构”要导入的“同名属性”，如import {name,fn} from './toolA.js'导入，之后fn函数可直接"fn()"调用。）。 
2. 通过export default暴露的内容可以是一个对象、函数、类、基本数据类型等任何合法的JavaScript表达式，并不一定是一个对象。它们可以直接通过import语句“自定义模块名”导入，而无需使用 {} 解构。
】
目录结构：
{% tip cogs %}
--index.html【主页面，该文件以`<script src="./main.js" type="module"></script>`方式引入， 并执行main.js。[script标签可以跨域请求资源]】
--main.js【入口js，该js文件使用“import {变量名} from '路径' ”引入 大模块tool.js】
--tool/tool.js【大模块，该js文件使用“export 关键字”暴露 数据】
--tool/toolA.js【tool.js中的 小模块toolA.js，该js文件使用“export 关键字”暴露 数据】
--tool/toolB.js【tool.js中的 小模块toolB.js，该js文件使用“export 关键字”暴露 数据】
{% endtip %}

》》小模块toolA.js 暴露数据：
【“命名导出”允许为模块中的多个功能分别指定导出名称。一个模块可以有多个命名导出。使用命名导出后，在引入该模块时，要使用 {} 解构，且只能使用原名称，可直接“原方法名()”调用。即必须import {name,fn} from './toolA.js'导入，fn函数可直接"fn()"调用。】
“命名导出”方式1（即将"声明"直接通过"export关键字"导出。也可理解为将 变量名(或函数名)分别 导出）：
```js
export var name = '张三';
export function fn(){
    console.log('这里是 toolA.js');
}
```

“命名导出”方式2（等同于 方式1，即先"声明"，再通过"export关键字"将"对象字面量{name,fn}"导出。也可理解为将需要暴露的 变量名(或函数名) 都放入 export{ } 中一起 导出）
```js
var name = '张三'
function fn(){
    console.log('这里是 toolA.js');
}
export{
    name,fn    
}
```
方式3，
【“default默认导出”允许将一个模块中的主要功能（通常是一个函数、类或对象）标记为默认导出；
一个模块只能有一个默认导出；
export default 后面应该跟着一个表达式（如函数的赋值表达式）或值。不能跟函数定义（函数体）
默认导出的好处在于，在导入时可以使用任何名称，导入时不需要通过 {}解构。】
可将 需要暴露的数据放入 obj 对象中，default 暴露obj。那么，在 大模块tool.js中 则不需要 import {变量名1，函数名1...} 引入，而是直接 import  某对象名（任意名称） 引入。

```js
var name = '张三'
function fn(){
    console.log('这里是 toolA.js');
}
let obj = {
    name: name,
    fn: fn
}
export default obj;// 【默认导出obj对象，注意有 default 关键字。另外，default对象形式 导出，在另一个js文件中 要以import “任意对象名” 接收。通过“任意对象名.方法名”使用。】
```
{% tip sync %}
【补充：
export default getAvatar = () => console.log('111')；
导出时使用“默认导出”，导入时可以使用任意的名称，不需要{}解构。如import fnn from './*.js'后，直接fnn(); //111
export const getAvatar = () => console.log('111')；
导出时使用“命名导出”，导入时需要使用与导出名称相匹配名称，且要加上 {} 解构。如import {getAvatar} from './*.js'后，getAvatar(); //111
】
{% endtip %}

这样做对 后续演示 影响较大，这里直接展示 大模块tool.js更改后的代码：
```js
import obj from './toolA.js'
console.log(obj);// {name: '张三',  fn: ƒ}
obj.fn();// "这里是 toolA.js"
```

》》小模块toolB.js 暴露数据（方式 同理toolA.js）：
```js
export function gn(){
    console.log('这里是 toolB.js');
}
export var age= 18;
```

》》大模块tool.js 引入、暴露数据：
方式1：
```js
// 导入【注意：{}中是 变量名(或函数名) 的 集合，整体 非对象】
import {fn,name} from './toolA.js'
import {gn,age} from './toolB.js'
// 导出【注意：{}中是 变量名(或函数名) 的 集合，整体 可理解为一个对象】
export {
    fn,name,gn,age
}
```

可简写为，方式2（引入 每个 小模块 暴露出的所有数据、并直接 暴露，tool.js作用是数据中转。）
```js
export * from './toolA.js'
export * from './toolB.js'
```

》》入口文件main.js 引入数据：
方式1：
```js
import {name ,age , fn, gn} from './tools/tool.js';//导入的变量名不能更改！必须与 大模块tool.js暴露出的 变量名(或函数名) 对应。
console.log(name);// 张三
fn();// "这里是 toolA.js"
```

这里可为 "大模块tool.js暴露出的变量名(或函数名)" 取 别名a,b,f,g，在main中直接使用 别名（之后该别名 默认为 常量，不能被重新赋值）
```js
import {name as a,age as b,fn as f,,gn as g} from './tools/tool.js'
// a = 'zhang';  // 别名a是常量，不能被赋值！
console.log(a);// 张三
```

【注意：通过 "import {变量名} from '路径' ”引入，该语句只能写在 js文件 最上面，而不能 写在 执行语句 中。如若要按需引入，可以通过 变量 接收 import()的返回值（它是个promise对象）】
示例：
```js
// 需求：当你flag是true的时候 导入a.js  当你flag是false的时候 导入b.js
async function fn() {
    var flag = true;
    var res;
    if (flag) {
        // import 'obj1' from './a.js'; // 导入语句只能写在最上面 
        res = import('./a.js');
        console.log(res);// import()函数 导入的是一个promise对象
        res.then(value => {
            console.log(value.default);// 当a.js中数据暴露方式 是export default obj时，value会添加一个default属性，其值是obj
            console.log(value);// 当a.js中数据暴露方式 不是export default obj时，a.js暴露出几个变量(或函数) ，value就会添加几个属性，属性名 与a.js暴露的 变量名(或函数名) 一致。
        })
    }
}
fn();
```
