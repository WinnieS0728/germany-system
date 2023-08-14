import { useAppSelector } from "@/hooks/redux";
import api from "@/lib/api";
import { tripEvent } from "@/types";
import { timeFormat } from "d3";
import { useCallback, useEffect, useState } from "react";

export const useFetchApplyList = () => {
  const [data, setData] = useState<any[]>([]);
  const tableProps = useAppSelector((state) => state.listFormState);  

  const status = tableProps.status;

  function getTimeStamp(d: string) {
    return new Date(d).getTime();
  }
  function getFormatDate(d: string | Date) {
    return timeFormat("%Y-%m-%d")(new Date(d));
  }
  async function getDetail(id: string) {
    const res = await api.getBusinessApplyDetail(id);
    return res;
  }

  const getDays = useCallback((d: any[]) => {
    const dateArray = d.map((i) => {
      if (!i.StartDT || !i.EndDT) {
        return [];
      }
      return [
        getFormatDate(i.StartDT.split(" ")[0]),
        getFormatDate(i.EndDT.split(" ")[0]),
      ];
    });
    return dateArray;
  }, []);

  useEffect(() => {
    const { props, body } = tableProps;
    async function fetchData() {
      const empFilter = empProcess(body);
      if (!empFilter) {
        console.log("查無資料");
        return [];
      }
      const detailList = await Promise.all(
        empFilter.map(async (d) => await getDetail(d.BTPId))
        );      
      const atuNumArray = detailList.map((list) => {
        return list.filter(
          (i: { TripEvent: string }) => i.TripEvent === tripEvent.atu
        ).length;
      });
      const oldCusNumArray = detailList.map((list) => {
        return list.filter(
          (i: { TripEvent: string }) => i.TripEvent === tripEvent.oldCus
        ).length;
      });
      const newCusNumArray = detailList.map((list) => {
        return list.filter(
          (i: { TripEvent: string }) => i.TripEvent === tripEvent.newCus
        ).length;
      });
      const dateArray = detailList.map((list) => {
        return getDays(list);
      });

      const dataSet = empFilter.map((list, index) => {
        return {
          date: dateArraySort(dateArray[index]),
          formId: list.BTPId,
          atuNum: atuNumArray[index],
          oldCusNum: oldCusNumArray[index],
          newCusNum: newCusNumArray[index],
          name: list.EmpName,
          formStatus: list.Status,
          nextSign: list.SName?.split("/")[0].replace(/ /g, ""),
        };
      });
      const dateFilter = dateProcess(dataSet);
      const fineData = dateFilter.reverse().map((data, index) => {
        return {
          id: index + 1,
          ...data,
        };
      });
      setData(fineData);

      function empProcess(data: any[]) {
        if (!props.EmpId) {
          return data;
        }
        return data?.filter(
          (i: { Createid: string }) => i.Createid === props.EmpId
        );
      }
      function dateProcess(data: any[]) {
        if (!props.date || !props.date.start || !props.date.end) {
          return data;
        }
        return data.filter(
          (i) =>
            getTimeStamp(props.date.start) <= getTimeStamp(i.date.start) &&
            getTimeStamp(i.date.end) <= getTimeStamp(props.date.end)
        );
      }
      function dateArraySort(data: string[][]) {
        const dateArray = [...new Set(data.reduce((a, b) => a.concat(b), []))];

        return { start: dateArray[0], end: dateArray[dateArray.length - 1] };
      }
    }
    fetchData();
  }, [getDays, tableProps]);

  return { data, status };
};
