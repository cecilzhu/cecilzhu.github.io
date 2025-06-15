---
title: cloudflare区域DNS批量删除
date: 2021-01-25 01:52:04
updated: 2021-01-25 01:52:04
categories: 学习
tags: CF
cover: /img/12.webp
main_color: '#857bae'
---

##### 注意：
> **1.默认 每次删除100条dns记录**
> **2.只有 Authorization（API 令牌）；或X-Auth-Email和X-Auth-Key（全局 API 密钥）同时**
> **3.注意分配给apiToken的 细粒度权限**

```
const axios = require('axios');
```

```node.js
// 替换为你的Cloudflare API Token和Zone ID
const apiToken = 'xxxxxxxxxxxxxxxxx';
const zoneId = 'xxxxxxxxxxxxxxxxxxx';

// 设置请求头
const headers = {
  'Authorization': `Bearer ${apiToken}`,
// 'X-Auth-Email':'xxxxxxxx@gmail.com',
// 'X-Auth-Key':'xxxxxxxxxxxxxxxxxxx',
  'Content-Type': 'application/json'
};
```

<!--more-->

```node.js
// 获取DNS记录的URL
const url = `https://api.cloudflare.com/client/v4/zones/${zoneId}/dns_records`;

// 获取DNS记录并删除
axios.get(url, { headers })
  .then(response => {
    const dnsRecords = response.data.result;
      const deletePromises = dnsRecords.map(record => {
      console.log(`Attempting to delete record: ${record.name}`);
      return axios.delete(`${url}/${record.id}`, { headers })
        .then(() => {
          console.log(`Deleted record: ${record.name}`);
        })
        .catch(error => {
          console.error(`Failed to delete record: ${record.name}`, error.response ? error.response.data : error.message);
        });
    }); 
return Promise.all(deletePromises);
  })
  .then(() => {
    console.log('Batch deletion completed.');
  })
  .catch(error => {
    console.error('Failed to fetch DNS records:', error.response ? error.response.data : error.message);
  });
```
