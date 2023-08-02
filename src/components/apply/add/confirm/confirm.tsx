import { useTheme } from "styled-components";
import { WeekTable } from "./week tabel";
import { PerCentTable } from "./percent table";
import * as Btns from "@components/UI/buttons";
import { useModalControl } from "@/hooks/modal control";
import { useAppSelector } from "@/hooks/redux";
import { useData } from "./data";

export const Confirm = () => {
  const color = useTheme()?.color;
  const [toggleModal] = useModalControl("review");
  const tripDetail = useAppSelector((state) => state.tripDetail);
  const nowUser = useAppSelector((state) => state.nowUser);
  const timeData = useAppSelector((state) => state.time);
  const { nextWeekDays, rows, spreadData } = useData(
    tripDetail.body,
    timeData.today
  );
  const tablaData = { nextWeekDays, rows, spreadData };

  return (
    <article
      className='flex flex-col gap-4 px-6 py-4'
      style={{ backgroundColor: color.white }}
    >
      <h2 className='text-xl'>表單送簽</h2>
      <p>表單送出後, 如要更改或作廢請洽MIS</p>
      <WeekTable data={tablaData} />
      <PerCentTable
        data={spreadData}
        EmpId={nowUser.body.EmpId}
        time={{ year: timeData.thisYear, month: timeData.thisMonth }}
      />
      <div className='flex items-center justify-center gap-4 py-4'>
        <Btns.LongBtn
          type='button'
          style='cancel'
          onClick={() => {
            toggleModal("off");
          }}
        />
        <Btns.LongBtn
          type='submit'
          style='confirm'
          form='business apply'
        />
      </div>
    </article>
  );
};
