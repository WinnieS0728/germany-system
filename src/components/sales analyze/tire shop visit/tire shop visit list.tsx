import { Loading } from "@/components/UI/loading";
import { useTSVisitList } from "./tire shop visit list.hook";
import { Section } from "@/layouts/section";
import { Error } from "@/components/UI/error";
import { Table } from "@/components/table/table";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export function TireShopVisitList() {
  const { t } = useTranslation(["salesAnalyze"]);

  const { status, tsVisitList, indexArray, message } = useTSVisitList();

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

  if (status === "error") {
    return (
      <Section>
        <Error.block message={message} />
      </Section>
    );
  }

  return (
    <>
      <Section>
        <Table>
          <table>
            <thead>
              <tr>
                <th
                  className='text-start bg-sectionHeader text-myWhite'
                  colSpan={4}
                >
                  {t("TSVisitList.thead.list")}
                </th>
                <th
                  className='text-start bg-sectionHeader text-myWhite'
                  colSpan={indexArray.length}
                >
                  {t("TSVisitList.thead.dateList")}
                </th>
              </tr>
              <tr>
                <th>{t("TSVisitList.thead.sales")}</th>
                <th>{t("TSVisitList.thead.cusName")}</th>
                <th>{t("TSVisitList.thead.tx")}</th>
                <th>{t("TSVisitList.thead.visit")}</th>
                {indexArray.map((number) => (
                  <th key={number}>{number}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tsVisitList.map((data) => (
                <tr key={data.CustId}>
                  <td>{data.Empname}</td>
                  <td>{data.Custname}</td>
                  <td>{data.SumQty}</td>
                  <td>{data.vqty}</td>
                  {data.visitDateList.map((date, index) => (
                    <td
                      key={index}
                      className='whitespace-nowrap'
                    >
                      <Link
                        target='_blank'
                        to={`https://esys.orange-electronic.com/TravelRep/Edit/${date.BTRId}`}
                        className='text-blue-500'
                      >
                        {date.StartDT}
                      </Link>
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
