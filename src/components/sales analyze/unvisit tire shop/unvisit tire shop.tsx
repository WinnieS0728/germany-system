import { Table } from "@/components/table/table";
import { Section } from "@/layouts/section";
import { useUnVisitTireShop } from "./unvisit tire shop.hook";

export function UnVisitTireShopTable() {
    useUnVisitTireShop()
  return (
    <>
      <Section>
        <Table>
          <table>
            <thead>
              <tr>
                <th>業務</th>
                <th>客戶名稱</th>
                <th>客戶地址</th>
                <th>客戶電話</th>
                <th>拜訪次數</th>
                <th>最近拜訪紀錄</th>
              </tr>
            </thead>
            <tbody></tbody>
          </table>
        </Table>
      </Section>
    </>
  );
}
