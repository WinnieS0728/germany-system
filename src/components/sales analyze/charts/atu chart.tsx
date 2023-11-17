import { Loading } from "@/components/UI/loading";
import { Table } from "@/components/table/table";
import { Section } from "@/layouts/section";
import {
  ResponsiveContainer,
  ComposedChart,
  CartesianGrid,
  Legend,
  XAxis,
  YAxis,
  Bar,
  LabelList,
  Line,
} from "recharts";
import { Error } from "@/components/UI/error";
import { useAtuChart } from "./atu chart.hook";

export function AtuVisitChart() {
  const { data, isPending, isError, error } = useAtuChart();

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
      <Section title='ATU - 拜訪店家趨勢圖'>
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
                <td>有對帳店數</td>
                {data.map((data, index) => (
                  <td key={index}>{data.payment_sum}</td>
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
                        yAxisId={"payment"}
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
                        name='有對帳店數'
                        dataKey={"payment_sum"}
                        yAxisId={"payment"}
                        stroke='#884184'
                      >
                        <LabelList
                          dataKey={"payment_sum"}
                          position={"top"}
                          fill='#884184'
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
