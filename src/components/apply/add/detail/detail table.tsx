import { Table } from "@/components/table/table";
import {
  deleteData,
  detailDataType,
  detailDataWithSingleData,
  setTarget,
} from "@/data/reducers/trip detail/trip detail";
import { useModalControl } from "@/hooks/modal control";
import { useAppDispatch } from "@data/store";
import { useCallback, useEffect, useState } from "react";
import { useTheme } from "styled-components";
import * as Icons from "@components/UI/icons";
import api from "@/api";
import { useTranslation } from "react-i18next";
import { newDetailType } from "./new detail";

type detailTableProps = {
  type: "addForm" | "sign";
  data: detailDataWithSingleData[] | detailDataType;
  index?: number;
};

const TableWhenAddForm = ({
  data,
  index,
}: {
  data: newDetailType[];
  index: number;
}) => {
  const { i18n } = useTranslation();
  const nowLang = i18n.language;
  const dispatch = useAppDispatch();
  // console.log(data);

  const [dataSet, setNewData] = useState<newDetailType[]>([]);
  const getEventName = useCallback(
    (code: string) => {
      return (async function () {
        const list = await api.getEvent("TripEvent");
        const target = list.find(
          (i: { ResourcesId: string }) => i.ResourcesId === code
        );
        if (!target) {
          return "";
        }
        if (nowLang === "en") {
          return (target as { ResourcesName_E: string }).ResourcesName_E;
        }
        return (target as { ResourcesName: string }).ResourcesName;
      })();
    },
    [nowLang]
  );
  useEffect(() => {
    (async function () {
      if (!data) {
        setNewData([]);
        return;
      }
      const newArray = await Promise.all(
        data.map(async (i) => {
          return {
            ...i,
            purposeName: await getEventName(i.purpose),
          };
        })
      );
      setNewData(newArray);
    })();
  }, [data, getEventName, index]);

  return dataSet.map((d, id: number) => {
    return (
      <tr key={id}>
        <td>{id + 1}</td>
        <td>{d.district}</td>
        <td>{d.city}</td>
        <td>{d.purposeName}</td>
        <td>{d.cus}</td>
        <td>{d.PS}</td>
        <td
          className='cursor-pointer'
          onClick={() => {
            dispatch(deleteData(index + 1));
          }}
        >
          <div className='flex items-center justify-center'>
            <Icons.Delete size='1.25rem' />
          </div>
        </td>
      </tr>
    );
  });
};

const TableWhenSign = ({ data }: { data: detailDataWithSingleData[] }) => {
  return data.map((d, index) => (
    <tr key={index}>
      <td>{index + 1}</td>
      <td>{d.data.district}</td>
      <td>{d.data.city}</td>
      <td>{d.data.purpose}</td>
      <td>{d.data.cus}</td>
      <td>{d.data.PS}</td>
    </tr>
  ));
};

export const DetailTable = ({ type, data, index }: detailTableProps) => {
  const { t } = useTranslation("list page", { keyPrefix: "detailTable" });
  const color = useTheme()?.color;

  const [toggleModal] = useModalControl("newDetail");

  const [hasData, setData] = useState<boolean>(false);
  const dataSet = (data as detailDataType)?.data;
  
  useEffect(() => {
    if (dataSet && dataSet.length !== 0) {
      setData(true);
    } else {
      setData(false);
    }
  }, [dataSet]);

  const dispatch = useAppDispatch();

  return (
    <>
      <div
        className='title flex items-center justify-between px-4 py-2'
        style={{ backgroundColor: color.sectionHeader, color: color.white }}
      >
        <p>{t("title")}</p>
        {type === "addForm" && (
          <button
            type='button'
            className='px-4 py-1 ring-1'
            style={{ borderColor: color.white }}
            onClick={() => {
              dispatch(setTarget((index || 0) + 1));
              toggleModal("on");
            }}
          >
            +{t("add")}
          </button>
        )}
      </div>
      <Table>
        <table>
          <thead>
            <tr>
              <td>{t("thead.index")}</td>
              <td>{t("thead.dist")}</td>
              <td>{t("thead.city")}</td>
              <td>{t("thead.purpose")}</td>
              <td>{t("thead.cus")}</td>
              <td>{t("thead.PS")}</td>
              {type === "addForm" && <td>{t("thead.delete")}</td>}
            </tr>
          </thead>
          <tbody>
            {type === "addForm" ? (
              hasData ? (
                <TableWhenAddForm
                  data={dataSet}
                  index={index as number}
                />
              ) : (
                <tr>
                  <td colSpan={8}>no data</td>
                </tr>
              )
            ) : (
              <TableWhenSign data={data as detailDataWithSingleData[]} />
            )}
          </tbody>
        </table>
      </Table>
    </>
  );
};
