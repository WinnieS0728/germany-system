import { Table } from "@/components/table/table";
import { Month_MM } from "@/const";
import { useYearSales } from "@/components/sales analyze/year sales/year sales.hook";
import { Section } from "@/layouts/section";
import { cn } from "@/utils/cn";
import { getLocaleString } from "@/utils/get localeString";
import { Fragment } from "react";
import { useTranslation } from "react-i18next";
import { Loading } from "@/components/UI/loading";
import { month_shortName } from "@/types";

export function YearSalesTable() {
  const { status, yearSalesData } = useYearSales();
  const {
    t,
    i18n: { language: nowLang },
  } = useTranslation(["salesAnalyze"]);

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
      <Section title={t("yearSales.title")}>
        <Table>
          <table>
            <thead>
              <tr>
                <th rowSpan={2}>{t("yearSales.thead.sales")}</th>
                <th rowSpan={2}>{t("yearSales.thead.item")}</th>
                <th colSpan={4}>{t("yearSales.thead.total")}</th>
                <th colSpan={13}>{t("yearSales.thead.monthSales")}</th>
              </tr>
              <tr>
                <th>{t("yearSales.thead.s1")}</th>
                <th>{t("yearSales.thead.s2")}</th>
                <th>{t("yearSales.thead.s3")}</th>
                <th>{t("yearSales.thead.s4")}</th>
                {Month_MM.map((month) => (
                  <th
                    key={month}
                    className='whitespace-nowrap'
                  >
                    {nowLang === "en"
                      ? month_shortName.at(Number(month) - 1)
                      : `${Number(month)} 月`}
                  </th>
                ))}
                <th>{t("yearSales.thead.total")}</th>
              </tr>
            </thead>
            <tbody>
              {yearSalesData.map((data) => (
                <Fragment key={data.id}>
                  <tr>
                    <td rowSpan={3}>{data.name}</td>
                    <td className='whitespace-nowrap'>
                      {t("yearSales.data.tx.qty")}
                    </td>
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
                    <td className='whitespace-nowrap'>
                      {t("yearSales.data.tx.threshold")}
                    </td>
                    {data.txThreshold.map((number, index) => (
                      <td key={index}>{getLocaleString(number)}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className='whitespace-nowrap'>
                      {t("yearSales.data.tx.percent")}
                    </td>
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
