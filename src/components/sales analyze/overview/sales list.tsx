import { Table } from "@/components/table/table";
import { useSalesList } from "@/hooks/useSalesList";
import { Section } from "@/layouts/section";
import { getLocaleString } from "@/utils/get localeString";

function Cu_type(isFirstOrder: boolean) {
  return (
    <>
      {isFirstOrder ? (
        <p className='text-green-600'>首購客戶</p>
      ) : (
        <p>既有客戶</p>
      )}
    </>
  );
}

export function SalesList() {
  const { salesListData, indexArray } = useSalesList(); 
  return (
    <>
      <Section title='輪胎店銷售列表'>
        <Table>
          <table>
            <thead>
              <tr>
                <th className="text-start bg-sectionHeader text-myWhite" colSpan={6}>店家列表</th>
                <th className="text-start bg-sectionHeader text-myWhite" colSpan={indexArray.length}>訂單記錄</th>
              </tr>
              <tr>
                <th>業務人員</th>
                <th>店家類別</th>
                <th>店家名稱</th>
                <th>TX數量</th>
                <th>下單次數</th>
                <th>近期訂購日期</th>
                {indexArray.map((index) => (
                  <th key={index}>{index}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {salesListData.map((data) => (
                <tr key={data.id}>
                  <td className="whitespace-pre">{data.sa_name}</td>
                  <td>{Cu_type(data.isFirstOrder)}</td>
                  <td>{data.cu_name}</td>
                  <td>{getLocaleString(data.tx)}</td>
                  <td>{getLocaleString(data.orderTime)}</td>
                  <td>{data.lastDate}</td>
                  {data.salesArray.map((data, index) => (
                    <td key={index}>{data}</td>
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
