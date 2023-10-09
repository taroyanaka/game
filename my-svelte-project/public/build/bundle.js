var app=function(){"use strict";function t(){}function n(t){return t()}function e(){return Object.create(null)}function l(t){t.forEach(n)}function o(t){return"function"==typeof t}function r(t,n){return t!=t?n==n:t!==n||t&&"object"==typeof t||"function"==typeof t}function c(t,n){t.appendChild(n)}function _(t,n,e){t.insertBefore(n,e||null)}function s(t){t.parentNode&&t.parentNode.removeChild(t)}function a(t,n){for(let e=0;e<t.length;e+=1)t[e]&&t[e].d(n)}function F(t){return document.createElement(t)}function u(t){return document.createTextNode(t)}function A(){return u(" ")}function f(){return u("")}function i(t,n,e,l){return t.addEventListener(n,e,l),()=>t.removeEventListener(n,e,l)}function U(t,n,e){null==e?t.removeAttribute(n):t.getAttribute(n)!==e&&t.setAttribute(n,e)}function T(t,n){n=""+n,t.data!==n&&(t.data=n)}let N;function P(t){N=t}function d(t){(function(){if(!N)throw new Error("Function called outside component initialization");return N})().$$.on_mount.push(t)}const g=[],E=[];let p=[];const h=[],M=Promise.resolve();let B=!1;function m(t){p.push(t)}const L=new Set;let C=0;function I(){if(0!==C)return;const t=N;do{try{for(;C<g.length;){const t=g[C];C++,P(t),K(t.$$)}}catch(t){throw g.length=0,C=0,t}for(P(null),g.length=0,C=0;E.length;)E.pop()();for(let t=0;t<p.length;t+=1){const n=p[t];L.has(n)||(L.add(n),n())}p.length=0}while(g.length);for(;h.length;)h.pop()();B=!1,L.clear(),P(t)}function K(t){if(null!==t.fragment){t.update(),l(t.before_update);const n=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,n),t.after_update.forEach(m)}}const D=new Set;function O(t,n){const e=t.$$;null!==e.fragment&&(!function(t){const n=[],e=[];p.forEach((l=>-1===t.indexOf(l)?n.push(l):e.push(l))),e.forEach((t=>t())),p=n}(e.after_update),l(e.on_destroy),e.fragment&&e.fragment.d(n),e.on_destroy=e.fragment=null,e.ctx=[])}function G(t,n){-1===t.$$.dirty[0]&&(g.push(t),B||(B=!0,M.then(I)),t.$$.dirty.fill(0)),t.$$.dirty[n/31|0]|=1<<n%31}function w(r,c,_,a,F,u,A,f=[-1]){const i=N;P(r);const U=r.$$={fragment:null,ctx:[],props:u,update:t,not_equal:F,bound:e(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(c.context||(i?i.$$.context:[])),callbacks:e(),dirty:f,skip_bound:!1,root:c.target||i.$$.root};A&&A(U.root);let T=!1;if(U.ctx=_?_(r,c.props||{},((t,n,...e)=>{const l=e.length?e[0]:n;return U.ctx&&F(U.ctx[t],U.ctx[t]=l)&&(!U.skip_bound&&U.bound[t]&&U.bound[t](l),T&&G(r,t)),n})):[],U.update(),T=!0,l(U.before_update),U.fragment=!!a&&a(U.ctx),c.target){if(c.hydrate){const t=function(t){return Array.from(t.childNodes)}(c.target);U.fragment&&U.fragment.l(t),t.forEach(s)}else U.fragment&&U.fragment.c();c.intro&&((d=r.$$.fragment)&&d.i&&(D.delete(d),d.i(g))),function(t,e,r,c){const{fragment:_,after_update:s}=t.$$;_&&_.m(e,r),c||m((()=>{const e=t.$$.on_mount.map(n).filter(o);t.$$.on_destroy?t.$$.on_destroy.push(...e):l(e),t.$$.on_mount=[]})),s.forEach(m)}(r,c.target,c.anchor,c.customElement),I()}var d,g;P(i)}class v{$destroy(){O(this,1),this.$destroy=t}$on(n,e){if(!o(e))return t;const l=this.$$.callbacks[n]||(this.$$.callbacks[n]=[]);return l.push(e),()=>{const t=l.indexOf(e);-1!==t&&l.splice(t,1)}}$set(t){var n;this.$$set&&(n=t,0!==Object.keys(n).length)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}function S(t,n,e){const l=t.slice();return l[95]=n[e],l[97]=e,l}function b(t,n,e){const l=t.slice();return l[95]=n[e],l[97]=e,l}function Y(t,n,e){const l=t.slice();return l[99]=n[e],l[101]=e,l}function y(t,n,e){const l=t.slice();return l[99]=n[e],l[101]=e,l}function k(t,n,e){const l=t.slice();return l[95]=n[e],l[97]=e,l}function x(t,n,e){const l=t.slice();return l[104]=n[e],l[106]=e,l}function $(t,n,e){const l=t.slice();return l[107]=n[e],l[109]=e,l}function Q(t,n,e){const l=t.slice();return l[99]=n[e],l[97]=e,l}function W(t,n,e){const l=t.slice();return l[95]=n[e],l[97]=e,l}function q(t,n,e){const l=t.slice();return l[104]=n[e],l[106]=e,l}function X(t,n,e){const l=t.slice();return l[113]=n[e],l[115]=e,l}function j(t,n,e){const l=t.slice();return l[116]=n[e],l[118]=e,l}function H(t){let n,e,o,r,a;function A(){return t[24](t[115],t[118])}function f(){return t[25](t[115],t[118])}return{c(){n=F("span"),e=u("□"),U(n,"class","CELL2 svelte-1wtw54f"),U(n,"style",o=t[116][3])},m(t,l){_(t,n,l),c(n,e),r||(a=[i(n,"keydown",A),i(n,"click",f)],r=!0)},p(e,l){t=e,16384&l[0]&&o!==(o=t[116][3])&&U(n,"style",o)},d(t){t&&s(n),r=!1,l(a)}}}function V(t){let n,e,l=t[113],o=[];for(let n=0;n<l.length;n+=1)o[n]=H(j(t,l,n));return{c(){n=F("li");for(let t=0;t<o.length;t+=1)o[t].c();e=A(),U(n,"class","CELL1 svelte-1wtw54f")},m(t,l){_(t,n,l);for(let t=0;t<o.length;t+=1)o[t]&&o[t].m(n,null);c(n,e)},p(t,r){if(1064960&r[0]){let c;for(l=t[113],c=0;c<l.length;c+=1){const _=j(t,l,c);o[c]?o[c].p(_,r):(o[c]=H(_),o[c].c(),o[c].m(n,e))}for(;c<o.length;c+=1)o[c].d(1);o.length=l.length}},d(t){t&&s(n),a(o,t)}}}function z(t){let n;return{c(){n=F("div"),n.textContent="GOAL"},m(t,e){_(t,n,e)},d(t){t&&s(n)}}}function J(t){let n,e;return{c(){n=F("div"),e=u(t[13])},m(t,l){_(t,n,l),c(n,e)},p(t,n){8192&n[0]&&T(e,t[13])},d(t){t&&s(n)}}}function Z(t){let n,e,l;return{c(){n=F("div"),e=u("GOLD: "),l=u(t[8])},m(t,o){_(t,n,o),c(n,e),c(n,l)},p(t,n){256&n[0]&&T(l,t[8])},d(t){t&&s(n)}}}function tt(t){let n,e,l,o,r,a,f,i,U,N=t[95].RARITY+"",P=t[95].LFP_BUFF+"",d=t[95].ATK_BUFF+"",g=t[95].MAGIC[0].MAGIC_COUNT>=1&&nt(t);return{c(){n=F("div"),e=u("RARITY: "),l=u(N),o=u("\n\t\t\tLFP_BUFF: "),r=u(P),a=u("\n\t\t\t\n\t\t\tATK_BUFF: "),f=u(d),i=A(),U=F("div"),g&&g.c()},m(t,s){_(t,n,s),c(n,e),c(n,l),c(n,o),c(n,r),c(n,a),c(n,f),c(n,i),c(n,U),g&&g.m(U,null)},p(t,n){64&n[0]&&N!==(N=t[95].RARITY+"")&&T(l,N),64&n[0]&&P!==(P=t[95].LFP_BUFF+"")&&T(r,P),64&n[0]&&d!==(d=t[95].ATK_BUFF+"")&&T(f,d),t[95].MAGIC[0].MAGIC_COUNT>=1?g?g.p(t,n):(g=nt(t),g.c(),g.m(U,null)):g&&(g.d(1),g=null)},d(t){t&&s(n),g&&g.d()}}}function nt(t){let n,e,l,o,r,c,U,N=t[95].MAGIC[0].MAGIC_COUNT+"";function P(){return t[33](t[95],t[97],t[99])}let d=t[95].MAGIC[1],g=[];for(let n=0;n<d.length;n+=1)g[n]=et(q(t,d,n));return{c(){n=F("button"),n.textContent="MAGIC",e=u("\n\t\t\t\tMAGIC_COUNT: "),l=u(N),o=A();for(let t=0;t<g.length;t+=1)g[t].c();r=f()},m(t,s){_(t,n,s),_(t,e,s),_(t,l,s),_(t,o,s);for(let n=0;n<g.length;n+=1)g[n]&&g[n].m(t,s);_(t,r,s),c||(U=i(n,"click",P),c=!0)},p(n,e){if(t=n,64&e[0]&&N!==(N=t[95].MAGIC[0].MAGIC_COUNT+"")&&T(l,N),64&e[0]){let n;for(d=t[95].MAGIC[1],n=0;n<d.length;n+=1){const l=q(t,d,n);g[n]?g[n].p(l,e):(g[n]=et(l),g[n].c(),g[n].m(r.parentNode,r))}for(;n<g.length;n+=1)g[n].d(1);g.length=d.length}},d(t){t&&s(n),t&&s(e),t&&s(l),t&&s(o),a(g,t),t&&s(r),c=!1,U()}}}function et(t){let n,e,l=t[104]+"";return{c(){n=F("div"),e=u(l)},m(t,l){_(t,n,l),c(n,e)},p(t,n){64&n[0]&&l!==(l=t[104]+"")&&T(e,l)},d(t){t&&s(n)}}}function lt(t){let n,e,l,o,r,a,f,i,U=t[95].RARITY+"",N=t[95].LFP_BUFF+"",P=t[95].ATK_BUFF+"",d=t[95]&&tt(t);return{c(){n=F("div"),e=u("RARITY: "),l=u(U),o=u("\n\t\tLFP_BUFF: "),r=u(N),a=u("\n\t\tATK_BUFF: "),f=u(P),i=A(),d&&d.c()},m(t,s){_(t,n,s),c(n,e),c(n,l),c(n,o),c(n,r),c(n,a),c(n,f),c(n,i),d&&d.m(n,null)},p(t,e){64&e[0]&&U!==(U=t[95].RARITY+"")&&T(l,U),64&e[0]&&N!==(N=t[95].LFP_BUFF+"")&&T(r,N),64&e[0]&&P!==(P=t[95].ATK_BUFF+"")&&T(f,P),t[95]?d?d.p(t,e):(d=tt(t),d.c(),d.m(n,null)):d&&(d.d(1),d=null)},d(t){t&&s(n),d&&d.d()}}}function ot(t){let n,e,l,o,r,f,i,N=t[99].NAME+"",P=t[99].LFP+"",d=t[99].ATK+"",g=t[99].EQP,E=[];for(let n=0;n<g.length;n+=1)E[n]=lt(W(t,g,n));return{c(){n=F("div"),e=u(N),l=u("\n\tLFP: "),o=u(P),r=u("\n\tATK: "),f=u(d),i=A();for(let t=0;t<E.length;t+=1)E[t].c();U(n,"class","USR_DATA_span svelte-1wtw54f")},m(t,s){_(t,n,s),c(n,e),c(n,l),c(n,o),c(n,r),c(n,f),c(n,i);for(let t=0;t<E.length;t+=1)E[t]&&E[t].m(n,null)},p(t,l){if(64&l[0]&&N!==(N=t[99].NAME+"")&&T(e,N),64&l[0]&&P!==(P=t[99].LFP+"")&&T(o,P),64&l[0]&&d!==(d=t[99].ATK+"")&&T(f,d),2097216&l[0]){let e;for(g=t[99].EQP,e=0;e<g.length;e+=1){const o=W(t,g,e);E[e]?E[e].p(o,l):(E[e]=lt(o),E[e].c(),E[e].m(n,null))}for(;e<E.length;e+=1)E[e].d(1);E.length=g.length}},d(t){t&&s(n),a(E,t)}}}function rt(t){let n,e,l,o,r,a,f,i,N,P,d,g,E,p,h=t[7][t[107]].NAME+"",M=t[7][t[107]].LFP+"",R=t[7][t[107]].ATK+"",B=t[7][t[107]].GLD+"",m=t[7][t[107]].BDP+"",L=t[7][t[107]].RBP+"";return{c(){n=F("div"),e=u(h),l=u("\n\t\t\tLFP: "),o=u(M),r=u("\n\t\t\tATK: "),a=u(R),f=u("\n\t\t\tGLD: "),i=u(B),N=u("\n\t\t\tBDP: "),P=u(m),d=u("\n\t\t\tRBP: "),g=u(L),E=A(),U(n,"id",p=t[7][t[107]].NAME),U(n,"style",`background-color: ${Nt};`),U(n,"class","UNT_BACK")},m(t,s){_(t,n,s),c(n,e),c(n,l),c(n,o),c(n,r),c(n,a),c(n,f),c(n,i),c(n,N),c(n,P),c(n,d),c(n,g),c(n,E)},p(t,l){128&l[0]&&h!==(h=t[7][t[107]].NAME+"")&&T(e,h),128&l[0]&&M!==(M=t[7][t[107]].LFP+"")&&T(o,M),128&l[0]&&R!==(R=t[7][t[107]].ATK+"")&&T(a,R),128&l[0]&&B!==(B=t[7][t[107]].GLD+"")&&T(i,B),128&l[0]&&m!==(m=t[7][t[107]].BDP+"")&&T(P,m),128&l[0]&&L!==(L=t[7][t[107]].RBP+"")&&T(g,L),128&l[0]&&p!==(p=t[7][t[107]].NAME)&&U(n,"id",p)},d(t){t&&s(n)}}}function ct(t){let n,e,l,o,r,f,U,N,P,d,g,E,p,h,M,R=t[95].RARITY+"",B=t[95].LFP_BUFF+"",m=t[95].ATK_BUFF+"",L=t[95].MAGIC[0].MAGIC_COUNT+"";function C(){return t[34](t[97])}let I=t[95].MAGIC[1],K=[];for(let n=0;n<I.length;n+=1)K[n]=_t(x(t,I,n));return{c(){n=F("div"),e=u("RARITY: "),l=u(R),o=u("\n\t\t\t\t\tLFP_BUFF: "),r=u(B),f=u("\n\t\t\t\t\t\n\t\t\t\t\tATK_BUFF: "),U=u(m),N=A(),P=F("div"),d=F("button"),d.textContent="UN_EQP",g=u("\n\t\t\t\t\t\t\tMAGIC_COUNT: "),E=u(L),p=A();for(let t=0;t<K.length;t+=1)K[t].c()},m(t,s){_(t,n,s),c(n,e),c(n,l),c(n,o),c(n,r),c(n,f),c(n,U),c(n,N),c(n,P),c(P,d),c(P,g),c(P,E),c(P,p);for(let t=0;t<K.length;t+=1)K[t]&&K[t].m(P,null);h||(M=i(d,"click",C),h=!0)},p(n,e){if(t=n,64&e[0]&&R!==(R=t[95].RARITY+"")&&T(l,R),64&e[0]&&B!==(B=t[95].LFP_BUFF+"")&&T(r,B),64&e[0]&&m!==(m=t[95].ATK_BUFF+"")&&T(U,m),64&e[0]&&L!==(L=t[95].MAGIC[0].MAGIC_COUNT+"")&&T(E,L),64&e[0]){let n;for(I=t[95].MAGIC[1],n=0;n<I.length;n+=1){const l=x(t,I,n);K[n]?K[n].p(l,e):(K[n]=_t(l),K[n].c(),K[n].m(P,null))}for(;n<K.length;n+=1)K[n].d(1);K.length=I.length}},d(t){t&&s(n),a(K,t),h=!1,M()}}}function _t(t){let n,e,l=t[104]+"";return{c(){n=F("div"),e=u(l)},m(t,l){_(t,n,l),c(n,e)},p(t,n){64&n[0]&&l!==(l=t[104]+"")&&T(e,l)},d(t){t&&s(n)}}}function st(t){let n,e=t[95]&&ct(t);return{c(){e&&e.c(),n=f()},m(t,l){e&&e.m(t,l),_(t,n,l)},p(t,l){t[95]?e?e.p(t,l):(e=ct(t),e.c(),e.m(n.parentNode,n)):e&&(e.d(1),e=null)},d(t){e&&e.d(t),t&&s(n)}}}function at(t){let n,e,l,o,r,f,i,N,P=t[99].NAME+"",d=t[99].LFP+"",g=t[99].ATK+"",E=t[99].EQP,p=[];for(let n=0;n<E.length;n+=1)p[n]=st(k(t,E,n));return{c(){n=F("div"),e=u(P),l=u("\n\t\t\tLFP: "),o=u(d),r=u("\n\t\t\tATK: "),f=u(g),i=A();for(let t=0;t<p.length;t+=1)p[t].c();N=A(),U(n,"class","USR_DATA_span svelte-1wtw54f")},m(t,s){_(t,n,s),c(n,e),c(n,l),c(n,o),c(n,r),c(n,f),c(n,i);for(let t=0;t<p.length;t+=1)p[t]&&p[t].m(n,null);c(n,N)},p(t,l){if(64&l[0]&&P!==(P=t[99].NAME+"")&&T(e,P),64&l[0]&&d!==(d=t[99].LFP+"")&&T(o,d),64&l[0]&&g!==(g=t[99].ATK+"")&&T(f,g),65600&l[0]){let e;for(E=t[99].EQP,e=0;e<E.length;e+=1){const o=k(t,E,e);p[e]?p[e].p(o,l):(p[e]=st(o),p[e].c(),p[e].m(n,N))}for(;e<p.length;e+=1)p[e].d(1);p.length=E.length}},d(t){t&&s(n),a(p,t)}}}function Ft(t){let n,e,l,o,r,i,N,P,d,g,E,p,h,M,R,B,m,L,C,I,K,D,O=t[95].RARITY+"",G=t[95].LFP_BUFF+"",w=t[95].LFP_DEBUFF+"",v=t[95].ATK_BUFF+"",S=t[95].ATK_DEBUFF+"",b=t[95].MAGIC[0].MAGIC_COUNT+"",y=t[95].MAGIC[1]+"",k=t[6],x=[];for(let n=0;n<k.length;n+=1)x[n]=ut(Y(t,k,n));return{c(){n=F("span"),e=u(O),l=A(),o=F("span"),r=u(G),i=A(),N=F("span"),P=u(w),d=A(),g=F("span"),E=u(v),p=A(),h=F("span"),M=u(S),R=A(),B=F("span"),m=u(b),L=A(),C=F("span"),I=u(y),K=A();for(let t=0;t<x.length;t+=1)x[t].c();D=f(),U(n,"class","EQP_SPAN svelte-1wtw54f"),U(o,"class","EQP_SPAN svelte-1wtw54f"),U(N,"class","EQP_SPAN svelte-1wtw54f"),U(g,"class","EQP_SPAN svelte-1wtw54f"),U(h,"class","EQP_SPAN svelte-1wtw54f"),U(B,"class","EQP_SPAN svelte-1wtw54f"),U(C,"class","EQP_SPAN svelte-1wtw54f")},m(t,s){_(t,n,s),c(n,e),_(t,l,s),_(t,o,s),c(o,r),_(t,i,s),_(t,N,s),c(N,P),_(t,d,s),_(t,g,s),c(g,E),_(t,p,s),_(t,h,s),c(h,M),_(t,R,s),_(t,B,s),c(B,m),_(t,L,s),_(t,C,s),c(C,I),_(t,K,s);for(let n=0;n<x.length;n+=1)x[n]&&x[n].m(t,s);_(t,D,s)},p(t,n){if(2&n[0]&&O!==(O=t[95].RARITY+"")&&T(e,O),2&n[0]&&G!==(G=t[95].LFP_BUFF+"")&&T(r,G),2&n[0]&&w!==(w=t[95].LFP_DEBUFF+"")&&T(P,w),2&n[0]&&v!==(v=t[95].ATK_BUFF+"")&&T(E,v),2&n[0]&&S!==(S=t[95].ATK_DEBUFF+"")&&T(M,S),2&n[0]&&b!==(b=t[95].MAGIC[0].MAGIC_COUNT+"")&&T(m,b),2&n[0]&&y!==(y=t[95].MAGIC[1]+"")&&T(I,y),262210&n[0]){let e;for(k=t[6],e=0;e<k.length;e+=1){const l=Y(t,k,e);x[e]?x[e].p(l,n):(x[e]=ut(l),x[e].c(),x[e].m(D.parentNode,D))}for(;e<x.length;e+=1)x[e].d(1);x.length=k.length}},d(t){t&&s(n),t&&s(l),t&&s(o),t&&s(i),t&&s(N),t&&s(d),t&&s(g),t&&s(p),t&&s(h),t&&s(R),t&&s(B),t&&s(L),t&&s(C),t&&s(K),a(x,t),t&&s(D)}}}function ut(t){let n,e,l,o,r;function a(){return t[38](t[95],t[97],t[101])}return{c(){n=F("button"),e=u("set:"),l=u(t[101])},m(t,s){_(t,n,s),c(n,e),c(n,l),o||(r=i(n,"click",a),o=!0)},p(n,e){t=n},d(t){t&&s(n),o=!1,r()}}}function At(t){let n,e,l=t[95]&&Ft(t);return{c(){n=F("li"),l&&l.c(),e=A()},m(t,o){_(t,n,o),l&&l.m(n,null),c(n,e)},p(t,o){t[95]?l?l.p(t,o):(l=Ft(t),l.c(),l.m(n,e)):l&&(l.d(1),l=null)},d(t){t&&s(n),l&&l.d()}}}function ft(t){let n,e,l,o,r,a,f,i,N,P,d,g,E,p,h,M,R,B,m,L,C=t[95].RARITY+"",I=t[95].LFP_BUFF+"",K=t[95].LFP_DEBUFF+"",D=t[95].ATK_BUFF+"",O=t[95].ATK_DEBUFF+"",G=t[95].MAGIC[0].MAGIC_COUNT+"",w=t[95].MAGIC[1]+"";return{c(){n=F("span"),e=u(C),l=A(),o=F("span"),r=u(I),a=A(),f=F("span"),i=u(K),N=A(),P=F("span"),d=u(D),g=A(),E=F("span"),p=u(O),h=A(),M=F("span"),R=u(G),B=A(),m=F("span"),L=u(w),U(n,"class","EQP_SPAN svelte-1wtw54f"),U(o,"class","EQP_SPAN svelte-1wtw54f"),U(f,"class","EQP_SPAN svelte-1wtw54f"),U(P,"class","EQP_SPAN svelte-1wtw54f"),U(E,"class","EQP_SPAN svelte-1wtw54f"),U(M,"class","EQP_SPAN svelte-1wtw54f"),U(m,"class","EQP_SPAN svelte-1wtw54f")},m(t,s){_(t,n,s),c(n,e),_(t,l,s),_(t,o,s),c(o,r),_(t,a,s),_(t,f,s),c(f,i),_(t,N,s),_(t,P,s),c(P,d),_(t,g,s),_(t,E,s),c(E,p),_(t,h,s),_(t,M,s),c(M,R),_(t,B,s),_(t,m,s),c(m,L)},p(t,n){32768&n[0]&&C!==(C=t[95].RARITY+"")&&T(e,C),32768&n[0]&&I!==(I=t[95].LFP_BUFF+"")&&T(r,I),32768&n[0]&&K!==(K=t[95].LFP_DEBUFF+"")&&T(i,K),32768&n[0]&&D!==(D=t[95].ATK_BUFF+"")&&T(d,D),32768&n[0]&&O!==(O=t[95].ATK_DEBUFF+"")&&T(p,O),32768&n[0]&&G!==(G=t[95].MAGIC[0].MAGIC_COUNT+"")&&T(R,G),32768&n[0]&&w!==(w=t[95].MAGIC[1]+"")&&T(L,w)},d(t){t&&s(n),t&&s(l),t&&s(o),t&&s(a),t&&s(f),t&&s(N),t&&s(P),t&&s(g),t&&s(E),t&&s(h),t&&s(M),t&&s(B),t&&s(m)}}}function it(t){let n,e,l=t[95]&&ft(t);return{c(){n=F("li"),l&&l.c(),e=A()},m(t,o){_(t,n,o),l&&l.m(n,null),c(n,e)},p(t,o){t[95]?l?l.p(t,o):(l=ft(t),l.c(),l.m(n,e)):l&&(l.d(1),l=null)},d(t){t&&s(n),l&&l.d()}}}function Ut(n){let e,o,r,f,N,P,d,g,E,p,h,M,R,B,m,L,C,I,K,D,O,G,w,v,Y,k,x,W,q,j,H,tt,nt,et,lt,ct,_t,st,Ft,ut,ft,Ut,Tt,Nt,Pt,dt,gt,Et,pt,ht,Mt,Rt,Bt,mt,Lt,Ct,It,Kt,Dt,Ot,Gt,wt,vt,St,bt,Yt,yt,kt,xt,$t,Qt,Wt,qt,Xt,jt,Ht,Vt,zt,Jt,Zt,tn,nn,en,ln,on,rn,cn,_n,sn,an,Fn,un,An=n[14],fn=[];for(let t=0;t<An.length;t+=1)fn[t]=V(X(n,An,t));let Un=n[12]&&z(),Tn=n[13]&&J(n),Nn=n[8]&&Z(n),Pn=n[6],dn=[];for(let t=0;t<Pn.length;t+=1)dn[t]=ot(Q(n,Pn,t));let gn=Object.keys(n[7]),En=[];for(let t=0;t<gn.length;t+=1)En[t]=rt($(n,gn,t));let pn=n[6],hn=[];for(let t=0;t<pn.length;t+=1)hn[t]=at(y(n,pn,t));let Mn=n[1],Rn=[];for(let t=0;t<Mn.length;t+=1)Rn[t]=At(b(n,Mn,t));let Bn=n[15],mn=[];for(let t=0;t<Bn.length;t+=1)mn[t]=it(S(n,Bn,t));return an=function(t){let n;return{p(...e){n=e,n.forEach((n=>t.push(n)))},r(){n.forEach((n=>t.splice(t.indexOf(n),1)))}}}(n[31][0]),{c(){e=F("div"),o=F("div"),r=F("div"),f=F("ul");for(let t=0;t<fn.length;t+=1)fn[t].c();N=A(),P=F("div"),d=F("div"),g=F("button"),g.textContent="◾️",E=A(),p=F("button"),p.textContent="W",h=A(),M=F("button"),M.textContent="◾️",R=A(),B=F("div"),m=F("button"),m.textContent="A",L=A(),C=F("button"),C.textContent="◾️",I=A(),K=F("button"),K.textContent="D",D=A(),O=F("div"),G=F("button"),G.textContent="◾️",w=A(),v=F("button"),v.textContent="S",Y=A(),k=F("button"),k.textContent="◾️",x=A(),Un&&Un.c(),W=A(),Tn&&Tn.c(),q=A(),j=F("div"),H=F("fieldset"),tt=F("span"),tt.textContent="SHOW_DAMAGE:",nt=A(),et=F("span"),lt=F("input"),ct=A(),_t=F("label"),_t.textContent="ON",st=A(),Ft=F("span"),ut=F("input"),ft=A(),Ut=F("label"),Ut.textContent="OFF",Tt=A(),Nn&&Nn.c(),Nt=A(),Pt=F("div"),dt=u("FLOOR: "),gt=u(n[4]),Et=A(),pt=F("div"),ht=u("PICKEL: "),Mt=u(n[11]),Rt=A(),Bt=F("div"),mt=u("KILL_STREAK: "),Lt=u(n[3]),Ct=A();for(let t=0;t<dn.length;t+=1)dn[t].c();It=A(),Kt=F("div");for(let t=0;t<En.length;t+=1)En[t].c();Dt=A(),Ot=F("div"),Ot.textContent="Ver 0.0.2.9",Gt=A(),wt=F("a"),wt.textContent="GitHub",vt=A(),St=F("div"),bt=F("div");for(let t=0;t<hn.length;t+=1)hn[t].c();Yt=A(),yt=F("button"),yt.textContent="slot_exe_once",kt=A(),xt=F("button"),xt.textContent="x4_slot_exe_once",$t=A(),Qt=F("button"),Qt.textContent="x8_slot_exe_once",Wt=A(),qt=F("button"),qt.textContent="next_field",Xt=A(),jt=F("div"),jt.textContent="MINE",Ht=u("\n\t\tGOLD: "),Vt=u(n[8]),zt=u("\n\t\tKAKUHEN: "),Jt=u(n[9]),Zt=u("\n\t\tKAKUHEN_COUNTER: "),tn=u(n[10]),nn=A(),en=F("ul"),ln=F("li"),ln.innerHTML='<span class="EQP_SPAN svelte-1wtw54f">RARITY</span> \n\t\t\t\t<span class="EQP_SPAN svelte-1wtw54f">LFP_BUFF</span> \n\t\t\t\t<span class="EQP_SPAN svelte-1wtw54f">LFP_DEBUFF</span> \n\t\t\t\t<span class="EQP_SPAN svelte-1wtw54f">ATK_BUFF</span> \n\t\t\t\t<span class="EQP_SPAN svelte-1wtw54f">ATK_DEBUFF</span> \n\t\t\t\t<span class="EQP_SPAN svelte-1wtw54f">MAGIC</span> \n\t\t\t\t<span class="EQP_SPAN svelte-1wtw54f">MAGIC_RANGE</span>',on=A();for(let t=0;t<Rn.length;t+=1)Rn[t].c();rn=A(),cn=F("ul"),_n=F("li"),_n.innerHTML='<span class="EQP_SPAN svelte-1wtw54f">RARITY</span> \n\t\t\t\t<span class="EQP_SPAN svelte-1wtw54f">LFP_BUFF</span> \n\t\t\t\t<span class="EQP_SPAN svelte-1wtw54f">LFP_DEBUFF</span> \n\t\t\t\t<span class="EQP_SPAN svelte-1wtw54f">ATK_BUFF</span> \n\t\t\t\t<span class="EQP_SPAN svelte-1wtw54f">ATK_DEBUFF</span> \n\t\t\t\t<span class="EQP_SPAN svelte-1wtw54f">MAGIC</span> \n\t\t\t\t<span class="EQP_SPAN svelte-1wtw54f">MAGIC_RANGE</span>',sn=A();for(let t=0;t<mn.length;t+=1)mn[t].c();U(f,"class","FLD svelte-1wtw54f"),U(r,"class","INDEX_1 svelte-1wtw54f"),U(g,"class","WASD_NULL svelte-1wtw54f"),U(p,"class","WASD svelte-1wtw54f"),U(M,"class","WASD_NULL svelte-1wtw54f"),U(m,"class","WASD svelte-1wtw54f"),U(C,"class","WASD_NULL svelte-1wtw54f"),U(K,"class","WASD svelte-1wtw54f"),U(G,"class","WASD_NULL svelte-1wtw54f"),U(v,"class","WASD svelte-1wtw54f"),U(k,"class","WASD_NULL svelte-1wtw54f"),U(P,"class","INDEX_2 svelte-1wtw54f"),U(lt,"type","radio"),U(lt,"id","ON"),U(lt,"name","SHOW_DAMAGE"),lt.__value="ON",lt.value=lt.__value,U(_t,"for","ON"),U(ut,"type","radio"),U(ut,"id","OFF"),U(ut,"name","SHOW_DAMAGE"),ut.__value="OFF",ut.value=ut.__value,U(Ut,"for","OFF"),U(wt,"href","https://github.com/taroyanaka/game/"),U(o,"class","field svelte-1wtw54f"),U(St,"class","gacha svelte-1wtw54f"),U(e,"class","container"),an.p(lt,ut)},m(t,l){_(t,e,l),c(e,o),c(o,r),c(r,f);for(let t=0;t<fn.length;t+=1)fn[t]&&fn[t].m(f,null);c(o,N),c(o,P),c(P,d),c(d,g),c(d,E),c(d,p),c(d,h),c(d,M),c(P,R),c(P,B),c(B,m),c(B,L),c(B,C),c(B,I),c(B,K),c(P,D),c(P,O),c(O,G),c(O,w),c(O,v),c(O,Y),c(O,k),c(o,x),Un&&Un.m(o,null),c(o,W),Tn&&Tn.m(o,null),c(o,q),c(o,j),c(j,H),c(H,tt),c(H,nt),c(H,et),c(et,lt),lt.checked=lt.__value===n[5],c(et,ct),c(et,_t),c(H,st),c(H,Ft),c(Ft,ut),ut.checked=ut.__value===n[5],c(Ft,ft),c(Ft,Ut),c(o,Tt),Nn&&Nn.m(o,null),c(o,Nt),c(o,Pt),c(Pt,dt),c(Pt,gt),c(o,Et),c(o,pt),c(pt,ht),c(pt,Mt),c(o,Rt),c(o,Bt),c(Bt,mt),c(Bt,Lt),c(o,Ct);for(let t=0;t<dn.length;t+=1)dn[t]&&dn[t].m(o,null);c(o,It),c(o,Kt);for(let t=0;t<En.length;t+=1)En[t]&&En[t].m(Kt,null);c(o,Dt),c(o,Ot),c(o,Gt),c(o,wt),c(e,vt),c(e,St),c(St,bt);for(let t=0;t<hn.length;t+=1)hn[t]&&hn[t].m(bt,null);c(St,Yt),c(St,yt),c(St,kt),c(St,xt),c(St,$t),c(St,Qt),c(St,Wt),c(St,qt),c(St,Xt),c(St,jt),c(St,Ht),c(St,Vt),c(St,zt),c(St,Jt),c(St,Zt),c(St,tn),c(St,nn),c(St,en),c(en,ln),c(en,on);for(let t=0;t<Rn.length;t+=1)Rn[t]&&Rn[t].m(en,null);c(St,rn),c(St,cn),c(cn,_n),c(cn,sn);for(let t=0;t<mn.length;t+=1)mn[t]&&mn[t].m(cn,null);n[39](e),Fn||(un=[i(p,"click",n[26]),i(m,"click",n[27]),i(K,"click",n[28]),i(v,"click",n[29]),i(lt,"change",n[30]),i(ut,"change",n[32]),i(yt,"click",n[35]),i(xt,"click",n[36]),i(Qt,"click",n[37]),i(qt,"click",n[17])],Fn=!0)},p(t,n){if(1064960&n[0]){let e;for(An=t[14],e=0;e<An.length;e+=1){const l=X(t,An,e);fn[e]?fn[e].p(l,n):(fn[e]=V(l),fn[e].c(),fn[e].m(f,null))}for(;e<fn.length;e+=1)fn[e].d(1);fn.length=An.length}if(t[12]?Un||(Un=z(),Un.c(),Un.m(o,W)):Un&&(Un.d(1),Un=null),t[13]?Tn?Tn.p(t,n):(Tn=J(t),Tn.c(),Tn.m(o,q)):Tn&&(Tn.d(1),Tn=null),32&n[0]&&(lt.checked=lt.__value===t[5]),32&n[0]&&(ut.checked=ut.__value===t[5]),t[8]?Nn?Nn.p(t,n):(Nn=Z(t),Nn.c(),Nn.m(o,Nt)):Nn&&(Nn.d(1),Nn=null),16&n[0]&&T(gt,t[4]),2048&n[0]&&T(Mt,t[11]),8&n[0]&&T(Lt,t[3]),2097216&n[0]){let e;for(Pn=t[6],e=0;e<Pn.length;e+=1){const l=Q(t,Pn,e);dn[e]?dn[e].p(l,n):(dn[e]=ot(l),dn[e].c(),dn[e].m(o,It))}for(;e<dn.length;e+=1)dn[e].d(1);dn.length=Pn.length}if(128&n[0]){let e;for(gn=Object.keys(t[7]),e=0;e<gn.length;e+=1){const l=$(t,gn,e);En[e]?En[e].p(l,n):(En[e]=rt(l),En[e].c(),En[e].m(Kt,null))}for(;e<En.length;e+=1)En[e].d(1);En.length=gn.length}if(65600&n[0]){let e;for(pn=t[6],e=0;e<pn.length;e+=1){const l=y(t,pn,e);hn[e]?hn[e].p(l,n):(hn[e]=at(l),hn[e].c(),hn[e].m(bt,null))}for(;e<hn.length;e+=1)hn[e].d(1);hn.length=pn.length}if(256&n[0]&&T(Vt,t[8]),512&n[0]&&T(Jt,t[9]),1024&n[0]&&T(tn,t[10]),262210&n[0]){let e;for(Mn=t[1],e=0;e<Mn.length;e+=1){const l=b(t,Mn,e);Rn[e]?Rn[e].p(l,n):(Rn[e]=At(l),Rn[e].c(),Rn[e].m(en,null))}for(;e<Rn.length;e+=1)Rn[e].d(1);Rn.length=Mn.length}if(32768&n[0]){let e;for(Bn=t[15],e=0;e<Bn.length;e+=1){const l=S(t,Bn,e);mn[e]?mn[e].p(l,n):(mn[e]=it(l),mn[e].c(),mn[e].m(cn,null))}for(;e<mn.length;e+=1)mn[e].d(1);mn.length=Bn.length}},i:t,o:t,d(t){t&&s(e),a(fn,t),Un&&Un.d(),Tn&&Tn.d(),Nn&&Nn.d(),a(dn,t),a(En,t),a(hn,t),a(Rn,t),a(mn,t),n[39](null),an.r(),Fn=!1,l(un)}}}const Tt="#00FF00",Nt="#FFFFFF",Pt="#FF0000",dt="#0000FF";function gt(t,n,e){let l="block",o="none";const r=[{ID:0,TYPE:"USR",SPAWN_Y_X:[9,0],NAME:"USR_0",LFP:100,ATK:10,EQP:[{RARITY:3,LFP_BUFF:0,LFP_DEBUFF:0,ATK_BUFF:4,ATK_DEBUFF:0,MAGIC:[{MAGIC_COUNT:null},[[0,0,0],[0,"U",0],[0,0,0]]]},{RARITY:2,LFP_BUFF:0,LFP_DEBUFF:0,ATK_BUFF:0,ATK_DEBUFF:0,MAGIC:[{MAGIC_COUNT:1},[[0,1,0],[1,"U",1],[0,1,0]]]},{RARITY:4,LFP_BUFF:0,LFP_DEBUFF:0,ATK_BUFF:0,ATK_DEBUFF:0,MAGIC:[{MAGIC_COUNT:1},[[1,1,1,1,1],[1,0,0,0,1],[1,0,"U",0,1],[1,0,0,0,1],[1,1,1,1,1]]]}],GOLD:3}],c=[{ID:1,TYPE:"USR",SPAWN_Y_X:[0,0],NAME:"USR_1",LFP:100,ATK:10,EQP:[{RARITY:3,LFP_BUFF:0,LFP_DEBUFF:0,ATK_BUFF:4,ATK_DEBUFF:0,MAGIC:[{MAGIC_COUNT:null},[[0,0,0],[0,"U",0],[0,0,0]]]},{RARITY:2,LFP_BUFF:0,LFP_DEBUFF:0,ATK_BUFF:0,ATK_DEBUFF:0,MAGIC:[{MAGIC_COUNT:1},[[0,1,0],[1,"U",1],[0,1,0]]]},{RARITY:4,LFP_BUFF:0,LFP_DEBUFF:0,ATK_BUFF:0,ATK_DEBUFF:0,MAGIC:[{MAGIC_COUNT:1},[[1,1,1,1,1],[1,0,0,0,1],[1,0,"U",0,1],[1,0,0,0,1],[1,1,1,1,1]]]}],GOLD:3}],_=[{ID:2,TYPE:"USR",SPAWN_Y_X:[9,9],NAME:"USR_2",LFP:100,ATK:10,EQP:[{RARITY:3,LFP_BUFF:0,LFP_DEBUFF:0,ATK_BUFF:4,ATK_DEBUFF:0,MAGIC:[{MAGIC_COUNT:null},[[0,0,0],[0,"U",0],[0,0,0]]]},{RARITY:2,LFP_BUFF:0,LFP_DEBUFF:0,ATK_BUFF:0,ATK_DEBUFF:0,MAGIC:[{MAGIC_COUNT:1},[[0,1,0],[1,"U",1],[0,1,0]]]},{RARITY:4,LFP_BUFF:0,LFP_DEBUFF:0,ATK_BUFF:0,ATK_DEBUFF:0,MAGIC:[{MAGIC_COUNT:1},[[1,1,1,1,1],[1,0,0,0,1],[1,0,"U",0,1],[1,0,0,0,1],[1,1,1,1,1]]]}],GOLD:3}];let s=[];const a=()=>R.clone(s);let F=a(),u=0,A=!1;const f=()=>{A=!1;e(2,u=u+1>(()=>{const t=m.map((t=>t.ID));return Math.max(...t)})()?(A=!0,0):u+1)},i=()=>{m.map((t=>({NAME:t.NAME,TYPE:t.TYPE,BACK_COLOR:"background-color: "+dt}))).forEach(((t,n)=>{e(14,y[F[n][0]][F[n][1]][2]=t.TYPE,y),e(14,y[F[n][0]][F[n][1]][3]=t.BACK_COLOR,y),e(14,y[F[n][0]][F[n][1]][4]=Number(t.NAME.replaceAll("USR_","")),y)}))},U=(t,n)=>{n.forEach((n=>{const l="UNT_NUM_"+t.toString(),o="UNT_NUM_"+n.toString();e(7,I[o].RBP+=I[l].ATK,I),I[o].RBP>=I[o].BDP&&(((t,n)=>{try{const l=nt(t),o=(X(l[0],l[1],!1),nt(n)),r=(X(o[0],o[1],!1),t=>{const n=nt(t),e=X(n[0],n[1],!1).filter((t=>"NON"===y[t[0]][t[1]][2]));if(0===e.length){const t=[];return y.forEach(((n,e)=>{n.forEach(((n,l)=>{"NON"===n[2]&&t.push([e,l])}))})),shuffle(t)}return e}),c=()=>{const t=Object.keys(I).map((t=>Number(t.split("_")[2])));return Math.max(...t)+1},_={TYPE:"UNT",NAME:"UNT_"+c().toString(),LFP:I["UNT_NUM_"+t.toString()].LFP+I["UNT_NUM_"+n.toString()].LFP,ATK:I["UNT_NUM_"+t.toString()].ATK+I["UNT_NUM_"+n.toString()].ATK,GLD:I["UNT_NUM_"+t.toString()].GLD+I["UNT_NUM_"+n.toString()].GLD,BDP:0,RBP:0};_.BDP=_.LFP*_.ATK;const s=r(t),a=shuffle(s)[0];void 0!==a&&"NON"===y[a[0]][a[1]][2]&&(e(7,I["UNT_NUM_"+c().toString()]=_,I),e(14,y[a[0]][a[1]][2]=_,y),e(14,y[a[0]][a[1]][3]="background-color: "+Tt+";",y),console.log("UNT is born!!"))}catch(t){console.log(t),e(7,I=R.omit(["UNT_NUM_"+get_new_UNT_NUM().toString()],I)),e(14,y[random_NON_POSITION[0]][random_NON_POSITION[1]][2]="NON",y),e(14,y[random_NON_POSITION[0]][random_NON_POSITION[1]][3]="background-color: "+Nt+";",y)}})(t,n),e(7,I[o].RBP=0,I))}))};let T,N=0;const P=()=>{e(22,l="none"===l?"block":"none"),e(23,o="none"===o?"block":"none")},g=(t,n=0)=>{e(1,D=R.append(m[n].EQP[t],D)),e(6,m[n].EQP=R.remove(t,1,m[n].EQP),m)},p=(t=0)=>{m[t].EQP.map(((t,n)=>{null!==t.MAGIC[0].MAGIC_COUNT&&(t.MAGIC[0].MAGIC_COUNT=1)}))},h=[{LFP_Min:2,LFP_Max:10,ATK_Min:1,ATK_Max:3},{LFP_Min:5,LFP_Max:8,ATK_Min:3,ATK_Max:10}];let M=0,B="OFF",m=[];const L=()=>{e(6,m=R.clone(r));const t=R.clone(c),n=R.clone(_);e(6,m=R.concat(m,t)),e(6,m=R.concat(m,n))};L();const C=({Eqp:t={UNT_NUM_0:{ATK:3,LFP:4,NAME:"UNT_0",TYPE:"UNT"}},Eqp_Index:n=0,Usr_Id:l=0})=>{console.log(t,l),m[l].EQP.length>=10||(e(6,m[l].EQP=R.append(t,m[l].EQP),m),e(1,D=R.remove(n,1,D)))};let I={},K=3,D=[],O=!1,G=0;const w=[{RARITY:0,LFP_BUFF:0,LFP_DEBUFF:0,ATK_BUFF:1,ATK_DEBUFF:0,MAGIC:R.clone([{MAGIC_COUNT:null},[[0,0,0],[0,"U",0],[0,0,0]]])},{RARITY:1,LFP_BUFF:0,LFP_DEBUFF:0,ATK_BUFF:2,ATK_DEBUFF:0,MAGIC:R.clone([{MAGIC_COUNT:null},[[0,0,0],[0,"U",0],[0,0,0]]])},{RARITY:2,LFP_BUFF:0,LFP_DEBUFF:0,ATK_BUFF:3,ATK_DEBUFF:0,MAGIC:R.clone([{MAGIC_COUNT:null},[[0,0,0],[0,"U",0],[0,0,0]]])},{RARITY:3,LFP_BUFF:0,LFP_DEBUFF:0,ATK_BUFF:4,ATK_DEBUFF:0,MAGIC:R.clone([{MAGIC_COUNT:null},[[0,0,0],[0,"U",0],[0,0,0]]])},{RARITY:90,LFP_BUFF:0,LFP_DEBUFF:0,ATK_BUFF:10,ATK_DEBUFF:0,MAGIC:R.clone([{MAGIC_COUNT:null},[[0,0,0],[0,"U",0],[0,0,0]]])},{RARITY:2,LFP_BUFF:0,LFP_DEBUFF:0,ATK_BUFF:0,ATK_DEBUFF:0,MAGIC:[{MAGIC_COUNT:1},[[1,0,1],[0,"U",0],[1,0,1]]]},{RARITY:2,LFP_BUFF:0,LFP_DEBUFF:0,ATK_BUFF:0,ATK_DEBUFF:0,MAGIC:[{MAGIC_COUNT:1},[[0,1,0],[1,"U",1],[0,1,0]]]},{RARITY:3,LFP_BUFF:0,LFP_DEBUFF:0,ATK_BUFF:0,ATK_DEBUFF:0,MAGIC:[{MAGIC_COUNT:1},[[1,1,1,1,1],[1,0,0,0,1],[1,0,"U",0,1],[1,0,0,0,1],[1,1,1,1,1]]]},{RARITY:3,LFP_BUFF:0,LFP_DEBUFF:0,ATK_BUFF:0,ATK_DEBUFF:0,MAGIC:[{MAGIC_COUNT:1},[[1,0,1,0,1],[0,1,1,1,0],[1,1,"U",1,1],[0,1,1,1,0],[1,0,1,0,1]]]}];let v=w,S=0,b=!1,Y="",y=[],k=[],x=[];const $=()=>{k=v.reduce(((t,n)=>{n.RARITY;const e=90===n.RARITY?1:0===n.RARITY?80:n.RARITY;for(let l=0;l<e;l++)t.push(n);return t}),[]),e(15,x=shuffle(k))};$();const Q=[{Rate:1,X:1},{Rate:4,X:3},{Rate:8,X:5}],W=({Rate_Param:t=1})=>{console.log("slot_exe_once"),(({Rate:t=1})=>{if(console.log("make_high_rate_slot"),console.log(Q.filter((n=>n.Rate===t))[0].Rate),1!==t){if(t===Q.filter((n=>n.Rate===t))[0].Rate){v=R.clone(w);const n=v.map((n=>(n.ATK_BUFF=n.ATK_BUFF*Q.filter((n=>n.Rate===t))[0].X,n)));v=R.clone(n)}}else{v=R.clone(w);const t=v.map((t=>(t.ATK_BUFF=1*t.ATK_BUFF,t)));v=R.clone(t)}})({Rate:t}),$();const n=O?((t,n)=>{const e=x.filter((n=>n.RARITY===t)),l=e.slice(0,e.length-e.length*(n/100)),o=x.filter((n=>n.RARITY!==t)),r=l.concat(o);return shuffle(r)})(0,90):x,l=shuffle(n)[0];K-t<=0||(e(8,K-=t),e(1,D=R.append(l,D)),D.slice(-shuffle([2,3])[0]).every((t=>t.RARITY>=1))&&e(9,O=!0),!0===O&&(e(10,G+=1),e(9,O=!(G>=30)),e(10,G=G>=30?0:G)))},q=(t,n)=>{try{(t=>{const n=t.map((t=>t.map(((n,e)=>"U"===n?[e,t.indexOf(n)]:null)))).flat().filter(((t,n)=>null!==t))[0];return t.map(((t,n)=>t.map(((t,e)=>1===t?[n,e]:null)))).flat().filter((t=>null!==t)).map((t=>[t[0]-n[0],t[1]-n[1]]))})(t).forEach((t=>{const l=F[n][0]+t[0],o=F[n][1]+t[1];if(void 0===y[l]||void 0===y[l][o])return;if(i(),console.log(y[l][o][2]),"GOL"===y[l][o][2]||"BLC"===y[l][o][2]||"NON"===y[l][o][2]||"USR"===y[l][o][2])return;const r="UNT_NUM_"+Number(y[l][o][2].NAME.replaceAll("UNT_","")).toString(),c=m[n].EQP.reduce(((t,n)=>t+n.ATK_BUFF),0)||0,_=m[n].ATK+c;if(e(7,I[r].LFP-=_,I),y[l][o][3]==="background-color: "+Tt+";"&&z({Y_X_Ary:[l,o],ms:200,Original_Color:I[r].LFP<=0?Nt:Tt,Color_0:Pt,Color_1:Nt}),I[r].LFP<=0){e(3,N+=1),e(8,K+=(({Unt_Gld:t=0,Kill_Streak:n=0})=>(console.log(t,n),t*n))({Unt_Gld:I[r].GLD,Kill_Streak:N}));const t=[l,o];j(t[0],t[1]),e(14,y[t[0]][t[1]][3]="background-color: "+Nt+";",y),e(7,I=R.omit([r],I))}}))}catch(t){console.log(t)}},X=(t,n,e=!1)=>{const l=[[t,n-1],[t,n+1],[t-1,n],[t+1,n]];return e&&console.log(t,n,l),l},j=(t,n)=>{e(14,y[t][n][2]="NON",y),e(14,y[t][n][3]="background-color: "+Nt+";",y)},H=(t,n=1)=>{m.forEach(((t,n)=>{t.EQP.forEach(((t,n)=>{null!==t.MAGIC[0].MAGIC_COUNT&&(t.MAGIC[0].MAGIC_COUNT+=1)}))})),z({Y_X_Ary:[Z()[0],Z()[1]],ms:200,Original_Color:dt,Color_0:Pt,Color_1:Nt});const l="UNT_NUM_"+t.toString(),o=I[l].ATK;V({Before_LFP:m[n].LFP,After_LFP:m[n].LFP-o,Damage:o}),e(6,m[n].LFP-=o,m),m[n].LFP<=0&&(e(13,Y="YOU DIED, GAME OVER"),e(4,M=0),e(11,S=0),setTimeout((()=>{ct({when_mounted_time:!1,go_up:!1,when_died:!0})}),1e3))},V=({Before_LFP:t=0,After_LFP:n=0,Damage:e=0})=>{"ON"===B&&alert("Before_LFP: "+t.toString()+" Damage: "+e.toString()+" After_LFP: "+n.toString()+" ")},z=({Y_X_Ary:t=[9,0],ms:n=200,Original_Color:e=dt,Color_0:l=dt,Color_1:o=Nt})=>{};function J(t,n={Key:null,Usr_Id:null,Magic:null,Eqp_I:null}){const l=t?t.key:n.Key,o=n.Usr_Id?n.Usr_Id:0,r=n.Magic,c=n.Eqp_I;if(e(3,N=0),r)return((t,n=0)=>{console.log(n),null!==m[n].EQP[t].MAGIC[0].MAGIC_COUNT&&e(6,m[n].EQP[t].MAGIC[0].MAGIC_COUNT-=1,m)})(c,o),q(r[1],o),f(),rt(),void(!0===A&&(Object.entries(I).map(((t,n)=>{et(t[1].NAME)})),A=!1));const _=((t,n)=>{const e={w:[-1,0],a:[0,-1],s:[1,0],d:[0,1],m:null},l=e[t][0],o=e[t][1],r=[F[n][0]+l,F[n][1]+o];return i(),r})(l,o);if("BLC"===y[_[0]][_[1]][2]&&(e(11,S+=1),j(_[0],_[1])),"USR"!==y[_[0]][_[1]][2]){if("GOL"===y[_[0]][_[1]][2]&&(e(12,b=!0),e(1,D=[]),ct({when_mounted_time:!1,go_up:!0,when_died:!1})),!r){(()=>{i(),"NON"===y[_[0]][_[1]][2]&&(e(14,y[_[0]][_[1]][2]="USR",y),e(14,y[F[o][0]][F[o][1]][2]="NON",y),e(14,y[_[0]][_[1]][3]="background-color: "+dt+";",y),e(14,y[F[o][0]][F[o][1]][3]="background-color: "+Nt+";",y),F[o]=_),i()})(),((t,n,l=0)=>{if("object"!==y[t][n][2]&&"UNT"!==y[t][n][2].TYPE)return;const o="UNT_NUM_"+Number(y[t][n][2].NAME.replaceAll("UNT_","")).toString(),r=m[l].EQP.reduce(((t,n)=>t+n.ATK_BUFF),0)||0,c=m[l].ATK+r;if(V({Before_LFP:I[o].LFP,After_LFP:I[o].LFP-c,Damage:c}),e(7,I[o].LFP-=c,I),I[o].LFP<=0){e(3,N+=1),e(8,K+=1);const l=[t,n];j(l[0],l[1]),e(14,y[l[0]][l[1]][3]="background-color: "+Nt+";",y),e(7,I=R.omit([o],I))}})(_[0],_[1]),f(),rt()}!0===A&&(Object.entries(I).map(((t,n)=>{et(t[1].NAME)})),A=!1)}}const Z=()=>{i();return y.map((t=>t.filter((t=>"USR"===t[2])))).filter((t=>t.length>0))};let tt=null;const nt=(t=0)=>{try{const n=t.toString(),e=(t.toString(),y.map(((t,n)=>t.map(((t,e)=>"object"==typeof t[2]?[t[2].NAME.replaceAll("UNT_",""),[n,e]]:null)))).flat().filter((t=>null!==t)));tt=e;const l=e.filter((t=>t[0]===n))[0][1],[o,r]=l;return[o,r]}catch(t){console.log("error in get_UNT_position"),console.log(t)}},et=t=>{try{const l=t?Number(t.replaceAll("UNT_","")):0,o=nt(l);((t,n)=>{try{let e=[];const l=Z().map((t=>{const e=[t[0][0],t[0][1],t[0][4]];if(n[1]===e[1]&&n[0]===e[0]-1||n[1]===e[1]&&n[0]===e[0]+1||n[0]===e[0]&&n[1]===e[1]-1||n[0]===e[0]&&n[1]===e[1]+1)return["ENEMY",e[2]]})).filter(Boolean);e=e.concat(l),e.filter((t=>"ENEMY"===t[0])).forEach((n=>H(t,n[1])))}catch(t){console.log("error in attack_if_adjacent"),console.log(t)}})(l,o);let r=X(o[0],o[1],!1);r=r.filter((t=>void 0!==t)),((t,n)=>{if((n=n.filter((t=>t[0]>=0&&t[0]<=9&&t[1]>=0&&t[1]<=9))).some((t=>"UNT"===y[t[0]][t[1]][2].TYPE))){const e=n.filter((t=>"UNT"===y[t[0]][t[1]][2].TYPE)).map((t=>y[t[0]][t[1]][2].NAME.replaceAll("UNT_",""))).map((t=>Number(t)));U(t,e)}})(l,r);((t,n,l)=>{l=l.filter((t=>t[0]>=0&&t[0]<=9&&t[1]>=0&&t[1]<=9));let o=shuffle(l);for(let l=0;l<o.length;l++){let r=o[l];"NON"===y[r[0]][r[1]][2]&&(j(n[0],n[1]),e(14,y[n[0]][n[1]][3]="background-color: "+Nt+";",y),e(14,y[r[0]][r[1]][2]=I["UNT_NUM_"+t],y),e(14,y[r[0]][r[1]][3]="background-color: "+Tt+";",y),o=[])}})(l,o,[[(n=o)[0],n[1]-1],[n[0],n[1]+1],[n[0]-1,n[1]],[n[0]+1,n[1]]])}catch(t){console.log(t)}var n},lt=()=>{(()=>{let t=y.map((t=>t.filter((t=>"NON"===t[2])))).flat().map((t=>t.slice(0,2)));Object.entries(I).forEach(((n,l)=>{const o="UNT_NUM_"+l.toString(),r=shuffle(t)[0];t=t.filter((t=>t!==r)),e(14,y[r[0]][r[1]][2]=I[o],y),e(14,y[r[0]][r[1]][3]="background-color: "+Tt+";",y)}))})()},ot=()=>m.map(((t,n)=>t.ID)),rt=()=>{const t=F[u][0],n=F[u][1];e(14,y[t][n][3]="background-color: #00FFFF;",y)},ct=({when_mounted_time:t=!0,go_up:n=!1,when_died:l=!1})=>{e(14,y=R.xprod(R.range(0,10),R.range(0,10)).map((t=>t.concat(["BLC"]))).map((t=>t.concat(["background-color: #808080"])))),e(14,y=R.splitEvery(10,y)),s=[r,c,_].map((t=>t.map((t=>t.SPAWN_Y_X)))).flat(),s.forEach(((t,n)=>{e(14,y[t[0]][t[1]][2]="USR",y),e(14,y[t[0]][t[1]][3]="background-color: "+dt+";",y)})),e(13,Y=""),!0===l&&(ot().forEach((t=>p(t))),L(),e(8,K=m[0].GOLD)),e(7,I={UNT_NUM_0:{TYPE:"UNT",NAME:"UNT_0",LFP:3,ATK:1,BDP:0,RBP:0},UNT_NUM_1:{TYPE:"UNT",NAME:"UNT_1",LFP:2,ATK:2,BDP:0,RBP:0},UNT_NUM_2:{TYPE:"UNT",NAME:"UNT_2",LFP:2,ATK:3,BDP:0,RBP:0},UNT_NUM_3:{TYPE:"UNT",NAME:"UNT_3",LFP:2,ATK:4,BDP:0,RBP:0},UNT_NUM_4:{TYPE:"UNT",NAME:"UNT_4",LFP:4,ATK:1,BDP:0,RBP:0},UNT_NUM_5:{TYPE:"UNT",NAME:"UNT_5",LFP:4,ATK:2,BDP:0,RBP:0},UNT_NUM_6:{TYPE:"UNT",NAME:"UNT_6",LFP:5,ATK:1,BDP:0,RBP:0},UNT_NUM_7:{TYPE:"UNT",NAME:"UNT_7",LFP:5,ATK:2,BDP:0,RBP:0},UNT_NUM_8:{TYPE:"UNT",NAME:"UNT_8",LFP:5,ATK:3,BDP:0,RBP:0},UNT_NUM_9:{TYPE:"UNT",NAME:"UNT_9",LFP:5,ATK:4,BDP:0,RBP:0},UNT_NUM_10:{TYPE:"UNT",NAME:"UNT_10",LFP:6,ATK:1,BDP:0,RBP:0},UNT_NUM_11:{TYPE:"UNT",NAME:"UNT_11",LFP:6,ATK:2,BDP:0,RBP:0},UNT_NUM_12:{TYPE:"UNT",NAME:"UNT_12",LFP:6,ATK:3,BDP:0,RBP:0},UNT_NUM_13:{TYPE:"UNT",NAME:"UNT_13",LFP:6,ATK:4,BDP:0,RBP:0},UNT_NUM_14:{TYPE:"UNT",NAME:"UNT_14",LFP:1,ATK:1,BDP:0,RBP:0},UNT_NUM_15:{TYPE:"UNT",NAME:"UNT_15",LFP:1,ATK:2,BDP:0,RBP:0},UNT_NUM_16:{TYPE:"UNT",NAME:"UNT_16",LFP:1,ATK:3,BDP:0,RBP:0}}),e(7,I={});let o={};if(!0===n){ot().forEach((t=>p(t))),P(),ot().forEach((t=>e(6,m[t].LFP+=10,m))),e(4,M+=1);const t=()=>M+1,n=0,l=t()*h[n].LFP_Min,r=t()*h[n].LFP_Max,c=t()*h[n].ATK_Min,_=t()*h[n].ATK_Max;console.log(_),o={Repeat_Array_Num:1,Repeat_Array_Times:20,LFP_Range_Array:[l,r],ATK_Range_Array:[c,_]}}var A,f;e(7,I=(({Repeat_Array_Num:t=1,Repeat_Array_Times:n=20,LFP_Range_Array:e=[2,10],ATK_Range_Array:l=[1,3],GLD_Range_Array:o=[1,2],BDP_Rate:r=5})=>{const c={},_=({Range:t=[1,10]})=>{const n=t[0],e=t[1];return Math.floor(Math.random()*(e+1-n))+n};var s,a;return(s=t,a=n,R.repeat(s,a)).forEach(((t,n)=>{c["UNT_NUM_"+n.toString()]={TYPE:"UNT",NAME:"UNT_"+n.toString(),LFP:t*_({Range:e}),ATK:t*_({Range:l}),GLD:_({Range:o}),BDP:0,RBP:0},c["UNT_NUM_"+n.toString()].BDP=c["UNT_NUM_"+n.toString()].LFP*c["UNT_NUM_"+n.toString()].ATK*r})),c})(o)),f=9,e(14,y[A=0][f][2]="GOL",y),e(14,y[A][f][3]="background-color: #FFFF00;",y),e(11,S=0),e(12,b=!1),F=a(),((t=80)=>{const n=y.map((t=>t.filter((t=>"BLC"===t[2])))).flat().length,e=Math.floor(n*(t/100));for(let t=0;t<e;t++){const t=[shuffle([0,1,2,3,4,5,6,7,8,9])[0],shuffle([0,1,2,3,4,5,6,7,8,9])[0]];i(),"USR"!==y[t[0]][t[1]][2]&&"GOL"!==y[t[0]][t[1]][2]&&j(t[0],t[1])}})(),e(14,y[5][4][2]="NON",y),e(14,y[5][4][3]="background-color: "+Nt+";",y),e(14,y[5][6][2]="NON",y),e(14,y[5][6][3]="background-color: "+Nt+";",y),e(14,y[4][5][2]="NON",y),e(14,y[4][5][3]="background-color: "+Nt+";",y),e(14,y[6][5][2]="NON",y),e(14,y[6][5][3]="background-color: "+Nt+";",y),e(14,y[5][3][2]="NON",y),e(14,y[5][3][3]="background-color: "+Nt+";",y),e(14,y[5][7][2]="NON",y),e(14,y[5][7][3]="background-color: "+Nt+";",y),e(14,y[3][5][2]="NON",y),e(14,y[3][5][3]="background-color: "+Nt+";",y),e(14,y[7][5][2]="NON",y),e(14,y[7][5][3]="background-color: "+Nt+";",y),lt(),rt(),document.addEventListener("keypress",(()=>J(event,{Key:null,Usr_Id:u,Magic:null,Eqp_I:null})))};d((async()=>{try{ct({when_mounted_time:!0,go_up:!1,when_died:!1})}catch(t){console.log(t)}}));return t.$$.update=()=>{2&t.$$.dirty[0]&&D&&(({What:t=D,Any:n="RARITY",Asc_Desc:e="DESC"})=>{t=e?t.sort(((t,e)=>e[n]-t[n])):t.sort(((t,e)=>t[n]-e[n]))})({What:D,Any:"RARITY",Asc_Desc:"DESC"}),4194305&t.$$.dirty[0]&&T&&T.style.setProperty("--field-none",l),8388609&t.$$.dirty[0]&&T&&T.style.setProperty("--gacha-none",o)},[T,D,u,N,M,B,m,I,K,O,G,S,b,Y,y,x,g,()=>{e(1,D=[]),P()},C,W,X,J,l,o,(t,n)=>X(t,n,!0),(t,n)=>X(t,n,!0),()=>J(null,{Key:"w",Usr_Id:u,Magic:null,Eqp_I:null}),()=>J(null,{Key:"a",Usr_Id:u,Magic:null,Eqp_I:null}),()=>J(null,{Key:"d",Usr_Id:u,Magic:null,Eqp_I:null}),()=>J(null,{Key:"s",Usr_Id:u,Magic:null,Eqp_I:null}),function(){B=this.__value,e(5,B)},[[]],function(){B=this.__value,e(5,B)},(t,n,e)=>J(null,{Magic:t.MAGIC,Eqp_I:n,Usr_Id:e.ID}),t=>g(t,0),()=>W({Rate_Param:1}),()=>W({Rate_Param:4}),()=>W({Rate_Param:8}),(t,n,e)=>C({Eqp:t,Eqp_Index:n,Usr_Id:e}),function(t){E[t?"unshift":"push"]((()=>{T=t,e(0,T)}))}]}return new class extends v{constructor(t){super(),w(this,t,gt,Ut,r,{},null,[-1,-1,-1,-1])}}({target:document.body})}();
//# sourceMappingURL=bundle.js.map
