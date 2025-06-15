const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const axios = require('axios');

// 色调获取 API 示例 URL
const API_URL = 'https://img2color.eamon.ggff.net/api';

hexo.extend.filter.register('before_post_render', async function (data) {
  const postsDir = path.join(hexo.source_dir, '_posts');

  // 读取 posts 目录下的所有 Markdown 文件
  const files = fs.readdirSync(postsDir).filter(file => file.endsWith('.md'));

  for (const file of files) {
    const filePath = path.join(postsDir, file);

    // 读取文件内容
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const parsed = matter(fileContent);

    // 提取 Front-Matter 属性
    const { cover, main_color } = parsed.data;

    // 如果 cover 和 main_color 存在并且 main_color 是 'img2color'
    if (cover && main_color === 'img2color') {
      console.log(`处理文件: ${file}`);
      console.log(`  - cover: ${cover}`);
      console.log(`  - main_color: ${main_color}`);

      try {
        // 调用获取图片色调的 API
        const response = await axios.get(API_URL, { params: { img: cover } });
        const color = response.data.RGB; // 假设 API 返回值格式为 { color: '#RRGGBB' }

    // 使用正则替换原始文件中的 main_color
    const updatedContent = fileContent.replace(
      /^(main_color:\s*).*$/m, // 匹配 main_color 属性
      `$1'${color}'` // 替换为新值
    );

    // 写回文件
    fs.writeFileSync(filePath, updatedContent, 'utf8');
    console.log(`  - 文件更新成功: ${filePath}`);

        console.log(`  - 更新成功: main_color -> ${color}`);
      } catch (error) {
        // 打印详细错误日志
        console.error(`处理文件 ${file} 时出错:`);
        console.error(`  - 请求 URL: ${API_URL}`);
        console.error(`  - 请求参数: ${JSON.stringify({ img: cover })}`);
        console.error(`  - 错误状态码: ${error.response?.status || '未知'}`);
        console.error(`  - 错误响应数据: ${JSON.stringify(error.response?.data || '无', null, 2)}`);
        console.error(`  - 错误信息: ${error.message}`);
      }
    }
  }

  // 返回原始数据
  return data;
});
