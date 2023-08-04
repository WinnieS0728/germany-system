// import axios from "axios";

export function pushNewData(apiPath: string) {
  return async function (data: any) {
    console.log(data);
    console.log(apiPath);

    // const res = await axios({
    //   method: "POST",
    //   url: `${apiPath}/假的`,
    //   data: data
    // });
    // return res.data;
  };
}

//   url: `${apiPath}/TraveAppDAdd`,
