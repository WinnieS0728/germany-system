import axios, { AxiosResponse } from "axios";

interface dataNoChange {
  BTPId: string; // auto
  Status: "1";
  ComId: "ORANGEBV";
  IsForeign: "2";
  Advance_Ticket: "0";
  Advance_Lodging: "0";
  type: "0";
}
export interface dataFromForm {
  DeptId: string;
  StartDT: string;
  EndDT: string;
  Days: number;
  StayDays: number;
  IsLodging: string;
  Transport: string;
  Curr: string;
  Advance_Amount: string;
  Deputy: string;
  CreateId: string;
}
export type createNewForm = dataNoChange & dataFromForm;

export function addForm(apiPath: string) {
  return async function (data: dataFromForm) {
    function setIsLodging() {
      if (data.IsLodging === "Yes") {
        return "Y";
      }
      return "N";
    }
    setIsLodging();

    const dataSet: createNewForm = {
      ...data,
      BTPId: "", // auto
      Status: "1",
      ComId: "ORANGEBV",
      IsForeign: "2",
      IsLodging: setIsLodging(),
      Advance_Ticket: "0",
      Advance_Lodging: "0",
      type: "0",
    };

    const res: AxiosResponse<string> = await axios({
      method: "POST",
      url: `${apiPath}/TraveAppHAdd`,
      data: dataSet,
    });
    return res.data;
  };
}
