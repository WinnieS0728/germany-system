import { useTheme } from "styled-components";
import { Table } from "../table/table";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import { signStatus } from "@/types";
import { dateFormatter } from "@/hooks/dateFormatter";

export const SignTable = ({ formId }: { formId: string }) => {
  const color = useTheme()?.color;

  const [signList, setSignList] = useState<any[]>([]);

  useEffect(() => {
    (async function () {
      const res = await api.getSignList(formId);
      const notMe = res.slice(1)
      setSignList(notMe);
    })();
  }, [formId]);  

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
        簽核流程
      </h3>
      <Table>
        <table>
          <thead style={{ backgroundColor: color.tableBgc }}>
            <tr>
              <td>順序</td>
              <td>簽核程序</td>
              <td>簽核人員</td>
              <td>簽名檔</td>
              <td>簽核狀態</td>
              <td>簽核時間</td>
              <td>意見</td>
              <td>附件</td>
            </tr>
          </thead>
          <tbody>
            {signList?.map((list, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
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
                <td>{signStatus[parseInt(`${list.SIGNRESULT}`)]}</td>
                <td style={{ whiteSpace: "nowrap" }}>
                  {list.SIGNTIME && dateFormatter(list.SIGNTIME)}
                </td>
                <td>{list.OPINION}</td>
                <td></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Table>
    </section>
  );
};
