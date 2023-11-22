import { Section } from "@/layouts/section";
import { useTSVisit } from "./tire shop visit.hook";
import { Loading } from "@/components/UI/loading";
import { Error } from "@/components/UI/error";
import { Table } from "@/components/table/table";
import { useTranslation } from "react-i18next";

function Th() {
  const { t } = useTranslation(["salesAnalyze"]);

  return (
    <>
      <th>{t("TSVisit.thead.qty.store")}</th>
      <th>{t("TSVisit.thead.qty.order")}</th>
      <th>{t("TSVisit.thead.qty.tx")}</th>
    </>
  );
}

export function TireShopVisitTotal() {
  const { t } = useTranslation(["salesAnalyze"]);
  const { status, tsVisitData, message } = useTSVisit();

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

  if (status === "error") {
    return (
      <Section>
        <Error.block message={message} />
      </Section>
    );
  }

  return (
    <>
      <Section title={t("TSVisit.title")}>
        <Table>
          <table>
            <thead>
              <tr>
                <th rowSpan={2}>{t("TSVisit.thead.sales")}</th>
                <th colSpan={3}>{t("TSVisit.thead.total.all")}</th>
                <th colSpan={3}>{t("TSVisit.thead.total.existCus")}</th>
                <th colSpan={3}>{t("TSVisit.thead.total.newCus")}</th>
              </tr>
              <tr>
                {new Array(3).fill(0).map((_, index) => (
                  <Th key={index} />
                ))}
              </tr>
            </thead>
            <tbody>
              {tsVisitData.map((data) => (
                <tr key={data.EmpName}>
                  <td>{data.EmpName}</td>
                  {data.allData.map((number, index) => (
                    <td key={index}>{number}</td>
                  ))}
                  {data.existCus.map((number, index) => (
                    <td key={index}>{number}</td>
                  ))}
                  {data.newCus.map((number, index) => (
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
