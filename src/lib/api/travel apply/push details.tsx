import axios from "axios";

export function pushNewData(apiPath: string) {
  return async function (data: any) {
    console.log(data);
    const res = await axios({
      method: "POST",
      url: "",
      data: data
    });
    return res.data;
  };
}

//   url: `${apiPath}/TraveAppDAdd`,
