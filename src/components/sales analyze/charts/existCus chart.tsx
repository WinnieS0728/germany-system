import { Loading } from "@/components/UI/loading";
import { Section } from "@/layouts/section";
import { useExistCusVisit } from "./existCus chart.hook";
import { Error } from "@/components/UI/error";
import { TableChartLayout } from "./table chart layout";
import { useTranslation } from "react-i18next";


export function ExistCusVisitChart() {
const { t } = useTranslation(["salesAnalyze"]);

  const { data, isPending, isError, error } = useExistCusVisit();

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
      <Section title={t('charts.existCus.title')}>
        <TableChartLayout
          chartData={chartData}
          name={{
            data1: t('charts.existCus.visit'),
            data2: t('charts.existCus.order'),
          }}
          color='#4BA555'
        />
      </Section>
    </>
  );
}
