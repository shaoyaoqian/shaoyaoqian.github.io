---
layout:       post
title:        "CDN加速"
subtitle:     "方便国内用户访问搭建在国外服务器上的网站"
author:       "马鹏飞"
date:         2022-11-06 02:23:00
header-img:    img/posts/headings/WechatIMG16.jpeg
header-mask:   0.3   # 因为标题是白色的，可以背景图片调暗
catalog:       false
tags:          [运维]
---
# [ubuntu配置clash系统代理](https://zhuanlan.zhihu.com/p/430035973)

```bash
cd ~
wget http://qiniu.pengfeima.cn/clash-linux-amd64-v1.11.12.gz
gunzip clash-linux-amd64-v1.11.12.gz
mv clash-linux-amd64-v1.11.12 clash
mkdir Clash
mv clash ./Clash
```

```bash
cd ~/Clash
wget -O Country.mmdb http://qiniu.pengfeima.cn/Country.mmdb
```

1. 在windows版的clash中找到yaml文件
2. 打开并加入`secret:123456`
3. 将其拷贝到clash文件夹中
4. 在网络设置中设置代理

![image-20221109201937656](http://qiniu.pengfeima.cn/typora/image-20221109201937656.png)

![image-20221109202226593](http://qiniu.pengfeima.cn/typora/image-20221109202226593.png)

![image-20221109202210698](http://qiniu.pengfeima.cn/typora/image-20221109202210698.png)

![image-20221109202339678](http://qiniu.pengfeima.cn/typora/image-20221109202339678.png)

1. 启动clash
2. 在浏览器中打开http://clash.razord.top/面板
3. 输入参数

```bash
cd ~/Clash
chmod +x clash
./clash -d .
```

![image-20221109202650007](http://qiniu.pengfeima.cn/typora/image-20221109202650007.png)

[ubuntu配置clash系统代理](https://zhuanlan.zhihu.com/p/430035973)

```bash
cd ~
wget http://qiniu.pengfeima.cn/clash-linux-amd64-v1.11.12.gz
gunzip clash-linux-amd64-v1.11.12.gz
mv clash-linux-amd64-v1.11.12 clash
mkdir Clash
mv clash ./Clash
```

```bash
cd ~/Clash
wget -O Country.mmdb http://qiniu.pengfeima.cn/Country.mmdb
```

1. 在windows版的clash中找到yaml文件
2. 打开并加入`secret:123456`
3. 将其拷贝到clash文件夹中
4. 在网络设置中设置代理

![image-20221109201937656](http://qiniu.pengfeima.cn/typora/image-20221109201937656.png)

![image-20221109202226593](http://qiniu.pengfeima.cn/typora/image-20221109202226593.png)

![image-20221109202210698](http://qiniu.pengfeima.cn/typora/image-20221109202210698.png)

![image-20221109202339678](http://qiniu.pengfeima.cn/typora/image-20221109202339678.png)

1. 启动clash
2. 在浏览器中打开http://clash.razord.top/面板
3. 输入参数

```bash
cd ~/Clash
chmod +x clash
./clash -d .
```

![image-20221109202650007](http://qiniu.pengfeima.cn/typora/image-20221109202650007.png)

至此，能正常访问谷歌学术。

命令行代理：

