import axios from "axios";

type emailData = {
  Empid: string;
  Sub: string;
  Messg: string;
};
export function sendEmail(apiPath: string) {
  return async function (data: emailData) {
    const res = await axios<string>({
      method: "POST",
      url: `${apiPath}/MailSend`,
      data: data,
    });
    return res.data;
  };
}
