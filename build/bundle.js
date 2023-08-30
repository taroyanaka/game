var app=function(){"use strict";function t(){}function n(t){return t()}function e(){return Object.create(null)}function l(t){t.forEach(n)}function o(t){return"function"==typeof t}function c(t,n){return t!=t?n==n:t!==n||t&&"object"==typeof t||"function"==typeof t}function r(t,n){t.appendChild(n)}function s(t,n,e){t.insertBefore(n,e||null)}function F(t){t.parentNode&&t.parentNode.removeChild(t)}function u(t,n){for(let e=0;e<t.length;e+=1)t[e]&&t[e].d(n)}function a(t){return document.createElement(t)}function _(t){return document.createTextNode(t)}function i(){return _(" ")}function A(t,n,e,l){return t.addEventListener(n,e,l),()=>t.removeEventListener(n,e,l)}function N(t,n,e){null==e?t.removeAttribute(n):t.getAttribute(n)!==e&&t.setAttribute(n,e)}function f(t,n){n=""+n,t.data!==n&&(t.data=n)}let U;function T(t){U=t}function d(t){(function(){if(!U)throw new Error("Function called outside component initialization");return U})().$$.on_mount.push(t)}const P=[],p=[];let E=[];const g=[],h=Promise.resolve();let m=!1;function M(t){E.push(t)}const b=new Set;let C=0;function L(){if(0!==C)return;const t=U;do{try{for(;C<P.length;){const t=P[C];C++,T(t),I(t.$$)}}catch(t){throw P.length=0,C=0,t}for(T(null),P.length=0,C=0;p.length;)p.pop()();for(let t=0;t<E.length;t+=1){const n=E[t];b.has(n)||(b.add(n),n())}E.length=0}while(P.length);for(;g.length;)g.pop()();m=!1,b.clear(),T(t)}function I(t){if(null!==t.fragment){t.update(),l(t.before_update);const n=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,n),t.after_update.forEach(M)}}const v=new Set;function B(t,n){const e=t.$$;null!==e.fragment&&(!function(t){const n=[],e=[];E.forEach((l=>-1===t.indexOf(l)?n.push(l):e.push(l))),e.forEach((t=>t())),E=n}(e.after_update),l(e.on_destroy),e.fragment&&e.fragment.d(n),e.on_destroy=e.fragment=null,e.ctx=[])}function K(t,n){-1===t.$$.dirty[0]&&(P.push(t),m||(m=!0,h.then(L)),t.$$.dirty.fill(0)),t.$$.dirty[n/31|0]|=1<<n%31}function G(c,r,s,u,a,_,i,A=[-1]){const N=U;T(c);const f=c.$$={fragment:null,ctx:[],props:_,update:t,not_equal:a,bound:e(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(r.context||(N?N.$$.context:[])),callbacks:e(),dirty:A,skip_bound:!1,root:r.target||N.$$.root};i&&i(f.root);let d=!1;if(f.ctx=s?s(c,r.props||{},((t,n,...e)=>{const l=e.length?e[0]:n;return f.ctx&&a(f.ctx[t],f.ctx[t]=l)&&(!f.skip_bound&&f.bound[t]&&f.bound[t](l),d&&K(c,t)),n})):[],f.update(),d=!0,l(f.before_update),f.fragment=!!u&&u(f.ctx),r.target){if(r.hydrate){const t=function(t){return Array.from(t.childNodes)}(r.target);f.fragment&&f.fragment.l(t),t.forEach(F)}else f.fragment&&f.fragment.c();r.intro&&((P=c.$$.fragment)&&P.i&&(v.delete(P),P.i(p))),function(t,e,c,r){const{fragment:s,after_update:F}=t.$$;s&&s.m(e,c),r||M((()=>{const e=t.$$.on_mount.map(n).filter(o);t.$$.on_destroy?t.$$.on_destroy.push(...e):l(e),t.$$.on_mount=[]})),F.forEach(M)}(c,r.target,r.anchor,r.customElement),L()}var P,p;T(N)}class O{$destroy(){B(this,1),this.$destroy=t}$on(n,e){if(!o(e))return t;const l=this.$$.callbacks[n]||(this.$$.callbacks[n]=[]);return l.push(e),()=>{const t=l.indexOf(e);-1!==t&&l.splice(t,1)}}$set(t){var n;this.$$set&&(n=t,0!==Object.keys(n).length)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}function k(t,n,e){const l=t.slice();return l[48]=n[e],l[50]=e,l}function S(t,n,e){const l=t.slice();return l[48]=n[e],l[50]=e,l}function y(t,n,e){const l=t.slice();return l[52]=n[e],l}function $(t,n,e){const l=t.slice();return l[48]=n[e],l[50]=e,l}function Y(t,n,e){const l=t.slice();return l[56]=n[e],l[58]=e,l}function D(t,n,e){const l=t.slice();return l[59]=n[e],l[61]=e,l}function Q(t,n,e){const l=t.slice();return l[62]=n[e],l[64]=e,l}function x(t){let n;return{c(){n=a("div"),n.textContent="GOAL"},m(t,e){s(t,n,e)},d(t){t&&F(n)}}}function w(t){let n,e;return{c(){n=a("div"),e=_(t[8])},m(t,l){s(t,n,l),r(n,e)},p(t,n){256&n[0]&&f(e,t[8])},d(t){t&&F(n)}}}function j(t){let n,e,o,c,u;function i(){return t[15](t[61],t[64])}function f(){return t[16](t[61],t[64])}return{c(){n=a("span"),e=_("□"),N(n,"style",o=t[62][3])},m(t,l){s(t,n,l),r(n,e),c||(u=[A(n,"keydown",i),A(n,"click",f)],c=!0)},p(e,l){t=e,512&l[0]&&o!==(o=t[62][3])&&N(n,"style",o)},d(t){t&&F(n),c=!1,l(u)}}}function W(t){let n,e,l=t[59],o=[];for(let n=0;n<l.length;n+=1)o[n]=j(Q(t,l,n));return{c(){n=a("li");for(let t=0;t<o.length;t+=1)o[t].c();e=i(),N(n,"class","CELL")},m(t,l){s(t,n,l);for(let t=0;t<o.length;t+=1)o[t]&&o[t].m(n,null);r(n,e)},p(t,c){if(8704&c[0]){let r;for(l=t[59],r=0;r<l.length;r+=1){const s=Q(t,l,r);o[r]?o[r].p(s,c):(o[r]=j(s),o[r].c(),o[r].m(n,e))}for(;r<o.length;r+=1)o[r].d(1);o.length=l.length}},d(t){t&&F(n),u(o,t)}}}function H(t){let n,e,l,o,c,A,N,U,T,d,P,p,E,g=t[48].RARITY+"",h=t[48].LFP_BUFF+"",m=t[48].ATK_BUFF+"",M=t[48].MAGIC[0].MAGIC_COUNT+"",b=t[48].MAGIC[0].MAGIC_COUNT>=1&&q(t),C=t[48].MAGIC[1],L=[];for(let n=0;n<C.length;n+=1)L[n]=X(Y(t,C,n));return{c(){n=a("div"),e=_("RARITY: "),l=_(g),o=_("\n\t\t\t\t\t\t\t\t\t\t\tLFP_BUFF: "),c=_(h),A=_("\n\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\tATK_BUFF: "),N=_(m),U=i(),T=a("div"),b&&b.c(),d=_("\n\t\t\t\t\t\t\t\t\t\t\t\t\tMAGIC_COUNT: "),P=_(M),p=i();for(let t=0;t<L.length;t+=1)L[t].c();E=i()},m(t,F){s(t,n,F),r(n,e),r(n,l),r(n,o),r(n,c),r(n,A),r(n,N),r(n,U),r(n,T),b&&b.m(T,null),r(T,d),r(T,P),r(T,p);for(let t=0;t<L.length;t+=1)L[t]&&L[t].m(T,null);r(n,E)},p(t,n){if(1&n[0]&&g!==(g=t[48].RARITY+"")&&f(l,g),1&n[0]&&h!==(h=t[48].LFP_BUFF+"")&&f(c,h),1&n[0]&&m!==(m=t[48].ATK_BUFF+"")&&f(N,m),t[48].MAGIC[0].MAGIC_COUNT>=1?b?b.p(t,n):(b=q(t),b.c(),b.m(T,d)):b&&(b.d(1),b=null),1&n[0]&&M!==(M=t[48].MAGIC[0].MAGIC_COUNT+"")&&f(P,M),1&n[0]){let e;for(C=t[48].MAGIC[1],e=0;e<C.length;e+=1){const l=Y(t,C,e);L[e]?L[e].p(l,n):(L[e]=X(l),L[e].c(),L[e].m(T,null))}for(;e<L.length;e+=1)L[e].d(1);L.length=C.length}},d(t){t&&F(n),b&&b.d(),u(L,t)}}}function q(t){let n,e,l;function o(){return t[21](t[48],t[50])}return{c(){n=a("button"),n.textContent="MAGIC"},m(t,c){s(t,n,c),e||(l=A(n,"click",o),e=!0)},p(n,e){t=n},d(t){t&&F(n),e=!1,l()}}}function X(t){let n,e,l,o=t[56]+"";return{c(){n=a("div"),e=_(o),l=i()},m(t,o){s(t,n,o),r(n,e),r(n,l)},p(t,n){1&n[0]&&o!==(o=t[56]+"")&&f(e,o)},d(t){t&&F(n)}}}function V(t){let n,e=t[48]&&H(t);return{c(){e&&e.c(),n=_("")},m(t,l){e&&e.m(t,l),s(t,n,l)},p(t,l){t[48]?e?e.p(t,l):(e=H(t),e.c(),e.m(n.parentNode,n)):e&&(e.d(1),e=null)},d(t){e&&e.d(t),t&&F(n)}}}function z(t){let n,e,l,o,c,u,i=t[1][t[52]].NAME+"",A=t[1][t[52]].LFP+"",U=t[1][t[52]].ATK+"";return{c(){n=a("div"),e=_(i),l=_(" LFP: "),o=_(A),c=_(" ATK: "),u=_(U),N(n,"class","UNT_BACK")},m(t,F){s(t,n,F),r(n,e),r(n,l),r(n,o),r(n,c),r(n,u)},p(t,n){2&n[0]&&i!==(i=t[1][t[52]].NAME+"")&&f(e,i),2&n[0]&&A!==(A=t[1][t[52]].LFP+"")&&f(o,A),2&n[0]&&U!==(U=t[1][t[52]].ATK+"")&&f(u,U)},d(t){t&&F(n)}}}function J(t){let n,e,l,o,c,u,U,T,d,P,p,E,g,h,m,M,b,C,L,I,v,R,B,K,G=t[48].RARITY+"",O=t[48].LFP_BUFF+"",k=t[48].LFP_DEBUFF+"",S=t[48].ATK_BUFF+"",y=t[48].ATK_DEBUFF+"",$=t[48].MAGIC[0].MAGIC_COUNT+"",Y=t[48].MAGIC[1]+"";function D(){return t[22](t[48])}return{c(){n=a("span"),e=_(G),l=i(),o=a("span"),c=_(O),u=i(),U=a("span"),T=_(k),d=i(),P=a("span"),p=_(S),E=i(),g=a("span"),h=_(y),m=i(),M=a("span"),b=_($),C=i(),L=a("span"),I=_(Y),v=i(),R=a("button"),R.textContent="set_EQP",N(n,"class","EQP_SPAN svelte-13164b6"),N(o,"class","EQP_SPAN svelte-13164b6"),N(U,"class","EQP_SPAN svelte-13164b6"),N(P,"class","EQP_SPAN svelte-13164b6"),N(g,"class","EQP_SPAN svelte-13164b6"),N(M,"class","EQP_SPAN svelte-13164b6"),N(L,"class","EQP_SPAN svelte-13164b6")},m(t,F){s(t,n,F),r(n,e),s(t,l,F),s(t,o,F),r(o,c),s(t,u,F),s(t,U,F),r(U,T),s(t,d,F),s(t,P,F),r(P,p),s(t,E,F),s(t,g,F),r(g,h),s(t,m,F),s(t,M,F),r(M,b),s(t,C,F),s(t,L,F),r(L,I),s(t,v,F),s(t,R,F),B||(K=A(R,"click",D),B=!0)},p(n,l){t=n,8&l[0]&&G!==(G=t[48].RARITY+"")&&f(e,G),8&l[0]&&O!==(O=t[48].LFP_BUFF+"")&&f(c,O),8&l[0]&&k!==(k=t[48].LFP_DEBUFF+"")&&f(T,k),8&l[0]&&S!==(S=t[48].ATK_BUFF+"")&&f(p,S),8&l[0]&&y!==(y=t[48].ATK_DEBUFF+"")&&f(h,y),8&l[0]&&$!==($=t[48].MAGIC[0].MAGIC_COUNT+"")&&f(b,$),8&l[0]&&Y!==(Y=t[48].MAGIC[1]+"")&&f(I,Y)},d(t){t&&F(n),t&&F(l),t&&F(o),t&&F(u),t&&F(U),t&&F(d),t&&F(P),t&&F(E),t&&F(g),t&&F(m),t&&F(M),t&&F(C),t&&F(L),t&&F(v),t&&F(R),B=!1,K()}}}function Z(t){let n,e,l=t[48]&&J(t);return{c(){n=a("li"),l&&l.c(),e=i()},m(t,o){s(t,n,o),l&&l.m(n,null),r(n,e)},p(t,o){t[48]?l?l.p(t,o):(l=J(t),l.c(),l.m(n,e)):l&&(l.d(1),l=null)},d(t){t&&F(n),l&&l.d()}}}function tt(n){let e,l,o=n[48]&&function(n){let e,l,o,c,u,A,f,U,T,d,P,p,E,g,h,m,M,b,C,L,I=n[48].RARITY+"",v=n[48].LFP_BUFF+"",R=n[48].LFP_DEBUFF+"",B=n[48].ATK_BUFF+"",K=n[48].ATK_DEBUFF+"",G=n[48].MAGIC[0].MAGIC_COUNT+"",O=n[48].MAGIC[1]+"";return{c(){e=a("span"),l=_(I),o=i(),c=a("span"),u=_(v),A=i(),f=a("span"),U=_(R),T=i(),d=a("span"),P=_(B),p=i(),E=a("span"),g=_(K),h=i(),m=a("span"),M=_(G),b=i(),C=a("span"),L=_(O),N(e,"class","EQP_SPAN svelte-13164b6"),N(c,"class","EQP_SPAN svelte-13164b6"),N(f,"class","EQP_SPAN svelte-13164b6"),N(d,"class","EQP_SPAN svelte-13164b6"),N(E,"class","EQP_SPAN svelte-13164b6"),N(m,"class","EQP_SPAN svelte-13164b6"),N(C,"class","EQP_SPAN svelte-13164b6")},m(t,n){s(t,e,n),r(e,l),s(t,o,n),s(t,c,n),r(c,u),s(t,A,n),s(t,f,n),r(f,U),s(t,T,n),s(t,d,n),r(d,P),s(t,p,n),s(t,E,n),r(E,g),s(t,h,n),s(t,m,n),r(m,M),s(t,b,n),s(t,C,n),r(C,L)},p:t,d(t){t&&F(e),t&&F(o),t&&F(c),t&&F(A),t&&F(f),t&&F(T),t&&F(d),t&&F(p),t&&F(E),t&&F(h),t&&F(m),t&&F(b),t&&F(C)}}}(n);return{c(){e=a("li"),o&&o.c(),l=i()},m(t,n){s(t,e,n),o&&o.m(e,null),r(e,l)},p(t,n){t[48]&&o.p(t,n)},d(t){t&&F(e),o&&o.d()}}}function nt(n){let e,o,c,U,T,d,P,p,E,g,h,m,M,b,C,L,I,v,R,B,K,G,O,Y,Q,j,H,q,X,J,nt,et,lt,ot,ct,rt,st,Ft,ut,at,_t,it,At,Nt,ft,Ut,Tt,dt,Pt,pt,Et,gt,ht,mt,Mt,bt,Ct,Lt,It,vt,Rt,Bt,Kt,Gt,Ot,kt,St=n[0][0].NAME+"",yt=n[0][0].LFP+"",$t=n[0][0].ATK+"",Yt=n[7]&&x(),Dt=n[8]&&w(n),Qt=n[9],xt=[];for(let t=0;t<Qt.length;t+=1)xt[t]=W(D(n,Qt,t));let wt=n[0][0].EQP,jt=[];for(let t=0;t<wt.length;t+=1)jt[t]=V($(n,wt,t));let Wt=Object.keys(n[1]),Ht=[];for(let t=0;t<Wt.length;t+=1)Ht[t]=z(y(n,Wt,t));let qt=n[3],Xt=[];for(let t=0;t<qt.length;t+=1)Xt[t]=Z(S(n,qt,t));let Vt=n[11],zt=[];for(let t=0;t<Vt.length;t+=1)zt[t]=tt(k(n,Vt,t));return{c(){e=a("div"),o=a("div"),c=i(),Yt&&Yt.c(),U=i(),Dt&&Dt.c(),T=i(),d=a("div"),P=_("PICKEL: "),p=_(n[6]),E=i(),g=a("ul");for(let t=0;t<xt.length;t+=1)xt[t].c();h=i(),m=a("div"),M=a("button"),M.textContent="◾️",b=i(),C=a("button"),C.textContent="W",L=i(),I=a("button"),I.textContent="◾️",v=i(),R=a("div"),B=a("button"),B.textContent="A",K=i(),G=a("button"),G.textContent="◾️",O=i(),Y=a("button"),Y.textContent="D",Q=i(),j=a("div"),H=a("button"),H.textContent="◾️",q=i(),X=a("button"),X.textContent="S",J=i(),nt=a("button"),nt.textContent="◾️",et=i(),lt=a("div"),ot=a("div"),ct=_(St),rt=_("\n\t\t\t\t\t\t\t\t\tLFP: "),st=_(yt),Ft=_("\n\t\t\t\t\t\t\t\t\tATK: "),ut=_($t),at=i();for(let t=0;t<jt.length;t+=1)jt[t].c();_t=i();for(let t=0;t<Ht.length;t+=1)Ht[t].c();it=i(),At=a("div"),At.textContent="Ver 0.0.1.1",Nt=i(),ft=a("a"),ft.textContent="GitHub",Ut=i(),Tt=a("div"),dt=a("button"),dt.textContent="slot_exe_once",Pt=i(),pt=a("div"),pt.textContent="MINE",Et=_("\n\t\tGOLD: "),gt=_(n[2]),ht=_("\n\t\tKAKUHEN: "),mt=_(n[4]),Mt=_("\n\t\tKAKUHEN_COUNTER: "),bt=_(n[5]),Ct=i(),Lt=a("ul"),It=a("li"),It.innerHTML='<span class="EQP_SPAN svelte-13164b6">RARITY</span> \n\t\t\t\t<span class="EQP_SPAN svelte-13164b6">LFP_BUFF</span> \n\t\t\t\t<span class="EQP_SPAN svelte-13164b6">LFP_DEBUFF</span> \n\t\t\t\t<span class="EQP_SPAN svelte-13164b6">ATK_BUFF</span> \n\t\t\t\t<span class="EQP_SPAN svelte-13164b6">ATK_DEBUFF</span> \n\t\t\t\t<span class="EQP_SPAN svelte-13164b6">MAGIC</span> \n\t\t\t\t<span class="EQP_SPAN svelte-13164b6">MAGIC_RANGE</span>',vt=i();for(let t=0;t<Xt.length;t+=1)Xt[t].c();Rt=i(),Bt=a("ul"),Kt=a("li"),Kt.innerHTML='<span class="EQP_SPAN svelte-13164b6">RARITY</span> \n\t\t\t\t<span class="EQP_SPAN svelte-13164b6">LFP_BUFF</span> \n\t\t\t\t<span class="EQP_SPAN svelte-13164b6">LFP_DEBUFF</span> \n\t\t\t\t<span class="EQP_SPAN svelte-13164b6">ATK_BUFF</span> \n\t\t\t\t<span class="EQP_SPAN svelte-13164b6">ATK_DEBUFF</span> \n\t\t\t\t<span class="EQP_SPAN svelte-13164b6">MAGIC</span> \n\t\t\t\t<span class="EQP_SPAN svelte-13164b6">MAGIC_RANGE</span>',Gt=i();for(let t=0;t<zt.length;t+=1)zt[t].c();N(M,"class","WASD_NULL svelte-13164b6"),N(C,"class","WASD svelte-13164b6"),N(I,"class","WASD_NULL svelte-13164b6"),N(B,"class","WASD svelte-13164b6"),N(G,"class","WASD_NULL svelte-13164b6"),N(Y,"class","WASD svelte-13164b6"),N(H,"class","WASD_NULL svelte-13164b6"),N(X,"class","WASD svelte-13164b6"),N(nt,"class","WASD_NULL svelte-13164b6"),N(ft,"href","https://github.com/taroyanaka/game/"),N(e,"class","field svelte-13164b6"),N(Tt,"class","gacha svelte-13164b6")},m(t,l){s(t,e,l),r(e,o),r(e,c),Yt&&Yt.m(e,null),r(e,U),Dt&&Dt.m(e,null),r(e,T),r(e,d),r(d,P),r(d,p),r(e,E),r(e,g);for(let t=0;t<xt.length;t+=1)xt[t]&&xt[t].m(g,null);r(e,h),r(e,m),r(m,M),r(m,b),r(m,C),r(m,L),r(m,I),r(e,v),r(e,R),r(R,B),r(R,K),r(R,G),r(R,O),r(R,Y),r(e,Q),r(e,j),r(j,H),r(j,q),r(j,X),r(j,J),r(j,nt),r(e,et),r(e,lt),r(lt,ot),r(ot,ct),r(ot,rt),r(ot,st),r(ot,Ft),r(ot,ut),r(ot,at);for(let t=0;t<jt.length;t+=1)jt[t]&&jt[t].m(ot,null);r(lt,_t);for(let t=0;t<Ht.length;t+=1)Ht[t]&&Ht[t].m(lt,null);r(e,it),r(e,At),r(e,Nt),r(e,ft),s(t,Ut,l),s(t,Tt,l),r(Tt,dt),r(Tt,Pt),r(Tt,pt),r(Tt,Et),r(Tt,gt),r(Tt,ht),r(Tt,mt),r(Tt,Mt),r(Tt,bt),r(Tt,Ct),r(Tt,Lt),r(Lt,It),r(Lt,vt);for(let t=0;t<Xt.length;t+=1)Xt[t]&&Xt[t].m(Lt,null);r(Tt,Rt),r(Tt,Bt),r(Bt,Kt),r(Bt,Gt);for(let t=0;t<zt.length;t+=1)zt[t]&&zt[t].m(Bt,null);Ot||(kt=[A(C,"click",n[17]),A(B,"click",n[18]),A(Y,"click",n[19]),A(X,"click",n[20]),A(dt,"click",n[12])],Ot=!0)},p(t,n){if(t[7]?Yt||(Yt=x(),Yt.c(),Yt.m(e,U)):Yt&&(Yt.d(1),Yt=null),t[8]?Dt?Dt.p(t,n):(Dt=w(t),Dt.c(),Dt.m(e,T)):Dt&&(Dt.d(1),Dt=null),64&n[0]&&f(p,t[6]),8704&n[0]){let e;for(Qt=t[9],e=0;e<Qt.length;e+=1){const l=D(t,Qt,e);xt[e]?xt[e].p(l,n):(xt[e]=W(l),xt[e].c(),xt[e].m(g,null))}for(;e<xt.length;e+=1)xt[e].d(1);xt.length=Qt.length}if(1&n[0]&&St!==(St=t[0][0].NAME+"")&&f(ct,St),1&n[0]&&yt!==(yt=t[0][0].LFP+"")&&f(st,yt),1&n[0]&&$t!==($t=t[0][0].ATK+"")&&f(ut,$t),16385&n[0]){let e;for(wt=t[0][0].EQP,e=0;e<wt.length;e+=1){const l=$(t,wt,e);jt[e]?jt[e].p(l,n):(jt[e]=V(l),jt[e].c(),jt[e].m(ot,null))}for(;e<jt.length;e+=1)jt[e].d(1);jt.length=wt.length}if(2&n[0]){let e;for(Wt=Object.keys(t[1]),e=0;e<Wt.length;e+=1){const l=y(t,Wt,e);Ht[e]?Ht[e].p(l,n):(Ht[e]=z(l),Ht[e].c(),Ht[e].m(lt,null))}for(;e<Ht.length;e+=1)Ht[e].d(1);Ht.length=Wt.length}if(4&n[0]&&f(gt,t[2]),16&n[0]&&f(mt,t[4]),32&n[0]&&f(bt,t[5]),1033&n[0]){let e;for(qt=t[3],e=0;e<qt.length;e+=1){const l=S(t,qt,e);Xt[e]?Xt[e].p(l,n):(Xt[e]=Z(l),Xt[e].c(),Xt[e].m(Lt,null))}for(;e<Xt.length;e+=1)Xt[e].d(1);Xt.length=qt.length}if(2048&n[0]){let e;for(Vt=t[11],e=0;e<Vt.length;e+=1){const l=k(t,Vt,e);zt[e]?zt[e].p(l,n):(zt[e]=tt(l),zt[e].c(),zt[e].m(Bt,null))}for(;e<zt.length;e+=1)zt[e].d(1);zt.length=Vt.length}},i:t,o:t,d(t){t&&F(e),Yt&&Yt.d(),Dt&&Dt.d(),u(xt,t),u(jt,t),u(Ht,t),t&&F(Ut),t&&F(Tt),u(Xt,t),u(zt,t),Ot=!1,l(kt)}}}function et(t,n,e){const l=[{NAME:"USR",LFP:100,ATK:1,EQP:[{RARITY:3,LFP_BUFF:0,LFP_DEBUFF:0,ATK_BUFF:4,ATK_DEBUFF:0,MAGIC:[{MAGIC_COUNT:0},[[0,0,0],[0,"U",0],[0,0,0]]]},{RARITY:2,LFP_BUFF:0,LFP_DEBUFF:0,ATK_BUFF:0,ATK_DEBUFF:0,MAGIC:[{MAGIC_COUNT:1},[[0,1,0],[1,"U",1],[0,1,0]]]},{RARITY:3,LFP_BUFF:0,LFP_DEBUFF:0,ATK_BUFF:0,ATK_DEBUFF:0,MAGIC:[{MAGIC_COUNT:1},[[1,1,1,1,1],[1,0,0,0,1],[1,0,"U",0,1],[1,0,0,0,1],[1,1,1,1,1]]]}]}];let o=R.clone(l);const c=(t,n,l)=>{o[0].EQP.length>=l||e(0,o[0].EQP=R.append(n,o[0].EQP),o)};let r={},s=1e3,F=[],u=!1,a=0;let _=[{RARITY:0,LFP_BUFF:0,LFP_DEBUFF:0,ATK_BUFF:1,ATK_DEBUFF:0,MAGIC:R.clone([{MAGIC_COUNT:0},[[0,0,0],[0,"U",0],[0,0,0]]])},{RARITY:1,LFP_BUFF:0,LFP_DEBUFF:0,ATK_BUFF:2,ATK_DEBUFF:0,MAGIC:R.clone([{MAGIC_COUNT:0},[[0,0,0],[0,"U",0],[0,0,0]]])},{RARITY:2,LFP_BUFF:0,LFP_DEBUFF:0,ATK_BUFF:3,ATK_DEBUFF:0,MAGIC:R.clone([{MAGIC_COUNT:0},[[0,0,0],[0,"U",0],[0,0,0]]])},{RARITY:3,LFP_BUFF:0,LFP_DEBUFF:0,ATK_BUFF:4,ATK_DEBUFF:0,MAGIC:R.clone([{MAGIC_COUNT:0},[[0,0,0],[0,"U",0],[0,0,0]]])},{RARITY:90,LFP_BUFF:0,LFP_DEBUFF:0,ATK_BUFF:10,ATK_DEBUFF:0,MAGIC:R.clone([{MAGIC_COUNT:0},[[0,0,0],[0,"U",0],[0,0,0]]])},{RARITY:2,LFP_BUFF:0,LFP_DEBUFF:0,ATK_BUFF:0,ATK_DEBUFF:0,MAGIC:[{MAGIC_COUNT:1},[[0,1,0],[1,"U",1],[0,1,0]]]},{RARITY:3,LFP_BUFF:0,LFP_DEBUFF:0,ATK_BUFF:0,ATK_DEBUFF:0,MAGIC:[{MAGIC_COUNT:1},[[1,1,1,1,1],[1,0,0,0,1],[1,0,"U",0,1],[1,0,0,0,1],[1,1,1,1,1]]]}],i=[5,5],A=0,N=!1,f="",U=[],T=[],P=_.reduce(((t,n)=>{n.RARITY;const e=90===n.RARITY?1:0===n.RARITY?80:n.RARITY;for(let l=0;l<e;l++)t.push(n);return t}),[]),p=shuffle(P);shuffle(P.slice(0,100));const E=()=>{const t=u?((t,n)=>{const e=p.filter((n=>n.RARITY===t)),l=e.slice(0,e.length-e.length*(n/100)),o=p.filter((n=>n.RARITY!==t)),c=l.concat(o);return shuffle(c)})(0,90):p,n=shuffle(t)[0];s<1||(e(2,s-=1),e(3,F=R.append(n,F)),F.slice(-shuffle([2,3])[0]).every((t=>t.RARITY>=1))&&e(4,u=!0),!0===u&&(e(5,a+=1),e(4,u=!(a>=30)),e(5,a=a>=30?0:a)))};document.addEventListener("keypress",(function(t){E(),t.key}));const g=(t,n)=>{i=[t,n];const e=[[n,n-1],[n,n+1],[n-1,n],[n+1,n]];return U=e,console.log(i[0],i[1],U),e},h=(t,n)=>{e(9,T[t][n][2]="NON",T),e(9,T[t][n][3]="background-color: #FFFFFF",T)},m=({Y_X_Ary:t=[5,5],ms:n=200,Original_Color:l="#0000FF",Color_0:o="#0000FF",Color_1:c="#FFFFFF"})=>{const[r,s]=t,F=()=>e(9,T[r][s][3]=`background-color: ${o}`,T),u=()=>e(9,T[r][s][3]=`background-color: ${c}`,T);((t,n,e)=>{const l=t/1e3,o=(new Date).getTime();let c=0;const r=setInterval((()=>{((new Date).getTime()-o)/1e3>=l?clearInterval(r):c++%2==0?F():u()}),10)})(n),setTimeout((()=>{e(9,T[r][s][3]=`background-color: ${l}`,T)}),n)};function M(t){const n={w:[-1,0],a:[0,-1],s:[1,0],d:[0,1],m:null};if(t.Magic)return l=t.Eqp_I,e(0,o[0].EQP[l].MAGIC[0].MAGIC_COUNT-=1,o),(t=>{try{(t=>{const n=t.map((t=>t.map(((n,e)=>"U"===n?[e,t.indexOf(n)]:null)))).flat().filter(((t,n)=>null!==t))[0];return t.map(((t,n)=>t.map(((t,e)=>1===t?[n,e]:null)))).flat().filter((t=>null!==t)).map((t=>[t[0]-n[0],t[1]-n[1]]))})(t).forEach((t=>{const n=i[0]+t[0],l=i[1]+t[1];if(console.log(n,l),console.log(T[n][l][2]),"GOL"===T[n][l][2]||"BLC"===T[n][l][2]||"NON"===T[n][l][2]||"USR"===T[n][l][2])return;const c="UNT_NUM_"+Number(T[n][l][2].NAME.replaceAll("UNT_","")).toString(),s=o[0].EQP.reduce(((t,n)=>t+n.ATK_BUFF),0)||0,F=o[0].ATK+s;if(e(1,r[c].LFP-=F,r),r[c].LFP<=0){const t=[n,l];h(t[0],t[1]),e(9,T[t[0]][t[1]][3]="background-color: #FFFFFF",T),e(1,r=R.omit([c],r))}}))}catch(t){console.log(t)}})(t.Magic[1]),void Object.entries(r).map(((t,n)=>{C(t[1].NAME)}));var l;const c=[i[0]+n[t.key][0],i[1]+n[t.key][1]];if("BLC"===T[c[0]][c[1]][2]&&(e(6,A+=1),h(c[0],c[1])),"USR"!==T[c[0]][c[1]][2]){if("GOL"===T[c[0]][c[1]][2]&&(e(7,N=!0),document.removeEventListener("keypress",M),setTimeout((()=>{I({when_mounted_time:!1})}),1e3)),!t.Magic){(()=>{"NON"===T[c[0]][c[1]][2]&&(e(9,T[c[0]][c[1]][2]="USR",T),e(9,T[i[0]][i[1]][2]="NON",T),e(9,T[c[0]][c[1]][3]="background-color: #0000FF",T),e(9,T[i[0]][i[1]][3]="background-color: #FFFFFF",T),i=c)})(),((t,n)=>{if("object"!==T[t][n][2]&&"UNT"!==T[t][n][2].TYPE)return;m({Y_X_Ary:[t,n],ms:200,Original_Color:"#00FF00",Color_0:"#FF0000",Color_1:"#FFFFFF"});const l="UNT_NUM_"+Number(T[t][n][2].NAME.replaceAll("UNT_","")).toString(),c=o[0].EQP.reduce(((t,n)=>t+n.ATK_BUFF),0)||0,s=o[0].ATK+c;if(e(1,r[l].LFP-=s,r),r[l].LFP<=0){const o=[t,n];h(o[0],o[1]),e(9,T[o[0]][o[1]][3]="background-color: #FFFFFF",T),e(1,r=R.omit([l],r))}})(c[0],c[1])}Object.entries(r).map(((t,n)=>{C(t[1].NAME)}))}}const b=()=>T.map((t=>t.filter((t=>"USR"===t[2])))).filter((t=>t.length>0))[0][0],C=t=>{try{const n=t?Number(t.replaceAll("UNT_","")):0,l=b(),c=((t=0)=>{try{const n=t.toString(),e=(t.toString(),T.map(((t,n)=>t.map(((t,e)=>"object"==typeof t[2]?[t[2].NAME.replaceAll("UNT_",""),[n,e]]:null)))).flat().filter((t=>null!==t)).filter((t=>t[0]===n))[0][1]),[l,o]=e;return[l,o]}catch(t){console.log(t)}})(n);if(c[1]===l[1]&&c[0]===l[0]-1||c[1]===l[1]&&c[0]===l[0]+1||c[0]===l[0]&&c[0]===l[1]-1||c[0]===l[0]&&c[0]===l[1]+1)return void(t=>{m({Y_X_Ary:[b()[0],b()[1]],ms:200,Original_Color:"#0000FF",Color_0:"#FF0000",Color_1:"#FFFFFF"});const n="UNT_NUM_"+t.toString(),l=r[n].ATK;e(0,o[0].LFP-=l,o),o[0].LFP<=0&&(e(8,f="YOU DIED, GAME OVER"),setTimeout((()=>{I({when_mounted_time:!1})}),1e3))})(n);Math.floor(4*Math.random());const s=[[c[0],c[1]-1],[c[0],c[1]+1],[c[0]-1,c[1]],[c[0]+1,c[1]]];let F=shuffle(s);for(let t=0;t<F.length;t++){let l=F[t];"NON"===T[l[0]][l[1]][2]&&(h(c[0],c[1]),e(9,T[c[0]][c[1]][3]="background-color: #FFFFFF",T),e(9,T[l[0]][l[1]][2]=r["UNT_NUM_"+n],T),e(9,T[l[0]][l[1]][3]="background-color: #00FF00",T),F=[])}}catch(t){}},L=()=>{(()=>{let t=T.map((t=>t.filter((t=>"NON"===t[2])))).flat().map((t=>t.slice(0,2)));Object.entries(r).forEach(((n,l)=>{const o="UNT_NUM_"+l.toString(),c=shuffle(t)[0];t=t.filter((t=>t!==c)),e(9,T[c[0]][c[1]][2]=r[o],T),e(9,T[c[0]][c[1]][3]="background-color: #00FF00",T)}))})()},I=({when_mounted_time:t=!0})=>{if(!1===t){if(!confirm("Again？"))return;I({when_mounted_time:!0})}var n,c;e(9,T=R.xprod(R.range(0,10),R.range(0,10)).map((t=>t.concat(["BLC"]))).map((t=>t.concat(["background-color: #808080"])))),e(9,T=R.splitEvery(10,T)),e(9,T[5][5][2]="USR",T),e(9,T[5][5][3]="background-color: #0000FF",T),e(8,f=""),!1===t&&e(0,o=R.clone(l)),e(1,r={UNT_NUM_0:{TYPE:"UNT",NAME:"UNT_0",LFP:3,ATK:1},UNT_NUM_1:{TYPE:"UNT",NAME:"UNT_1",LFP:2,ATK:2},UNT_NUM_2:{TYPE:"UNT",NAME:"UNT_2",LFP:2,ATK:3},UNT_NUM_3:{TYPE:"UNT",NAME:"UNT_3",LFP:2,ATK:4},UNT_NUM_4:{TYPE:"UNT",NAME:"UNT_4",LFP:4,ATK:1},UNT_NUM_5:{TYPE:"UNT",NAME:"UNT_5",LFP:4,ATK:2},UNT_NUM_6:{TYPE:"UNT",NAME:"UNT_6",LFP:5,ATK:1},UNT_NUM_7:{TYPE:"UNT",NAME:"UNT_7",LFP:5,ATK:2},UNT_NUM_8:{TYPE:"UNT",NAME:"UNT_8",LFP:5,ATK:3},UNT_NUM_9:{TYPE:"UNT",NAME:"UNT_9",LFP:5,ATK:4},UNT_NUM_10:{TYPE:"UNT",NAME:"UNT_10",LFP:6,ATK:1},UNT_NUM_11:{TYPE:"UNT",NAME:"UNT_11",LFP:6,ATK:2},UNT_NUM_12:{TYPE:"UNT",NAME:"UNT_12",LFP:6,ATK:3},UNT_NUM_13:{TYPE:"UNT",NAME:"UNT_13",LFP:6,ATK:4},UNT_NUM_14:{TYPE:"UNT",NAME:"UNT_14",LFP:1,ATK:1},UNT_NUM_15:{TYPE:"UNT",NAME:"UNT_15",LFP:1,ATK:2},UNT_NUM_16:{TYPE:"UNT",NAME:"UNT_16",LFP:1,ATK:3}}),c=9,e(9,T[n=0][c][2]="GOL",T),e(9,T[n][c][3]="background-color: #FFFF00",T),e(6,A=0),e(7,N=!1),U=[],i=[5,5],((t=80)=>{const n=T.map((t=>t.filter((t=>"BLC"===t[2])))).flat().length,e=Math.floor(n*(t/100));for(let t=0;t<e;t++){const t=[shuffle([0,1,2,3,4,5,6,7,8,9])[0],shuffle([0,1,2,3,4,5,6,7,8,9])[0]];"USR"!==T[t[0]][t[1]][2]&&"GOL"!==T[t[0]][t[1]][2]&&h(t[0],t[1])}})(),e(9,T[5][4][2]="NON",T),e(9,T[5][4][3]="background-color: #FFFFFF",T),e(9,T[5][6][2]="NON",T),e(9,T[5][6][3]="background-color: #FFFFFF",T),e(9,T[4][5][2]="NON",T),e(9,T[4][5][3]="background-color: #FFFFFF",T),e(9,T[6][5][2]="NON",T),e(9,T[6][5][3]="background-color: #FFFFFF",T),e(9,T[5][3][2]="NON",T),e(9,T[5][3][3]="background-color: #FFFFFF",T),e(9,T[5][7][2]="NON",T),e(9,T[5][7][3]="background-color: #FFFFFF",T),e(9,T[3][5][2]="NON",T),e(9,T[3][5][3]="background-color: #FFFFFF",T),e(9,T[7][5][2]="NON",T),e(9,T[7][5][3]="background-color: #FFFFFF",T),L(),document.addEventListener("keypress",M)};d((async()=>{try{I({when_mounted_time:!0})}catch(t){console.log(t)}}));return[o,r,s,F,u,a,A,N,f,T,c,p,E,g,M,(t,n)=>g(t,n),(t,n)=>g(t,n),()=>M({key:"w"}),()=>M({key:"a"}),()=>M({key:"d"}),()=>M({key:"s"}),(t,n)=>M({key:"m",Magic:t.MAGIC,Eqp_I:n}),t=>c(o[0].NAME,t,10)]}return new class extends O{constructor(t){super(),G(this,t,et,nt,c,{},null,[-1,-1,-1])}}({target:document.body})}();
//# sourceMappingURL=bundle.js.map
