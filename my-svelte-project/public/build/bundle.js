var app=function(){"use strict";function t(){}function e(t){return t()}function n(){return Object.create(null)}function l(t){t.forEach(e)}function o(t){return"function"==typeof t}function r(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}function c(t,e){t.appendChild(e)}function F(t,e,n){t.insertBefore(e,n||null)}function _(t){t.parentNode&&t.parentNode.removeChild(t)}function s(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function a(t){return document.createElement(t)}function u(t){return document.createTextNode(t)}function A(){return u(" ")}function i(){return u("")}function T(t,e,n,l){return t.addEventListener(e,n,l),()=>t.removeEventListener(e,n,l)}function P(t,e,n){null==n?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function N(t,e){e=""+e,t.data!==e&&(t.data=e)}let U;function f(t){U=t}function p(t){(function(){if(!U)throw new Error("Function called outside component initialization");return U})().$$.on_mount.push(t)}const d=[],g=[];let E=[];const h=[],M=Promise.resolve();let m=!1;function B(t){E.push(t)}const L=new Set;let C=0;function x(){if(0!==C)return;const t=U;do{try{for(;C<d.length;){const t=d[C];C++,f(t),I(t.$$)}}catch(t){throw d.length=0,C=0,t}for(f(null),d.length=0,C=0;g.length;)g.pop()();for(let t=0;t<E.length;t+=1){const e=E[t];L.has(e)||(L.add(e),e())}E.length=0}while(d.length);for(;h.length;)h.pop()();m=!1,L.clear(),f(t)}function I(t){if(null!==t.fragment){t.update(),l(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(B)}}const v=new Set;function K(t,e){const n=t.$$;null!==n.fragment&&(!function(t){const e=[],n=[];E.forEach((l=>-1===t.indexOf(l)?e.push(l):n.push(l))),n.forEach((t=>t())),E=e}(n.after_update),l(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function D(t,e){-1===t.$$.dirty[0]&&(d.push(t),m||(m=!0,M.then(x)),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function G(r,c,F,s,a,u,A,i=[-1]){const T=U;f(r);const P=r.$$={fragment:null,ctx:[],props:u,update:t,not_equal:a,bound:n(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(c.context||(T?T.$$.context:[])),callbacks:n(),dirty:i,skip_bound:!1,root:c.target||T.$$.root};A&&A(P.root);let N=!1;if(P.ctx=F?F(r,c.props||{},((t,e,...n)=>{const l=n.length?n[0]:e;return P.ctx&&a(P.ctx[t],P.ctx[t]=l)&&(!P.skip_bound&&P.bound[t]&&P.bound[t](l),N&&D(r,t)),e})):[],P.update(),N=!0,l(P.before_update),P.fragment=!!s&&s(P.ctx),c.target){if(c.hydrate){const t=function(t){return Array.from(t.childNodes)}(c.target);P.fragment&&P.fragment.l(t),t.forEach(_)}else P.fragment&&P.fragment.c();c.intro&&((p=r.$$.fragment)&&p.i&&(v.delete(p),p.i(d))),function(t,n,r,c){const{fragment:F,after_update:_}=t.$$;F&&F.m(n,r),c||B((()=>{const n=t.$$.on_mount.map(e).filter(o);t.$$.on_destroy?t.$$.on_destroy.push(...n):l(n),t.$$.on_mount=[]})),_.forEach(B)}(r,c.target,c.anchor,c.customElement),x()}var p,d;f(T)}class O{$destroy(){K(this,1),this.$destroy=t}$on(e,n){if(!o(n))return t;const l=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return l.push(n),()=>{const t=l.indexOf(n);-1!==t&&l.splice(t,1)}}$set(t){var e;this.$$set&&(e=t,0!==Object.keys(e).length)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}function b(t,e,n){const l=t.slice();return l[77]=e[n],l[79]=n,l}function y(t,e,n){const l=t.slice();return l[77]=e[n],l[79]=n,l}function S(t,e,n){const l=t.slice();return l[77]=e[n],l[79]=n,l}function k(t,e,n){const l=t.slice();return l[82]=e[n],l[84]=n,l}function Y(t,e,n){const l=t.slice();return l[85]=e[n],l[87]=n,l}function $(t,e,n){const l=t.slice();return l[77]=e[n],l[79]=n,l}function Q(t,e,n){const l=t.slice();return l[82]=e[n],l[84]=n,l}function w(t,e,n){const l=t.slice();return l[90]=e[n],l[92]=n,l}function W(t,e,n){const l=t.slice();return l[93]=e[n],l[95]=n,l}function j(t){let e;return{c(){e=a("div"),e.textContent="GOAL"},m(t,n){F(t,e,n)},d(t){t&&_(e)}}}function H(t){let e,n;return{c(){e=a("div"),n=u(t[12])},m(t,l){F(t,e,l),c(e,n)},p(t,e){4096&e[0]&&N(n,t[12])},d(t){t&&_(e)}}}function X(t){let e,n,l;return{c(){e=a("div"),n=u("GOLD: "),l=u(t[7])},m(t,o){F(t,e,o),c(e,n),c(e,l)},p(t,e){128&e[0]&&N(l,t[7])},d(t){t&&_(e)}}}function q(t){let e,n,o,r,s;function A(){return t[26](t[92],t[95])}function i(){return t[27](t[92],t[95])}return{c(){e=a("span"),n=u("□"),P(e,"style",o=t[93][3])},m(t,l){F(t,e,l),c(e,n),r||(s=[T(e,"keydown",A),T(e,"click",i)],r=!0)},p(n,l){t=n,8192&l[0]&&o!==(o=t[93][3])&&P(e,"style",o)},d(t){t&&_(e),r=!1,l(s)}}}function V(t){let e,n,l=t[90],o=[];for(let e=0;e<l.length;e+=1)o[e]=q(W(t,l,e));return{c(){e=a("li");for(let t=0;t<o.length;t+=1)o[t].c();n=A(),P(e,"class","CELL")},m(t,l){F(t,e,l);for(let t=0;t<o.length;t+=1)o[t]&&o[t].m(e,null);c(e,n)},p(t,r){if(532480&r[0]){let c;for(l=t[90],c=0;c<l.length;c+=1){const F=W(t,l,c);o[c]?o[c].p(F,r):(o[c]=q(F),o[c].c(),o[c].m(e,n))}for(;c<o.length;c+=1)o[c].d(1);o.length=l.length}},d(t){t&&_(e),s(o,t)}}}function z(t){let e,n,l,o,r,s,i,T,P,U,f=t[77].RARITY+"",p=t[77].LFP_BUFF+"",d=t[77].ATK_BUFF+"",g=t[77].MAGIC[0].MAGIC_COUNT>=1&&J(t);return{c(){e=a("div"),n=u("RARITY: "),l=u(f),o=u("\n\t\t\t\t\t\t\t\t\t\t\tLFP_BUFF: "),r=u(p),s=u("\n\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\tATK_BUFF: "),i=u(d),T=A(),P=a("div"),g&&g.c(),U=A()},m(t,_){F(t,e,_),c(e,n),c(e,l),c(e,o),c(e,r),c(e,s),c(e,i),c(e,T),c(e,P),g&&g.m(P,null),c(e,U)},p(t,e){32&e[0]&&f!==(f=t[77].RARITY+"")&&N(l,f),32&e[0]&&p!==(p=t[77].LFP_BUFF+"")&&N(r,p),32&e[0]&&d!==(d=t[77].ATK_BUFF+"")&&N(i,d),t[77].MAGIC[0].MAGIC_COUNT>=1?g?g.p(t,e):(g=J(t),g.c(),g.m(P,null)):g&&(g.d(1),g=null)},d(t){t&&_(e),g&&g.d()}}}function J(t){let e,n,l,o,r,c,P,U=t[77].MAGIC[0].MAGIC_COUNT+"";function f(){return t[32](t[77],t[79])}let p=t[77].MAGIC[1],d=[];for(let e=0;e<p.length;e+=1)d[e]=Z(Q(t,p,e));return{c(){e=a("button"),e.textContent="MAGIC",n=u("\n\t\t\t\t\t\t\t\t\t\t\t\t\t\tMAGIC_COUNT: "),l=u(U),o=A();for(let t=0;t<d.length;t+=1)d[t].c();r=i()},m(t,_){F(t,e,_),F(t,n,_),F(t,l,_),F(t,o,_);for(let e=0;e<d.length;e+=1)d[e]&&d[e].m(t,_);F(t,r,_),c||(P=T(e,"click",f),c=!0)},p(e,n){if(t=e,32&n[0]&&U!==(U=t[77].MAGIC[0].MAGIC_COUNT+"")&&N(l,U),32&n[0]){let e;for(p=t[77].MAGIC[1],e=0;e<p.length;e+=1){const l=Q(t,p,e);d[e]?d[e].p(l,n):(d[e]=Z(l),d[e].c(),d[e].m(r.parentNode,r))}for(;e<d.length;e+=1)d[e].d(1);d.length=p.length}},d(t){t&&_(e),t&&_(n),t&&_(l),t&&_(o),s(d,t),t&&_(r),c=!1,P()}}}function Z(t){let e,n,l,o=t[82]+"";return{c(){e=a("div"),n=u(o),l=A()},m(t,o){F(t,e,o),c(e,n),c(e,l)},p(t,e){32&e[0]&&o!==(o=t[82]+"")&&N(n,o)},d(t){t&&_(e)}}}function tt(t){let e,n=t[77]&&z(t);return{c(){n&&n.c(),e=i()},m(t,l){n&&n.m(t,l),F(t,e,l)},p(t,l){t[77]?n?n.p(t,l):(n=z(t),n.c(),n.m(e.parentNode,e)):n&&(n.d(1),n=null)},d(t){n&&n.d(t),t&&_(e)}}}function et(t){let e,n,l,o,r,s,i,T,U,f,p,d,g,E,h=t[6][t[85]].NAME+"",M=t[6][t[85]].LFP+"",m=t[6][t[85]].ATK+"",R=t[6][t[85]].GLD+"",B=t[6][t[85]].BDP+"",L=t[6][t[85]].RBP+"";return{c(){var c,F,_,N;e=a("div"),n=u(h),l=u("\n\t\t\t\t\t\t\t\t\tLFP: "),o=u(M),r=u("\n\t\t\t\t\t\t\t\t\tATK: "),s=u(m),i=u("\n\t\t\t\t\t\t\t\t\tGLD: "),T=u(R),U=u("\n\t\t\t\t\t\t\t\t\tBDP: "),f=u(B),p=u("\n\t\t\t\t\t\t\t\t\tRBP: "),d=u(L),g=A(),P(e,"id",E=t[6][t[85]].NAME),c=e,F="background-color",null==(_="#FFFFFF")?c.style.removeProperty(F):c.style.setProperty(F,_,N?"important":""),P(e,"class","UNT_BACK")},m(t,_){F(t,e,_),c(e,n),c(e,l),c(e,o),c(e,r),c(e,s),c(e,i),c(e,T),c(e,U),c(e,f),c(e,p),c(e,d),c(e,g)},p(t,l){64&l[0]&&h!==(h=t[6][t[85]].NAME+"")&&N(n,h),64&l[0]&&M!==(M=t[6][t[85]].LFP+"")&&N(o,M),64&l[0]&&m!==(m=t[6][t[85]].ATK+"")&&N(s,m),64&l[0]&&R!==(R=t[6][t[85]].GLD+"")&&N(T,R),64&l[0]&&B!==(B=t[6][t[85]].BDP+"")&&N(f,B),64&l[0]&&L!==(L=t[6][t[85]].RBP+"")&&N(d,L),64&l[0]&&E!==(E=t[6][t[85]].NAME)&&P(e,"id",E)},d(t){t&&_(e)}}}function nt(t){let e,n,l,o,r,i,P,U,f,p,d,g,E,h,M,m,R=t[77].RARITY+"",B=t[77].LFP_BUFF+"",L=t[77].ATK_BUFF+"",C=t[77].MAGIC[0].MAGIC_COUNT+"";function x(){return t[33](t[79])}let I=t[77].MAGIC[1],v=[];for(let e=0;e<I.length;e+=1)v[e]=lt(k(t,I,e));return{c(){e=a("div"),n=u("RARITY: "),l=u(R),o=u("\n\t\t\t\t\tLFP_BUFF: "),r=u(B),i=u("\n\t\t\t\t\t\n\t\t\t\t\tATK_BUFF: "),P=u(L),U=A(),f=a("div"),p=a("button"),p.textContent="UN_EQP",d=u("\n\t\t\t\t\t\t\tMAGIC_COUNT: "),g=u(C),E=A();for(let t=0;t<v.length;t+=1)v[t].c();h=A()},m(t,_){F(t,e,_),c(e,n),c(e,l),c(e,o),c(e,r),c(e,i),c(e,P),c(e,U),c(e,f),c(f,p),c(f,d),c(f,g),c(f,E);for(let t=0;t<v.length;t+=1)v[t]&&v[t].m(f,null);c(e,h),M||(m=T(p,"click",x),M=!0)},p(e,n){if(t=e,32&n[0]&&R!==(R=t[77].RARITY+"")&&N(l,R),32&n[0]&&B!==(B=t[77].LFP_BUFF+"")&&N(r,B),32&n[0]&&L!==(L=t[77].ATK_BUFF+"")&&N(P,L),32&n[0]&&C!==(C=t[77].MAGIC[0].MAGIC_COUNT+"")&&N(g,C),32&n[0]){let e;for(I=t[77].MAGIC[1],e=0;e<I.length;e+=1){const l=k(t,I,e);v[e]?v[e].p(l,n):(v[e]=lt(l),v[e].c(),v[e].m(f,null))}for(;e<v.length;e+=1)v[e].d(1);v.length=I.length}},d(t){t&&_(e),s(v,t),M=!1,m()}}}function lt(t){let e,n,l,o=t[82]+"";return{c(){e=a("div"),n=u(o),l=A()},m(t,o){F(t,e,o),c(e,n),c(e,l)},p(t,e){32&e[0]&&o!==(o=t[82]+"")&&N(n,o)},d(t){t&&_(e)}}}function ot(t){let e,n=t[77]&&nt(t);return{c(){n&&n.c(),e=i()},m(t,l){n&&n.m(t,l),F(t,e,l)},p(t,l){t[77]?n?n.p(t,l):(n=nt(t),n.c(),n.m(e.parentNode,e)):n&&(n.d(1),n=null)},d(t){n&&n.d(t),t&&_(e)}}}function rt(t){let e,n,l,o,r,s,i,U,f,p,d,g,E,h,M,m,R,B,L,C,x,I,v,K,D=t[77].RARITY+"",G=t[77].LFP_BUFF+"",O=t[77].LFP_DEBUFF+"",b=t[77].ATK_BUFF+"",y=t[77].ATK_DEBUFF+"",S=t[77].MAGIC[0].MAGIC_COUNT+"",k=t[77].MAGIC[1]+"";function Y(){return t[37](t[77],t[79])}return{c(){e=a("span"),n=u(D),l=A(),o=a("span"),r=u(G),s=A(),i=a("span"),U=u(O),f=A(),p=a("span"),d=u(b),g=A(),E=a("span"),h=u(y),M=A(),m=a("span"),R=u(S),B=A(),L=a("span"),C=u(k),x=A(),I=a("button"),I.textContent="set_EQP",P(e,"class","EQP_SPAN svelte-13xlxpl"),P(o,"class","EQP_SPAN svelte-13xlxpl"),P(i,"class","EQP_SPAN svelte-13xlxpl"),P(p,"class","EQP_SPAN svelte-13xlxpl"),P(E,"class","EQP_SPAN svelte-13xlxpl"),P(m,"class","EQP_SPAN svelte-13xlxpl"),P(L,"class","EQP_SPAN svelte-13xlxpl")},m(t,_){F(t,e,_),c(e,n),F(t,l,_),F(t,o,_),c(o,r),F(t,s,_),F(t,i,_),c(i,U),F(t,f,_),F(t,p,_),c(p,d),F(t,g,_),F(t,E,_),c(E,h),F(t,M,_),F(t,m,_),c(m,R),F(t,B,_),F(t,L,_),c(L,C),F(t,x,_),F(t,I,_),v||(K=T(I,"click",Y),v=!0)},p(e,l){t=e,2&l[0]&&D!==(D=t[77].RARITY+"")&&N(n,D),2&l[0]&&G!==(G=t[77].LFP_BUFF+"")&&N(r,G),2&l[0]&&O!==(O=t[77].LFP_DEBUFF+"")&&N(U,O),2&l[0]&&b!==(b=t[77].ATK_BUFF+"")&&N(d,b),2&l[0]&&y!==(y=t[77].ATK_DEBUFF+"")&&N(h,y),2&l[0]&&S!==(S=t[77].MAGIC[0].MAGIC_COUNT+"")&&N(R,S),2&l[0]&&k!==(k=t[77].MAGIC[1]+"")&&N(C,k)},d(t){t&&_(e),t&&_(l),t&&_(o),t&&_(s),t&&_(i),t&&_(f),t&&_(p),t&&_(g),t&&_(E),t&&_(M),t&&_(m),t&&_(B),t&&_(L),t&&_(x),t&&_(I),v=!1,K()}}}function ct(t){let e,n,l=t[77]&&rt(t);return{c(){e=a("li"),l&&l.c(),n=A()},m(t,o){F(t,e,o),l&&l.m(e,null),c(e,n)},p(t,o){t[77]?l?l.p(t,o):(l=rt(t),l.c(),l.m(e,n)):l&&(l.d(1),l=null)},d(t){t&&_(e),l&&l.d()}}}function Ft(t){let e,n,l,o,r,s,i,T,U,f,p,d,g,E,h,M,m,R,B,L,C=t[77].RARITY+"",x=t[77].LFP_BUFF+"",I=t[77].LFP_DEBUFF+"",v=t[77].ATK_BUFF+"",K=t[77].ATK_DEBUFF+"",D=t[77].MAGIC[0].MAGIC_COUNT+"",G=t[77].MAGIC[1]+"";return{c(){e=a("span"),n=u(C),l=A(),o=a("span"),r=u(x),s=A(),i=a("span"),T=u(I),U=A(),f=a("span"),p=u(v),d=A(),g=a("span"),E=u(K),h=A(),M=a("span"),m=u(D),R=A(),B=a("span"),L=u(G),P(e,"class","EQP_SPAN svelte-13xlxpl"),P(o,"class","EQP_SPAN svelte-13xlxpl"),P(i,"class","EQP_SPAN svelte-13xlxpl"),P(f,"class","EQP_SPAN svelte-13xlxpl"),P(g,"class","EQP_SPAN svelte-13xlxpl"),P(M,"class","EQP_SPAN svelte-13xlxpl"),P(B,"class","EQP_SPAN svelte-13xlxpl")},m(t,_){F(t,e,_),c(e,n),F(t,l,_),F(t,o,_),c(o,r),F(t,s,_),F(t,i,_),c(i,T),F(t,U,_),F(t,f,_),c(f,p),F(t,d,_),F(t,g,_),c(g,E),F(t,h,_),F(t,M,_),c(M,m),F(t,R,_),F(t,B,_),c(B,L)},p(t,e){16384&e[0]&&C!==(C=t[77].RARITY+"")&&N(n,C),16384&e[0]&&x!==(x=t[77].LFP_BUFF+"")&&N(r,x),16384&e[0]&&I!==(I=t[77].LFP_DEBUFF+"")&&N(T,I),16384&e[0]&&v!==(v=t[77].ATK_BUFF+"")&&N(p,v),16384&e[0]&&K!==(K=t[77].ATK_DEBUFF+"")&&N(E,K),16384&e[0]&&D!==(D=t[77].MAGIC[0].MAGIC_COUNT+"")&&N(m,D),16384&e[0]&&G!==(G=t[77].MAGIC[1]+"")&&N(L,G)},d(t){t&&_(e),t&&_(l),t&&_(o),t&&_(s),t&&_(i),t&&_(U),t&&_(f),t&&_(d),t&&_(g),t&&_(h),t&&_(M),t&&_(R),t&&_(B)}}}function _t(t){let e,n,l=t[77]&&Ft(t);return{c(){e=a("li"),l&&l.c(),n=A()},m(t,o){F(t,e,o),l&&l.m(e,null),c(e,n)},p(t,o){t[77]?l?l.p(t,o):(l=Ft(t),l.c(),l.m(e,n)):l&&(l.d(1),l=null)},d(t){t&&_(e),l&&l.d()}}}function st(e){let n,o,r,i,U,f,p,d,g,E,h,M,m,R,B,L,C,x,I,v,K,D,G,O,k,Q,W,q,z,J,Z,nt,lt,rt,Ft,st,at,ut,At,it,Tt,Pt,Nt,Ut,ft,pt,dt,gt,Et,ht,Mt,mt,Rt,Bt,Lt,Ct,xt,It,vt,Kt,Dt,Gt,Ot,bt,yt,St,kt,Yt,$t,Qt,wt,Wt,jt,Ht,Xt,qt,Vt,zt,Jt,Zt,te,ee,ne,le,oe,re,ce,Fe,_e,se,ae,ue,Ae,ie,Te,Pe,Ne,Ue,fe,pe,de,ge,Ee,he,Me=e[5][0].NAME+"",me=e[5][0].LFP+"",Re=e[5][0].ATK+"",Be=e[5][0].NAME+"",Le=e[5][0].LFP+"",Ce=e[5][0].ATK+"",xe=e[11]&&j(),Ie=e[12]&&H(e),ve=e[7]&&X(e),Ke=e[13],De=[];for(let t=0;t<Ke.length;t+=1)De[t]=V(w(e,Ke,t));let Ge=e[5][0].EQP,Oe=[];for(let t=0;t<Ge.length;t+=1)Oe[t]=tt($(e,Ge,t));let be=Object.keys(e[6]),ye=[];for(let t=0;t<be.length;t+=1)ye[t]=et(Y(e,be,t));let Se=e[5][0].EQP,ke=[];for(let t=0;t<Se.length;t+=1)ke[t]=ot(S(e,Se,t));let Ye=e[1],$e=[];for(let t=0;t<Ye.length;t+=1)$e[t]=ct(y(e,Ye,t));let Qe=e[14],we=[];for(let t=0;t<Qe.length;t+=1)we[t]=_t(b(e,Qe,t));return ge=function(t){let e;return{p(...n){e=n,e.forEach((e=>t.push(e)))},r(){e.forEach((e=>t.splice(t.indexOf(e),1)))}}}(e[24][0]),{c(){n=a("div"),o=a("div"),xe&&xe.c(),r=A(),Ie&&Ie.c(),i=A(),U=a("div"),f=a("fieldset"),p=a("span"),p.textContent="SHOW_DAMAGE:",d=A(),g=a("span"),E=a("input"),h=A(),M=a("label"),M.textContent="ON",m=A(),R=a("span"),B=a("input"),L=A(),C=a("label"),C.textContent="OFF",x=A(),ve&&ve.c(),I=A(),v=a("div"),K=u("FLOOR: "),D=u(e[3]),G=A(),O=a("div"),k=u("PICKEL: "),Q=u(e[10]),W=A(),q=a("div"),z=u("KILL_STREAK: "),J=u(e[2]),Z=A(),nt=a("ul");for(let t=0;t<De.length;t+=1)De[t].c();lt=A(),rt=a("div"),Ft=a("button"),Ft.textContent="◾️",st=A(),at=a("button"),at.textContent="W",ut=A(),At=a("button"),At.textContent="◾️",it=A(),Tt=a("div"),Pt=a("button"),Pt.textContent="A",Nt=A(),Ut=a("button"),Ut.textContent="◾️",ft=A(),pt=a("button"),pt.textContent="D",dt=A(),gt=a("div"),Et=a("button"),Et.textContent="◾️",ht=A(),Mt=a("button"),Mt.textContent="S",mt=A(),Rt=a("button"),Rt.textContent="◾️",Bt=A(),Lt=a("div"),Ct=a("div"),xt=u(Me),It=u("\n\t\t\t\t\t\t\t\t\tLFP: "),vt=u(me),Kt=u("\n\t\t\t\t\t\t\t\t\tATK: "),Dt=u(Re),Gt=A();for(let t=0;t<Oe.length;t+=1)Oe[t].c();Ot=A(),bt=a("div");for(let t=0;t<ye.length;t+=1)ye[t].c();yt=A(),St=a("div"),St.textContent="Ver 0.0.2.2",kt=A(),Yt=a("a"),Yt.textContent="GitHub",$t=A(),Qt=a("div"),wt=a("div"),Wt=u(Be),jt=u("\n\t\t\tLFP: "),Ht=u(Le),Xt=u("\n\t\t\tATK: "),qt=u(Ce),Vt=A();for(let t=0;t<ke.length;t+=1)ke[t].c();zt=A(),Jt=a("button"),Jt.textContent="slot_exe_once",Zt=A(),te=a("button"),te.textContent="x4_slot_exe_once",ee=A(),ne=a("button"),ne.textContent="x8_slot_exe_once",le=A(),oe=a("button"),oe.textContent="next_field",re=A(),ce=a("div"),ce.textContent="MINE",Fe=u("\n\t\tGOLD: "),_e=u(e[7]),se=u("\n\t\tKAKUHEN: "),ae=u(e[8]),ue=u("\n\t\tKAKUHEN_COUNTER: "),Ae=u(e[9]),ie=A(),Te=a("ul"),Pe=a("li"),Pe.innerHTML='<span class="EQP_SPAN svelte-13xlxpl">RARITY</span> \n\t\t\t\t<span class="EQP_SPAN svelte-13xlxpl">LFP_BUFF</span> \n\t\t\t\t<span class="EQP_SPAN svelte-13xlxpl">LFP_DEBUFF</span> \n\t\t\t\t<span class="EQP_SPAN svelte-13xlxpl">ATK_BUFF</span> \n\t\t\t\t<span class="EQP_SPAN svelte-13xlxpl">ATK_DEBUFF</span> \n\t\t\t\t<span class="EQP_SPAN svelte-13xlxpl">MAGIC</span> \n\t\t\t\t<span class="EQP_SPAN svelte-13xlxpl">MAGIC_RANGE</span>',Ne=A();for(let t=0;t<$e.length;t+=1)$e[t].c();Ue=A(),fe=a("ul"),pe=a("li"),pe.innerHTML='<span class="EQP_SPAN svelte-13xlxpl">RARITY</span> \n\t\t\t\t<span class="EQP_SPAN svelte-13xlxpl">LFP_BUFF</span> \n\t\t\t\t<span class="EQP_SPAN svelte-13xlxpl">LFP_DEBUFF</span> \n\t\t\t\t<span class="EQP_SPAN svelte-13xlxpl">ATK_BUFF</span> \n\t\t\t\t<span class="EQP_SPAN svelte-13xlxpl">ATK_DEBUFF</span> \n\t\t\t\t<span class="EQP_SPAN svelte-13xlxpl">MAGIC</span> \n\t\t\t\t<span class="EQP_SPAN svelte-13xlxpl">MAGIC_RANGE</span>',de=A();for(let t=0;t<we.length;t+=1)we[t].c();P(E,"type","radio"),P(E,"id","ON"),P(E,"name","SHOW_DAMAGE"),E.__value="ON",E.value=E.__value,P(M,"for","ON"),P(B,"type","radio"),P(B,"id","OFF"),P(B,"name","SHOW_DAMAGE"),B.__value="OFF",B.value=B.__value,P(C,"for","OFF"),P(Ft,"class","WASD_NULL svelte-13xlxpl"),P(at,"class","WASD svelte-13xlxpl"),P(At,"class","WASD_NULL svelte-13xlxpl"),P(Pt,"class","WASD svelte-13xlxpl"),P(Ut,"class","WASD_NULL svelte-13xlxpl"),P(pt,"class","WASD svelte-13xlxpl"),P(Et,"class","WASD_NULL svelte-13xlxpl"),P(Mt,"class","WASD svelte-13xlxpl"),P(Rt,"class","WASD_NULL svelte-13xlxpl"),P(Yt,"href","https://github.com/taroyanaka/game/"),P(o,"class","field svelte-13xlxpl"),P(Qt,"class","gacha svelte-13xlxpl"),P(n,"class","container"),ge.p(E,B)},m(t,l){F(t,n,l),c(n,o),xe&&xe.m(o,null),c(o,r),Ie&&Ie.m(o,null),c(o,i),c(o,U),c(U,f),c(f,p),c(f,d),c(f,g),c(g,E),E.checked=E.__value===e[4],c(g,h),c(g,M),c(f,m),c(f,R),c(R,B),B.checked=B.__value===e[4],c(R,L),c(R,C),c(o,x),ve&&ve.m(o,null),c(o,I),c(o,v),c(v,K),c(v,D),c(o,G),c(o,O),c(O,k),c(O,Q),c(o,W),c(o,q),c(q,z),c(q,J),c(o,Z),c(o,nt);for(let t=0;t<De.length;t+=1)De[t]&&De[t].m(nt,null);c(o,lt),c(o,rt),c(rt,Ft),c(rt,st),c(rt,at),c(rt,ut),c(rt,At),c(o,it),c(o,Tt),c(Tt,Pt),c(Tt,Nt),c(Tt,Ut),c(Tt,ft),c(Tt,pt),c(o,dt),c(o,gt),c(gt,Et),c(gt,ht),c(gt,Mt),c(gt,mt),c(gt,Rt),c(o,Bt),c(o,Lt),c(Lt,Ct),c(Ct,xt),c(Ct,It),c(Ct,vt),c(Ct,Kt),c(Ct,Dt),c(Ct,Gt);for(let t=0;t<Oe.length;t+=1)Oe[t]&&Oe[t].m(Ct,null);c(Lt,Ot),c(Lt,bt);for(let t=0;t<ye.length;t+=1)ye[t]&&ye[t].m(bt,null);c(o,yt),c(o,St),c(o,kt),c(o,Yt),c(n,$t),c(n,Qt),c(Qt,wt),c(wt,Wt),c(wt,jt),c(wt,Ht),c(wt,Xt),c(wt,qt),c(wt,Vt);for(let t=0;t<ke.length;t+=1)ke[t]&&ke[t].m(wt,null);c(Qt,zt),c(Qt,Jt),c(Qt,Zt),c(Qt,te),c(Qt,ee),c(Qt,ne),c(Qt,le),c(Qt,oe),c(Qt,re),c(Qt,ce),c(Qt,Fe),c(Qt,_e),c(Qt,se),c(Qt,ae),c(Qt,ue),c(Qt,Ae),c(Qt,ie),c(Qt,Te),c(Te,Pe),c(Te,Ne);for(let t=0;t<$e.length;t+=1)$e[t]&&$e[t].m(Te,null);c(Qt,Ue),c(Qt,fe),c(fe,pe),c(fe,de);for(let t=0;t<we.length;t+=1)we[t]&&we[t].m(fe,null);e[38](n),Ee||(he=[T(E,"change",e[23]),T(B,"change",e[25]),T(at,"click",e[28]),T(Pt,"click",e[29]),T(pt,"click",e[30]),T(Mt,"click",e[31]),T(Jt,"click",e[34]),T(te,"click",e[35]),T(ne,"click",e[36]),T(oe,"click",e[16])],Ee=!0)},p(t,e){if(t[11]?xe||(xe=j(),xe.c(),xe.m(o,r)):xe&&(xe.d(1),xe=null),t[12]?Ie?Ie.p(t,e):(Ie=H(t),Ie.c(),Ie.m(o,i)):Ie&&(Ie.d(1),Ie=null),16&e[0]&&(E.checked=E.__value===t[4]),16&e[0]&&(B.checked=B.__value===t[4]),t[7]?ve?ve.p(t,e):(ve=X(t),ve.c(),ve.m(o,I)):ve&&(ve.d(1),ve=null),8&e[0]&&N(D,t[3]),1024&e[0]&&N(Q,t[10]),4&e[0]&&N(J,t[2]),532480&e[0]){let n;for(Ke=t[13],n=0;n<Ke.length;n+=1){const l=w(t,Ke,n);De[n]?De[n].p(l,e):(De[n]=V(l),De[n].c(),De[n].m(nt,null))}for(;n<De.length;n+=1)De[n].d(1);De.length=Ke.length}if(32&e[0]&&Me!==(Me=t[5][0].NAME+"")&&N(xt,Me),32&e[0]&&me!==(me=t[5][0].LFP+"")&&N(vt,me),32&e[0]&&Re!==(Re=t[5][0].ATK+"")&&N(Dt,Re),1048608&e[0]){let n;for(Ge=t[5][0].EQP,n=0;n<Ge.length;n+=1){const l=$(t,Ge,n);Oe[n]?Oe[n].p(l,e):(Oe[n]=tt(l),Oe[n].c(),Oe[n].m(Ct,null))}for(;n<Oe.length;n+=1)Oe[n].d(1);Oe.length=Ge.length}if(64&e[0]){let n;for(be=Object.keys(t[6]),n=0;n<be.length;n+=1){const l=Y(t,be,n);ye[n]?ye[n].p(l,e):(ye[n]=et(l),ye[n].c(),ye[n].m(bt,null))}for(;n<ye.length;n+=1)ye[n].d(1);ye.length=be.length}if(32&e[0]&&Be!==(Be=t[5][0].NAME+"")&&N(Wt,Be),32&e[0]&&Le!==(Le=t[5][0].LFP+"")&&N(Ht,Le),32&e[0]&&Ce!==(Ce=t[5][0].ATK+"")&&N(qt,Ce),32800&e[0]){let n;for(Se=t[5][0].EQP,n=0;n<Se.length;n+=1){const l=S(t,Se,n);ke[n]?ke[n].p(l,e):(ke[n]=ot(l),ke[n].c(),ke[n].m(wt,null))}for(;n<ke.length;n+=1)ke[n].d(1);ke.length=Se.length}if(128&e[0]&&N(_e,t[7]),256&e[0]&&N(ae,t[8]),512&e[0]&&N(Ae,t[9]),131074&e[0]){let n;for(Ye=t[1],n=0;n<Ye.length;n+=1){const l=y(t,Ye,n);$e[n]?$e[n].p(l,e):($e[n]=ct(l),$e[n].c(),$e[n].m(Te,null))}for(;n<$e.length;n+=1)$e[n].d(1);$e.length=Ye.length}if(16384&e[0]){let n;for(Qe=t[14],n=0;n<Qe.length;n+=1){const l=b(t,Qe,n);we[n]?we[n].p(l,e):(we[n]=_t(l),we[n].c(),we[n].m(fe,null))}for(;n<we.length;n+=1)we[n].d(1);we.length=Qe.length}},i:t,o:t,d(t){t&&_(n),xe&&xe.d(),Ie&&Ie.d(),ve&&ve.d(),s(De,t),s(Oe,t),s(ye,t),s(ke,t),s($e,t),s(we,t),e[38](null),ge.r(),Ee=!1,l(he)}}}function at(t,e,n){let l,o="block",r="none",c=0;const F=()=>{n(21,o="none"===o?"block":"none"),n(22,r="none"===r?"block":"none")},_=t=>{n(1,f=R.append(i[0].EQP[t],f)),n(5,i[0].EQP=R.remove(t,1,i[0].EQP),i)},s=()=>{i[0].EQP.map(((t,e)=>{null!==t.MAGIC[0].MAGIC_COUNT&&(t.MAGIC[0].MAGIC_COUNT=1)}))},a=[{LFP_Min:2,LFP_Max:10,ATK_Min:1,ATK_Max:3},{LFP_Min:5,LFP_Max:8,ATK_Min:3,ATK_Max:10}];let u=0,A="OFF",i=[];const T=[{NAME:"USR",LFP:100,ATK:1}];i=R.clone([{NAME:"USR",LFP:100,ATK:10,EQP:[{RARITY:3,LFP_BUFF:0,LFP_DEBUFF:0,ATK_BUFF:4,ATK_DEBUFF:0,MAGIC:[{MAGIC_COUNT:null},[[0,0,0],[0,"U",0],[0,0,0]]]},{RARITY:2,LFP_BUFF:0,LFP_DEBUFF:0,ATK_BUFF:0,ATK_DEBUFF:0,MAGIC:[{MAGIC_COUNT:1},[[0,1,0],[1,"U",1],[0,1,0]]]},{RARITY:4,LFP_BUFF:0,LFP_DEBUFF:0,ATK_BUFF:0,ATK_DEBUFF:0,MAGIC:[{MAGIC_COUNT:1},[[1,1,1,1,1],[1,0,0,0,1],[1,0,"U",0,1],[1,0,0,0,1],[1,1,1,1,1]]]}],GOLD:1}]);const P=({Eqp:t={UNT_NUM_0:{ATK:3,LFP:4,NAME:"UNT_0",TYPE:"UNT"}},Eqp_Index:e=0})=>{i[0].EQP.length>=10||(n(5,i[0].EQP=R.append(t,i[0].EQP),i),n(1,f=R.remove(e,1,f)),console.log(f))};let N={},U=1,f=[],d=!1,E=0;const h=[{RARITY:0,LFP_BUFF:0,LFP_DEBUFF:0,ATK_BUFF:1,ATK_DEBUFF:0,MAGIC:R.clone([{MAGIC_COUNT:null},[[0,0,0],[0,"U",0],[0,0,0]]])},{RARITY:1,LFP_BUFF:0,LFP_DEBUFF:0,ATK_BUFF:2,ATK_DEBUFF:0,MAGIC:R.clone([{MAGIC_COUNT:null},[[0,0,0],[0,"U",0],[0,0,0]]])},{RARITY:2,LFP_BUFF:0,LFP_DEBUFF:0,ATK_BUFF:3,ATK_DEBUFF:0,MAGIC:R.clone([{MAGIC_COUNT:null},[[0,0,0],[0,"U",0],[0,0,0]]])},{RARITY:3,LFP_BUFF:0,LFP_DEBUFF:0,ATK_BUFF:4,ATK_DEBUFF:0,MAGIC:R.clone([{MAGIC_COUNT:null},[[0,0,0],[0,"U",0],[0,0,0]]])},{RARITY:90,LFP_BUFF:0,LFP_DEBUFF:0,ATK_BUFF:10,ATK_DEBUFF:0,MAGIC:R.clone([{MAGIC_COUNT:null},[[0,0,0],[0,"U",0],[0,0,0]]])},{RARITY:2,LFP_BUFF:0,LFP_DEBUFF:0,ATK_BUFF:0,ATK_DEBUFF:0,MAGIC:[{MAGIC_COUNT:1},[[1,0,1],[0,"U",0],[1,0,1]]]},{RARITY:2,LFP_BUFF:0,LFP_DEBUFF:0,ATK_BUFF:0,ATK_DEBUFF:0,MAGIC:[{MAGIC_COUNT:1},[[0,1,0],[1,"U",1],[0,1,0]]]},{RARITY:3,LFP_BUFF:0,LFP_DEBUFF:0,ATK_BUFF:0,ATK_DEBUFF:0,MAGIC:[{MAGIC_COUNT:1},[[1,1,1,1,1],[1,0,0,0,1],[1,0,"U",0,1],[1,0,0,0,1],[1,1,1,1,1]]]},{RARITY:3,LFP_BUFF:0,LFP_DEBUFF:0,ATK_BUFF:0,ATK_DEBUFF:0,MAGIC:[{MAGIC_COUNT:1},[[1,0,1,0,1],[0,1,1,1,0],[1,1,"U",1,1],[0,1,1,1,0],[1,0,1,0,1]]]}];let M=h,m=[9,0],B=0,L=!1,C="",x=[],I=[],v=[];const K=()=>{I=M.reduce(((t,e)=>{e.RARITY;const n=90===e.RARITY?1:0===e.RARITY?80:e.RARITY;for(let l=0;l<n;l++)t.push(e);return t}),[]),n(14,v=shuffle(I))};K();const D=[{Rate:1,X:1},{Rate:4,X:3},{Rate:8,X:5}],G=({Rate_Param:t=1})=>{console.log("slot_exe_once"),(({Rate:t=1})=>{if(console.log("make_high_rate_slot"),console.log(D.filter((e=>e.Rate===t))[0].Rate),1!==t){if(t===D.filter((e=>e.Rate===t))[0].Rate){M=R.clone(h);const e=M.map((e=>(e.ATK_BUFF=e.ATK_BUFF*D.filter((e=>e.Rate===t))[0].X,e)));M=R.clone(e)}}else{M=R.clone(h);const t=M.map((t=>(t.ATK_BUFF=1*t.ATK_BUFF,t)));M=R.clone(t)}})({Rate:t}),K();const e=d?((t,e)=>{const n=v.filter((e=>e.RARITY===t)),l=n.slice(0,n.length-n.length*(e/100)),o=v.filter((e=>e.RARITY!==t)),r=l.concat(o);return shuffle(r)})(0,90):v,l=shuffle(e)[0];U-t<=0||(n(7,U-=t),n(1,f=R.append(l,f)),f.slice(-shuffle([2,3])[0]).every((t=>t.RARITY>=1))&&n(8,d=!0),!0===d&&(n(9,E+=1),n(8,d=!(E>=30)),n(9,E=E>=30?0:E)))},O=t=>{try{(t=>{const e=t.map((t=>t.map(((e,n)=>"U"===e?[n,t.indexOf(e)]:null)))).flat().filter(((t,e)=>null!==t))[0];return t.map(((t,e)=>t.map(((t,n)=>1===t?[e,n]:null)))).flat().filter((t=>null!==t)).map((t=>[t[0]-e[0],t[1]-e[1]]))})(t).forEach((t=>{const e=m[0]+t[0],l=m[1]+t[1];if(void 0===x[e]||void 0===x[e][l])return;if("GOL"===x[e][l][2]||"BLC"===x[e][l][2]||"NON"===x[e][l][2]||"USR"===x[e][l][2])return;const o="UNT_NUM_"+Number(x[e][l][2].NAME.replaceAll("UNT_","")).toString(),r=i[0].EQP.reduce(((t,e)=>t+e.ATK_BUFF),0)||0,F=i[0].ATK+r;if(n(6,N[o].LFP-=F,N),"background-color: #00FF00"===x[e][l][3]&&k({Y_X_Ary:[e,l],ms:200,Original_Color:N[o].LFP<=0?"#FFFFFF":"#00FF00",Color_0:"#FF0000",Color_1:"#FFFFFF"}),N[o].LFP<=0){n(2,c+=1),n(7,U+=(({Unt_Gld:t=0,Kill_Streak:e=0})=>(console.log(t,e),t*e))({Unt_Gld:N[o].GLD,Kill_Streak:c}));const t=[e,l];y(t[0],t[1]),n(13,x[t[0]][t[1]][3]="background-color: #FFFFFF",x),n(6,N=R.omit([o],N))}}))}catch(t){console.log(t)}},b=(t,e,n=!1)=>{const l=[[e,e-1],[e,e+1],[e-1,e],[e+1,e]];return n&&console.log(t,e,l),l},y=(t,e)=>{n(13,x[t][e][2]="NON",x),n(13,x[t][e][3]="background-color: #FFFFFF",x)},S=({Before_LFP:t=0,After_LFP:e=0,Damage:n=0})=>{"ON"===A&&alert("Before_LFP: "+t.toString()+" Damage: "+n.toString()+" After_LFP: "+e.toString()+" ")},k=({Y_X_Ary:t=[9,0],ms:e=200,Original_Color:l="#0000FF",Color_0:o="#0000FF",Color_1:r="#FFFFFF"})=>{const[c,F]=t,_=()=>{n(13,x[c][F][3]=`background-color: ${o}`,x)},s=()=>{n(13,x[c][F][3]=`background-color: ${r}`,x)};((t,e,n)=>{const l=t/1e3,o=(new Date).getTime();let r=0;const c=setInterval((()=>{((new Date).getTime()-o)/1e3>=l?clearInterval(c):r++%2==0?_():s()}),10)})(e),setTimeout((()=>{n(13,x[c][F][3]=`background-color: ${l}`,x)}),e)};function Y(t){n(2,c=0);const e={w:[-1,0],a:[0,-1],s:[1,0],d:[0,1],m:null};if(t.Magic)return l=t.Eqp_I,null!==i[0].EQP[l].MAGIC[0].MAGIC_COUNT&&n(5,i[0].EQP[l].MAGIC[0].MAGIC_COUNT-=1,i),O(t.Magic[1]),void Object.entries(N).map(((t,e)=>{Q(t[1].NAME)}));var l;const o=[m[0]+e[t.key][0],m[1]+e[t.key][1]];if("BLC"===x[o[0]][o[1]][2]&&(n(10,B+=1),y(o[0],o[1])),"USR"!==x[o[0]][o[1]][2]){if("GOL"===x[o[0]][o[1]][2]&&(n(11,L=!0),n(1,f=[]),document.removeEventListener("keypress",Y),setTimeout((()=>{W({when_mounted_time:!1,go_up:!0,when_died:!1})}),1e3)),!t.Magic){(()=>{"NON"===x[o[0]][o[1]][2]&&(n(13,x[o[0]][o[1]][2]="USR",x),n(13,x[m[0]][m[1]][2]="NON",x),n(13,x[o[0]][o[1]][3]="background-color: #0000FF",x),n(13,x[m[0]][m[1]][3]="background-color: #FFFFFF",x),m=o)})(),((t,e)=>{if("object"!==x[t][e][2]&&"UNT"!==x[t][e][2].TYPE)return;const l="UNT_NUM_"+Number(x[t][e][2].NAME.replaceAll("UNT_","")).toString(),o=i[0].EQP.reduce(((t,e)=>t+e.ATK_BUFF),0)||0,r=i[0].ATK+o;if(S({Before_LFP:N[l].LFP,After_LFP:N[l].LFP-r,Damage:r}),n(6,N[l].LFP-=r,N),k({Y_X_Ary:[t,e],ms:200,Original_Color:"#00FF00",Color_0:"#FF0000",Color_1:"#FFFFFF"}),N[l].LFP<=0){n(2,c+=1),n(7,U+=1);const o=[t,e];y(o[0],o[1]),n(13,x[o[0]][o[1]][3]="background-color: #FFFFFF",x),n(6,N=R.omit([l],N))}})(o[0],o[1])}Object.entries(N).map(((t,e)=>{Q(t[1].NAME)}))}}const $=()=>x.map((t=>t.filter((t=>"USR"===t[2])))).filter((t=>t.length>0))[0][0],Q=t=>{try{const e=t?Number(t.replaceAll("UNT_","")):0,l=$(),o=((t=0)=>{try{const e=t.toString(),n=(t.toString(),x.map(((t,e)=>t.map(((t,n)=>"object"==typeof t[2]?[t[2].NAME.replaceAll("UNT_",""),[e,n]]:null)))).flat().filter((t=>null!==t)).filter((t=>t[0]===e))[0][1]),[l,o]=n;return[l,o]}catch(t){console.log(t)}})(e);if(o[1]===l[1]&&o[0]===l[0]-1||o[1]===l[1]&&o[0]===l[0]+1||o[0]===l[0]&&o[0]===l[1]-1||o[0]===l[0]&&o[0]===l[1]+1)return void(t=>{k({Y_X_Ary:[$()[0],$()[1]],ms:200,Original_Color:"#0000FF",Color_0:"#FF0000",Color_1:"#FFFFFF"});const e="UNT_NUM_"+t.toString(),l=N[e].ATK;S({Before_LFP:i[0].LFP,After_LFP:i[0].LFP-l,Damage:l}),n(5,i[0].LFP-=l,i),i[0].LFP<=0&&(n(12,C="YOU DIED, GAME OVER"),n(3,u=0),n(10,B=0),setTimeout((()=>{W({when_mounted_time:!1,go_up:!1,when_died:!0})}),1e3))})(e);const r=b(o[0],o[1],!1);if(r.some((t=>"UNT"===x[t[0]][t[1]][2].TYPE))){((t,e)=>{e.forEach((e=>{const l="UNT_NUM_"+t.toString(),o="UNT_NUM_"+e.toString();n(6,N[o].RBP+=N[l].ATK,N),N[o].RBP>=N[o].BDP&&(console.log("BREED!!",t,o),n(6,N[o].RBP=0,N))}))})(e,r.filter((t=>"UNT"===x[t[0]][t[1]][2].TYPE)).map((t=>x[t[0]][t[1]][2].NAME.replaceAll("UNT_",""))).map((t=>Number(t))))}Math.floor(4*Math.random());const c=[[o[0],o[1]-1],[o[0],o[1]+1],[o[0]-1,o[1]],[o[0]+1,o[1]]];let F=shuffle(c);for(let t=0;t<F.length;t++){let l=F[t];"NON"===x[l[0]][l[1]][2]&&(y(o[0],o[1]),n(13,x[o[0]][o[1]][3]="background-color: #FFFFFF",x),n(13,x[l[0]][l[1]][2]=N["UNT_NUM_"+e],x),n(13,x[l[0]][l[1]][3]="background-color: #00FF00",x),F=[])}}catch(t){}},w=()=>{(()=>{let t=x.map((t=>t.filter((t=>"NON"===t[2])))).flat().map((t=>t.slice(0,2)));Object.entries(N).forEach(((e,l)=>{const o="UNT_NUM_"+l.toString(),r=shuffle(t)[0];t=t.filter((t=>t!==r)),n(13,x[r[0]][r[1]][2]=N[o],x),n(13,x[r[0]][r[1]][3]="background-color: #00FF00",x)}))})()},W=({when_mounted_time:t=!0,go_up:e=!1,when_died:l=!1})=>{n(13,x=R.xprod(R.range(0,10),R.range(0,10)).map((t=>t.concat(["BLC"]))).map((t=>t.concat(["background-color: #808080"])))),n(13,x=R.splitEvery(10,x)),n(13,x[9][0][2]="USR",x),n(13,x[9][0][3]="background-color: #0000FF",x),n(12,C=""),!0===l&&(s(),n(5,i[0].NAME=T[0].NAME,i),n(5,i[0].LFP=T[0].LFP,i),n(5,i[0].ATK=T[0].ATK,i),n(7,U=i[0].GOLD)),n(6,N={UNT_NUM_0:{TYPE:"UNT",NAME:"UNT_0",LFP:3,ATK:1,BDP:0,RBP:0},UNT_NUM_1:{TYPE:"UNT",NAME:"UNT_1",LFP:2,ATK:2,BDP:0,RBP:0},UNT_NUM_2:{TYPE:"UNT",NAME:"UNT_2",LFP:2,ATK:3,BDP:0,RBP:0},UNT_NUM_3:{TYPE:"UNT",NAME:"UNT_3",LFP:2,ATK:4,BDP:0,RBP:0},UNT_NUM_4:{TYPE:"UNT",NAME:"UNT_4",LFP:4,ATK:1,BDP:0,RBP:0},UNT_NUM_5:{TYPE:"UNT",NAME:"UNT_5",LFP:4,ATK:2,BDP:0,RBP:0},UNT_NUM_6:{TYPE:"UNT",NAME:"UNT_6",LFP:5,ATK:1,BDP:0,RBP:0},UNT_NUM_7:{TYPE:"UNT",NAME:"UNT_7",LFP:5,ATK:2,BDP:0,RBP:0},UNT_NUM_8:{TYPE:"UNT",NAME:"UNT_8",LFP:5,ATK:3,BDP:0,RBP:0},UNT_NUM_9:{TYPE:"UNT",NAME:"UNT_9",LFP:5,ATK:4,BDP:0,RBP:0},UNT_NUM_10:{TYPE:"UNT",NAME:"UNT_10",LFP:6,ATK:1,BDP:0,RBP:0},UNT_NUM_11:{TYPE:"UNT",NAME:"UNT_11",LFP:6,ATK:2,BDP:0,RBP:0},UNT_NUM_12:{TYPE:"UNT",NAME:"UNT_12",LFP:6,ATK:3,BDP:0,RBP:0},UNT_NUM_13:{TYPE:"UNT",NAME:"UNT_13",LFP:6,ATK:4,BDP:0,RBP:0},UNT_NUM_14:{TYPE:"UNT",NAME:"UNT_14",LFP:1,ATK:1,BDP:0,RBP:0},UNT_NUM_15:{TYPE:"UNT",NAME:"UNT_15",LFP:1,ATK:2,BDP:0,RBP:0},UNT_NUM_16:{TYPE:"UNT",NAME:"UNT_16",LFP:1,ATK:3,BDP:0,RBP:0}}),n(6,N={});let o={};if(!0===e){s(),F(),n(5,i[0].LFP+=10,i),n(3,u+=1);const t=()=>u+1,e=0,l=t()*a[e].LFP_Min,r=t()*a[e].LFP_Max,c=t()*a[e].ATK_Min,_=t()*a[e].ATK_Max;console.log(_),o={Repeat_Array_Num:1,Repeat_Array_Times:20,LFP_Range_Array:[l,r],ATK_Range_Array:[c,_]}}var r,c;n(6,N=(({Repeat_Array_Num:t=1,Repeat_Array_Times:e=20,LFP_Range_Array:n=[2,10],ATK_Range_Array:l=[1,3],GLD_Range_Array:o=[1,2],BDP_Rate:r=1})=>{const c={},F=({Range:t=[1,10]})=>{const e=t[0],n=t[1];return Math.floor(Math.random()*(n+1-e))+e};var _,s;return(_=t,s=e,R.repeat(_,s)).forEach(((t,e)=>{c["UNT_NUM_"+e.toString()]={TYPE:"UNT",NAME:"UNT_"+e.toString(),LFP:t*F({Range:n}),ATK:t*F({Range:l}),GLD:F({Range:o}),BDP:0,RBP:0},c["UNT_NUM_"+e.toString()].BDP=c["UNT_NUM_"+e.toString()].LFP*c["UNT_NUM_"+e.toString()].ATK*r})),c})(o)),c=9,n(13,x[r=0][c][2]="GOL",x),n(13,x[r][c][3]="background-color: #FFFF00",x),n(10,B=0),n(11,L=!1),m=[9,0],((t=80)=>{const e=x.map((t=>t.filter((t=>"BLC"===t[2])))).flat().length,n=Math.floor(e*(t/100));for(let t=0;t<n;t++){const t=[shuffle([0,1,2,3,4,5,6,7,8,9])[0],shuffle([0,1,2,3,4,5,6,7,8,9])[0]];"USR"!==x[t[0]][t[1]][2]&&"GOL"!==x[t[0]][t[1]][2]&&y(t[0],t[1])}})(),n(13,x[5][4][2]="NON",x),n(13,x[5][4][3]="background-color: #FFFFFF",x),n(13,x[5][6][2]="NON",x),n(13,x[5][6][3]="background-color: #FFFFFF",x),n(13,x[4][5][2]="NON",x),n(13,x[4][5][3]="background-color: #FFFFFF",x),n(13,x[6][5][2]="NON",x),n(13,x[6][5][3]="background-color: #FFFFFF",x),n(13,x[5][3][2]="NON",x),n(13,x[5][3][3]="background-color: #FFFFFF",x),n(13,x[5][7][2]="NON",x),n(13,x[5][7][3]="background-color: #FFFFFF",x),n(13,x[3][5][2]="NON",x),n(13,x[3][5][3]="background-color: #FFFFFF",x),n(13,x[7][5][2]="NON",x),n(13,x[7][5][3]="background-color: #FFFFFF",x),w(),document.addEventListener("keypress",Y)};p((async()=>{try{W({when_mounted_time:!0,go_up:!1,when_died:!1})}catch(t){console.log(t)}}));return t.$$.update=()=>{2&t.$$.dirty[0]&&f&&(({What:t=f,Any:e="RARITY",Asc_Desc:n="DESC"})=>{t=n?t.sort(((t,n)=>n[e]-t[e])):t.sort(((t,n)=>t[e]-n[e]))})({What:f,Any:"RARITY",Asc_Desc:"DESC"}),2097153&t.$$.dirty[0]&&l&&l.style.setProperty("--field-none",o),4194305&t.$$.dirty[0]&&l&&l.style.setProperty("--gacha-none",r)},[l,f,c,u,A,i,N,U,d,E,B,L,C,x,v,_,()=>{n(1,f=[]),F()},P,G,b,Y,o,r,function(){A=this.__value,n(4,A)},[[]],function(){A=this.__value,n(4,A)},(t,e)=>b(t,e,!0),(t,e)=>b(t,e,!0),()=>Y({key:"w"}),()=>Y({key:"a"}),()=>Y({key:"d"}),()=>Y({key:"s"}),(t,e)=>Y({key:"m",Magic:t.MAGIC,Eqp_I:e}),t=>_(t),()=>G({Rate_Param:1}),()=>G({Rate_Param:4}),()=>G({Rate_Param:8}),(t,e)=>P({Eqp:t,Eqp_Index:e}),function(t){g[t?"unshift":"push"]((()=>{l=t,n(0,l)}))}]}return new class extends O{constructor(t){super(),G(this,t,at,st,r,{},null,[-1,-1,-1,-1])}}({target:document.body})}();
//# sourceMappingURL=bundle.js.map
