import { useRef, useState } from "react";
import * as Btns from "@components/UI/buttons";
import * as Icons from "@components/UI/icons";

type props = {
  list: JSX.Element[];
};
export const Hamburger = ({ list }: props) => {
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
        absolute md:relative   overflow-y-hidden md:max-h-60`}
        style={{ transition: "max-height .2s linear, padding .3s" }}
      >
        {list.map((i, index) => (
          <li key={index}>{i}</li>
        ))}
      </ul>
    </div>
  );
};
