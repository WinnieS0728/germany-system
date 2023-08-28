import { detailDataWithSingleData } from "@/data/reducers/trip detail/trip detail";
import { useSignPageData } from "@/pages/sign/data";
import { sc_props } from "@/types";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

type blockProps = { data: detailDataWithSingleData } & sc_props;

const DetailBlock = ({ className, data }: blockProps) => {
  const { t } = useTranslation("print");
  function getDate(dateArray: string[]): string {
    const startDate = dateArray[0];
    const endDate = dateArray[dateArray.length - 1];
    return `${startDate} ~ ${endDate}`;
  }

  function getPlace(location: string[]): string {
    // console.log(location);
    const place = location.filter((d) => !!d);
    return place.join(", ");
  }

  return (
    <table className={className}>
      <tbody>
        <tr>
          <td>{t("detail.cusName")}</td>
          <td data-cus>{data.data.cus}</td>
          <td>{t("detail.place")}</td>
          <td>{getPlace([data.data.city, data.data.district])}</td>
        </tr>
        <tr>
          <td>{t("detail.purpose")}</td>
          <td>{data.data.purpose}</td>
          <td>{t("detail.date")}</td>
          <td data-date>{getDate(data.date)}</td>
        </tr>
        <tr>
          <td>{t("detail.PS")}</td>
          <td colSpan={3}>{data.data.PS}</td>
        </tr>
      </tbody>
    </table>
  );
};

const Styled_detailBlock = styled(DetailBlock)`
  td[data-date] {
    white-space: nowrap;
  }
  td[data-cus] {
    word-break: break-all;
    word-wrap: break-word;
  }
  break-inside: avoid;
`;

const Detail = ({ className }: sc_props) => {
  const { detailData } = useSignPageData();
  const [dataSet, setData] = useState<detailDataWithSingleData[]>([]);
  useEffect(() => {
    const data = detailData.reduce((a, b) => a.concat(b), []);
    setData(data);
  }, [detailData]);  

  return (
    <section className={className}>
      {dataSet.map((detailData) => (
        <Styled_detailBlock
          key={detailData.id}
          data={detailData}
        />
      ))}
    </section>
  );
};

const styled_detail = styled(Detail)`
  display: flex;
  flex-flow: column;
  gap: 1rem;
`;

export default styled_detail;
