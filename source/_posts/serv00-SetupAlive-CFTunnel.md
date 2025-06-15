---
title: serv00-SetupAlive-CFTunnel
main_color: '#87F978'
date: 2025-04-02 21:33:44
updated: 2025-04-02 21:33:44
permalink:
tags: CF
categories: 学习
cover:
top:
swiper_index:
top_group_index:
copyright:
copyright_url:
copyright_author:
description:
---

## 准备工作
1. 将CFTunnel命名为`eamon-worker`。
2. 服务器 主要目录结构：

   > —home/
   > 	— 根目录（用户名）/
   > 	— `cloudflared可执行文件`
   > 	— .cloudflared/
   > 		— `cert.pem`文件
   > 		—  `...789abc.json`
   > 		—  `config.yml`



**注意`cloudflared可执行文件`所在位置，此种情形下：
`./cloudflared tunnel run`等同于`~/cloudflared tunnel run`**



## 下载cloudflared可执行文件
### 方式一：

将[cloudflared可执行文件](https://cloudflared.bowring.uk/binaries/cloudflared-freebsd-2024.11.1.7z)下载到本地并解压后，上传到serv00服务器目录（此为`/home/user`根目录）。

### 方式二：

使用SSH客户端命令行工具 `下载、解压、重命名`可执行文件，若`wget命令`被禁用，可用`curl -L 命令`尝试。

```shell
wget https://cloudflared.bowring.uk/binaries/cloudflared-freebsd-latest.7z && 7z x cloudflared-freebsd-latest.7z && rm cloudflared-freebsd-latest.7z && mv -f ./temp/* ./cloudflared && rm -rf temp
```

## 建立CFTunnel的`两种`方式：
### 方式一：
1. 登录CF，依次进入`zero trust => 网络 => Tunnel`界面；
2. 创建`Cloudflare隧道`，为tunnel命名；
3. 保存对应使用场景下，自动分配给该tunnel的token令牌；
4. 填写tunnel将要绑定的hostname和service等信息；
5. 待tunnel配置完毕后，在SSH命令窗（`cloudflared执行文件`所在路径）执行以下代码`启动CFTunnel`：
```shell
./cloudflared tunnel --edge-ip-version auto --protocol http2 --heartbeat-interval 10s run --token <分配的token值`eyJhIjoi...`>
```



### 方式二（CF本地隧道，本地关机有影响）：
在SSH命令窗（`cloudflared执行文件`所在路径）执行以下代码：
1. 认证CF账（认证成功会生成`cert.pem`，授予了全局访问权限）
  ```shell
./cloudflared tunnel login
  ```
  它会给你一个 URL，在浏览器打开并登录 Cloudflare，之后选择你要绑定的域名。
2. 创建隧道（创建成功会生成`.json认证文件`）
  ```shell
./cloudflared tunnel create eamon-worker
  ```
  这会返回一个 Tunnel ID，比如：
  ```shell
Created tunnel eamon-worker with id 12345678-1234-1234-1234-123456789abc
  ```

3. 配置隧道
  ```shell
mkdir -p ~/.cloudflared
nano ~/.cloudflared/config.yml
  ```
> 目的：当请求 eamon-worker.yourdomain.com 时（不怕域名被封），会先经过边缘节点众多的Cloudflare，再到 serv00（也不怕域名被封，ip不被封就没问题），再到eamon.pages.dev。
这样 serv00 不需要拥有自己的域名，但可以让 CF 托管的域名动态解析到 eamon.pages.dev，避免 DNS 污染和封锁问题。

config.yml内容如下：
  ```yml
tunnel: 12345678-1234-1234-1234-123456789abc
credentials-file: /home/你的用户名/.cloudflared/12345678-1234-1234-1234-123456789abc.json
ingress:
  - hostname: eamon-worker.yourdomain.com
    service: https://eamon.pages.dev
  - service: http_status:404
  ```

4. 启动CFTunnel
  ```shell
./cloudflared tunnel run eamon-worker
  ```
#### ⚠️ 注意：
  1. `hostname`需要是你在 Cloudflare 上的 自定义域名。
  2. `service`是你的目标网站（这里是 eamon.pages.dev）。
  3. `.json认证文件`会自动生成在`~/.cloudflared/`里。
  4. 由于 serv00 没有 root 权限，你 不能使用 systemctl 或 sudo，但可以手动运行 cloudflared，然后使用 nohup 或 screen 让它保持后台运行。
  5. serv00 服务器 会定期杀进程，推荐 cron 保活，因为 screen 或 nohup 无法在进程被杀后自动重启。


## serv00服务器上的CFTunnel保活
#### CFTunnel后台运行的2种方式（即使 SSH 断开，它仍然保持运行）：

1. screen，适合手动管理，随时可以进入查看日志
```shell
screen -S cf-tunnel ~/cloudflared tunnel run eamon-worker
```

2. nohup 方式，比screen轻量级

```shell
# 后台持续启动
nohup ~/cloudflared tunnel run eamon-worker > ~/cloudflared.log 2>&1 &

# 停止 nohup 运行
pkill -f "cloudflared tunnel"
```
> 解释：
> nohup → 让进程忽略 SIGHUP 信号，SSH 断开后仍继续运行；
> ~/cloudflared.log 2>&1 → 把日志输出到 cloudflared.log，便于查看；
> & → 让进程在后台运行；


#### cron 自动重启进程（进程挂掉时，5 分钟内自动重启）

```shell
crontab -e # 编辑cron任务（取消cron自动重启时，就将内容注释掉）

*/5 * * * * pgrep -f "cloudflared tunnel" > /dev/null || ./cloudflared tunnel run eamon-worker # 添加命令

crontab -l # 检查cron是否启用

pgrep cron || nohup cron > /dev/null 2>&1 & # 手动启用cron

crontab -r # 清空所有cron任务，慎用！！
```
> 解释：
> */5 * * * * → 每 5 分钟执行一次;
> pgrep -f "cloudflared tunnel" → 查找是否有 cloudflared tunnel 进程在运行;
> /dev/null → 把 pgrep 的输出丢弃（防止 cron 生成不必要的邮件）;
> || → 如果 pgrep 找不到进程（即 cloudflared 没在运行），就执行后面的cloudflared tunnel run serv00-tunnel