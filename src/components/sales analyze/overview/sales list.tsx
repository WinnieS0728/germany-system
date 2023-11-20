import { Table } from "@/components/table/table";
import { useSalesList } from "@/components/sales analyze/overview/sales list.hook";
import { Section } from "@/layouts/section";
import { cn } from "@/utils/cn";
import { getLocaleString } from "@/utils/get localeString";
import { Loading } from "@/components/UI/loading";
import { useTranslation } from "react-i18next";


export function SalesList() {
const { t } = useTranslation(["salesAnalyze"]);
  const { status, salesListData, indexArray } = useSalesList();

  if (status === "pending") {
    return (
      <Section>
        <>
          <Loading.block />
          <Loading.block height={16 * 20} />
        </>
      </Section>
    );
  }

  return (
    <>
      <Section title={t('overview.salesList.title')}>
        <Table>
          <table>
            <thead>
              <tr>
                <th
                  className='text-start bg-sectionHeader text-myWhite'
                  colSpan={4}
                >
                  {t('overview.salesList.thead.storeList')}
                </th>
                <th
                  className='text-start bg-sectionHeader text-myWhite'
                  colSpan={indexArray.length}
                >
                  {t('overview.salesList.thead.orderList')}
                </th>
              </tr>
              <tr>
                <th>{t('overview.salesList.thead.sales')}</th>
                <th>{t('overview.salesList.thead.cusName')}</th>
                <th>{t('overview.salesList.thead.tx')}</th>
                <th>{t('overview.salesList.thead.order')}</th>
                {indexArray.map((index) => (
                  <th key={index}>{index}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {salesListData.map((data) => (
                <tr key={data.id}>
                  <td className='whitespace-pre'>{data.sa_name}</td>
                  <td
                    className={cn("", {
                      "text-green-600": data.isFirstOrder,
                    })}
                  >
                    {data.cu_name}
                  </td>
                  <td>{getLocaleString(data.tx)}</td>
                  <td>{getLocaleString(data.orderTime)}</td>
                  {data.salesArray.map((data, index) => (
                    <td
                      key={index}
                      className='whitespace-nowrap'
                    >
                      {data}
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
