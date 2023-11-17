import { Section } from "@/layouts/section";
import { useTSVisit } from "./tire shop visit.hook";
import { Loading } from "@/components/UI/loading";
import { Error } from "@/components/UI/error";
import { Table } from "@/components/table/table";

function Th() {
  return (
    <>
      <th>店家數</th>
      <th>訂單數</th>
      <th>TX 數量</th>
    </>
  );
}

export function TireShopVisitTotal() {
  const { status, tsVisitData, message } = useTSVisit();

  if (status === "pending") {
    return (
      <Section>
        <>
          <Loading.block />
          <Loading.block height={16 * 10} />
        </>
      </Section>
    );
  }

  if (status === "error") {
    return (
      <Section>
        <Error.block message={message} />
      </Section>
    );
  }

  return (
    <>
      <Section title="輪胎店拜訪統計">
        <Table>
          <table>
            <thead>
              <tr>
                <th rowSpan={2}>業務</th>
                <th colSpan={3}>拜訪輪胎店總數</th>
                <th colSpan={3}>拜訪輪胎店 - 既有客戶店數</th>
                <th colSpan={3}>拜訪輪胎店 - 新客戶店數</th>
              </tr>
              <tr>
                {new Array(3).fill(0).map((_,index) => <Th key={index} />)}
              </tr>
            </thead>
            <tbody>
              {tsVisitData.map((data) => (
                <tr key={data.EmpName}>
                  <td>{data.EmpName}</td>
                  {data.allData.map((number,index) => <td key={index}>{number}</td>)}
                  {data.existCus.map((number,index) => <td key={index}>{number}</td>)}
                  {data.newCus.map((number,index) => <td key={index}>{number}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </Table>
      </Section>
    </>
  );
}
