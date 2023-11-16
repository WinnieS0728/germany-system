import { Loading } from "@/components/UI/loading";
import { Section } from "@/layouts/section";
import { useExistCusVisit } from "./existCus chart.hook";
import { Error } from "@/components/UI/error";
import { Table } from "@/components/table/table";
import { monthList } from "./monthList";

export function ExistCusVisitChart() {
  const { data, isPending, isError, error } = useExistCusVisit();

  if (isPending) {
    return (
      <Section>
        <>
          <Loading.block />
          <Loading.block height={16 * 20} />
        </>
      </Section>
    );
  }

  if (isError) {
    return (
      <Section>
        <Error.block message={error.message} />
      </Section>
    );
  }

  const visitArray = data.map((data) => data.visitNumber);
  const orderArray = data.map((data) => data.orderNumber);

  return (
    <>
      <Section>
        <Table>
          <table>
            <thead>
              <tr>
                <th></th>
                {data.map((data) => (
                  <th key={data.month}>{data.month}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>拜訪店數</td>
                {visitArray.map((number, index) => (
                  <td key={index}>{number}</td>
                ))}
              </tr>
              <tr>
                <td>有訂單店數</td>
                {orderArray.map((number, index) => (
                  <td key={index}>{number}</td>
                ))}
              </tr>
            </tbody>
          </table>
        </Table>
      </Section>
    </>
  );
}
