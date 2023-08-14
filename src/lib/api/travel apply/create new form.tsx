import axios from "axios";

export type createNewForm = {
  BTPId: string; // auto
  Status: "1";
  ComId: "ORANGEBV";
  DeptId: string;
  StartDT: string;
  EndDT: string;
  Days: number;
  StayDays: number;
  IsForeign: "2";
  IsLodging: string;
  Transport: string;
  Curr: string;
  Advance_Ticket: "0";
  Advance_Lodging: "0";
  Advance_Amount: string;
  Deputy: string;
  CreateId: string;
  type: "0";
};

export function addForm(apiPath: string) {
  return async function (data: any) {
    function setIsLodging() {
      if (data.IsLodging === "Yes") {
        return "Y";
      }
      return "N";
    }
    setIsLodging();

    const dataSet: createNewForm = {
      BTPId: "", // auto
      Status: "1",
      ComId: "ORANGEBV",
      DeptId: data.DeptId,
      StartDT: data.nextMonday,
      EndDT: data.nextSunday,
      Days: data.Days,
      StayDays: data.StayDays,
      IsForeign: "2",
      IsLodging: setIsLodging(),
      Transport: data.Transport,
      Curr: data.Curr,
      Advance_Ticket: "0",
      Advance_Lodging: "0",
      Advance_Amount: data.Advance_Amount,
      Deputy: data.Deputy,
      CreateId: data.CreateId,
      type: "0",
    };

    const res = await axios({
      method: "POST",
      url: `${apiPath}/TraveAppHAdd`,
      data: dataSet,
    });
    return res.data;
  };
}
