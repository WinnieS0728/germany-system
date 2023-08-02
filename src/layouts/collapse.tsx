import { useState } from "react";
import * as Icons from "@components/UI/icons";
import { useTheme } from "styled-components";
import { useAppDispatch } from "@/hooks/redux";
import { deleteItem } from "@/data/reducers/trip detail/trip detail";

interface collapseProp {
  main: JSX.Element;
  sub: JSX.Element;
  remove?: () => void;
  index?: number;
  type: "addForm" | "sign";
}
export const Collapse = ({ type, main, sub, remove, index }: collapseProp) => {
  const color = useTheme()?.color;
  const [open, setOpen] = useState(true);

  const dispatch = useAppDispatch();
  function handleDelete() {
    dispatch(deleteItem(index));
    remove && remove();
  }

  return (
    <div className='flex flex-col'>
      <div className='header flex justify-between'>
        {main}
        <div className='flex'>
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
                rotate: open ? "0deg" : ".5turn",
              }}
            >
              <Icons.ShowDetail color={color.blue} />
            </span>
            詳細資料
          </button>
          {type === "addForm" && (
            <button
              type='button'
              onClick={handleDelete}
            >
              <Icons.Delete size='1.25rem' />
            </button>
          )}
        </div>
      </div>
      <div
        className='bottom'
        style={{
          height: open ? "auto" : 0,
          overflowY: "hidden",
          transition: "height 1s ease",
        }}
      >
        <div className='mt-2 border-t-4 pt-4'>{sub}</div>
      </div>
    </div>
  );
};
