import { Table } from "@/components/table/table";
import { useSalesRank } from "@/components/sales analyze/overview/sales rank.hook";
import { Section } from "@/layouts/section";
import { getLocaleString } from "@/utils/get localeString";
import { Loading } from "@/components/UI/loading";

export function SalesRank() {
  const { status, salesRankData } = useSalesRank();

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

  return (
    <>
      <Section title='業務銷售排名 (不含ATU)'>
        <Table>
          <table>
            <thead>
              <tr>
                <td>排名</td>
                <td>業務人員</td>
                <td>TX銷售數量</td>
                <td>OG銷售數量</td>
                <td>訂單總數量</td>
                <td>首購客戶訂單數量</td>
                <td>首購客戶訂單占比</td>
                <td>既有客戶訂單數量</td>
                <td>既有客戶訂單占比</td>
              </tr>
            </thead>
            <tbody>
              {salesRankData.map((data, index) => (
                <tr key={data.name}>
                  <td>{index + 1}</td>
                  <td className='whitespace-pre'>{data.name}</td>
                  <td>{getLocaleString(data.tx)}</td>
                  <td>{getLocaleString(data.og)}</td>
                  <td>{getLocaleString(data.total)}</td>
                  <td>{getLocaleString(data.first_order)}</td>
                  <td>
                    {getLocaleString(data.first_order_rate, { toFix: 1 })} %
                  </td>
                  <td>{getLocaleString(data.other_order)}</td>
                  <td>
                    {getLocaleString(data.other_order_rate, { toFix: 1 })} %
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Table>
      </Section>
    </>
  );
}
