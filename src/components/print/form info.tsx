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
        {t("formInfo.id")} : {headData.id}
      </p>
      <p>
        {t("formInfo.date")} : {headData.createDate}
      </p>
      <p>
        {t("formInfo.dept")} : {headData.dept}
      </p>
      <p>
        {t("formInfo.comp")} : {headData.company}
      </p>
      <p>
        {t("formInfo.EmpId")} : {headData.EmpId}
      </p>
      <p>
        {t("formInfo.name")} : {headData.EmpName}
      </p>
    </section>
  );
};

const styled_formInfo = styled(FormInfo)`
    display: grid;
    grid-template-columns: repeat(2,1fr);
    gap: .5em;
`;

export default styled_formInfo;
