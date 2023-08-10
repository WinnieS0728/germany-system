import { Table } from "@/components/table/table";
import { useTheme } from "styled-components";
import { useFetchApplyList } from "./data";
import { Tbody } from "@/components/table/tbody";
import { usePageControl } from "./page control";
import * as Btns from "@components/UI/buttons";
import { Link } from "react-router-dom";
import { useAppSelector } from "@/hooks/redux";

const DateSpan = (props: { date: string }) => {
  const { date } = props;
  return <span style={{ whiteSpace: "nowrap" }}>{date}</span>;
};

export const ListTable = () => {
  const color = useTheme()?.color;
  const nowUser = useAppSelector((state) => state.nowUser).body;
  const { data, status } = useFetchApplyList();

  const howManyDataShowInOnePage = 10;

  const { dataInThisPage, nextPage, prevPage, buttonStatus } = usePageControl(
    data,
    10
  );

  return (
    <>
      <Table>
        <table>
          <thead
            style={{ backgroundColor: color.sectionHeader, color: color.white }}
          >
            <tr>
              <th>項次</th>
              <th>出差日期</th>
              <th>表單號碼</th>
              <th>ATU 拜訪數</th>
              <th>既有客戶拜訪數</th>
              <th>新客戶拜訪數</th>
              <th>申請人員</th>
              <th>表單狀態</th>
              <th>待簽核人員</th>
            </tr>
          </thead>
          <Tbody status={status}>
            <>
              {dataInThisPage.length === 0 ? (
                <tr>
                  <td colSpan={9}>no data</td>
                </tr>
              ) : (
                dataInThisPage.map((i) => (
                  <tr key={i.id}>
                    <td>{i.id}</td>
                    <td>
                      {!i.date.start || !i.date.end ? (
                        <> - </>
                      ) : i.date.start === i.date.end ? (
                        <DateSpan date={i.date.start} />
                      ) : (
                        <div className='flex flex-wrap justify-center gap-1'>
                          <DateSpan date={i.date.start} />
                          ~
                          <DateSpan date={i.date.end} />
                        </div>
                      )}
                    </td>
                    <td>
                      <Link
                        to={`../sign/${i.formId}/?userID=${nowUser.EmpId}`}
                        target='__blank'
                        style={{ cursor: "pointer" }}
                      >
                        {i.formId}
                      </Link>
                    </td>
                    <td>{i.atuNum}</td>
                    <td>{i.oldCusNum}</td>
                    <td>{i.newCusNum}</td>
                    <td>{i.name}</td>
                    <td>{i.formStatus}</td>
                    <td>{i.nextSign || "-"}</td>
                  </tr>
                ))
              )}
            </>
          </Tbody>
        </table>
      </Table>
      <div
        className='flex justify-center gap-4'
        style={{
          display: data.length <= howManyDataShowInOnePage ? "none" : "flex",
        }}
      >
        <Btns.PageControlBtn
          type='prev'
          onClick={prevPage}
          disabled={!buttonStatus.prev}
        />
        <Btns.PageControlBtn
          type='next'
          onClick={nextPage}
          disabled={!buttonStatus.next}
        />
      </div>
    </>
  );
};
