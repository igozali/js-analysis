/* Copyright 2010 Google */ (function(){var c=true,f=false,g=parseInt,h=window,i=chrome,j="length",l="prototype",m="replace",p="save";var r=q("(function(){({{$code}})();})();",{code:h.injection.toString()}),s=q("(function(){({{$code}})();})();",{code:h.injector.toString()});delete h.injector;delete h.injection;function t(a,b,d,e){b={pageLang:b,userLang:d,autoTrans:e};b.content=u(q(r,b));i.tabs.executeScript(a,{code:q(s,b)})}function v(a){var b={noEvents:c,content:u('window["_GOOG_TRANS_EXT_VER"] = "1";')};i.tabs.executeScript(a,{code:q(s,b)})}function w(a){this.t=a;this.f=this.n=f}function x(a){a.f=c}
function y(a,b,d){if(!(a.n||a.f)){a.n=c;a.u=b.url;a.l=d||"page_load";a.o="";z(a)}}function z(a){navigator.platform.toLowerCase().indexOf("win")==0?i.tabs.detectLanguage(a.t,A(a.m,a)):a.m("und_non_win")}w[l].m=function(a){if(!this.f){if(!a||a=="und"||a=="und_non_win"||a.match("invalid"))a="auto";this.o=a;B(this)}};function B(a){i.i18n.getAcceptLanguages(A(a.r,a))}w[l].r=function(a){if(!this.f){a||(a=[]);this.e=a;C(this)}};
function C(a){for(var b=G,d=!!(b.targetLang()||a.e[0]),e=a.o!="auto",n=H(b.targetLang()||a.e[0]||"en"),k=H(a.o),D={},o=0;o<a.e[j];++o)D[H(a.e[o])]=c;o=f;if(d)if(a.l=="page_load"&&b.autoTrans()){if(b.autoTransUrls().has(a.u)||e&&n!=k&&b.autoTransLangs().has(k))o=c}else if(a.l=="user_click")if(e&&n!=k)o=c;var E=c,F=I();if(a.l=="page_load"&&!o)if(!b.autoDisplay()||!e||!d||n==k||D[k]||b.disabledLangs().has(k)||b.disabledUrls().has(a.u)||F[0]*1E3+F[1]>=4001)E=f;E&&t(a.t,k,n,o);a.n=f}
function J(){this.c={}}J[l].h=function(a,b,d){this.c[a]||(this.c[a]=new w(a));y(this.c[a],b,d);v(a)};J[l].detach=function(a){if(this.c[a]){x(this.c[a]);delete this.c[a]}};function K(a,b){this.d=a;this.p=b}K[l].add=function(a){this.d[a]=c;this.p[p]()};K[l].remove=function(a){delete this.d[a];this.p[p]()};K[l].g=function(){var a=[];for(var b in this.d)this.d[b]&&a.push(b);return a};K[l].has=function(a){return!!this.d[a]};function L(a,b){this.b=a;this.q=b}
L[l].add=function(a,b){this.b.push({type:a,pattern:b});this.q[p]()};L[l].remove=function(a){this.b.splice(a,1);this.q[p]()};L[l].i=function(){for(var a=[],b=0;b<this.b[j];++b)a[b]={type:this.b[b].type,pattern:this.b[b].pattern};return a};L[l].has=function(a){for(var b=0;b<this.b[j];++b){var d=this.b[b];if(d.type=="re")try{if(a.match(d.pattern))return c}catch(e){}else if(a.indexOf(d.pattern)>=0)return c}return f};function M(){this.noSave=f;this.a={};N(this)}
function O(a,b,d){if(d){var e=new d(a.a[b],a);a[b]=function(){return e}}else{var n=a;a[b]=function(){return n.a[b]};a["set_"+b]=function(k){n.a[b]=k;n[p]()}}}
function N(a){var b=localStorage.getItem("user_options"),d={targetLang:"",autoDisplay:c,disabledLangs:{},disabledUrls:[],autoTrans:f,autoTransLangs:{},autoTransUrls:[]};if(b){a.a=JSON.parse(b);for(var e in d)e in a.a||(a.a[e]=d[e])}else a.a=d;a[p]();O(a,"targetLang");O(a,"autoDisplay");O(a,"autoTrans");O(a,"disabledLangs",K);O(a,"disabledUrls",L);O(a,"autoTransLangs",K);O(a,"autoTransUrls",L)}M[l].save=function(){this.noSave||localStorage.setItem("user_options",JSON.stringify(this.a));this.s&&this.s()};
M[l].j=function(){var a=new M;a.noSave=c;return a};M[l].assign=function(a){a.noSave=f;a[p]();a.noSave=c;N(this)};M[l].k=function(a){this.s=a};var P=new J,G=new M;function Q(){return P}function R(){return G}S(Q,"translate.getTranslateManager");T(J,"attach",J[l].h);T(J,"detach",J[l].detach);S(R,"translate.getUserOptions");T(M,"save",M[l][p]);T(M,"clone",M[l].j);T(M,"assign",M[l].assign);T(M,"setOnSave",M[l].k);T(L,"add",L[l].add);T(L,"remove",L[l].remove);T(L,"list",L[l].i);T(L,"has",L[l].has);
T(K,"add",K[l].add);T(K,"remove",K[l].remove);T(K,"list",K[l].g);T(K,"has",K[l].has);function S(a,b){b=b.split(".");for(var d=h,e=0;e<b[j]-1;++e)d=d[b[e]]||(d[b[e]]={});d[b[b[j]-1]]=a}function T(a,b,d){a[l][b]=d}function q(a,b){return a[m](/\{\{\$.*?\}\}/g,function(d){d=d.substr(3,d[j]-5);return String(b[d])||""})}function u(a){return a[m](/\\/g,"\\\\")[m](/'/g,"\\'")[m](/"/g,'\\"')[m](/\n/g,"\\n")}
function H(a){a=String(a).toLowerCase()[m]("_","-");if(a=="zh-cn")return"zh-CN";else if(a=="zh-tw")return"zh-TW";var b=a.indexOf("-");a=b>=0?a.substring(0,b):a;if(a=="zh")return"zh-CN";return a}function A(a,b){b||(b=h);if(arguments[j]>2){var d=Array[l].slice.call(arguments,2);return function(){var e=Array[l].slice.call(arguments);Array[l].unshift.apply(e,d);return a.apply(b,e)}}else return function(){return a.apply(b,arguments)}}
function I(){var a=navigator.userAgent.match(/Chrome\/(\d+)\.(\d+).(\d+)?/),b=[0,0,0];if(a){b[0]=g(a[1],10)||0;b[1]=g(a[2],10)||0;b[2]=g(a[3],10)||0}return b};})();
