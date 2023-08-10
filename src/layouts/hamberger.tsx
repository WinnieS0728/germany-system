import { useRef, useState } from "react";
import * as Btns from "@components/UI/buttons";
import * as Icons from "@components/UI/icons";

type props = {
  list: JSX.Element[];
};
export const Hamburger = ({ list }: props) => {
  const [open, setOpen] = useState<boolean>(false);

  const rwd = "md";

  return (
    <div className='relative'>
      <span
        className={`${rwd}:hidden`}
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
        className={`flex flex-col ${
          open ? "max-h-60 py-2" : "max-h-0 py-0"
        } absolute gap-2 ${rwd}:relative  ${rwd}:flex-row overflow-y-hidden md:max-h-60`}
        style={{ transition: "max-height .2s linear, padding .3s" }}
      >
        {list.map((i, index) => (
          <li key={index}>{i}</li>
        ))}
      </ul>
    </div>
  );
};
