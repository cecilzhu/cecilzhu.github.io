// 引入引入 CSS 文件
import './public/css/index.css'; // 假设有生成的 CSS 文件


// 引入 JS 文件
// import './public/meting2_custom.js';
// import './public/sw-dom.js';
// import './public/sw.js';
// import './public/js/main.js';
// import './public/js/utils.js';
// import './public/js/tw_cn.js';
// import './public/js/search/local-search.js';
// import './public/js/search/algolia.js';
// import './public/js/anzhiyu/ai_abstract.js';
// import './public/js/anzhiyu/comment_barrage.js';
// import './public/js/anzhiyu/people.js';
// import './public/js/anzhiyu/random_friends_post.js';
// import './public/js/anzhiyu/right_click_menu.js';

// 动态引入 js 文件夹下的所有 JS 文件
// const scripts = require.context('./public/js', true, /\.js$/).keys()
// .filter((key) => !['./anzhiyu/ai_abstract.js','./anzhiyu/random_friends_post.js','./anzhiyu/right_click_menu.js','./search/algolia.js'].includes(key))
// .forEach((key) => {
//   scripts(key);
// });
// // 动态引入 js 文件夹下的所有 JS 文件
// const search_scripts = require.context('./public/js/search', false, /\.js$/);
// search_scripts.keys().forEach((key) => {
//   search_scripts(key);
// });
// // 动态引入 js 文件夹下的所有 JS 文件
// const anzhiyu_scripts = require.context('./public/js/anzhiyu', false, /\.js$/);
// anzhiyu_scripts.keys().forEach((key) => {
//   anzhiyu_scripts(key);
// });


// 动态引入 img 文件夹下的所有图片
// const images = require.context('./public', true, /\.(png|jpe?g|svg|gif)$/);
// images.keys().forEach((key) => {
//   const imgPath = images(key);
//   console.log('Image from img folder:', imgPath);  // 图片路径
// });

// // 动态引入 icons 文件夹下的所有图片
// const icons = require.context('./public/icons', false, /\.(png|jpe?g|svg|gif)$/);
// icons.keys().forEach((key) => {
//   const iconPath = icons(key);
//   console.log('Image from icons folder:', iconPath);  // 图标路径
// });

// // 动态引入 posts 文件夹下的所有图片
const posts_pics = require.context('./public/posts', true, /\.(png|jpe?g|svg|gif)$/);
posts_pics.keys().forEach((key) => {
  const postsPicPath = posts_pics(key);
  console.log('Image from posts_pics folder:', postsPicPath);  // 图标路径
});


// 引入 JSON 文件
// import aJson from './public/json/music.json';
// import bJson from './public/manifest.json';

// console.log('music.json:', aJson);
// console.log('manifest.json:', bJson);



