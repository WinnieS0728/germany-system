import axios from "axios";

export function getFormAttach(apiPath: string) {
  return async function (id: string) {
    const res = await axios({
      method: "POST",
      url: `${apiPath}/GetSignWFP`,
      data: {
        FileId: "", //附檔編號
        FileName: "", //附檔名稱
        FilePath: "", //附檔存放路徑 //ReportFile
        WebName: "BusinessTrip", //附檔所在網頁名稱
        WebID: id, //附檔所在 對應表單表編號ID
        ExecID: "",
      },
    });
    return res.data;
  };
}
