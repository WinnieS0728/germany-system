import { Loading } from "@/components/UI/loading";
import { getVisitStore, useKpiTable } from "./kpi table.hook";
import { Section } from "@/layouts/section";
import { Error } from "@/components/UI/error";
import { Table } from "@/components/table/table";
import { getPercent } from "@/utils/get percent";

export function KpiTable() {
  const { data, isPending, isError, error } = useKpiTable();

  if (isPending) {
    return (
      <Section>
        <>
          <Loading.block />
          <Loading.block height={16 * 10} />
        </>
      </Section>
    );
  }

  if (isError) {
    return (
      <Section>
        <Error.block message={error.message} />
      </Section>
    );
  }

  return (
    <>
      <Section title='KPI 執行進度'>
        <Table>
          <table>
            <thead>
              <tr>
                <th rowSpan={2}>業務</th>
                <th colSpan={7}>拜訪店家數執行進度</th>
                <th colSpan={2}>上傳店家照片</th>
                <th colSpan={2}>推薦成功店家</th>
                <th colSpan={2}>OSOM 登入數</th>
                <th colSpan={2}>Tire Storage 資料數</th>
              </tr>
              <tr>
                <th>總數</th>
                <th>ATU</th>
                <th>拜訪比例</th>
                <th>既有輪胎店客戶</th>
                <th>拜訪比例</th>
                <th>新客戶</th>
                <th>拜訪比例</th>
                <KpiTh />
                <KpiTh />
                <KpiTh />
                <KpiTh />
              </tr>
            </thead>
            <tbody>
              {data.map((data) => (
                <tr key={data.EmpName}>
                  <td>{data.EmpName}</td>
                  <VisitTable visitData={data.visitData} />
                  <td>{data.kpiAchievement.photo}</td>
                  <td>{data.kpiNumber.photo}</td>
                  <td>{data.kpiAchievement.introduce}</td>
                  <td>{data.kpiNumber.introduce}</td>
                  <td>{'增加'+data.kpiAchievement.login+'筆'}</td>
                  <td>{data.kpiNumber.login}</td>
                  <td>{'增加'+data.kpiAchievement.tireStorageData+'筆'}</td>
                  <td>{data.kpiNumber.tireStorageData}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Table>
      </Section>
    </>
  );
}

function KpiTh() {
  return (
    <>
      <th>目標</th>
      <th>實際</th>
    </>
  );
}

function VisitTable({ visitData }: { visitData: getVisitStore }) {
  const total = visitData.atu + visitData.existCus + visitData.newCus;
  return (
    <>
      <td>{total}</td>
      <td>{visitData.atu}</td>
      <td>{getPercent(visitData.atu, total) + "%"}</td>
      <td>{visitData.existCus}</td>
      <td>{getPercent(visitData.existCus, total) + "%"}</td>
      <td>{visitData.newCus}</td>
      <td>{getPercent(visitData.newCus, total) + "%"}</td>
    </>
  );
}
