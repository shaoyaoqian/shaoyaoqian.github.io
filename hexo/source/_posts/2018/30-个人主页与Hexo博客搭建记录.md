---
title: 个人主页与 Hexo 博客搭建记录
categories: [笔记]
tags: [blog]
pid: 30
license: false
cc_license: true
date: 2018-06-06 18:03:02

---

最近参考了 [班班](https://pinlyu.com/posts/30/) 的博客重新设计了自己的博客，打算写个总结。我认为博客的内容最重要，而不是形式，因此本站的风格偏向于简洁。

<!--more-->

## 1. 域名与解析

考虑到访问速度和运营成本，本站使用了 **GitHub、Vercel、Cloudflare、又拍云**四家公司提供的服务。GitHub生成和存储静态网站，Vercel提供网站托管服务，Cloudflare提供域名解析服务，又拍云提供CDN服务。

### 1.1 GitHub

创建一个名为shaoyaoqian.github.io的仓库，source分支存储源码，main分支存储静态文件，静态文件由source分支的源码通过GitHub Action生成。

### 1.2 Vercel

1. 登陆Vercel，进入控制台，点击 [Add new...->project](https://vercel.com/new) 创建项目
2. 选择网站的代码仓库，点击import导入代码
3. 配置项目，填写合适的项目名，点击Deploy部署
    ![导入GitHub仓库](https://githubimages.pengfeima.cn/images/202302031219030.png)
    ![填写项目名](https://githubimages.pengfeima.cn/images/202302031754257.png)
5. 部署完成后，点击 Add Domain
    ![添加域名](https://githubimages.pengfeima.cn/images/202302031225453.png)
6. 填入自定义域名，点击 `Add`（此处有一个Vercel分配的默认域名： shaoyaoqian-github-io-2enj.vercel.app，此域名可以访问网站）
    ![添加域名](https://githubimages.pengfeima.cn/images/202302031228930.png)
7. 添加自定义域名后，Vercel会提供一个CNAME的值
    ![等待域名解析](https://githubimages.pengfeima.cn/images/202302031232250.png)

### 1.3 Cloudflare

在域名解析处将Vercel提供的CNAME填入。图中示例为Cloudflare提供的域名解析服务，阿里云等其他域名解析服务商的设置也是类似的。
![添加域名解析](https://githubimages.pengfeima.cn/images/202302031215908.png)

### 1.4 又拍云
国内用户访问网站需使用国内云服务商提供的CDN加速服务，本站使用的是又拍云加速。
1. 创建CDN服务
  ![创建CDN服务](https://githubimages.pengfeima.cn/images/202302031237980.png)
2. 修改cloufare的解析
  ![又拍云提供的CNAME](https://githubimages.pengfeima.cn/images/202302031827341.png)
  ![修改Cloudflare的域名解析](https://githubimages.pengfeima.cn/images/202302031825498.png)

### 1.5 网站测速

1. lighthouse
```bash
lighthouse https://www.example.com --view
```
2. 
https://www.itdog.cn/http/


## 2. Hexo 初始化

### 2.1 环境配置

{% note info %}
#### 提示
macOS 在编译时候可能会提示没有缺少 Command Line Tools，需要在终端输入 `xcode-select --install`，然后根据提示安装。
{% endnote %}

要使用 Hexo NexT 主题的博客，需要先配置好环境，安装 [Node.js](http://nodejs.org/) 和 [Git](https://git-scm.com/downloads)。安装完成后，在终端中输入以下命令安装 Hexo：

```bash
npm install -g hexo-cli
```

安装 Hexo 完成后，执行下列命令会在指定文件夹中新建所需要的文件：

```bash
# 在指定文件夹中初始化 Hexo
hexo init <folder-path>

# 定位到 Hexo 博客目录
cd <folder-path>

# 安装依赖包
npm install
```

新建完成后，指定文件夹的目录中：

- `_config.yml` 站点配置文件，具体配置的说明可以查看相关 [文档](https://hexo.io/zh-cn/docs/configuration.html)。
- `themes` 主题文件夹，Hexo 会根据主题来生成静态页面。
- `source` 文件夹是存放用户资源的地方，Markdown 和 HTML 文件会被解析并放到 `public` 文件夹，而其他文件会被复制过去（如 `CNAME` 文件）。

### 2.2 新建文章与页面

使用以下第一句可以在 `source/_post/` 文件夹下新建一篇文章；使用以下的第二句可以在 `source` 下新建以 `<page-title>` 为名称的文件夹，文件夹内的 `index.md` 可以在编译后生成一个新的页面。

```bash
# 新建文章
hexo new "<post-title>"

# 新建页面
hexo new page "<page-title>"
```

因为原始的都是 Markdown 文件，要让浏览器可以显示美观的网页，需要根据 Markdown 文件生成 HTML 静态文件。执行以下命令：

```bash
# 生成静态文件，或者 hexo g
hexo generate
```

在某些情况，如果发现对站点的更改无论如何也不生效，可能需要运行该命令，清除缓存文件 `db.json` 和已生成的静态文件 `/public/`。

```bash
hexo clean
```

### 2.3 本地预览调试与部署网站

要在本地预览调试生成的博客网页效果，可以执行以下命令。访问网址为：`http://localhost:4000/`。

```bash
hexo serve
```

如果是部署在 GitHub Pages，可以按照下述命令配置站点配置文件（注意缩进保持一致）：

```yaml
# Deployment
deploy:
  - type: git
    repo: https://github.com/<github-username>/<github-repo-name>.git
    branch: <github-repo-branch>
```

设置完成后，执行以下命令。第一次执行过程中会提示输入相应用户名和密码，正确输入后既可以正常部署。

```bash
# 首次部署要先执行以下命令安装插件
npm i hexo-deployer-git

# 部署网站
hexo deploy
```

在两条命令直接采用 `&&` 进行连接即可同时执行两条命令。另外，使用以下的命令可以简化命令的使用：

```bash
# 启动服务器之前预先生成静态文件，等价于 hexo g && hexo s
hexo s -g

# 静态文件生成后立即部署网站，等价于 hexo g && hexo d
hexo g -d
```

### 2.4 添加文章命令后自动打开编辑器

参考：[Hexo添加文章时自动打开编辑器 - Doublemine](https://notes.wanghao.work/2015-06-29-Hexo添加文章时自动打开编辑器.html)

在**站点**文件夹根目录新建文件夹 `scripts`，然后在文件夹内新建文件 `openeditor.js`：

```javascript
//Windows
var spawn = require('child_process').exec;
hexo.on('new', function(data){
	spawn('start  "markdown编辑器绝对路径.exe" ' + data.path);
});

//macOS
var exec = require('child_process').exec;
hexo.on('new', function(data){
	exec('open -a "markdown编辑器绝对路径.app" ' + data.path);
});
```

## 3. 博客主题自定义

### 3.1 修改主题

可以执行以下命令下载主题文件，当然也可以从 GitHub [直接下载](https://github.com/theme-next/hexo-theme-next/releases) 最新版本压缩包，解压后将文件放在 `/themes/next` 目录下面。

```bash
cd <blog-path>  #定位到 Hexo 博客目录
git clone https://github.com/theme-next/hexo-theme-next themes/next
```

另一种是通过添加子模块的方法载入主题文件：

```bash
git submodule add https://github.com/theme-next/hexo-theme-next themes/next
```

下载主题文件后，打开博客根目录下的站点配置文件（`/_config.yml`），找到 `theme` 键值，将值修改为 `next` 即可。

{% note warning %}
#### 注意
图片图标文件可以放到 `/themes/next/source/images/`（默认图标放在这里）或者 `/source/` 目录下。如果图标文件放至在 `/themes/next/source/images/` 目录下，务必注意不要和目录下的默认图标文件名一样，否则在生成静态文件的时候会被默认文件会覆盖。
{% endnote %}

### 3.3 与主题样式一致的404页面

要生成一个和主题样式一致的404页面，首先需要新建一个页面：

```bash
cd <blog-path>
hexo new page "404"
```

编辑该页面的 Markdown 文件为以下内容，正文部分可以自行编辑内容。其中 `permalink: /404` 表示将该文件解析生成的 HTML 文件永久链接设置为 `/404`，这样就可以让访客访问错误链接时看到这个页面了。

```markdown
---
title: 404 Not Found
comments: false
permalink: /404
---
```

### 3.4 修改文章永久性链接

这里使用插件 `hexo-abbrlink` 来生成博客文章的永久链接，可以查看该插件的 [GitHub 项目页面](https://github.com/Rozbo/hexo-abbrlink)。

```bash
cd <blog-path>
npm i hexo-abbrlink
```

在站点配置文件中修改 `permalink`：

```diff
- permalink: :year/:month/:day/:title/
+ permalink: posts/:abbrlink/
+ abbrlink:
+   alg: crc32  #support crc16(default) and crc32
+   rep: hex    #support dec(default) and hex
```

### 3.5 文章置顶

首先替换给文章排序索引的原有插件 `hexo-generator-index`，执行以下命令

```bash
npm uni hexo-generator-index && npm i hexo-generator-indexed
```

然后在需要置顶的文章的开头添加 `sticky: true` 控制文章置顶：

### 3.6 豆瓣读书电影游戏展示

如果想在博客中展示自己在豆瓣上的读书、电影、游戏等的信息，可以安装插件 [`hexo-douban`](https://github.com/mythsman/hexo-douban)。而要增加知乎、豆瓣图标支持，请阅读《 [Hexo NexT 博客增加知乎豆瓣图标支持](/posts/32/)》。

但是，该插件在 Safari 浏览器下无法显示豆瓣读书中书籍封面图片。需要做的修改就是让页面自动判断是不是豆瓣读书页面，如果是就加载一句 meta 信息，否则就不加载。所以，把以下这段代码加入到 `/source/_data/head.swig` 之中：

```javascript
<script>
  function GetUrlRelativePath() {
    var url = document.location.toString(); //获取当前链接
    var arrUrl = url.split("//");
    var start = arrUrl[1].indexOf("/");
    var relUrl = arrUrl[1].substring(start); //截取从start开始到结尾的所有字符
    if(relUrl.indexOf("?") != -1){
      relUrl = relUrl.split("?")[0];
    }
      return relUrl;
  }
  var relUrl = GetUrlRelativePath()
  if (relUrl.indexOf('/books/')>=0) {  //判断是否为豆瓣读书页面
    document.write('<meta name="referrer" content="never" />');
  }
</script>
```

因为这里利用到了主题注入功能，所以需要在**主题配置文件**启用该功能：

```diff
  custom_file_path:
-   #head: source/_data/head.swig
+   head: source/_data/head.swig
```

### 3.7 Travis CI 持续集成

具体方法可以查看 [Hexo遇上Travis-CI：可能是最通俗易懂的自动发布博客图文教程](https://juejin.im/post/5a1fa30c6fb9a045263b5d2a)。需要提醒的是目前 Travis CI 已经计划逐渐把 [travis-ci.org](https://travis-ci.org) 的项目迁移到 [travis-ci.com](https://travis-ci.com) ，所以只需要用后者即可。这样就可以让 Travis CI 监视 GitHub 上博客源文件分支的变动，自动生成博客静态网页文件并部署到 GitHub Pages。

### 3.8 相册

关于创建瀑布流的相册，请查看《[Hexo NexT 博客增加瀑布流相册页面](/posts/31/)》。

文章图片的存储如果放至在博客项目下，会极大地增加项目的空间。所以可以将图片上传到图床，然后在需要图片的地方引用该图片外部链接即可。我现在选择了腾讯云的 COS 对象存储，提供每个月 10GB 的免费外网下行流量，以及每个月 50GB 的免费存储空间。

另外介绍一个 macOS 上十分实用的批量打水印免费软件 [XnConvert](http://www.xnview.com/en/xnconvert/)，可以查阅 [使用说明](https://ningselect.com/2017/02/25/攝影小教室-超簡單！一招幫所/)。

## 4. MarkDown 参考

### 4.1 上下标

```markdown
19^th^
H~2~O
```
19^th^
H~2~O

### 4.2 下划线/插入

```markdown
++Inserted text++
```
++Inserted text++

### 4.3 段首空两格

```markdown
<!-- 段首空两格 -->{% indent %} 
```

### 4.4 脚注

```markdown
Footnote 1 link[^firstaa].

Footnote 2 link[^second].

Inline footnote^[Text of inline footnote] definition.

Duplicated footnote reference[^second].

[^firstaa]: Footnote **can have markup**

    and multiple paragraphs.

[^second]: Footnote text.
```
Footnote 1 link[^firstaa].

Footnote 2 link[^second].

Inline footnote^[Text of inline footnote] definition.

Duplicated footnote reference[^second].

[^firstaa]: Footnote **can have markup**

    and multiple paragraphs.

[^second]: Footnote text.

## 5. 提示卡片

```markdown
{% note %}
#### Header
(without define class style)
{% endnote %}
```

{% note %}
#### Header
(without define class style)
{% endnote %}

```markdown
{% note default %}
#### Default Header
Welcome to [Hexo!](https://hexo.io)
{% endnote %}
```

{% note default %}
#### Default Header
Welcome to [Hexo!](https://hexo.io)
{% endnote %}

```markdown
{% note primary %}
#### Primary Header
**Welcome** to [Hexo!](https://hexo.io)
{% endnote %}
```

{% note primary %}
#### Primary Header
**Welcome** to [Hexo!](https://hexo.io)
{% endnote %}

```markdown
{% note info %}
#### Info Header
**Welcome** to [Hexo!](https://hexo.io)
{% endnote %}
```

{% note info %}
#### Info Header
**Welcome** to [Hexo!](https://hexo.io)
{% endnote %}

```markdown
{% note success %}
#### Success Header
**Welcome** to [Hexo!](https://hexo.io)
{% endnote %}
```

{% note success %}
#### Success Header
**Welcome** to [Hexo!](https://hexo.io)
{% endnote %}

```markdown
{% note warning %}
#### Warning Header
**Welcome** to [Hexo!](https://hexo.io)
{% endnote %}
```

{% note warning %}
#### Warning Header
**Welcome** to [Hexo!](https://hexo.io)
{% endnote %}

```markdown
{% note danger %}
#### Danger Header
**Welcome** to [Hexo!](https://hexo.io)
{% endnote %}
```

{% note danger %}
#### Danger Header
**Welcome** to [Hexo!](https://hexo.io)
{% endnote %}

```markdown
{% note info no-icon %}
#### No icon note
Note **without** icon: `note info no-icon`
{% endnote %}
```

{% note info no-icon %}
#### No icon note
Note **without** icon: `note info no-icon`
{% endnote %}

```markdown
{% note primary This is a summary %}
#### Details and summary
Note with summary: `note primary This is a summary`
{% endnote %}
```

{% note primary This is a summary %}
#### Details and summary
Note with summary: `note primary This is a summary`
{% endnote %}

```markdown
{% note info no-icon This is a summary %}
#### Details and summary (No icon)
Note with summary: `note info no-icon This is a summary`
{% endnote %}
```

{% note info no-icon This is a summary %}
#### Details and summary (No icon)
Note with summary: `note info no-icon This is a summary`
{% endnote %}





