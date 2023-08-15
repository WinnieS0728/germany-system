import { useTheme } from "styled-components";
import { Table } from "../table/table";
import { signStatus } from "@/types";
import { signStatus_E } from "@/types";
import { dateFormatter } from "@/hooks/dateFormatter";
import { useAppSelector } from "@/hooks/redux";
import { useTranslation } from "react-i18next";

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
  const { i18n, t } = useTranslation("sign page");
  const nowLang = i18n.language;
  const color = useTheme()?.color;
  const formInfo = useAppSelector((state) => state.formInfo).body;

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
            {formInfo.signList.slice(1)?.map((list, index) => (
              <tr key={index}>
                <td>{list.SIGNORDER}</td>
                <td>{list.STEPNAME}</td>
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
                <td>
                  {nowLang === "en"
                    ? signStatus_E[parseInt(`${list.SIGNRESULT}`)]
                    : signStatus[parseInt(`${list.SIGNRESULT}`)]}
                </td>
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
