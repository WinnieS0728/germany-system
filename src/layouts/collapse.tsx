import { useState } from "react";
import * as Icons from "@components/UI/icons";
import { useTheme } from "styled-components";

interface collapseProp {
  main: JSX.Element;
  sub: JSX.Element;
}
export const Collapse = ({ main, sub }: collapseProp) => {
  const color = useTheme()?.color;
  const [open, setOpen] = useState(true);

  return (
    <div className='flex flex-col'>
      <div className='header flex justify-between'>
        {main}
        <button
          type='button'
          className='flex items-center justify-center gap-1'
          style={{ color: color.blue }}
          onClick={() => {
            setOpen((prev) => !prev);
          }}
        >
          <span
            style={{
              rotate: open ? ".5turn" : "0deg",
            }}
          >
            <Icons.ShowDetail />
          </span>
          詳細資料
        </button>
      </div>
      <div
        className='bottom'
        style={{
          height: open ? "100vh" : 0,
          overflowY: "hidden",
        }}
      >
        <div className='mt-2 border-t-4 pt-4'>{sub}</div>
      </div>
    </div>
  );
};
