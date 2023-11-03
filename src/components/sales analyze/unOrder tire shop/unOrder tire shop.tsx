import { Table } from "@/components/table/table";
import { Section } from "@/layouts/section";
import { useUnOrderTireShop } from "./unOrder tire shop.hook";

export function UnOrderTireShopTable() {
  const unVisitData = useUnOrderTireShop();

  return (
    <>
      <Section>
        <Table>
          <table>
            <thead>
              <tr>
                <th>業務</th>
                <th>客戶名稱</th>
                <th>客戶地址</th>
                <th>客戶電話</th>
                <th>TX 購買數量</th>
                <th>最近下單記錄</th>
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
                      <address>{data.Address}</address>
                    </a>
                  </td>
                  <td className='whitespace-nowrap'>
                    <a href={`tel:${data.Phone}`}>{data.Phone}</a>
                  </td>
                  <td>{data.Sqty}</td>
                  <td>{data.LastDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Table>
      </Section>
    </>
  );
}
