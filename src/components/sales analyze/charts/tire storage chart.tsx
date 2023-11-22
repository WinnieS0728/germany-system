import { Loading } from "@/components/UI/loading";
import { Section } from "@/layouts/section";
import { useTireStorageChart } from "./tire storage chart.hook";
import { Error } from "@/components/UI/error";
import { TableChartLayout } from "./table chart layout";
import { useTranslation } from "react-i18next";

export function TireStorageChart() {
  const { t } = useTranslation(["salesAnalyze"]);

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

  const chartData = data.map((data) => ({
    month: data.month,
    data1: data.tireStorage_sum,
    data2: data.diff,
  }));

  return (
    <>
      <Section title={t("charts.ts.title")}>
        <TableChartLayout
          chartData={chartData}
          name={{
            data1: t("charts.ts.qty"),
            data2: t("charts.ts.diff"),
          }}
          color='#0A9945'
        />
      </Section>
    </>
  );
}
