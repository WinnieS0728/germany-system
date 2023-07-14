import { Table } from "@/components/table/table";
import { useTheme } from "styled-components";

export const ListTable = () => {
  const color = useTheme()?.color;
  return (
    <Table>
      <table>
        <thead
          style={{ backgroundColor: color.sectionHeader, color: color.white }}
        >
          <tr>
              <th>項次</th>
              <th>出差日期</th>
              <th>表單號碼</th>
              <th>ATU 拜訪數</th>
              <th>既有客戶拜訪數</th>
              <th>新客戶拜訪數</th>
              <th>申請人員</th>
              <th>表單狀態</th>
              <th>待簽核人員</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
          </tr>
        </tbody>
      </table>
    </Table>
  );
};
