const axios = require('axios');

// 配置
const CLOUDFLARE_API_TOKEN = 'BFiIvWheCQIlUnMyL5Z4jSNLz9Hatq1__l-q4Eom';
const CLOUDFLARE_ACCOUNT_ID = '2791cb4505dcb6e88b57a79bac09c635';
const CLOUDFLARE_PROJECT_NAME = 'eamon';
const CLOUDFLARE_API_URL = `https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}/pages/projects/${CLOUDFLARE_PROJECT_NAME}/deployments`;
// const CLOUDFLARE_ZONE_ID = 'ce1ab135a3202a6ae078dda34009ce0a';
const CLOUDFLARE_ZONE_IDS = [
  { id: 'ce1ab135a3202a6ae078dda34009ce0a', name: 'eamon.dpdns.org' },
  { id: '61fc7ebb2294f19bc733492f4743828d', name: 'eamon.ggff.net' },
];
// const CLOUDFLARE_CACHE_API = `https://api.cloudflare.com/client/v4/zones/${CLOUDFLARE_ZONE_ID}/purge_cache`;

// 清理缓存
async function clearCacheForZone(zone) {
  const apiUrl = `https://api.cloudflare.com/client/v4/zones/${zone.id}/purge_cache`;

  try {
    const response = await axios.post(
      apiUrl,
      { purge_everything: true },
      {
        headers: {
          Authorization: `Bearer ${CLOUDFLARE_API_TOKEN}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.data.success) {
      console.log(`Cloudflare 缓存(${zone.name} 区域)已清理成功！`);
    } else {
      console.error(`缓存清理失败（${zone.name}）：`, response.data.errors);
    }
  } catch (error) {
    console.error(`清理缓存失败（${zone.name}）：`, error.message);
  }
}

// 检查部署状态
async function checkDeploymentStatus() {
  try {
    const response = await axios.get(CLOUDFLARE_API_URL, {
      headers: {
        Authorization: `Bearer ${CLOUDFLARE_API_TOKEN}`,
      },
    });

    const deployments = response.data.result;
    const latestDeployment = deployments[0]; // 获取最新的部署
    console.log('CF pages最新部署状态：', latestDeployment.latest_stage);

    return latestDeployment.latest_stage.status === 'success';
  } catch (error) {
    console.error('检查部署状态失败：', error.message);
    return false;
  }
}

// 轮询部署状态
async function pollDeploymentStatus() {
  console.log('开始轮询CF pages 部署状态...');
  const interval = 10000; // 每 10 秒轮询一次
  const maxRetries = 4; // 最大轮询次数
  let retries = 0;

  return new Promise((resolve, reject) => {
    const intervalId = setInterval(async () => {
      retries++;
      console.log(`轮询第 ${retries} 次...`);

      const isSuccess = await checkDeploymentStatus();

      if (isSuccess) {
        console.log('CF pages 部署成功！');
        clearInterval(intervalId);
        resolve();
      } else if (retries >= maxRetries) {
        console.error('轮询超时，CF pages 部署未成功');
        clearInterval(intervalId);
        reject(new Error('轮询超时'));
      }
    }, interval);
  });
}

// 主函数
async function main() {
  try {
    await pollDeploymentStatus();
    for (const zone of CLOUDFLARE_ZONE_IDS) {
      await clearCacheForZone(zone);
    }
  } catch (error) {
    console.error('处理流程失败：', error.message);
  }
}

// 导出钩子函数
hexo.extend.console.register('cf', '清理 Cloudflare 缓存', async () => {
  try {
    await main();
  } catch (error) {
    console.error('after_deploy 钩子执行失败：', error.message);
  }
});

