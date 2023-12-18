import { Table } from "@/components/table/table";
import { Month_MM } from "@/const";
import { Section } from "@/layouts/section";
import { useAtuPayment } from "./atu payment.hook";
import { Loading } from "@/components/UI/loading";
import { Error } from "@/components/UI/error";
import { getLocaleString } from "@/utils/get localeString";
import { useTranslation } from "react-i18next";
import { month_shortName } from "@/types";

export function AtuPayment() {
  const {
    t,
    i18n: { language: nowlang },
  } = useTranslation(["salesAnalyze"]);
  const { status, atuPayment, message } = useAtuPayment();

  if (status === "pending") {
    return (
      <Section>
        <>
          <Loading.block />
          <Loading.block height={16 * 5} />
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
      <Section title={t("overview.atuPayment.title")}>
        <Table>
          <table>
            <thead>
              <tr>
                <th>{t("overview.atuPayment.rank")}</th>
                <th>{t("overview.atuPayment.sales")}</th>
                <th>{t("overview.atuPayment.tx")}</th>
                {Month_MM.map((month) => (
                  <th key={month}>
                    {nowlang === "en"
                      ? month_shortName.at(Number(month) - 1)
                      : `${Number(month)}月`}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {atuPayment.map((data, index) => (
                <tr key={data.EmpName}>
                  <td>{index + 1}</td>
                  <td>{data.EmpName}</td>
                  <td>{getLocaleString(data.txNumber)}</td>
                  {data.payment.map((number, index) => (
                    <td key={`${data.EmpName}-month${index}-payment`}>
                      {number}
                    </td>
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
