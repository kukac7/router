!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):(t||self).pineconeRouter=e()}(this,function(){function t(){return(t=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(t[o]=n[o])}return t}).apply(this,arguments)}var e=function(t,e){this.params={},this.path=t,this.handlers=e},n=window.location;function o(t,e,n){return{route:t,path:e,params:n,query:window.location.search.substring(1),hash:window.location.hash.substring(1),redirect:function(t){return window.PineconeRouter.navigate(t),"stop"}}}function i(t){return t.replace(/(^\/+|\/+$)/g,"").split("/")}function r(t){if(null!=window.PineconeRouterMiddlewares)for(var e in window.PineconeRouterMiddlewares){var n=window.PineconeRouterMiddlewares[e];if(null==n[t])return;var o=n[t].apply(n,[].slice.call(arguments,1));if("stop"==o)return"stop"}}function a(t,e){if(0==t.length)return!0;for(var n=0;n<t.length;n++)if("function"==typeof t[n]&&"stop"==t[n](e))return!1;return!0}var s={version:"0.3.0",routes:Array(),settings:{hash:!1,basePath:"/",allowNoHandler:!1},clickEvent:document.ontouchstart?"touchstart":"click",currentContext:{},notfound:Array(),start:function(){var e=this;if(!window.Alpine)throw new Error("Alpine is required for `Pinecone Router` to work.");var n=0;window.Alpine.onComponentInitialized(function(o){if(o.$el.hasAttribute("x-router")){var i;if(n>1)throw new Error("Pinecone Router: Only one router can be in a page.");if(e.settings=t({},e.settings,null!=(i=o.getUnobservedData().settings)?i:{}),r("init",o,e.settings),Array.from(o.$el.children).filter(function(t){return"template"==t.tagName.toLowerCase()}).forEach(function(t){return e.processRoute(t,o)}),n++,e.settings.hash){if(""==window.location.hash)return void(document.location.href=window.location.pathname+"#/");e.navigate(window.location.hash.substring(1),!0,!0)}else e.navigate(window.location.pathname,!1,!0)}}),this.interceptLinks(),window.addEventListener("popstate",function(){e.settings.hash?""!=window.location.hash&&e.navigate(window.location.hash.substring(1),!0):e.navigate(window.location.pathname,!0)}),window.Alpine.addMagicProperty("router",function(){return window.PineconeRouter.currentContext})},validLink:function(t,e){for(var o,i={valid:!1,link:""};t&&"A"!==t.nodeName.toUpperCase();)t=t.parentNode;if(!t||"A"!==t.nodeName.toUpperCase())return i;var r="object"==typeof t.href&&"SVGAnimatedString"===t.href.constructor.name;return t.hasAttribute("download")||"external"===t.getAttribute("rel")?i:(i.link=null!=(o=t.getAttribute("href"))?o:"",e||!function(t){if(!n)return!1;var e=window.location;return t.pathname===e.pathname&&t.search===e.search}(t)||!t.hash&&"#"!==i.link?i.link&&i.link.indexOf("mailto:")>-1||(r?t.target.baseVal:t.target)?i:r||function(t){if(!t||!n)return!1;var e=function(t){if("function"==typeof URL&&n)return new URL(t,window.location.toString());var e=window.document.createElement("a");return e.href=t,e}(t),o=window.location;return o.protocol===e.protocol&&o.hostname===e.hostname&&(o.port===e.port||""===o.port&&("80"==e.port||"443"==e.port))}(t.href)?(i.valid=!0,i):i:i)},processRoute:function(t,e){var n,o=null!=(n=t.getAttribute("x-route"))?n:"/";if(o.indexOf("#")>-1)throw new Error("Pinecone Router: A route's path may not have a hash character.");r("onBeforeRouteProcessed",t,e,o);var i,a,s,u=[];if(0==t.hasAttribute("x-handler")&&!this.settings.allowNoHandler)throw new Error("Pinecone Router: Routes must have a handler.");if(t.hasAttribute("x-handler")){var h=(i=t.getAttribute("x-handler"),a=e.$data,void 0===s&&(s={}),new Function(["$data"].concat(Object.keys(s)),"var __alpine_result; with($data) { __alpine_result = "+i+" }; return __alpine_result").apply(void 0,[a].concat(Object.values(s))));switch(typeof h){case"function":u=[h];break;case"object":u=h;break;default:throw new Error("Pinecone Router: Invalid handler type: "+typeof h+".")}"notfound"==o&&(this.notfound=u)}"notfound"!=o&&("/"==this.settings.basePath||this.settings.hash||(o=this.settings.basePath+o),this.addRoute(o,u))},interceptLinks:function(){var t=this;window.document.body.onclick=function(e){if(!(e.metaKey||e.ctrlKey||e.shiftKey||1!=e.detail||e.defaultPrevented)){var n=e.target,o=e.path||(e.composedPath?e.composedPath():null);if(o)for(var i=0;i<o.length;i++)if(o[i].nodeName&&"A"===o[i].nodeName.toUpperCase()&&o[i].href){n=o[i];break}if(!n.hasAttribute("native")){var r=t.validLink(n,t.settings.hash);r.valid&&(t.navigate(r.link),e.preventDefault())}}}},navigate:function(t,e,n){void 0===e&&(e=!1),void 0===n&&(n=!1),null!=t||(t="/"),"/"==this.settings.basePath||this.settings.hash||0==t.indexOf(this.settings.basePath)||(t=this.settings.basePath+t),t!=this.settings.basePath||t.endsWith("/")||(t+="/");var s=this.routes.find(function(e){var n=function(t,e){var n,o=/(?:\?([^#]*))?(#.*)?$/,r=t.match(o),a={};if(r&&r[1])for(var s=r[1].split("&"),u=0;u<s.length;u++){var h=s[u].split("=");a[decodeURIComponent(h[0])]=decodeURIComponent(h.slice(1).join("="))}for(var c=i(t.replace(o,"")),l=i(e||""),d=Math.max(c.length,l.length),f=0;f<d;f++)if(l[f]&&":"===l[f].charAt(0)){var p=l[f].replace(/(^:|[+*?]+$)/g,""),w=(l[f].match(/[+*?]+$/)||{}).toString()[0],v=~w.indexOf("+"),g=~w.indexOf("*"),m=c[f]||"";if(!m&&!g&&(w.indexOf("?")<0||v)){n=!1;break}if(a[p]=decodeURIComponent(m),v||g){a[p]=c.slice(f).map(decodeURIComponent).join("/");break}}else if(l[f]!==c[f]){n=!1;break}return!1!==n&&a}(t,e.path);if(n)return e.params=n,!0}),u=null==s,h=void 0===s?o("notfound",t,[]):o(s.path,t,s.params);if(this.currentContext=h,"stop"!=r("onBeforeHandlersExecuted",s,t,n,u)){if(!e){var c="";this.settings.hash?(c="#","/"!=window.location.pathname&&(c+=window.location.pathname),c+=window.location.search+t):c=t+window.location.search+window.location.hash,history.pushState({path:c},"",c)}if(s&&s.handlers!=[]){if(!a(s.handlers,h))return}else if(u&&null!=this.notfound&&!a(this.notfound,h))return;r("onHandlersExecuted",s,t,n,u)}},addRoute:function(t,n){if(null!=this.routes.find(function(e){return e.path==t}))throw new Error("Pinecone Router: route already exist");this.routes.push(new e(t,n))},removeRoute:function(t){this.routes=this.routes.filter(function(e){return e.path!=t})}},u=window.deferLoadingAlpine||function(t){return t()};return window.PineconeRouter=s,window.deferLoadingAlpine=function(t){window.PineconeRouter.start(),u(t)},s});
//# sourceMappingURL=index.umd.js.map
