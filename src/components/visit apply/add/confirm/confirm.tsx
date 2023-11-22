import { useTheme } from "styled-components";
import { WeekTable } from "./week tabel";
import { PerCentTable, getVisitPercent } from "./percent table";
import * as Btns from "@components/UI/buttons";
import { useModalControl } from "@/hooks/modal control";
import { useAppSelector } from "@data/store";
import { useTripDataProcessing } from "./data";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import api from "@/api";
import { month_shortName } from "@/types";
import { getPercent } from "@/utils/get percent";

const Confirm = () => {
  const { t } = useTranslation("confirm modal");
  const color = useTheme()?.color;
  const [toggleModal] = useModalControl("review");
  const tripDetail = useAppSelector((state) => state.tripDetail);
  const nowUser = useAppSelector((state) => state.nowUser);
  const timeData = useAppSelector((state) => state.time);
  const { nextWeekDays, rows, spreadData } = useTripDataProcessing(
    tripDetail.body,
    timeData.today
  );
  const tablaData = { nextWeekDays, rows, spreadData };
  const { thisYear } = useAppSelector((state) => state.time);
  const [disable, setDisable] = useState<boolean>(false);

  useEffect(() => {
    const { newCus, allCus } = getVisitPercent([spreadData]);

    (async function () {
      const res = await api.threshold.fetch(thisYear, nowUser.body.EmpId);
      const thisMonth = month_shortName[new Date().getMonth()];

      const newCus_threshold = res[0][`${thisMonth}`];      

      if (getPercent(newCus.length, allCus) > Number(newCus_threshold)) {
        setDisable(true);
      } else {
        setDisable(false);
      }
    })();
  }, [nowUser.body.EmpId, spreadData, thisYear]);

  return (
    <article
      className='modal flex flex-col gap-4'
      style={{ backgroundColor: color.white }}
    >
      <h2 className='text-xl'>{t("title")}</h2>
      <p>{t("warn")}</p>
      <WeekTable data={tablaData} />
      <PerCentTable
        data={[spreadData]}
        EmpId={nowUser.body.EmpId}
        time={{ year: timeData.thisYear, month: timeData.thisMonth }}
      />
      {disable ? (
        <Btns.LongBtn
          type='button'
          style='cancel'
          onClick={() => {
            toggleModal("off");
          }}
        >
          {t("kpiError")}
        </Btns.LongBtn>
      ) : (
        <div className='submit-btns'>
          <Btns.LongBtn
            type='submit'
            style='confirm'
            form='business apply'
          />
          <Btns.LongBtn
            type='button'
            style='cancel'
            onClick={() => {
              toggleModal("off");
            }}
          />
        </div>
      )}
    </article>
  );
};

export default Confirm;
