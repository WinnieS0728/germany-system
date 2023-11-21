import { Loading } from "@/components/UI/loading";
import { getVisitStore, useKpiTable } from "./kpi table.hook";
import { Section } from "@/layouts/section";
import { Error } from "@/components/UI/error";
import { Table } from "@/components/table/table";
import { getPercent } from "@/utils/get percent";
import { useTranslation } from "react-i18next";

export function KpiTable() {
  const { t } = useTranslation(["salesAnalyze"]);

  const { data, isPending, isError, error } = useKpiTable();

  if (isPending) {
    return (
      <Section>
        <>
          <Loading.block />
          <Loading.block height={16 * 10} />
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
      <Section title={t("kpi.title")}>
        <Table>
          <table>
            <thead>
              <tr>
                <th rowSpan={2}>{t("kpi.thead.sales")}</th>
                <th colSpan={7}>{t("kpi.thead.visit.total")}</th>
                <th colSpan={2}>{t("kpi.thead.photo")}</th>
                <th colSpan={2}>{t("kpi.thead.recommend")}</th>
                <th colSpan={2}>{t("kpi.thead.osomLogin")}</th>
                <th colSpan={2}>{t("kpi.thead.tsData")}</th>
              </tr>
              <tr>
                <th>{t("kpi.thead.visit.all")}</th>
                <th>{t("kpi.thead.visit.atu.qty")}</th>
                <th>{t("kpi.thead.visit.atu.percent")}</th>
                <th>{t("kpi.thead.visit.existCus.qty")}</th>
                <th>{t("kpi.thead.visit.existCus.percent")}</th>
                <th>{t("kpi.thead.visit.newCus.qty")}</th>
                <th>{t("kpi.thead.visit.newCus.percent")}</th>
                <KpiTh />
                <KpiTh />
                <KpiTh />
                <KpiTh />
              </tr>
            </thead>
            <tbody>
              {data.map((data) => (
                <tr key={data.EmpName}>
                  <td>{data.EmpName}</td>
                  <VisitTable visitData={data.visitData} />
                  <td>{data.kpiAchievement.photo}</td>
                  <td>{data.kpiNumber.photo}</td>
                  <td>{data.kpiAchievement.introduce}</td>
                  <td>{data.kpiNumber.introduce}</td>
                  <td>
                    {t("kpi.data.add") +
                      " " +
                      data.kpiAchievement.login +
                      " " +
                      t("kpi.data.unit")}
                  </td>
                  <td>{data.kpiNumber.login}</td>
                  <td>
                    {t("kpi.data.add") +
                      " " +
                      data.kpiAchievement.tireStorageData +
                      " " +
                      t("kpi.data.unit")}
                  </td>
                  <td>{data.kpiNumber.tireStorageData}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Table>
      </Section>
    </>
  );
}

function KpiTh() {
  const { t } = useTranslation(["salesAnalyze"]);

  return (
    <>
      <th>{t("kpi.thead.target")}</th>
      <th>{t("kpi.thead.achieve")}</th>
    </>
  );
}

function VisitTable({ visitData }: { visitData: getVisitStore }) {
  const total = visitData.atu + visitData.existCus + visitData.newCus;
  return (
    <>
      <td>{total}</td>
      <td>{visitData.atu}</td>
      <td>{getPercent(visitData.atu, total) + "%"}</td>
      <td>{visitData.existCus}</td>
      <td>{getPercent(visitData.existCus, total) + "%"}</td>
      <td>{visitData.newCus}</td>
      <td>{getPercent(visitData.newCus, total) + "%"}</td>
    </>
  );
}
