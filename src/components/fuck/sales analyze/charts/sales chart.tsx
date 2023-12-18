import { Loading } from "@/components/UI/loading";
import { useSalesChart } from "./sales chart.hook";
import { Section } from "@/layouts/section";
import { Error } from "@/components/UI/error";
import { TableChartLayout } from "./table chart layout";
import { useTranslation } from "react-i18next";

export function SalesChart() {
  const { t } = useTranslation(["salesAnalyze"]);

  const { data, isPending, isError, error } = useSalesChart();

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
    data1: data.tx_sum,
    data2: data.order_sum,
  }));

  return (
    <>
      <Section title={t("charts.sales.title")}>
        <TableChartLayout
          chartData={chartData}
          name={{
            data1: t("charts.sales.tx"),
            data2: t("charts.sales.order"),
          }}
          color='#397DFC'
        />
      </Section>
    </>
  );
}
