HTMLElement.prototype.wrap=function(e){this.parentNode.insertBefore(e,this),this.parentNode.removeChild(this),e.appendChild(this)},function(){var e=()=>document.dispatchEvent(new Event("page:loaded",{bubbles:!0}));"loading"===document.readyState?document.addEventListener("readystatechange",e,{once:!0}):e(),document.addEventListener("pjax:success",e)}(),NexT.utils={registerExtURL:function(){document.querySelectorAll("span.exturl").forEach(e=>{var t=document.createElement("a");t.href=decodeURIComponent(atob(e.dataset.url).split("").map(e=>"%"+("00"+e.charCodeAt(0).toString(16)).slice(-2)).join("")),t.rel="noopener external nofollow noreferrer",t.target="_blank",t.className=e.className,t.title=e.title,t.innerHTML=e.innerHTML,e.parentNode.replaceChild(t,e)})},registerCodeblock:function(e){let o=!!e,t=(o?e:document).querySelectorAll("figure.highlight"),a=!0;0===t.length&&(t=document.querySelectorAll("pre:not(.mermaid)"),a=!1),t.forEach(i=>{if(!o){let e=i.querySelectorAll(".code .line span");(e=0===e.length?i.querySelectorAll("code.highlight span"):e).forEach(t=>{t.classList.forEach(e=>{t.classList.replace(e,"hljs-"+e)})})}var n,e=parseInt(window.getComputedStyle(i).height.replace("px",""),10),e=CONFIG.fold.enable&&e>CONFIG.fold.height;if(e||CONFIG.copycode.enable){let t;if(a&&"mac"===CONFIG.copycode.style)t=i;else{let e=i.querySelector(".code-container");e||(n=i.querySelector(".table-container")||i,(e=document.createElement("div")).className="code-container",n.wrap(e),e.classList.add("notranslate")),t=e}if(e&&!t.classList.contains("unfold")&&(t.classList.add("highlight-fold"),t.insertAdjacentHTML("beforeend",'<div class="fold-cover"></div><div class="expand-btn"><i class="fa fa-angle-down fa-fw"></i></div>'),t.querySelector(".expand-btn").addEventListener("click",()=>{t.classList.remove("highlight-fold"),t.classList.add("unfold")})),!o&&CONFIG.copycode.enable){t.insertAdjacentHTML("beforeend",'<div class="copy-btn"><i class="fa fa-copy fa-fw"></i></div>');let n=t.querySelector(".copy-btn");n.addEventListener("click",()=>{var e,t=(i.querySelector(".code")||i.querySelector("code")).innerText;navigator.clipboard?navigator.clipboard.writeText(t).then(()=>{n.querySelector("i").className="fa fa-check-circle fa-fw"},()=>{n.querySelector("i").className="fa fa-times-circle fa-fw"}):((e=document.createElement("textarea")).style.top=window.scrollY+"px",e.style.position="absolute",e.style.opacity="0",e.readOnly=!0,e.value=t,document.body.append(e),e.select(),e.setSelectionRange(0,t.length),e.readOnly=!1,t=document.execCommand("copy"),n.querySelector("i").className=t?"fa fa-check-circle fa-fw":"fa fa-times-circle fa-fw",e.blur(),n.blur(),document.body.removeChild(e))}),i.addEventListener("mouseleave",()=>{setTimeout(()=>{n.querySelector("i").className="fa fa-copy fa-fw"},300)})}}})},wrapTableWithBox:function(){document.querySelectorAll("table").forEach(e=>{var t=document.createElement("div");t.className="table-container",e.wrap(t)})},registerVideoIframe:function(){document.querySelectorAll("iframe").forEach(t=>{var e,n,i;["www.youtube.com","player.vimeo.com","player.youku.com","player.bilibili.com","www.tudou.com"].some(e=>t.src.includes(e))&&!t.parentNode.matches(".video-container")&&((e=document.createElement("div")).className="video-container",t.wrap(e),n=Number(t.width),i=Number(t.height),n)&&i&&(e.style.paddingTop=i/n*100+"%")})},updateActiveNav:function(){if(Array.isArray(NexT.utils.sections)){let e=NexT.utils.sections.findIndex(e=>e&&10<e.getBoundingClientRect().top);-1===e?e=NexT.utils.sections.length-1:0<e&&e--,this.activateNavByIndex(e)}},registerScrollPercent:function(){let t=document.querySelector(".back-to-top"),n=document.querySelector(".reading-progress-bar");window.addEventListener("scroll",()=>{var e;(t||n)&&(e=0<(e=document.body.scrollHeight-window.innerHeight)?Math.min(100*window.scrollY/e,100):0,t&&(t.classList.toggle("back-to-top-on",5<=Math.round(e)),t.querySelector("span").innerText=Math.round(e)+"%"),n)&&n.style.setProperty("--progress",e.toFixed(2)+"%"),this.updateActiveNav()},{passive:!0}),t&&t.addEventListener("click",()=>{window.anime({targets:document.scrollingElement,duration:500,easing:"linear",scrollTop:0})})},registerTabsTag:function(){document.querySelectorAll(".tabs ul.nav-tabs .tab").forEach(l=>{l.addEventListener("click",e=>{if(e.preventDefault(),!l.classList.contains("active")){e=l.parentNode;let t=e.nextElementSibling;t.style.overflow="hidden",t.style.transition="height 1s";var r=t.querySelector(".active")||t.firstElementChild,c=parseInt(window.getComputedStyle(r).height.replace("px",""),10)||0;let n=parseInt(window.getComputedStyle(r).paddingTop.replace("px",""),10),i=parseInt(window.getComputedStyle(r.firstElementChild).marginBottom.replace("px",""),10),o=(t.style.height=c+n+i+"px",[...e.children].forEach(e=>{e.classList.toggle("active",e===l)}),document.getElementById(l.querySelector("a").getAttribute("href").replace("#",""))),a=([...o.parentNode.children].forEach(e=>{e.classList.toggle("active",e===o)}),o.dispatchEvent(new Event("tabs:click",{bubbles:!0})),document.body.scrollHeight>(window.innerHeight||document.documentElement.clientHeight));r=parseInt(window.getComputedStyle(t.querySelector(".active")).height.replace("px",""),10);t.style.height=r+n+i+"px",setTimeout(()=>{var e;document.body.scrollHeight>(window.innerHeight||document.documentElement.clientHeight)!=a&&(t.style.transition="height 0.3s linear",e=parseInt(window.getComputedStyle(t.querySelector(".active")).height.replace("px",""),10),t.style.height=e+n+i+"px"),setTimeout(()=>{t.style.transition="",t.style.height=""},250)},1e3),CONFIG.stickytabs&&(c=e.parentNode.getBoundingClientRect().top+window.scrollY+10,window.anime({targets:document.scrollingElement,duration:500,easing:"linear",scrollTop:c}))}})}),window.dispatchEvent(new Event("tabs:register"))},registerCanIUseTag:function(){window.addEventListener("message",({data:e})=>{var t;"string"==typeof e&&e.includes("ciu_embed")&&(t=e.split(":")[1],e=e.split(":")[2],document.querySelector(`iframe[data-feature=${t}]`).style.height=parseInt(e,10)+5+"px")},!1)},registerActiveMenuItem:function(){document.querySelectorAll(".menu-item a[href]").forEach(e=>{var t=e.pathname===location.pathname||e.pathname===location.pathname.replace("index.html",""),n=!CONFIG.root.startsWith(e.pathname)&&location.pathname.startsWith(e.pathname);e.classList.toggle("menu-item-active",e.hostname===location.hostname&&(t||n))})},registerLangSelect:function(){document.querySelectorAll(".lang-select").forEach(e=>{e.value=CONFIG.page.lang,e.addEventListener("change",()=>{let t=e.options[e.selectedIndex];document.querySelectorAll(".lang-select-label span").forEach(e=>{e.innerText=t.text}),window.location.href=t.dataset.href})})},registerSidebarTOC:function(){this.sections=[...document.querySelectorAll(".post-toc:not(.placeholder-toc) li a.nav-link")].map(t=>{let n=document.getElementById(decodeURI(t.getAttribute("href")).replace("#",""));return t.addEventListener("click",e=>{e.preventDefault();e=n.getBoundingClientRect().top+window.scrollY;window.anime({targets:document.scrollingElement,duration:500,easing:"linear",scrollTop:e,complete:()=>{history.pushState(null,document.title,t.href)}})}),n}),this.updateActiveNav()},registerPostReward:function(){var e=document.querySelector(".reward-container button");e&&e.addEventListener("click",()=>{document.querySelector(".post-reward").classList.toggle("active")})},activateNavByIndex:function(n){var i=document.querySelector(".post-toc:not(.placeholder-toc) .nav");if(i){var o=i.querySelectorAll(".nav-item"),n=o[n];if(n&&!n.classList.contains("active-current")){var a=o[o.length-1].offsetHeight;i.querySelectorAll(".active").forEach(e=>{e.classList.remove("active","active-current")}),n.classList.add("active","active-current");let e=n.querySelector(".nav-child")||n.parentElement,t=0;for(;i.contains(e);)e.classList.contains("nav-item")?e.classList.add("active"):(t+=a*e.childElementCount+5,e.style.setProperty("--height",t+"px")),e=e.parentElement;o=document.querySelector("Pisces"===CONFIG.scheme||"Gemini"===CONFIG.scheme?".sidebar-panel-container":".sidebar");document.querySelector(".sidebar-toc-active")&&window.anime({targets:o,duration:200,easing:"linear",scrollTop:o.scrollTop-o.offsetHeight/2+n.getBoundingClientRect().top-o.getBoundingClientRect().top})}}},updateSidebarPosition:function(){if(!(window.innerWidth<1200||"Pisces"===CONFIG.scheme||"Gemini"===CONFIG.scheme)){var t=document.querySelector(".post-toc:not(.placeholder-toc)");let e=CONFIG.page.sidebar;(e="boolean"!=typeof e?"always"===CONFIG.sidebar.display||"post"===CONFIG.sidebar.display&&t:e)&&window.dispatchEvent(new Event("sidebar:show"))}},activateSidebarPanel:function(t){var n=document.querySelector(".sidebar-inner"),i=["sidebar-toc-active","sidebar-overview-active"];if(!n.classList.contains(i[t])){var o=n.querySelector(".sidebar-panel-container"),a=o.firstElementChild,r=o.lastElementChild;let e=a.scrollHeight;a=[e=0===t&&(a=a.querySelector(".nav"))?parseInt(a.style.getPropertyValue("--height"),10):e,r.scrollHeight];o.style.setProperty("--inactive-panel-height",a[1-t]+"px"),o.style.setProperty("--active-panel-height",a[t]+"px"),n.classList.replace(i[1-t],i[t])}},updateFooterPosition:function(){function e(){var e=document.querySelector(".footer"),t=document.querySelector(".main").offsetHeight+e.offsetHeight;e.classList.toggle("footer-fixed",t<=window.innerHeight)}"Pisces"!==CONFIG.scheme&&"Gemini"!==CONFIG.scheme&&(e(),window.addEventListener("resize",e),window.addEventListener("scroll",e,{passive:!0}))},getScript:function(i,e={},t){if("function"==typeof e)return this.getScript(i,{condition:t}).then(e);let{condition:n=!1,attributes:{id:o="",async:a=!1,defer:r=!1,crossOrigin:c="",dataset:l={},...s}={},parentNode:d=null}=e;return new Promise((e,t)=>{if(n)e();else{let n=document.createElement("script");o&&(n.id=o),c&&(n.crossOrigin=c),n.async=a,n.defer=r,Object.assign(n.dataset,l),Object.entries(s).forEach(([e,t])=>{n.setAttribute(e,String(t))}),n.onload=e,n.onerror=t,"object"==typeof i?({url:e,integrity:t}=i,n.src=e,t&&(n.integrity=t,n.crossOrigin="anonymous")):n.src=i,(d||document.head).appendChild(n)}})},loadComments:function(t,e){return e?this.loadComments(t).then(e):new Promise(n=>{var e=document.querySelector(t);CONFIG.comments.lazyload&&e?new IntersectionObserver((e,t)=>{e[0].isIntersecting&&(n(),t.disconnect())}).observe(e):n()})}};