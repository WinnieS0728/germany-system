import axios from "axios";

export function uploadFileSign(apiPath: string) {
  return async function (data: FormData) {
    const res = await axios({
      method: "POST",
      url: `${apiPath}/UploadSignFormData`,
      data: data,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    // TODO log附件回傳
    console.log("簽核附件api回傳", res.data);

    return res.data;
  };
}
