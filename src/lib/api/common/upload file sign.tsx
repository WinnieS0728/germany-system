import axios, { AxiosResponse } from "axios";

export function uploadFileSign(apiPath: string) {
  return async function (data: FormData) {
    const res: AxiosResponse<string> = await axios({
      method: "POST",
      url: `${apiPath}/UploadSignFormData`,
      data: data,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return res.data;
  };
}
