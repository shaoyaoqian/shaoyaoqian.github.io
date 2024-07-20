// // 后端
// console.log('后端代码');

// // 着重号
// hexo.extend.tag.register('dot', function (args) {
//   return `<span class="emphasis-point">${args.join(' ')}</span>`;
// });


// // 友链列表
// hexo.extend.tag.register('linklist', function (args) {
//   const iconSrc = 'https://cos.pinlyu.com/links/' + args + '/';
//   const jsonSrc = 'https://githubimages.pengfeima.cn/json/NEXT/' + args + '.json';
//   return `<div class="link-list" icon-src="${iconSrc}" json-src="${jsonSrc}"></div>`;
// });


// // 相册
// hexo.extend.tag.register('gallery',
//   function (args, content) {
//     // TODO : 解析这些参数并在 main.js 文件中调用。
//     // args = args.map(args, ['captions', 'rowHeight', 'maxRowCount', 'margins', 'border', 'lastRow']);
//     var el = '';
//     var id = Math.random().toString(36).slice(2);
//     function slide() {
//       let imgs = hexo.render.renderSync({ text: content, engine: 'markdown' });
//       imgs = imgs.match(/<img(.*?)src="(.*?)"(.*?)>/gi);
//       if (imgs && imgs.length > 0) {
//         imgs.forEach((img, i) => {
//           // WARN: 不应当懒加载，需要获取图片长宽信息。
//           img = img.replace('<img src', '<img no-lazy src');
//           var caption = img.match(/\salt=['"](.*?)['"]/)[1];
//           var href = img.match(/\ssrc=['"](.*?)['"]/)[1];//.slice(5,-1);
//           // HACK: 对于图片 `https://githubimages.pengfeima.cn/images/${filename}.${suffix}` 都有略缩图
//           //               `https://githubimages.pengfeima.cn/images/compressed/${filename}webp`
//           var href_ = href.match(/https\:\/\/githubimages\.pengfeima\.cn\/images\/[0-9,\-]+\./);
//           if (href_) {
//             var filename = href_[0].split('/')[4];
//             var href_thumbnail = `https://githubimages.pengfeima.cn/images/compressed/${filename}webp`
//             img = img.replace(href, href_thumbnail);
//           }
//           el += '<a fancybox="true" data-fancybox="' + id + '" data-caption="' + caption + '" href="' + href + '">';
//           el += img;
//           el += '</a>';
//         })
//       }
//     }
//     // 赋予其唯一的ID
//     el += '<div id="' + id + '" class="justified-gallery tile-gallery">'
//     slide()
//     el += '</div>'
//     return el
//   },
//   { ends: true }
// )


// // 时间线
// // 参考: scripts/tags/lib/timeline.js of github repository xaoxuu/hexo-theme-stellar

// function layoutNodeTitle(content) {
//   var el = ''
//   el += '<div class="header">'
//   if (content && content.length > 0) {
//     el += hexo.render.renderSync({ text: content, engine: 'markdown' }).split('\n').join('')
//   }
//   el += '</div>'
//   return el
// }

// function layoutNodeContent(content) {
//   var el = ''
//   el += '<div class="body fs14">'
//   if (content && content.length > 0) {
//     el += hexo.render.renderSync({ text: content, engine: 'markdown' }).split('\n').join('')
//   }
//   el += '</div>'
//   return el
// }

// function arrayToArgsObject(arr) {
//   const argsObject = {};

//   arr.forEach(item => {
//     const keyValue = item.split(/=|:/);
//     if (keyValue.length === 2) {
//       const [key, value] = keyValue.map(part => part.trim());
//       argsObject[key] = value;
//     } else {
//       console.error(`Invalid array element: ${item}. Skipping.`);
//     }
//   });

//   return argsObject;
// }

// hexo.extend.tag.register('timeline',
//   function (args, content = '') {
//     args = arrayToArgsObject(args);
//     console.log(args);
//     var el = ''
//     if (!args.type) {
//       args.type = 'timeline'
//     }
//     console.log(args);
//     if (args.api && args.api.length > 0) {
//       el += '<div class="tag-plugin timeline stellar-' + args.type + '-api"'
//       // TODO:把API的参数加进div作为属性
//       // el += ' ' + args.joinTags(args, ['api', 'user', 'limit', 'hide']).join(' ')
//       el += '>'
//     } else {
//       el += '<div class="tag-plugin timeline">'
//     }

//     var arr = content.split(/<!--\s*node (.*?)\s*-->/g).filter(item => item.trim().length > 0)
//     console.log(arr);
//     if (arr.length > 0) {
//       var nodes = []
//       arr.forEach((item, i) => {
//         if (i % 2 == 0) {
//           nodes.push({
//             header: item
//           })
//         } else if (nodes.length > 0) {
//           var node = nodes[nodes.length - 1]
//           if (node.body == undefined) {
//             node.body = item
//           } else {
//             node.body += '\n' + item
//           }
//         }
//       })
//       nodes.forEach((node, i) => {
//         el += '<div class="timenode" index="' + (i) + '">'
//         el += layoutNodeTitle(node.header)
//         el += layoutNodeContent(node.body)
//         el += '</div>'
//       })
//     }

//     el += '</div>'
//     console.log(el)
//     return el
//   },
//   { ends: true }
// )

// // <%
// // function layoutDiv() {
// //   var el = '';
// //   if (item.api == undefined) {
// //     return el;
// //   }
// //   el += '<widget class="widget-wrapper timeline">';
// //     if (item.title) {
// //       el += '<div class="widget-header cap theme dis-select">';
// //       el += '<span class="name">' + item.title + '</span>';
// //       el += '</div>';
// //     }
// //     el += '<div class="widget-body fs14">';
// //       el += '<div class="tag-plugin timeline stellar-' + (item.type || "timeline") + '-api"';
// //       ['api', 'user', 'hide', 'limit'].forEach(key => {
// //         if (item[key]) {
// //           el += ' ' + key + '="' + item[key] + '"';
// //         }
// //       });
// //       el += '>';
// //       el += '</div>';
// //     el += '</div>';
// //   el += '</widget>';
// //   return el;
// // }
// // %>
// // <%- layoutDiv() %>
