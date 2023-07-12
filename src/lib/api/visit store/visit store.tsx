import axios from "axios";
import { timeDay } from "d3-time";

function thisYear(apiPath: string) {
  return async function () {
    const res = await axios({
      method: "POST",
      url: `${apiPath}/GetSalesVisit`,
      data: { EmpId: "", Startdt: "", Enddt: "", type: "YYYY" },
    });
    return res.data;
  };
}

function week(apiPath: string) {
  return async function (date: string) {
    const endDate = timeDay.offset(new Date(date), 8);
    const res = await axios({
      method: "POST",
      url: `${apiPath}/GetSalesVisit`,
      data: { EmpId: "", Startdt: date, Enddt: endDate, type: "Week" },
    });
    return res.data;
  };
}

function person(apiPath: string) {
  return async function (id: string) {
    const res = await axios({
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
