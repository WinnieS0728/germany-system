import { Table } from "@/components/table/table";
import { useTheme } from "styled-components";
import { dataSet, useFetchApplyList } from "./fetch list";
import { Tbody } from "@/components/table/tbody";
import { usePageControl } from "./page control";
import * as Btns from "@components/UI/buttons";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSignStatusTranslate } from "@/hooks/status translate";

const DateSpan = (props: { date: string }) => {
  const { date } = props;
  return <span style={{ whiteSpace: "nowrap" }}>{date}</span>;
};

export const ListTable = () => {
  const color = useTheme()?.color;
  const { t } = useTranslation("list page");
  const { data, status } = useFetchApplyList();

  const howManyDataShowInOnePage = 10;
  const { dataInThisPage, nextPage, prevPage, buttonStatus } =
    usePageControl<dataSet>(data, 10);
  const { getFormStatus } = useSignStatusTranslate();

  return (
    <>
      <Table>
        <table>
          <thead
            style={{ backgroundColor: color.sectionHeader, color: color.white }}
          >
            <tr>
              <th>{t("thead.id")}</th>
              <th>{t("thead.date")}</th>
              <th>{t("thead.BTPId")}</th>
              <th>{t("thead.atu")}</th>
              <th>{t("thead.oldCus")}</th>
              <th>{t("thead.newCus")}</th>
              <th>{t("thead.createId")}</th>
              <th>{t("thead.status")}</th>
              <th>{t("thead.nextSigner")}</th>
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
                        to={{
                          pathname:`./sign/${i.formId}`,
                          search: location.search
                        }}
                        className="curser-pointer text-blue-500"
                      >
                        {i.formId}
                      </Link>
                    </td>
                    <td>{i.atuNum}</td>
                    <td>{i.oldCusNum}</td>
                    <td>{i.newCusNum}</td>
                    <td>{i.name}</td>
                    <td>{getFormStatus(i.formStatus)}</td>
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
