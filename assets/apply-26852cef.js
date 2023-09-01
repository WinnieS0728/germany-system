import{b as k,u as P,r as g,d as G,j as e,H as q,a as J,p as xe,f as ye,q as je,v as ge,w as be,t as we,x as _,L as de,Q as De,y as Se,z as Ce,A as Q,B as Ne,C as ve,D as Fe,k as R,N as Ie,m as ke,o as oe}from"./index-64ebcfb1.js";import{u as K,a as X,C as O,b as Ee,I as U,N as Ae,c as ue,S as Te,A as Pe,B as Le,F as Me,d as Be,P as le,e as Re}from"./index.esm-8e5cdf44.js";import{M as me,s as _e}from"./main-95402293.js";import{B as H,C as Ve,D as $e,u as qe,a as se,P as He,H as Oe,I as Ue,A as ze,c as Ye,t as ae}from"./popup-b0faad0b.js";import{R as W}from"./required-ca3949b7.js";import{u as Z,a as ee}from"./react-select-async.esm-16a81a21.js";import{M as z}from"./select-3564eaf8.js";import{u as re,a as We}from"./status translate-8e2cd280.js";import{D as pe,i as Y}from"./index.esm-291eb7e5.js";import{c as ce,a as T,b as ie,d as Qe,e as Ge,o as Je}from"./index.esm-3c48b9ce.js";import{u as Ke}from"./data-4fbd0c11.js";import{H as Xe}from"./header-7eafef48.js";import"./use-isomorphic-layout-effect.browser.esm-0c3ad381.js";const Ze=()=>{const{i18n:r,t}=k("new form",{keyPrefix:"transport"}),c=r.language,s=P(n=>n.tripDetail).body,{options:f}=Z(),{newFormRef:m}=ee(),{register:u,control:y,setValue:i}=K(),a=X({name:"tripData",control:y,defaultValue:[]}),h=s.map(n=>n.data.map(l=>l.hotel));function D(n){if(!n||!n.startDate||!n.endDate)return 0;const l=new Date(`${n.startDate}:00:00:00`),F=new Date(`${n.endDate}:00:00:00`);return G.count(l,F)+1||0}const o=g.useMemo(()=>{const n=h.map(d=>!!d.some(b=>b!==""));let l;n.some(d=>d)?l="Yes":l="No";const N=n.map((d,b)=>{if(d){const S=D(a[b])-1;return S>0?S:0}else return 0}).reduce((d,b)=>d+b,0);return{isStay:l,day:N}},[a,h]);g.useEffect(()=>{i("IsLodging",o.isStay),i("StayDays",o.day)},[o,i]);const w=g.useMemo(()=>{if(a.length===0)return 0;const n=a.map(l=>[l.startDate,l.endDate]).reduce((l,F)=>l.concat(F),[]).map(l=>new Date(l).getTime()).sort((l,F)=>l-F);return G.count(new Date(n[0]),new Date(n[n.length-1]))+1||0},[a]);return g.useEffect(()=>{i("Days",w)},[w,i]),e.jsxs("fieldset",{className:"space-y-2",children:[e.jsxs("div",{className:"transportation label-input",children:[e.jsxs("label",{children:[e.jsx(W,{}),t("transportation")," :"]}),e.jsx(O,{control:y,name:"Transport",render:({field:{onChange:n}})=>e.jsx(z.Async,{forwardRef:m.transport,options:f.transport,onChange:n,getLabelFunction:l=>c==="en"?l.ResourcesName_E:l.ResourcesName,getValueFunction:l=>l.ResourcesId,value:"ResourcesId",placeholder:t("placeholder.transportation")})})]}),e.jsxs("div",{className:"grid grid-cols-1 sm:grid-cols-3",children:[e.jsxs("div",{className:"stay label-input justify-start",children:[e.jsxs("label",{children:[t("isStay")," :"]}),e.jsx("input",{type:"text",...u("IsLodging"),autoComplete:"off",className:"noBorder w-[5em]",readOnly:!0})]}),e.jsxs("div",{className:"stayDay label-input justify-start",children:[e.jsxs("label",{children:[t("stayDay")," :"]}),e.jsx("input",{type:"text",...u("StayDays",{valueAsNumber:!0}),autoComplete:"off",readOnly:!0,className:"noBorder w-[5em]"})]}),e.jsxs("div",{className:"totalDay label-input justify-start",children:[e.jsxs("label",{children:[t("tripDay")," :"]}),e.jsx("input",{type:"text",...u("Days",{valueAsNumber:!0}),autoComplete:"off",readOnly:!0,className:"noBorder w-[5em]"})]})]})]})},et=()=>{const{t:r}=k("new form",{keyPrefix:"money"}),{register:t,control:c,setValue:s}=K(),{options:f}=Z(),[m,u]=g.useState("0"),{newFormRef:y}=ee(),i=X({name:"Advance_Amount",control:c});function a(h){if(!h.target.value){u("0");return}const D=h.target.value.replace(/[^\d]/g,"")||"0";u(parseInt(D).toLocaleString())}return e.jsxs("div",{className:"flex flex-col gap-4 sm:flex-row sm:gap-8",children:[e.jsxs("div",{className:"label-input",children:[e.jsxs("label",{children:[r("amount")," :"]}),e.jsx("input",{type:"text",className:"w-full",...t("Advance_Amount",{setValueAs:h=>h.replace(/,/g,"")}),onChangeCapture:a,autoComplete:"off",value:m,onFocusCapture:()=>{u("")},onBlur:()=>{var h;m===""&&(u("0"),s("Advance_Amount","0"),s("Curr",""),(h=y.curr.current)==null||h.clearValue())}})]}),e.jsxs("div",{className:"label-input",children:[e.jsxs("label",{children:[i!=="0"&&e.jsx(W,{}),r("curr")," :"]}),e.jsx(O,{control:c,name:"Curr",render:({field:{onChange:h}})=>e.jsx(z.Normal,{forwardRef:y.curr,options:f.curr,onChange:h,placeholder:r("placeholder.curr")})})]})]})},tt=()=>{const{t:r}=k("new form",{keyPrefix:"deputy"}),{control:t}=K(),{newFormRef:c}=ee(),{options:s}=Z(),{splitName:f}=re();return e.jsxs("div",{className:"label-input",children:[e.jsxs("label",{children:[e.jsx(W,{}),r("deputy")," :"]}),e.jsx(O,{control:t,name:"Deputy",render:({field:{onChange:m}})=>e.jsx(z.Async,{forwardRef:c.deputy,onChange:m,options:s.agent,getLabelFunction:u=>f(u),getValueFunction:u=>u.EmpId,value:"EmpId",placeholder:r("placeholder.deputy")})})]})},st=({data:r,index:t})=>{var N;const{t:c}=k("list page"),s=(N=q())==null?void 0:N.color,f=P(d=>d.time),[m,u]=g.useState(!1),[y,i]=g.useState(),[a,h]=g.useState({from:r.startDate||"",to:r.endDate||""}),{register:D,setValue:o}=K(),w=()=>e.jsx("span",{style:{display:"flex",justifyContent:"center"},children:e.jsx("p",{style:{margin:0,display:"flex",alignItems:"center"},children:"select 2 days"})});function n(d){return Y(d)?ye("%Y-%m-%d")(d):""}const l=J();function F(d){h(d),Y(d==null?void 0:d.from)&&Y(d==null?void 0:d.to)&&(o(`tripData.${t}`,{startDate:n(d.from),endDate:n(d.to)}),u(!1))}return g.useEffect(()=>{a&&a.from&&a.to&&l(xe(a))},[a,l]),e.jsx("div",{className:"flex items-center justify-between",children:e.jsxs("div",{className:"relative flex flex-col gap-4 lg:flex-row lg:gap-8",children:[e.jsxs("div",{className:"startDate label-input flex-col items-start gap-1 space-x-2 sm:flex-row sm:items-center",children:[e.jsxs("label",{style:{whiteSpace:"nowrap"},children:[e.jsx(W,{}),c("detail.startDate")]}),e.jsx("input",{...D(`tripData.${t}.startDate`),className:"date w-full",style:{cursor:"pointer",backgroundColor:s==null?void 0:s.white,color:s==null?void 0:s.black},autoComplete:"off",value:n(a==null?void 0:a.from),onClickCapture:()=>{u(d=>!d)},readOnly:!0,placeholder:c("detail.placeholder.startDate")})]}),e.jsxs("div",{className:"endDate label-input flex-col items-start gap-1 space-x-2 sm:flex-row sm:items-center",children:[e.jsxs("label",{style:{whiteSpace:"nowrap"},children:[e.jsx(W,{}),c("detail.endDate")]}),e.jsx("input",{...D(`tripData.${t}.endDate`),className:"date w-full",style:{cursor:"pointer",backgroundColor:s==null?void 0:s.white,color:s==null?void 0:s.black},autoComplete:"off",value:n(a==null?void 0:a.to),onClickCapture:()=>{u(d=>!d)},readOnly:!0,placeholder:c("detail.placeholder.endDate")})]}),e.jsx(pe,{mode:"range",footer:e.jsx(w,{}),selected:a,onSelect:F,fromYear:2022,toYear:+f.thisYear+1,month:y,onMonthChange:i,captionLayout:"dropdown-buttons",style:{position:"absolute",top:"100%",right:0,zIndex:99,display:m?"block":"none",color:s==null?void 0:s.white},styles:{months:{backgroundColor:s==null?void 0:s.black},cell:{border:0}},modifiersStyles:{selected:{backgroundColor:s.blue},today:{textDecoration:"underLine",textUnderlineOffset:".3rem"}}})]})})},at=()=>{var y;const{t:r}=k("new form"),t=(y=q())==null?void 0:y.color,c=J(),s=P(i=>i.tripDetail),{fields:f,append:m,remove:u}=Ee({name:"tripData"});return e.jsxs(e.Fragment,{children:[e.jsx("div",{children:e.jsx("button",{type:"button",className:"p-0",onClick:()=>{m({startDate:"",endDate:""}),c(je())},children:e.jsx(U,{style:{backgroundColor:t.sectionHeader,color:t.white},icon:e.jsx(Ae,{}),children:r("btn.add")})})}),f.map((i,a)=>e.jsx("div",{children:e.jsx(H,{children:e.jsx(Ve,{type:"addForm",main:e.jsx(st,{data:i,index:a}),sub:e.jsx($e,{type:"addForm",data:s.body[a],index:a}),remove:()=>{u(a)},index:a})})},i.id))]})},nt=()=>{var $;const r=($=q())==null?void 0:$.color,{t}=k(["common","new form","errors","toast"]),c=P(x=>x.time),s=P(x=>x.tripDetail).body,f=P(x=>x.nowUser).body,{clearNewFormSelect:m}=ee(),u=A(),y=ge(),i=J(),{uploadFile:a}=qe(),{spreadData:h}=Ke(s,c.today),[D]=se("review"),[o]=se("errors"),[w]=se("files"),n=ce().shape({DeptId:T().required("表單錯誤"),CreateId:T().required("表單錯誤"),Transport:T().required(t("newForm.transportation",{ns:"errors"})),IsLodging:T().required("表單錯誤"),StayDays:ie().required("表單錯誤"),Days:ie().required("表單錯誤"),Advance_Amount:Qe().required("表單錯誤"),Curr:T().when("Advance_Amount",{is:x=>x!=="0",then:()=>T().required(t("newForm.curr",{ns:"errors"})),otherwise:()=>T()}),Deputy:T().required(t("newForm.deputy",{ns:"errors"})),tripData:Ge().of(ce().shape({startDate:T().required(t("newForm.date",{ns:"errors"})),endDate:T().required(t("newForm.date",{ns:"errors"}))}))}),l=ue({criteriaMode:"all",mode:"onChange",resolver:Je(n),defaultValues:{DeptId:f.DeptId,CreateId:f.EmpId,Transport:"",IsLodging:"No",StayDays:0,Days:0,Advance_Amount:"0",Curr:"",Deputy:"",tripData:[]}}),{control:F,handleSubmit:N,setError:d,trigger:b,formState:{errors:S,isValid:V}}=l,E=X({name:"tripData",control:F});g.useEffect(()=>{b()},[b,s,E]),g.useEffect(()=>{i(be(E))},[E,i]);function A(){const x=we(new Date(c.today)),v=G.offset(x,7),te=G.offset(x,13);return{StartDT:_(v),EndDT:_(te)}}async function M(x){const v=await Q.getCus(x,"DEU");return v==null?void 0:v[0].CustId}async function p(x){const v={...x,...u};De.promise(I(v),{pending:t("newForm.pending"),success:t("newForm.success"),error:t("newForm.fail")}),D("off")}async function I(x){const v=await j(x),te=await Promise.all(h.map(async(L,he)=>({BTPId:v,Item:he+1,CustId:await M(L.data.cus),TripEvent:L.data.purpose,Description:L.data.PS,Country:"DEU",Area:L.data.district,City:L.data.city,Hotel:L.data.hotel,StartDT:L.date[0],EndDT:L.date[L.date.length-1]})));C(te),a(v),m(),i(Se()),i(Ce()),D("off"),setTimeout(()=>{y("../")},1e3)}async function j(x){return await Q.postNewForm(x)}function C(x){Q.pushNewData(x)}g.useLayoutEffect(()=>{function x(v){v.preventDefault(),v.returnValue=""}return window.addEventListener("beforeunload",x),()=>window.removeEventListener("beforeunload",x)},[]),g.useEffect(()=>{if(h.length===0){if(S.tripData)return;d("tripData",{type:"custom",message:t("newForm.noData",{ns:"errors"})})}if(s.some(x=>x.data.length===0)){if(S.tripData)return;d("tripData",{type:"custom",message:t("newForm.lostData",{ns:"errors"})})}},[S,d,h,t,s]);function B(){b(),i(Ne(S)),V?D("on"):o("on")}return e.jsxs(e.Fragment,{children:[e.jsx(He,{}),e.jsx(me,{className:"main-section-gap",children:e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"top-btn-list",children:[e.jsx(Oe,{children:e.jsxs(e.Fragment,{children:[e.jsx("button",{type:"button",onClick:B,children:e.jsx(U,{icon:e.jsx(Te,{size:"1.5rem",color:r.white}),primary:!0,children:t("btn.send",{ns:"new form"})})}),e.jsx("button",{type:"button",onClick:()=>{w("on")},children:e.jsx(U,{icon:e.jsx(Pe,{size:"1.5rem"}),children:t("btn.attach",{ns:"new form"})})})]})}),e.jsx("button",{type:"button",children:e.jsx(de,{to:"../",children:e.jsx(U,{icon:e.jsx(Le,{size:"1.25rem"}),children:t("btn.back",{ns:"new form"})})})})]}),e.jsx(Me,{...l,children:e.jsxs("form",{id:"business apply",onSubmit:N(p),className:"main-section-gap",children:[e.jsx(H,{children:e.jsx(Ue,{type:"addForm"})}),e.jsx(H,{children:e.jsx(Ze,{})}),e.jsx(at,{}),e.jsx(H,{children:e.jsx(et,{})}),e.jsx(H,{children:e.jsx(tt,{})}),e.jsx(H,{children:e.jsx(ze,{type:"addForm"})})]})})]})})]})},rt=({className:r})=>{var M;const t=(M=q())==null?void 0:M.color,c=P(p=>p.time),s=P(p=>p.nowUser).body,{i18n:f,t:m}=k(["list page","common"]),u=f.language,{register:y,handleSubmit:i,control:a,setValue:h}=ue({shouldUnregister:!0,criteriaMode:"all",mode:"onChange",defaultValues:{dept:"",EmpId:s.EmpId,formStatus:"",date:{start:"",end:""}}}),D=X({name:"dept",control:a}),[o,w]=g.useState({from:"",to:""}),[n,l]=g.useState(),[F,N]=g.useState(!1),d=J();function b(p){d(ve(p)),d(Fe(p))}const{options:S}=Z(),{splitName:V}=re(),E=()=>{function p(){l(new Date(c.today))}return e.jsxs("span",{style:{display:"flex",justifyContent:"space-between"},children:[e.jsx("p",{style:{margin:0,display:"flex",alignItems:"center"},children:"select 2 day"}),e.jsx("button",{type:"button",onClick:p,children:"Today"})]})};function A(p){w(p),Y(p==null?void 0:p.from)&&Y(p==null?void 0:p.to)&&(h("date",{start:_(p.from),end:_(p.to)}),N(!1))}return e.jsx(e.Fragment,{children:e.jsxs("form",{onSubmit:i(b),style:{backgroundColor:t.headForm_bgc},className:Ye("flex flex-col items-center gap-4 rounded-xl px-16 py-4 md:flex-row",r),children:[e.jsxs("div",{className:"form-body grid w-full gap-4",children:[e.jsxs("div",{className:"member label-input",children:[e.jsx("label",{children:m("label.member")}),e.jsxs("div",{className:"flex w-full flex-col gap-2 sm:flex-row",children:[e.jsx(O,{control:a,name:"dept",render:({field:{onChange:p}})=>e.jsx(z.Async,{options:S.dept,onChange:p,placeholder:m("placeholder.dept"),getLabelFunction:I=>u==="en"?I.DeptName_E:I.DeptName,getValueFunction:I=>I.DeptId,value:"DeptId"})}),e.jsx(O,{control:a,name:"EmpId",render:({field:{onChange:p}})=>e.jsx(z.Async,{options:S.member,onChange:p,placeholder:m("placeholder.emp"),getLabelFunction:I=>V(I),getValueFunction:I=>I.EmpId,value:"EmpId",filterFunction:I=>I.data.DeptId===D})})]})]}),e.jsxs("div",{className:"status label-input",children:[e.jsx("label",{children:m("label.status")}),e.jsx(O,{control:a,name:"formStatus",render:({field:{onChange:p}})=>e.jsx(z.Normal,{options:S.status,onChange:p,placeholder:m("placeholder.status")})})]}),e.jsxs("div",{className:"date label-input",children:[e.jsx("label",{children:m("label.date")}),e.jsxs("span",{className:"relative flex w-full flex-col items-center gap-2 sm:flex-row",children:[e.jsx("input",{className:"w-full",style:{cursor:"pointer",backgroundColor:t==null?void 0:t.white,color:t==null?void 0:t.black},autoComplete:"off",value:_(o==null?void 0:o.from),onClickCapture:()=>{N(p=>!p)},readOnly:!0,placeholder:m("placeholder.startDate")}),e.jsx("span",{className:"hidden sm:inline-block",children:"~"}),e.jsx("input",{className:"w-full",style:{cursor:"pointer",backgroundColor:t==null?void 0:t.white,color:t==null?void 0:t.black},autoComplete:"off",value:_(o==null?void 0:o.to),onClickCapture:()=>{N(p=>!p)},readOnly:!0,...y("date.end"),placeholder:m("placeholder.endDate")}),e.jsx(pe,{mode:"range",footer:e.jsx(E,{}),selected:o,onSelect:A,fromYear:2022,toYear:+c.thisYear+1,month:n,onMonthChange:l,captionLayout:"dropdown-buttons",style:{position:"absolute",top:"100%",right:0,zIndex:99,display:F?"block":"none",color:t==null?void 0:t.white},styles:{months:{backgroundColor:t==null?void 0:t.black},cell:{border:0}},modifiersStyles:{selected:{backgroundColor:t.blue}}})]})]})]}),e.jsx("button",{type:"submit",className:"p-0",children:e.jsx(U,{icon:e.jsx(Be,{color:t.white,size:"1.5rem"}),style:{backgroundColor:t.sectionHeader,color:t.white},children:m("search")})})]})})},ot=()=>{const{i18n:r}=k(),t=r.language,c=P(w=>w.listFormState),{props:s,body:f}=c,m=c.status,[u,y]=g.useState([]);function i(w){return new Date(w).getTime()}async function a(w){return await Q.getBusinessApplyDetail(w)}const{id2name:h}=re(),D=g.useCallback(w=>w.map(l=>!l.StartDT||!l.EndDT?[]:[_(l.StartDT.split(" ")[0]),_(l.EndDT.split(" ")[0])]),[]),o=g.useMemo(()=>{async function w(){const n=M(f);if(!n)return[];const l=await Promise.all(n.map(async j=>await a(j.BTPId))),F=A(ae.atu),N=A(ae.oldCus),d=A(ae.newCus),b=l.map(j=>D(j)),S=await Promise.all(n.map(async(j,C)=>{var B,$,x,v;return{date:I(b[C]),formId:j.BTPId,atuNum:F[C],oldCusNum:N[C],newCusNum:d[C],EmpId:j.Createid,name:await h(j.Createid),formStatus:j.Status,nextSign:j.Status==="簽核中"?t==="en"?($=(B=j.SName)==null?void 0:B.split("/")[0])==null?void 0:$.replace(/ /g,""):(v=(x=j.SName)==null?void 0:x.split("/")[1])==null?void 0:v.replace(/ /g,""):""}}));return p(S).reverse().map((j,C)=>({id:C+1,...j}));function A(j){return l.map(C=>C.filter(B=>B.TripEvent===j).length)}function M(j){return s.EmpId?j==null?void 0:j.filter(C=>C.Createid===s.EmpId):j}function p(j){return!s.date||!s.date.start||!s.date.end?j:j.filter(C=>i(s.date.start)<=i(C.date.start)&&i(C.date.end)<=i(s.date.end))}function I(j){const C=[...new Set(j.reduce((B,$)=>B.concat($),[]))];return{start:C[0],end:C[C.length-1]}}}return w()},[f,D,h,t,s.EmpId,s.date]);return g.useEffect(()=>{(async function(){y(await o)})()},[o]),{data:u,status:m}},lt=R.createContext({}),fe=!0;function ct({baseColor:r,highlightColor:t,width:c,height:s,borderRadius:f,circle:m,direction:u,duration:y,enableAnimation:i=fe}){const a={};return u==="rtl"&&(a["--animation-direction"]="reverse"),typeof y=="number"&&(a["--animation-duration"]=`${y}s`),i||(a["--pseudo-element-display"]="none"),(typeof c=="string"||typeof c=="number")&&(a.width=c),(typeof s=="string"||typeof s=="number")&&(a.height=s),(typeof f=="string"||typeof f=="number")&&(a.borderRadius=f),m&&(a.borderRadius="50%"),typeof r<"u"&&(a["--base-color"]=r),typeof t<"u"&&(a["--highlight-color"]=t),a}function it({count:r=1,wrapper:t,className:c,containerClassName:s,containerTestId:f,circle:m=!1,style:u,...y}){var i,a,h;const D=R.useContext(lt),o={...y};for(const[b,S]of Object.entries(y))typeof S>"u"&&delete o[b];const w={...D,...o,circle:m},n={...u,...ct(w)};let l="react-loading-skeleton";c&&(l+=` ${c}`);const F=(i=w.inline)!==null&&i!==void 0?i:!1,N=[],d=Math.ceil(r);for(let b=0;b<d;b++){let S=n;if(d>r&&b===d-1){const E=(a=S.width)!==null&&a!==void 0?a:"100%",A=r%1,M=typeof E=="number"?E*A:`calc(${E} * ${A})`;S={...S,width:M}}const V=R.createElement("span",{className:l,style:S,key:b},"‌");F?N.push(V):N.push(R.createElement(R.Fragment,{key:b},V,R.createElement("br",null)))}return R.createElement("span",{className:s,"data-testid":f,"aria-live":"polite","aria-busy":(h=w.enableAnimation)!==null&&h!==void 0?h:fe},t?N.map((b,S)=>R.createElement(t,{key:S},b)):N)}const dt=()=>{var t;const r=(t=q())==null?void 0:t.color;return e.jsx(it,{count:1,height:"3rem",baseColor:r.tableBgc,highlightColor:r.white})},ut=r=>{const{children:t,status:c}=r;return c==="loading"?e.jsx("tbody",{children:e.jsx("tr",{children:e.jsx("td",{colSpan:100,className:"p-1",children:e.jsx(dt,{})})})}):e.jsx("tbody",{children:t})},mt=(r,t)=>{const[c,s]=g.useState(1),f=Math.ceil(r.length/t),[m,u]=g.useState(!0),[y,i]=g.useState(!0),a={prev:m,next:y};g.useEffect(()=>{i(c!==f),u(c!==1),f===0&&(u(!1),i(!1))},[c,f]);function h(){y&&s(n=>n+1)}function D(){m&&s(n=>n-1)}function o(n=1){n>f?s(f):s(n)}return{dataInThisPage:g.useMemo(()=>{const n=(c-1)*t,l=n+t;return r.slice(n,l)},[c,t,r]),nextPage:h,prevPage:D,buttonStatus:a,gotoPage:o}},ne=r=>{const{date:t}=r;return e.jsx("span",{style:{whiteSpace:"nowrap"},children:t})},pt=()=>{var D;const r=(D=q())==null?void 0:D.color,{t}=k("list page"),c=P(o=>o.nowUser).body,{data:s,status:f}=ot(),m=10,{dataInThisPage:u,nextPage:y,prevPage:i,buttonStatus:a}=mt(s,10),{getFormStatus:h}=We();return e.jsxs(e.Fragment,{children:[e.jsx(_e,{children:e.jsxs("table",{children:[e.jsx("thead",{style:{backgroundColor:r.sectionHeader,color:r.white},children:e.jsxs("tr",{children:[e.jsx("th",{children:t("thead.id")}),e.jsx("th",{children:t("thead.date")}),e.jsx("th",{children:t("thead.BTPId")}),e.jsx("th",{children:t("thead.atu")}),e.jsx("th",{children:t("thead.oldCus")}),e.jsx("th",{children:t("thead.newCus")}),e.jsx("th",{children:t("thead.createId")}),e.jsx("th",{children:t("thead.status")}),e.jsx("th",{children:t("thead.nextSigner")})]})}),e.jsx(ut,{status:f,children:e.jsx(e.Fragment,{children:u.length===0?e.jsx("tr",{children:e.jsx("td",{colSpan:9,children:"no data"})}):u.map(o=>e.jsxs("tr",{children:[e.jsx("td",{children:o.id}),e.jsx("td",{children:!o.date.start||!o.date.end?e.jsx(e.Fragment,{children:" - "}):o.date.start===o.date.end?e.jsx(ne,{date:o.date.start}):e.jsxs("div",{className:"flex flex-wrap justify-center gap-1",children:[e.jsx(ne,{date:o.date.start}),"~",e.jsx(ne,{date:o.date.end})]})}),e.jsx("td",{children:e.jsx(de,{to:`../sign/${o.formId}/?userID=${c.EmpId}`,style:{cursor:"pointer"},children:o.formId})}),e.jsx("td",{children:o.atuNum}),e.jsx("td",{children:o.oldCusNum}),e.jsx("td",{children:o.newCusNum}),e.jsx("td",{children:o.name}),e.jsx("td",{children:h(o.formStatus)}),e.jsx("td",{children:o.nextSign||"-"})]},o.id))})})]})}),e.jsxs("div",{className:"flex justify-center gap-4",style:{display:s.length<=m?"none":"flex"},children:[e.jsx(le,{type:"prev",onClick:i,disabled:!a.prev}),e.jsx(le,{type:"next",onClick:y,disabled:!a.next})]})]})},ft=()=>{var c;const r=(c=q())==null?void 0:c.color,{t}=k(["list page"]);return e.jsx(me,{className:"main-section-gap",children:e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"top-btn-list",children:e.jsx(Ie,{to:"add",children:e.jsx(U,{primary:!0,icon:e.jsx(Re,{size:"1.5rem",color:r.white}),children:t("create new form")})})}),e.jsx(rt,{}),e.jsx(pt,{})]})})},It=()=>{const{t:r}=k("common");return e.jsxs(e.Fragment,{children:[e.jsx(Xe,{title:r("title.businessTripApply")}),e.jsx(g.Suspense,{fallback:e.jsx("h1",{children:"啊我還在跑..."}),children:e.jsxs(ke,{children:[e.jsx(oe,{index:!0,element:e.jsx(ft,{})}),e.jsx(oe,{path:"add",element:e.jsx(nt,{})})]})})]})};export{It as default};