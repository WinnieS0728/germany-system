import axios from "axios";

type emailData = {
  Sub: string;
  Messg: string;
};
export function sendEmail(apiPath: string) {
  return async function (EmpId: string, data: emailData) {
    console.log({
      Empid: EmpId,
      ...data,
    });

    // TODO 打開api
    // const res = await axios<string>({
    //   method: "POST",
    //   url: `${apiPath}/MailSend`,
    //   data: {
    //     Empid: EmpId,
    //     ...data,
    //   },
    // });
    // return res.data;
  };
}
