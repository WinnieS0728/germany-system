import { sc_props } from "@/types";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

const Title = ({ className }: sc_props) => {
  const { t } = useTranslation("print");
  return (
    <section className={className}>
      <h1>{t("title")}</h1>
      <h2>{t("sub title")}</h2>
    </section>
  );
};

const styled_title = styled(Title)`
    text-align: center;
    display: flex;
    flex-flow: column;
    gap: .5em;
    
    h1 {
        font-size: 16pt;
    }
    h2 {
        font-size: 14pt;
    }
`;

export default styled_title;
