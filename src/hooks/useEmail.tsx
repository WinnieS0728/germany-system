import api from "@/api";
import { useSignPageData } from "@/pages/visit apply/sign/data";
import { useMemo } from "react";
import { useAppSelector } from "@data/store";
import { emailData } from "@/api/common/email";

export const useEmail = () => {
  const { formId } = useAppSelector((state) => state.formInfo).body;
  const link = `https://esys.orange-electronic.com/ODF/Sales_Travel?id=TravelAppDe&formN=index`;
  const { headData } = useSignPageData();
  const createName = headData.EmpName;
  const emailContent: email = useMemo(() => {
    return {
      done: {
        "zh-TW": {
          Sub: `E-system 系統通知 - 德國出差申請單, 表單號碼 : ${formId}, 簽核完成`,
          Messg: `
          <p>您好 : <br />
            <span style="margin-left: 2rem; line-height: 2;">
              您的出差申請 
              <b style="font-size: 1.25rem;">
                已簽核完畢
              </b>, 
              表單號碼
              <b style="font-size: 1.25rem;">
              ${formId}
              </b>,
            </span> <br />
            <span style="margin-left: 2rem">
              可點選連結進入 E-system 查看 : 
              <a href=${link}>
                表單連結
              </a>
            </span> <br /><br /><br />
            ※ 此為系統自動通知，請勿直接回覆郵件，感謝您！
          </p>`,
        },
        "en-US": {
          Sub: `E-system notification - Germany Business Trip Apply, formId : ${formId}, sign off completed`,
          Messg: `
            <p>Hi : <br />
              <span style="margin-left: 2rem; line-height: 2;">
                your business trip apply
                <b style="font-size: 1.25rem;">
                  is sign off complete
                </b>, 
                formId
                <b style="font-size: 1.25rem;">
                  ${formId}
                </b>,
              </span> <br />
              <span style="margin-left: 2rem;">
                Click the link to enter the E-system view : 
                <a href=${link}>
                  page link
                </a>
              </span> <br /><br /><br />
              ※ This is an automatic notification from the system. Please do not reply to the email directly. Thank you !
            </p>
          `,
        },
      },
      wait: {
        "zh-TW": {
          Sub: `E-system 系統通知 - 德國出差申請單, 表單號碼 : ${formId}, 待簽核`,
          Messg: `
          <p>您好 : <br />
            <span style="margin-left: 2rem; line-height: 2;">
              請協助簽核
              <b style="font-size: 1.25rem;">
                ⟪ ${createName} 的出差申請單 ⟫
              </b>, 
              表單號碼
              <b style="font-size: 1.25rem;">
                ${formId}
              </b>,
            </span> <br />           
            <span style="margin-left: 2rem;">
              可點選連結進入 E-system 查看 : 
              <a href=${link}>
                表單連結
              </a>
            </span> <br /><br /><br />
            ※ 此為系統自動通知，請勿直接回覆郵件，感謝您！
          </p>
          `,
        },
        "en-US": {
          Sub: `E-system notification - Germany Business Trip Apply, formId : ${formId}, sign off request`,
          Messg: `
          <p>Hi : <br />
            <span style="margin-left: 2rem; line-height: 2;">
              please help to sign
              <b style="font-size: 1.25rem;">
                ⟪ business trip apply from ${createName} ⟫
              </b>, 
              formId 
              <b style="font-size: 1.25rem;">
                ${formId}
              </b>,
            </span> <br />
            <span style="margin-left: 2rem;">
              Click the link to enter the E-system view :
              <a href=${link}>
                page link
              </a>
            </span> <br /><br /><br />
            ※ This is an automatic notification from the system. Please do not reply to the email directly. Thank you !         
          </p>
          `,
        },
      },
      other: {
        "zh-TW": {
          Sub: `E-system 系統通知 - 德國出差申請單, 表單號碼 : ${formId}, 待簽核 ( 會簽 )`,
          Messg: `
          <p>您好 : <br />
            <span style="margin-left: 2rem; line-height: 2;">
              請協助會簽
              <b style="font-size: 1.25rem;">
                ⟪ ${createName} 的出差申請單 ⟫
              </b
              >, 表單號碼 <b style="font-size: 1.25rem;">{{ formId }}</b>,
            </span>
            <br />
            <span style="margin-left: 2rem;">
              可點選連結進入 E-system 查看 : 
              <a href=${link}>
                表單連結
              </a>
            </span> <br /><br /><br />
            ※ 此為系統自動通知，請勿直接回覆郵件，感謝您！
          </p>
          `,
        },
        "en-US": {
          Sub: `E-system notification - Germany Business Trip Apply, formId : ${formId}, sign off request (countersign)`,
          Messg: `
          <p>Hi : <br />
            <span style="margin-left: 2rem; line-height: 2;">
              please help to countersign
              <b style="font-size: 1.25rem;">
                ⟪ business trip apply from ${createName} ⟫
              </b>, 
              formId
              <b style="font-size: 1.25rem;">
                ${formId}
              </b>,
            </span> <br />
            <span style="margin-left: 2rem;">
              Click the link to enter the E-system view :
              <a href=${link}>
                page link
              </a>
          </span> <br /><br /><br />
          ※ This is an automatic notification from the system. Please do not
          reply to the email directly. Thank you !
        </p>
          `,
        },
      },
      return: {
        "zh-TW": {
          Sub: `E-system 系統通知 - 德國出差申請單, 表單號碼 : ${formId}, 簽核失敗`,
          Messg: `
          <p>您好 : <br />
            <span style="margin-left: 2rem; line-height: 2;">
              您的出差申請
              <b style="font-size: 1.25rem;">
                不同意簽核
              </b>, 
              表單號碼
              <b style="font-size: 1.25rem;">
                ${formId}
              </b>,
            </span> <br />
            <span style="margin-left: 2rem;">
              可點選連結進入 E-system 查看 : 
              <a href=${link}>
                表單連結
              </a>
            </span> <br /><br /><br />
            ※ 此為系統自動通知，請勿直接回覆郵件，感謝您！
          </p>
          `,
        },
        "en-US": {
          Sub: `E-system notification - Germany Business Trip Apply, formId : ${formId}, sign off failed`,
          Messg: `
          <p>Hi : <br />
            <span style="margin-left: 2rem; line-height: 2;">
              your business trip apply
              <b style="font-size: 1.25rem;">
                is sign off failed
              </b>, 
              formId
              <b style="font-size: 1.25rem;">
                ${formId}
              </b>,
            </span> <br />
            <span style="margin-left: 2rem;">
              Click the link to enter the E-system view :
              <a href=${link}>
                page link
              </a>
            </span> <br /><br /><br />
            ※ This is an automatic notification from the system. Please do not reply to the email directly. Thank you !
          </p>
        `,
        },
      },
      void: {
        "zh-TW": {
          Sub: `E-system 系統通知 - 德國出差申請單, 表單號碼 : ${formId}, 已作廢`,
          Messg: `
          <p>您好 : <br />
            <span style="margin-left: 2rem; line-height: 2;">
              您的出差申請
              <b style="font-size: 1.25rem;">
                已作廢
              </b>,
              表單號碼
              <b style="font-size: 1.25rem;">
                ${formId}
              </b>,
            </span> <br />
            <span style="margin-left: 2rem;">
              可點選連結進入 E-system 查看 : 
                <a href=${link}>
                  表單連結
                </a>
            </span> <br /><br /><br />
            ※ 此為系統自動通知，請勿直接回覆郵件，感謝您！
          </p>
          `,
        },
        "en-US": {
          Sub: `E-system notification - Germany Business Trip Apply, formId : ${formId}, Abolished`,
          Messg: `
          <p>Hi : <br />
            <span style="margin-left: 2rem; line-height: 2;">
              your business trip apply
              <b style="font-size: 1.25rem;">
                is abolished
              </b>,
              formId
              <b style="font-size: 1.25rem;">
                ${formId}
              </b>,
            </span> <br />
            <span style="margin-left: 2rem;">
              Click the link to enter the E-system view :
              <a href=${link}>
                page link
              </a>
            </span> <br /><br /><br />
            ※ This is an automatic notification from the system. Please do not reply to the email directly. Thank you !
          </p>
        `,
        },
      },
    };
  }, [createName, formId, link]);

  async function getContent(EmpId: string, type: emailType) {
    const lang = (await api.getMember(EmpId))?.[0].Language;
    const content = emailContent[`${type}`][`${lang}`];
    return content;
  }

  async function sendEmail(EmpId: string, type: emailType) {
    api.sendEmail(EmpId, await getContent(EmpId, type));
  }

  return { sendEmail };
};

export type emailType = "done" | "wait" | "other" | "return" | "void";

export type lang = "zh-TW" | "en-US";
type email = Record<emailType, Record<lang, emailData>>;
