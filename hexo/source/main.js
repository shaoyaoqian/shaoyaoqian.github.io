// 前端
console.log('前端代码');


// Justified Gallery
const gallery = {
    justifiedGallery : {
        'js': 'https://cdn.staticfile.org/justifiedGallery/3.8.1/js/jquery.justifiedGallery.min.js',
        'css': 'https://cdn.staticfile.org/justifiedGallery/3.8.1/css/justifiedGallery.min.css'
    }
}
// 懒加载 css https://github.com/filamentgroup/loadCSS
let loadCSS = (href, before, media, attributes) => {
    var doc = window.document;
    var ss = doc.createElement("link");
    var ref;
    if (before) {
      ref = before;
    } else {
      var refs = (doc.body || doc.getElementsByTagName("head")[0]).childNodes;
      ref = refs[refs.length - 1];
    }
    var sheets = doc.styleSheets;
    if (attributes) {
      for (var attributeName in attributes) {
        if (attributes.hasOwnProperty(attributeName)) {
          ss.setAttribute(attributeName, attributes[attributeName]);
        }
      }
    }
    ss.rel = "stylesheet";
    ss.href = href;
    ss.media = "only x";
    function ready(cb) {
      if (doc.body) {
        return cb();
      }
      setTimeout(function () {
        ready(cb);
      });
    }
    ready(function () {
      ref.parentNode.insertBefore(ss, before ? ref : ref.nextSibling);
    });
    var onloadcssdefined = function (cb) {
      var resolvedHref = ss.href;
      var i = sheets.length;
      while (i--) {
        if (sheets[i].href === resolvedHref) {
          return cb();
        }
      }
      setTimeout(function () {
        onloadcssdefined(cb);
      });
    };
    function loadCB() {
      if (ss.addEventListener) {
        ss.removeEventListener("load", loadCB);
      }
      ss.media = media || "all";
    }
    if (ss.addEventListener) {
      ss.addEventListener("load", loadCB);
    }
    ss.onloadcssdefined = onloadcssdefined;
    onloadcssdefined(loadCB);
    return ss;
  }
// 从 butterfly 和 volantis 获得灵感
let loadScript = (src, opt) => new Promise((resolve, reject) => {
    var script = document.createElement('script');
    script.src = src;
    if (opt) {
        for (let key of Object.keys(opt)) {
        script[key] = opt[key]
        }
    } else {
        // 默认异步，如果需要同步，第二个参数传入 {} 即可
        script.async = true
    }
    script.onerror = reject
    script.onload = script.onreadystatechange = function() {
        const loadState = this.readyState
        if (loadState && loadState !== 'loaded' && loadState !== 'complete') return
        script.onload = script.onreadystatechange = null
        resolve()
    }
    document.head.appendChild(script)
    }),
// https://github.com/jerryc127/hexo-theme-butterfly
loadjQuery = (fn) => {
    if (typeof jQuery === 'undefined') {
        loadScript('https://gcore.jsdelivr.net/npm/jquery@3.6.2/dist/jquery.min.js').then(fn)
    } else {
        fn()
    }
}

// Fancybox 运行之后再运行 Justified Gallery
function justified_gallery(container){
    $(container).justifiedGallery( 
        {
          lastRow : 'left', 
          captions: false,
          margins : 3,
          border: -1
        }
    ).on('jp.complete', function () {
      $.fancybox.defaults.hash = false;
      $('.fancybox').fancybox({
        loop   : true,
        helpers: {
          overlay: {
            locked: false
          }
        }
      });
  });
};



loadjQuery(() => {
  loadCSS(gallery.justifiedGallery.css);
  loadScript(gallery.justifiedGallery.js).then(()=>{
    var els = document.getElementsByClassName('tile-gallery');
    for (var i = 0; i<els.length; i++){
      var el = els[i];
      var id = "#" + el.getAttribute('id');
      justified_gallery(id)
    }
  });
});


// 更新waline配置，启动图片上传功能
// https://waline.js.org/cookbook/reactivity.html
// waline.update({
//   imageUploader: function(file) {
//     let headers = new Headers();
//     headers.set('Accept', 'application/json');
//     headers.set('token', '7aebca24b8ba799d3b9a4a71b3e2e8fc')
//     let formData = new FormData();
//     formData.append('<%= theme.comments.waline.imageUploader?.fileName %>', file);
//     return fetch('https://img.ink/api/upload',{
//         method: 'POST',
//             body: formData,
//             headers: headers
//             }).then((resp) => resp.json())
//               .then((resp) => resp.data.url)
//     },
//   }
// );



const InfiniteScrollGallery = {
  requestAPI: (url, callback, timeout) => {
    let retryTimes = 5;
    function request() {
      return new Promise((resolve, reject) => {
        let status = 0; // 0 等待 1 完成 2 超时
        let timer = setTimeout(() => {
          if (status === 0) {
            status = 2;
            timer = null;
            reject('请求超时');
            if (retryTimes == 0) {
              timeout();
            }
          }
        }, 5000);
        fetch(url).then(function(response) {
          if (status !== 2) {
            clearTimeout(timer);
            resolve(response);
            timer = null;
            status = 1;
          }
          if (response.ok) {
            return response.json();
          }
          throw new Error('Network response was not ok.');
        }).then(function(data) {
          retryTimes = 0;
          callback(data);
        }).catch(function(error) {
          if (retryTimes > 0) {
            retryTimes -= 1;
            setTimeout(() => {
              request();
            }, 5000);
          } else {
            timeout();
          }
        });
      });
    }
    request();
  },
  layoutDiv: (cfg) => {
    const el = $(cfg.el)[0];
    $(el).append('<div class="loading-wrap"><svg xmlns="http://www.w3.org/2000/svg" width="2rem" height="2rem" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="2"><path stroke-dasharray="60" stroke-dashoffset="60" stroke-opacity=".3" d="M12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3Z"><animate fill="freeze" attributeName="stroke-dashoffset" dur="1.3s" values="60;0"/></path><path stroke-dasharray="15" stroke-dashoffset="15" d="M12 3C16.9706 3 21 7.02944 21 12"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.3s" values="15;0"/><animateTransform attributeName="transform" dur="1.5s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"/></path></g></svg></div>');
    InfiniteScrollGallery.requestAPI(cfg.api, function(data) {
      $(el).find('.loading-wrap').remove();
      // 初始化
      // $("#" + cfg.id).justifiedGallery(
      //   {
      //     lastRow : 'left', 
      //     captions: false,
      //     margins : 3,
      //     border: -1
      //   }
      // )
      // 挑选出图片
      var pictures_list = [];
      data.forEach((item, i) => {
        console.log(item);
        console.log(i);
        console.log(item.name);
        temp_name = item.name.split('.');
        console.log(temp_name);
        if (temp_name[temp_name.length-1] == 'jpg' || temp_name[temp_name.length-1] == 'webp' || temp_name[temp_name.length-1] == 'png'){
          pictures_list.push(item.name)
        }
      });
      pictures_list.forEach((picture, i) => {
        var picname = picture.split('.')[0];
        var href = cfg.cdn + picture;
        var img = `<img no-lazy src="${href}" alt="${picname}">`;
        var el = '<a fancybox="true" data-fancybox="' + cfg.id + '" data-caption="'+picname+'" target="_blank" rel="noopener" href="'+href+'">';
        el += img;
        el += '</a>';
        $("#" + cfg.id).append(el);
      });
      $("#" + cfg.id).justifiedGallery( 
        {
          lastRow : 'left', 
          captions: false,
          margins : 3,
          border: -1
        }
      );
    }, function() {
      $(el).find('.loading-wrap svg').remove();
      $(el).find('.loading-wrap').append('<svg xmlns="http://www.w3.org/2000/svg" width="2rem" height="2rem" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path stroke-dasharray="60" stroke-dashoffset="60" d="M12 3L21 20H3L12 3Z"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.5s" values="60;0"/></path><path stroke-dasharray="6" stroke-dashoffset="6" d="M12 10V14"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.6s" dur="0.2s" values="6;0"/></path></g><circle cx="12" cy="17" r="1" fill="currentColor" fill-opacity="0"><animate fill="freeze" attributeName="fill-opacity" begin="0.8s" dur="0.4s" values="0;1"/></circle></svg>');
      $(el).find('.loading-wrap').addClass('error');
    });
  },  
}



loadCSS(gallery.justifiedGallery.css);
loadjQuery(() => {
  loadScript(gallery.justifiedGallery.js).then(()=>{
    var cfg = new Object();
    cfg.api = "https://api.github.com/repos/shaoyaoqian/shaoyaoqian.github.io/contents/hexo/source/img/album-zhoujielun?ref=source";
    cfg.cdn = "https://raw.githubusercontent.com/shaoyaoqian/shaoyaoqian.github.io/source/hexo/source/img/album-zhoujielun/"
    cfg.id  = "0xje8cj39d0e";
    if (document.getElementById(cfg.id)) {
      InfiniteScrollGallery.layoutDiv(cfg);
    }

  });
});



