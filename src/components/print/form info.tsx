import { useSignPageData } from "@/pages/sign/data";
import { sc_props } from "@/types";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

const FormInfo = ({ className }: sc_props) => {
  const { t } = useTranslation("print");
  const { headData } = useSignPageData();

  return (
    <section className={className}>
      <p>
        <span>{t("formInfo.id")} :</span>
        <span>{headData.id}</span>
      </p>
      <p>
        <span>{t("formInfo.date")} :</span>
        <span>{headData.createDate}</span>
      </p>
      <p>
        <span>{t("formInfo.dept")} :</span>
        <span>{headData.dept}</span>
      </p>
      <p>
        <span>{t("formInfo.comp")} :</span>
        <span>{headData.company}</span>
      </p>
      <p>
        <span>{t("formInfo.EmpId")} :</span>
        <span>{headData.EmpId}</span>
      </p>
      <p>
        <span>{t("formInfo.name")} :</span>
        <span>{headData.EmpName}</span>
      </p>
    </section>
  );
};

const styled_formInfo = styled(FormInfo)`
    display: grid;
    grid-template-columns: repeat(2,1fr);
    gap: .5em;

    p {
      display: grid;
      grid-template-columns: repeat(2,1fr);

      span:first-child {
        text-align: end;
      }
    }
`;

export default styled_formInfo;
