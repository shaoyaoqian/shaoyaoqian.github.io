// 后端
console.log('后端代码');


// 评论
// TODO：在中加入评论元素中加入评论，和.post-block并列
// 参考： https://github.com/walinejs/waline/commit/1364169c3583b24f47fbc14b4ef4ad325d803e51#diff-966ad5d6023a36421991fa4d4abf68625518a46b7227683a1436d29db493a71f


// 着重号
hexo.extend.tag.register('dot', function (args) {
    return `<span class="emphasis-point">${args.join(' ')}</span>`;
});


// 相册
hexo.extend.tag.register('gallery', require('./lib/gallery')(hexo), true)

module.exports = ctx => function(args, content) {
    // TODO : 解析这些参数，并在 main.js 文件中调用。
    args = ctx.args.map(args, ['captions', 'rowHeight', 'maxRowCount', 'margins', 'border', 'lastRow']);
    var el = '';
    var id = Math.random().toString(36).slice(2);
    function slide() {
      let imgs = ctx.render.renderSync({text: content, engine: 'markdown'});
      imgs = imgs.match(/<img(.*?)src="(.*?)"(.*?)>/gi);
      if (imgs && imgs.length > 0) {
        imgs.forEach((img, i) => {
          // WARN: 不应当懒加载，需要获取图片长宽信息。
          img = img.replace('<img src', '<img no-lazy src');
          var caption = img.match(/\salt=['"](.*?)['"]/)[1];
          var href = img.match(/\ssrc=['"](.*?)['"]/)[1];//.slice(5,-1);
          // HACK: 对于图片 `https://githubimages.pengfeima.cn/images/${filename}.${suffix}` 都有略缩图
          //               `https://githubimages.pengfeima.cn/images/compressed/${filename}webp`
          var href_ = href.match(/https\:\/\/githubimages\.pengfeima\.cn\/images\/[0-9,\-]+\./);
          if (href_){
            var filename = href_[0].split('/')[4];
            var href_thumbnail = `https://githubimages.pengfeima.cn/images/compressed/${filename}webp`
            img = img.replace(href, href_thumbnail);
          }
          el += '<a data-fancybox="' + id + '" data-caption="' + caption + '" href="' + href + '">';
          el += img;
          el += '</a>';
        })
      }
    }
    // 赋予其唯一的ID
    el += '<div id="'+id+'" class="justified-gallery tile-gallery">'
    slide()
    el += '</div>'
    return el
  }