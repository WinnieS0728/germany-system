import { Table } from "@/components/table/table";
import { Section } from "@/layouts/section";
import { useUnVisitTireShop } from "./unvisit tire shop.hook";
import { Loading } from "@/components/UI/loading";
import { Error } from "@/components/UI/error";

export function UnVisitTireShopTable() {
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
                <th>業務</th>
                <th>客戶名稱</th>
                <th>客戶地址</th>
                <th>客戶電話</th>
                <th>拜訪次數</th>
                <th>最近拜訪紀錄</th>
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
