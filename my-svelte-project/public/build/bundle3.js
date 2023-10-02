var app=function(){"use strict";function t(){}function e(t){return t()}function n(){return Object.create(null)}function r(t){t.forEach(e)}function o(t){return"function"==typeof t}function c(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}let a,l;function u(t,e){return a||(a=document.createElement("a")),a.href=e,t===a.href}function i(t,e){t.appendChild(e)}function s(t,e,n){t.insertBefore(e,n||null)}function f(t){t.parentNode&&t.parentNode.removeChild(t)}function d(t){return document.createElement(t)}function g(t){return document.createTextNode(t)}function p(){return g(" ")}function m(t,e,n,r){return t.addEventListener(e,n,r),()=>t.removeEventListener(e,n,r)}function h(t,e,n){null==n?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function $(t){return""===t?null:+t}function y(t,e){t.value=null==e?"":e}function _(t){l=t}const b=[],v=[];let x=[];const k=[],E=Promise.resolve();let w=!1;function L(t){x.push(t)}const j=new Set;let A=0;function S(){if(0!==A)return;const t=l;do{try{for(;A<b.length;){const t=b[A];A++,_(t),C(t.$$)}}catch(t){throw b.length=0,A=0,t}for(_(null),b.length=0,A=0;v.length;)v.pop()();for(let t=0;t<x.length;t+=1){const e=x[t];j.has(e)||(j.add(e),e())}x.length=0}while(b.length);for(;k.length;)k.pop()();w=!1,j.clear(),_(t)}function C(t){if(null!==t.fragment){t.update(),r(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(L)}}const O=new Set;function R(t,e){const n=t.$$;null!==n.fragment&&(!function(t){const e=[],n=[];x.forEach((r=>-1===t.indexOf(r)?e.push(r):n.push(r))),n.forEach((t=>t())),x=e}(n.after_update),r(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function U(t,e){-1===t.$$.dirty[0]&&(b.push(t),w||(w=!0,E.then(S)),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function q(c,a,u,i,s,d,g,p=[-1]){const m=l;_(c);const h=c.$$={fragment:null,ctx:[],props:d,update:t,not_equal:s,bound:n(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(a.context||(m?m.$$.context:[])),callbacks:n(),dirty:p,skip_bound:!1,root:a.target||m.$$.root};g&&g(h.root);let $=!1;if(h.ctx=u?u(c,a.props||{},((t,e,...n)=>{const r=n.length?n[0]:e;return h.ctx&&s(h.ctx[t],h.ctx[t]=r)&&(!h.skip_bound&&h.bound[t]&&h.bound[t](r),$&&U(c,t)),e})):[],h.update(),$=!0,r(h.before_update),h.fragment=!!i&&i(h.ctx),a.target){if(a.hydrate){const t=function(t){return Array.from(t.childNodes)}(a.target);h.fragment&&h.fragment.l(t),t.forEach(f)}else h.fragment&&h.fragment.c();a.intro&&((y=c.$$.fragment)&&y.i&&(O.delete(y),y.i(b))),function(t,n,c,a){const{fragment:l,after_update:u}=t.$$;l&&l.m(n,c),a||L((()=>{const n=t.$$.on_mount.map(e).filter(o);t.$$.on_destroy?t.$$.on_destroy.push(...n):r(n),t.$$.on_mount=[]})),u.forEach(L)}(c,a.target,a.anchor,a.customElement),S()}var y,b;_(m)}class M{$destroy(){R(this,1),this.$destroy=t}$on(e,n){if(!o(n))return t;const r=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return r.push(n),()=>{const t=r.indexOf(n);-1!==t&&r.splice(t,1)}}$set(t){var e;this.$$set&&(e=t,0!==Object.keys(e).length)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}function N(t,e,n){const r=t.slice();return r[13]=e[n],r}function F(t){let e,n=t[0],r=[];for(let e=0;e<n.length;e+=1)r[e]=B(N(t,n,e));return{c(){e=d("ul");for(let t=0;t<r.length;t+=1)r[t].c()},m(t,n){s(t,e,n);for(let t=0;t<r.length;t+=1)r[t]&&r[t].m(e,null)},p(t,o){if(1&o){let c;for(n=t[0],c=0;c<n.length;c+=1){const a=N(t,n,c);r[c]?r[c].p(a,o):(r[c]=B(a),r[c].c(),r[c].m(e,null))}for(;c<r.length;c+=1)r[c].d(1);r.length=n.length}},d(t){t&&f(e),function(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}(r,t)}}}function B(t){let e,n,r=t[13]+"";return{c(){e=d("li"),n=g(r)},m(t,r){s(t,e,r),i(e,n)},p(t,e){1&e&&r!==(r=t[13]+"")&&function(t,e){e=""+e,t.data!==e&&(t.data=e)}(n,r)},d(t){t&&f(e)}}}function D(e){let n,o,c,a,l,_,b,v,x,k,E,w,L,j,A,S,C,O,R,U,q,M,N,B,D,G,I,P,T,z=e[0].length>0&&F(e);return{c(){n=d("input"),o=p(),c=d("button"),c.textContent="exe_make_gif",a=g("  \n\ndelay_num: "),l=d("input"),_=p(),b=d("fieldset"),v=d("label"),x=d("input"),E=g("\n\tASC"),w=p(),L=d("label"),j=d("input"),S=g("\n\tDESC"),C=p(),O=d("button"),O.textContent="all_clear",R=p(),U=d("img"),M=p(),N=d("canvas"),B=p(),D=d("div"),G=p(),z&&z.c(),I=g(""),h(n,"type","file"),n.multiple=!0,h(n,"webkitdirectory",""),h(l,"type","number"),h(l,"min","0"),h(l,"max","1000"),h(l,"step","10"),x.checked=k=!0===e[2],h(x,"type","radio"),h(x,"name","sort_type"),x.value="asc",j.checked=A=!1===e[2],h(j,"type","radio"),h(j,"name","sort_type"),j.value="desc",u(U.src,q=e[1])||h(U,"src",q),h(U,"alt",""),h(U,"class","result_gif svelte-w6da3f"),h(N,"class","target_canvas"),h(D,"class","target_img_tags")},m(t,r){s(t,n,r),s(t,o,r),s(t,c,r),s(t,a,r),s(t,l,r),y(l,e[3]),s(t,_,r),s(t,b,r),i(b,v),i(v,x),i(v,E),i(b,w),i(b,L),i(L,j),i(L,S),s(t,C,r),s(t,O,r),s(t,R,r),s(t,U,r),s(t,M,r),s(t,N,r),s(t,B,r),s(t,D,r),s(t,G,r),z&&z.m(t,r),s(t,I,r),P||(T=[m(n,"change",e[6]),m(c,"click",e[7]),m(l,"input",e[9]),m(x,"change",e[5]),m(j,"change",e[5]),m(O,"click",e[4])],P=!0)},p(t,[e]){8&e&&$(l.value)!==t[3]&&y(l,t[3]),4&e&&k!==(k=!0===t[2])&&(x.checked=k),4&e&&A!==(A=!1===t[2])&&(j.checked=A),2&e&&!u(U.src,q=t[1])&&h(U,"src",q),t[0].length>0?z?z.p(t,e):(z=F(t),z.c(),z.m(I.parentNode,I)):z&&(z.d(1),z=null)},i:t,o:t,d(t){t&&f(n),t&&f(o),t&&f(c),t&&f(a),t&&f(l),t&&f(_),t&&f(b),t&&f(C),t&&f(O),t&&f(R),t&&f(U),t&&f(M),t&&f(N),t&&f(B),t&&f(D),t&&f(G),z&&z.d(t),t&&f(I),P=!1,r(T)}}}function G(t,e,n){let r=[],o=[],c="",a=!0,l=200;let u;return t.$$.update=()=>{256&t.$$.dirty&&(n(0,o=Array.from(r).map((t=>t.name))),(()=>{document.querySelectorAll(".original_files").forEach((t=>{t.remove()}));const t=document.querySelector(".target_img_tags");r.forEach((e=>{const n=document.createElement("img");n.src=URL.createObjectURL(e),n.classList.add("original_files"),n.alt=e.name,t.appendChild(n)}))})())},[o,c,a,l,()=>{n(8,r=[]),n(0,o=[]),n(1,c=""),n(2,a=!0)},t=>{console.log(t.target.value),"asc"===t.target.value?n(2,a=!0):"desc"===t.target.value&&n(2,a=!1)},t=>{n(8,r=Array.from(t.target.files).filter((t=>{const e=t.type;return"image/png"===e||"image/jpeg"===e||"image/jpg"===e}))),a?r.sort(((t,e)=>t.lastModified-e.lastModified)):r.sort(((t,e)=>e.lastModified-t.lastModified))},()=>{var t=new GIF({repeat:0,quality:1,workers:2,workerScript:t,width:null,height:null,transparent:null,dither:!1,debug:!1});document.querySelectorAll(".original_files").forEach((e=>{t.addFrame(e,{delay:l})}));const e=document.querySelector(".target_canvas").getContext("2d");t.addFrame(e,{copy:!0}),t.on("finished",(function(t){u&&URL.revokeObjectURL(u),u=window.open(URL.createObjectURL(t));const e=(t=>{const e=document.createElement("img");return e.src=URL.createObjectURL(t),e.classList.add("result_gif"),e.alt="result_gif",e})(t);n(1,c=e.src)})),t.render()},r,function(){l=$(this.value),n(3,l)}]}return new class extends M{constructor(t){super(),q(this,t,G,D,c,{})}}({target:document.body})}();
//# sourceMappingURL=bundle3.js.map
