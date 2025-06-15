/* 
 *将md文件中的"random_color"替换为随机颜色值
 */
const fs = require('fs');
const path = require('path');

/* 
 *hexo new生成目标md文件时，内部的"random_color"被替换为随机颜色值
 */
hexo.on('new', function (data) {
  console.log('New post created:', data);

  const filePath = data.path; // 获取文章路径
  if (filePath && fs.existsSync(filePath)) {
    console.log('Modifying post file:', filePath);

    const randomColor = generateRandomColor();
    let content = fs.readFileSync(filePath, 'utf8');

    if (content.includes('random_color')) {
      content = content.replace('random_color', randomColor);
      fs.writeFileSync(filePath, content);
      console.log('Random color added:', randomColor);
    } else {
      console.log('No placeholder random_color found.');
    }
  } else {
    console.error('File path is invalid or does not exist:', filePath);
  }
});


/* 
 *hexo g编译md文件时，_post目录中所有md文件中的"random_color"都被替换为随机颜色值
 *当hexo serve运行状态下，打开目标目录中的md文件并写入random_color，保存更改后会立即将其替换为随机值
 */
hexo.extend.filter.register('after_generate', function () {
  const postsDir = path.join(hexo.source_dir, '_posts');
  console.log('Scanning _posts directory:', postsDir);

  // 确保 _posts 目录存在
  if (!fs.existsSync(postsDir)) {
    console.error('_posts directory does not exist:', postsDir);
    return;
  }

  // 遍历 _posts 文件夹中的所有文件
  const files = fs.readdirSync(postsDir);
  files.forEach((file) => {
    const filePath = path.join(postsDir, file);

    // 检查是否为 Markdown 文件
    if (path.extname(file) === '.md') {
      // console.log('Processing file:', filePath);

      let content = fs.readFileSync(filePath, 'utf8');

      // 查找并替换 "random_color"
      if (content.includes('random_color')) {
        const randomColor = generateRandomColor();
        content = content.replace('random_color', randomColor);

        // 写回文件
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Replaced "random_color" with "${randomColor}" in ${file}`);
      } else {
        // console.log(`No "random_color" found in ${file}`);
      }
    }
  });
});


/**
 * 生成随机颜色值（#RRGGBB）
 */
function generateRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return `'${color}'`;
  // return color;
}

console.log('Custom random-color script loaded successfully.');



// function generateRandomColor() {
//   return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
// }



// 补充：递归遍历目录中的 .md 文件
// function processMarkdownFiles(dir) {
//   const files = fs.readdirSync(dir);

//   files.forEach((file) => {
//     const filePath = path.join(dir, file);
//     const stat = fs.statSync(filePath);

//     if (stat.isDirectory()) {
//       // 如果是子文件夹，递归处理
//       processMarkdownFiles(filePath);
//     } else if (stat.isFile() && path.extname(file) === '.md') {
//       // 如果是 .md 文件，替换内容
//       console.log('Processing file:', filePath);

//       let content = fs.readFileSync(filePath, 'utf8');

//       // 查找并替换 "random_color"
//       if (content.includes('random_color')) {
//         const randomColor = generateRandomColor();
//         content = content.replace(/random_color/g, randomColor);

//         // 写回文件
//         fs.writeFileSync(filePath, content, 'utf8');
//         console.log(`Replaced "random_color" with "${randomColor}" in ${file}`);
//       }
//     }
//   });
// }
