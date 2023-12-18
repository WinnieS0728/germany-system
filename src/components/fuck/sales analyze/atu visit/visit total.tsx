import { Table } from "@/components/table/table";
import { Section } from "@/layouts/section";
import { atuVisitTableData, useAtuVisitTotal } from "./visit total.hook";
import { Loading } from "@/components/UI/loading";
import { Error } from "@/components/UI/error";
import { useTranslation } from "react-i18next";


function TableHeader() {
const { t } = useTranslation(["salesAnalyze"]);

  return (
    <>
      <th>{t('atuVisit.thead.qty.store')}</th>
      <th>{t('atuVisit.thead.qty.pay')}</th>
      <th>{t('atuVisit.thead.qty.tx')}</th>
    </>
  );
}
function TableTd({ dataNumber }: { dataNumber: atuVisitTableData }) {
  return (
    <>
      <td>{dataNumber.storeNumber}</td>
      <td>{dataNumber.payNumber}</td>
      <td>{dataNumber.txNumber}</td>
    </>
  );
}

export function VisitTotalTable() {
const { t } = useTranslation(["salesAnalyze"]);

  const { status, atuVisitData, message } = useAtuVisitTotal();

  if (status === "error") {
    return <Section>
      <Error.block className="h-48" message={message} />
    </Section>;
  }

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
      <Section title={t('atuVisit.title')}>
        <Table>
          <table>
            <thead>
              <tr>
                <td rowSpan={2}>{t('atuVisit.thead.sales')}</td>
                <td colSpan={3}>{t('atuVisit.thead.total.myArea')}</td>
                <td colSpan={3}>{t('atuVisit.thead.total.all')}</td>
                <td colSpan={3}>{t('atuVisit.thead.total.newCus')}</td>
                <td colSpan={3}>{t('atuVisit.thead.total.existCus')}</td>
              </tr>
              <tr>
                <TableHeader />
                <TableHeader />
                <TableHeader />
                <TableHeader />
              </tr>
            </thead>
            <tbody>
              {atuVisitData.map((visitData, index) => (
                <tr key={index}>
                  <td>{visitData.EmpName}</td>
                  <TableTd dataNumber={visitData.totalData} />
                  <TableTd dataNumber={visitData.hasVisitData} />
                  <TableTd dataNumber={visitData.firstVisitData} />
                  <TableTd dataNumber={visitData.multiVisitData} />
                </tr>
              ))}
            </tbody>
          </table>
        </Table>
      </Section>
    </>
  );
}
