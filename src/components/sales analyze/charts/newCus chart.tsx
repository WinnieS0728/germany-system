import { Loading } from "@/components/UI/loading";
import { Section } from "@/layouts/section";
import { Error } from "@/components/UI/error";
import { useNewCusVisit } from "./newCus chart.hook";
import { TableChartLayout } from "./table chart layout";
import { useTranslation } from "react-i18next";

export function NewCusVisitChart() {
  const { t } = useTranslation(["salesAnalyze"]);

  const { data, isPending, isError, error } = useNewCusVisit();

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
    data2: data.order_sum,
  }));

  return (
    <>
      <Section title={t("charts.newCus.title")}>
        <TableChartLayout
          chartData={chartData}
          name={{
            data1: t("charts.newCus.visit"),
            data2: t("charts.newCus.order"),
          }}
          color='#FF4A00'
        />
      </Section>
    </>
  );
}
