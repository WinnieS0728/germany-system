import axios from "axios";

export function uploadFile(apiPath: string) {
  return async function (data: FormData) {
    const res = await axios({
      method: "POST",
      url: `${apiPath}/UploadFormData`,
      data: data,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    // TODO log附件回傳
    console.log("一般附件api回傳", res.data);
    return res.data;
  };
}
