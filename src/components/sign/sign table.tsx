import { useTheme } from "styled-components";
import { Table } from "../table/table";
import { dateFormatter } from "@/hooks/dateFormatter";
import { useAppSelector } from "@/hooks/redux";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useId2name } from "@/hooks/id2name";
import { useSignStatusTranslate } from "@/hooks/status translate";

const FileList = ({ order }: { order: number }) => {
  const data = useAppSelector((state) => state.files).body.formAttach;
  const formData = useAppSelector((state) => state.formInfo).body;
  const myFile = data
    .map((d, i) => {
      return {
        ...d,
        show: `${formData.formId}-${i + 1}`,
      };
    })
    .filter((d) => parseInt(d.SIGNORDER) === order);
  return (
    <ul>
      {myFile.map((d, i) => (
        <li
          key={i}
          style={{ whiteSpace: "nowrap" }}
        >
          {d.show}
        </li>
      ))}
    </ul>
  );
};

export const SignTable = () => {
  const { t } = useTranslation("sign page");
  const color = useTheme()?.color;
  const formInfo = useAppSelector((state) => state.formInfo).body;
  const [newData, setData] = useState(formInfo.signList);
  const { id2name } = useId2name();
  const { getSignStatus } = useSignStatusTranslate();

  function isOtherSign(type: string): boolean {
    if (type === "會簽") {
      return true;
    }
    return false;
  }

  useEffect(() => {
    (async function () {
      const data = await Promise.all(
        formInfo.signList.map(async (i) => {
          return {
            ...i,
            SIGNERNAME: await id2name(i.SIGNER),
          };
        })
      );
      setData(data);
    })();
  }, [formInfo.signList, id2name]);

  return (
    <section>
      <h3
        className='header'
        style={{
          backgroundColor: color.sign_header,
          textAlign: "center",
          padding: ".5rem",
        }}
      >
        {t("table.title")}
      </h3>
      <Table>
        <table>
          <thead style={{ backgroundColor: color.tableBgc }}>
            <tr>
              <td>{t("table.index")}</td>
              <td>{t("table.step")}</td>
              <td>{t("table.emp")}</td>
              <td>{t("table.image")}</td>
              <td>{t("table.status")}</td>
              <td>{t("table.date")}</td>
              <td>{t("table.opinion")}</td>
              <td>{t("table.attach")}</td>
            </tr>
          </thead>
          <tbody>
            {newData.slice(1)?.map((list, index) => (
              <tr key={index}>
                <td>{list.SIGNORDER}</td>
                <td>{`${isOtherSign(list.SignGroup) ? "會簽 -" : ""} ${
                  list.STEPNAME
                }`}</td>
                <td>{list.SIGNERNAME}</td>
                <td>
                  {(list.SIGNRESULT === 1 || list.SIGNRESULT === 3) && (
                    <span className='flex items-center justify-center'>
                      <img
                        alt='簽名圖片'
                        src={`https://esys.orange-electronic.com/Image/SignerPicture/${list.SIGNER}.png`}
                      />
                    </span>
                  )}
                </td>
                <td>{getSignStatus(list.SIGNRESULT)}</td>
                <td style={{ whiteSpace: "nowrap" }}>
                  {list.SIGNTIME && dateFormatter(list.SIGNTIME)}
                </td>
                <td>{list.OPINION}</td>
                <td>
                  <FileList order={list.SIGNORDER} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Table>
    </section>
  );
};
