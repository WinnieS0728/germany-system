import { Table } from "@/components/table/table";
import { Month_MM } from "@/const";
import { useYearSales } from "@/components/sales analyze/year sales/year sales.hook";
import { Section } from "@/layouts/section";
import { cn } from "@/utils/cn";
import { getLocaleString } from "@/utils/get localeString";
import { Fragment } from "react";
import { Loading } from "@/components/UI/loading";

export function YearSalesTable() {
  const { status, yearSalesData } = useYearSales();

  if (status === "pending") {
    return (
      <Section>
        <>
          <Loading.block height={16 * 5} />
          <Loading.block height={16 * 20} />
        </>
      </Section>
    );
  }

  return (
    <>
      <Section title='年度業績列表'>
        <Table>
          <table>
            <thead>
              <tr>
                <th rowSpan={2}>業務人員</th>
                <th rowSpan={2}>項目</th>
                <th colSpan={4}>總計</th>
                <th colSpan={13}>每月銷售數</th>
              </tr>
              <tr>
                <th>第一季</th>
                <th>第二季</th>
                <th>第三季</th>
                <th>第四季</th>
                {Month_MM.map((month) => (
                  <th
                    key={month}
                    className='whitespace-nowrap'
                  >{`${Number(month)} 月`}</th>
                ))}
                <th>總計</th>
              </tr>
            </thead>
            <tbody>
              {yearSalesData.map((data) => (
                <Fragment key={data.id}>
                  <tr>
                    <td rowSpan={3}>{data.name}</td>
                    <td className='whitespace-nowrap'>TX 銷售量</td>
                    {data.txNumber_season.map((number, index) => (
                      <td key={index}>{getLocaleString(number)}</td>
                    ))}
                    {data.txNumber.map((number, index) => (
                      <td
                        key={index}
                        rowSpan={3}
                      >
                        {getLocaleString(number)}
                      </td>
                    ))}
                    <td rowSpan={3}>{getLocaleString(data.total)}</td>
                  </tr>
                  <tr>
                    <td className='whitespace-nowrap'>TX 銷售目標</td>
                    {data.txThreshold.map((number, index) => (
                      <td key={index}>{getLocaleString(number)}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className='whitespace-nowrap'>銷售達成率</td>
                    {data.salesRate.map((number, index) => (
                      <td
                        key={index}
                        className={cn("", {
                          "text-green-600": number > 100,
                        })}
                      >{`${getLocaleString(number)}%`}</td>
                    ))}
                  </tr>
                </Fragment>
              ))}
            </tbody>
          </table>
        </Table>
      </Section>
    </>
  );
}
