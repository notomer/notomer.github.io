"use strict";(self.webpackChunknotomer=self.webpackChunknotomer||[]).push([[264],{264:(e,t,n)=>{n.r(t),n.d(t,{default:()=>u});var o=n(791),s=n(892),a=n(355),r=n(701),i=n(277),c=n(184);function l(e){const{scene:t}=(0,a.L)("/Porsche.glb");return t.traverse((e=>{e.isMesh&&(e.castShadow=!1,e.receiveShadow=!1,e.material&&(e.material.castShadow=!1,e.material.receiveShadow=!1))})),(0,c.jsx)("primitive",{object:t,...e})}const u=function(){const e=(0,o.useRef)(),[t,n]=(0,o.useState)(!0),[a,u]=(0,o.useState)([0,Math.PI/4,0]);let m;const h=()=>{clearTimeout(m),m=setTimeout((()=>{n(!0)}),5e3)};return(0,o.useEffect)((()=>{let e,n=0;const o=s=>{const a=s-n;if(t){const e=1e-4;u((t=>[t[0],t[1]+e*a,t[2]]))}n=s,e=requestAnimationFrame(o)};return t&&(e=requestAnimationFrame(o)),h(),()=>{cancelAnimationFrame(e),clearTimeout(m)}}),[t]),(0,c.jsxs)(s.Xz,{dpr:[1,2],shadows:!0,camera:{fov:45},style:{position:"absolute"},children:[(0,c.jsx)("ambientLight",{intensity:.5}),(0,c.jsx)(r.N,{speed:1.5,global:!0,zoom:1,polar:[-.1,Math.PI/4],onPointerDown:()=>{n(!0),h()},onPointerUp:()=>{n(!1)},onPointerLeave:()=>{n(!1)},children:(0,c.jsx)(i.H,{environment:"",children:(0,c.jsx)(l,{scale:6e-4,ref:e,rotation:a})})})]})}}}]);
//# sourceMappingURL=264.bf382c57.chunk.js.map