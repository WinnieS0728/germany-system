import { Table } from "@/components/table/table";
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

type data = {
  month: string;
  data1: number;
  data2: number;
};

interface props {
  chartData: data[];
  name: {
    data1: string;
    data2: string;
  };
  color?: string;
}

export function TableChartLayout({
  chartData,
  name,
  color = "#4785FD",
}: props) {
  return (
    <>
      <Table>
        <table>
          <thead>
            <tr>
              <th></th>
              {chartData.map((data) => (
                <th key={data.month}>{data.month}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{name.data1}</td>
              {chartData.map((data, index) => (
                <td key={index}>{data.data1}</td>
              ))}
            </tr>
            <tr>
              <td>{name.data2}</td>
              {chartData.map((data, index) => (
                <td key={index}>{data.data2}</td>
              ))}
            </tr>
            <tr>
              <td colSpan={13}>
                <ResponsiveContainer
                  width={"100%"}
                  height={300}
                >
                  <ComposedChart data={chartData}>
                    <CartesianGrid vertical={false} />
                    <Legend
                      verticalAlign='top'
                      height={40}
                    />
                    <XAxis
                      dataKey={"month"}
                      tickMargin={10}
                    />
                    <YAxis yAxisId={"data1"} />
                    <YAxis
                      yAxisId={"data2"}
                      orientation='right'
                    />
                    <Bar
                      dataKey={"data1"}
                      yAxisId={"data1"}
                      name={name.data1}
                      fill='#CED0D3'
                    >
                      <LabelList
                        position={"center"}
                        dataKey={"data1"}
                      />
                    </Bar>
                    <Line
                      dataKey={"data2"}
                      yAxisId={"data2"}
                      name={name.data2}
                      stroke={color}
                    >
                      <LabelList
                        position={"top"}
                        dataKey={"data2"}
                        fill={color}
                      />
                    </Line>
                  </ComposedChart>
                </ResponsiveContainer>
              </td>
            </tr>
          </tbody>
        </table>
      </Table>
    </>
  );
}
