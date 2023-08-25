import { useTheme } from "styled-components";
import { WeekTable } from "./week tabel";
import { PerCentTable } from "./percent table";
import * as Btns from "@components/UI/buttons";
import { useModalControl } from "@/hooks/modal control";
import { useAppSelector } from "@/hooks/redux";
import { useTripDataProcessing } from "./data";
import { useTranslation } from "react-i18next";

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
    </article>
  );
};

export default Confirm;
