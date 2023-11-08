import { Table } from "@/components/table/table";
import { Month_MM } from "@/const";
import { Section } from "@/layouts/section";
import { useAtuPayment } from "./atu payment.hook";
import { Loading } from "@/components/UI/loading";
import { Error } from "@/components/UI/error";
import { getLocaleString } from "@/utils/get localeString";

export function AtuPayment() {
  const { status, atuPayment, message } = useAtuPayment();

  if (status === "pending") {
    return (
      <Section>
        <>
          <Loading.block />
          <Loading.block height={16 * 5} />
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
      <Section title='業務負責區域 ATU 對帳數排名'>
        <Table>
          <table>
            <thead>
              <tr>
                <th>排名</th>
                <th>業務人員</th>
                <th>TX 總對帳數</th>
                {Month_MM.map((month) => (
                  <th key={month}>{`${Number(month)}月`}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {atuPayment.map((data, index) => (
                <tr key={data.EmpName}>
                  <td>{index + 1}</td>
                  <td>{data.EmpName}</td>
                  <td>{getLocaleString(data.txNumber)}</td>
                  {data.payment.map((number,index) => (
                    <td key={`${data.EmpName}-month${index}-payment`}>{number}</td>
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
