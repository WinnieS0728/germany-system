import { cn } from "@/utils/cn";
import { Dispatch, SetStateAction } from "react";

export type filterTimeType = "thisYear" | "thisMonth" | "cusTime";
export type filterZoneType = "recent" | "cusTime";

type radioProps<T> = {
  as: "time" | "recent";
  text: string;
  active?: boolean;
  setType: Dispatch<SetStateAction<T>>;
  value: T;
};

export function RadioBtn({
  as,
  text,
  active,
  setType,
  value,
}:
  | (radioProps<filterTimeType> & {
      as: "time";
    })
  | (radioProps<filterZoneType> & {
      as: "recent";
    })) {
  return (
    <label
      className={cn(
        "px-6 py-2 bg-tableBgc_darker rounded-md cursor-pointer text-center",
        {
          "text-myWhite": active,
          "bg-navActive": active,
        }
      )}
    >
      {text}
      <input
        type='radio'
        name='type'
        value={value}
        className='hidden'
        onChange={() => {
          if (as === "time") {
            setType(value);
          } else {
            setType(value);
          }
        }}
      />
    </label>
  );
}
