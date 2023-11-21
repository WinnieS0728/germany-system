import { Table } from "@/components/table/table";
import { Section } from "@/layouts/section";
import { useUnVisitTireShop } from "./unvisit tire shop.hook";
import { Loading } from "@/components/UI/loading";
import { Error } from "@/components/UI/error";
import { useTranslation } from "react-i18next";

export function UnVisitTireShopTable() {
  const { t } = useTranslation(["salesAnalyze"]);
  const { status, unVisitData, message } = useUnVisitTireShop();

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
                <th>{t("unVisitTS.thead.sales")}</th>
                <th>{t("unVisitTS.thead.cusName")}</th>
                <th>{t("unVisitTS.thead.addr")}</th>
                <th>{t("unVisitTS.thead.tel")}</th>
                <th>{t("unVisitTS.thead.visit")}</th>
                <th>{t("unVisitTS.thead.recent")}</th>
              </tr>
            </thead>
            <tbody>
              {unVisitData.map((data) => (
                <tr key={data.custid}>
                  <td>{data.Empname}</td>
                  <td>{data.Custname}</td>
                  <td>
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${data.Address}`}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      <address className='text-blue-500'>
                        {data.Address}
                      </address>
                    </a>
                  </td>
                  <td className='whitespace-nowrap'>
                    <a
                      href={`tel:${data.Phone}`}
                      className='text-blue-500'
                    >
                      {data.Phone}
                    </a>
                  </td>
                  <td>{data.Vqty}</td>
                  <td className="whitespace-nowrap">{data.LastDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Table>
      </Section>
    </>
  );
}
