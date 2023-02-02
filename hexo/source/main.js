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
