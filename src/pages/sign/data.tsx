import { useCallback, useEffect, useState } from "react";
import api from "@/lib/api";
import { dateFormatter } from "@/hooks/dateFormatter";
import { signDataType } from "@/types";

const initData: signDataType = {
  id: "",
  createDate: "",
  status: "",
  company: "",
  dept: "",
  EmpName: "",
  transportation: "",
  isLodging: "",
  stayDays: "",
  days: "",
  money: "",
  agent: "",
};
export const useSignPageData = (formId: string) => {
  const [dataSet, setData] = useState(initData);

  const getHeaderData = useCallback(() => {
    async function getData(id: string) {
      const res = await api.getBusinessApplyHeader(id);
      return res;
    }
    return getData(formId);
  }, [formId]);
  const getDetailData = useCallback(() => {
    async function getData(id: string) {
      const res = await api.getBusinessApplyDetail(id);
      return res;
    }
    return getData(formId);
  }, [formId]);
  const getMemberInfo = useCallback((id: string) => {
    async function getData() {
      const res = await api.getMember(id);
      return res;
    }
    return getData();
  }, []);

  useEffect(() => {
    async function a() {
      const headerData = await getHeaderData();
      const detailData = await getDetailData();
      //   console.log(headerData, detailData);

      const memberInfo = await getMemberInfo(headerData[0].Createid);

      function Lodging(t: "N" | "Y"): string {
        if (t === "N") {
          return "No";
        } else if (t === "Y") {
          return "Yes";
        } else {
          return "";
        }
      }

      function money(m: string, c: string): string {
        if (m === "0") {
          return m;
        } else {
          return `${m} (${c})`;
        }
      }

      const data: signDataType = {
        id: headerData[0].BTPId,
        createDate: dateFormatter(headerData[0].Createdate.split(" ")[0]),
        status: headerData[0].status,
        company: memberInfo[0].ResourcesName,
        dept: memberInfo[0].DeptName,
        EmpName: memberInfo[0].EmpName,
        transportation: headerData[0].ResourcesName,
        isLodging: Lodging(headerData[0].IsLodging),
        stayDays: headerData[0].StayDays,
        days: headerData[0].Days,
        money: money(headerData[0].Advance_Amount, headerData[0].Curr),
        agent: headerData[0].DeputyEmpName || "無人回應",
      };
      setData(data);
    }
    a();
  }, [formId, getDetailData, getHeaderData, getMemberInfo]);

  return dataSet;
};
