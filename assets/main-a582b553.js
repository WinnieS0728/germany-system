import{n as t,j as a}from"./index-cdc06e8f.js";const i=({className:e,title:s,children:n,filter:r})=>a.jsxs("div",{className:e,children:[s&&a.jsxs("div",{className:"header",children:[s,r]}),a.jsx("div",{className:"table-wrapper",children:n})]}),c=t(i)`
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
`,l=({children:e,className:s})=>a.jsx("main",{className:`${s} p-4`,children:e});export{l as M,c as s};
