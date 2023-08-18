import { useId2name } from "@/hooks/id2name";
import { useAppSelector } from "@/hooks/redux";
import { statusStringType } from "@/hooks/status translate";
import api from "@/lib/api";
import { tripDetailResType } from "@/lib/api/travel apply/get detail";
import { tripListResType } from "@/lib/api/travel apply/get list";
import { tripEvent } from "@/types";
import { timeFormat } from "d3";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export type dataSet = {
  id?: number;
  date: {
    start: string;
    end: string;
  };
  formId: string;
  atuNum: number;
  oldCusNum: number;
  newCusNum: number;
  EmpId: string;
  name: string;
  formStatus: statusStringType;
  nextSign: string;
};

export const useFetchApplyList = () => {
  const { i18n } = useTranslation();
  const nowLang = i18n.language;
  const [data, setData] = useState<dataSet[]>([]);
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
  const { id2name } = useId2name();

  const getDays = useCallback((d: tripDetailResType[]) => {
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
        return list.filter((i) => i.TripEvent === tripEvent.atu).length;
      });
      const oldCusNumArray = detailList.map((list) => {
        return list.filter((i) => i.TripEvent === tripEvent.oldCus).length;
      });
      const newCusNumArray = detailList.map((list) => {
        return list.filter((i) => i.TripEvent === tripEvent.newCus).length;
      });
      const dateArray = detailList.map((list) => {
        return getDays(list);
      });

      const dataSet: dataSet[] = await Promise.all(
        empFilter.map(async (list, index) => {
          return {
            date: dateArraySort(dateArray[index]),
            formId: list.BTPId,
            atuNum: atuNumArray[index],
            oldCusNum: oldCusNumArray[index],
            newCusNum: newCusNumArray[index],
            EmpId: list.Createid,
            name: await id2name(list.Createid),
            formStatus: list.Status,
            nextSign:
              nowLang === "en"
                ? list.SName?.split("/")[0].replace(/ /g, "")
                : list.SName?.split("/")[1].replace(/ /g, ""),
          };
        })
      );

      const dateFilter = dateProcess(dataSet);
      const fineData: dataSet[] = dateFilter.reverse().map((data, index) => {
        return {
          id: index + 1,
          ...data,
        };
      });
      setData(fineData);

      function empProcess(data: tripListResType[]) {
        if (!props.EmpId) {
          return data;
        }
        return data?.filter((i) => i.Createid === props.EmpId);
      }
      function dateProcess(data: dataSet[]) {
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
  }, [getDays, id2name, nowLang, tableProps]);

  return { data, status };
};
