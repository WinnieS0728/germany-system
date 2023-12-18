import { Section } from "@/layouts/section";
import { cn } from "@/utils/cn";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

interface timeSelectButtonProps {
  name: "year" | "month";
}
export function TimeSelectButton({ name }: timeSelectButtonProps) {
  const [search, setSearch] = useSearchParams();
  const text = () => {
    switch (name) {
      case "year":
        return "本年度";
      case "month":
        return "本月";
      default:
        return "";
    }
  };

  return (
    <button
      type='button'
      className={cn("filterButton", {
        active: search.get("filter") === name,
      })}
      onClick={() => {
        setSearch(
          (prev) => {
            prev.set("filter", name);
            return prev;
          },
          {
            replace: true,
          }
        );
      }}
    >
      {text()}
    </button>
  );
}

export function CustomTimeRangeButton() {
  const [search, setSearch] = useSearchParams();
  const [showModal, setModalShow] = useState<boolean>(false);

  return (
    <div className='relative'>
      <button
        type='button'
        className={cn("filterButton", {
          active: search.get("filter") === "cus",
        })}
        onClick={() => {
          setModalShow((prev) => !prev);
        }}
      >
        選擇區間
      </button>
      {showModal && (
        <div className='absolute top-full'>
          <Section title='查詢時間設定'>
            <div>
              <input
                type='date'
                name='date'
                id='date'
              />
              <div>
                <button
                  type='button'
                  onClick={() => {
                    setModalShow(false);
                  }}
                >
                  取消
                </button>
                <button
                  type='button'
                  onClick={() => {
                    setSearch(
                      (prev) => {
                        prev.set("filter", "cus");
                        return prev;
                      },
                      {
                        replace: true,
                      }
                    );
                    setModalShow(false);
                  }}
                >
                  搜尋
                </button>
              </div>
            </div>
          </Section>
        </div>
      )}
    </div>
  );
}
