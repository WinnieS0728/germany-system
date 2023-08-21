import{b as D,H as v,r as x,A as _,a as z,j as e,B,V as O}from"./index-d92dbf70.js";import{M as p}from"./select-677a1084.js";import{b as q}from"./index-0e029038.js";import{c as T,a as F,C as f,L as S}from"./index.esm-a483082b.js";import{a as $,u as H}from"./react-select-async.esm-21729001.js";import{R as I}from"./required-1ad7c43d.js";import{c as U,a,o as W}from"./index.esm-80f0e74e.js";import{s as G}from"./main-6b5da64a.js";import"./use-isomorphic-layout-effect.browser.esm-49653e3d.js";const l=({label:h,children:r,required:i})=>{var n;const o=(n=v())==null?void 0:n.color;return e.jsxs("tr",{children:[e.jsx("td",{style:{backgroundColor:o.tableBgc},children:e.jsxs("label",{className:"relative",children:[i&&e.jsx(I,{}),h]})}),e.jsx("td",{children:r})]})},J=U().shape({purpose:a().required("原因沒填"),district:a().required("地區沒填"),postalCode:a().required("郵遞區號沒填"),city:a(),cus:a().required("客戶沒填"),hotel:a(),PS:a()}),oe=()=>{var R;const{i18n:h,t:r}=D("list page",{keyPrefix:"detailTable"}),i=h.language,o=(R=v())==null?void 0:R.color,{register:n,handleSubmit:k,control:c,reset:j,setValue:y,trigger:g,formState:{errors:b}}=T({shouldUnregister:!0,criteriaMode:"all",mode:"onChange",resolver:W(J),defaultValues:{purpose:"",district:"",city:"",postalCode:"",cus:"",hotel:"",PS:""}}),{newDetailRef:u,clearDetailSelect:E}=$(),[C]=q("newDetail"),[L]=q("errors"),{options:d}=H(),M=F({name:"district",control:c}),m=F({name:"postalCode",control:c}),w=x.useMemo(async function(){const t=(await _.getPostCode()).find(A=>A.zipcode===m);if(t)return t.place},[m]);x.useEffect(()=>{async function s(){y("city",await w)}s()},[w,y]),x.useEffect(()=>{g()},[g]);const N=z();function P(){Object.keys(b).length!==0&&(N(B(b)),L("on"))}function V(s){j(),N(O(s)),C("off")}return e.jsx(e.Fragment,{children:e.jsxs("form",{id:"new detail",onSubmit:k(V),onReset:()=>{j(),E(),C("off")},className:"modal space-y-4",style:{backgroundColor:o.white},children:[e.jsx(G,{children:e.jsxs("table",{children:[e.jsx("thead",{children:e.jsx("tr",{children:e.jsx("th",{colSpan:2,className:"text-start",style:{backgroundColor:o.sectionHeader,color:o.white},children:r("title")})})}),e.jsxs("tbody",{children:[e.jsx(l,{label:r("thead.purpose"),required:!0,children:e.jsx(f,{control:c,name:"purpose",rules:{required:"出差事由必填"},render:({field:{onChange:s}})=>e.jsx(p.Async,{forwardRef:u.purpose,options:d.event,onChange:s,value:"ResourcesId",placeholder:r("placeholder.event"),getLabelFunction:t=>i==="en"?t.ResourcesName_E:t.ResourcesName,getValueFunction:t=>t.ResourcesId})})}),e.jsx(l,{label:r("thead.dist"),required:!0,children:e.jsx(f,{control:c,name:"district",rules:{required:"行政區必填"},render:({field:{onChange:s}})=>e.jsx(p.Async,{forwardRef:u.country,options:d.area,onChange:s,value:"Country",placeholder:r("placeholder.dist"),getLabelFunction:t=>i==="en"?t.Country_E:t.Country,getValueFunction:t=>t.Country})})}),e.jsx(l,{label:r("postcode"),required:!0,children:e.jsx(f,{control:c,name:"postalCode",rules:{required:"郵遞區號必填"},render:({field:{onChange:s}})=>e.jsx(p.Async,{forwardRef:u.postalCode,options:d.postalCode,onChange:s,placeholder:r("placeholder.code"),getLabelFunction:t=>`${t.zipcode} / ${t.place}`,getValueFunction:t=>t.zipcode,filterFunction:t=>t.data.state===M,value:"zipcode"})})}),e.jsx(l,{label:r("thead.city"),children:e.jsx("input",{type:"text",...n("city"),className:"noBorder w-full",autoComplete:"off",readOnly:!0})}),e.jsx(l,{label:r("thead.cus"),required:!0,children:e.jsx(f,{control:c,name:"cus",rules:{required:"客戶必填"},render:({field:{onChange:s}})=>e.jsx(p.Async,{forwardRef:u.cus,options:d.cus,onChange:s,placeholder:r("placeholder.cus"),noOptionComponent:e.jsx("a",{href:"https://esys.orange-electronic.com/Customer/CustomerList",target:"_blank",rel:"noopener noreferrer",children:e.jsx("button",{type:"button",className:"w-full",style:{color:o.white,backgroundColor:o.createCus},children:"查無資料，請建立客戶資訊"})}),getLabelFunction:t=>t.CustName,getValueFunction:t=>t.CustName,value:"CustName",filterFunction:t=>t.data.PostalCode===m})})}),e.jsx(l,{label:r("thead.lodging"),children:e.jsx("input",{type:"text",...n("hotel"),className:"w-full",autoComplete:"off",placeholder:r("placeholder.lodging")})}),e.jsx(l,{label:r("thead.PS"),children:e.jsx("input",{type:"text",...n("PS"),className:"w-full",autoComplete:"off",placeholder:r("placeholder.purpose")})})]})]})}),e.jsxs("div",{className:"submit-btns",children:[e.jsx(S,{type:"reset",style:"cancel",form:"new detail"}),e.jsx(S,{type:"submit",style:"confirm",form:"new detail",onClick:P})]})]})})};export{oe as default};
