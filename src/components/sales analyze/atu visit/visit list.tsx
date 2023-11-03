import { Table } from "@/components/table/table";
import { useAtuVisit } from "@/components/sales analyze/atu visit/atu visit list.hook";
import { Section } from "@/layouts/section";
export function AtuVisitList() {
  const { visitData, indexArray } = useAtuVisit()  

  return (
    <>
      <Section>
        <Table>
          <table>
            <thead>
              <tr>
                <th
                  colSpan={5}
                  className='text-start bg-sectionHeader text-myWhite'
                >
                  拜訪紀錄列表
                </th>
                <th
                  colSpan={indexArray.length}
                  className='text-start bg-sectionHeader text-myWhite'
                >
                  拜訪日期明細
                </th>
              </tr>
              <tr>
                <th>負責業務</th>
                <th>店家名稱</th>
                <th>累計對帳數量</th>
                <th>拜訪次數</th>
                <th>近期拜訪日期</th>
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
                  <td>{data.visitList[0].StartDT}</td>
                  {data.visitList.map((date, index) => (
                    <td key={index} className="whitespace-nowrap">
                      <a href={`https://esys.orange-electronic.com/TravelRep/Edit/${date.BTRId}`} target="_blank" className="text-blue-500">
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
