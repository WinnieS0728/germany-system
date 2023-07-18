import { detailDataType } from "@/data/reducers/trip detail/trip detail";
import { useModelControl } from "@/hooks/model control";
import { useTheme } from "styled-components";

type detailTableProps = {
  data: detailDataType | any;
  index: number;
};

export const DetailTable = ({ data, index }: detailTableProps) => {
  const color = useTheme()?.color;

  const { openModel } = useModelControl();

  //  FIXME  刪掉
  const dontShowError = [data, index];

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
            openModel();
          }}
        >
          +新增
        </button>
      </div>
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
          </tr>
        </thead>
        <tbody></tbody>
      </table>
    </>
  );
};
