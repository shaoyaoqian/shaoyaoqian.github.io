
const temp_comments = document.getElementsByClassName('data-waline');

if(temp_comments.length){
  // waline
  const waline = {
    cdn : {
        'js': 'https://cdn.staticfile.org/waline/2.14.7/waline.min.js',
        'css': 'https://cdn.staticfile.org/waline/2.14.7/waline.min.css'
    }
  }

  // waline
  const els = document.getElementsByClassName('main-inner');
  if (els.length>0){
    el = els[0];
  }
  let waline_comments = document.createElement('div')
  waline_comments.setAttribute('class','comments')
  waline_comments.setAttribute('id','waline')
  el.appendChild(waline_comments);
  loadCSS(waline.cdn.css);
  loadScript(waline.cdn.js).then(()=>{
    const waline = Waline.init({
      el: '#waline',
      serverURL: 'https://waline.pengfeima.cn',
      // 更新waline配置，启动图片上传功能
      // https://waline.js.org/cookbook/reactivity.html
      imageUploader: function(file) {
        let headers = new Headers();
        headers.set('Accept', 'application/json');
        headers.set('token', '7aebca24b8ba799d3b9a4a71b3e2e8fc')
        let formData = new FormData();
        formData.append('image', file);
        return fetch('https://img.ink/api/upload',{
          method: 'POST',
          body: formData,
          headers: headers
          }).then((resp) => resp.json())
            .then((resp) => resp.data.url)
      },
      // 自定义表情
      emoji: [
        'https://gcore.jsdelivr.net/gh/norevi/waline-blobcatemojis@1.0/blobs',
      ],
      // 浏览统计
      pageview: true,
      // 评论统计
      comment: true,
    });
  });
} else {
  loadScript('https://cdn.staticfile.org/waline/2.14.7/pageview.min.js').then(()=>{
    Waline.pageviewCount({
      serverURL: 'https://waline.pengfeima.cn',
      path: window.location.pathname,

      // 可选的，用于自定选择器，默认为 `'.waline-pageview-count'`
      // selector: 'waline-pageview-count',

      // 可选的，是否在获取时增加访问量，默认为 `true`
      // update: true,
    });
  });
}



// 评论数
{/* <span class="post-meta-item"> 
    <span class="post-meta-item-icon">
      <i class="far fa-comment"></i>
    </span>
    <span class="post-meta-item-text">Waline：</span>
    <a title="waline" href="/posts/undefined/#waline" itemprop="discussionUrl">
      <span class="post-comments-count waline-comment-count" data-path="/posts/undefined/" itemprop="commentCount">1</span>
    </a>
</span> */}
  
  