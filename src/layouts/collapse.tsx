import { useState } from "react";
import * as Icons from "@components/UI/icons";
import { useTheme } from "styled-components";
import { useAppDispatch } from "@data/store";
import { deleteItem } from "@/data/reducers/trip detail/trip detail";
import { useTranslation } from "react-i18next";

interface collapseProp {
  main: JSX.Element;
  sub: JSX.Element;
  remove?: () => void;
  index?: number;
  type: "addForm" | "sign";
}
export const Collapse = ({ type, main, sub, remove, index }: collapseProp) => {
  const {t} = useTranslation('list page')
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
        <div className='flex flex-col sm:flex-row-reverse justify-center'>
          {type === "addForm" && (
            <button
              type='button'
              onClick={handleDelete}
            >
              <Icons.Delete size='1.25rem' />
            </button>
          )}
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
                transition:'rotate .5s ease'
              }}
              className='scale-150 sm:scale-100'
            >
              <Icons.ShowDetail color={color.blue} />
            </span>
            <span className='hidden sm:inline-block'>{t('detail.toggle')}</span>
          </button>
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
