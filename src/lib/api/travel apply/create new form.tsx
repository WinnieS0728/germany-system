import axios from "axios";

export function addForm(apiPath: string) {
  return async function (data: any) {
    function setIsLodging() {
      if (data.IsLodging === "Yes") {
        return "Y";
      }
      return "N";
    }
    setIsLodging();

    // TODO log 建立單
    const res = await axios({
      method: "POST",
      url: `${apiPath}/TraveAppHAdd`,
      data: {
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
      },
    });
    console.log("建立出差header api回傳", res.data);

    return res.data;
  };
}
