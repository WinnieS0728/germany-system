import axios, { AxiosResponse } from "axios";

export type visit_YearResType = {
  Vqty: string;
  YYYY: string;
  MM: string;
  ResourcesName: string;
};

export type visit_otherResType = {
  empname: string;
} & visit_YearResType;

function thisYear(apiPath: string) {
  return async function () {
    const res: AxiosResponse<visit_YearResType[]> = await axios({
      method: "POST",
      url: `${apiPath}/GetSalesVisit`,
      data: { EmpId: "", Startdt: "", Enddt: "", type: "YYYY" },
    });
    return res.data;
  };
}

interface weekReq {
  startDate: string,
  endDate?: string
}
function week(apiPath: string) {
  return async function ({ startDate, endDate}:weekReq) {
    const res: AxiosResponse<visit_otherResType[]> = await axios({
      method: "POST",
      // url: `${apiPath}/GetSalesVisit`,
      url: `${apiPath}/GetSalesVisit`,
      data: { EmpId: "", Startdt: startDate, Enddt: endDate, type: "Week" },
    });

    return res.data;
  };
}

function person(apiPath: string) {
  return async function (id: string) {
    const res: AxiosResponse<visit_otherResType[]> = await axios({
      method: "POST",
      url: `${apiPath}/GetSalesVisit`,
      data: { EmpId: id, Startdt: "", Enddt: "", type: "EMP" },
    });
    return res.data;
  };
}

export function getVisitData(path: string) {
  return {
    thisYear: thisYear(path),
    week: week(path),
    person: person(path),
  };
}
