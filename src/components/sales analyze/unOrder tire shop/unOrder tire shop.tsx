import { Table } from "@/components/table/table";
import { Section } from "@/layouts/section";
import { useUnOrderTireShop } from "./unOrder tire shop.hook";
import { Loading } from "@/components/UI/loading";
import { useTranslation } from "react-i18next";
import { Error } from "@/components/UI/error";

export function UnOrderTireShopTable() {
  const { t } = useTranslation(["salesAnalyze"]);
  const { status, unOrderList, message } = useUnOrderTireShop();

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
                <th>{t("unOrderTS.thead.sales")}</th>
                <th>{t("unOrderTS.thead.cusName")}</th>
                <th>{t("unOrderTS.thead.addr")}</th>
                <th>{t("unOrderTS.thead.tel")}</th>
                <th>{t("unOrderTS.thead.tx")}</th>
                <th>{t("unOrderTS.thead.recent")}</th>
              </tr>
            </thead>
            <tbody>
              {unOrderList.map((data) => (
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
                  <td>{data.Sqty}</td>
                  <td className='whitespace-nowrap'>{data.LastDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Table>
      </Section>
    </>
  );
}
