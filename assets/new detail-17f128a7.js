import{b as B,H as M,r as i,A as $,a as H,j as e,B as U,V as I}from"./index-64ebcfb1.js";import{M as m}from"./select-3564eaf8.js";import{a as L,t as g}from"./popup-b0faad0b.js";import{c as W,a as b,C as x,L as P}from"./index.esm-8e5cdf44.js";import{a as G,u as J}from"./react-select-async.esm-16a81a21.js";import{R as K}from"./required-ca3949b7.js";import{c as Q,a as l,o as X}from"./index.esm-3c48b9ce.js";import{s as Y}from"./main-95402293.js";import"./use-isomorphic-layout-effect.browser.esm-0c3ad381.js";import"./status translate-8e2cd280.js";const n=({label:C,children:r,required:u})=>{var c;const o=(c=M())==null?void 0:c.color;return e.jsxs("tr",{children:[e.jsx("td",{style:{backgroundColor:o.tableBgc},children:e.jsxs("label",{className:"relative",children:[u&&e.jsx(K,{}),C]})}),e.jsx("td",{children:r})]})},Z=Q().shape({purpose:l().required("原因沒填"),district:l().required("地區沒填"),postalCode:l().required("郵遞區號沒填"),city:l(),cus:l().required("客戶沒填"),hotel:l(),PS:l()}),ue=()=>{var A;const{i18n:C,t:r}=B("list page",{keyPrefix:"detailTable"}),u=C.language,o=(A=M())==null?void 0:A.color,{register:c,handleSubmit:V,control:a,reset:w,setValue:N,trigger:F,formState:{errors:R}}=W({shouldUnregister:!0,criteriaMode:"all",mode:"onChange",resolver:X(Z),defaultValues:{purpose:"",district:"",city:"",postalCode:"",cus:"",hotel:"",PS:""}}),{newDetailRef:d,clearDetailSelect:_,clearCusSelect:p,clearPostCodeSelect:S}=G(),[q]=L("newDetail"),[D]=L("errors"),{options:f}=J(),j=b({name:"purpose",control:a}),E=b({name:"district",control:a}),y=b({name:"postalCode",control:a}),v=i.useMemo(async function(){const t=(await $.getPostCode()).find(h=>h.zipcode===y);if(t)return t.place},[y]);i.useEffect(()=>{async function s(){N("city",await v)}s()},[v,N]),i.useEffect(()=>{p()},[p,j]),i.useEffect(()=>{S(),p()},[p,S,E]),i.useEffect(()=>{F()},[F]);const k=H();function T(){Object.keys(R).length!==0&&(k(U(R)),D("on"))}function O(s){w(),k(I(s)),q("off")}const z=i.useCallback(s=>{const t=s.data.CustName.startsWith("A.T.U"),h=!!s.data.ErpNo;switch(j){case g.atu:return!!t;case g.oldCus:return!!(!t&&h);case g.newCus:return!t&&!h;default:return!0}},[j]);return e.jsx(e.Fragment,{children:e.jsxs("form",{id:"new detail",onSubmit:V(O),onReset:()=>{w(),_(),q("off")},className:"modal space-y-4",style:{backgroundColor:o.white},children:[e.jsx(Y,{children:e.jsxs("table",{children:[e.jsx("thead",{children:e.jsx("tr",{children:e.jsx("th",{colSpan:2,className:"text-start",style:{backgroundColor:o.sectionHeader,color:o.white},children:r("title")})})}),e.jsxs("tbody",{children:[e.jsx(n,{label:r("thead.purpose"),required:!0,children:e.jsx(x,{control:a,name:"purpose",rules:{required:"出差事由必填"},render:({field:{onChange:s}})=>e.jsx(m.Async,{forwardRef:d.purpose,options:f.event,onChange:s,value:"ResourcesId",placeholder:r("placeholder.event"),getLabelFunction:t=>u==="en"?t.ResourcesName_E:t.ResourcesName,getValueFunction:t=>t.ResourcesId})})}),e.jsx(n,{label:r("thead.dist"),required:!0,children:e.jsx(x,{control:a,name:"district",rules:{required:"行政區必填"},render:({field:{onChange:s}})=>e.jsx(m.Async,{forwardRef:d.country,options:f.area,onChange:s,value:"Country",placeholder:r("placeholder.dist"),getLabelFunction:t=>u==="en"?t.Country_E:t.Country,getValueFunction:t=>t.Country})})}),e.jsx(n,{label:r("postcode"),required:!0,children:e.jsx(x,{control:a,name:"postalCode",rules:{required:"郵遞區號必填"},render:({field:{onChange:s}})=>e.jsx(m.Async,{forwardRef:d.postalCode,options:f.postalCode,onChange:s,placeholder:r("placeholder.code"),getLabelFunction:t=>`${t.zipcode} / ${t.place}`,getValueFunction:t=>t.zipcode,filterFunction:t=>t.data.state===E,value:"zipcode"})})}),e.jsx(n,{label:r("thead.city"),children:e.jsx("input",{type:"text",...c("city"),className:"noBorder w-full",autoComplete:"off",readOnly:!0})}),e.jsx(n,{label:r("thead.cus"),required:!0,children:e.jsx(x,{control:a,name:"cus",rules:{required:"客戶必填"},render:({field:{onChange:s}})=>e.jsx(m.Async,{forwardRef:d.cus,options:f.cus,onChange:s,placeholder:r("placeholder.cus"),noOptionComponent:e.jsx("a",{href:"https://esys.orange-electronic.com/Customer/CustomerList",target:"_blank",rel:"noopener noreferrer",children:e.jsx("button",{type:"button",className:"w-full",style:{color:o.white,backgroundColor:o.createCus},children:"查無資料，請建立客戶資訊"})}),getLabelFunction:t=>t.CustName,getValueFunction:t=>t.CustName,value:"CustName",filterFunction:t=>t.data.PostalCode===y?z(t):!1})})}),e.jsx(n,{label:r("thead.lodging"),children:e.jsx("input",{type:"text",...c("hotel"),className:"w-full",autoComplete:"off",placeholder:r("placeholder.lodging")})}),e.jsx(n,{label:r("thead.PS"),children:e.jsx("input",{type:"text",...c("PS"),className:"w-full",autoComplete:"off",placeholder:r("placeholder.purpose")})})]})]})}),e.jsxs("div",{className:"submit-btns",children:[e.jsx(P,{type:"submit",style:"confirm",form:"new detail",onClick:T}),e.jsx(P,{type:"reset",style:"cancel",form:"new detail"})]})]})})};export{ue as default};