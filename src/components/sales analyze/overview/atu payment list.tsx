import { Table } from "@/components/table/table";
import { Month_MM } from "@/const";
import { Section } from "@/layouts/section";
import { useAtuPaymentList } from "./atu payment list.hook";
import { Loading } from "@/components/UI/loading";
import { Error } from "@/components/UI/error";
import { useTranslation } from "react-i18next";
import { month_shortName } from "@/types";

export function AtuPaymentList() {
  const {
    t,
    i18n: { language: nowLang },
  } = useTranslation(["salesAnalyze"]);
  const { status, atuPaymentList, message } = useAtuPaymentList();
  if (status === "pending") {
    return (
      <Section>
        <>
          <Loading.block />
          <Loading.block height={16 * 20} />
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
      <Section title={t("overview.atuPaymentList.title")}>
        <Table>
          <table>
            <thead>
              <tr>
                <th
                  className='text-start bg-sectionHeader text-myWhite'
                  colSpan={4}
                >
                  {t("overview.atuPaymentList.thead.storeList")}
                </th>
                <th
                  className='text-start bg-sectionHeader text-myWhite'
                  colSpan={12}
                >
                  {t("overview.atuPaymentList.thead.payList")}
                </th>
              </tr>
              <tr>
                <th>{t("overview.atuPaymentList.thead.sales")}</th>
                <th>{t("overview.atuPaymentList.thead.country")}</th>
                <th>{t("overview.atuPaymentList.thead.cusName")}</th>
                <th>{t("overview.atuPaymentList.thead.payQty")}</th>
                {Month_MM.map((month) => (
                  <th key={month}>
                    {nowLang === "en"
                      ? month_shortName.at(Number(month) - 1)
                      : `${Number(month)}月`}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {atuPaymentList.map((data) => (
                <tr key={data.cusName}>
                  <td>{data.EmpName}</td>
                  <td>{data.area}</td>
                  <td>{data.cusName}</td>
                  <td>{data.payNumber}</td>
                  {data.monthData.map((number, index) => (
                    <td key={index}>{number}</td>
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
