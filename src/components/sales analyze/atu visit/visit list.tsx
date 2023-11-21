import { Table } from "@/components/table/table";
import { useAtuVisit } from "@/components/sales analyze/atu visit/atu visit list.hook";
import { Section } from "@/layouts/section";
import { Loading } from "@/components/UI/loading";
import { Error } from "@/components/UI/error";
import { useTranslation } from "react-i18next";

export function AtuVisitList() {
const { t } = useTranslation(["salesAnalyze"]);

  const { status, visitData, indexArray, message } = useAtuVisit();

  if (status === "pending") {
    return (
      <Section>
        <>
          <Loading.block />
          <Loading.block height={16 * 30} />
        </>
      </Section>
    );
  }

  if (status === 'error') {
    return <Section>
      <Error.block message={message} className="h-96" />
    </Section>
  }

  return (
    <>
      <Section>
        <Table>
          <table>
            <thead>
              <tr>
                <th
                  colSpan={4}
                  className='text-start bg-sectionHeader text-myWhite'
                >
                  {t('atuVisitList.thead.visitList')}
                </th>
                <th
                  colSpan={indexArray.length}
                  className='text-start bg-sectionHeader text-myWhite'
                >
                  {t('atuVisitList.thead.dateList')}
                </th>
              </tr>
              <tr>
                <th>{t('atuVisitList.thead.sales')}</th>
                <th>{t('atuVisitList.thead.cusName')}</th>
                <th>{t('atuVisitList.thead.pay')}</th>
                <th>{t('atuVisitList.thead.visit')}</th>
                {indexArray.map((index) => (
                  <th key={index}>{index}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {visitData.map((data) => (
                <tr key={data.id}>
                  <td>{data.EmpName}</td>
                  <td>{data.cusName}</td>
                  <td>{data.payNumber}</td>
                  <td>{data.visitNumber}</td>
                  {data.visitList.map((date, index) => (
                    <td
                      key={index}
                      className='whitespace-nowrap'
                    >
                      <a
                        href={`https://esys.orange-electronic.com/TravelRep/Edit/${date.BTRId}`}
                        target='_blank'
                        className='text-blue-500'
                      >
                        {date.StartDT}
                      </a>
                    </td>
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
