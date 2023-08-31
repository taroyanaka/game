var app=function(){"use strict";function t(){}function e(t){return t()}function n(){return Object.create(null)}function l(t){t.forEach(e)}function o(t){return"function"==typeof t}function r(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}function c(t,e){t.appendChild(e)}function s(t,e,n){t.insertBefore(e,n||null)}function F(t){t.parentNode&&t.parentNode.removeChild(t)}function a(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function _(t){return document.createElement(t)}function u(t){return document.createTextNode(t)}function i(){return u(" ")}function A(t,e,n,l){return t.addEventListener(e,n,l),()=>t.removeEventListener(e,n,l)}function f(t,e,n){null==n?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function N(t,e){e=""+e,t.data!==e&&(t.data=e)}let T;function U(t){T=t}function d(t){(function(){if(!T)throw new Error("Function called outside component initialization");return T})().$$.on_mount.push(t)}const P=[],p=[];let E=[];const g=[],h=Promise.resolve();let m=!1;function M(t){E.push(t)}const b=new Set;let L=0;function C(){if(0!==L)return;const t=T;do{try{for(;L<P.length;){const t=P[L];L++,U(t),v(t.$$)}}catch(t){throw P.length=0,L=0,t}for(U(null),P.length=0,L=0;p.length;)p.pop()();for(let t=0;t<E.length;t+=1){const e=E[t];b.has(e)||(b.add(e),e())}E.length=0}while(P.length);for(;g.length;)g.pop()();m=!1,b.clear(),U(t)}function v(t){if(null!==t.fragment){t.update(),l(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(M)}}const I=new Set;function B(t,e){const n=t.$$;null!==n.fragment&&(!function(t){const e=[],n=[];E.forEach((l=>-1===t.indexOf(l)?e.push(l):n.push(l))),n.forEach((t=>t())),E=e}(n.after_update),l(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function K(t,e){-1===t.$$.dirty[0]&&(P.push(t),m||(m=!0,h.then(C)),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function O(r,c,s,a,_,u,i,A=[-1]){const f=T;U(r);const N=r.$$={fragment:null,ctx:[],props:u,update:t,not_equal:_,bound:n(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(c.context||(f?f.$$.context:[])),callbacks:n(),dirty:A,skip_bound:!1,root:c.target||f.$$.root};i&&i(N.root);let d=!1;if(N.ctx=s?s(r,c.props||{},((t,e,...n)=>{const l=n.length?n[0]:e;return N.ctx&&_(N.ctx[t],N.ctx[t]=l)&&(!N.skip_bound&&N.bound[t]&&N.bound[t](l),d&&K(r,t)),e})):[],N.update(),d=!0,l(N.before_update),N.fragment=!!a&&a(N.ctx),c.target){if(c.hydrate){const t=function(t){return Array.from(t.childNodes)}(c.target);N.fragment&&N.fragment.l(t),t.forEach(F)}else N.fragment&&N.fragment.c();c.intro&&((P=r.$$.fragment)&&P.i&&(I.delete(P),P.i(p))),function(t,n,r,c){const{fragment:s,after_update:F}=t.$$;s&&s.m(n,r),c||M((()=>{const n=t.$$.on_mount.map(e).filter(o);t.$$.on_destroy?t.$$.on_destroy.push(...n):l(n),t.$$.on_mount=[]})),F.forEach(M)}(r,c.target,c.anchor,c.customElement),C()}var P,p;U(f)}class G{$destroy(){B(this,1),this.$destroy=t}$on(e,n){if(!o(n))return t;const l=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return l.push(n),()=>{const t=l.indexOf(n);-1!==t&&l.splice(t,1)}}$set(t){var e;this.$$set&&(e=t,0!==Object.keys(e).length)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}function S(t,e,n){const l=t.slice();return l[54]=e[n],l[56]=n,l}function y(t,e,n){const l=t.slice();return l[54]=e[n],l[56]=n,l}function k(t,e,n){const l=t.slice();return l[58]=e[n],l[60]=n,l}function D(t,e,n){const l=t.slice();return l[54]=e[n],l[56]=n,l}function $(t,e,n){const l=t.slice();return l[62]=e[n],l[64]=n,l}function Y(t,e,n){const l=t.slice();return l[65]=e[n],l[67]=n,l}function x(t,e,n){const l=t.slice();return l[68]=e[n],l[70]=n,l}function Q(t){let e;return{c(){e=_("div"),e.textContent="GOAL"},m(t,n){s(t,e,n)},d(t){t&&F(e)}}}function w(t){let e,n;return{c(){e=_("div"),n=u(t[9])},m(t,l){s(t,e,l),c(e,n)},p(t,e){512&e[0]&&N(n,t[9])},d(t){t&&F(e)}}}function W(t){let e,n,o,r,a;function i(){return t[19](t[67],t[70])}function N(){return t[20](t[67],t[70])}return{c(){e=_("span"),n=u("□"),f(e,"style",o=t[68][3])},m(t,l){s(t,e,l),c(e,n),r||(a=[A(e,"keydown",i),A(e,"click",N)],r=!0)},p(n,l){t=n,1024&l[0]&&o!==(o=t[68][3])&&f(e,"style",o)},d(t){t&&F(e),r=!1,l(a)}}}function j(t){let e,n,l=t[65],o=[];for(let e=0;e<l.length;e+=1)o[e]=W(x(t,l,e));return{c(){e=_("li");for(let t=0;t<o.length;t+=1)o[t].c();n=i(),f(e,"class","CELL")},m(t,l){s(t,e,l);for(let t=0;t<o.length;t+=1)o[t]&&o[t].m(e,null);c(e,n)},p(t,r){if(17408&r[0]){let c;for(l=t[65],c=0;c<l.length;c+=1){const s=x(t,l,c);o[c]?o[c].p(s,r):(o[c]=W(s),o[c].c(),o[c].m(e,n))}for(;c<o.length;c+=1)o[c].d(1);o.length=l.length}},d(t){t&&F(e),a(o,t)}}}function H(t){let e,n,l,o,r,A,f,T,U,d,P,p,E,g=t[54].RARITY+"",h=t[54].LFP_BUFF+"",m=t[54].ATK_BUFF+"",M=t[54].MAGIC[0].MAGIC_COUNT+"",b=t[54].MAGIC[0].MAGIC_COUNT>=1&&q(t),L=t[54].MAGIC[1],C=[];for(let e=0;e<L.length;e+=1)C[e]=X($(t,L,e));return{c(){e=_("div"),n=u("RARITY: "),l=u(g),o=u("\n\t\t\t\t\t\t\t\t\t\t\tLFP_BUFF: "),r=u(h),A=u("\n\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\tATK_BUFF: "),f=u(m),T=i(),U=_("div"),b&&b.c(),d=u("\n\t\t\t\t\t\t\t\t\t\t\t\t\tMAGIC_COUNT: "),P=u(M),p=i();for(let t=0;t<C.length;t+=1)C[t].c();E=i()},m(t,F){s(t,e,F),c(e,n),c(e,l),c(e,o),c(e,r),c(e,A),c(e,f),c(e,T),c(e,U),b&&b.m(U,null),c(U,d),c(U,P),c(U,p);for(let t=0;t<C.length;t+=1)C[t]&&C[t].m(U,null);c(e,E)},p(t,e){if(2&e[0]&&g!==(g=t[54].RARITY+"")&&N(l,g),2&e[0]&&h!==(h=t[54].LFP_BUFF+"")&&N(r,h),2&e[0]&&m!==(m=t[54].ATK_BUFF+"")&&N(f,m),t[54].MAGIC[0].MAGIC_COUNT>=1?b?b.p(t,e):(b=q(t),b.c(),b.m(U,d)):b&&(b.d(1),b=null),2&e[0]&&M!==(M=t[54].MAGIC[0].MAGIC_COUNT+"")&&N(P,M),2&e[0]){let n;for(L=t[54].MAGIC[1],n=0;n<L.length;n+=1){const l=$(t,L,n);C[n]?C[n].p(l,e):(C[n]=X(l),C[n].c(),C[n].m(U,null))}for(;n<C.length;n+=1)C[n].d(1);C.length=L.length}},d(t){t&&F(e),b&&b.d(),a(C,t)}}}function q(t){let e,n,l;function o(){return t[25](t[54],t[56])}return{c(){e=_("button"),e.textContent="MAGIC"},m(t,r){s(t,e,r),n||(l=A(e,"click",o),n=!0)},p(e,n){t=e},d(t){t&&F(e),n=!1,l()}}}function X(t){let e,n,l,o=t[62]+"";return{c(){e=_("div"),n=u(o),l=i()},m(t,o){s(t,e,o),c(e,n),c(e,l)},p(t,e){2&e[0]&&o!==(o=t[62]+"")&&N(n,o)},d(t){t&&F(e)}}}function V(t){let e,n=t[54]&&H(t);return{c(){n&&n.c(),e=u("")},m(t,l){n&&n.m(t,l),s(t,e,l)},p(t,l){t[54]?n?n.p(t,l):(n=H(t),n.c(),n.m(e.parentNode,e)):n&&(n.d(1),n=null)},d(t){n&&n.d(t),t&&F(e)}}}function z(t){let e,n,l,o,r,a,i,A=t[2][t[58]].NAME+"",T=t[2][t[58]].LFP+"",U=t[2][t[58]].ATK+"";return{c(){var c,s,F,N;e=_("div"),n=u(A),l=u(" LFP: "),o=u(T),r=u(" ATK: "),a=u(U),f(e,"id",i=t[2][t[58]].NAME),c=e,s="background-color",null==(F="#FFFFFF")?c.style.removeProperty(s):c.style.setProperty(s,F,N?"important":""),f(e,"class","UNT_BACK")},m(t,F){s(t,e,F),c(e,n),c(e,l),c(e,o),c(e,r),c(e,a)},p(t,l){4&l[0]&&A!==(A=t[2][t[58]].NAME+"")&&N(n,A),4&l[0]&&T!==(T=t[2][t[58]].LFP+"")&&N(o,T),4&l[0]&&U!==(U=t[2][t[58]].ATK+"")&&N(a,U),4&l[0]&&i!==(i=t[2][t[58]].NAME)&&f(e,"id",i)},d(t){t&&F(e)}}}function J(t){let e,n,l,o,r,a,T,U,d,P,p,E,g,h,m,M,b,L,C,v,R,I,B,K,O=t[54].RARITY+"",G=t[54].LFP_BUFF+"",S=t[54].LFP_DEBUFF+"",y=t[54].ATK_BUFF+"",k=t[54].ATK_DEBUFF+"",D=t[54].MAGIC[0].MAGIC_COUNT+"",$=t[54].MAGIC[1]+"";function Y(){return t[26](t[54])}return{c(){e=_("span"),n=u(O),l=i(),o=_("span"),r=u(G),a=i(),T=_("span"),U=u(S),d=i(),P=_("span"),p=u(y),E=i(),g=_("span"),h=u(k),m=i(),M=_("span"),b=u(D),L=i(),C=_("span"),v=u($),R=i(),I=_("button"),I.textContent="set_EQP",f(e,"class","EQP_SPAN svelte-13164b6"),f(o,"class","EQP_SPAN svelte-13164b6"),f(T,"class","EQP_SPAN svelte-13164b6"),f(P,"class","EQP_SPAN svelte-13164b6"),f(g,"class","EQP_SPAN svelte-13164b6"),f(M,"class","EQP_SPAN svelte-13164b6"),f(C,"class","EQP_SPAN svelte-13164b6")},m(t,F){s(t,e,F),c(e,n),s(t,l,F),s(t,o,F),c(o,r),s(t,a,F),s(t,T,F),c(T,U),s(t,d,F),s(t,P,F),c(P,p),s(t,E,F),s(t,g,F),c(g,h),s(t,m,F),s(t,M,F),c(M,b),s(t,L,F),s(t,C,F),c(C,v),s(t,R,F),s(t,I,F),B||(K=A(I,"click",Y),B=!0)},p(e,l){t=e,16&l[0]&&O!==(O=t[54].RARITY+"")&&N(n,O),16&l[0]&&G!==(G=t[54].LFP_BUFF+"")&&N(r,G),16&l[0]&&S!==(S=t[54].LFP_DEBUFF+"")&&N(U,S),16&l[0]&&y!==(y=t[54].ATK_BUFF+"")&&N(p,y),16&l[0]&&k!==(k=t[54].ATK_DEBUFF+"")&&N(h,k),16&l[0]&&D!==(D=t[54].MAGIC[0].MAGIC_COUNT+"")&&N(b,D),16&l[0]&&$!==($=t[54].MAGIC[1]+"")&&N(v,$)},d(t){t&&F(e),t&&F(l),t&&F(o),t&&F(a),t&&F(T),t&&F(d),t&&F(P),t&&F(E),t&&F(g),t&&F(m),t&&F(M),t&&F(L),t&&F(C),t&&F(R),t&&F(I),B=!1,K()}}}function Z(t){let e,n,l=t[54]&&J(t);return{c(){e=_("li"),l&&l.c(),n=i()},m(t,o){s(t,e,o),l&&l.m(e,null),c(e,n)},p(t,o){t[54]?l?l.p(t,o):(l=J(t),l.c(),l.m(e,n)):l&&(l.d(1),l=null)},d(t){t&&F(e),l&&l.d()}}}function tt(e){let n,l,o=e[54]&&function(e){let n,l,o,r,a,A,N,T,U,d,P,p,E,g,h,m,M,b,L,C,v=e[54].RARITY+"",R=e[54].LFP_BUFF+"",I=e[54].LFP_DEBUFF+"",B=e[54].ATK_BUFF+"",K=e[54].ATK_DEBUFF+"",O=e[54].MAGIC[0].MAGIC_COUNT+"",G=e[54].MAGIC[1]+"";return{c(){n=_("span"),l=u(v),o=i(),r=_("span"),a=u(R),A=i(),N=_("span"),T=u(I),U=i(),d=_("span"),P=u(B),p=i(),E=_("span"),g=u(K),h=i(),m=_("span"),M=u(O),b=i(),L=_("span"),C=u(G),f(n,"class","EQP_SPAN svelte-13164b6"),f(r,"class","EQP_SPAN svelte-13164b6"),f(N,"class","EQP_SPAN svelte-13164b6"),f(d,"class","EQP_SPAN svelte-13164b6"),f(E,"class","EQP_SPAN svelte-13164b6"),f(m,"class","EQP_SPAN svelte-13164b6"),f(L,"class","EQP_SPAN svelte-13164b6")},m(t,e){s(t,n,e),c(n,l),s(t,o,e),s(t,r,e),c(r,a),s(t,A,e),s(t,N,e),c(N,T),s(t,U,e),s(t,d,e),c(d,P),s(t,p,e),s(t,E,e),c(E,g),s(t,h,e),s(t,m,e),c(m,M),s(t,b,e),s(t,L,e),c(L,C)},p:t,d(t){t&&F(n),t&&F(o),t&&F(r),t&&F(A),t&&F(N),t&&F(U),t&&F(d),t&&F(p),t&&F(E),t&&F(h),t&&F(m),t&&F(b),t&&F(L)}}}(e);return{c(){n=_("li"),o&&o.c(),l=i()},m(t,e){s(t,n,e),o&&o.m(n,null),c(n,l)},p(t,e){t[54]&&o.p(t,e)},d(t){t&&F(n),o&&o.d()}}}function et(e){let n,o,r,T,U,d,P,p,E,g,h,m,M,b,L,C,v,R,I,B,K,O,G,$,x,W,H,q,X,J,et,nt,lt,ot,rt,ct,st,Ft,at,_t,ut,it,At,ft,Nt,Tt,Ut,dt,Pt,pt,Et,gt,ht,mt,Mt,bt,Lt,Ct,vt,Rt,It,Bt,Kt,Ot,Gt,St,yt,kt,Dt,$t,Yt,xt,Qt,wt,Wt,jt,Ht,qt,Xt,Vt,zt=e[1][0].NAME+"",Jt=e[1][0].LFP+"",Zt=e[1][0].ATK+"",te=e[8]&&Q(),ee=e[9]&&w(e),ne=e[10],le=[];for(let t=0;t<ne.length;t+=1)le[t]=j(Y(e,ne,t));let oe=e[1][0].EQP,re=[];for(let t=0;t<oe.length;t+=1)re[t]=V(D(e,oe,t));let ce=Object.keys(e[2]),se=[];for(let t=0;t<ce.length;t+=1)se[t]=z(k(e,ce,t));let Fe=e[4],ae=[];for(let t=0;t<Fe.length;t+=1)ae[t]=Z(y(e,Fe,t));let _e=e[12],ue=[];for(let t=0;t<_e.length;t+=1)ue[t]=tt(S(e,_e,t));return qt=function(t){let e;return{p(...n){e=n,e.forEach((e=>t.push(e)))},r(){e.forEach((e=>t.splice(t.indexOf(e),1)))}}}(e[17][0]),{c(){n=_("div"),te&&te.c(),o=i(),ee&&ee.c(),r=i(),T=_("div"),U=_("fieldset"),d=_("span"),d.textContent="SHOW_DAMAGE:",P=i(),p=_("span"),E=_("input"),g=i(),h=_("label"),h.textContent="ON",m=i(),M=_("span"),b=_("input"),L=i(),C=_("label"),C.textContent="OFF",v=i(),R=_("div"),I=u("PICKEL: "),B=u(e[7]),K=i(),O=_("ul");for(let t=0;t<le.length;t+=1)le[t].c();G=i(),$=_("div"),x=_("button"),x.textContent="◾️",W=i(),H=_("button"),H.textContent="W",q=i(),X=_("button"),X.textContent="◾️",J=i(),et=_("div"),nt=_("button"),nt.textContent="A",lt=i(),ot=_("button"),ot.textContent="◾️",rt=i(),ct=_("button"),ct.textContent="D",st=i(),Ft=_("div"),at=_("button"),at.textContent="◾️",_t=i(),ut=_("button"),ut.textContent="S",it=i(),At=_("button"),At.textContent="◾️",ft=i(),Nt=_("div"),Tt=_("div"),Ut=u(zt),dt=u("\n\t\t\t\t\t\t\t\t\tLFP: "),Pt=u(Jt),pt=u("\n\t\t\t\t\t\t\t\t\tATK: "),Et=u(Zt),gt=i();for(let t=0;t<re.length;t+=1)re[t].c();ht=i(),mt=_("div");for(let t=0;t<se.length;t+=1)se[t].c();Mt=i(),bt=_("div"),bt.textContent="Ver 0.0.1.4",Lt=i(),Ct=_("a"),Ct.textContent="GitHub",vt=i(),Rt=_("div"),It=_("button"),It.textContent="slot_exe_once",Bt=i(),Kt=_("div"),Kt.textContent="MINE",Ot=u("\n\t\tGOLD: "),Gt=u(e[3]),St=u("\n\t\tKAKUHEN: "),yt=u(e[5]),kt=u("\n\t\tKAKUHEN_COUNTER: "),Dt=u(e[6]),$t=i(),Yt=_("ul"),xt=_("li"),xt.innerHTML='<span class="EQP_SPAN svelte-13164b6">RARITY</span> \n\t\t\t\t<span class="EQP_SPAN svelte-13164b6">LFP_BUFF</span> \n\t\t\t\t<span class="EQP_SPAN svelte-13164b6">LFP_DEBUFF</span> \n\t\t\t\t<span class="EQP_SPAN svelte-13164b6">ATK_BUFF</span> \n\t\t\t\t<span class="EQP_SPAN svelte-13164b6">ATK_DEBUFF</span> \n\t\t\t\t<span class="EQP_SPAN svelte-13164b6">MAGIC</span> \n\t\t\t\t<span class="EQP_SPAN svelte-13164b6">MAGIC_RANGE</span>',Qt=i();for(let t=0;t<ae.length;t+=1)ae[t].c();wt=i(),Wt=_("ul"),jt=_("li"),jt.innerHTML='<span class="EQP_SPAN svelte-13164b6">RARITY</span> \n\t\t\t\t<span class="EQP_SPAN svelte-13164b6">LFP_BUFF</span> \n\t\t\t\t<span class="EQP_SPAN svelte-13164b6">LFP_DEBUFF</span> \n\t\t\t\t<span class="EQP_SPAN svelte-13164b6">ATK_BUFF</span> \n\t\t\t\t<span class="EQP_SPAN svelte-13164b6">ATK_DEBUFF</span> \n\t\t\t\t<span class="EQP_SPAN svelte-13164b6">MAGIC</span> \n\t\t\t\t<span class="EQP_SPAN svelte-13164b6">MAGIC_RANGE</span>',Ht=i();for(let t=0;t<ue.length;t+=1)ue[t].c();f(E,"type","radio"),f(E,"id","ON"),f(E,"name","SHOW_DAMAGE"),E.__value="ON",E.value=E.__value,f(h,"for","ON"),f(b,"type","radio"),f(b,"id","OFF"),f(b,"name","SHOW_DAMAGE"),b.__value="OFF",b.value=b.__value,f(C,"for","OFF"),f(x,"class","WASD_NULL svelte-13164b6"),f(H,"class","WASD svelte-13164b6"),f(X,"class","WASD_NULL svelte-13164b6"),f(nt,"class","WASD svelte-13164b6"),f(ot,"class","WASD_NULL svelte-13164b6"),f(ct,"class","WASD svelte-13164b6"),f(at,"class","WASD_NULL svelte-13164b6"),f(ut,"class","WASD svelte-13164b6"),f(At,"class","WASD_NULL svelte-13164b6"),f(Ct,"href","https://github.com/taroyanaka/game/"),f(n,"class","field svelte-13164b6"),f(Rt,"class","gacha svelte-13164b6"),qt.p(E,b)},m(t,l){s(t,n,l),te&&te.m(n,null),c(n,o),ee&&ee.m(n,null),c(n,r),c(n,T),c(T,U),c(U,d),c(U,P),c(U,p),c(p,E),E.checked=E.__value===e[0],c(p,g),c(p,h),c(U,m),c(U,M),c(M,b),b.checked=b.__value===e[0],c(M,L),c(M,C),c(n,v),c(n,R),c(R,I),c(R,B),c(n,K),c(n,O);for(let t=0;t<le.length;t+=1)le[t]&&le[t].m(O,null);c(n,G),c(n,$),c($,x),c($,W),c($,H),c($,q),c($,X),c(n,J),c(n,et),c(et,nt),c(et,lt),c(et,ot),c(et,rt),c(et,ct),c(n,st),c(n,Ft),c(Ft,at),c(Ft,_t),c(Ft,ut),c(Ft,it),c(Ft,At),c(n,ft),c(n,Nt),c(Nt,Tt),c(Tt,Ut),c(Tt,dt),c(Tt,Pt),c(Tt,pt),c(Tt,Et),c(Tt,gt);for(let t=0;t<re.length;t+=1)re[t]&&re[t].m(Tt,null);c(Nt,ht),c(Nt,mt);for(let t=0;t<se.length;t+=1)se[t]&&se[t].m(mt,null);c(n,Mt),c(n,bt),c(n,Lt),c(n,Ct),s(t,vt,l),s(t,Rt,l),c(Rt,It),c(Rt,Bt),c(Rt,Kt),c(Rt,Ot),c(Rt,Gt),c(Rt,St),c(Rt,yt),c(Rt,kt),c(Rt,Dt),c(Rt,$t),c(Rt,Yt),c(Yt,xt),c(Yt,Qt);for(let t=0;t<ae.length;t+=1)ae[t]&&ae[t].m(Yt,null);c(Rt,wt),c(Rt,Wt),c(Wt,jt),c(Wt,Ht);for(let t=0;t<ue.length;t+=1)ue[t]&&ue[t].m(Wt,null);Xt||(Vt=[A(E,"change",e[16]),A(b,"change",e[18]),A(H,"click",e[21]),A(nt,"click",e[22]),A(ct,"click",e[23]),A(ut,"click",e[24]),A(It,"click",e[13])],Xt=!0)},p(t,e){if(t[8]?te||(te=Q(),te.c(),te.m(n,o)):te&&(te.d(1),te=null),t[9]?ee?ee.p(t,e):(ee=w(t),ee.c(),ee.m(n,r)):ee&&(ee.d(1),ee=null),1&e[0]&&(E.checked=E.__value===t[0]),1&e[0]&&(b.checked=b.__value===t[0]),128&e[0]&&N(B,t[7]),17408&e[0]){let n;for(ne=t[10],n=0;n<ne.length;n+=1){const l=Y(t,ne,n);le[n]?le[n].p(l,e):(le[n]=j(l),le[n].c(),le[n].m(O,null))}for(;n<le.length;n+=1)le[n].d(1);le.length=ne.length}if(2&e[0]&&zt!==(zt=t[1][0].NAME+"")&&N(Ut,zt),2&e[0]&&Jt!==(Jt=t[1][0].LFP+"")&&N(Pt,Jt),2&e[0]&&Zt!==(Zt=t[1][0].ATK+"")&&N(Et,Zt),32770&e[0]){let n;for(oe=t[1][0].EQP,n=0;n<oe.length;n+=1){const l=D(t,oe,n);re[n]?re[n].p(l,e):(re[n]=V(l),re[n].c(),re[n].m(Tt,null))}for(;n<re.length;n+=1)re[n].d(1);re.length=oe.length}if(4&e[0]){let n;for(ce=Object.keys(t[2]),n=0;n<ce.length;n+=1){const l=k(t,ce,n);se[n]?se[n].p(l,e):(se[n]=z(l),se[n].c(),se[n].m(mt,null))}for(;n<se.length;n+=1)se[n].d(1);se.length=ce.length}if(8&e[0]&&N(Gt,t[3]),32&e[0]&&N(yt,t[5]),64&e[0]&&N(Dt,t[6]),2066&e[0]){let n;for(Fe=t[4],n=0;n<Fe.length;n+=1){const l=y(t,Fe,n);ae[n]?ae[n].p(l,e):(ae[n]=Z(l),ae[n].c(),ae[n].m(Yt,null))}for(;n<ae.length;n+=1)ae[n].d(1);ae.length=Fe.length}if(4096&e[0]){let n;for(_e=t[12],n=0;n<_e.length;n+=1){const l=S(t,_e,n);ue[n]?ue[n].p(l,e):(ue[n]=tt(l),ue[n].c(),ue[n].m(Wt,null))}for(;n<ue.length;n+=1)ue[n].d(1);ue.length=_e.length}},i:t,o:t,d(t){t&&F(n),te&&te.d(),ee&&ee.d(),a(le,t),a(re,t),a(se,t),t&&F(vt),t&&F(Rt),a(ae,t),a(ue,t),qt.r(),Xt=!1,l(Vt)}}}function nt(t,e,n){let l="OFF";const o=[{NAME:"USR",LFP:30,ATK:1,EQP:[{RARITY:3,LFP_BUFF:0,LFP_DEBUFF:0,ATK_BUFF:4,ATK_DEBUFF:0,MAGIC:[{MAGIC_COUNT:0},[[0,0,0],[0,"U",0],[0,0,0]]]},{RARITY:2,LFP_BUFF:0,LFP_DEBUFF:0,ATK_BUFF:0,ATK_DEBUFF:0,MAGIC:[{MAGIC_COUNT:1},[[0,1,0],[1,"U",1],[0,1,0]]]},{RARITY:3,LFP_BUFF:0,LFP_DEBUFF:0,ATK_BUFF:0,ATK_DEBUFF:0,MAGIC:[{MAGIC_COUNT:1},[[1,1,1,1,1],[1,0,0,0,1],[1,0,"U",0,1],[1,0,0,0,1],[1,1,1,1,1]]]}]}];let r=R.clone(o);const c=(t,e,l)=>{r[0].EQP.length>=l||n(1,r[0].EQP=R.append(e,r[0].EQP),r)};let s={},F=1e3,a=[],_=!1,u=0;let i=[{RARITY:0,LFP_BUFF:0,LFP_DEBUFF:0,ATK_BUFF:1,ATK_DEBUFF:0,MAGIC:R.clone([{MAGIC_COUNT:0},[[0,0,0],[0,"U",0],[0,0,0]]])},{RARITY:1,LFP_BUFF:0,LFP_DEBUFF:0,ATK_BUFF:2,ATK_DEBUFF:0,MAGIC:R.clone([{MAGIC_COUNT:0},[[0,0,0],[0,"U",0],[0,0,0]]])},{RARITY:2,LFP_BUFF:0,LFP_DEBUFF:0,ATK_BUFF:3,ATK_DEBUFF:0,MAGIC:R.clone([{MAGIC_COUNT:0},[[0,0,0],[0,"U",0],[0,0,0]]])},{RARITY:3,LFP_BUFF:0,LFP_DEBUFF:0,ATK_BUFF:4,ATK_DEBUFF:0,MAGIC:R.clone([{MAGIC_COUNT:0},[[0,0,0],[0,"U",0],[0,0,0]]])},{RARITY:90,LFP_BUFF:0,LFP_DEBUFF:0,ATK_BUFF:10,ATK_DEBUFF:0,MAGIC:R.clone([{MAGIC_COUNT:0},[[0,0,0],[0,"U",0],[0,0,0]]])},{RARITY:2,LFP_BUFF:0,LFP_DEBUFF:0,ATK_BUFF:0,ATK_DEBUFF:0,MAGIC:[{MAGIC_COUNT:1},[[0,1,0],[1,"U",1],[0,1,0]]]},{RARITY:3,LFP_BUFF:0,LFP_DEBUFF:0,ATK_BUFF:0,ATK_DEBUFF:0,MAGIC:[{MAGIC_COUNT:1},[[1,1,1,1,1],[1,0,0,0,1],[1,0,"U",0,1],[1,0,0,0,1],[1,1,1,1,1]]]}],A=[5,5],f=0,N=!1,T="",U=[],P=[],p=i.reduce(((t,e)=>{e.RARITY;const n=90===e.RARITY?1:0===e.RARITY?80:e.RARITY;for(let l=0;l<n;l++)t.push(e);return t}),[]),E=shuffle(p);shuffle(p.slice(0,100));const g=()=>{const t=_?((t,e)=>{const n=E.filter((e=>e.RARITY===t)),l=n.slice(0,n.length-n.length*(e/100)),o=E.filter((e=>e.RARITY!==t)),r=l.concat(o);return shuffle(r)})(0,90):E,e=shuffle(t)[0];F<1||(n(3,F-=1),n(4,a=R.append(e,a)),a.slice(-shuffle([2,3])[0]).every((t=>t.RARITY>=1))&&n(5,_=!0),!0===_&&(n(6,u+=1),n(5,_=!(u>=30)),n(6,u=u>=30?0:u)))};document.addEventListener("keypress",(function(t){g(),t.key}));const h=(t,e)=>{A=[t,e];const n=[[e,e-1],[e,e+1],[e-1,e],[e+1,e]];return U=n,console.log(A[0],A[1],U),n},m=(t,e)=>{n(10,P[t][e][2]="NON",P),n(10,P[t][e][3]="background-color: #FFFFFF",P)},M=({Before_LFP:t=0,After_LFP:e=0,Damage:n=0})=>{"ON"===l&&alert("Before_LFP: "+t.toString()+" Damage: "+n.toString()+" After_LFP: "+e.toString()+" ")},b=({Y_X_Ary:t=[5,5],ms:e=200,Original_Color:l="#0000FF",Color_0:o="#0000FF",Color_1:r="#FFFFFF"})=>{const[c,s]=t,F=()=>{n(10,P[c][s][3]=`background-color: ${o}`,P)},a=()=>{n(10,P[c][s][3]=`background-color: ${r}`,P)};((t,e,n)=>{const l=t/1e3,o=(new Date).getTime();let r=0;const c=setInterval((()=>{((new Date).getTime()-o)/1e3>=l?clearInterval(c):r++%2==0?F():a()}),10)})(e),setTimeout((()=>{n(10,P[c][s][3]=`background-color: ${l}`,P)}),e)};function L(t){const e={w:[-1,0],a:[0,-1],s:[1,0],d:[0,1],m:null};if(t.Magic)return l=t.Eqp_I,n(1,r[0].EQP[l].MAGIC[0].MAGIC_COUNT-=1,r),(t=>{try{(t=>{const e=t.map((t=>t.map(((e,n)=>"U"===e?[n,t.indexOf(e)]:null)))).flat().filter(((t,e)=>null!==t))[0];return t.map(((t,e)=>t.map(((t,n)=>1===t?[e,n]:null)))).flat().filter((t=>null!==t)).map((t=>[t[0]-e[0],t[1]-e[1]]))})(t).forEach((t=>{const e=A[0]+t[0],l=A[1]+t[1];if("GOL"===P[e][l][2]||"BLC"===P[e][l][2]||"NON"===P[e][l][2]||"USR"===P[e][l][2])return;const o="UNT_NUM_"+Number(P[e][l][2].NAME.replaceAll("UNT_","")).toString(),c=r[0].EQP.reduce(((t,e)=>t+e.ATK_BUFF),0)||0,F=r[0].ATK+c;if(n(2,s[o].LFP-=F,s),s[o].LFP<=0){const t=[e,l];m(t[0],t[1]),n(10,P[t[0]][t[1]][3]="background-color: #FFFFFF",P),n(2,s=R.omit([o],s))}}))}catch(t){console.log(t)}})(t.Magic[1]),void Object.entries(s).map(((t,e)=>{v(t[1].NAME)}));var l;const o=[A[0]+e[t.key][0],A[1]+e[t.key][1]];if("BLC"===P[o[0]][o[1]][2]&&(n(7,f+=1),m(o[0],o[1])),"USR"!==P[o[0]][o[1]][2]){if("GOL"===P[o[0]][o[1]][2]&&(n(8,N=!0),document.removeEventListener("keypress",L),setTimeout((()=>{B({when_mounted_time:!1})}),1e3)),!t.Magic){(()=>{"NON"===P[o[0]][o[1]][2]&&(n(10,P[o[0]][o[1]][2]="USR",P),n(10,P[A[0]][A[1]][2]="NON",P),n(10,P[o[0]][o[1]][3]="background-color: #0000FF",P),n(10,P[A[0]][A[1]][3]="background-color: #FFFFFF",P),A=o)})(),((t,e)=>{if("object"!==P[t][e][2]&&"UNT"!==P[t][e][2].TYPE)return;const l="UNT_NUM_"+Number(P[t][e][2].NAME.replaceAll("UNT_","")).toString(),o=r[0].EQP.reduce(((t,e)=>t+e.ATK_BUFF),0)||0,c=r[0].ATK+o;if(M({Before_LFP:s[l].LFP,After_LFP:s[l].LFP-c,Damage:c}),n(2,s[l].LFP-=c,s),b({Y_X_Ary:[t,e],ms:200,Original_Color:"#00FF00",Color_0:"#FF0000",Color_1:"#FFFFFF"}),s[l].LFP<=0){const o=[t,e];m(o[0],o[1]),n(10,P[o[0]][o[1]][3]="background-color: #FFFFFF",P),n(2,s=R.omit([l],s))}})(o[0],o[1])}Object.entries(s).map(((t,e)=>{v(t[1].NAME)}))}}const C=()=>P.map((t=>t.filter((t=>"USR"===t[2])))).filter((t=>t.length>0))[0][0],v=t=>{try{const e=t?Number(t.replaceAll("UNT_","")):0,l=C(),o=((t=0)=>{try{const e=t.toString(),n=(t.toString(),P.map(((t,e)=>t.map(((t,n)=>"object"==typeof t[2]?[t[2].NAME.replaceAll("UNT_",""),[e,n]]:null)))).flat().filter((t=>null!==t)).filter((t=>t[0]===e))[0][1]),[l,o]=n;return[l,o]}catch(t){console.log(t)}})(e);if(o[1]===l[1]&&o[0]===l[0]-1||o[1]===l[1]&&o[0]===l[0]+1||o[0]===l[0]&&o[0]===l[1]-1||o[0]===l[0]&&o[0]===l[1]+1)return void(t=>{b({Y_X_Ary:[C()[0],C()[1]],ms:200,Original_Color:"#0000FF",Color_0:"#FF0000",Color_1:"#FFFFFF"});const e="UNT_NUM_"+t.toString(),l=s[e].ATK;M({Before_LFP:r[0].LFP,After_LFP:r[0].LFP-l,Damage:l}),n(1,r[0].LFP-=l,r),r[0].LFP<=0&&(n(9,T="YOU DIED, GAME OVER"),setTimeout((()=>{B({when_mounted_time:!1})}),1e3))})(e);Math.floor(4*Math.random());const c=[[o[0],o[1]-1],[o[0],o[1]+1],[o[0]-1,o[1]],[o[0]+1,o[1]]];let F=shuffle(c);for(let t=0;t<F.length;t++){let l=F[t];"NON"===P[l[0]][l[1]][2]&&(m(o[0],o[1]),n(10,P[o[0]][o[1]][3]="background-color: #FFFFFF",P),n(10,P[l[0]][l[1]][2]=s["UNT_NUM_"+e],P),n(10,P[l[0]][l[1]][3]="background-color: #00FF00",P),F=[])}}catch(t){}},I=()=>{(()=>{let t=P.map((t=>t.filter((t=>"NON"===t[2])))).flat().map((t=>t.slice(0,2)));Object.entries(s).forEach(((e,l)=>{const o="UNT_NUM_"+l.toString(),r=shuffle(t)[0];t=t.filter((t=>t!==r)),n(10,P[r[0]][r[1]][2]=s[o],P),n(10,P[r[0]][r[1]][3]="background-color: #00FF00",P)}))})()},B=({when_mounted_time:t=!0})=>{if(!1===t){if(!confirm("Again？"))return;B({when_mounted_time:!0})}var e,l;n(10,P=R.xprod(R.range(0,10),R.range(0,10)).map((t=>t.concat(["BLC"]))).map((t=>t.concat(["background-color: #808080"])))),n(10,P=R.splitEvery(10,P)),n(10,P[5][5][2]="USR",P),n(10,P[5][5][3]="background-color: #0000FF",P),n(9,T=""),!1===t&&n(1,r=R.clone(o)),n(2,s={UNT_NUM_0:{TYPE:"UNT",NAME:"UNT_0",LFP:3,ATK:1},UNT_NUM_1:{TYPE:"UNT",NAME:"UNT_1",LFP:2,ATK:2},UNT_NUM_2:{TYPE:"UNT",NAME:"UNT_2",LFP:2,ATK:3},UNT_NUM_3:{TYPE:"UNT",NAME:"UNT_3",LFP:2,ATK:4},UNT_NUM_4:{TYPE:"UNT",NAME:"UNT_4",LFP:4,ATK:1},UNT_NUM_5:{TYPE:"UNT",NAME:"UNT_5",LFP:4,ATK:2},UNT_NUM_6:{TYPE:"UNT",NAME:"UNT_6",LFP:5,ATK:1},UNT_NUM_7:{TYPE:"UNT",NAME:"UNT_7",LFP:5,ATK:2},UNT_NUM_8:{TYPE:"UNT",NAME:"UNT_8",LFP:5,ATK:3},UNT_NUM_9:{TYPE:"UNT",NAME:"UNT_9",LFP:5,ATK:4},UNT_NUM_10:{TYPE:"UNT",NAME:"UNT_10",LFP:6,ATK:1},UNT_NUM_11:{TYPE:"UNT",NAME:"UNT_11",LFP:6,ATK:2},UNT_NUM_12:{TYPE:"UNT",NAME:"UNT_12",LFP:6,ATK:3},UNT_NUM_13:{TYPE:"UNT",NAME:"UNT_13",LFP:6,ATK:4},UNT_NUM_14:{TYPE:"UNT",NAME:"UNT_14",LFP:1,ATK:1},UNT_NUM_15:{TYPE:"UNT",NAME:"UNT_15",LFP:1,ATK:2},UNT_NUM_16:{TYPE:"UNT",NAME:"UNT_16",LFP:1,ATK:3}}),n(2,s={}),n(2,s=(({Repeat_Array_Num:t=2,Repeat_Array_Times:e=20,LFP_Range_Array:n=[2,10],ATK_Range_Array:l=[1,8]})=>{const o={},r=({Default_Range:t=[1,10]})=>{const e=t[0],n=t[1];return Math.floor(Math.random()*(n+1-e))+e};var c,s;return(c=t,s=e,R.repeat(c,s)).forEach(((t,e)=>{o["UNT_NUM_"+e.toString()]={TYPE:"UNT",NAME:"UNT_"+e.toString(),LFP:t*r({Range:n}),ATK:t*r({Range:l})}})),o})({})),l=9,n(10,P[e=0][l][2]="GOL",P),n(10,P[e][l][3]="background-color: #FFFF00",P),n(7,f=0),n(8,N=!1),U=[],A=[5,5],((t=80)=>{const e=P.map((t=>t.filter((t=>"BLC"===t[2])))).flat().length,n=Math.floor(e*(t/100));for(let t=0;t<n;t++){const t=[shuffle([0,1,2,3,4,5,6,7,8,9])[0],shuffle([0,1,2,3,4,5,6,7,8,9])[0]];"USR"!==P[t[0]][t[1]][2]&&"GOL"!==P[t[0]][t[1]][2]&&m(t[0],t[1])}})(),n(10,P[5][4][2]="NON",P),n(10,P[5][4][3]="background-color: #FFFFFF",P),n(10,P[5][6][2]="NON",P),n(10,P[5][6][3]="background-color: #FFFFFF",P),n(10,P[4][5][2]="NON",P),n(10,P[4][5][3]="background-color: #FFFFFF",P),n(10,P[6][5][2]="NON",P),n(10,P[6][5][3]="background-color: #FFFFFF",P),n(10,P[5][3][2]="NON",P),n(10,P[5][3][3]="background-color: #FFFFFF",P),n(10,P[5][7][2]="NON",P),n(10,P[5][7][3]="background-color: #FFFFFF",P),n(10,P[3][5][2]="NON",P),n(10,P[3][5][3]="background-color: #FFFFFF",P),n(10,P[7][5][2]="NON",P),n(10,P[7][5][3]="background-color: #FFFFFF",P),I(),document.addEventListener("keypress",L)};d((async()=>{try{B({when_mounted_time:!0})}catch(t){console.log(t)}}));return[l,r,s,F,a,_,u,f,N,T,P,c,E,g,h,L,function(){l=this.__value,n(0,l)},[[]],function(){l=this.__value,n(0,l)},(t,e)=>h(t,e),(t,e)=>h(t,e),()=>L({key:"w"}),()=>L({key:"a"}),()=>L({key:"d"}),()=>L({key:"s"}),(t,e)=>L({key:"m",Magic:t.MAGIC,Eqp_I:e}),t=>c(r[0].NAME,t,10)]}return new class extends G{constructor(t){super(),O(this,t,nt,et,r,{},null,[-1,-1,-1])}}({target:document.body})}();
//# sourceMappingURL=bundle.js.map
