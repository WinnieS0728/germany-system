import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { Table } from "@components/table/table";
import { useState } from "react";
import { useTheme } from "styled-components";
import { setPersonVisitData } from "@/data/actions/visit data/set person visit";
import { GetData } from "./year data";
import { useTranslation } from "react-i18next";

export const YearTable = () => {
  const color = useTheme()?.color;
  const { t } = useTranslation(["common", "customRatePage"]);

  const monthAry = [];
  for (let i = 1; i < 13; i++) {
    monthAry.push(t(`month.${i}`));
  }

  const [id, setId] = useState("");

  const dispatch = useAppDispatch();

  const Filter = () => {
    const salesList = useAppSelector((state) => state.member);
    const dataSet = salesList.body;

    function handleChange(id: string) {
      dispatch(setPersonVisitData(id));
      setId(id);
    }

    return (
      <>
        <label style={{ display: "flex", gap: "1rem", alignItems: "center" }} id="joy-ratePage-1">
          {t("sales table.filter label", { ns: "customRatePage" })} :
          <select
            onChange={(e) => handleChange(e.target.value)}
            value={id}
            style={{
              backgroundColor: color?.white,
              color: color?.black,
              borderRadius: ".5rem",
            }}
          >
            <option value='default'>
              {t("sales table.filter default", { ns: "customRatePage" })}
            </option>
            {dataSet.map((i) => (
              <option
                key={i?.EmpId}
                value={i?.EmpId}
              >
                {i?.EmpName}
              </option>
            ))}
          </select>
        </label>
      </>
    );
  };

  const dataSet = GetData();

  return (
      <Table
        title={t("sales table.title", { ns: "customRatePage" })}
        filter={<Filter />}
      >
        <table>
          <thead style={{ color: color?.black }}>
            <tr>
              <td>{t("sales table.type.title", { ns: "customRatePage" })}</td>
              {monthAry.map((i) => (
                <td key={i}>{i}</td>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>ATU</td>
              {dataSet.atu.map((i, index) => (
                <td key={index}>{i ? i + "%" : ""}</td>
              ))}
            </tr>
            <tr>
              <td>{t("cus type.exist cus", { ns: "customRatePage" })}</td>
              {dataSet.existCus.map((i, index) => (
                <td key={index}>{i ? i + "%" : ""}</td>
              ))}
            </tr>
            <tr>
              <td>{t("cus type.new cus", { ns: "customRatePage" })}</td>
              {dataSet.newCus.map((i, index) => (
                <td key={index}>{i ? i + "%" : ""}</td>
              ))}
            </tr>
          </tbody>
        </table>
      </Table>
  );
};
