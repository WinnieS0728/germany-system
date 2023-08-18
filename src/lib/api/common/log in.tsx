import axios from "axios";

export function LogIn(apiPath: string) {
  return async function (id: string, password: string) {
    try {
      const res = await axios({
        method: "POST",
        url: `${apiPath}/Login`,
        data: {
          acc: id, //工號
          Pwd: password, //密碼
        },
      });
      if (res.data === "密碼通過") {
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  };
}
