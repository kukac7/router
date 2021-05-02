class t{constructor(t,e){this.props={},this.path=t,this.handlers=e}setProps(t){this.props=t}}var e=!(!window.history.location&&!window.location);function n(t,e){switch(e){case!0:t.endsWith("/")||(t+="/");break;case!1:t.endsWith("/")&&(t=t.substr(0,t.length-1))}return t}function o(t,e,n){return{route:t,path:e,props:n,query:window.location.search.substring(1),hash:window.location.hash.substring(1),redirect:t=>(window.PineconeRouter.navigate(t),!1)}}function r(t,...e){if(null!=window.PineconeRouterMiddlewares)for(i in window.PineconeRouterMiddlewares){let n=window.PineconeRouterMiddlewares[i];if(null==n[t])return;if(0==n[t](...e))return!1}}function s(t,e){switch(typeof t){case"object":if(0==t.length)return;for(const n in t)if("function"==typeof t[n]&&0==t[n](e))return!1;break;case"function":return t(e)}}const a={version:"0.1.1",routes:[],settings:{interceptLinks:!0,basepath:"/",trailingSlash:null,hash:!1,allowNoHandler:!1,pushNotfoundToHistory:!0},loaded:!1,currentContext:null,routerloaded:new Event("pinecone-init"),loadstart:new Event("pinecone-start"),loadend:new Event("pinecone-end"),notfound:function(t){console.error(`Pinecone Router: requested path ${t.path} was not found`)},start(){if(!window.Alpine)throw new Error("Alpine is required for `Pinecone Router` to work.");let t=0;Alpine.onComponentInitialized(e=>{if(e.$el.hasAttribute("x-router")){if("loaded"==e.$el.getAttribute("x-router"))return;if(t>1)throw new Error("Pinecone Router: Only one router can be in a page.");if(e.$el.hasAttribute("x-base")&&(this.settings.basepath=e.$el.getAttribute("x-base")),e.$el.hasAttribute("x-hash")&&(this.settings.hash=!0),e.$el.hasAttribute("x-slash")){let t=e.$el.getAttribute("x-slash");if("add"==t||""==t)t=!0;else{if("remove"!=t)throw new Error('Pinecone Router: Invalid value supplied to x-slash must be either "add", "remove", or empty');t=!1}this.settings.trailingSlash=t}if(r("init",e),Array.from(e.$el.children).filter(t=>"template"==t.tagName.toLowerCase()&&t.hasAttribute("x-route")).forEach(t=>{this.processRoute(t,e)}),e.$el.setAttribute("x-router","loaded"),t++,this.settings.hash){if(""==window.location.hash)return void(document.location.href=window.location.pathname+"#/");this.navigate(window.location.hash.substring(1),!0,!0)}else this.navigate(window.location.pathname,!1,!0);this.loaded=!0,window.dispatchEvent(this.routerloaded)}}),this.interceptLinks(),window.addEventListener("popstate",()=>{this.settings.hash?""!=window.location.hash&&this.navigate(window.location.hash.substring(1),!0):this.navigate(window.location.pathname,!0)}),Alpine.addMagicProperty("router",()=>window.PineconeRouter.currentContext)},processRoute(t,e){let o=t.getAttribute("x-route");if(o.indexOf("#")>-1)throw new Error("Pinecone Router: A route's path may not have a hash, using x-hash is sufficiant.");r("onBeforeRouteProcessed",t,e,o);let i=[];if(0==t.hasAttribute("x-handler")&&!this.settings.allowNoHandler)throw new Error("Pinecone Router: routes must have a handler unless using x-views or x-render.");t.hasAttribute("x-handler")&&(t.getAttribute("x-handler").replace(/\s/g,"").split(",").filter(t=>t).forEach((t,n)=>{try{if(i[n]=e.getUnobservedData()[t],"function"!=typeof i[n])throw new Error("Pinecone Router: The handler must be a function name.")}catch(t){throw new Error("Pinecone Router: "+t)}}),"notfound"==o&&(this.notfound=i)),"notfound"!=o&&("/"==this.settings.basepath||this.settings.hash||(o=this.settings.basepath+o),o=n(o,this.settings.trailingSlash),this.addRoute(o,i))},interceptLinks(){this.interceptLinks&&(document.body.onclick=function(t){if(t.metaKey||t.ctrlKey||t.shiftKey||1!=t.detail||t.defaultPrevented)return;var n=t.target,o=t.path||(t.composedPath?t.composedPath():null);if(o)for(var i=0;i<o.length;i++)if(o[i].nodeName&&"A"===o[i].nodeName.toUpperCase()&&o[i].href){n=o[i];break}t.preventDefault();let r=function(t,n){for(;t&&"A"!==t.nodeName.toUpperCase();)t=t.parentNode;if(!t||"A"!==t.nodeName.toUpperCase())return!1;var o="object"==typeof t.href&&"SVGAnimatedString"===t.href.constructor.name;if(t.hasAttribute("download")||"external"===t.getAttribute("rel"))return!1;let i=t.getAttribute("href");return!(!n&&function(t){if(!e)return!1;var n=window.location;return t.pathname===n.pathname&&t.search===n.search}(t)&&(t.hash||"#"===i))&&!(i&&i.indexOf("mailto:")>-1)&&!(o?t.target.baseVal:t.target)&&!(!o&&!function(t){if(!t||!e)return!1;var n=function(t){if("function"==typeof URL&&e)return new URL(t,window.location.toString());var n=window.document.createElement("a");return n.href=t,n}(t),o=window.location;return o.protocol===n.protocol&&o.hostname===n.hostname&&(o.port===n.port||""===o.port&&(80==n.port||443==n.port))}(t.href))&&i}(n,window.PineconeRouter.settings.hash);0!=r&&window.PineconeRouter.navigate(r)})},navigate(t,e=!1,i=!1){window.dispatchEvent(this.loadstart),null==t&&(t="/"),"/"==this.settings.basepath||this.settings.hash||0==t.indexOf(this.settings.basepath)||(t=this.settings.basepath+t),t!=this.settings.basepath?t=n(t,this.settings.trailingSlash):t.endsWith("/")||(t+="/");const a=this.routes.find(e=>function(t,e){let n=[],o=t.path.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&").replace(/([:^\s])(\w+)/g,(t,e,o)=>(n.push(o),"([^/]+)"))+"(?:/|$)",i=e.match(new RegExp(o));if(null!==i){if(0!=i.index)return null;if(i.input!=i[0])return null;let e=i.slice(1).reduce((t,e,o)=>(null===t&&(t={}),t[n[o]]=e,t),null);t.setProps(e)}return i}(e,t));let h,u=null==a;if(u){if(h=o("notfound",t,{}),null!=this.notfound&&0==s(this.notfound,h))return}else h=o(a.path,t,a.props);if(this.currentContext=h,0!=r("onBeforeHandlersExecuted",a,t,i,u)&&(null==a||null==a.handlers||0!=s(a.handlers,h))){if(!e&&(!u||this.settings.pushNotfoundToHistory)){let e="";this.settings.hash?(e="#","/"!=window.location.pathname&&(e+=window.location.pathname),e+=window.location.search+t):e=t+window.location.search+window.location.hash,history.pushState({path:e},"",e)}0!=r("onHandlersExecuted",a,t,i,u)&&window.dispatchEvent(this.loadend)}},addRoute(e,n){if(null!=this.routes.find(t=>t.path==e))throw new Error("Pinecone Router: route already exist");this.routes.push(new t(e,n))},removeRoute(t){this.routes=this.routes.filter(e=>e.path!=t)}},h=window.deferLoadingAlpine||(t=>t());window.PineconeRouter=a,window.deferLoadingAlpine=function(t){window.PineconeRouter.start(),h(t)};export default a;
//# sourceMappingURL=index.modern.js.map
