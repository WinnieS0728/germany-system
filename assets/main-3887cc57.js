import{n as t,j as s}from"./index-8c0dfc83.js";const i=({className:e,title:a,children:n,filter:r})=>s.jsxs("div",{className:e,children:[a&&s.jsxs("div",{className:"header",children:[a,r]}),s.jsx("div",{className:"table-wrapper",children:n})]}),c=t(i)`
    .header{
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: ${e=>e.theme.color.sectionHeader};
        color: ${e=>e.theme.color.white};
        padding: 0.5rem 1em;

        span{
            margin-inline: 0.5em;
        }
    }
    tbody{
        position: relative;
    }
`,l=({children:e})=>s.jsx("main",{className:"p-4",children:e});export{l as M,c as s};
