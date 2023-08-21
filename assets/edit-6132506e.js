import{n as c,b as l,j as e,N as r,r as n,_ as i,m as d,o,O as h}from"./index-d92dbf70.js";import{H as x}from"./header-237288b4.js";const m=({className:t})=>{const{t:s}=l(["settingPage"]);return e.jsx(e.Fragment,{children:e.jsx("nav",{className:t,children:e.jsxs("ul",{className:"flex gap-2 p-2",children:[e.jsx(r,{end:!0,to:"tx",children:s("nav.tx")}),e.jsx(r,{end:!0,to:"threshold",children:s("nav.threshold")}),e.jsx(r,{end:!0,to:"store",children:s("nav.store achieve")}),e.jsx(r,{end:!0,to:"osom",children:s("nav.osom achieve")})]})})})},j=c(m)`
    background-color: ${t=>t.theme.color.navBgc};

    a {
        border: 1px solid ${t=>t.theme.color.white};
        color: ${t=>t.theme.color.white};
        border-radius: .5rem;
        padding: .2em .5em;

        &.active {
            background-color: ${t=>t.theme.color.navActive};
        }
    }
`,a=n.lazy(()=>i(()=>import("./coming-9bf9f45e.js"),["./coming-9bf9f45e.js","./index-d92dbf70.js","./index-8c288d29.css"],import.meta.url)),u=n.lazy(()=>i(()=>import("./threshold-e82f38e5.js"),["./threshold-e82f38e5.js","./index-d92dbf70.js","./index-8c288d29.css","./main-6b5da64a.js","./index.esm-80f0e74e.js","./index.esm-a483082b.js"],import.meta.url)),g=()=>{const{t}=l(["settingPage"]);return e.jsxs(e.Fragment,{children:[e.jsx(x,{title:t("title")}),e.jsx(j,{}),e.jsx(n.Suspense,{fallback:e.jsx("h1",{children:"欸你等一下啦"}),children:e.jsxs(d,{children:[e.jsx(o,{path:"tx",element:e.jsx(a,{})}),e.jsx(o,{path:"threshold",element:e.jsx(u,{})}),e.jsx(o,{path:"store",element:e.jsx(a,{})}),e.jsx(o,{path:"osom",element:e.jsx(a,{})})]})}),e.jsx(h,{})]})};export{g as default};
