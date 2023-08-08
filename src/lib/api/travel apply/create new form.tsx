// import axios from "axios";

export function addForm(apiPath: string) {
  return async function (data: any) {
    console.log(data);
    function setIsLodging() {
      if (data.IsLodging === "No") {
        return "N";
      } else if (data.IsLodging === "Yes") {
        return "Y";
      }
    }
    setIsLodging()
    return "BTP202308666"
    // const res = await axios({
    //   method: "POST",
    //   url: `${apiPath}/假的`,
    //   data: {
    //     BTPId: "", // auto
    //     Status: "1",
    //     ComId: "ORANGEBV",
    //     DeptId: data.DeptId,
    //     StartDT: data.nextMonday,
    //     EndDT: data.nextSunday,
    //     Days: data.Days,
    //     StayDays: data.StayDays,
    //     IsForeign: "2",
    //     IsLodging: setIsLodging(),
    //     Transport: data.Transport,
    //     Curr: data.Curr,
    //     Advance_Ticket: "",
    //     Advance_Lodging: "",
    //     Advance_Amount: data.Advance_Amount,
    //     Deputy: data.Deputy,
    //     CreateId: data.CreateId,
    //     type: "0",
    //   },
    // });
    // return res.data;
  };
}

//   url: `${apiPath}/TraveAppHAdd`,
