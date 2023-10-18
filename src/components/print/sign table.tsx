import { dateFormatter } from "@/utils/dateFormatter";
import { useAppSelector } from "@/utils/redux";
import { useSignStatusTranslate } from "@/hooks/status translate";
import { sc_props } from "@/types";
import { Fragment } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

const SignTable = ({ className }: sc_props) => {
  const { t } = useTranslation("print");
  const { signList } = useAppSelector((state) => state.formInfo).body;

  const { getSignStatus } = useSignStatusTranslate();

  return (
    <table className={className}>
      <tbody>
        {signList.map((member, index) => (
          <Fragment key={index}>
            <tr key={`row1-${index}`}>
              <td>{t("sign.step")}</td>
              <td>{member.STEPNAME}</td>
              <td>{t("sign.status")}</td>
              <td>{getSignStatus(member.SIGNRESULT)}</td>
              <td>{t("sign.date")}</td>
              <td>{dateFormatter(member.SIGNTIME)}</td>
            </tr>
            <tr key={`row2-${index}`}>
              <td>{t("sign.opinion")}</td>
              <td colSpan={5}>{member.OPINION || "-"}</td>
            </tr>
          </Fragment>
        ))}
      </tbody>
    </table>
  );
};

const styled_signTable = styled(SignTable)`
    break-inside: avoid;
`;

export default styled_signTable;
