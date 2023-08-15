import { Table } from "@/components/table/table";
import {
  deleteData,
  detailDataWithSingleData,
  setTarget,
} from "@/data/reducers/trip detail/trip detail";
import { useModalControl } from "@/hooks/modal control";
import { useAppDispatch } from "@/hooks/redux";
import { useEffect, useState } from "react";
import { useTheme } from "styled-components";
import * as Icons from "@components/UI/icons";
import api from "@/lib/api";
import { useTranslation } from "react-i18next";

type detailTableProps = {
  type: "addForm" | "sign";
  data: any;
  index?: number;
};

const TableWhenAddForm = ({ data, index }: { data: any; index: number }) => {
  const { i18n } = useTranslation();
  const nowLang = i18n.language;
  const dispatch = useAppDispatch();

  const [dataSet, setNewData] = useState<any[]>([]);
  async function getEventName(code: string) {
    const list: [] = await api.getEvent("TripEvent");
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
  }
  useEffect(() => {
    (async function () {
      const newArray = await Promise.all(
        data.map(async (i: { purpose: string }) => {
          return {
            ...i,
            purposeName: await getEventName(i.purpose),
          };
        })
      );
      setNewData(newArray);
    })();
  }, [data, index]);

  return dataSet.map((d, id: number) => {
    return (
      <tr key={id}>
        <td>{id + 1}</td>
        <td>{d.district}</td>
        <td>{d.city}</td>
        <td>{d.purposeName}</td>
        <td>{d.cus}</td>
        <td>{d.hotel}</td>
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
      <td>{d.data.hotel}</td>
      <td>{d.data.PS}</td>
    </tr>
  ));
};

export const DetailTable = ({ type, data, index }: detailTableProps) => {
  const { t } = useTranslation("list page", { keyPrefix: "detailTable" });
  const color = useTheme()?.color;

  const [toggleModal] = useModalControl("newDetail");

  const [hasData, setData] = useState<boolean>(false);
  const dataSet = data?.data;

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
              <td>{t("thead.lodging")}</td>
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
              <TableWhenSign data={data} />
            )}
          </tbody>
        </table>
      </Table>
    </>
  );
};
