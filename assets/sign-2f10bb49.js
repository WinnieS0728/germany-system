import{u as S,r as $,A as m,b as G,a as w,v as O,Q as d,z as T}from"./index-64ebcfb1.js";import{u as P}from"./data-2569dfeb.js";const U=()=>{const{formId:e}=S(a=>a.formInfo).body,s="https://esys.orange-electronic.com/ODF/Sales_Travel?id=TravelAppDe&formN=index",{headData:p}=P(),i=p.EmpName,u=$.useMemo(()=>({done:{"zh-TW":{Sub:`E-system 系統通知 - 德國出差申請單, 表單號碼 : ${e}, 簽核完成`,Messg:`
          <p>您好 : <br />
            <span style="margin-left: 2rem; line-height: 2;">
              您的出差申請 
              <b style="font-size: 1.25rem;">
                已簽核完畢
              </b>, 
              表單號碼
              <b style="font-size: 1.25rem;">
              ${e}
              </b>,
            </span> <br />
            <span style="margin-left: 2rem">
              可點選連結進入 E-system 查看 : 
              <a href=${s}>
                表單連結
              </a>
            </span> <br /><br /><br />
            ※ 此為系統自動通知，請勿直接回覆郵件，感謝您！
          </p>`},"en-US":{Sub:`E-system notification - Germany Business Trip Apply, formId : ${e}, sign off completed`,Messg:`
            <p>Hi : <br />
              <span style="margin-left: 2rem; line-height: 2;">
                your business trip apply
                <b style="font-size: 1.25rem;">
                  is sign off complete
                </b>, 
                formId
                <b style="font-size: 1.25rem;">
                  ${e}
                </b>,
              </span> <br />
              <span style="margin-left: 2rem;">
                Click the link to enter the E-system view : 
                <a href=${s}>
                  page link
                </a>
              </span> <br /><br /><br />
              ※ This is an automatic notification from the system. Please do not reply to the email directly. Thank you !
            </p>
          `}},wait:{"zh-TW":{Sub:`E-system 系統通知 - 德國出差申請單, 表單號碼 : ${e}, 待簽核`,Messg:`
          <p>您好 : <br />
            <span style="margin-left: 2rem; line-height: 2;">
              請協助簽核
              <b style="font-size: 1.25rem;">
                ⟪ ${i} 的出差申請單 ⟫
              </b>, 
              表單號碼
              <b style="font-size: 1.25rem;">
                ${e}
              </b>,
            </span> <br />           
            <span style="margin-left: 2rem;">
              可點選連結進入 E-system 查看 : 
              <a href=${s}>
                表單連結
              </a>
            </span> <br /><br /><br />
            ※ 此為系統自動通知，請勿直接回覆郵件，感謝您！
          </p>
          `},"en-US":{Sub:`E-system notification - Germany Business Trip Apply, formId : ${e}, sign off request`,Messg:`
          <p>Hi : <br />
            <span style="margin-left: 2rem; line-height: 2;">
              please help to sign
              <b style="font-size: 1.25rem;">
                ⟪ business trip apply from ${i} ⟫
              </b>, 
              formId 
              <b style="font-size: 1.25rem;">
                ${e}
              </b>,
            </span> <br />
            <span style="margin-left: 2rem;">
              Click the link to enter the E-system view :
              <a href=${s}>
                page link
              </a>
            </span> <br /><br /><br />
            ※ This is an automatic notification from the system. Please do not reply to the email directly. Thank you !         
          </p>
          `}},other:{"zh-TW":{Sub:`E-system 系統通知 - 德國出差申請單, 表單號碼 : ${e}, 待簽核 ( 會簽 )`,Messg:`
          <p>您好 : <br />
            <span style="margin-left: 2rem; line-height: 2;">
              請協助會簽
              <b style="font-size: 1.25rem;">
                ⟪ ${i} 的出差申請單 ⟫
              </b
              >, 表單號碼 <b style="font-size: 1.25rem;">{{ formId }}</b>,
            </span>
            <br />
            <span style="margin-left: 2rem;">
              可點選連結進入 E-system 查看 : 
              <a href=${s}>
                表單連結
              </a>
            </span> <br /><br /><br />
            ※ 此為系統自動通知，請勿直接回覆郵件，感謝您！
          </p>
          `},"en-US":{Sub:`E-system notification - Germany Business Trip Apply, formId : ${e}, sign off request (countersign)`,Messg:`
          <p>Hi : <br />
            <span style="margin-left: 2rem; line-height: 2;">
              please help to countersign
              <b style="font-size: 1.25rem;">
                ⟪ business trip apply from ${i} ⟫
              </b>, 
              formId
              <b style="font-size: 1.25rem;">
                ${e}
              </b>,
            </span> <br />
            <span style="margin-left: 2rem;">
              Click the link to enter the E-system view :
              <a href=${s}>
                page link
              </a>
          </span> <br /><br /><br />
          ※ This is an automatic notification from the system. Please do not
          reply to the email directly. Thank you !
        </p>
          `}},return:{"zh-TW":{Sub:`E-system 系統通知 - 德國出差申請單, 表單號碼 : ${e}, 簽核失敗`,Messg:`
          <p>您好 : <br />
            <span style="margin-left: 2rem; line-height: 2;">
              您的出差申請
              <b style="font-size: 1.25rem;">
                不同意簽核
              </b>, 
              表單號碼
              <b style="font-size: 1.25rem;">
                ${e}
              </b>,
            </span> <br />
            <span style="margin-left: 2rem;">
              可點選連結進入 E-system 查看 : 
              <a href=${s}>
                表單連結
              </a>
            </span> <br /><br /><br />
            ※ 此為系統自動通知，請勿直接回覆郵件，感謝您！
          </p>
          `},"en-US":{Sub:`E-system notification - Germany Business Trip Apply, formId : ${e}, sign off failed`,Messg:`
          <p>Hi : <br />
            <span style="margin-left: 2rem; line-height: 2;">
              your business trip apply
              <b style="font-size: 1.25rem;">
                is sign off failed
              </b>, 
              formId
              <b style="font-size: 1.25rem;">
                ${e}
              </b>,
            </span> <br />
            <span style="margin-left: 2rem;">
              Click the link to enter the E-system view :
              <a href=${s}>
                page link
              </a>
            </span> <br /><br /><br />
            ※ This is an automatic notification from the system. Please do not reply to the email directly. Thank you !
          </p>
        `}},void:{"zh-TW":{Sub:`E-system 系統通知 - 德國出差申請單, 表單號碼 : ${e}, 已作廢`,Messg:`
          <p>您好 : <br />
            <span style="margin-left: 2rem; line-height: 2;">
              您的出差申請
              <b style="font-size: 1.25rem;">
                已作廢
              </b>,
              表單號碼
              <b style="font-size: 1.25rem;">
                ${e}
              </b>,
            </span> <br />
            <span style="margin-left: 2rem;">
              可點選連結進入 E-system 查看 : 
                <a href=${s}>
                  表單連結
                </a>
            </span> <br /><br /><br />
            ※ 此為系統自動通知，請勿直接回覆郵件，感謝您！
          </p>
          `},"en-US":{Sub:`E-system notification - Germany Business Trip Apply, formId : ${e}, Abolished`,Messg:`
          <p>Hi : <br />
            <span style="margin-left: 2rem; line-height: 2;">
              your business trip apply
              <b style="font-size: 1.25rem;">
                is abolished
              </b>,
              formId
              <b style="font-size: 1.25rem;">
                ${e}
              </b>,
            </span> <br />
            <span style="margin-left: 2rem;">
              Click the link to enter the E-system view :
              <a href=${s}>
                page link
              </a>
            </span> <br /><br /><br />
            ※ This is an automatic notification from the system. Please do not reply to the email directly. Thank you !
          </p>
        `}}}),[i,e,s]);async function l(a,f){var b;const c=(b=await m.getMember(a))==null?void 0:b[0].Language;return u[`${f}`][`${c}`]}async function y(a,f){m.sendEmail(a,await l(a,f))}return{sendEmail:y}},R=()=>{const{t:e}=G("toast"),{formId:s,nowOrder:p,signList:i,nextSign:u}=S(t=>t.formInfo).body,l=S(t=>t.nowUser).body,y=w(),{sendEmail:a}=U(),f=$.useMemo(()=>{var n;const t=p,r=(n=i[i.length-1])==null?void 0:n.SIGNORDER;return t===r},[p,i]);async function c(t){let r,n="";if(t==="delete"?(r={BTPId:s,Status:"4",type:"1"},n=e("formStatus.void"),g()):t==="no"?(r={BTPId:s,Status:"3",type:"1"},n=e("formStatus.return")):t==="yes"&&f&&(r={BTPId:s,Status:"2",type:"1"},n=e("formStatus.done")),!r)return;const h=m.updateForm(r);d.promise(h,{pending:e("formStatus.pending"),success:`${s} ${n}`,error:e("formStatus.fail")})}function E(t){return t==="yes"?1:t==="no"?3:0}const b=O();function g(){setTimeout(()=>{b("../apply")},1e3)}async function N(t){const r={...u,ACTUALNAME:l.EmpName,ACTUALSIGNER:l.EmpId,SIGNRESULT:E(t.agree),OPINION:t.opinion,SIGNTIME:"",types:"1",ExceId:l.EmpId},n=m.updateSignStatus(r);d.promise(n,{pending:e("sign.pending"),success:e("sign.success"),error:e("sign.fail")}),y(T()),g()}function I(t){return parseInt(t.Title.split("-")[0])}async function z(t){const r=(await Promise.all(t.map(async o=>(await m.getMember(o))[0]))).sort((o,k)=>I(o)-I(k)),n=r.map(o=>({FORMNO:s,SIGNORDER:p,STEPNAME:o.DeptName,SIGNER:o.EmpId,SIGNERNAME:o.EmpName,OPINION:"",SignGroup:"會簽"})),h=m.postOtherSign(n);d.promise(h,{pending:e("otherSign.pending"),success:e("otherSign.success"),error:e("otherSign.fail")});const A=r[0].EmpId;a(A,"other"),y(T()),g()}async function M(){const r=i.slice(p+1).map(n=>({...n,ACTUALNAME:"",ACTUALSIGNER:"",SIGNRESULT:5,types:"1",OPINION:"",SIGNTIME:"",ExceId:l.EmpId}));for(const n of r)(function(){m.updateSignStatus(n)})()}return{sign:N,updateFormStatus:c,otherSign:z,signOver:M}};export{U as a,R as u};
