import { Loading } from "@/components/UI/loading";
import { useTSVisitList } from "./tire shop visit list.hook";
import { Section } from "@/layouts/section";
import { Error } from "@/components/UI/error";
import { Table } from "@/components/table/table";

export function TireShopVisitList() {
  const { status, tsVisitList, message } = useTSVisitList();

  if (status === "pending") {
    return (
      <Section>
        <>
          <Loading.block />
          <Loading.block height={16 * 30} />
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
      <Section>
        <Table>
          <table>
            <thead>
              <tr>
                <th>負責業務</th>
                <th>店家名稱</th>
                <th>TX 購買總數量</th>
                <th>拜訪次數</th>
              </tr>
            </thead>
            <tbody>
              {tsVisitList.map((data) => (
                <tr key={data.CustId}>
                  <td>{data.Empname}</td>
                  <td>{data.Custname}</td>
                  <td>{data.SumQty}</td>
                  <td>{data.vqty}</td>
                  {data.visitDateList.map(date => <td key={date} className="whitespace-nowrap">{date}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </Table>
      </Section>
    </>
  );
}
