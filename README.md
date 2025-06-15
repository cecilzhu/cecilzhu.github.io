## anzhiyu_1.6.14主题中，`被修改过的文件`列表
#### E:\hexopack\blog\themes\anzhiyu_1_6_14
更改sw缓存版本更新后的提示、“更改音乐播放进度 适配，以及广告资源等”跳过sw缓存、sw缓存所有静态资源
* sw-rules.js

#### E:\hexopack\blog\themes\anzhiyu_1_6_14\layout
（解决报错，缺少“换行符”）在文章页指定广告位，手动插入广告
* post.pug

#### E:\hexopack\blog\themes\anzhiyu_1_6_14\layout\includes
第三方脚本加载执行时机，定义网站head头
* additional-js.pug
* head.pug

#### E:\hexopack\blog\themes\anzhiyu_1_6_14\layout\includes\head
使google ad生效的有关配置
* google_adsense.pug
指定pwa启动图标
* pwa.pug
#### E:\hexopack\blog\themes\anzhiyu_1_6_14\layout\includes\mixins
（没变更！可手动指定文章列表的广告位）
* post-ui.pug
#### E:\hexopack\blog\themes\anzhiyu_1_6_14\layout\includes\page
自定义about页面元件
* about.pug
#### E:\hexopack\blog\themes\anzhiyu_1_6_14\layout\includes\third-party
改变aplayer插件css加载时机
* aplayer.pug
#### E:\hexopack\blog\themes\anzhiyu_1_6_14\layout\includes\top
首页顶部推荐位置，手动添加Ad postion
* top.pug
#### E:\hexopack\blog\themes\anzhiyu_1_6_14\layout\includes\widget
阻止side侧边栏出现“自动广告”
* index.pug

#### E:\hexopack\blog\themes\anzhiyu_1_6_14\scripts\events
（解决报错，对象数组结尾多个“逗号”）
* cdn.js
#### E:\hexopack\blog\themes\anzhiyu_1_6_14\scripts\filters
"略改"替换后的img标签属性
* post_lazyload.js
#### E:\hexopack\blog\themes\anzhiyu_1_6_14\scripts\helpers
修改“动态加载js脚本”的挂载位置及执行策略
* inject_head_js.js

  （解决报错，修改hexo生成的**随机脚本 输出目录**“用于`随机友链`及`随机文章`）

* random.js

#### E:\hexopack\blog\themes\anzhiyu_1_6_14\source\css\_third-party
自定义样式【表格横向超出出现滚动条、更改全局字体......】
* cus.styl
（解决报错，a链接cursor属性“缺少缩进”）
* twikoo.styl

#### E:\hexopack\blog\themes\anzhiyu_1_6_14\source\img
（更改“全局图片”）

#### E:\hexopack\blog\themes\anzhiyu_1_6_14\source\js\anzhiyu
热评，改为用户自己的头像
* comment_barrage.js

#### E:\hexopack\blog\themes\anzhiyu_1_6_14\source\js
【额外：将该目录下的所有js脚本，另行压缩备份到**js_min_backup**目录，直接复制到source目录无需重复hexo加工】

