import axios from "axios";

export type emailData = {
  Sub: string;
  Messg: string;
};
export function sendEmail(apiPath: string) {
  return async function (EmpId: string, data: emailData) {
    // TODO 打開api
    const res = await axios<string>({
      method: "POST",
      url: `${apiPath}/MailSend`,
      data: {
        Empid: EmpId,
        ...data,
      },
    });
    console.log(`已將${data.Sub}寄給${EmpId}`);
    return res.data;
  };
}
