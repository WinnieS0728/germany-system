import { useCallback, useEffect, useState } from "react";
import api from "@/lib/api";
import { dateFormatter } from "@/hooks/dateFormatter";
import { signDataType } from "@/types";
import { timeDay } from "d3-time";
import { detailDataType, detailDataWithSingleData } from "@/data/reducers/trip detail/trip detail";

const initData: signDataType = {
  id: "",
  createDate: "",
  status: "",
  company: "",
  dept: "",
  EmpId: "",
  EmpName: "",
  transportation: "",
  isLodging: "",
  stayDays: "",
  days: "",
  money: "",
  agent: "",
};

export const useSignPageData = (formId: string) => {
  const [headData, setData] = useState<signDataType>(initData);
  const [detailData, setData2] = useState<detailDataWithSingleData[][]>([]);

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
      function getDayList(date: {
        startDate: string;
        endDate: string;
      }): string[] {
        const dayList = [];
        const days =
          timeDay.count(new Date(date.startDate), new Date(date.endDate)) + 1;
        for (let n = 0; n < days; n++) {
          dayList.push(
            dateFormatter(timeDay.offset(new Date(date.startDate), n))
          );
        }
        return dayList;
      }

      const data: signDataType = {
        id: headerData[0].BTPId,
        createDate: dateFormatter(headerData[0].Createdate.split(" ")[0]),
        status: headerData[0].status,
        company: memberInfo[0].ResourcesName,
        dept: memberInfo[0].DeptName,
        EmpId: memberInfo[0].EmpId,
        EmpName: memberInfo[0].EmpName,
        transportation: headerData[0].ResourcesName,
        isLodging: Lodging(headerData[0].IsLodging),
        stayDays: headerData[0].StayDays,
        days: headerData[0].Days,
        money: money(headerData[0].Advance_Amount, headerData[0].Curr),
        agent: headerData[0].DeputyEmpName || "無人回應",
      };
      setData(data);

      const data2: detailDataWithSingleData[] = detailData.map(
        (data: any, index: number) => {
          return {
            id: index + 1,
            date: getDayList({
              startDate: dateFormatter(data.StartDT.split(" ")[0]),
              endDate: dateFormatter(data.EndDT.split(" ")[0]),
            }),
            data: {
              district: data.Area,
              city: data.City,
              purpose: data.ResourcesName,
              cus: data.CustName,
              hotel: data.Hotel,
              PS: data.Description,
            },
          };
        }
      );
      const data3 = [
        ...new Set(
          data2
            .map((d) => {
              return data2.filter((d2) =>
                (d2.date as string[]).every(
                  (date, index) => date === (d.date as string[])[index]
                )
              );
            })
            .map((d) => d.map((d2) => d2.id).join(","))
        ),
      ].map((d) =>
        d.split(",").map((s) => data2.find((d2) => d2.id === parseInt(s)))
      ) as detailDataWithSingleData[][];
      
      setData2(data3);
    }
    a();
  }, [formId, getDetailData, getHeaderData, getMemberInfo]);

  return { headData, detailData };
};
