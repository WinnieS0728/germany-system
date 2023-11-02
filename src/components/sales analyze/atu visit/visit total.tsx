import { Table } from "@/components/table/table";
import { Section } from "@/layouts/section";
import { atuVisitTableData, useAtuVisitTotal } from "./visit total.hook";

function TableHeader() {
  return (
    <>
      <th>店家數</th>
      <th>對帳店數</th>
      <th>TX 對帳數</th>
    </>
  );
}
function TableTd({ dataNumber }: { dataNumber: atuVisitTableData }) {
  return (
    <>
      <td>{dataNumber.storeNumber}</td>
      <td>{dataNumber.payNumber}</td>
      <td>{dataNumber.txNumber}</td>
    </>
  );
}

export function VisitTotalTable() {
  const visitData = useAtuVisitTotal();
  return (
    <>
      <Section title='ATU 拜訪統計'>
        <Table>
          <table>
            <thead>
              <tr>
                <td rowSpan={2}>業務</td>
                <td colSpan={3}>負責區域的店數</td>
                <td colSpan={3}>拜訪總店數</td>
                <td colSpan={3}>首次拜訪店數</td>
                <td colSpan={3}>再次拜訪店數</td>
              </tr>
              <tr>
                <TableHeader />
                <TableHeader />
                <TableHeader />
                <TableHeader />
              </tr>
            </thead>
            <tbody>
              {visitData.map((visitData) => (
                <>
                  <tr key={visitData.EmpId}>
                    <td>{visitData.EmpName}</td>
                    <TableTd dataNumber={visitData.totalData}/>
                    <TableTd dataNumber={visitData.hasVisitData}/>
                    <TableTd dataNumber={visitData.firstVisitData}/>
                    <TableTd dataNumber={visitData.multiVisitData}/>
                  </tr>
                </>
              ))}
            </tbody>
          </table>
        </Table>
      </Section>
    </>
  );
}
