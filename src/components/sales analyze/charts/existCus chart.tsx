import { Loading } from "@/components/UI/loading";
import { Section } from "@/layouts/section";
import { useExistCusVisit } from "./existCus chart.hook";
import { Error } from "@/components/UI/error";
import { Table } from "@/components/table/table";
import {
  ResponsiveContainer,
  ComposedChart,
  CartesianGrid,
  Legend,
  XAxis,
  YAxis,
  Bar,
  Line,
  LabelList,
} from "recharts";

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

  return (
    <>
      <Section title='既有客戶 - 拜訪店家趨勢圖'>
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
                {data.map((data, index) => (
                  <td key={index}>{data.visit_sum}</td>
                ))}
              </tr>
              <tr>
                <td>有訂單店數</td>
                {data.map((data, index) => (
                  <td key={index}>{data.order_sum}</td>
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
                      <YAxis yAxisId={"visit"} />
                      <YAxis
                        yAxisId={"order"}
                        orientation='right'
                      />
                      <Bar
                        name='拜訪店數'
                        dataKey={"visit_sum"}
                        yAxisId={"visit"}
                        fill='#CED0D3'
                      >
                        <LabelList
                          dataKey={"visit_sum"}
                          position={"center"}
                        />
                      </Bar>
                      <Line
                        name='有訂單店數'
                        dataKey={"order_sum"}
                        yAxisId={"order"}
                        stroke='#4BA555'
                      >
                        <LabelList
                          dataKey={"order_sum"}
                          position={"top"}
                          fill='#4BA555'
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
