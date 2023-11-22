import { Table } from "@/components/table/table";
import { useSalesRank } from "@/components/sales analyze/overview/sales rank.hook";
import { Section } from "@/layouts/section";
import { getLocaleString } from "@/utils/get localeString";
import { Loading } from "@/components/UI/loading";
import { useTranslation } from "react-i18next";

export function SalesRank() {
  const { t } = useTranslation(["salesAnalyze"]);

  const { status, salesRankData } = useSalesRank();

  if (status === "pending") {
    return (
      <Section>
        <>
          <Loading.block />
          <Loading.block height={16 * 10} />
        </>
      </Section>
    );
  }

  return (
    <>
      <Section title={t("overview.salesRank.title")}>
        <Table>
          <table>
            <thead>
              <tr>
                <td>{t("overview.salesRank.thead.rank")}</td>
                <td>{t("overview.salesRank.thead.sales")}</td>
                <td>{t("overview.salesRank.thead.tx")}</td>
                <td>{t("overview.salesRank.thead.og")}</td>
                <td>{t("overview.salesRank.thead.order")}</td>
                <td>{t("overview.salesRank.thead.newCus.qty")}</td>
                <td>{t("overview.salesRank.thead.newCus.percent")}</td>
                <td>{t("overview.salesRank.thead.existCus.qty")}</td>
                <td>{t("overview.salesRank.thead.existCus.percent")}</td>
              </tr>
            </thead>
            <tbody>
              {salesRankData.map((data, index) => (
                <tr key={data.name}>
                  <td>{index + 1}</td>
                  <td className='whitespace-pre'>{data.name}</td>
                  <td>{getLocaleString(data.tx)}</td>
                  <td>{getLocaleString(data.og)}</td>
                  <td>{getLocaleString(data.total)}</td>
                  <td>{getLocaleString(data.first_order)}</td>
                  <td>
                    {getLocaleString(data.first_order_rate, { toFix: 1 })} %
                  </td>
                  <td>{getLocaleString(data.other_order)}</td>
                  <td>
                    {getLocaleString(data.other_order_rate, { toFix: 1 })} %
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Table>
      </Section>
    </>
  );
}
