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
    return res.data;
  };
}
