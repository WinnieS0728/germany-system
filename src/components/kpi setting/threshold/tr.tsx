import { month_shortName } from "@/types";
import { FieldArrayWithId, UseFormRegister } from "react-hook-form";
import { thresholdList_emp, threshold_data } from "./data";

interface propsType {
  field: FieldArrayWithId<
    Record<"threshold", (Partial<thresholdList_emp> & threshold_data)[]>,
    "threshold",
    "id"
  >;
  index: number;
  register: UseFormRegister<
    Record<"threshold", (Partial<thresholdList_emp> & threshold_data)[]>
  >;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
  setSelectNumber: React.Dispatch<React.SetStateAction<number>>;
}
export const TrList = ({
  field,
  index,
  register,
  setSelected,
  setSelectNumber,
}: propsType) => {
  function inputFormat(e: React.ChangeEvent<HTMLInputElement>) {
    const e_value = e.target.value;
    const value = e_value.replace(/[^\d]/g, "");
    e.target.value = value;

    if (parseInt(value) > 100) {
      e.target.value = "100";
    } else if (parseInt(value) < 0) {
      e.target.value = "0";
    }

    setSelectNumber(parseInt(e.target.value) | 0);
  }

  function handleBlur(e: React.BaseSyntheticEvent) {
    if (e.target.value === "") {
      e.target.value = "0";
    }
    setSelected("");
    setSelectNumber(0);
  }

  return (
    <>
      <tr>
        <td rowSpan={2}>{index + 1}</td>
        <td rowSpan={2}>{field.EmpName}</td>
        <td>ATU & 既有客戶</td>
        {month_shortName.map((m) => (
          <td
            key={m}
            style={{ whiteSpace: "nowrap" }}
          >
            <input
              type='text'
              {...register(`threshold.${index}.${m}.existCus` as const, {
                setValueAs: (v: string): number => {
                  return v ? parseInt(v) : 0;
                },
              })}
              placeholder='...'
              autoComplete='off'
              className="w-12 text-end"
              onChangeCapture={inputFormat}
              onFocusCapture={(e) => {
                e.target.value = "";
                setSelected(e.target.name);
              }}
              onBlurCapture={handleBlur}
            />
            <span style={{ marginLeft: ".2em" }}>%</span>
          </td>
        ))}
      </tr>
      <tr>
        <td>新客戶</td>
        {month_shortName.map((m) => (
          <td
            key={m}
            style={{ whiteSpace: "nowrap" }}
          >
            <input
              type='text'
              {...register(`threshold.${index}.${m}.newCus` as const, {
                setValueAs: (v: string): number => {
                  return v ? parseInt(v) : 0;
                },
              })}
              placeholder='...'
              autoComplete='off'
              className="w-12 noBorder text-end"
              // onChangeCapture={inputFormat}
              // onFocusCapture={(e) => {
              //   e.target.value = "";
              //   setSelected(e.target.name);
              // }}
              onBlurCapture={handleBlur}
              tabIndex={-1}
              readOnly
            />
            <span style={{ marginLeft: ".2em" }}>%</span>
          </td>
        ))}
      </tr>
    </>
  );
};
