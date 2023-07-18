import { useAppSelector } from "@/hooks/redux";
import { Collapse } from "@/layouts/collapse";
import { DetailTable } from "./detail table";
import { DetailHeader } from "./detail header";
import { Block } from "./new form";
import * as Icons from "@components/UI/icons";
import { useFieldArray, useFormContext } from "react-hook-form";
import { TopBtn } from "@/components/UI/buttons";
import { useTheme } from "styled-components";

export const TripDetailForm = () => {
  const color = useTheme()?.color;
  const { control } = useFormContext();
  const { fields, append } = useFieldArray({
    name: "tripData",
    control,
  });

  return (
    <>
      <div>
        <button
          type='button'
          className='p-0'
          onClick={() => {
            append({
              startDate: "",
              endDate: "",
            });
          }}
        >
          <TopBtn
            style={{
              backgroundColor: color.sectionHeader,
              color: color.white,
            }}
            icon={<Icons.NewDetail />}
          >
            新增出差計畫
          </TopBtn>
        </button>
      </div>
      {fields.map((field, index) => {
        return (
          <Block key={field.id}>
            <Collapse
              main={<DetailHeader data={field} />}
              sub={
                <DetailTable
                  data={field}
                  index={index}
                />
              }
            />
          </Block>
        );
      })}
    </>
  );
};
