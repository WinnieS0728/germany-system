import{o as c,b as l,j as e,N as r,r as n,_ as i,n as d,p as h,q as o,O as x}from"./index-54117eb1.js";const m=({className:t})=>{const{t:s}=l(["settingPage"]);return e.jsx(e.Fragment,{children:e.jsx("nav",{className:t,children:e.jsxs("ul",{className:"flex gap-2 p-2",children:[e.jsx(r,{end:!0,to:"tx",children:s("nav.tx")}),e.jsx(r,{end:!0,to:"threshold",children:s("nav.threshold")}),e.jsx(r,{end:!0,to:"store",children:s("nav.store achieve")}),e.jsx(r,{end:!0,to:"osom",children:s("nav.osom achieve")})]})})})},j=c(m)`
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
`,a=n.lazy(()=>i(()=>import("./coming-e3ef35cf.js"),["./coming-e3ef35cf.js","./index-54117eb1.js","./index-114e3bf1.css"],import.meta.url)),u=n.lazy(()=>i(()=>import("./threshold-2796b488.js"),["./threshold-2796b488.js","./index-54117eb1.js","./index-114e3bf1.css"],import.meta.url)),v=()=>{const{t}=l(["settingPage"]);return e.jsxs(e.Fragment,{children:[e.jsx(d,{title:t("title")}),e.jsx(j,{}),e.jsx(n.Suspense,{fallback:e.jsx("h1",{children:"欸你等一下啦"}),children:e.jsxs(h,{children:[e.jsx(o,{path:"tx",element:e.jsx(a,{})}),e.jsx(o,{path:"threshold",element:e.jsx(u,{})}),e.jsx(o,{path:"store",element:e.jsx(a,{})}),e.jsx(o,{path:"osom",element:e.jsx(a,{})})]})}),e.jsx(x,{})]})};export{v as default};
