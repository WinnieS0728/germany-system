import { useTheme } from "styled-components";
import { WeekTable } from "./week tabel";

export const Confirm = () => {
  const color = useTheme()?.color;
  return (
    <article
      className='flex flex-col gap-2 px-6 py-2'
      style={{ backgroundColor: color.white }}
    >
      <h2 className='text-xl'>表單送簽</h2>
      <p>表單送出後, 如要更改或作廢請洽MIS</p>
      <WeekTable />
    </article>
  );
};
