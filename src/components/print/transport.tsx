import { useSignPageData } from "@/pages/sign/data";
import { sc_props } from "@/types";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

const Transport = ({ className }: sc_props) => {
  const { t } = useTranslation("print");
  const { headData } = useSignPageData();
  

  return (
    <section className={className}>
      <table>
        <tbody>
          <tr>
            <td>{t("transport.transportation")}</td>
            <td colSpan={3}>{headData.transportation}</td>
          </tr>
          <tr>
            <td>{t("transport.isLodging")}</td>
            <td>{headData.isLodging}</td>
            <td>{t("transport.amount")}</td>
            <td>{headData.money}</td>
          </tr>
        </tbody>
      </table>
    </section>
  );
};

const styled_transport = styled(Transport)`

`;

export default styled_transport;
