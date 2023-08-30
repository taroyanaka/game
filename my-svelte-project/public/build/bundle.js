var app=function(){"use strict";function t(){}function e(t){return t()}function n(){return Object.create(null)}function l(t){t.forEach(e)}function o(t){return"function"==typeof t}function c(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}function r(t,e){t.appendChild(e)}function s(t,e,n){t.insertBefore(e,n||null)}function F(t){t.parentNode&&t.parentNode.removeChild(t)}function a(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function u(t){return document.createElement(t)}function _(t){return document.createTextNode(t)}function i(){return _(" ")}function A(t,e,n,l){return t.addEventListener(e,n,l),()=>t.removeEventListener(e,n,l)}function f(t,e,n){null==n?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function N(t,e){e=""+e,t.data!==e&&(t.data=e)}let U;function T(t){U=t}function d(t){(function(){if(!U)throw new Error("Function called outside component initialization");return U})().$$.on_mount.push(t)}const P=[],p=[];let E=[];const g=[],h=Promise.resolve();let m=!1;function M(t){E.push(t)}const b=new Set;let C=0;function L(){if(0!==C)return;const t=U;do{try{for(;C<P.length;){const t=P[C];C++,T(t),v(t.$$)}}catch(t){throw P.length=0,C=0,t}for(T(null),P.length=0,C=0;p.length;)p.pop()();for(let t=0;t<E.length;t+=1){const e=E[t];b.has(e)||(b.add(e),e())}E.length=0}while(P.length);for(;g.length;)g.pop()();m=!1,b.clear(),T(t)}function v(t){if(null!==t.fragment){t.update(),l(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(M)}}const I=new Set;function B(t,e){const n=t.$$;null!==n.fragment&&(!function(t){const e=[],n=[];E.forEach((l=>-1===t.indexOf(l)?e.push(l):n.push(l))),n.forEach((t=>t())),E=e}(n.after_update),l(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function O(t,e){-1===t.$$.dirty[0]&&(P.push(t),m||(m=!0,h.then(L)),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function K(c,r,s,a,u,_,i,A=[-1]){const f=U;T(c);const N=c.$$={fragment:null,ctx:[],props:_,update:t,not_equal:u,bound:n(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(r.context||(f?f.$$.context:[])),callbacks:n(),dirty:A,skip_bound:!1,root:r.target||f.$$.root};i&&i(N.root);let d=!1;if(N.ctx=s?s(c,r.props||{},((t,e,...n)=>{const l=n.length?n[0]:e;return N.ctx&&u(N.ctx[t],N.ctx[t]=l)&&(!N.skip_bound&&N.bound[t]&&N.bound[t](l),d&&O(c,t)),e})):[],N.update(),d=!0,l(N.before_update),N.fragment=!!a&&a(N.ctx),r.target){if(r.hydrate){const t=function(t){return Array.from(t.childNodes)}(r.target);N.fragment&&N.fragment.l(t),t.forEach(F)}else N.fragment&&N.fragment.c();r.intro&&((P=c.$$.fragment)&&P.i&&(I.delete(P),P.i(p))),function(t,n,c,r){const{fragment:s,after_update:F}=t.$$;s&&s.m(n,c),r||M((()=>{const n=t.$$.on_mount.map(e).filter(o);t.$$.on_destroy?t.$$.on_destroy.push(...n):l(n),t.$$.on_mount=[]})),F.forEach(M)}(c,r.target,r.anchor,r.customElement),L()}var P,p;T(f)}class G{$destroy(){B(this,1),this.$destroy=t}$on(e,n){if(!o(n))return t;const l=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return l.push(n),()=>{const t=l.indexOf(n);-1!==t&&l.splice(t,1)}}$set(t){var e;this.$$set&&(e=t,0!==Object.keys(e).length)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}function S(t,e,n){const l=t.slice();return l[53]=e[n],l[55]=n,l}function k(t,e,n){const l=t.slice();return l[53]=e[n],l[55]=n,l}function y(t,e,n){const l=t.slice();return l[57]=e[n],l[59]=n,l}function D(t,e,n){const l=t.slice();return l[53]=e[n],l[55]=n,l}function $(t,e,n){const l=t.slice();return l[61]=e[n],l[63]=n,l}function Y(t,e,n){const l=t.slice();return l[64]=e[n],l[66]=n,l}function x(t,e,n){const l=t.slice();return l[67]=e[n],l[69]=n,l}function Q(t){let e;return{c(){e=u("div"),e.textContent="GOAL"},m(t,n){s(t,e,n)},d(t){t&&F(e)}}}function w(t){let e,n;return{c(){e=u("div"),n=_(t[9])},m(t,l){s(t,e,l),r(e,n)},p(t,e){512&e[0]&&N(n,t[9])},d(t){t&&F(e)}}}function W(t){let e,n,o,c,a;function i(){return t[19](t[66],t[69])}function N(){return t[20](t[66],t[69])}return{c(){e=u("span"),n=_("□"),f(e,"style",o=t[67][3])},m(t,l){s(t,e,l),r(e,n),c||(a=[A(e,"keydown",i),A(e,"click",N)],c=!0)},p(n,l){t=n,1024&l[0]&&o!==(o=t[67][3])&&f(e,"style",o)},d(t){t&&F(e),c=!1,l(a)}}}function j(t){let e,n,l=t[64],o=[];for(let e=0;e<l.length;e+=1)o[e]=W(x(t,l,e));return{c(){e=u("li");for(let t=0;t<o.length;t+=1)o[t].c();n=i(),f(e,"class","CELL")},m(t,l){s(t,e,l);for(let t=0;t<o.length;t+=1)o[t]&&o[t].m(e,null);r(e,n)},p(t,c){if(17408&c[0]){let r;for(l=t[64],r=0;r<l.length;r+=1){const s=x(t,l,r);o[r]?o[r].p(s,c):(o[r]=W(s),o[r].c(),o[r].m(e,n))}for(;r<o.length;r+=1)o[r].d(1);o.length=l.length}},d(t){t&&F(e),a(o,t)}}}function H(t){let e,n,l,o,c,A,f,U,T,d,P,p,E,g=t[53].RARITY+"",h=t[53].LFP_BUFF+"",m=t[53].ATK_BUFF+"",M=t[53].MAGIC[0].MAGIC_COUNT+"",b=t[53].MAGIC[0].MAGIC_COUNT>=1&&q(t),C=t[53].MAGIC[1],L=[];for(let e=0;e<C.length;e+=1)L[e]=X($(t,C,e));return{c(){e=u("div"),n=_("RARITY: "),l=_(g),o=_("\n\t\t\t\t\t\t\t\t\t\t\tLFP_BUFF: "),c=_(h),A=_("\n\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\tATK_BUFF: "),f=_(m),U=i(),T=u("div"),b&&b.c(),d=_("\n\t\t\t\t\t\t\t\t\t\t\t\t\tMAGIC_COUNT: "),P=_(M),p=i();for(let t=0;t<L.length;t+=1)L[t].c();E=i()},m(t,F){s(t,e,F),r(e,n),r(e,l),r(e,o),r(e,c),r(e,A),r(e,f),r(e,U),r(e,T),b&&b.m(T,null),r(T,d),r(T,P),r(T,p);for(let t=0;t<L.length;t+=1)L[t]&&L[t].m(T,null);r(e,E)},p(t,e){if(2&e[0]&&g!==(g=t[53].RARITY+"")&&N(l,g),2&e[0]&&h!==(h=t[53].LFP_BUFF+"")&&N(c,h),2&e[0]&&m!==(m=t[53].ATK_BUFF+"")&&N(f,m),t[53].MAGIC[0].MAGIC_COUNT>=1?b?b.p(t,e):(b=q(t),b.c(),b.m(T,d)):b&&(b.d(1),b=null),2&e[0]&&M!==(M=t[53].MAGIC[0].MAGIC_COUNT+"")&&N(P,M),2&e[0]){let n;for(C=t[53].MAGIC[1],n=0;n<C.length;n+=1){const l=$(t,C,n);L[n]?L[n].p(l,e):(L[n]=X(l),L[n].c(),L[n].m(T,null))}for(;n<L.length;n+=1)L[n].d(1);L.length=C.length}},d(t){t&&F(e),b&&b.d(),a(L,t)}}}function q(t){let e,n,l;function o(){return t[25](t[53],t[55])}return{c(){e=u("button"),e.textContent="MAGIC"},m(t,c){s(t,e,c),n||(l=A(e,"click",o),n=!0)},p(e,n){t=e},d(t){t&&F(e),n=!1,l()}}}function X(t){let e,n,l,o=t[61]+"";return{c(){e=u("div"),n=_(o),l=i()},m(t,o){s(t,e,o),r(e,n),r(e,l)},p(t,e){2&e[0]&&o!==(o=t[61]+"")&&N(n,o)},d(t){t&&F(e)}}}function V(t){let e,n=t[53]&&H(t);return{c(){n&&n.c(),e=_("")},m(t,l){n&&n.m(t,l),s(t,e,l)},p(t,l){t[53]?n?n.p(t,l):(n=H(t),n.c(),n.m(e.parentNode,e)):n&&(n.d(1),n=null)},d(t){n&&n.d(t),t&&F(e)}}}function z(t){let e,n,l,o,c,a,i,A=t[2][t[57]].NAME+"",U=t[2][t[57]].LFP+"",T=t[2][t[57]].ATK+"";return{c(){var r,s,F,N;e=u("div"),n=_(A),l=_(" LFP: "),o=_(U),c=_(" ATK: "),a=_(T),f(e,"id",i=t[2][t[57]].NAME),r=e,s="background-color",null==(F="#FFFFFF")?r.style.removeProperty(s):r.style.setProperty(s,F,N?"important":""),f(e,"class","UNT_BACK")},m(t,F){s(t,e,F),r(e,n),r(e,l),r(e,o),r(e,c),r(e,a)},p(t,l){4&l[0]&&A!==(A=t[2][t[57]].NAME+"")&&N(n,A),4&l[0]&&U!==(U=t[2][t[57]].LFP+"")&&N(o,U),4&l[0]&&T!==(T=t[2][t[57]].ATK+"")&&N(a,T),4&l[0]&&i!==(i=t[2][t[57]].NAME)&&f(e,"id",i)},d(t){t&&F(e)}}}function J(t){let e,n,l,o,c,a,U,T,d,P,p,E,g,h,m,M,b,C,L,v,I,B,R,O,K=t[53].RARITY+"",G=t[53].LFP_BUFF+"",S=t[53].LFP_DEBUFF+"",k=t[53].ATK_BUFF+"",y=t[53].ATK_DEBUFF+"",D=t[53].MAGIC[0].MAGIC_COUNT+"",$=t[53].MAGIC[1]+"";function Y(){return t[26](t[53])}return{c(){e=u("span"),n=_(K),l=i(),o=u("span"),c=_(G),a=i(),U=u("span"),T=_(S),d=i(),P=u("span"),p=_(k),E=i(),g=u("span"),h=_(y),m=i(),M=u("span"),b=_(D),C=i(),L=u("span"),v=_($),I=i(),B=u("button"),B.textContent="set_EQP",f(e,"class","EQP_SPAN svelte-13164b6"),f(o,"class","EQP_SPAN svelte-13164b6"),f(U,"class","EQP_SPAN svelte-13164b6"),f(P,"class","EQP_SPAN svelte-13164b6"),f(g,"class","EQP_SPAN svelte-13164b6"),f(M,"class","EQP_SPAN svelte-13164b6"),f(L,"class","EQP_SPAN svelte-13164b6")},m(t,F){s(t,e,F),r(e,n),s(t,l,F),s(t,o,F),r(o,c),s(t,a,F),s(t,U,F),r(U,T),s(t,d,F),s(t,P,F),r(P,p),s(t,E,F),s(t,g,F),r(g,h),s(t,m,F),s(t,M,F),r(M,b),s(t,C,F),s(t,L,F),r(L,v),s(t,I,F),s(t,B,F),R||(O=A(B,"click",Y),R=!0)},p(e,l){t=e,16&l[0]&&K!==(K=t[53].RARITY+"")&&N(n,K),16&l[0]&&G!==(G=t[53].LFP_BUFF+"")&&N(c,G),16&l[0]&&S!==(S=t[53].LFP_DEBUFF+"")&&N(T,S),16&l[0]&&k!==(k=t[53].ATK_BUFF+"")&&N(p,k),16&l[0]&&y!==(y=t[53].ATK_DEBUFF+"")&&N(h,y),16&l[0]&&D!==(D=t[53].MAGIC[0].MAGIC_COUNT+"")&&N(b,D),16&l[0]&&$!==($=t[53].MAGIC[1]+"")&&N(v,$)},d(t){t&&F(e),t&&F(l),t&&F(o),t&&F(a),t&&F(U),t&&F(d),t&&F(P),t&&F(E),t&&F(g),t&&F(m),t&&F(M),t&&F(C),t&&F(L),t&&F(I),t&&F(B),R=!1,O()}}}function Z(t){let e,n,l=t[53]&&J(t);return{c(){e=u("li"),l&&l.c(),n=i()},m(t,o){s(t,e,o),l&&l.m(e,null),r(e,n)},p(t,o){t[53]?l?l.p(t,o):(l=J(t),l.c(),l.m(e,n)):l&&(l.d(1),l=null)},d(t){t&&F(e),l&&l.d()}}}function tt(e){let n,l,o=e[53]&&function(e){let n,l,o,c,a,A,N,U,T,d,P,p,E,g,h,m,M,b,C,L,v=e[53].RARITY+"",I=e[53].LFP_BUFF+"",B=e[53].LFP_DEBUFF+"",R=e[53].ATK_BUFF+"",O=e[53].ATK_DEBUFF+"",K=e[53].MAGIC[0].MAGIC_COUNT+"",G=e[53].MAGIC[1]+"";return{c(){n=u("span"),l=_(v),o=i(),c=u("span"),a=_(I),A=i(),N=u("span"),U=_(B),T=i(),d=u("span"),P=_(R),p=i(),E=u("span"),g=_(O),h=i(),m=u("span"),M=_(K),b=i(),C=u("span"),L=_(G),f(n,"class","EQP_SPAN svelte-13164b6"),f(c,"class","EQP_SPAN svelte-13164b6"),f(N,"class","EQP_SPAN svelte-13164b6"),f(d,"class","EQP_SPAN svelte-13164b6"),f(E,"class","EQP_SPAN svelte-13164b6"),f(m,"class","EQP_SPAN svelte-13164b6"),f(C,"class","EQP_SPAN svelte-13164b6")},m(t,e){s(t,n,e),r(n,l),s(t,o,e),s(t,c,e),r(c,a),s(t,A,e),s(t,N,e),r(N,U),s(t,T,e),s(t,d,e),r(d,P),s(t,p,e),s(t,E,e),r(E,g),s(t,h,e),s(t,m,e),r(m,M),s(t,b,e),s(t,C,e),r(C,L)},p:t,d(t){t&&F(n),t&&F(o),t&&F(c),t&&F(A),t&&F(N),t&&F(T),t&&F(d),t&&F(p),t&&F(E),t&&F(h),t&&F(m),t&&F(b),t&&F(C)}}}(e);return{c(){n=u("li"),o&&o.c(),l=i()},m(t,e){s(t,n,e),o&&o.m(n,null),r(n,l)},p(t,e){t[53]&&o.p(t,e)},d(t){t&&F(n),o&&o.d()}}}function et(e){let n,o,c,U,T,d,P,p,E,g,h,m,M,b,C,L,v,I,B,R,O,K,G,$,x,W,H,q,X,J,et,nt,lt,ot,ct,rt,st,Ft,at,ut,_t,it,At,ft,Nt,Ut,Tt,dt,Pt,pt,Et,gt,ht,mt,Mt,bt,Ct,Lt,vt,It,Bt,Rt,Ot,Kt,Gt,St,kt,yt,Dt,$t,Yt,xt,Qt,wt,Wt,jt,Ht,qt,Xt,Vt,zt,Jt,Zt=e[1][0].NAME+"",te=e[1][0].LFP+"",ee=e[1][0].ATK+"",ne=e[8]&&Q(),le=e[9]&&w(e),oe=e[10],ce=[];for(let t=0;t<oe.length;t+=1)ce[t]=j(Y(e,oe,t));let re=e[1][0].EQP,se=[];for(let t=0;t<re.length;t+=1)se[t]=V(D(e,re,t));let Fe=Object.keys(e[2]),ae=[];for(let t=0;t<Fe.length;t+=1)ae[t]=z(y(e,Fe,t));let ue=e[4],_e=[];for(let t=0;t<ue.length;t+=1)_e[t]=Z(k(e,ue,t));let ie=e[12],Ae=[];for(let t=0;t<ie.length;t+=1)Ae[t]=tt(S(e,ie,t));return Vt=function(t){let e;return{p(...n){e=n,e.forEach((e=>t.push(e)))},r(){e.forEach((e=>t.splice(t.indexOf(e),1)))}}}(e[17][0]),{c(){n=u("div"),o=u("div"),c=i(),ne&&ne.c(),U=i(),le&&le.c(),T=i(),d=u("div"),P=u("fieldset"),p=u("span"),p.textContent="SHOW_DAMAGE:",E=i(),g=u("span"),h=u("input"),m=i(),M=u("label"),M.textContent="ON",b=i(),C=u("span"),L=u("input"),v=i(),I=u("label"),I.textContent="OFF",B=i(),R=u("div"),O=_("PICKEL: "),K=_(e[7]),G=i(),$=u("ul");for(let t=0;t<ce.length;t+=1)ce[t].c();x=i(),W=u("div"),H=u("button"),H.textContent="◾️",q=i(),X=u("button"),X.textContent="W",J=i(),et=u("button"),et.textContent="◾️",nt=i(),lt=u("div"),ot=u("button"),ot.textContent="A",ct=i(),rt=u("button"),rt.textContent="◾️",st=i(),Ft=u("button"),Ft.textContent="D",at=i(),ut=u("div"),_t=u("button"),_t.textContent="◾️",it=i(),At=u("button"),At.textContent="S",ft=i(),Nt=u("button"),Nt.textContent="◾️",Ut=i(),Tt=u("div"),dt=u("div"),Pt=_(Zt),pt=_("\n\t\t\t\t\t\t\t\t\tLFP: "),Et=_(te),gt=_("\n\t\t\t\t\t\t\t\t\tATK: "),ht=_(ee),mt=i();for(let t=0;t<se.length;t+=1)se[t].c();Mt=i(),bt=u("div");for(let t=0;t<ae.length;t+=1)ae[t].c();Ct=i(),Lt=u("div"),Lt.textContent="Ver 0.0.1.2",vt=i(),It=u("a"),It.textContent="GitHub",Bt=i(),Rt=u("div"),Ot=u("button"),Ot.textContent="slot_exe_once",Kt=i(),Gt=u("div"),Gt.textContent="MINE",St=_("\n\t\tGOLD: "),kt=_(e[3]),yt=_("\n\t\tKAKUHEN: "),Dt=_(e[5]),$t=_("\n\t\tKAKUHEN_COUNTER: "),Yt=_(e[6]),xt=i(),Qt=u("ul"),wt=u("li"),wt.innerHTML='<span class="EQP_SPAN svelte-13164b6">RARITY</span> \n\t\t\t\t<span class="EQP_SPAN svelte-13164b6">LFP_BUFF</span> \n\t\t\t\t<span class="EQP_SPAN svelte-13164b6">LFP_DEBUFF</span> \n\t\t\t\t<span class="EQP_SPAN svelte-13164b6">ATK_BUFF</span> \n\t\t\t\t<span class="EQP_SPAN svelte-13164b6">ATK_DEBUFF</span> \n\t\t\t\t<span class="EQP_SPAN svelte-13164b6">MAGIC</span> \n\t\t\t\t<span class="EQP_SPAN svelte-13164b6">MAGIC_RANGE</span>',Wt=i();for(let t=0;t<_e.length;t+=1)_e[t].c();jt=i(),Ht=u("ul"),qt=u("li"),qt.innerHTML='<span class="EQP_SPAN svelte-13164b6">RARITY</span> \n\t\t\t\t<span class="EQP_SPAN svelte-13164b6">LFP_BUFF</span> \n\t\t\t\t<span class="EQP_SPAN svelte-13164b6">LFP_DEBUFF</span> \n\t\t\t\t<span class="EQP_SPAN svelte-13164b6">ATK_BUFF</span> \n\t\t\t\t<span class="EQP_SPAN svelte-13164b6">ATK_DEBUFF</span> \n\t\t\t\t<span class="EQP_SPAN svelte-13164b6">MAGIC</span> \n\t\t\t\t<span class="EQP_SPAN svelte-13164b6">MAGIC_RANGE</span>',Xt=i();for(let t=0;t<Ae.length;t+=1)Ae[t].c();f(h,"type","radio"),f(h,"id","ON"),f(h,"name","SHOW_DAMAGE"),h.__value="ON",h.value=h.__value,f(M,"for","ON"),f(L,"type","radio"),f(L,"id","OFF"),f(L,"name","SHOW_DAMAGE"),L.__value="OFF",L.value=L.__value,f(I,"for","OFF"),f(H,"class","WASD_NULL svelte-13164b6"),f(X,"class","WASD svelte-13164b6"),f(et,"class","WASD_NULL svelte-13164b6"),f(ot,"class","WASD svelte-13164b6"),f(rt,"class","WASD_NULL svelte-13164b6"),f(Ft,"class","WASD svelte-13164b6"),f(_t,"class","WASD_NULL svelte-13164b6"),f(At,"class","WASD svelte-13164b6"),f(Nt,"class","WASD_NULL svelte-13164b6"),f(It,"href","https://github.com/taroyanaka/game/"),f(n,"class","field svelte-13164b6"),f(Rt,"class","gacha svelte-13164b6"),Vt.p(h,L)},m(t,l){s(t,n,l),r(n,o),r(n,c),ne&&ne.m(n,null),r(n,U),le&&le.m(n,null),r(n,T),r(n,d),r(d,P),r(P,p),r(P,E),r(P,g),r(g,h),h.checked=h.__value===e[0],r(g,m),r(g,M),r(P,b),r(P,C),r(C,L),L.checked=L.__value===e[0],r(C,v),r(C,I),r(n,B),r(n,R),r(R,O),r(R,K),r(n,G),r(n,$);for(let t=0;t<ce.length;t+=1)ce[t]&&ce[t].m($,null);r(n,x),r(n,W),r(W,H),r(W,q),r(W,X),r(W,J),r(W,et),r(n,nt),r(n,lt),r(lt,ot),r(lt,ct),r(lt,rt),r(lt,st),r(lt,Ft),r(n,at),r(n,ut),r(ut,_t),r(ut,it),r(ut,At),r(ut,ft),r(ut,Nt),r(n,Ut),r(n,Tt),r(Tt,dt),r(dt,Pt),r(dt,pt),r(dt,Et),r(dt,gt),r(dt,ht),r(dt,mt);for(let t=0;t<se.length;t+=1)se[t]&&se[t].m(dt,null);r(Tt,Mt),r(Tt,bt);for(let t=0;t<ae.length;t+=1)ae[t]&&ae[t].m(bt,null);r(n,Ct),r(n,Lt),r(n,vt),r(n,It),s(t,Bt,l),s(t,Rt,l),r(Rt,Ot),r(Rt,Kt),r(Rt,Gt),r(Rt,St),r(Rt,kt),r(Rt,yt),r(Rt,Dt),r(Rt,$t),r(Rt,Yt),r(Rt,xt),r(Rt,Qt),r(Qt,wt),r(Qt,Wt);for(let t=0;t<_e.length;t+=1)_e[t]&&_e[t].m(Qt,null);r(Rt,jt),r(Rt,Ht),r(Ht,qt),r(Ht,Xt);for(let t=0;t<Ae.length;t+=1)Ae[t]&&Ae[t].m(Ht,null);zt||(Jt=[A(h,"change",e[16]),A(L,"change",e[18]),A(X,"click",e[21]),A(ot,"click",e[22]),A(Ft,"click",e[23]),A(At,"click",e[24]),A(Ot,"click",e[13])],zt=!0)},p(t,e){if(t[8]?ne||(ne=Q(),ne.c(),ne.m(n,U)):ne&&(ne.d(1),ne=null),t[9]?le?le.p(t,e):(le=w(t),le.c(),le.m(n,T)):le&&(le.d(1),le=null),1&e[0]&&(h.checked=h.__value===t[0]),1&e[0]&&(L.checked=L.__value===t[0]),128&e[0]&&N(K,t[7]),17408&e[0]){let n;for(oe=t[10],n=0;n<oe.length;n+=1){const l=Y(t,oe,n);ce[n]?ce[n].p(l,e):(ce[n]=j(l),ce[n].c(),ce[n].m($,null))}for(;n<ce.length;n+=1)ce[n].d(1);ce.length=oe.length}if(2&e[0]&&Zt!==(Zt=t[1][0].NAME+"")&&N(Pt,Zt),2&e[0]&&te!==(te=t[1][0].LFP+"")&&N(Et,te),2&e[0]&&ee!==(ee=t[1][0].ATK+"")&&N(ht,ee),32770&e[0]){let n;for(re=t[1][0].EQP,n=0;n<re.length;n+=1){const l=D(t,re,n);se[n]?se[n].p(l,e):(se[n]=V(l),se[n].c(),se[n].m(dt,null))}for(;n<se.length;n+=1)se[n].d(1);se.length=re.length}if(4&e[0]){let n;for(Fe=Object.keys(t[2]),n=0;n<Fe.length;n+=1){const l=y(t,Fe,n);ae[n]?ae[n].p(l,e):(ae[n]=z(l),ae[n].c(),ae[n].m(bt,null))}for(;n<ae.length;n+=1)ae[n].d(1);ae.length=Fe.length}if(8&e[0]&&N(kt,t[3]),32&e[0]&&N(Dt,t[5]),64&e[0]&&N(Yt,t[6]),2066&e[0]){let n;for(ue=t[4],n=0;n<ue.length;n+=1){const l=k(t,ue,n);_e[n]?_e[n].p(l,e):(_e[n]=Z(l),_e[n].c(),_e[n].m(Qt,null))}for(;n<_e.length;n+=1)_e[n].d(1);_e.length=ue.length}if(4096&e[0]){let n;for(ie=t[12],n=0;n<ie.length;n+=1){const l=S(t,ie,n);Ae[n]?Ae[n].p(l,e):(Ae[n]=tt(l),Ae[n].c(),Ae[n].m(Ht,null))}for(;n<Ae.length;n+=1)Ae[n].d(1);Ae.length=ie.length}},i:t,o:t,d(t){t&&F(n),ne&&ne.d(),le&&le.d(),a(ce,t),a(se,t),a(ae,t),t&&F(Bt),t&&F(Rt),a(_e,t),a(Ae,t),Vt.r(),zt=!1,l(Jt)}}}function nt(t,e,n){let l="ON";const o=[{NAME:"USR",LFP:100,ATK:1,EQP:[{RARITY:3,LFP_BUFF:0,LFP_DEBUFF:0,ATK_BUFF:4,ATK_DEBUFF:0,MAGIC:[{MAGIC_COUNT:0},[[0,0,0],[0,"U",0],[0,0,0]]]},{RARITY:2,LFP_BUFF:0,LFP_DEBUFF:0,ATK_BUFF:0,ATK_DEBUFF:0,MAGIC:[{MAGIC_COUNT:1},[[0,1,0],[1,"U",1],[0,1,0]]]},{RARITY:3,LFP_BUFF:0,LFP_DEBUFF:0,ATK_BUFF:0,ATK_DEBUFF:0,MAGIC:[{MAGIC_COUNT:1},[[1,1,1,1,1],[1,0,0,0,1],[1,0,"U",0,1],[1,0,0,0,1],[1,1,1,1,1]]]}]}];let c=R.clone(o);const r=(t,e,l)=>{c[0].EQP.length>=l||n(1,c[0].EQP=R.append(e,c[0].EQP),c)};let s={},F=1e3,a=[],u=!1,_=0;let i=[{RARITY:0,LFP_BUFF:0,LFP_DEBUFF:0,ATK_BUFF:1,ATK_DEBUFF:0,MAGIC:R.clone([{MAGIC_COUNT:0},[[0,0,0],[0,"U",0],[0,0,0]]])},{RARITY:1,LFP_BUFF:0,LFP_DEBUFF:0,ATK_BUFF:2,ATK_DEBUFF:0,MAGIC:R.clone([{MAGIC_COUNT:0},[[0,0,0],[0,"U",0],[0,0,0]]])},{RARITY:2,LFP_BUFF:0,LFP_DEBUFF:0,ATK_BUFF:3,ATK_DEBUFF:0,MAGIC:R.clone([{MAGIC_COUNT:0},[[0,0,0],[0,"U",0],[0,0,0]]])},{RARITY:3,LFP_BUFF:0,LFP_DEBUFF:0,ATK_BUFF:4,ATK_DEBUFF:0,MAGIC:R.clone([{MAGIC_COUNT:0},[[0,0,0],[0,"U",0],[0,0,0]]])},{RARITY:90,LFP_BUFF:0,LFP_DEBUFF:0,ATK_BUFF:10,ATK_DEBUFF:0,MAGIC:R.clone([{MAGIC_COUNT:0},[[0,0,0],[0,"U",0],[0,0,0]]])},{RARITY:2,LFP_BUFF:0,LFP_DEBUFF:0,ATK_BUFF:0,ATK_DEBUFF:0,MAGIC:[{MAGIC_COUNT:1},[[0,1,0],[1,"U",1],[0,1,0]]]},{RARITY:3,LFP_BUFF:0,LFP_DEBUFF:0,ATK_BUFF:0,ATK_DEBUFF:0,MAGIC:[{MAGIC_COUNT:1},[[1,1,1,1,1],[1,0,0,0,1],[1,0,"U",0,1],[1,0,0,0,1],[1,1,1,1,1]]]}],A=[5,5],f=0,N=!1,U="",T=[],P=[],p=i.reduce(((t,e)=>{e.RARITY;const n=90===e.RARITY?1:0===e.RARITY?80:e.RARITY;for(let l=0;l<n;l++)t.push(e);return t}),[]),E=shuffle(p);shuffle(p.slice(0,100));const g=()=>{const t=u?((t,e)=>{const n=E.filter((e=>e.RARITY===t)),l=n.slice(0,n.length-n.length*(e/100)),o=E.filter((e=>e.RARITY!==t)),c=l.concat(o);return shuffle(c)})(0,90):E,e=shuffle(t)[0];F<1||(n(3,F-=1),n(4,a=R.append(e,a)),a.slice(-shuffle([2,3])[0]).every((t=>t.RARITY>=1))&&n(5,u=!0),!0===u&&(n(6,_+=1),n(5,u=!(_>=30)),n(6,_=_>=30?0:_)))};document.addEventListener("keypress",(function(t){g(),t.key}));const h=(t,e)=>{A=[t,e];const n=[[e,e-1],[e,e+1],[e-1,e],[e+1,e]];return T=n,console.log(A[0],A[1],T),n},m=(t,e)=>{n(10,P[t][e][2]="NON",P),n(10,P[t][e][3]="background-color: #FFFFFF",P)},M=({Before_LFP:t=0,After_LFP:e=0,Damage:n=0})=>{"ON"===l&&alert("Before_LFP: "+t.toString()+" Damage: "+n.toString()+" After_LFP: "+e.toString()+" ")},b=({Y_X_Ary:t=[5,5],ms:e=200,Original_Color:l="#0000FF",Color_0:o="#0000FF",Color_1:c="#FFFFFF"})=>{const[r,s]=t,F=t=>{P[r][s][2]},a=()=>{n(10,P[r][s][3]=`background-color: ${o}`,P),F()},u=()=>{n(10,P[r][s][3]=`background-color: ${c}`,P),F()};((t,e,n)=>{const l=t/1e3,o=(new Date).getTime();let c=0;const r=setInterval((()=>{((new Date).getTime()-o)/1e3>=l?clearInterval(r):c++%2==0?a():u()}),10)})(e),setTimeout((()=>{n(10,P[r][s][3]=`background-color: ${l}`,P),F()}),e)};function C(t){const e={w:[-1,0],a:[0,-1],s:[1,0],d:[0,1],m:null};if(t.Magic)return l=t.Eqp_I,n(1,c[0].EQP[l].MAGIC[0].MAGIC_COUNT-=1,c),(t=>{try{(t=>{const e=t.map((t=>t.map(((e,n)=>"U"===e?[n,t.indexOf(e)]:null)))).flat().filter(((t,e)=>null!==t))[0];return t.map(((t,e)=>t.map(((t,n)=>1===t?[e,n]:null)))).flat().filter((t=>null!==t)).map((t=>[t[0]-e[0],t[1]-e[1]]))})(t).forEach((t=>{const e=A[0]+t[0],l=A[1]+t[1];if(console.log(e,l),console.log(P[e][l][2]),"GOL"===P[e][l][2]||"BLC"===P[e][l][2]||"NON"===P[e][l][2]||"USR"===P[e][l][2])return;const o="UNT_NUM_"+Number(P[e][l][2].NAME.replaceAll("UNT_","")).toString(),r=c[0].EQP.reduce(((t,e)=>t+e.ATK_BUFF),0)||0,F=c[0].ATK+r;if(n(2,s[o].LFP-=F,s),s[o].LFP<=0){const t=[e,l];m(t[0],t[1]),n(10,P[t[0]][t[1]][3]="background-color: #FFFFFF",P),n(2,s=R.omit([o],s))}}))}catch(t){console.log(t)}})(t.Magic[1]),void Object.entries(s).map(((t,e)=>{v(t[1].NAME)}));var l;const o=[A[0]+e[t.key][0],A[1]+e[t.key][1]];if("BLC"===P[o[0]][o[1]][2]&&(n(7,f+=1),m(o[0],o[1])),"USR"!==P[o[0]][o[1]][2]){if("GOL"===P[o[0]][o[1]][2]&&(n(8,N=!0),document.removeEventListener("keypress",C),setTimeout((()=>{B({when_mounted_time:!1})}),1e3)),!t.Magic){(()=>{"NON"===P[o[0]][o[1]][2]&&(n(10,P[o[0]][o[1]][2]="USR",P),n(10,P[A[0]][A[1]][2]="NON",P),n(10,P[o[0]][o[1]][3]="background-color: #0000FF",P),n(10,P[A[0]][A[1]][3]="background-color: #FFFFFF",P),A=o)})(),((t,e)=>{if("object"!==P[t][e][2]&&"UNT"!==P[t][e][2].TYPE)return;const l="UNT_NUM_"+Number(P[t][e][2].NAME.replaceAll("UNT_","")).toString(),o=c[0].EQP.reduce(((t,e)=>t+e.ATK_BUFF),0)||0,r=c[0].ATK+o;if(M({Before_LFP:s[l].LFP,After_LFP:s[l].LFP-r,Damage:r}),n(2,s[l].LFP-=r,s),b({Y_X_Ary:[t,e],ms:200,Original_Color:"#00FF00",Color_0:"#FF0000",Color_1:"#FFFFFF"}),s[l].LFP<=0){const o=[t,e];m(o[0],o[1]),n(10,P[o[0]][o[1]][3]="background-color: #FFFFFF",P),n(2,s=R.omit([l],s))}})(o[0],o[1])}Object.entries(s).map(((t,e)=>{v(t[1].NAME)}))}}const L=()=>P.map((t=>t.filter((t=>"USR"===t[2])))).filter((t=>t.length>0))[0][0],v=t=>{try{const e=t?Number(t.replaceAll("UNT_","")):0,l=L(),o=((t=0)=>{try{const e=t.toString(),n=(t.toString(),P.map(((t,e)=>t.map(((t,n)=>"object"==typeof t[2]?[t[2].NAME.replaceAll("UNT_",""),[e,n]]:null)))).flat().filter((t=>null!==t)).filter((t=>t[0]===e))[0][1]),[l,o]=n;return[l,o]}catch(t){console.log(t)}})(e);if(o[1]===l[1]&&o[0]===l[0]-1||o[1]===l[1]&&o[0]===l[0]+1||o[0]===l[0]&&o[0]===l[1]-1||o[0]===l[0]&&o[0]===l[1]+1)return void(t=>{b({Y_X_Ary:[L()[0],L()[1]],ms:200,Original_Color:"#0000FF",Color_0:"#FF0000",Color_1:"#FFFFFF"});const e="UNT_NUM_"+t.toString(),l=s[e].ATK;M({Before_LFP:c[0].LFP,After_LFP:c[0].LFP-l,Damage:l}),n(1,c[0].LFP-=l,c),c[0].LFP<=0&&(n(9,U="YOU DIED, GAME OVER"),setTimeout((()=>{B({when_mounted_time:!1})}),1e3))})(e);Math.floor(4*Math.random());const r=[[o[0],o[1]-1],[o[0],o[1]+1],[o[0]-1,o[1]],[o[0]+1,o[1]]];let F=shuffle(r);for(let t=0;t<F.length;t++){let l=F[t];"NON"===P[l[0]][l[1]][2]&&(m(o[0],o[1]),n(10,P[o[0]][o[1]][3]="background-color: #FFFFFF",P),n(10,P[l[0]][l[1]][2]=s["UNT_NUM_"+e],P),n(10,P[l[0]][l[1]][3]="background-color: #00FF00",P),F=[])}}catch(t){}},I=()=>{(()=>{let t=P.map((t=>t.filter((t=>"NON"===t[2])))).flat().map((t=>t.slice(0,2)));Object.entries(s).forEach(((e,l)=>{const o="UNT_NUM_"+l.toString(),c=shuffle(t)[0];t=t.filter((t=>t!==c)),n(10,P[c[0]][c[1]][2]=s[o],P),n(10,P[c[0]][c[1]][3]="background-color: #00FF00",P)}))})()},B=({when_mounted_time:t=!0})=>{if(!1===t){if(!confirm("Again？"))return;B({when_mounted_time:!0})}var e,l;n(10,P=R.xprod(R.range(0,10),R.range(0,10)).map((t=>t.concat(["BLC"]))).map((t=>t.concat(["background-color: #808080"])))),n(10,P=R.splitEvery(10,P)),n(10,P[5][5][2]="USR",P),n(10,P[5][5][3]="background-color: #0000FF",P),n(9,U=""),!1===t&&n(1,c=R.clone(o)),n(2,s={UNT_NUM_0:{TYPE:"UNT",NAME:"UNT_0",LFP:3,ATK:1},UNT_NUM_1:{TYPE:"UNT",NAME:"UNT_1",LFP:2,ATK:2},UNT_NUM_2:{TYPE:"UNT",NAME:"UNT_2",LFP:2,ATK:3},UNT_NUM_3:{TYPE:"UNT",NAME:"UNT_3",LFP:2,ATK:4},UNT_NUM_4:{TYPE:"UNT",NAME:"UNT_4",LFP:4,ATK:1},UNT_NUM_5:{TYPE:"UNT",NAME:"UNT_5",LFP:4,ATK:2},UNT_NUM_6:{TYPE:"UNT",NAME:"UNT_6",LFP:5,ATK:1},UNT_NUM_7:{TYPE:"UNT",NAME:"UNT_7",LFP:5,ATK:2},UNT_NUM_8:{TYPE:"UNT",NAME:"UNT_8",LFP:5,ATK:3},UNT_NUM_9:{TYPE:"UNT",NAME:"UNT_9",LFP:5,ATK:4},UNT_NUM_10:{TYPE:"UNT",NAME:"UNT_10",LFP:6,ATK:1},UNT_NUM_11:{TYPE:"UNT",NAME:"UNT_11",LFP:6,ATK:2},UNT_NUM_12:{TYPE:"UNT",NAME:"UNT_12",LFP:6,ATK:3},UNT_NUM_13:{TYPE:"UNT",NAME:"UNT_13",LFP:6,ATK:4},UNT_NUM_14:{TYPE:"UNT",NAME:"UNT_14",LFP:1,ATK:1},UNT_NUM_15:{TYPE:"UNT",NAME:"UNT_15",LFP:1,ATK:2},UNT_NUM_16:{TYPE:"UNT",NAME:"UNT_16",LFP:1,ATK:3}}),l=9,n(10,P[e=0][l][2]="GOL",P),n(10,P[e][l][3]="background-color: #FFFF00",P),n(7,f=0),n(8,N=!1),T=[],A=[5,5],((t=80)=>{const e=P.map((t=>t.filter((t=>"BLC"===t[2])))).flat().length,n=Math.floor(e*(t/100));for(let t=0;t<n;t++){const t=[shuffle([0,1,2,3,4,5,6,7,8,9])[0],shuffle([0,1,2,3,4,5,6,7,8,9])[0]];"USR"!==P[t[0]][t[1]][2]&&"GOL"!==P[t[0]][t[1]][2]&&m(t[0],t[1])}})(),n(10,P[5][4][2]="NON",P),n(10,P[5][4][3]="background-color: #FFFFFF",P),n(10,P[5][6][2]="NON",P),n(10,P[5][6][3]="background-color: #FFFFFF",P),n(10,P[4][5][2]="NON",P),n(10,P[4][5][3]="background-color: #FFFFFF",P),n(10,P[6][5][2]="NON",P),n(10,P[6][5][3]="background-color: #FFFFFF",P),n(10,P[5][3][2]="NON",P),n(10,P[5][3][3]="background-color: #FFFFFF",P),n(10,P[5][7][2]="NON",P),n(10,P[5][7][3]="background-color: #FFFFFF",P),n(10,P[3][5][2]="NON",P),n(10,P[3][5][3]="background-color: #FFFFFF",P),n(10,P[7][5][2]="NON",P),n(10,P[7][5][3]="background-color: #FFFFFF",P),I(),document.addEventListener("keypress",C)};d((async()=>{try{B({when_mounted_time:!0})}catch(t){console.log(t)}}));return[l,c,s,F,a,u,_,f,N,U,P,r,E,g,h,C,function(){l=this.__value,n(0,l)},[[]],function(){l=this.__value,n(0,l)},(t,e)=>h(t,e),(t,e)=>h(t,e),()=>C({key:"w"}),()=>C({key:"a"}),()=>C({key:"d"}),()=>C({key:"s"}),(t,e)=>C({key:"m",Magic:t.MAGIC,Eqp_I:e}),t=>r(c[0].NAME,t,10)]}return new class extends G{constructor(t){super(),K(this,t,nt,et,c,{},null,[-1,-1,-1])}}({target:document.body})}();
//# sourceMappingURL=bundle.js.map
