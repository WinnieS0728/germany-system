import { Loading } from "@/components/UI/loading";
import { useTSVisitList } from "./tire shop visit list.hook";
import { Section } from "@/layouts/section";
import { Error } from "@/components/UI/error";
import { Table } from "@/components/table/table";
import { Link } from "react-router-dom";

export function TireShopVisitList() {
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
                  拜訪紀錄列表
                </th>
                <th
                  className='text-start bg-sectionHeader text-myWhite'
                  colSpan={indexArray.length}
                >
                  拜訪日期明細
                </th>
              </tr>
              <tr>
                <th>負責業務</th>
                <th>店家名稱</th>
                <th>TX 購買總數量</th>
                <th>拜訪次數</th>
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
                        className="text-blue-500"
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
