(this["webpackJsonpreact-template"]=this["webpackJsonpreact-template"]||[]).push([[0],{52:function(n,t,e){},53:function(n,t,e){"use strict";e.r(t);var i,c,a,o,r,s,l,u,b,j,d,f,h,x,p,m=e(0),O=e.n(m),g=e(14),v=e.n(g),y=e(3),w=e(18),k=e(2),S=e(58),M=e(4),C=e(1),L="500px",z=M.b.div(i||(i=Object(y.a)(["\n  padding: 0 5px 25px 5px;\n  display: flex;\n  justify-content: center;\n\n  @media screen and (max-width: ",") {\n    flex-flow: column;\n\n    > * {\n      margin: 0 auto;\n    }\n  }\n"])),L),I=M.b.div(c||(c=Object(y.a)(["\n  cursor: pointer;\n\n  > * {\n    margin: 0;\n    font-family: 'Montserrat', sans-serif;\n  }\n\n  > h1 {\n    font-family: 'Montserrat', sans-serif;\n    font-weight: 600;\n    font-size: 52px;\n  }\n\n  > h2 {\n    font-weight: 300;\n    font-size: 14px;\n    letter-spacing: 0.25em;\n    text-transform: uppercase;\n  }\n"]))),F=M.b.div(a||(a=Object(y.a)(["\n  display: flex;\n  align-items: center;\n  margin-left: 50px;\n\n  @media screen and (max-width: ",") {\n    margin: 20px auto 10px auto;\n  }\n"])),L),T=Object(M.b)(w.b)(o||(o=Object(y.a)(["\n  position: relative;\n  font-family: 'Montserrat', sans-serif;\n  font-size: 18px;\n  text-transform: lowercase;\n  text-decoration: none;\n  color: black;\n\n  margin-right: 20px;\n  &:last-child {\n    margin-right: 0px;\n  }\n\n  &::after {\n    content: '';\n    position: absolute;\n    bottom: -10px;\n    left: 0;\n    width: ","%;\n    margin-left: ","%;\n    height: 5px;\n    background-color: black;\n    transition: all 0.2s ease;\n  }\n"])),(function(n){return"entering"===n.state||"entered"===n.state?100:0}),(function(n){return"exiting"===n.state?100:0})),A=function(n){var t=n.to,e=n.title,i=Object(k.f)();return Object(C.jsx)(S.a,{in:i.pathname===t,timeout:200,children:function(n){return Object(C.jsx)(T,{to:t,state:n,children:e})}})},E=function(){var n=Object(k.e)();return Object(C.jsxs)(z,{children:[Object(C.jsxs)(I,{onClick:function(){return n.push("/")},children:[Object(C.jsx)("h1",{children:"zekro"}),Object(C.jsx)("h2",{children:"Photography"})]}),Object(C.jsxs)(F,{children:[Object(C.jsx)(A,{to:"/",title:"Gallery"}),Object(C.jsx)(A,{to:"/about",title:"About"}),Object(C.jsx)(A,{to:"/contact",title:"Contact"})]})]})},P=M.b.div(r||(r=Object(y.a)(["\n  max-width: 1300px;\n  margin: 20px auto 0 auto;\n"]))),R=M.b.div(s||(s=Object(y.a)(["\n  padding: ",";\n"])),(function(n){var t;return null!==(t=n.padding)&&void 0!==t?t:"0 5px"})),U=function(){return Object(C.jsx)(R,{children:Object(C.jsx)("div",{children:"About"})})},B=function(){return Object(C.jsx)(R,{children:Object(C.jsx)("div",{children:"Contact"})})},D=e(13),H=e(35),J=Object(M.b)(H.a)(l||(l=Object(y.a)(["\n  position: absolute !important;\n  top: 0;\n  left: 0;\n  transition: opacity 0.25s ease;\n  opacity: ",";\n  cursor: ",";\n"])),(function(n){return"exited"===n.state?0:1}),(function(n){return n.clickable?"pointer":"auto"})),N=M.b.div(u||(u=Object(y.a)(["\n  position: relative;\n"]))),G=function(n){var t=n.image,e=n.imageURL,i=n.height,c=n.width,a=n.onClick,o=Object(m.useState)(!1),r=Object(D.a)(o,2),s=r[0],l=r[1],u=i||"number"!==typeof c?null:Math.floor(c*(1/t.dimensions.ratio)),b=c||"number"!==typeof c?null:Math.floor(c*t.dimensions.ratio);return Object(C.jsxs)(N,{onClick:function(){return null===a||void 0===a?void 0:a.call(undefined,t.id)},children:[Object(C.jsx)("img",{src:e,width:c,height:i,onLoad:function(){return l(!0)},alt:""}),Object(C.jsx)(S.a,{in:!s,timeout:0,children:function(n){var e,o;return Object(C.jsx)(J,{hash:t.blurhash.hash,width:null!==(e=null!==c&&void 0!==c?c:b)&&void 0!==e?e:"100%",height:null!==(o=null!==i&&void 0!==i?i:u)&&void 0!==o?o:"100%",resolutionX:t.blurhash.components.width,resolutionY:t.blurhash.components.height,state:n,clickable:!!a})}})]})},X=e(57),Y=e(11),q=e(21),K=null!==(b="https://api.gallery.zekro.de")?b:"/api",Q=function(){function n(){Object(Y.a)(this,n)}return Object(q.a)(n,null,[{key:"list",value:function(){return window.fetch("".concat(K,"/images")).then((function(n){return n.json()}))}},{key:"getMeta",value:function(n){return window.fetch("".concat(K,"/images/").concat(n,"/meta")).then((function(n){return n.json()}))}},{key:"getImageSource",value:function(n){return"".concat(K,"/images/").concat(n)}},{key:"getThumbnailSource",value:function(n,t){return"".concat(K,"/images/").concat(n,"/thumbnail?width=").concat(t)}}]),n}(),V=Object(M.b)(G)(j||(j=Object(y.a)(["\n  width: 100%;\n"]))),W=Object(M.b)(R)(d||(d=Object(y.a)(["\n  margin-bottom: 50px;\n"]))),Z=M.b.div(f||(f=Object(y.a)(["\n  margin-top: 20px;\n  text-align: center;\n  font-family: 'Montserrat', sans-serif;\n\n  > p {\n    margin: 0 0 10px 0;\n  }\n"]))),$=M.b.p(h||(h=Object(y.a)(["\n  font-size: 14px;\n  ","\n  ","\n"])),(function(n){return n.light?"opacity: 0.5;":""}),(function(n){return n.italic?"font-style: italic;":""})),_=function(n){for(var t=arguments.length,e=new Array(t>1?t-1:0),i=1;i<t;i++)e[i-1]=arguments[i];return e.filter((function(n){return!!n})).join(n)},nn=function(){var n,t,e,i,c=Object(k.g)(),a=Object(m.useState)(),o=Object(D.a)(a,2),r=o[0],s=o[1];return Object(m.useEffect)((function(){Q.getMeta(c.params.id).then((function(n){return s(n)}))}),[c,s]),Object(C.jsx)(W,{children:r&&[Object(C.jsx)(V,{image:r,imageURL:Q.getImageSource(r.id),width:"100%"}),Object(C.jsxs)(Z,{children:[r.exif&&[Object(C.jsxs)("p",{children:[_(" ",r.exif.bodymake,r.exif.bodymodel),"\xa0with\xa0",_(" ",r.exif.lensmake,r.exif.lensmodel)]}),Object(C.jsx)("p",{children:_(" \u2014 ",(e="ISO ",i=r.exif.iso,i?"".concat(e).concat(i):void 0),r.exif.fstop,r.exif.exposuretime)})]||Object(C.jsx)($,{italic:!0,light:!0,children:"No exif data existent."}),Object(C.jsx)($,{children:Object(X.a)(new Date(null!==(n=null===(t=r.exif)||void 0===t?void 0:t.taken)&&void 0!==n?n:r.timestamp),"eeee, do LLLL yyyy \u2014 HH:MM:SS O")})]})]})},tn=e(34),en=function(){for(var n={default:5},t=1;t<=5;t++)n[260*t]=t-1;return n}(),cn=Object(M.b)(tn.a)(x||(x=Object(y.a)(["\n  display: flex;\n  justify-content: center;\n\n  > div {\n    width: fit-content !important;\n\n    > * {\n      margin: ","px;\n    }\n  }\n"])),5),an=function(){var n=Object(m.useState)(),t=Object(D.a)(n,2),e=t[0],i=t[1],c=Object(k.e)();Object(m.useEffect)((function(){Q.list().then(i)}),[i]);var a=null===e||void 0===e?void 0:e.map((function(n){return Object(C.jsx)(G,{image:n,width:250,imageURL:Q.getThumbnailSource(n.id,250),onClick:function(n){return c.push("/images/".concat(n))}},n.id)}));return Object(C.jsx)(cn,{className:"",breakpointCols:en,children:a})},on=Object(M.a)(p||(p=Object(y.a)(["\n  box-sizing: border-box;\n"])));var rn=function(){return Object(C.jsxs)("div",{children:[Object(C.jsx)(w.a,{children:Object(C.jsxs)(P,{children:[Object(C.jsx)(E,{}),Object(C.jsx)(k.a,{exact:!0,path:"/",component:an}),Object(C.jsx)(k.a,{exact:!0,path:"/about",component:U}),Object(C.jsx)(k.a,{exact:!0,path:"/contact",component:B}),Object(C.jsx)(k.a,{exact:!0,path:"/images/:id",component:nn})]})}),Object(C.jsx)(on,{})]})},sn=function(n){n&&n instanceof Function&&e.e(3).then(e.bind(null,59)).then((function(t){var e=t.getCLS,i=t.getFID,c=t.getFCP,a=t.getLCP,o=t.getTTFB;e(n),i(n),c(n),a(n),o(n)}))};e(52);v.a.render(Object(C.jsx)(O.a.StrictMode,{children:Object(C.jsx)(rn,{})}),document.getElementById("root")),sn(console.table)}},[[53,1,2]]]);
//# sourceMappingURL=main.595aaf4c.chunk.js.map