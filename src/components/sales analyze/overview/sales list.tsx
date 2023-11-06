import { Table } from "@/components/table/table";
import { useSalesList } from "@/components/sales analyze/overview/sales list.hook";
import { Section } from "@/layouts/section";
import { cn } from "@/utils/cn";
import { getLocaleString } from "@/utils/get localeString";

export function SalesList() {
  const { status, salesListData, indexArray } = useSalesList();
  console.log(salesListData);
  

  return (
    <>
      <Section title='輪胎店銷售列表'>
        <Table>
          <table>
            <thead>
              <tr>
                <th
                  className='text-start bg-sectionHeader text-myWhite'
                  colSpan={4}
                >
                  店家列表
                </th>
                <th
                  className='text-start bg-sectionHeader text-myWhite'
                  colSpan={indexArray.length}
                >
                  訂單記錄
                </th>
              </tr>
              <tr>
                <th>業務人員</th>
                <th>店家名稱</th>
                <th>TX數量</th>
                <th>下單次數</th>
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
