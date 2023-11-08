import { Table } from "@/components/table/table";
import { Month_MM } from "@/const";
import { Section } from "@/layouts/section";
import { useAtuPaymentList } from "./atu payment list.hook";
import { Loading } from "@/components/UI/loading";
import { Error } from "@/components/UI/error";

export function AtuPaymentList() {
  const { status, atuPaymentList, message } = useAtuPaymentList();
  if (status === "pending") {
    return (
      <Section>
        <>
          <Loading.block />
          <Loading.block height={16 * 20} />
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
      <Section title='ATU 各店 TX 對帳列表'>
        <Table>
          <table>
            <thead>
              <tr>
                <th className="text-start bg-sectionHeader text-myWhite" colSpan={4}>店家列表</th>
                <th className="text-start bg-sectionHeader text-myWhite" colSpan={12}>每月對帳數</th>
              </tr>
              <tr>
                <th>負責業務</th>
                <th>行政區</th>
                <th>店家名稱</th>
                <th>對帳總數量</th>
                {Month_MM.map((month) => (
                  <th key={month}>{`${Number(month)}月`}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {atuPaymentList.map((data) => (
                <tr key={data.cusName}>
                  <td>{data.EmpName}</td>
                  <td>{data.area}</td>
                  <td>{data.cusName}</td>
                  <td>{data.payNumber}</td>
                  {data.monthData.map((number, index) => (
                    <td key={index}>{number}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </Table>
      </Section>
    </>
  );
}
