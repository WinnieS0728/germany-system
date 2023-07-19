import { Table } from "@/components/table/table";
import { deleteData, setTarget } from "@/data/reducers/trip detail/trip detail";
import { useModelControl } from "@/hooks/model control";
import { useAppDispatch } from "@/hooks/redux";
import { useTheme } from "styled-components";

type detailTableProps = {
  data: any;
  index: number;
};

export const DetailTable = ({ data, index }: detailTableProps) => {
  const color = useTheme()?.color;

  const { openModel } = useModelControl("newDetail");

  const dataSet = data?.data;

  const dispatch = useAppDispatch();

  return (
    <>
      <div
        className='title flex items-center justify-between px-4 py-2'
        style={{ backgroundColor: color.sectionHeader, color: color.white }}
      >
        <p>出差地點明細</p>
        <button
          type='button'
          className='px-4 py-1 ring-1'
          style={{ borderColor: color.white }}
          onClick={() => {
            dispatch(setTarget(index + 1));
            openModel();
          }}
        >
          +新增
        </button>
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
              <td>刪除</td>
            </tr>
          </thead>
          <tbody>
            {dataSet?.map((d: any, id: number) => {
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
                    delete
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Table>
    </>
  );
};
