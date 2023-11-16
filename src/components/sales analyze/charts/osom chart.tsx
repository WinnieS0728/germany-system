import { Loading } from "@/components/UI/loading";
import { Section } from "@/layouts/section";
import { useOsomChart } from "./osom chart.hook";
import { Table } from "@/components/table/table";
import { Error } from "@/components/UI/error";
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

export function OsomChart() {
  const { data, isPending, isError, error } = useOsomChart();

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
      <Section title='OSOM登入帳號數成長趨勢圖'>
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
                <td>註冊數</td>
                {data.map((data) => (
                  <td key={data.month}>{data.signUp_sum}</td>
                ))}
              </tr>
              <tr>
                <td>登入數</td>
                {data.map((data) => (
                  <td key={data.month}>{data.login_sum}</td>
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
                        height={30}
                      />
                      <XAxis dataKey={"month"} />
                      <YAxis yAxisId={"sign-up"} />
                      <YAxis
                        yAxisId={"log-in"}
                        orientation='right'
                      />
                      <Bar
                        name='註冊數'
                        dataKey={"signUp_sum"}
                        yAxisId={"sign-up"}
                        fill='#BBBBBB'
                      >
                        <LabelList
                          dataKey={"signUp_sum"}
                          position={"center"}
                        />
                      </Bar>
                      <Line
                        name='登入數'
                        dataKey={"login_sum"}
                        yAxisId={"log-in"}
                        stroke="#E88656"
                      >
                        <LabelList
                          dataKey={"login_sum"}
                          position={"top"}
                          fill='#E88656'
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
