import axios from "axios";

export function uploadFileSign(apiPath: string) {
  return async function (data: FormData) {
    data.forEach((v, k) => {
      console.log(k, v);
    });

    // TODO 解開 api
    // const res = await axios({
    //   method: "POST",
    //   url: `${apiPath}/UploadSignFormData`,
    //   data: data,
    //   headers: {
    //     "Content-Type": "multipart/form-data",
    //   },
    // });
    // return res.data;
  };
}
