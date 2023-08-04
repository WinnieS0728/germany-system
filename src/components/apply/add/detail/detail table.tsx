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

type detailTableProps = {
  type: "addForm" | "sign";
  data: any;
  index?: number;
};

const TableWhenAddForm = ({ data, index }: { data: any; index: number }) => {
  const dispatch = useAppDispatch();
  return data.map((d: any, id: number) => {
    return (
      <tr key={id}>
        <td>{id + 1}</td>
        <td>{d.district}</td>
        <td>{d.city}</td>
        <td>{d.purpose}</td>
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
        <p>出差地點明細</p>
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
            +新增
          </button>
        )}
      </div>
      <Table>
        <table>
          <thead>
            <tr>
              <td>項次</td>
              <td>行政區</td>
              <td>城市</td>
              <td>出差事由</td>
              <td>客戶名稱</td>
              <td>住宿飯店 or 地點</td>
              <td>備註</td>
              {type === "addForm" && <td>刪除</td>}
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
