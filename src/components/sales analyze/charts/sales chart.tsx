import { Loading } from "@/components/UI/loading";
import { useSalesChart } from "./sales chart.hook";
import { Section } from "@/layouts/section";
import { Error } from "@/components/UI/error";
import { Table } from "@/components/table/table";
import { Month_MM } from "@/const";
import {
  ResponsiveContainer,
  ComposedChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Line,
  Bar,
  Legend,
  LabelList,
} from "recharts";

export function SalesChart() {
  const { data, isPending, isError, error } = useSalesChart();

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

  const txArray = data.map((data) => data.tx_sum);
  const orderArray = data.map((data) => data.order_sum);

  return (
    <>
      <Section title='業績趨勢圖'>
        <Table>
          <table>
            <thead>
              <tr>
                <th></th>
                {Month_MM.map((month) => (
                  <th key={month}>{`${Number(month)}月`}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>TX 銷售術</td>
                {txArray.map((number, index) => (
                  <td key={index}>{number}</td>
                ))}
              </tr>
              <tr>
                <td>訂單數</td>
                {orderArray.map((number, index) => (
                  <td key={index}>{number}</td>
                ))}
              </tr>
              <tr>
                <td colSpan={13}>
                  <ResponsiveContainer
                    width={"100%"}
                    height={300}
                  >
                    <ComposedChart data={data}>
                      <CartesianGrid vertical={false} />
                      <Legend
                        verticalAlign='top'
                        height={40}
                      />
                      <XAxis
                        dataKey={"month"}
                        tickMargin={10}
                      />
                      <YAxis yAxisId={"tx"} />
                      <YAxis
                        yAxisId={"order"}
                        orientation='right'
                      />
                      <Bar
                        dataKey={"tx_sum"}
                        yAxisId={"tx"}
                        name='TX銷售數'
                        fill='#CED0D3'
                      >
                        <LabelList
                          position={"center"}
                          dataKey={"tx_sum"}
                        />
                      </Bar>
                      <Line
                        dataKey={"order_sum"}
                        yAxisId={"order"}
                        name='訂單數'
                        fill='#397DFC'
                      >
                        <LabelList
                          position={"top"}
                          dataKey={"order_sum"}
                        />
                      </Line>
                    </ComposedChart>
                  </ResponsiveContainer>
                </td>
              </tr>
            </tbody>
          </table>
        </Table>
      </Section>
    </>
  );
}
