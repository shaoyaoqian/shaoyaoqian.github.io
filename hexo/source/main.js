// 前端
console.log('前端代码');

// Justified Gallery
var gallery = {
  justifiedGallery: {
    'js': 'https://cdn.staticfile.org/justifiedGallery/3.8.1/js/jquery.justifiedGallery.min.js',
    'css': 'https://cdn.staticfile.org/justifiedGallery/3.8.1/css/justifiedGallery.min.css'
  }
}
var loadCSS = (href, before, media, attributes) => {
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
};

var loadScript = (src, opt) => new Promise((resolve, reject) => {
  var script = document.createElement('script');
  script.src = src;
  if (opt) {
    for (var key of Object.keys(opt)) {
      script[key] = opt[key]
    }
  } else {
    // 默认异步，如果需要同步，第二个参数传入 {} 即可
    script.async = true
  }
  script.onerror = reject
  script.onload = script.onreadystatechange = function () {
    var loadState = this.readyState
    if (loadState && loadState !== 'loaded' && loadState !== 'complete') return
    script.onload = script.onreadystatechange = null
    resolve()
  }
  document.head.appendChild(script)
});

var loadjQuery = (fn) => {
  if (typeof jQuery === 'undefined') {
    loadScript('https://gcore.jsdelivr.net/npm/jquery@3.6.2/dist/jquery.min.js').then(fn)
  } else {
    fn()
  }
};

var loadUrl = (url, callback, timeout) => {
  var retryTimes = 5;
  function request() {
    return new Promise((resolve, reject) => {
      var status = 0; // 0 等待 1 完成 2 超时
      var timer = setTimeout(() => {
        if (status === 0) {
          status = 2;
          timer = null;
          reject('请求超时');
          if (retryTimes == 0) {
            timeout();
          }
        }
      }, 5000);
      fetch(url).then(function (response) {
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
      }).then(function (data) {
        retryTimes = 0;
        callback(data);
      }).catch(function (error) {
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
}

// 先运行 Fancybox 再运行 Justified Gallery
function justified_gallery(container) {
  $(container).justifiedGallery(
    {
      lastRow: 'hide',
      captions: true,
      margins: 3,
      border: -1
    }
  ).on('jp.complete', function () {
    $.fancybox.defaults.hash = false;
    $('.fancybox').fancybox({
      loop: true,
      helpers: {
        overlay: {
          locked: false
        }
      }
    });
  });
};

var InfiniteScrollGallery = {
  layoutDiv: (cfg) => {
    var el = $(cfg.el)[0];
    $(el).append('<div class="loading-wrap"><svg xmlns="http://www.w3.org/2000/svg" width="2rem" height="2rem" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="2"><path stroke-dasharray="60" stroke-dashoffset="60" stroke-opacity=".3" d="M12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3Z"><animate fill="freeze" attributeName="stroke-dashoffset" dur="1.3s" values="60;0"/></path><path stroke-dasharray="15" stroke-dashoffset="15" d="M12 3C16.9706 3 21 7.02944 21 12"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.3s" values="15;0"/><animateTransform attributeName="transform" dur="1.5s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"/></path></g></svg></div>');
    loadUrl(cfg.api, function (data) {
      $(el).find('.loading-wrap').remove();
      // 挑选出图片
      var pictures_list = [];
      data.forEach((item, i) => {
        console.log(item);
        console.log(i);
        console.log(item.name);
        temp_name = item.name.split('.');
        console.log(temp_name);
        if (temp_name[temp_name.length - 1] == 'jpg' || temp_name[temp_name.length - 1] == 'webp' || temp_name[temp_name.length - 1] == 'png') {
          pictures_list.push(item.name)
        }
      });
      // 渲染每张图片
      pictures_list.forEach((picture, i) => {
        var picname = picture.split('.')[0];
        var href = cfg.cdn + picture;
        var img = `<img no-lazy src="${href}" alt="${picname}">`;
        var el = '<a fancybox="true" data-fancybox="' + cfg.id + '" data-caption="' + picname + '" target="_blank" rel="noopener" href="' + href + '">';
        el += img;
        el += '</a>';
        $("#" + cfg.id).append(el);
      });
      justified_gallery("#" + cfg.id);
    }, function () {
      $(el).find('.loading-wrap svg').remove();
      $(el).find('.loading-wrap').append('<svg xmlns="http://www.w3.org/2000/svg" width="2rem" height="2rem" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path stroke-dasharray="60" stroke-dashoffset="60" d="M12 3L21 20H3L12 3Z"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.5s" values="60;0"/></path><path stroke-dasharray="6" stroke-dashoffset="6" d="M12 10V14"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.6s" dur="0.2s" values="6;0"/></path></g><circle cx="12" cy="17" r="1" fill="currentColor" fill-opacity="0"><animate fill="freeze" attributeName="fill-opacity" begin="0.8s" dur="0.4s" values="0;1"/></circle></svg>');
      $(el).find('.loading-wrap').addClass('error');
    });
  },
}

/// 如果有相册链接则处理相册链接
loadjQuery(() => {
  loadCSS(gallery.justifiedGallery.css);
  loadScript(gallery.justifiedGallery.js).then(() => {
    var cfg = new Object();
    cfg.api = "https://api.github.com/repos/shaoyaoqian/shaoyaoqian.github.io/contents/hexo/source/img/album-zhoujielun?ref=source";
    cfg.cdn = "https://www.pengfeima.cn/img/album-zhoujielun/"
    cfg.id = "0xje8cj39d0e";
    if (document.getElementById(cfg.id)) {
      InfiniteScrollGallery.layoutDiv(cfg);
    }

  });
});

/// 如果没有相册链接则处理相片
loadjQuery(() => {
  loadCSS(gallery.justifiedGallery.css);
  loadScript(gallery.justifiedGallery.js).then(() => {
    var els = document.getElementsByClassName('tile-gallery');
    for (var i = 0; i < els.length; i++) {
      var el = els[i];
      var id = "#" + el.getAttribute('id');
      justified_gallery(id)
    }
  });
});

// 画折线图
loadScript("https://cdn.staticfile.org/Chart.js/4.3.0/chart.umd.min.js").then(() => {
  Chart.defaults.font.family = 'LXGW WenKai';
  const ctx = document.getElementById('myChart');
  const labels = ['8月15日', '8月18日', '8月19日', '8月20日', '8月20日', '8月15日', '9月30日', '10月14日', '11月9日', '11月11日', '12月7日', '12月14日', '12月21日', '2024年1月6日', '1月18日', '2月21日', '2月25日', '3月16日', '4月18日', '5月3日', '5月6日','5月27日'];
  data_e_money = [121.72, 127.49, 129.17, 140.40, 241.17, 241.17, 241.17, 241.17, 361.17, 370.99, 383, 433, 533, 533, 533, 533, 533, 640.5, 640.5, 640.5, 644.3, 851.3];
  data_e_consume = [160.4, 168.6, 171.1, 187.1, 188.2, 268.2, 268.2, 315.9, 381.7, 425.8, 475.5, 513.7, 565.9, 614.5, 666.6, 736.2, 773.4, 831.6, 896.2, 946.0, 963.7, 1016.5];
  data_oil_money = [200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 300, 300, 300, 400, 400, 400, 400, 400, 400,400];
  data_oil_consume = [11.4, 11.5, 11.5, 11.8, 11.8, 12.4, 12.4, 12.7, 14.7, 17.1, 18.9, 19.3, 19.8, 21.9, 22.5, 25.9, 30.5, 31, 31.5, 32.4, 34.5,34.7];
  data_distance = [1115, 1171, 1183, 1308, 1316, 1849, 2013, 2121, 2583, 2844, 3159, 3243, 3425, 3656, 3863, 4113, 4346, 4765, 5202, 5490, 5775,6133];
  data_money = [];
  data_all_money = [];
  for (let index = 0; index < data_e_money.length; index++) {
    data_money.push((data_e_money[index] + data_oil_money[index]) / data_distance[index]);
    data_all_money.push(data_e_money[index] + data_oil_money[index]);
  }

  const data_1 = {
    labels: labels,
    datasets: [
      {
        label: '总费用',
        data: data_all_money,
        cubicInterpolationMode: 'monotone',
        spanGaps: true,
        yAxisID: 'y',
      },
      {
        label: '油费',
        data: data_oil_money,
        cubicInterpolationMode: 'monotone',
        spanGaps: true,
        yAxisID: 'y',
      },
      {
        label: '电费',
        data: data_e_money,
        yAxisID: 'y',
        cubicInterpolationMode: 'monotone',
        spanGaps: true,
      },
      {
        label: '电量',
        data: data_e_consume,
        yAxisID: 'y',
        cubicInterpolationMode: 'monotone',
        spanGaps: true,
      },
      {
        label: '油量',
        data: data_oil_consume,
        yAxisID: 'y',
        cubicInterpolationMode: 'monotone',
        spanGaps: true,
      },
      {
        label: '平均',
        data: data_money,
        yAxisID: 'y',
        cubicInterpolationMode: 'monotone',
        spanGaps: true,
      },
      {
        label: '里程',
        data: data_distance,
        yAxisID: 'y1',
        cubicInterpolationMode: 'monotone',
        spanGaps: true,
      }
    ]
  };

  const config_1 = {
    type: 'line',
    data: data_1,
    options: {
      responsive: true,
      interaction: {
        mode: 'index',
        intersect: false,
      },
      stacked: false,
      plugins: {
        title: {
          display: true,
          text: '2023年行车费用',

          font: {
            size: 20,
            weight: 'bold',
          },
          padding: { top: 0, left: 0, right: 0, bottom: 20 }

        },
      },
      scales: {
        x: {
          display: false,
          title: {
            display: true,
            // text: '图1：啊啊啊',
            padding: { top: 10, left: 0, right: 0, bottom: 10 }
          }
        },
        y: {
          type: 'linear',
          display: true,
          position: 'left',
          title: {
            display: true,
            text: '油/电费(元)'
          },
        },
        y1: {
          type: 'linear',
          display: true,
          position: 'right',
          title: {
            display: true,
            text: '里程(公里)'
          },
          // grid line settings
          grid: {
            drawOnChartArea: false, // only want the grid lines for one axis to show up
          },
        },
      }
    },
  };
  new Chart(ctx, config_1);

});






