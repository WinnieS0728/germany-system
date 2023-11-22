import { Loading } from "@/components/UI/loading";
import { Section } from "@/layouts/section";
import { useOsomChart } from "./osom chart.hook";
import { Error } from "@/components/UI/error";
import { TableChartLayout } from "./table chart layout";
import { useTranslation } from "react-i18next";

export function OsomChart() {
  const { t } = useTranslation(["salesAnalyze"]);

  const { data, isPending, isError, error } = useOsomChart();

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
    data1: data.signUp_sum,
    data2: data.login_sum,
  }));

  return (
    <>
      <Section title={t("charts.osom.title")}>
        <TableChartLayout
          chartData={chartData}
          name={{
            data1: t("charts.osom.signUp"),
            data2: t("charts.osom.login"),
          }}
          color='#E88656'
        />
      </Section>
    </>
  );
}
