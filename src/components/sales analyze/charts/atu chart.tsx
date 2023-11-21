import { Loading } from "@/components/UI/loading";
import { Section } from "@/layouts/section";
import { Error } from "@/components/UI/error";
import { useAtuChart } from "./atu chart.hook";
import { TableChartLayout } from "./table chart layout";
import { useTranslation } from "react-i18next";

export function AtuVisitChart() {
  const { t } = useTranslation(["salesAnalyze"]);
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

  const chartData = data.map((data) => ({
    month: data.month,
    data1: data.visit_sum,
    data2: data.payment_sum,
  }));

  return (
    <>
      <Section title={t("charts.atu.title")}>
        <TableChartLayout
          chartData={chartData}
          name={{
            data1: t("charts.atu.visit"),
            data2: t("charts.atu.order"),
          }}
          color='#884184'
        />
      </Section>
    </>
  );
}
