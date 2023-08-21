import { dateFormatter } from "@/hooks/dateFormatter";
import { useId2name } from "@/hooks/id2name";
import { useAppSelector } from "@/hooks/redux";
import { statusStringType } from "@/hooks/status translate";
import api from "@/lib/api";
import { tripDetailResType } from "@/lib/api/travel apply/get detail";
import { tripListResType } from "@/lib/api/travel apply/get list";
import { tripEvent } from "@/types";
import { useCallback, useEffect, useMemo, useState } from "react";
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
  const tableProps = useAppSelector((state) => state.listFormState);
  const { props, body } = tableProps;
  const status = tableProps.status;
  
  const [data, setData] = useState<dataSet[]>([]);

  function getTimeStamp(d: string) {
    return new Date(d).getTime();
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
        dateFormatter(i.StartDT.split(" ")[0]),
        dateFormatter(i.EndDT.split(" ")[0]),
      ];
    });
    return dateArray;
  }, []);

  const asyncData = useMemo(() => {
    async function fetchData() {
      const empFilter = empProcess(body);
      if (!empFilter) {
        return [];
      }
      const detailList = await Promise.all(
        empFilter.map(async (d) => await getDetail(d.BTPId))
      );

      const atuNumArray = visitFilter(tripEvent.atu);
      const oldCusNumArray = visitFilter(tripEvent.oldCus);
      const newCusNumArray = visitFilter(tripEvent.newCus);

      const dateArray = detailList.map((list) => getDays(list));

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
                ? list.SName?.split("/")[0]?.replace(/ /g, "")
                : list.SName?.split("/")[1]?.replace(/ /g, ""),
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
      return fineData;

      function visitFilter(filter: string) {
        return detailList.map(
          (list) => list.filter((i) => i.TripEvent === filter).length
        );
      }
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
    return fetchData();
  }, [body, getDays, id2name, nowLang, props.EmpId, props.date]);

  useEffect(() => {
    (async function () {
      setData(await asyncData);
    })();
  }, [asyncData]);

  return { data, status };
};
