(this["webpackJsonpreact-template"]=this["webpackJsonpreact-template"]||[]).push([[0],{59:function(e,t,n){},60:function(e,t,n){"use strict";n.r(t);var r,i,o,a,c,l,s,u,d,f,b=n(0),j=n.n(b),p=n(17),h=n.n(p),O=n(3),m=n(63),g=n(2),x=n(1),v=function(e){var t=e.children,n=e.href,r=e.self;return Object(x.jsx)("a",{href:n,target:r?"_self":"_blank",rel:"noreferrer","data-testid":"alink",children:t})},y=g.d.div(r||(r=Object(O.a)(["\n  position: absolute;\n  bottom: 0px;\n  width: 100%;\n\n  text-align: center;\n"]))),w=g.d.p(i||(i=Object(O.a)(["\n  font-size: 12px;\n  opacity: 0.6;\n"]))),k=g.d.div(o||(o=Object(O.a)(["\n  font-size: 12px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n"]))),E=g.d.div(a||(a=Object(O.a)(["\n  height: 1.2em;\n  width: 1px;\n  background-color: currentColor;\n  margin: 0 10px;\n"]))),I=Object(m.a)(new Date,"yyyy"),z=function(){return Object(x.jsxs)(y,{children:[Object(x.jsxs)(k,{children:[Object(x.jsx)(v,{href:"https://www.zekro.de/imprint",children:"Imprint"}),Object(x.jsx)(E,{}),Object(x.jsx)(v,{href:"https://www.zekro.de",children:"Homepage"}),Object(x.jsx)(E,{}),Object(x.jsx)(v,{href:"https://github.com/zekrotja/photolio",children:"GitHub"})]}),Object(x.jsxs)(w,{children:["\xa9 ",I," Ringo Hoffmann"]})]})},C=n(23),S=n(6),P=n(65),M="500px",R=g.d.div(c||(c=Object(O.a)(["\n  padding: 0 5px 25px 5px;\n  display: flex;\n  justify-content: center;\n\n  @media screen and (max-width: ",") {\n    flex-flow: column;\n\n    > * {\n      margin: 0 auto;\n    }\n  }\n"])),M),A=g.d.div(l||(l=Object(O.a)(["\n  cursor: pointer;\n\n  > * {\n    margin: 0;\n    font-family: 'Montserrat', sans-serif;\n  }\n\n  > h1 {\n    font-family: 'Montserrat', sans-serif;\n    font-weight: 600;\n    font-size: 52px;\n  }\n\n  > h2 {\n    font-weight: 300;\n    font-size: 14px;\n    letter-spacing: 0.25em;\n    text-transform: uppercase;\n  }\n"]))),B=g.d.div(s||(s=Object(O.a)(["\n  display: flex;\n  align-items: center;\n  margin-left: 50px;\n\n  @media screen and (max-width: ",") {\n    margin: 20px auto 10px auto;\n  }\n"])),M),H=Object(g.d)(C.b)(u||(u=Object(O.a)(["\n  position: relative;\n  font-family: 'Montserrat', sans-serif;\n  font-size: 18px;\n  text-transform: lowercase;\n  text-decoration: none;\n\n  margin-right: 20px;\n  &:last-child {\n    margin-right: 0px;\n  }\n\n  &::after {\n    content: '';\n    position: absolute;\n    bottom: -10px;\n    left: 0;\n    width: ","%;\n    margin-left: ","%;\n    height: 5px;\n    background-color: currentColor;\n    transition: all 0.2s ease;\n  }\n"])),(function(e){return"entering"===e.state||"entered"===e.state?100:0}),(function(e){return"exiting"===e.state?100:0})),T=function(e){var t=e.to,n=e.title,r=Object(S.f)();return Object(x.jsx)(P.a,{in:r.pathname===t,timeout:200,children:function(e){return Object(x.jsx)(H,{to:t,state:e,children:n})}})},D=function(){var e=Object(S.e)();return Object(x.jsxs)(R,{children:[Object(x.jsxs)(A,{onClick:function(){return e.push("/")},children:[Object(x.jsx)("h1",{children:"zekro"}),Object(x.jsx)("h2",{children:"Photography"})]}),Object(x.jsxs)(B,{children:[Object(x.jsx)(T,{to:"/",title:"Gallery"}),Object(x.jsx)(T,{to:"/about",title:"About"}),Object(x.jsx)(T,{to:"/contact",title:"Contact"})]})]})},L=g.d.div(d||(d=Object(O.a)(["\n  position: relative;\n  max-width: 1300px;\n  min-height: 100vh;\n  margin: 0 auto;\n  padding-top: 20px;\n  padding-bottom: 100px;\n"]))),V=n(34),F=n(11),N=n(14),U=function(){function e(){Object(F.a)(this,e)}return Object(N.a)(e,null,[{key:"get",value:function(e,t){var n=window.localStorage.getItem(e);return n?JSON.parse(n):t}},{key:"set",value:function(e,t){window.localStorage.setItem(e,JSON.stringify(t))}},{key:"remove",value:function(e){window.localStorage.removeItem(e)}}]),e}(),G=n(12),J=Object(b.createContext)((function(e){return console.error("attempted to set theme outside of a ThemeUpdateContext.Provider")})),Y=function(e){var t=e.children,n=e.theme,r=Object(b.useState)(n),i=Object(G.a)(r,2),o=i[0],a=i[1];return Object(x.jsx)(g.b,{theme:o,children:Object(x.jsx)(J.Provider,{value:a,children:t})})},_=["title","titleId"];function q(){return q=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},q.apply(this,arguments)}function W(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}function X(e,t){var n=e.title,r=e.titleId,i=W(e,_);return b.createElement("svg",q({xmlns:"http://www.w3.org/2000/svg",className:"h-5 w-5",viewBox:"0 0 20 20",fill:"currentColor",ref:t,"aria-labelledby":r},i),n?b.createElement("title",{id:r},n):null,f||(f=b.createElement("path",{fillRule:"evenodd",d:"M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z",clipRule:"evenodd"})))}var Z,K=b.forwardRef(X),Q=(n.p,["title","titleId"]);function $(){return $=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},$.apply(this,arguments)}function ee(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}function te(e,t){var n=e.title,r=e.titleId,i=ee(e,Q);return b.createElement("svg",$({xmlns:"http://www.w3.org/2000/svg",className:"h-5 w-5",viewBox:"0 0 20 20",fill:"currentColor",ref:t,"aria-labelledby":r},i),n?b.createElement("title",{id:r},n):null,Z||(Z=b.createElement("path",{d:"M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"})))}var ne,re,ie,oe,ae,ce=b.forwardRef(te),le=(n.p,g.d.div(ne||(ne=Object(O.a)(["\n  position: fixed;\n  top: 10px;\n  right: 10px;\n  z-index: 10;\n  cursor: pointer;\n  width: fit-content;\n  opacity: 0.25;\n  transition: opacity 0.2s ease;\n\n  &:hover {\n    opacity: 1;\n  }\n"])))),se=g.d.div(re||(re=Object(O.a)(["\n  position: absolute;\n  top: 0;\n  left: -20px;\n  opacity: ",";\n  transition: all 0.2s ease;\n\n  > svg {\n    width: 20px;\n  }\n"])),(function(e){return"entering"===e.state||"entered"===e.state?1:0})),ue=function(){var e=Object(b.useContext)(g.a),t=Object(b.useContext)(J);return Object(x.jsxs)(le,{onClick:function(){return function(){var n=!e.dark;t(Object(V.a)(Object(V.a)({},e),{},{dark:n})),U.set("themeOverride",n)}()},children:[Object(x.jsx)(P.a,{in:e.dark,timeout:200,children:function(e){return Object(x.jsx)(se,{state:e,children:Object(x.jsx)(K,{})})}}),Object(x.jsx)(P.a,{in:!e.dark,timeout:200,children:function(e){return Object(x.jsx)(se,{state:e,children:Object(x.jsx)(ce,{})})}})]})},de=g.d.div(ie||(ie=Object(O.a)(["\n  padding: ",";\n"])),(function(e){var t;return null!==(t=e.padding)&&void 0!==t?t:"0 5px"})),fe=n(64),be=g.d.div(oe||(oe=Object(O.a)(["\n  > * {\n    opacity: 0.7;\n    &:hover {\n      opacity: 1;\n    }\n\n    transition: all 0.2s ease;\n\n    margin-right: 10px;\n    &::last-child {\n      margin-right: 0;\n    }\n\n    > svg {\n      width: 30px;\n    }\n  }\n"]))),je=["title","titleId"];function pe(){return pe=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},pe.apply(this,arguments)}function he(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}function Oe(e,t){var n=e.title,r=e.titleId,i=he(e,je);return b.createElement("svg",pe({role:"img",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg",fill:"currentColor",ref:t,"aria-labelledby":r},i),void 0===n?b.createElement("title",{id:r},"DeviantArt"):n?b.createElement("title",{id:r},n):null,ae||(ae=b.createElement("path",{d:"M19.207 4.794l.23-.43V0H15.07l-.436.44-2.058 3.925-.646.436H4.58v5.993h4.04l.36.436-4.175 7.98-.24.43V24H8.93l.436-.44 2.07-3.925.644-.436h7.35v-5.993h-4.05l-.36-.438 4.186-7.977z"})))}var me,ge=b.forwardRef(Oe),xe=(n.p,["title","titleId"]);function ve(){return ve=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},ve.apply(this,arguments)}function ye(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}function we(e,t){var n=e.title,r=e.titleId,i=ye(e,xe);return b.createElement("svg",ve({role:"img",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg",fill:"currentColor",ref:t,"aria-labelledby":r},i),void 0===n?b.createElement("title",{id:r},"GitHub"):n?b.createElement("title",{id:r},n):null,me||(me=b.createElement("path",{d:"M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"})))}var ke,Ee=b.forwardRef(we),Ie=(n.p,["title","titleId"]);function ze(){return ze=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},ze.apply(this,arguments)}function Ce(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}function Se(e,t){var n=e.title,r=e.titleId,i=Ce(e,Ie);return b.createElement("svg",ze({role:"img",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg",fill:"currentColor",ref:t,"aria-labelledby":r},i),void 0===n?b.createElement("title",{id:r},"Instagram"):n?b.createElement("title",{id:r},n):null,ke||(ke=b.createElement("path",{d:"M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"})))}var Pe,Me=b.forwardRef(Se),Re=(n.p,["title","titleId"]);function Ae(){return Ae=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},Ae.apply(this,arguments)}function Be(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}function He(e,t){var n=e.title,r=e.titleId,i=Be(e,Re);return b.createElement("svg",Ae({role:"img",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg",fill:"currentColor",ref:t,"aria-labelledby":r},i),void 0===n?b.createElement("title",{id:r},"E-Mail"):n?b.createElement("title",{id:r},n):null,Pe||(Pe=b.createElement("path",{d:"M15.61 12c0 1.99-1.62 3.61-3.61 3.61-1.99 0-3.61-1.62-3.61-3.61 0-1.99 1.62-3.61 3.61-3.61 1.99 0 3.61 1.62 3.61 3.61M12 0C5.383 0 0 5.383 0 12s5.383 12 12 12c2.424 0 4.761-.722 6.76-2.087l.034-.024-1.617-1.879-.027.017A9.494 9.494 0 0 1 12 21.54c-5.26 0-9.54-4.28-9.54-9.54 0-5.26 4.28-9.54 9.54-9.54 5.26 0 9.54 4.28 9.54 9.54a9.63 9.63 0 0 1-.225 2.05c-.301 1.239-1.169 1.618-1.82 1.568-.654-.053-1.42-.52-1.426-1.661V12A6.076 6.076 0 0 0 12 5.93 6.076 6.076 0 0 0 5.93 12 6.076 6.076 0 0 0 12 18.07a6.02 6.02 0 0 0 4.3-1.792 3.9 3.9 0 0 0 3.32 1.805c.874 0 1.74-.292 2.437-.821.719-.547 1.256-1.336 1.553-2.285.047-.154.135-.504.135-.507l.002-.013c.175-.76.253-1.52.253-2.457 0-6.617-5.383-12-12-12"})))}var Te,De=b.forwardRef(He),Le=(n.p,["title","titleId"]);function Ve(){return Ve=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},Ve.apply(this,arguments)}function Fe(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}function Ne(e,t){var n=e.title,r=e.titleId,i=Fe(e,Le);return b.createElement("svg",Ve({role:"img",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg",fill:"currentColor",ref:t,"aria-labelledby":r},i),void 0===n?b.createElement("title",{id:r},"Spotify"):n?b.createElement("title",{id:r},n):null,Te||(Te=b.createElement("path",{d:"M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"})))}var Ue,Ge=b.forwardRef(Ne),Je=(n.p,["title","titleId"]);function Ye(){return Ye=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},Ye.apply(this,arguments)}function _e(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}function qe(e,t){var n=e.title,r=e.titleId,i=_e(e,Je);return b.createElement("svg",Ye({role:"img",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg",fill:"currentColor",ref:t,"aria-labelledby":r},i),void 0===n?b.createElement("title",{id:r},"TikTok"):n?b.createElement("title",{id:r},n):null,Ue||(Ue=b.createElement("path",{d:"M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"})))}var We,Xe=b.forwardRef(qe),Ze=(n.p,["title","titleId"]);function Ke(){return Ke=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},Ke.apply(this,arguments)}function Qe(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}function $e(e,t){var n=e.title,r=e.titleId,i=Qe(e,Ze);return b.createElement("svg",Ke({role:"img",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg",fill:"currentColor",ref:t,"aria-labelledby":r},i),void 0===n?b.createElement("title",{id:r},"Twitter"):n?b.createElement("title",{id:r},n):null,We||(We=b.createElement("path",{d:"M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"})))}var et,tt=b.forwardRef($e),nt=(n.p,["title","titleId"]);function rt(){return rt=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},rt.apply(this,arguments)}function it(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}function ot(e,t){var n=e.title,r=e.titleId,i=it(e,nt);return b.createElement("svg",rt({role:"img",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg",fill:"currentColor",ref:t,"aria-labelledby":r},i),void 0===n?b.createElement("title",{id:r},"Unsplash"):n?b.createElement("title",{id:r},n):null,et||(et=b.createElement("path",{d:"M7.5 6.75V0h9v6.75h-9zm9 3.75H24V24H0V10.5h7.5v6.75h9V10.5z"})))}var at,ct=b.forwardRef(ot),lt=(n.p,["title","titleId"]);function st(){return st=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},st.apply(this,arguments)}function ut(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}function dt(e,t){var n=e.title,r=e.titleId,i=ut(e,lt);return b.createElement("svg",st({role:"img",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg",fill:"currentColor",ref:t,"aria-labelledby":r},i),void 0===n?b.createElement("title",{id:r},"YouTube"):n?b.createElement("title",{id:r},n):null,at||(at=b.createElement("path",{d:"M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"})))}var ft,bt=b.forwardRef(dt),jt=(n.p,["title","titleId"]);function pt(){return pt=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},pt.apply(this,arguments)}function ht(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}function Ot(e,t){var n=e.title,r=e.titleId,i=ht(e,jt);return b.createElement("svg",pt({role:"img",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg",fill:"currentColor",ref:t,"aria-labelledby":r},i),void 0===n?b.createElement("title",{id:r},"Discord"):n?b.createElement("title",{id:r},n):null,ft||(ft=b.createElement("path",{d:"M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"})))}var mt,gt,xt,vt,yt,wt,kt,Et,It,zt,Ct,St,Pt,Mt,Rt,At,Bt,Ht,Tt,Dt=b.forwardRef(Ot),Lt=(n.p,function(){return Object(x.jsx)(v,{href:"mailto:contact@zekro.de",children:Object(x.jsx)(De,{})})}),Vt=function(){return Object(x.jsx)(v,{href:"https://instagram.com/zekrotja",children:Object(x.jsx)(Me,{})})},Ft=function(){return Object(x.jsx)(v,{href:"https://unsplash.com/@zekro",children:Object(x.jsx)(ct,{})})},Nt=function(){return Object(x.jsx)(v,{href:"https://deviantart.com/zekrotja",children:Object(x.jsx)(ge,{})})},Ut=function(){return Object(x.jsx)(v,{href:"https://twitter.com/zekrotja",children:Object(x.jsx)(tt,{})})},Gt=function(){return Object(x.jsx)(v,{href:"https://youtube.com/zekrommaster110",children:Object(x.jsx)(bt,{})})},Jt=function(){return Object(x.jsx)(v,{href:"https://github.com/zekrotja",children:Object(x.jsx)(Ee,{})})},Yt=function(){return Object(x.jsx)(v,{href:"https://open.spotify.com/user/zekrotja",children:Object(x.jsx)(Ge,{})})},_t=function(){return Object(x.jsx)(v,{href:"https://tiktok.com/@zekrotja",children:Object(x.jsx)(Xe,{})})},qt=function(){return Object(x.jsx)(v,{href:"https://discord.zekro.de",children:Object(x.jsx)(Dt,{})})},Wt=g.d.div(mt||(mt=Object(O.a)(["\n  background-image: url(",");\n  background-position: center;\n  background-size: cover;\n  width: 50%;\n  max-height: 60vh;\n  aspect-ratio: 500 / 590;\n  max-width: 500px;\n  float: left;\n  margin: 5px 40px 20px 0;\n\n  @media screen and (max-width: ",") {\n    float: unset;\n    width: 100%;\n    aspect-ratio: 500 / 400;\n    background-position-y: 25%;\n    max-height: unset;\n  }\n"])),(function(e){return e.url}),M),Xt=g.d.div(gt||(gt=Object(O.a)(["\n  text-align: justify;\n  padding: 0 50px;\n\n  > img {\n    width: 50%;\n    max-width: 500px;\n    float: left;\n    margin: 5px 40px 20px 0;\n  }\n"]))),Zt=Object(fe.a)(new Date(1998,12,12),{roundingMethod:"floor"}),Kt=function(){return Object(x.jsx)(de,{children:Object(x.jsxs)(Xt,{children:[Object(x.jsx)(Wt,{url:"assets/avatar.jpg"}),Object(x.jsx)("h2",{children:"Hey \ud83d\udc4b"}),Object(x.jsxs)("p",{children:["Thank you for being interested in my work! My name is Ringo (but I'm also known as zekro) and I'm ",Zt," old. I'm actually working as a full-stack developer in germany, but in the middle of 2021, I discovered photography as another passion of mine."]}),Object(x.jsxs)("p",{children:["Years before, I was working a lot on digital design and web video production. I created personal web designs for friends of mine (feel free to discover some of them on my"," ",Object(x.jsx)(v,{href:"https://www.deviantart.com/zekrotja",children:"DeviantArt profile"}),"). Also, all graphical designs for my"," ",Object(x.jsx)(v,{href:"https://youtube.com/zekrommaster110",children:"YouTube channel"})," ","are completely self-made."]}),Object(x.jsx)("p",{children:"Now, I primarily focus on expressing myself, my feelings and my perspectives in photography and photo editing. As you can see in my Work, I'm mainly interested in street photography but I am really excited to discover and getting into more topics like portrait, car, architecture and wildlife photography in the future."}),Object(x.jsx)("h2",{children:"Get to know me \u2709\ufe0f"}),Object(x.jsxs)(be,{children:[Object(x.jsx)(Lt,{}),Object(x.jsx)(Vt,{}),Object(x.jsx)(Ft,{}),Object(x.jsx)(Nt,{}),Object(x.jsx)(Ut,{}),Object(x.jsx)(Gt,{}),Object(x.jsx)(Jt,{}),Object(x.jsx)(Yt,{}),Object(x.jsx)(_t,{})]})]})})},Qt=g.d.span(xt||(xt=Object(O.a)(["\n  font-family: 'Source Code Pro', monospace;\n  font-weight: 400;\n  background-color: rgba(\n    ","\n  );\n  padding: 1px 5px;\n"])),(function(e){return e.theme.dark?"255, 255, 255, 25%":"0, 0, 0, 10%"})),$t=g.d.div(vt||(vt=Object(O.a)(["\n  padding: 0 20px;\n"]))),en=g.d.div(yt||(yt=Object(O.a)(["\n  padding-bottom: 30px;\n  &:last-child {\n    padding-bottom: 0px;\n  }\n"]))),tn=function(){return Object(x.jsxs)(en,{children:[Object(x.jsx)("h1",{children:"Feel free to contact me \ud83d\udceb"}),Object(x.jsx)("p",{children:"Just send me a casual DM on instagram or twitter to get in touch with me."}),Object(x.jsxs)("p",{children:["Alternatively, you can also join my Discord and DM me there. My Discord Tag is ",Object(x.jsx)(Qt,{children:"zekro#0001"}),"."]}),Object(x.jsxs)(be,{children:[Object(x.jsx)(Ut,{}),Object(x.jsx)(Vt,{}),Object(x.jsx)(qt,{})]}),Object(x.jsxs)("p",{children:["If you really want, you can also send me a mail to"," ",Object(x.jsx)(Qt,{children:"contact@zekro.de"}),", but I might be slow to respond. \ud83d\ude05"]}),Object(x.jsx)(be,{children:Object(x.jsx)(Lt,{})})]})},nn=function(){return Object(x.jsxs)(en,{children:[Object(x.jsx)("h1",{children:"Content Usage \ud83d\uddbc\ufe0f"}),Object(x.jsx)("p",{children:"Generally, you are completely allowed to use all of my content for non-public personal use (wallpaper, wallprint, ...)."}),Object(x.jsxs)("p",{children:["You are also allowed to use my content publicly in your own creations, your page, applicatrion or social media"," ",Object(x.jsx)("strong",{children:"if you give proper credits to me"}),". This includes my name (",Object(x.jsx)(Qt,{children:"Ringo Hoffmann"}),") as well as a link to my web page (",Object(x.jsx)(Qt,{children:"zekro.de"}),") either in the ",Object(x.jsx)(Qt,{children:"About"})," section of your web page / application or adjacent to the content post, for example in the instagram image description or tweet content."]}),Object(x.jsx)("p",{children:"If you want to use my work for any commercial or advertising application, please contact me so we can negotiate a deal together. \ud83d\ude09"})]})},rn=function(){return Object(x.jsx)(de,{children:Object(x.jsxs)($t,{children:[Object(x.jsx)(tn,{}),Object(x.jsx)(nn,{})]})})},on=n(42),an=Object(g.d)(on.a)(wt||(wt=Object(O.a)(["\n  position: absolute !important;\n  top: 0;\n  left: 0;\n  transition: opacity 0.25s ease;\n  opacity: ",";\n  cursor: ",";\n"])),(function(e){return"exited"===e.state?0:1}),(function(e){return e.clickable?"pointer":"auto"})),cn=g.d.div(kt||(kt=Object(O.a)(["\n  position: relative;\n  cursor: pointer;\n\n  &:hover #hover-container {\n    opacity: 1;\n    pointer-events: all;\n  }\n"]))),ln=g.d.div(Et||(Et=Object(O.a)(["\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  opacity: 0;\n  pointer-events: none;\n  transition: opacity 0.2s ease;\n"]))),sn=function(e){var t=e.children,n=e.image,r=e.imageURL,i=e.height,o=e.width,a=e.onClick,c=Object(b.useState)(!1),l=Object(G.a)(c,2),s=l[0],u=l[1],d=i||"number"!==typeof o?null:Math.floor(o*(1/n.dimensions.ratio)),f=o||"number"!==typeof o?null:Math.floor(o*n.dimensions.ratio);return Object(x.jsxs)(cn,{onClick:function(){return null===a||void 0===a?void 0:a.call(undefined,n.id)},children:[Object(x.jsx)("img",{src:r,width:o,height:i,onLoad:function(){return u(!0)},alt:""}),Object(x.jsx)(P.a,{in:!s,timeout:0,children:function(e){var t,r;return Object(x.jsx)(an,{hash:n.blurhash.hash,width:null!==(t=null!==o&&void 0!==o?o:f)&&void 0!==t?t:"100%",height:null!==(r=null!==i&&void 0!==i?i:d)&&void 0!==r?r:"100%",resolutionX:n.blurhash.components.width,resolutionY:n.blurhash.components.height,state:e,clickable:!!a})}}),t&&Object(x.jsx)(ln,{id:"hover-container",children:t})]})},un=null!==(It="https://dvbkeaxv2fqwj.cloudfront.net")?It:"/api",dn=function(){function e(){Object(F.a)(this,e)}return Object(N.a)(e,null,[{key:"list",value:function(){return window.fetch("".concat(un,"/images")).then((function(e){return e.json()}))}},{key:"getMeta",value:function(e){return window.fetch("".concat(un,"/images/").concat(e,"/meta")).then((function(e){return e.json()}))}},{key:"getImageSource",value:function(e){return"".concat(un,"/images/").concat(e)}},{key:"getThumbnailSource",value:function(e,t){return"".concat(un,"/images/").concat(e,"/thumbnail?width=").concat(t)}}]),e}(),fn=g.d.div(zt||(zt=Object(O.a)(["\n  margin-top: 20px;\n  text-align: center;\n  font-family: 'Montserrat', sans-serif;\n\n  > p {\n    margin: 0 0 10px 0;\n  }\n"]))),bn=g.d.p(Ct||(Ct=Object(O.a)(["\n  font-size: 14px;\n  ","\n  ","\n"])),(function(e){return e.light?"opacity: 0.5;":""}),(function(e){return e.italic?"font-style: italic;":""})),jn=function(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];return n.filter((function(e){return!!e})).join(e)},pn=function(){var e,t,n,r,i=Object(b.useContext)(yn);return Object(x.jsxs)(fn,{children:[i.exif&&Object(x.jsxs)("div",{children:[Object(x.jsxs)("p",{children:[jn(" ",i.exif.bodymake,i.exif.bodymodel),"\xa0with\xa0",jn(" ",i.exif.lensmake,i.exif.lensmodel)]}),Object(x.jsx)("p",{children:jn(" \u2014 ",(n="ISO ",r=i.exif.iso,r?"".concat(n).concat(r):void 0),i.exif.fstop,i.exif.exposuretime)})]})||Object(x.jsx)(bn,{italic:!0,light:!0,children:"No exif data existent."}),Object(x.jsx)(bn,{children:Object(m.a)(new Date(null!==(e=null===(t=i.exif)||void 0===t?void 0:t.taken)&&void 0!==e?e:i.timestamp),"eeee, do LLLL yyyy \u2014 HH:MM:SS O")})]})},hn=function(){function e(){Object(F.a)(this,e)}return Object(N.a)(e,null,[{key:"backgroundColor",value:function(e){return e?"#0f0f0f":"white"}},{key:"textColor",value:function(e){return e?"white":"black"}}]),e}(),On=g.d.button(St||(St=Object(O.a)(["\n  z-index: 1;\n  position: relative;\n  padding: 5px 10px;\n  border: solid 1px ",";\n  font-family: 'Montserrat', sans-serif;\n  color: ",";\n  cursor: pointer;\n  background: ",";\n  transition: all 0.2s ease;\n\n  &:hover {\n    color: ",";\n\n    &::after {\n      height: 100%;\n    }\n  }\n\n  &::after {\n    content: '';\n    position: absolute;\n    bottom: 0;\n    left: 0;\n    background-color: ",";\n    opacity: 0.75;\n    width: 100%;\n    height: 0%;\n    z-index: -1;\n    overflow: hidden;\n    transition: all 0.2s ease;\n  }\n"])),(function(e){return hn.backgroundColor(!e.theme.dark)}),(function(e){return hn.textColor(e.theme.dark)}),(function(e){return e.nbg?"none":hn.backgroundColor(e.theme.dark)}),(function(e){return hn.textColor(!e.theme.dark)}),(function(e){return hn.backgroundColor(!e.theme.dark)})),mn=g.d.div(Pt||(Pt=Object(O.a)(["\n  width: 100%;\n  padding: 10px;\n\n  > * {\n    margin-right: 10px;\n\n    &:last-child {\n      margin-right: 0px;\n    }\n  }\n"]))),gn=function(){var e=Object(b.useContext)(yn);return Object(x.jsx)(mn,{children:Object(x.jsx)(On,{onClick:function(){window.open(dn.getImageSource(e.id),"_blank")},children:"Open original Image"})})},xn=Object(g.d)(sn)(Mt||(Mt=Object(O.a)(["\n  width: 100%;\n"]))),vn=Object(g.d)(de)(Rt||(Rt=Object(O.a)(["\n  margin-bottom: 50px;\n"]))),yn=Object(b.createContext)({}),wn=function(){var e=Object(S.g)(),t=Object(b.useState)(),n=Object(G.a)(t,2),r=n[0],i=n[1];return Object(b.useEffect)((function(){dn.getMeta(e.params.id).then((function(e){return i(e)}))}),[e,i]),Object(x.jsx)(vn,{children:r&&Object(x.jsx)(yn.Provider,{value:r,children:Object(x.jsxs)("div",{children:[Object(x.jsx)(xn,{image:r,imageURL:dn.getImageSource(r.id),width:"100%",children:Object(x.jsx)(gn,{})}),Object(x.jsx)(pn,{})]})})})},kn=n(43),En=n(41),In=function(){for(var e={default:5},t=1;t<=5;t++)e[260*t+20]=t-1;return e}(),zn=g.d.div(At||(At=Object(O.a)(["\n  display: flex;\n  flex-direction: column;\n  gap: 1em;\n  align-items: center;\n  padding: 0 1em;\n"]))),Cn=g.d.div(Bt||(Bt=Object(O.a)(["\n  width: fit-content;\n\n  > h2 {\n    opacity: 0.6;\n    font-weight: 300;\n    font-size: 1.2rem;\n  }\n"]))),Sn=Object(g.d)(En.a)(Ht||(Ht=Object(O.a)(["\n  display: flex;\n  justify-content: start;\n\n  > div {\n    width: fit-content !important;\n\n    > * {\n      margin: ","px;\n    }\n  }\n"])),5),Pn=function(){var e=Object(b.useState)(),t=Object(G.a)(e,2),n=t[0],r=t[1],i=Object(S.e)();Object(b.useEffect)((function(){dn.list().then((function(e){return r(function(e){var t={},n=[];e.forEach((function(e){var r,i=null!==(r=e.group)&&void 0!==r?r:"";i in t?t[i].push(e):(n.push(i),t[i]=[e])}));var r=n.map((function(e){return[e,t[e]]})),i=r.findIndex((function(e){var t=Object(G.a)(e,2),n=t[0];return t[1],""===n}));return i>-1&&r.push.apply(r,Object(kn.a)(r.splice(i,1))),r}(e))}))}),[]);var o=null===n||void 0===n?void 0:n.map((function(e){var t=Object(G.a)(e,2),n=t[0],r=t[1];return Object(x.jsxs)(Cn,{children:[Object(x.jsx)("h2",{children:n||Object(x.jsx)(x.Fragment,{children:"\xa0"})}),Object(x.jsx)(Sn,{className:"",breakpointCols:In,children:r.map((function(e){return Object(x.jsx)(sn,{image:e,width:250,imageURL:dn.getThumbnailSource(e.id,250),onClick:function(e){return i.push("/images/".concat(e))}},e.id)}))})]},n)}));return Object(x.jsx)(zn,{children:o||Object(x.jsx)(x.Fragment,{})})},Mn=Object(g.c)(Tt||(Tt=Object(O.a)(["\n  * {\n    box-sizing: border-box;\n  }\n\n  body {\n    background-color: ",";\n    color: ",";\n\n    a {\n      color: ",";\n    }\n  }\n\n  h1, h2, h3, h4, h5 {\n    font-family: 'Montserrat', sans-serif;\n    font-weight: 600;\n  }\n"])),(function(e){return hn.backgroundColor(e.theme.dark)}),(function(e){return hn.textColor(e.theme.dark)}),(function(e){return hn.textColor(e.theme.dark)})),Rn={dark:U.get("themeOverride",window.matchMedia("(prefers-color-scheme: dark)").matches)};var An=function(){return Object(x.jsx)("div",{children:Object(x.jsxs)(Y,{theme:Rn,children:[Object(x.jsx)(ue,{}),Object(x.jsx)(C.a,{children:Object(x.jsxs)(L,{children:[Object(x.jsx)(D,{}),Object(x.jsx)(S.a,{exact:!0,path:"/",component:Pn}),Object(x.jsx)(S.a,{exact:!0,path:"/about",component:Kt}),Object(x.jsx)(S.a,{exact:!0,path:"/contact",component:rn}),Object(x.jsx)(S.a,{exact:!0,path:"/images/:id",component:wn}),Object(x.jsx)(z,{})]})}),Object(x.jsx)(Mn,{})]})})},Bn=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,66)).then((function(t){var n=t.getCLS,r=t.getFID,i=t.getFCP,o=t.getLCP,a=t.getTTFB;n(e),r(e),i(e),o(e),a(e)}))};n(59);h.a.render(Object(x.jsx)(j.a.StrictMode,{children:Object(x.jsx)(An,{})}),document.getElementById("root")),Bn(console.table)}},[[60,1,2]]]);
//# sourceMappingURL=main.5661ff3a.chunk.js.map