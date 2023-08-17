import { useState } from "react";
import * as Btns from "@components/UI/buttons";
import * as Icons from "@components/UI/icons";

type props = {
  children: JSX.Element;
};
export const Hamburger = ({ children }: props) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className='relative'>
      <span
        className={`md:hidden`}
        onClick={() => {
          setOpen((prev) => !prev);
        }}
      >
        <button type='button'>
          <Btns.IconBtn icon={<Icons.Hamburger size='1.25rem' />}>
            功能清單
          </Btns.IconBtn>
        </button>
      </span>
      <ul
        className={`flex flex-col gap-2 md:flex-row
        ${open ? "max-h-60 py-2" : "max-h-0 py-0"} 
        absolute overflow-y-hidden md:relative md:max-h-60 md:transition-none`}
        style={{ transition: "max-height .2s linear, padding .3s" }}
      >
        {children}
      </ul>
    </div>
  );
};
