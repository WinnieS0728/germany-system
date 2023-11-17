import { Loading } from "@/components/UI/loading";
import { Table } from "@/components/table/table";
import { Month_MM } from "@/const";
import { Section } from "@/layouts/section";
import { ResponsiveContainer, ComposedChart, CartesianGrid, Legend, XAxis, YAxis, Bar, LabelList, Line } from "recharts";
import { useTireStorageChart } from "./tire storage chart.hook";
import { Error } from "@/components/UI/error";

export function TireStorageChart() {
  const { data, isPending, isError, error } = useTireStorageChart();

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
                <td>資料筆數</td>
                {data.map((data) => (
                  <td key={data.month}>{data.tireStorage_sum}</td>
                ))}
              </tr>
              <tr>
                <td>新增筆數</td>
                {data.map((data) => (
                  <td key={data.month}>{data.diff}</td>
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
                      <YAxis yAxisId={"number"} />
                      <YAxis
                        yAxisId={"diff"}
                        orientation='right'
                      />
                      <Bar
                        dataKey={"tireStorage_sum"}
                        yAxisId={"number"}
                        name='資料筆數'
                        fill='#CED0D3'
                      >
                        <LabelList
                          position={"center"}
                          dataKey={"tireStorage_sum"}
                        />
                      </Bar>
                      <Line
                        dataKey={"diff"}
                        yAxisId={"diff"}
                        name='新增筆數'
                        stroke='#0A9945'
                      >
                        <LabelList
                          position={"top"}
                          dataKey={"diff"}
                          fill='#0A9945'
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
